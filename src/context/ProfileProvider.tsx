import React, { createContext, useContext, useEffect, useState } from 'react';

type Profile = {
  id: string;
  firstName: string;
  lastName: string;
  // ... autres champs utiles
} | null;

const ProfileContext = createContext<Profile>(null);

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile>(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/profiles/me', {
      headers: { accept: '*/*' },
      credentials: 'include'
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.id) setProfile(data);
        else setProfile(null);
      })
      .catch(() => setProfile(null));
  }, []);

  return (
    <ProfileContext.Provider value={profile}>
      {children}
    </ProfileContext.Provider>
  );
};
