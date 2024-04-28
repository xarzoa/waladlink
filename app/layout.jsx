import '@/styles/globals.css';
import { JetBrains_Mono, Gabarito, DM_Sans } from 'next/font/google';
import { ThemeProvider } from '@/components/theme';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import Script from 'next/script';

const jbMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jb_mono',
});

const gabarito = Gabarito({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-gabarito',
});

const dmsans = DM_Sans({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900', '1000'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dmsans',
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
          `min-h-screen max-w-[100vw] bg-background font-dmsans antialiased selection:bg-white selection:text-black ${jbMono.variable} ${gabarito.variable} ${dmsans.variable}`)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster
            toastOptions={{
              className: 'rounded-none backdrop-blur-lg bg-black/20',
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
