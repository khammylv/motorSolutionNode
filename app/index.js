import express from 'express';
import {methods as authentication} from "./controllers/auth.controllers.js";
import {methods as users} from "./controllers/userController.js";
import dotenv from 'dotenv';

dotenv.config();

//Server
const app = express();
app.set('port', 4000);
app.listen(app.get('port'));

//Configuration
app.use(express.json());

//Routes

app.post("/api/login",authentication.login);
app.post("/api/register",authentication.register);
app.get("/api/users", users.getUser);
app.put("/api/update", users.updateUser);
app.put("/api/updatePassword", authentication.updatePassword);
app.delete("/api/delete/:id", users.deleteUser);