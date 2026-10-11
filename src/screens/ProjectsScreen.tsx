import React from 'react';
import { FlatList, Pressable, Text } from 'react-native';
import { Card, EmptyState, s } from '../components/ui';
import { PROJECTS } from '../config/identity';
import { colors, spacing } from '../theme';

export default function ProjectsScreen({ navigation }: any) {
  return (
    <FlatList
      style={{ backgroundColor: colors.bg }} contentContainerStyle={{ padding: spacing.md }}
      data={PROJECTS} keyExtractor={p => p.id}
      ListEmptyComponent={<EmptyState title="No projects yet" text="Add your projects in src/config/identity.ts." />}
      renderItem={({ item }) => (
        <Pressable accessibilityRole="button" accessibilityLabel={`Open project ${item.title}`}
          onPress={() => navigation.navigate('ProjectDetails', { projectId: item.id })}>
          <Card>
            <Text style={s.emptyTitle}>{item.title}</Text>
            <Text style={s.body} numberOfLines={2}>{item.problem}</Text>
            <Text style={{ color: colors.primary, marginTop: 8, fontWeight: '600' }}>View details</Text>
          </Card>
        </Pressable>
      )}
    />
  );
}
