// Zona horaria del proyecto: America/Mexico_City (UTC-6)
const TIMEZONE = 'America/Mexico_City';

export const ahora = () => new Date().toISOString();

export const formatearFecha = (fecha) =>
  new Intl.DateTimeFormat('es-MX', {
    timeZone: TIMEZONE,
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(fecha));
