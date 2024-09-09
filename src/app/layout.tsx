import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import { Toaster } from 'sonner'

import { ThemeProvider } from '@/components/providers/theme-provider'
import { ScrollToTopButton } from '@/components/global/scroll-to-top-button'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '100xDevs',
  description:
    'By harkirat, 100xDevs is a platform for developers to learn and grow together.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader color='hsl(var(--primary))' />
          {children}
          <ScrollToTopButton />
          <Toaster richColors closeButton position='bottom-right' expand />
        </ThemeProvider>
      </body>
    </html>
  )
}
