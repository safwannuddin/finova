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
  // Skip Clerk in development if publishable key is not valid
  const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const useClerk = clerkPubKey && !clerkPubKey.includes('your_clerk_publishable_key');

  return (
    useClerk ? (
      <ClerkProvider>
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
    ) : (
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
    )
  )
}
