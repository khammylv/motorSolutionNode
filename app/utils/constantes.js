 const query_validate = 'SELECT * FROM tl_users WHERE email = ? OR user_identification = ?';
 const register = 'INSERT INTO tl_users (birth, email, name, rol, user_identification, password) VALUES (?, ?, ?, ?, ? ,?)';
 const getUsers = 'SELECT * FROM tl_users';

export const constans = {
    query_validate,
    register,
    getUsers
 };

 