'use client';

import { ClerkProvider as ClerkProviderBase } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { ReactNode } from 'react';

export function ClerkProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProviderBase
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: 'hsl(217, 91%, 60%)',
          colorBackground: 'hsl(222, 47%, 11%)',
          colorText: 'hsl(0, 0%, 98%)',
          colorTextSecondary: 'hsl(240, 5%, 64.9%)',
          colorDanger: 'hsl(0, 84.2%, 60.2%)',
          colorSuccess: 'hsl(142, 76%, 36%)',
          borderRadius: '0.5rem',
          fontFamily: 'var(--font-dm-sans)',
          fontSize: '16px',
        },
        elements: {
          formButtonPrimary: 'bg-primary hover:bg-primary/90 transition-colors duration-200',
          card: 'bg-card',
          headerTitle: 'text-foreground',
          headerSubtitle: 'text-muted-foreground',
          socialButtonsBlockButton: 'bg-card border-border text-foreground hover:bg-accent/10 transition-colors duration-200',
          dividerLine: 'bg-border',
          formFieldLabel: 'text-foreground',
          formFieldInput: 'bg-input border-border text-foreground transition-colors duration-200 focus:border-primary',
          footerActionLink: 'text-primary hover:text-primary/90 transition-colors duration-200',
        },
      }}
    >
      {children}
    </ClerkProviderBase>
  );
} 