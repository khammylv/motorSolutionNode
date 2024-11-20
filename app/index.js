import express from 'express';
import { methods as authentication } from "./controllers/auth.controllers.js";
import { methods as clients } from "./controllers/clientController.js";
import { methods as users } from "./controllers/userController.js";
import { methods as vehicles } from "./controllers/vehicleController.js";
import dotenv from 'dotenv';
import { swaggerDocs as swaggerDocsV1 } from './swagger.js';
import cors from 'cors';
import { tokens } from './utils/token.js';
dotenv.config();

//Server
const app = express();
const port = 4000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    swaggerDocsV1(app, port);
});

//Configuration
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());


app.get('/data', tokens.verifyToken, (req, res) => {
    res.json({ message: 'Datos protegidos'});
});

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


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     SecretKeyAuth:
 *       type: apiKey
 *       in: header
 *       name: x-secret-key
 *       description: Autenticación basada en una palabra secreta en las cabeceras.
 *       x-secret-key: "mySecretWord123"  # Este es solo un ejemplo para documentación, la clave real debe ser gestionada de forma segura.
 * 
 * security:
 *   - SecretKeyAuth: []  # Aplica la autenticación basada en la palabra secreta a todas las rutas
 *
 * /api/register-admind:
 *   post:
 *     tags:
 *       - Users
 *     summary: Registrar un nuevo usuario administrador principal  la secret key "secret_key_swagger
 *     description: Registra un nuevo usuario administrador proporcionando nombre, correo, identificación, fecha de nacimiento, rol y contraseña".
 *     security:
 *       - SecretKeyAuth: []  # Seguridad aplicada a esta ruta
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
 *         description: Error en la creación del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Respuesta de error del servidor"
 */
app.post("/api/register-admind", tokens.checkSecretKey, authentication.register);

// Ruta para registrar usuarios
/**
 * @swagger
 * /api/register:
 *   post:
 *     tags:
 *       - Users
 *     summary: Registrar un nuevo usuario
 *     description: Registra un nuevo usuario proporcionando nombre, correo, identificación, fecha de nacimiento, rol y contraseña.
 *     security:
 *       - BearerAuth: []  # Requiere un token JWT para autenticar la solicitud
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
 *         description: Error en la creación del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Respuesta de error del servidor"
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT  # Formato del token es JWT
 */
app.post("/api/register", tokens.verifyToken, authentication.register);

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Obtener todos los usuarios
 *     description: Permite obtener una lista de todos los usuarios registrados en el sistema.
 *     security:
 *       - BearerAuth: []  # Requiere un token JWT para autenticar la solicitud
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
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT  # Formato del token es JWT
 */
app.get("/api/users",tokens.verifyToken, users.getAllUser);

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Retrieve user by ID
 *     description: Obtiene la información de un usuario específico a partir de su ID.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []  # Requiere un token JWT para autenticar la solicitud
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del usuario a buscar.
 *     responses:
 *       200:
 *         description: Usuario encontrado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID del usuario.
 *                 name:
 *                   type: string
 *                   description: Nombre del usuario.
 *                 email:
 *                   type: string
 *                   description: Correo electrónico del usuario.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error del servidor.
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT  # Formato del token es JWT
 */
app.get("/api/user/:id",tokens.verifyToken, users.getUser);

/**
 * @swagger
 * /api/update-user:
 *   put:
 *     tags:
 *       - Users
 *     summary: Actualizar información de un usuario
 *     description: Permite actualizar la información de un usuario proporcionando su ID y los nuevos datos.
 *     security:
 *       - BearerAuth: []  # Requiere un token JWT para autenticar la solicitud
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
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT  # Formato del token es JWT
 */
app.put("/api/update-user", tokens.verifyToken, users.updateUser);

/**
 * @swagger
 * /api/update-password:
 *   put:
 *     tags:
 *       - Users
 *     summary: Actualizar la contraseña de un usuario
 *     description: Permite a un usuario actualizar su contraseña proporcionando la contraseña actual y la nueva.
 *     security:
 *       - BearerAuth: []  # Requiere un token JWT para autenticar la solicitud
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
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT  # Formato del token es JWT
 */
app.put("/api/update-password", tokens.verifyToken, authentication.updatePassword);

/**
 * @swagger
 * /api/delete-user/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Eliminar un usuario
 *     description: Permite eliminar un usuario proporcionando su ID.
 *     security:
 *       - BearerAuth: []  # Requiere un token JWT para autenticar la solicitud
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
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT  # Formato del token es JWT
 */
app.delete("/api/delete-user/:id",tokens.verifyToken, users.deleteUser);



//CLIENT ROUTES


