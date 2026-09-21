export default function HomePage() {
  return (
    <main style={{ padding: '4rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ color: 'var(--color-primary)', fontSize: '2.5rem', marginBottom: '1rem' }}>
          Fundación Vive con Esperanza
        </h1>
        <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Estructura del proyecto lista. Mismo stack tecnológico de vanguardia, sistema de diseño configurado sin ondas y arquitectura desacoplada.
        </p>
      </header>

      {/* Espacio reservado para los componentes de la landing */}
      <section style={{ 
        backgroundColor: 'var(--color-surface-container)', 
        border: '1px solid var(--color-outline-variant)',
        borderRadius: 'var(--radius-lg)', 
        padding: '2rem', 
        textAlign: 'center' 
      }}>
        <p style={{ color: 'var(--color-hope)', fontWeight: 600 }}>
          ✓ Sistema de diseño y tokens activos
        </p>
        <p style={{ color: 'var(--color-on-surface-muted)', marginTop: '0.5rem' }}>
          Hero, Programas, Impacto y Formulario listos para implementarse en fases posteriores.
        </p>
      </section>
    </main>
  );
}
