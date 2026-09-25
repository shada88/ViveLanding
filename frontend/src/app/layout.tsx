import type { Metadata, Viewport } from 'next';
import { Toaster } from 'sonner';
import { DEFAULT_THEME, THEME_STORAGE_KEY } from '@/lib/theme';
import '@/styles/globals.css';

const TITLE = 'Fundación Vive con Esperanza';
const DESCRIPTION =
  'Convertimos escuelas en motores de desarrollo local. Red interamericana que conecta escuelas, docentes, comunidades e instituciones con herramientas, conocimiento y acompañamiento.';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://vivesperanza.org';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s — ${TITLE}`,
  },
  description: DESCRIPTION,
  applicationName: TITLE,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: TITLE,
    description: 'Convertimos escuelas en motores de desarrollo local.',
    url: SITE_URL,
    siteName: TITLE,
    type: 'website',
    locale: 'es_LA',
    images: [
      {
        url: '/vivesperanza_logo.svg',
        width: 800,
        height: 600,
        alt: 'Fundación Vive con Esperanza — Convertimos escuelas en motores de desarrollo local',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: 'Convertimos escuelas en motores de desarrollo local.',
    images: ['/vivesperanza_logo.svg'],
  },
};

export const viewport: Viewport = {
  // Acompaña al color de fondo del tema oscuro: sin esto, la barra del
  // navegador en móvil queda blanca contra una página negra.
  themeColor: '#04070e',
  colorScheme: 'dark light',
};

const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'NGO',
  name: 'Fundación Vive con Esperanza',
  alternateName: 'Vivesperanza',
  url: 'https://vivesperanza.org',
  logo: 'https://vivesperanza.org/vivesperanza_logo.svg',
  taxID: '900.250.330-2',
  description:
    'Convertimos escuelas en motores de desarrollo local. Educación para el Desarrollo Sostenible (EDS) y Gestión del Riesgo de Desastres (GRD) en las Américas.',
  sameAs: [
    'https://www.facebook.com/share/1BdTtNgTGA/',
    'https://www.instagram.com/vivesperanzaoficial?stkn=MWx5eHhmbWxrcGdhYw==',
    'https://www.youtube.com/@vivesperanzaoficial',
    'https://x.com/vivesperanzaofi',
    'https://www.linkedin.com/company/vivesperanza/',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  /*
   * `suppressHydrationWarning`: el script de <head> puede cambiar `data-theme`
   * y agregar la clase `js` antes de que React hidrate. El atributo del cliente
   * difiere del servidor A PROPÓSITO; sin esto React avisa de un desajuste que
   * es justamente el comportamiento buscado. Alcanza a <html> y a nada más.
   */
  return (
    <html lang="es" data-theme={DEFAULT_THEME} suppressHydrationWarning>
      <head>
        {/*
          Un solo script para dos garantías que comparten plazo: las dos tienen
          que estar resueltas ANTES del primer pintado.

          1. `js` — habilita el estado inicial oculto del sistema de aparición.
             El CSS solo esconde bajo `html.js [data-reveal]`, así que si este
             script no corre la página se ve ENTERA. Es al revés de como lo
             hace framer-motion, que serializa `opacity: 0` en el HTML del
             servidor y deja la landing invisible cuando el JS no llega. Para
             una fundación, "no cargó el JS" no puede significar "no hay página".

          2. Tema — el defecto ya viene en el atributo del servidor. Este script
             SOLO corrige cuando la persona eligió otra cosa. Si decidiera acá,
             todo el mundo vería un destello del tema equivocado.

          El try/catch no es decorativo: en modo privado de algunos navegadores
          `localStorage` lanza al LEER. Sin el catch la excepción corta el
          script, la clase `js` queda puesta a medias y el estado oculto nunca
          se revierte. Por eso la clase se agrega ANTES de tocar el almacenamiento.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');" +
              'try{var t=localStorage.getItem(' +
              JSON.stringify(THEME_STORAGE_KEY) +
              ");if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ORGANIZATION_SCHEMA),
          }}
        />
      </head>
      <body>
        <a className="skip-link" href="#contenido">
          Ir al contenido principal
        </a>
        {children}
        <Toaster position="bottom-right" richColors closeButton />
      </body>
    </html>
  );
}
