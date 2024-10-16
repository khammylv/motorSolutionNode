import { validation } from '../utils/validations.js';
import { queries } from '../services/userServices.js';
import { passwords } from '../utils/passwordCheck.js';
import { tokens } from '../utils/token.js';

async function login(req, res) {
    const {email, password} = req.body;
    try{
        const [userExists] = await queries.checkUserExists(email, "");
        if(userExists.length === 0) {
            return res.status(404).json({message : "Usuario no existente."})
        }
         
      const isMatch =  await passwords.isMatch(password, userExists.password);
      if(!isMatch) {
            return res.status(401).json({message : "Contraseña incorrecta."})
        }
      
       const token = tokens.generateToken(userExists.user_id);
       return res.status(201).json({ token: token });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json(err.message);
    }

}

async function register(req, res) {
    const { name, userIdentification, email, birth, rol, password } = req.body;
    try {

        const userExists = await queries.checkUserExists(email, userIdentification);
        const validationUser = validation(req.body);

        if (userExists.length != 0 || validationUser) {
            return res.status(409).json({ message: "Hubo un error al agregar el usuario." });
        }

        const hashedPassword = await passwords.hashPassword(password);
        await queries.registerUser(name, userIdentification, email, birth, rol, hashedPassword);
        return res.status(201).json({ message: "Usuario creado exitosamente." });

    }
    catch (err) {
        console.error(err);
        return res.status(500).json(err.message);
    }
}


export const methods = {
    login,
    register
}