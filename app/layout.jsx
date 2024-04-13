import '@/styles/globals.css';
import { Lato } from 'next/font/google';
import { ThemeProvider } from '@/components/theme';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

const fontLato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-lato',
  display: 'swap',
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
      <head />
      <body
        className={cn(
          'min-h-screen max-w-[100vw] bg-background font-sans antialiased selection:bg-white selection:text-black',
          fontLato.variable
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
