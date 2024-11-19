import { connectToDatabase } from '../conection/conection.js';
import { clientConstans } from '../utils/constantes.js';


async function checkClientExists(email, clientIdentification, client_id) {
    const db = await connectToDatabase();
    const [rows] = await db.query(clientConstans.query_validate_client, [client_id , clientIdentification , email]);
    return rows;
}

// Función para registrar el usuario en la base de datos
async function registerClient(email, name,clientIdentification) {
    const db = await connectToDatabase();
    await db.query(clientConstans.client_register, 
        [ email,name,parseInt(clientIdentification)]);
}

async function getAllClient(){
    const db = await connectToDatabase();
    const [clients] = await db.query(clientConstans.getClients);
    return clients
}

async function updateClient(clientId,name,clientIdentification, email){
    const db = await connectToDatabase();
    const [client] =  await db.query(clientConstans.updateClient, 
        [ email,name, parseInt(clientIdentification) , clientId]);
    return client;
}


async function deleteClient(clientId){
    const db = await connectToDatabase();
    const [result] = await db.query(clientConstans.deleteClient, [clientId]);
    return result;
}

export const queries = {
    checkClientExists,
    registerClient,
    getAllClient,
    updateClient,
    deleteClient
}