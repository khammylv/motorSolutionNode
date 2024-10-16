import jwt from 'jsonwebtoken';

function generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_KEY, { expiresIn: '3h' });
}

export const tokens = {
   generateToken
}