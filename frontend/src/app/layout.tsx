import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import { DEFAULT_THEME, THEME_STORAGE_KEY } from '@/lib/theme';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Fundación Vive con Esperanza',
  description: 'Sembrando esperanza y transformando comunidades a través de programas solidarios, educación y acompañamiento humano.',
  openGraph: {
    title: 'Fundación Vive con Esperanza',
    description: 'Transformando realidades, construyendo futuro.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" data-theme={DEFAULT_THEME} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem(" +
              JSON.stringify(THEME_STORAGE_KEY) +
              ");if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}",
          }}
        />
      </head>
      <body>
        {children}
        <Toaster position="bottom-right" richColors theme="dark" />
      </body>
    </html>
  );
}
