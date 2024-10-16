import { queries } from '../services/userServices.js';


async function getUser(req, res) {

  try{
    const users = await queries.getAllUser();
    console.log(users)
  return  res.status(200).json(users); 
}
  catch (err) {
    console.error(err);
    return res.status(500).json(err.message);
}
}

export const methods = {
    getUser
}