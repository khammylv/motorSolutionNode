import jwt from 'jsonwebtoken';

function generateToken(userId) {
    console.log('env db name =>', process.env.DB_TABLE_NAME);
    return jwt.sign({ id: userId }, process.env.JWT_KEY, { expiresIn: '3h' });
}

export const tokens = {
   generateToken
}