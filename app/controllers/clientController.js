import { queries } from '../services/clientServices.js';
import { validationClient } from '../utils/validations.js';
async function registerClient(req, res) {
    const { email, name,clientIdentification } = req.body;
    try {
        
        const userExists = await queries.checkClientExists(email, clientIdentification, "");
        const validationUser = validationClient(req.body);
        if (userExists.length != 0 || validationUser) {
            return res.status(409).json({ message: "Hubo un error al agregar el cliente." });
        }

    
        await queries.registerClient(email, name, clientIdentification);
        return res.status(201).json({ message: "Cliente creado exitosamente." });

    }
    catch (err) {
        console.error(err);
        return res.status(500).json(err.message);
    }
}

async function getAllClient(req, res) {

    try{
      const users = await queries.getAllClient();
  
    return  res.status(200).json(users); 
  }
    catch (err) {
      console.error(err);
      return res.status(500).json(err.message);
  }
  }
  async function getClient(req, res) {
    const { id } = req.params;
    try{
      const user = await queries.checkClientExists("","",id);
    return  res.status(200).json(user); 
  }
    catch (err) {
      console.error(err);
      return res.status(500).json(err.message);
  }
  }
  
  async function updateClient(req, res) {
    const { client_id, name, client_identification, email} = req.body;
    try{
  
      const result = await queries.updateClient(client_id, name, client_identification, email);
      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Cliente actualizado' });
    } else {
        res.status(400).json({ message: 'No se pudo actualizar el cliente' });
    }
    }
    catch (err) {
      console.error(err);
      return res.status(500).json(err.message);
  }
  }
  
  async function deleteClient(req, res) {
    const { id } = req.params;
    try{
      const result = await queries.deleteClient(id);
      console.log(result)
      if (result.affectedRows > 0) {
          res.status(200).json({ message: 'Cliente eliminado' });
      } else {
          res.status(400).json({ message: 'No se pudo eliminar el cliente' });
      }
    }
    catch (err) {
      console.error(err);
      return res.status(500).json(err.message);}
  }

export const methods = {
    registerClient,
    getAllClient,
    getClient,
    updateClient,
    deleteClient
}