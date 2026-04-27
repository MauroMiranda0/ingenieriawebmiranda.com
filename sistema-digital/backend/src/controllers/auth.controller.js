import { authService } from '../services/auth.service.js';

export const authController = {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const resultado = await authService.login(email, password);
      res.json(resultado);
    } catch (err) {
      next(err);
    }
  },

  logout(req, res) {
    // El token vive en el cliente — el logout lo elimina desde el frontend
    res.json({ mensaje: 'Sesión cerrada correctamente' });
  },

  async me(req, res, next) {
    try {
      const usuario = await authService.obtenerUsuarioAutenticado(req.usuario.id);
      res.json(usuario);
    } catch (err) {
      next(err);
    }
  },
};
