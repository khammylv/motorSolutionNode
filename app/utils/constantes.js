 const query_validate = 'SELECT * FROM tl_users WHERE email = ? OR user_identification = ? OR user_id = ?';
 const register = 'INSERT INTO tl_users (birth, email, name, rol, user_identification, password) VALUES (?, ?, ?, ?, ? ,?)';
 const getUsers = 'SELECT * FROM tl_users'; 
 const updateUser = 'UPDATE tl_users SET birth= ?, email= ?,name = ?,rol= ? ,user_identification= ? WHERE user_id = ?';
 const updatePassword = 'UPDATE tl_users SET password = ? WHERE user_id = ?';
 const deleteUser = 'DELETE FROM tl_users WHERE user_id = ?';
export const constans = {
    query_validate,
    register,
    getUsers,
    updateUser,
    updatePassword,
    deleteUser
 };

 