/**
 * @swagger
 * /api/register-client:
 *   post:
 *     tags:
 *       - Clients
 *     summary: Registra un nuevo cliente
 *     description: Crea un cliente en el sistema utilizando un correo electrónico, un nombre y una identificación. Verifica si ya existe un cliente con la misma información antes de registrarlo.
 *     security:
 *       - BearerAuth: []  # Se requiere un token Bearer para acceder a este endpoint
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
 *                 description: Correo electrónico del cliente.
 *                 example: cliente@example.com
 *               name:
 *                 type: string
 *                 description: Nombre del cliente.
 *                 example: Juan Pérez
 *               clientIdentification:
 *                 type: string
 *                 description: Identificación única del cliente.
 *                 example: 123456789
 *               phone:
 *                 type: string
 *                 description: Número de teléfono del cliente.
 *                 example: +573001234567
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cliente creado exitosamente.
 *       409:
 *         description: Hubo un error al agregar el cliente, ya existe o datos inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hubo un error al agregar el cliente.
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Error inesperado.
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT  # Formato del token es JWT
 */
app.post("/api/register-client", tokens.verifyToken,  clients.registerClient);

/**
 * @swagger
 * /api/clients:
 *   get:
 *     tags:
 *       - Clients
 *     summary: Obtiene la lista de todos los clientes
 *     description: Recupera un listado completo de todos los clientes registrados en el sistema.
 *     security:
 *       - BearerAuth: []  # Se requiere un token Bearer para acceder a este endpoint
 *     responses:
 *       200:
 *         description: Lista de clientes recuperada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 123456789
 *                   name:
 *                     type: string
 *                     example: Juan Pérez
 *                   email:
 *                     type: string
 *                     format: email
 *                     example: cliente@example.com
 *                   phone:
 *                     type: string
 *                     description: Número de teléfono del cliente.
 *                     example: +573001234567
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Error inesperado.
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT  # Formato del token es JWT
 */
app.get("/api/clients",tokens.verifyToken, clients.getAllClient);

/**
 * @swagger
 * /api/client/{id}:
 *   get:
 *     tags:
 *       - Clients
 *     summary: Obtiene la información de un cliente
 *     description: Recupera los datos de un cliente existente en el sistema mediante su identificación única.
 *     security:
 *       - BearerAuth: []  # Se requiere un token Bearer para acceder a este endpoint
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Identificación única del cliente.
 *         schema:
 *           type: string
 *           example: 123456789
 *     responses:
 *       200:
 *         description: Información del cliente recuperada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 123456789
 *                 name:
 *                   type: string
 *                   example: Juan Pérez
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: cliente@example.com
 *                 phone:
 *                   type: string
 *                   description: Número de teléfono del cliente.
 *                   example: +573001234567
 *       404:
 *         description: Cliente no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cliente no encontrado.
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Error inesperado.
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT  # Formato del token es JWT
 */
app.get("/api/client/:id",tokens.verifyToken, clients.getClient);

/**
 * @swagger
 * /api/clients:
 *   put:
 *     tags:
 *       - Clients
 *     summary: Actualiza la información de un cliente
 *     description: Permite actualizar los datos de un cliente existente en el sistema.
 *     security:
 *       - BearerAuth: []  # Se requiere un token Bearer para acceder a este endpoint
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               client_id:
 *                 type: string
 *                 description: Identificación única del cliente.
 *                 example: 123456
 *               name:
 *                 type: string
 *                 description: Nuevo nombre del cliente.
 *                 example: Juan Pérez
 *               client_identification:
 *                 type: string
 *                 description: Nueva identificación del cliente.
 *                 example: 987654321
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Nuevo correo electrónico del cliente.
 *                 example: juan.perez@example.com
 *               phone:
 *                 type: string
 *                 description: Nuevo número de teléfono del cliente.
 *                 example: +573001234567
 *     responses:
 *       200:
 *         description: Cliente actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cliente actualizado.
 *       400:
 *         description: No se pudo actualizar el cliente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No se pudo actualizar el cliente.
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Error inesperado.
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT  # Formato del token es JWT
 */
app.put("/api/update-client",tokens.verifyToken, clients.updateClient);

/**
 * @swagger
 * /api/delete-client/{id}:
 *   delete:
 *     tags:
 *       - Clients
 *     summary: Elimina un cliente
 *     description: Permite eliminar un cliente existente en el sistema mediante su identificación única.
 *     security:
 *       - BearerAuth: []  # Se requiere un token Bearer para acceder a este endpoint
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Identificación única del cliente a eliminar.
 *         schema:
 *           type: string
 *           example: 123456789
 *       - name: Authorization
 *         in: header
 *         required: true
 *         description: Token JWT para autenticar la solicitud.
 *         schema:
 *           type: string
 *           example: "Bearer {tu_token_jwt}"
 *     responses:
 *       200:
 *         description: Cliente eliminado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cliente eliminado.
 *       400:
 *         description: No se pudo eliminar el cliente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No se pudo eliminar el cliente.
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Error inesperado.
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT  # Formato del token es JWT
 */
