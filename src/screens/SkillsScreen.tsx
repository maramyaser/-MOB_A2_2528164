import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Card, SectionTitle, s } from '../components/ui';
import { EDUCATION, SKILLS } from '../config/identity';
import { colors, spacing } from '../theme';

export default function SkillsScreen() {
  return (
    <ScrollView style={{ backgroundColor: colors.bg }} contentContainerStyle={{ padding: spacing.md }}>
      <SectionTitle>Skills</SectionTitle>
      {SKILLS.map(k => (
        <Card key={k.name}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <Text style={[s.emptyTitle, { flexShrink: 1 }]}>{k.name}</Text>
            <Text style={{ color: colors.primary, fontWeight: '600' }}>{k.level}</Text>
          </View>
          <Text style={s.body}>{k.note}</Text>
        </Card>
      ))}
      <SectionTitle>Education and training</SectionTitle>
      {EDUCATION.map(e => (
        <Card key={e.title}>
          <Text style={{ color: colors.muted }}>{e.period}</Text>
          <Text style={s.emptyTitle}>{e.title}</Text>
          <Text style={s.body}>{e.place}</Text>
        </Card>
      ))}
    </ScrollView>
  );
}
