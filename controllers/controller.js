import { usersData } from '../db/usersData.js';

//Creo una función para gestionar la devolución de mensajes de error, para no repetir código
const sendErrorJson = (res, message) => {
  return res.status(404).json({
    ok: false,
    error: { message: message },
  });
}

//Creo una función para comprobar que hay datos cargados y sino lanzar un error.
// Devuelve true si hay datos, false si no (y ya envía el error)
const verifyUsersData = (res) => {
  if (!usersData || usersData.length === 0) {
    sendErrorJson(res, 'No hay datos de usuario disponibles en el sistema');
    return false;
  }
  return true;
}

//Obtenermos las especialidades dispobiles a partir de los datos
const getEspecialidades = () => {
    const especialidades = [];

    //Obtenemos las especialidades posibles desde los datos.
    usersData.forEach(element => {
        if (!especialidades.includes(element.specialty.toLowerCase())) especialidades.push(element.specialty.toLowerCase());
    });

    return especialidades;
}
//Función que devuelve todos los datos de usuarios de la bbdd.
export const getAllUsers = (req, res) => {
  if (!verifyUsersData(res)) return;

  res.json({
    ok: true,
    data: usersData,
  });
};

//Función que devuelve los datos de usuarios de una especialidad.
export const getUsersBySpecialty = (req, res) => {
  if (!verifyUsersData(res)) return;

  //Obtenemos las especialidades disponibles
  const especialidades = getEspecialidades();

  //Obtenemos la especialidad recibida por parámetro
  const especialidad = req.params.especialidad.toLowerCase();

  //Vemos si la especialidad está en el listado de especialidades
  if(!especialidades.includes(especialidad)){
    return sendErrorJson(res, `La especialidad solicitada (${especialidad}), no existe en el listado de datos`);
  }

  //Si existe obtenemos los elementos de la especialidad
  const usersEsp = usersData.filter((item) => item.specialty.toLowerCase() === especialidad);

  res.json({
    ok: true,
    data: usersEsp,
  });
};

