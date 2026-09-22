import type { Metadata, Viewport } from 'next';
import { Toaster } from 'sonner';
import { DEFAULT_THEME, THEME_STORAGE_KEY } from '@/lib/theme';
import '@/styles/globals.css';

const TITLE = 'Fundación Vive con Esperanza';
const DESCRIPTION =
  'Convertimos escuelas en motores de desarrollo local. Red interamericana que conecta escuelas, docentes, comunidades e instituciones con herramientas, conocimiento y acompañamiento.';

export const metadata: Metadata = {
  title: {
    default: TITLE,
    template: `%s — ${TITLE}`,
  },
  description: DESCRIPTION,
  applicationName: TITLE,
  openGraph: {
    title: TITLE,
    description: 'Convertimos escuelas en motores de desarrollo local.',
    type: 'website',
    locale: 'es',
  },
};

export const viewport: Viewport = {
  // Acompaña al color de fondo del tema oscuro: sin esto, la barra del
  // navegador en móvil queda blanca contra una página negra.
  themeColor: '#04070e',
  colorScheme: 'dark light',
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