app.delete("/api/delete-client/:id",tokens.verifyToken, clients.deleteClient);

//VEHICLES

/**
 * @swagger
 * /api/register-vehicle:
 *   post:
 *     tags:
 *       - Vehicles
 *     summary: Registra un vehículo
 *     description: Crea un nuevo registro de vehículo asociado a un cliente.
 *     security:
 *       - BearerAuth: []  # Se requiere un token Bearer para acceder a este endpoint
 *     requestBody:
 *       description: Datos del vehículo a registrar.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idClient:
 *                 type: string
 *                 description: ID del cliente asociado al vehículo.
 *                 example: "12345"
 *               brand:
 *                 type: string
 *                 description: Marca del vehículo.
 *                 example: "Toyota"
 *               model:
 *                 type: string
 *                 description: Modelo del vehículo.
 *                 example: "Corolla"
 *               plate:
 *                 type: string
 *                 description: Placa del vehículo.
 *                 example: "ABC123"
 *               repair_description:
 *                 type: string
 *                 description: Descripción de la reparación.
 *                 example: "Cambio de aceite"
 *             required:
 *               - idClient
 *               - brand
 *               - model
 *               - plate
 *     responses:
 *       201:
 *         description: Vehículo creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Vehiculo creado exitosamente.
 *       409:
 *         description: Error al registrar el vehículo.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hubo un error al agregar el vehiculo.
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Error inesperado.
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT  # Formato del token es JWT
 */
app.post("/api/register-vehicle",tokens.verifyToken, vehicles.registerVehicle);

/**
 * @swagger
 * /api/vehicles:
 *   get:
 *     tags:
 *       - Vehicles
 *     summary: Obtiene todos los vehículos
 *     description: Recupera una lista de todos los vehículos registrados en el sistema.
 *     security:
 *       - BearerAuth: []  # Se requiere un token Bearer para acceder a este endpoint
 *     responses:
 *       200:
 *         description: Lista de vehículos recuperada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID único del vehículo.
 *                     example: "1"
 *                   idClient:
 *                     type: string
 *                     description: ID del cliente asociado al vehículo.
 *                     example: "12345"
 *                   brand:
 *                     type: string
 *                     description: Marca del vehículo.
 *                     example: "Toyota"
 *                   model:
 *                     type: string
 *                     description: Modelo del vehículo.
 *                     example: "Corolla"
 *                   plate:
 *                     type: string
 *                     description: Placa del vehículo.
 *                     example: "ABC123"
 *                   repair_description:
 *                     type: string
 *                     description: Descripción de la reparación.
 *                     example: "Cambio de aceite"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Error inesperado.
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT  # Formato del token es JWT
 */
app.get("/api/vehicles",tokens.verifyToken, vehicles.getAllVehicle);

/**
 * @swagger
 * /api/vehicle/{id}:
 *   get:
 *     tags:
 *       - Vehicles
 *     summary: Obtiene un vehículo por su ID
 *     description: Recupera los detalles de un vehículo específico utilizando su ID.
 *     security:
 *       - BearerAuth: []  # Se requiere un token Bearer para acceder a este endpoint
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID único del vehículo.
 *         schema:
 *           type: string
 *           example: "1"
 *     responses:
 *       200:
 *         description: Detalles del vehículo recuperados exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID único del vehículo.
 *                   example: "1"
 *                 idClient:
 *                   type: string
 *                   description: ID del cliente asociado al vehículo.
 *                   example: "12345"
 *                 brand:
 *                   type: string
 *                   description: Marca del vehículo.
 *                   example: "Toyota"
 *                 model:
 *                   type: string
 *                   description: Modelo del vehículo.
 *                   example: "Corolla"
 *                 plate:
 *                   type: string
 *                   description: Placa del vehículo.
 *                   example: "ABC123"
 *                 repair_description:
 *                   type: string
 *                   description: Descripción de la reparación.
 *                   example: "Cambio de aceite"
 *       404:
 *         description: El vehículo no fue encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Vehículo no encontrado.
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Error inesperado.
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT  # Formato del token es JWT
 */
app.get("/api/vehicle/:id",tokens.verifyToken, vehicles.getVehicle);

