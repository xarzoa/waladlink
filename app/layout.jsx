import '@/styles/globals.css';
import { Lato } from 'next/font/google';
import { Fira_Mono } from 'next/font/google';
import { DM_Sans } from 'next/font/google';
import { JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import Script from 'next/script';

const fontLato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-lato',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm_sans',
});

const jbMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jb_mono',
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Script
        src="https://analytics.ducklabs.xyz/script.js"
        data-website-id={process.env.WEBSITE_ID}
      />
      <head />
      <body
        className={cn(
          'min-h-screen max-w-[100vw] bg-background font-sans antialiased selection:bg-white selection:text-black',
          fontLato.variable + dmSans.variable + jbMono.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster
            richColors
            toastOptions={{
              className: 'rounded-none',
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
