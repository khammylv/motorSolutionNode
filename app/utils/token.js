import jwt from 'jsonwebtoken';

function generateToken(userId, name, rol) {
    return jwt.sign({ id: userId , name : name, rol: rol}, process.env.JWT_KEY, { expiresIn: '3h' });
}

export const tokens = {
   generateToken
}