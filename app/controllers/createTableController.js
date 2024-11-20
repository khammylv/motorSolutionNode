import {createTablesQuerys} from '../services/createTableServices.js';

async function createTableUser(){
  try{
    await createTablesQuerys.createTableUsers();
    console.log('La tabla de usuarios se ha creado correctamente.');
  }
  catch (err) {
    console.error('Error al crear la tabla de usuarios:', err.message);
  }
}

async function createTableClients(){
  try{
    await createTablesQuerys.createTableClients();
    console.log('La tabla de clientes se ha creado correctamente.');
  }
  catch (err) {
    console.error('Error al crear la tabla de clientes:', err.message);
  }
}
async function createTableVehicles(){
  try{
    await createTablesQuerys.createTableVehicles();
    console.log('La tabla de vehiculos se ha creado correctamente.');
  }
  catch (err) {
    console.error('Error al crear la tabla de vehiculos:', err.message);
  }
}

export const createTables = {
    createTableUser,
    createTableClients,
    createTableVehicles
}