import jwt from 'jsonwebtoken';

const generateToken = (userId, name, rol) =>{
    return jwt.sign({ id: userId , name : name, rol: rol}, process.env.JWT_KEY, { expiresIn: '3h' });
}

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers['authorization']; 
        if(!token) {
            return res.status(403).json({message: "Token requerido"})
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.userId = decoded.id;
        next()
    }  catch(err) {
        return res.status(401).json({message: "Token inválido"})
    }

}

const checkSecretKey = (req, res, next)=> {
    try{
        const secretKey = req.headers['x-secret-key']; 
        const validSecretKeys =  [process.env.SECRET_KEY ,process.env.SECRET_KEY_SWAGGER];
        if(secretKey && validSecretKeys.includes(secretKey)) {
            next();
        }else{
            res.status(403).json({ message: 'Acceso denegado. Palabra secreta incorrecta.' });
        }
    }
    catch(err) {
        res.status(403).json({ message: 'Acceso denegado. Palabra secreta incorrecta.' });
    }

  /*  const secretKey = req.headers['x-secret-key']; // La palabra secreta debe enviarse en las cabeceras

    if (secretKey && secretKey === process.env.SECRET_KEY) {
        next(); // Si la palabra secreta es correcta, continuar con la solicitud
    } else {
        res.status(403).json({ message: 'Acceso denegado. Palabra secreta incorrecta.' }); // Si no, denegar el acceso
    }*/
}

export const tokens = {
   generateToken,
   verifyToken,
   checkSecretKey
}