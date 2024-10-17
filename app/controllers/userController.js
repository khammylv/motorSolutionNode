import { queries } from '../services/userServices.js';


async function getUser(req, res) {

  try{
    const users = await queries.getAllUser();
    console.log(users)
  return  res.status(200).json(users); 
}
  catch (err) {
    console.error(err);
    return res.status(500).json(err.message);
}
}

async function updateUser(req, res) {
  const { user_id, name, user_identification, email, birth, rol} = req.body;
  try{

    const result = await queries.updateUser(user_id, name, user_identification, email, birth, rol);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Usuario actualizado' });
  } else {
      res.status(400).json({ message: 'No se pudo actualizar el usuario' });
  }
  }
  catch (err) {
    console.error(err);
    return res.status(500).json(err.message);
}
}

async function deleteUser(req, res) {
  const { id } = req.params;
  try{
    const result = await queries.deleteUser(id);
    if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Usuario eliminado' });
    } else {
        res.status(400).json({ message: 'No se pudo eliminar el usuario' });
    }
  }
  catch (err) {
    console.error(err);
    return res.status(500).json(err.message);}
}

export const methods = {
    getUser,
    updateUser,
    deleteUser
}