import { connectToDatabase } from '../conection/conection.js';
import {queryCreationTables} from '../utils/queryTables.js';


async function createTableUsers() {
    const db = await connectToDatabase();
    const [result] = await db.query(queryCreationTables.createTableUserQuery);
    return result;
}

async function createTableClients() {
    const db = await connectToDatabase();
    const [result] = await db.query(queryCreationTables.createTableClientsQuery);
    return result;
}

async function createTableVehicles() {
    const db = await connectToDatabase();
    const [result] = await db.query(queryCreationTables.createTableVehicleQuery);
    return result;
}


export const createTablesQuerys = {
    createTableUsers,
    createTableClients,
    createTableVehicles
}