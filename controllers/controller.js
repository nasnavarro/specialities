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

// Función que devuelve el html para la ruta index
export const getIndexHtml = (req, res) => {
  const especialidades = getEspecialidades();

  const links = especialidades
    .map(esp => `<li><a href="/${esp}">${esp}</a></li><br/>`)
    .join('');

  res.send(`
    <!DOCTYPE html>
    <html>
      <body>
        <h1>HOME</h1>
        <p>Elige la especialidad</p>
        <ul>${links}</ul>
      </body>
    </html>
  `);
};

// Función que devuelve el html para la ruta de una especialidad
export const getUsersBySpecialtyHtml = (req, res) => {
  let retval = {result:true, data: [], message:''};

  //Obtenemos la especialidad recibida por parámetro
  const especialidad = req.params.especialidad.toLowerCase();

  if (!verifyUsersData(res)){
    retval.result = false;
    retval.message = 'No hay datos de usuario cargados';
  }else{
    //Obtenemos las especialidades disponibles
    const especialidades = getEspecialidades();

    //Vemos si la especialidad está en el listado de especialidades
    if(!especialidades.includes(especialidad)){
        retval.result = false;
        retval.message = `La especialidad solicitada (${especialidad}), no existe en el listado de datos`;
    }else{
        //Si existe obtenemos los elementos de la especialidad
        retval.data = usersData.filter((item) => item.specialty.toLowerCase() === especialidad);
    }
  }

  let content = '';

  if(retval.result){
    content += `<p>Número de personas: ${retval.data.length}`;
    content += retval.data
    .map(esp => `<p><b>ID:</b> ${esp.id}<br/><b>Nombre:</b> ${esp.name}<br/><b>Edad:</b> ${esp.age}</p>`)
    .join('');
  }else{
    content = retval.message;
  }

  res.send(`
    <!DOCTYPE html>
    <html>
      <body>
        <h1 style="text-transform:uppercase">${especialidad}</h1>
        ${content}
        <p><a href="/">Volver</a></p>
      </body>
    </html>
  `);
};