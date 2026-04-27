export const ESTADOS = {
  NUEVO: 'nuevo',
  EN_REVISION: 'en_revision',
  EN_PROCESO: 'en_proceso',
  CERRADO: 'cerrado',
};

// Orden unidireccional — no se puede retroceder
export const TRANSICIONES_VALIDAS = {
  [ESTADOS.NUEVO]: [ESTADOS.EN_REVISION],
  [ESTADOS.EN_REVISION]: [ESTADOS.EN_PROCESO],
  [ESTADOS.EN_PROCESO]: [ESTADOS.CERRADO],
  [ESTADOS.CERRADO]: [],
};
