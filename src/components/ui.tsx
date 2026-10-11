import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native';
import { colors, spacing } from '../theme';

export const Card = ({ children, style }: { children: React.ReactNode; style?: ViewStyle }) => (
  <View style={[s.card, style]}>{children}</View>
);

export const SectionTitle = ({ children }: { children: string }) => (
  <Text accessibilityRole="header" style={s.section}>{children}</Text>
);

export const Button = ({ label, onPress, variant = 'primary', disabled }: {
  label: string; onPress: () => void; variant?: 'primary' | 'secondary' | 'danger'; disabled?: boolean;
}) => (
  <Pressable
    accessibilityRole="button" accessibilityLabel={label} disabled={disabled} onPress={onPress}
    style={({ pressed }) => [s.btn, variant === 'secondary' && s.btnSec, variant === 'danger' && s.btnDanger,
      (pressed || disabled) && { opacity: 0.6 }]}>
    <Text style={[s.btnText, variant !== 'primary' && { color: variant === 'danger' ? colors.error : colors.primary }]}>{label}</Text>
  </Pressable>
);

export const Field = ({ label, value, onChangeText, error, multiline, hint }: {
  label: string; value: string; onChangeText: (t: string) => void; error?: string; multiline?: boolean; hint?: string;
}) => (
  <View style={{ marginBottom: spacing.md }}>
    <Text style={s.label}>{label}</Text>
    <TextInput
      accessibilityLabel={label} value={value} onChangeText={onChangeText} multiline={multiline}
      style={[s.input, multiline && { minHeight: 100, textAlignVertical: 'top' }, !!error && { borderColor: colors.error }]}
    />
    {hint ? <Text style={s.hint}>{hint}</Text> : null}
    {error ? <Text accessibilityLiveRegion="polite" style={s.error}>{error}</Text> : null}
  </View>
);

export const EmptyState = ({ title, text }: { title: string; text: string }) => (
  <Card><Text style={s.emptyTitle}>{title}</Text><Text style={s.body}>{text}</Text></Card>
);

export const Chip = ({ label, selected, onPress }: { label: string; selected?: boolean; onPress?: () => void }) => (
  <Pressable onPress={onPress} accessibilityRole="button" accessibilityState={{ selected: !!selected }}
    style={[s.chip, selected && { backgroundColor: colors.primary }]}>
    <Text style={{ color: selected ? '#fff' : colors.primary }}>{label}</Text>
  </Pressable>
);

export const s = StyleSheet.create({
  card: { backgroundColor: colors.card, borderRadius: 12, padding: spacing.md, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border },
  section: { fontSize: 20, fontWeight: '700', color: colors.text, marginBottom: spacing.sm, marginTop: spacing.sm },
  btn: { backgroundColor: colors.primary, borderRadius: 10, paddingVertical: 12, paddingHorizontal: spacing.md, alignItems: 'center', marginBottom: spacing.sm, minHeight: 48, justifyContent: 'center' },
  btnSec: { backgroundColor: '#fff', borderWidth: 1, borderColor: colors.primary },
  btnDanger: { backgroundColor: '#fff', borderWidth: 1, borderColor: colors.error },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  label: { fontWeight: '600', color: colors.text, marginBottom: spacing.xs },
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 12, backgroundColor: '#fff', fontSize: 16, color: colors.text },
  hint: { color: colors.muted, fontSize: 13, marginTop: 2 },
  error: { color: colors.error, fontSize: 14, marginTop: 4 },
  emptyTitle: { fontWeight: '700', fontSize: 16, color: colors.text, marginBottom: 4 },
  body: { color: colors.muted, fontSize: 15, lineHeight: 22 },
  chip: { borderWidth: 1, borderColor: colors.primary, borderRadius: 20, paddingVertical: 8, paddingHorizontal: 14, marginRight: 8, marginBottom: 8 },
});
