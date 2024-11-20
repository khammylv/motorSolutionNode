import { queries } from '../services/vehicleServices.js';
import { validationVehicle } from '../utils/validations.js';
async function registerVehicle(req, res) {
    const { idClient, brand, model ,plate ,repair_description} = req.body;
    try {
        
        const vehicleExists = await queries.checkVehicleExists("", "", plate);
        const validationVehicles = validationVehicle(req.body);
        if (vehicleExists.length != 0 || validationVehicles) {
            return res.status(409).json({ message: "Hubo un error al agregar el vehiculo." });
        }

    
        await queries.registerVehicle(idClient, brand, model ,plate ,repair_description);
        return res.status(201).json({ message: "Vehiculo creado exitosamente." });

    }
    catch (err) {
        console.error(err);
        return res.status(500).json(err.message);
    }
}

async function getAllVehicle(req, res) {

    try{
      const users = await queries.getAllVehicle();
  
    return  res.status(200).json(users); 
  }
    catch (err) {
      console.error(err);
      return res.status(500).json(err.message);
  }
  }
  async function getVehicle(req, res) {
    const { id } = req.params;
    try{
      const user = await queries.checkVehicleExists(id,"","");
    return  res.status(200).json(user); 
  }
    catch (err) {
      console.error(err);
      return res.status(500).json(err.message);
  }
  }
  async function getVehicleByClient(req, res) {
    const { id } = req.params;
    try{
      const user = await queries.checkVehicleExists("",id,"");
    return  res.status(200).json(user); 
  }
    catch (err) {
      console.error(err);
      return res.status(500).json(err.message);
  }
  }
  
  async function updateVehicle(req, res) {
    const { idClient, brand, model ,plate ,repair_description, idVehicle} = req.body;
    try{
  
      const result = await queries.updateVehicle(idVehicle,idClient, brand, model ,plate ,repair_description);
      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Vehiculo actualizado' });
    } else {
        res.status(400).json({ message: 'No se pudo actualizar el vehiculo' });
    }
    }
    catch (err) {
      console.error(err);
      return res.status(500).json(err.message);
  }
  }

  async function updateDateVehicle(req, res) {
    const { id } = req.params;
    try{
  
      const result = await queries.updateDateVehicle(id);
      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Fecha de salida actualizada' });
    } else {
        res.status(400).json({ message: 'No se pudo actualizar la fecha de salida' });
    }
    }
    catch (err) {
      console.error(err);
      return res.status(500).json(err.message);
  }
  }
  
  async function deleteVehicle(req, res) {
    const { id } = req.params;
    try{
      const result = await queries.deleteVehicle(id);
      console.log(result)
      if (result.affectedRows > 0) {
          res.status(200).json({ message: 'Vehiculo eliminado' });
      } else {
          res.status(400).json({ message: 'No se pudo eliminar el vehiculo'});
      }
    }
    catch (err) {
      console.error(err);
      return res.status(500).json(err.message);}
  }

  export const methods = {
    registerVehicle,
    getAllVehicle,
    getVehicle,
    getVehicleByClient,
    updateVehicle,
    updateDateVehicle,
    deleteVehicle
  }