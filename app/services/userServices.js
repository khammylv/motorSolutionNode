import { connectToDatabase } from '../conection/conection.js';
import { constans } from '../utils/constantes.js';


async function checkUserExists(email, userIdentification, user_id) {
    const db = await connectToDatabase();
    const [rows] = await db.query(constans.query_validate, [email, userIdentification, user_id]);
    return rows;
}

// Función para registrar el usuario en la base de datos
async function registerUser(name,userIdentification, email,birth,rol, hashedPassword) {
    const db = await connectToDatabase();
    await db.query(constans.register, 
        [birth, email,name,rol,parseInt(userIdentification), hashedPassword]);
}

async function getAllUser(){
    console.log('query => ', constans.getUsers)
    const db = await connectToDatabase();
    const [users] = await db.query(constans.getUsers);
    return users
}

async function updateUser(userId,name,userIdentification, email,birth,rol){
    const db = await connectToDatabase();
    const [result] =  await db.query(constans.updateUser, 
        [birth, email,name,rol,parseInt(userIdentification) , userId]);
    return result;
}
async function updatePassword(userId,password){
    const db = await connectToDatabase();
    const [result] =  await db.query(constans.updatePassword, 
        [password, userId]);
    return result;
}

async function deleteUser(userId){
    const db = await connectToDatabase();
    const [result] = await db.query(constans.deleteUser, [userId]);
    return result;
}

export const queries = {
    checkUserExists,
    registerUser,
    getAllUser,
    updateUser,
    updatePassword,
    deleteUser
    
}
