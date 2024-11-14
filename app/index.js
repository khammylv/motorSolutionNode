import express from 'express';
import { methods as authentication } from "./controllers/auth.controllers.js";
import { methods as users } from "./controllers/userController.js";
import dotenv from 'dotenv';
import { swaggerDocs as swaggerDocsV1 } from './swagger.js';
import cors from 'cors';
dotenv.config();

//Server
const app = express();
const port = 4000;

app.listen(port, () => {
    console.log('env db name =>', process.env.DB_TABLE_NAME);
    console.log(`Server running on port ${port}`);
    swaggerDocsV1(app, port);
});

//Configuration
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

//Routes


/**
 * @swagger
 * /api/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: Iniciar sesión de un usuario
 *     description: Permite a un usuario iniciar sesión proporcionando su correo electrónico y contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "juan.perez@example.com"
 *               password:
 *                 type: string
 *                 example: "contraseña_segura"
 *     responses:
 *       201:
 *         description: Inicio de sesión exitoso, se devuelve el token de acceso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR..."
 *       401:
 *         description: Contraseña incorrecta.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contraseña incorrecta."
 *       404:
 *         description: Usuario no existente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario no existente."
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error interno del servidor."
 */
app.post("/api/login", authentication.login);


// Ruta para registrar usuarios
/**
 * @swagger
 * /api/register:
 *   post:
 *     tags:
 *       - Users
 *     summary: Registrar un nuevo usuario
 *     description: Registra un nuevo usuario proporcionando nombre, correo, identificación, fecha de nacimiento, rol y contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Juan Pérez"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "juan.perez02@example.com"
 *               userIdentification:
 *                 type: number
 *                 example: 123456785
 *               birth:
 *                 type: string
 *                 format: date
 *                 example: "1990-01-01"
 *               rol:
 *                 type: string
 *                 example: "administrador"
 *               password:
 *                 type: string
 *                 example: "contraseña_segura"
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario registrado exitosamente"
 *       409:
 *         description: Usuario ya existente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hubo un error al agregar el usuario."
 *       500:
 *         description: Error en la creacion del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Respuesta de error del servidor"
 */
app.post("/api/register", authentication.register);

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Obtener todos los usuarios
 *     description: Permite obtener una lista de todos los usuarios registrados en el sistema.
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user_id:
 *                     type: string
 *                     example: "123456789"
 *                   name:
 *                     type: string
 *                     example: "Juan Pérez"
 *                   email:
 *                     type: string
 *                     format: email
 *                     example: "juan.perez@example.com"
 *                   role:
 *                     type: string
 *                     example: "admin"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error interno del servidor."
 */
app.get("/api/users", users.getUser);

/**
 * @swagger
 * /api/update-user:
 *   put:
 *     tags:
 *       - Users
 *     summary: Actualizar información de un usuario
 *     description: Permite actualizar la información de un usuario proporcionando su ID y los nuevos datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: "123456789"
 *               name:
 *                 type: string
 *                 example: "Juan Pérez"
 *               user_identification:
 *                 type: number
 *                 example: 987654321
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "juan.perez@example.com"
 *               birth:
 *                 type: string
 *                 format: date
 *                 example: "1990-01-01"
 *               rol:
 *                 type: string
 *                 example: "admin"
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario actualizado"
 *       400:
 *         description: Error al actualizar el usuario, ya sea porque no se pudo actualizar o el usuario no existe.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se pudo actualizar el usuario"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error interno del servidor."
 */
app.put("/api/update-user", users.updateUser);

/**
 * @swagger
 * /api/update-password:
 *   put:
 *     tags:
 *       - Users
 *     summary: Actualizar la contraseña de un usuario
 *     description: Permite a un usuario actualizar su contraseña proporcionando la contraseña actual y la nueva.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: "123456789"
 *               oldPassword:
 *                 type: string
 *                 example: "contraseña_actual"
 *               newPassword:
 *                 type: string
 *                 example: "nueva_contraseña_segura"
 *     responses:
 *       200:
 *         description: Contraseña actualizada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contraseña actualizada"
 *       400:
 *         description: Error al actualizar la contraseña, ya sea porque la nueva contraseña es igual a la anterior o no se pudo actualizar.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se pudo actualizar la contraseña"
 *       401:
 *         description: Contraseña actual incorrecta.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contraseña actual incorrecta."
 *       404:
 *         description: Usuario no existente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario no existente."
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error interno del servidor."
 */
app.put("/api/update-password", authentication.updatePassword);

/**
 * @swagger
 * /api/delete-user/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Eliminar un usuario
 *     description: Permite eliminar un usuario proporcionando su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario a eliminar.
 *         schema:
 *           type: string
 *           example: "123456789"
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario eliminado"
 *       400:
 *         description: Error al eliminar el usuario, ya sea porque no se pudo eliminar o el usuario no existe.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se pudo eliminar el usuario"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error interno del servidor."
 */
app.delete("/api/delete-user/:id", users.deleteUser);

