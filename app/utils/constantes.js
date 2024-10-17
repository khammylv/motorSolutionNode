import dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();



const query_validate = `SELECT * FROM ${process.env.DB_TABLE_NAME} WHERE email = ? OR user_identification = ? OR user_id = ?`;
const register = `INSERT INTO ${process.env.DB_TABLE_NAME} (birth, email, name, rol, user_identification, password) VALUES (?, ?, ?, ?, ? ,?)`;
const getUsers = `SELECT * FROM ${process.env.DB_TABLE_NAME}`;
const updateUser = `UPDATE ${process.env.DB_TABLE_NAME} SET birth= ?, email= ?,name = ?,rol= ? ,user_identification= ? WHERE user_id = ?`;
const updatePassword = `UPDATE ${process.env.DB_TABLE_NAME} SET password = ? WHERE user_id = ?`;
const deleteUser = `DELETE FROM ${process.env.DB_TABLE_NAME} WHERE user_id = ?`;
export const constans = {
    query_validate,
    register,
    getUsers,
    updateUser,
    updatePassword,
    deleteUser
};

