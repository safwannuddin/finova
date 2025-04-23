'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Investment = 'Stocks' | 'Bonds' | 'Crypto' | 'RealEstate' | 'MutualFunds' | 'ETFs';
export type RiskProfile = 'Low' | 'Medium' | 'High';

export interface User {
  name: string;
  age: number;
  monthlyIncome: number;
  budgetAllocation: {
    necessities: number;
    wants: number;
    savings: number;
  };
  riskAppetite: RiskProfile;
  investments: Investment[];
}

interface UserContextProps {
  user: User | null;
  onboardingComplete: boolean;
  updateUser: (userData: Partial<User>) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

const initialUser: User = {
  name: '',
  age: 0,
  monthlyIncome: 0,
  budgetAllocation: {
    necessities: 50,
    wants: 30,
    savings: 20,
  },
  riskAppetite: 'Medium',
  investments: [],
};

const UserContext = createContext<UserContextProps>({
  user: null,
  onboardingComplete: false,
  updateUser: () => {},
  completeOnboarding: () => {},
  resetOnboarding: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(initialUser);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  const updateUser = (userData: Partial<User>) => {
    console.log("Updating user data:", userData);
    setUser((prevUser) => {
      if (!prevUser) return { ...initialUser, ...userData };
      return { ...prevUser, ...userData };
    });
  };

  const completeOnboarding = () => {
    console.log("Setting onboardingComplete to true");
    setOnboardingComplete(true);
    console.log("onboardingComplete should now be true");
  };

  const resetOnboarding = () => {
    console.log("Resetting onboarding");
    setUser(initialUser);
    setOnboardingComplete(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        onboardingComplete,
        updateUser,
        completeOnboarding,
        resetOnboarding,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);