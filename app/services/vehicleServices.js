import { connectToDatabase } from '../conection/conection.js';
import { vehicleConstans } from '../utils/constantes.js';


async function checkVehicleExists(idVehicle,idClient, plate) {
    const db = await connectToDatabase();
    const [rows] = await db.query(vehicleConstans.query_validate_vehicle, [idVehicle, idClient, plate]);
    return rows;
}

// Función para registrar el usuario en la base de datos
async function registerVehicle(idClient, brand, model ,plate ,repair_description) {
    const db = await connectToDatabase();
    await db.query(vehicleConstans.vehicleRegister, 
        [parseInt(idClient), brand, model,plate,repair_description]);
}

async function getAllVehicle(){
    const db = await connectToDatabase();
    const [users] = await db.query(vehicleConstans.getVehicle);
    return users
}

async function updateVehicle(idVehicle,idClient, brand, model ,plate ,repair_description){
    const db = await connectToDatabase();
    const [result] =  await db.query(vehicleConstans.udpateVehicle, 
        [parseInt(idClient), brand, model, plate, repair_description, idVehicle]);
    return result;
}
async function updateDateVehicle(idVehicle){
    const db = await connectToDatabase();
    const [result] =  await db.query(vehicleConstans.editDepartureDate, 
        [ idVehicle]);
    return result;
}


async function deleteVehicle(idVehicle){
    const db = await connectToDatabase();
    const [result] = await db.query(vehicleConstans.deleteVehicle, [idVehicle]);
    return result;
}

export const queries = {
    checkVehicleExists,
    registerVehicle,
    getAllVehicle,
    updateVehicle,
    updateDateVehicle,
    deleteVehicle
}