/**
 * @swagger
 * /api/client-vehicles/{id}:
 *   get:
 *     tags:
 *       - Vehicles
 *     summary: Obtiene vehículos por ID del cliente
 *     description: Recupera todos los vehículos asociados a un cliente específico utilizando su ID.
 *     security:
 *       - BearerAuth: []  # Se requiere un token Bearer para acceder a este endpoint
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID único del cliente.
 *         schema:
 *           type: string
 *           example: "12345"
 *     responses:
 *       200:
 *         description: Lista de vehículos asociados al cliente recuperada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID único del vehículo.
 *                     example: "1"
 *                   idClient:
 *                     type: string
 *                     description: ID del cliente asociado al vehículo.
 *                     example: "12345"
 *                   brand:
 *                     type: string
 *                     description: Marca del vehículo.
 *                     example: "Toyota"
 *                   model:
 *                     type: string
 *                     description: Modelo del vehículo.
 *                     example: "Corolla"
 *                   plate:
 *                     type: string
 *                     description: Placa del vehículo.
 *                     example: "ABC123"
 *                   repair_description:
 *                     type: string
 *                     description: Descripción de la reparación.
 *                     example: "Cambio de aceite"
 *       404:
 *         description: No se encontraron vehículos para el cliente proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No se encontraron vehículos para este cliente.
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Error inesperado.
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT  # Formato del token es JWT
 */
app.get("/api/client-vehicles/:id",tokens.verifyToken, vehicles.getVehicleByClient);

/**
 * @swagger
 * /api/update-vehicle:
 *   put:
 *     tags:
 *       - Vehicles
 *     summary: Actualiza un vehículo
 *     description: Actualiza la información de un vehículo existente en el sistema.
 *     security:
 *       - BearerAuth: []  # Se requiere un token Bearer para acceder a este endpoint
 *     requestBody:
 *       description: Datos actualizados del vehículo.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idVehicle:
 *                 type: string
 *                 description: ID único del vehículo.
 *                 example: "1"
 *               idClient:
 *                 type: string
 *                 description: ID del cliente asociado al vehículo.
 *                 example: "12345"
 *               brand:
 *                 type: string
 *                 description: Marca del vehículo.
 *                 example: "Toyota"
 *               model:
 *                 type: string
 *                 description: Modelo del vehículo.
 *                 example: "Corolla"
 *               plate:
 *                 type: string
 *                 description: Placa del vehículo.
 *                 example: "ABC123"
 *               repair_description:
 *                 type: string
 *                 description: Descripción de la reparación.
 *                 example: "Cambio de aceite"
 *             required:
 *               - idVehicle
 *               - idClient
 *               - brand
 *               - model
 *               - plate
 *     responses:
 *       200:
 *         description: Vehículo actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Vehiculo actualizado
 *       400:
 *         description: No se pudo actualizar el vehículo.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No se pudo actualizar el vehiculo
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Error inesperado.
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT  # Formato del token es JWT
 */
app.put("/api/update-vehicle",tokens.verifyToken, vehicles.updateVehicle);

/**
 * @swagger
 * /api/update-date-vehicle/:id:
 *   put:
 *     tags:
 *       - Vehicles
 *     summary: Actualiza la fecha de salida de un vehículo
 *     description: Actualiza la fecha de salida de un vehículo utilizando su ID. Verifica si la operación se realizó correctamente.
 *     security:
 *       - BearerAuth: []  # Se requiere un token Bearer para acceder a este endpoint
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Identificación única del vehículo.
 *         schema:
 *           type: string
 *           example: 123
 *       - name: date
 *         in: body
 *         required: true
 *         description: Nueva fecha de salida del vehículo.
 *         schema:
 *           type: object
 *           properties:
 *             date:
 *               type: string
 *               format: date
 *               description: Fecha de salida del vehículo en formato YYYY-MM-DD.
 *               example: "2024-11-21"
 *     responses:
 *       200:
 *         description: Fecha de salida actualizada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Fecha de salida actualizada
 *       400:
 *         description: No se pudo actualizar la fecha de salida.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No se pudo actualizar la fecha de salida
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Error inesperado.
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT  # Formato del token es JWT
 */
app.put("/api/update-date-vehicle/:id",tokens.verifyToken, vehicles.updateDateVehicle);


/**
 * @swagger
 * /api/delete-vehicle/{id}:
 *   delete:
 *     tags:
 *       - Vehicles
 *     summary: Elimina un vehículo
 *     description: Elimina un vehículo existente del sistema utilizando su ID único. Requiere autenticación.
 *     security:
 *       - BearerAuth: []  # Se requiere un token Bearer para acceder a este endpoint
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID único del vehículo a eliminar.
 *         schema:
 *           type: string
 *           example: "1"
 *     responses:
 *       200:
 *         description: Vehículo eliminado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Vehículo eliminado
 *       400:
 *         description: No se pudo eliminar el vehículo.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No se pudo eliminar el vehículo
 *       401:
 *         description: Token de autorización no proporcionado o inválido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Acceso denegado. No se encontró el token.
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Error inesperado.
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT  # Formato del token es JWT
 */
app.delete("/api/delete-vehicle/:id",tokens.verifyToken, vehicles.deleteVehicle);