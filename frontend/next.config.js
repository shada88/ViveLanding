/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  /**
   * `/tools` es la dirección corta que circula para las herramientas: lleva a
   * la sección de rutas de la portada. Es temporal (307) a propósito: una 308
   * queda guardada en el navegador y, si algún día `/tools` tiene página
   * propia, quien ya la visitó seguiría rebotando a la portada.
   */
  async redirects() {
    return [
      { source: '/tools', destination: '/#rutas', permanent: false },
      { source: '/tools/:path*', destination: '/#rutas', permanent: false },
    ];
  },
};

module.exports = nextConfig;
