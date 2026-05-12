import { usersData } from '../db/usersData.js';

//Creo una función para gestionar la devolución de mensajes de error, para no repetir código
const sendErrorJson = (res,message) =>{
  return res.status(404).json({
      ok: false,
      error: { message: message },
    });
}

//Función que devuelve todos los datos de usuarios de la bbdd.
export const getAllUsers = (req, res) => {
  // Verificación de seguridad
  if (!usersData || usersData.length === 0) {
    // Usamos return para detener la ejecución y que no intente enviar el segundo json
    sendErrorJson(res,'No hay datos de usuario disponibles en el sistema');
  }

  // Si todo está bien, enviamos los datos
  res.json({
    ok: true,
    data: usersData,
  });
};