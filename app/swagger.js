import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
    definition: {
      openapi: "3.0.0",
      info: { title: "Motor Solution", version: "1.0.0" ,description: 'La API de Motor Solution proporciona un conjunto de endpoints para gestionar la información de los usuarios en la aplicación. Estas funcionalidades permiten a los administradores y a los usuarios interactuar de manera efectiva con el sistema, garantizando un manejo seguro y eficiente de los datos.',
        contact: {
            name: "Maria Camila Leal Vasquez",
            url: "https://mariacamilaportafolio.netlify.app/",
            email: "khammylv@gmail.com"
          },

      },
    },
    apis: [path.join(__dirname, './index.js')],
  };

const swaggerSpec = swaggerJSDoc(options);

export const swaggerDocs = (app, port)=>{
    app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log(`Swagger docs are running at http://localhost:${port}/api/v1/docs`);
}
