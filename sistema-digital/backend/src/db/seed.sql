-- Seed IWM Sistema Digital — solo para entorno de desarrollo
-- Contraseña del admin de prueba: Admin1234!
-- Hash generado con bcrypt (10 rondas)

INSERT INTO users (email, password_hash, role)
VALUES (
  'admin@ingenieriawebmiranda.com',
  '$2b$10$fezeJvXJZt3y989v6Vwfo.EZXlC2hhIbpFl1HS6Cgy2SvnVrDvo2i',
  'admin'
)
ON CONFLICT (email) DO NOTHING;

-- Casos de ejemplo para desarrollo
INSERT INTO cases (nombre, email, telefono, tipo_cliente, descripcion, urgencia, canal_notificacion, estado, prioridad, score)
VALUES
  (
    'Carlos Mendoza',
    'carlos@ejemplo.com',
    '5551234567',
    'particular',
    'Necesito un sitio web para mi negocio de fotografía. Quiero galería, formulario de contacto y blog.',
    'media',
    'email',
    'nuevo',
    'media',
    3
  ),
  (
    'Empresa Tech SA',
    'contacto@empresatech.com',
    '5559876543',
    'empresa',
    'Migración de sistema legacy a plataforma web moderna. Sistema actual tiene 10 años y no escala.',
    'alta',
    'whatsapp',
    'en_revision',
    'alta',
    6
  ),
  (
    'Ana García',
    'ana@startup.io',
    '5554567890',
    'empresa',
    'MVP de plataforma de e-commerce con panel admin, catálogo y pasarela de pago.',
    'alta',
    'email',
    'en_proceso',
    'alta',
    6
  )
ON CONFLICT DO NOTHING;
