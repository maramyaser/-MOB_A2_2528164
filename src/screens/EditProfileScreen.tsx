import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button, Card, Chip, Field, SectionTitle, s } from '../components/ui';
import { Profile, useProfile } from '../context/ProfileContext';
import { colors, spacing } from '../theme';

const OPTIONS = ['Available', 'Open to internship', 'Busy'];
type Errors = Partial<Record<'headline' | 'bio' | 'primarySkill' | 'availability', string>>;

export function validate(p: Profile): Errors {
  const e: Errors = {};
  const h = p.headline.trim();
  if (h.length < 10 || h.length > 80) e.headline = 'Headline must be 10 to 80 characters.';
  else if (/https?:\/\//i.test(h)) e.headline = 'Headline must not contain links.';
  const b = p.bio.trim();
  if (b.length < 40 || b.length > 300) e.bio = 'Biography must be 40 to 300 characters.';
  if (!/^[A-Za-z][A-Za-z .+#-]{1,29}$/.test(p.primarySkill.trim())) e.primarySkill = 'Primary skill: 2 to 30 letters, no digits.';
  if (!OPTIONS.includes(p.availability)) e.availability = 'Choose an availability status.';
  return e;
}

export default function EditProfileScreen() {
  const { profile, save, reset } = useProfile();
  const [form, setForm] = useState<Profile>(profile);
  const [errors, setErrors] = useState<Errors>({});
  const [msg, setMsg] = useState('');
  const [mediaMsg, setMediaMsg] = useState('');

  useEffect(() => { setForm(profile); }, [profile]);
  const set = (k: keyof Profile) => (v: string) => { setForm({ ...form, [k]: v }); setMsg(''); };

  const onSave = async () => {
    const e = validate(form); setErrors(e);
    if (Object.keys(e).length) { setMsg('Please fix the errors above. Nothing was saved.'); return; }
    await save({ ...form, headline: form.headline.trim(), bio: form.bio.trim(), primarySkill: form.primarySkill.trim() });
    setMsg('Profile saved on this device.');
  };

  // Photo changes save only the image, so unsaved/invalid text edits are never persisted by accident.
  const saveImage = async (uri: string | null) => {
    setForm(f => ({ ...f, imageUri: uri }));
    await save({ ...profile, imageUri: uri });
  };

  const pick = async (mode: 'camera' | 'gallery') => {
    try {
      const perm = mode === 'camera'
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) { setMediaMsg('Permission denied. You can allow it in Settings or use the other option.'); return; }
      const opts: ImagePicker.ImagePickerOptions = { mediaTypes: ['images'], allowsEditing: true, aspect: [1, 1], quality: 0.7 };
      const res = mode === 'camera' ? await ImagePicker.launchCameraAsync(opts) : await ImagePicker.launchImageLibraryAsync(opts);
      if (res.canceled) { setMediaMsg('Selection cancelled. Your current photo was not changed.'); return; }
      await saveImage(res.assets[0].uri); setMediaMsg('Photo updated.');
    } catch { setMediaMsg('Could not open the camera or gallery. Please try again.'); }
  };

  const removeImage = async () => { await saveImage(null); setMediaMsg('Photo removed.'); };

  return (
    <ScrollView style={{ backgroundColor: colors.bg }} contentContainerStyle={{ padding: spacing.md }} keyboardShouldPersistTaps="handled">
      <SectionTitle>Profile photo</SectionTitle>
      <Card>
        {form.imageUri
          ? <Image source={{ uri: form.imageUri }} style={{ width: 120, height: 120, borderRadius: 60, alignSelf: 'center', marginBottom: 12 }} accessibilityLabel="Profile photo preview" />
          : <Text style={[s.body, { marginBottom: 12 }]}>No photo selected. An initials avatar is shown instead.</Text>}
        <Button label="Take photo" onPress={() => pick('camera')} />
        <Button label={form.imageUri ? 'Replace from gallery' : 'Choose from gallery'} variant="secondary" onPress={() => pick('gallery')} />
        {form.imageUri ? <Button label="Remove photo" variant="danger" onPress={removeImage} /> : null}
        {mediaMsg ? <Text accessibilityLiveRegion="polite" style={s.hint}>{mediaMsg}</Text> : null}
      </Card>

      <SectionTitle>Edit profile</SectionTitle>
      <Field label="Headline" value={form.headline} onChangeText={set('headline')} error={errors.headline} hint="10 to 80 characters" />
      <Field label="Short biography" value={form.bio} onChangeText={set('bio')} error={errors.bio} multiline hint={`${form.bio.trim().length}/300`} />
      <Field label="Primary skill" value={form.primarySkill} onChangeText={set('primarySkill')} error={errors.primarySkill} />
      <Text style={s.label}>Availability</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {OPTIONS.map(o => <Chip key={o} label={o} selected={form.availability === o} onPress={() => { setForm({ ...form, availability: o }); setMsg(''); }} />)}
      </View>
      {errors.availability ? <Text style={s.error}>{errors.availability}</Text> : null}

      <View style={{ marginTop: spacing.md }}>
        <Button label="Save profile" onPress={onSave} />
        <Button label="Reset to defaults" variant="danger" onPress={() =>
          Alert.alert('Reset profile?', 'This deletes your saved changes.', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Reset', style: 'destructive', onPress: async () => { await reset(); setErrors({}); setMsg('Profile reset.'); } },
          ])} />
        {msg ? <Text accessibilityLiveRegion="polite" style={{ color: msg.startsWith('Please') ? colors.error : colors.success, fontWeight: '600' }}>{msg}</Text> : null}
      </View>
    </ScrollView>
  );
}
