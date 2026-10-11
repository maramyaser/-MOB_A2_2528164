import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_PROFILE } from '../config/identity';

export type Profile = typeof DEFAULT_PROFILE;
const KEY = 'portfolio_profile_v1';

type Ctx = { profile: Profile; loaded: boolean; save: (p: Profile) => Promise<void>; reset: () => Promise<void> };
const ProfileCtx = createContext<Ctx>(null as unknown as Ctx);
export const useProfile = () => useContext(ProfileCtx);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(KEY);
        if (raw) setProfile({ ...DEFAULT_PROFILE, ...JSON.parse(raw) });
      } catch { /* fall back to defaults */ }
      setLoaded(true);
    })();
  }, []);

  const save = async (p: Profile) => { setProfile(p); await AsyncStorage.setItem(KEY, JSON.stringify(p)); };
  const reset = async () => { setProfile(DEFAULT_PROFILE); await AsyncStorage.removeItem(KEY); };

  return <ProfileCtx.Provider value={{ profile, loaded, save, reset }}>{children}</ProfileCtx.Provider>;
};
