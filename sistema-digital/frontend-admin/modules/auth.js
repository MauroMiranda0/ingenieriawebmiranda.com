import { API_BASE_URL } from '../config/env.js';

const TOKEN_KEY = 'iwm_admin_token';

export function guardarToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function obtenerToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function eliminarToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function estaAutenticado() {
  const token = obtenerToken();
  if (!token) return false;

  try {
    // Decodificar payload sin verificar firma (solo para expiración en cliente)
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export function verificarSesion() {
  if (!estaAutenticado()) {
    eliminarToken();
    window.location.href = '/admin/login.html';
  }
}

export async function login(email, password) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const datos = await res.json();

  if (!res.ok) {
    throw new Error(datos.error || 'Error al iniciar sesión');
  }

  guardarToken(datos.token);
  return datos;
}

export async function logout() {
  const token = obtenerToken();
  if (token) {
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    }).catch(() => {});
  }
  eliminarToken();
  window.location.href = '/admin/login.html';
}
