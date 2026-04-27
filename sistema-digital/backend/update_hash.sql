UPDATE users SET password_hash = '$2b$10$fezeJvXJZt3y989v6Vwfo.EZXlC2hhIbpFl1HS6Cgy2SvnVrDvo2i' WHERE email = 'admin@ingenieriawebmiranda.com' RETURNING email;
