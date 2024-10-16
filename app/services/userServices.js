import { connectToDatabase } from '../conexion/conection.js';
import { constans } from '../utils/constantes.js';


async function checkUserExists(email, userIdentification) {
    const db = await connectToDatabase();
    const [rows] = await db.query(constans.query_validate, [email, userIdentification]);
    return rows;
}

// Función para registrar el usuario en la base de datos
async function registerUser(name,userIdentification, email,birth,rol, hashedPassword) {
    const db = await connectToDatabase();
    await db.query(constans.register, 
        [birth, email,name,rol,parseInt(userIdentification), hashedPassword]);
}

async function getAllUser(){
    const db = await connectToDatabase();
    //  const [rows] = await db.query('SELECT * FROM tl_users');
    const [users] = await db.query(constans.getUsers);
    return users
}

export const queries = {
    checkUserExists,
    registerUser,
    getAllUser
}
