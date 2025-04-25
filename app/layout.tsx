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
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any',
      },
      {
        url: '/icon.png',
        type: 'image/png',
        sizes: '32x32',
      },
      {
        url: '/apple-icon.png',
        type: 'image/png',
        sizes: '180x180',
      },
    ],
    apple: [
      {
        url: '/apple-icon.png',
        sizes: '180x180',
      },
    ],
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
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
                <div className="fade-in">
                  {children}
                </div>
                <Toaster />
              </AnimationProvider>
            </UserProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
