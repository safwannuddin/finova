import './globals.css'
import type { Metadata } from 'next'
import { Inter, DM_Sans } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { UserProvider } from '@/context/UserContext'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import AnimationProvider from '@/components/providers/AnimationProvider'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: 'Finova - Your Personalized Wealth Hub',
  description: 'AI-powered financial portfolio management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: {
          colors: {
            primary: 'hsl(217, 91%, 60%)',
            primaryLight: 'hsl(217, 91%, 70%)',
            primaryDark: 'hsl(217, 91%, 50%)',
            background: 'hsl(222, 47%, 11%)',
            backgroundSecondary: 'hsl(217, 32%, 17%)',
            text: 'hsl(0, 0%, 98%)',
            textSecondary: 'hsl(240, 5%, 64.9%)',
            danger: 'hsl(0, 84.2%, 60.2%)',
            success: 'hsl(142, 76%, 36%)',
          },
          variables: {
            borderRadius: '0.5rem',
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '16px',
          },
        },
        elements: {
          formButtonPrimary: 'bg-primary hover:bg-primary/90',
          card: 'bg-card',
          headerTitle: 'text-foreground',
          headerSubtitle: 'text-muted-foreground',
          socialButtonsBlockButton: 'bg-card border-border text-foreground hover:bg-accent/10',
          dividerLine: 'bg-border',
          formFieldLabel: 'text-foreground',
          formFieldInput: 'bg-input border-border text-foreground',
          footerActionLink: 'text-primary hover:text-primary/90',
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.variable} ${dmSans.variable} font-sans bg-background`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <UserProvider>
              <AnimationProvider>
                {children}
                <Toaster />
              </AnimationProvider>
            </UserProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
