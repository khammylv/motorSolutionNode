import bcrypt from 'bcrypt';


// Función para manejar el hash del password
async function hashPassword(password) {
    return await bcrypt.hash(password, 8);
}

// Función para verificar si el password coincide con el hash guardado
async function isMatch(inputPassword, hashedPassword) {
   return await bcrypt.compare(inputPassword, hashedPassword) 
}

export const passwords = {
    hashPassword,
    isMatch
}