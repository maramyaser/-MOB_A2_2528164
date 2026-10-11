import React from 'react';
import { Linking, ScrollView, Text, View } from 'react-native';
import { Button, Card, Chip, EmptyState, s } from '../components/ui';
import { PROJECTS } from '../config/identity';
import { colors, spacing } from '../theme';

export default function ProjectDetailsScreen({ route }: any) {
  const project = PROJECTS.find(p => p.id === route.params?.projectId);
  if (!project) return <EmptyState title="Project not found" text="Go back and choose another project." />;
  return (
    <ScrollView style={{ backgroundColor: colors.bg }} contentContainerStyle={{ padding: spacing.md }}>
      <Text style={{ fontSize: 24, fontWeight: '800', color: colors.text, marginBottom: spacing.md }}>{project.title}</Text>
      <Card><Text style={s.emptyTitle}>Problem</Text><Text style={s.body}>{project.problem}</Text></Card>
      <Card><Text style={s.emptyTitle}>My contribution</Text><Text style={s.body}>{project.contribution}</Text></Card>
      <Card>
        <Text style={s.emptyTitle}>Technology used</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 }}>
          {project.tech.map(t => <Chip key={t} label={t} />)}
        </View>
      </Card>
      {project.link ? <Button label="Open project link (needs internet)" variant="secondary" onPress={() => Linking.openURL(project.link)} /> : null}
    </ScrollView>
  );
}
