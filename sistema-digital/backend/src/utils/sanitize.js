// Elimina caracteres de control y recorta espacios en strings
export const sanitizarTexto = (texto) => {
  if (typeof texto !== 'string') return texto;
  return texto
    .replace(/[\x00-\x1F\x7F]/g, '')
    .trim();
};

export const sanitizarObjeto = (obj) => {
  const resultado = {};
  for (const [clave, valor] of Object.entries(obj)) {
    resultado[clave] = typeof valor === 'string' ? sanitizarTexto(valor) : valor;
  }
  return resultado;
};
