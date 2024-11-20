import dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();



const query_validate = `SELECT * FROM ${process.env.DB_TABLE_NAME} WHERE email = ? OR user_identification = ? OR user_id = ?`;
const register = `INSERT INTO ${process.env.DB_TABLE_NAME} (birth, email, name, rol, user_identification, password) VALUES (?, ?, ?, ?, ? ,?)`;
const getUsers = `SELECT * FROM ${process.env.DB_TABLE_NAME}`;
const updateUser = `UPDATE ${process.env.DB_TABLE_NAME} SET birth= ?, email= ?,name = ?,rol= ? ,user_identification= ? WHERE user_id = ?`;
const updatePassword = `UPDATE ${process.env.DB_TABLE_NAME} SET password = ? WHERE user_id = ?`;
const deleteUser = `DELETE FROM ${process.env.DB_TABLE_NAME} WHERE user_id = ?`;

const query_validate_client = `SELECT * FROM ${process.env.DB_TABLE_CLIENT} WHERE client_id = ? OR 	client_identification = ? OR email = ?`;
const client_register = `INSERT INTO ${process.env.DB_TABLE_CLIENT} (email, name, client_identification, phone) VALUES (?,?,?,?)`;
const getClients = `SELECT * FROM ${process.env.DB_TABLE_CLIENT}`;
const updateClient= `UPDATE ${process.env.DB_TABLE_CLIENT} SET email = ? , name = ? , client_identification = ? , phone = ?WHERE client_id = ?`;
const deleteClient = `DELETE FROM ${process.env.DB_TABLE_CLIENT} WHERE client_id = ?`;

const query_validate_vehicle = `SELECT * FROM ${process.env.DB_TABLE_VEHICLE} WHERE id_vehicle =? OR id_client = ? OR plate_vehicle = ?`;
const vehicleRegister = `INSERT INTO ${process.env.DB_TABLE_VEHICLE} (id_client, brand_vehicle, model_vehicle, plate_vehicle, repair_description) VALUES (?,?,?,?,?)`;
const getVehicle = `SELECT * FROM ${process.env.DB_TABLE_VEHICLE}`;
const udpateVehicle = `UPDATE ${process.env.DB_TABLE_VEHICLE} SET id_client=?,brand_vehicle= ?,model_vehicle= ?,plate_vehicle= ? ,repair_description = ? WHERE id_vehicle = ? `;
const deleteVehicle = `DELETE FROM ${process.env.DB_TABLE_VEHICLE} WHERE id_vehicle = ?`;
const editDepartureDate = `UPDATE ${process.env.DB_TABLE_VEHICLE} SET fecha_salida = NOW() WHERE id_vehicle = ?`;

export const constans = {
    query_validate,
    register,
    getUsers,
    updateUser,
    updatePassword,
    deleteUser
};


export const clientConstans = {
    query_validate_client,
    client_register,
    getClients,
    updateClient,
    deleteClient
}

export const vehicleConstans = {
    query_validate_vehicle,
    vehicleRegister,
    getVehicle,
    udpateVehicle,
    deleteVehicle,
    editDepartureDate
}