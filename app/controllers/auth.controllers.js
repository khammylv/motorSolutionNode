import { validation } from '../utils/validations.js';
import { queries } from '../services/userServices.js';
import { passwords } from '../utils/passwordCheck.js';
import { tokens } from '../utils/token.js';

async function login(req, res) {
    const {email, password} = req.body;
    try{
        const [userExists] = await queries.checkUserExists(email, "", "");
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

        const userExists = await queries.checkUserExists(email, userIdentification, "");
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
async function updatePassword(req, res) {
    const {user_id, newPassword , oldPassword} = req.body;
    try{
      const [userExists] = await queries.checkUserExists("", "", user_id);
      const isMatch =  await passwords.isMatch(oldPassword, userExists.password);
      if(!isMatch) {
            return res.status(401).json({message : "Contraseña actual incorrecta."})
        }

    const isSamePassword = await passwords.isMatch(newPassword, userExists.password);
    if (isSamePassword) {
        return res.status(400).json({ message: 'La nueva contraseña no debe ser igual a la anterior' });
    } 
    const hashedPassword = await passwords.hashPassword(newPassword);
    const result = await queries.updatePassword(user_id, hashedPassword);
    if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Contraseña actualizado' });
    } else {
        res.status(400).json({ message: 'No se pudo actualizar la contraseña' });
    }
    }
    catch (err) {
      console.error(err);
      return res.status(500).json(err.message);
  }
  }

export const methods = {
    login,
    register,
    updatePassword
}