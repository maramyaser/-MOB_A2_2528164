import React from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from '../components/ui';
import { useProfile } from '../context/ProfileContext';
import { FULL_NAME, VERIFICATION_CODE } from '../config/identity';
import { colors, spacing } from '../theme';

export default function HomeScreen() {
  const { profile, loaded } = useProfile();
  if (!loaded) return <ActivityIndicator style={{ flex: 1 }} />;
  const initials = FULL_NAME.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  return (
    <ScrollView style={{ backgroundColor: colors.bg }} contentContainerStyle={{ padding: spacing.md }}>
      <Text style={styles.name} accessibilityRole="header">My name is {FULL_NAME}.</Text>
      <View style={styles.row}>
        {profile.imageUri
          ? <Image source={{ uri: profile.imageUri }} style={styles.avatar} accessibilityLabel="Profile photo" />
          : <View style={[styles.avatar, styles.fallback]} accessibilityLabel="Avatar with initials"><Text style={styles.initials}>{initials}</Text></View>}
        <View style={{ flex: 1 }}>
          <Text style={styles.headline}>{profile.headline}</Text>
          <Text style={styles.status}>{profile.availability}</Text>
        </View>
      </View>
      <Card><Text style={styles.h}>About me</Text><Text style={styles.body}>{profile.bio}</Text></Card>
      <Card><Text style={styles.h}>Primary skill</Text><Text style={styles.body}>{profile.primarySkill}</Text></Card>
      <Card><Text style={styles.h}>Verification code</Text><Text style={styles.code}>{VERIFICATION_CODE}</Text></Card>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  name: { fontSize: 26, fontWeight: '800', color: colors.text, marginBottom: spacing.md },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
  avatar: { width: 96, height: 96, borderRadius: 48, marginRight: spacing.md },
  fallback: { backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  initials: { color: '#fff', fontSize: 32, fontWeight: '700' },
  headline: { fontSize: 18, fontWeight: '600', color: colors.text },
  status: { color: colors.success, marginTop: 4, fontWeight: '600' },
  h: { fontWeight: '700', fontSize: 16, color: colors.text, marginBottom: 4 },
  body: { color: colors.muted, fontSize: 15, lineHeight: 22 },
  code: { fontSize: 20, fontWeight: '800', color: colors.primary, letterSpacing: 1 },
});
