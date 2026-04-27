import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories/user.repository.js';

export const authService = {
  async login(email, password) {
    const usuario = await userRepository.buscarPorEmail(email);
    if (!usuario) {
      const error = new Error('Credenciales inválidas');
      error.status = 401;
      throw error;
    }

    const passwordValida = await bcrypt.compare(password, usuario.password_hash);
    if (!passwordValida) {
      const error = new Error('Credenciales inválidas');
      error.status = 401;
      throw error;
    }

    const payload = { id: usuario.id, email: usuario.email, role: usuario.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '8h',
    });

    return { token, usuario: payload };
  },

  async obtenerUsuarioAutenticado(id) {
    const usuario = await userRepository.buscarPorId(id);
    if (!usuario) {
      const error = new Error('Usuario no encontrado');
      error.status = 404;
      throw error;
    }
    return usuario;
  },
};
