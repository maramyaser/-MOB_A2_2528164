import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Card, s } from '../components/ui';
import { APP_NAME, APP_VERSION, FULL_NAME, REG_NUMBER, VERIFICATION_CODE } from '../config/identity';
import { colors, spacing } from '../theme';

const Row = ({ k, v }: { k: string; v: string }) => (
  <View style={{ marginBottom: 10 }}><Text style={{ color: colors.muted, fontSize: 13 }}>{k}</Text><Text style={{ color: colors.text, fontSize: 16, fontWeight: '600' }}>{v}</Text></View>
);

export default function AboutScreen() {
  return (
    <ScrollView style={{ backgroundColor: colors.bg }} contentContainerStyle={{ padding: spacing.md }}>
      <Card>
        <Row k="App name" v={APP_NAME} />
        <Row k="Student" v={FULL_NAME} />
        <Row k="Registration number" v={REG_NUMBER} />
        <Row k="Verification code" v={VERIFICATION_CODE} />
        <Row k="Version" v={APP_VERSION} />
      </Card>
      <Card>
        <Text style={s.emptyTitle}>Data use</Text>
        <Text style={s.body}>This app stores only fictional or low-risk class data (your headline, biography, skill, availability and a local photo reference) on this device using AsyncStorage. No passwords or tokens are stored, and nothing is sent to a server. The portfolio works fully offline; only opening an optional project link needs internet.</Text>
      </Card>
    </ScrollView>
  );
}
