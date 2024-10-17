# API de Motor Solution

La API de Motor Solution proporciona un conjunto de endpoints para gestionar la información de los usuarios en la aplicación. Estas funcionalidades permiten a los administradores y a los usuarios interactuar de manera efectiva con el sistema, garantizando un manejo seguro y eficiente de los datos.

## Funcionalidades Principales

### Registro de Usuarios (`/api/register`)
La ruta de registro permite a nuevos usuarios crear una cuenta proporcionando información básica como nombre, correo electrónico, identificación, fecha de nacimiento, rol y contraseña. Este proceso asegura que todos los usuarios tengan credenciales únicas y verificables, lo cual es fundamental para la seguridad del sistema.

- **Método:** POST
- **Cuerpo de Solicitud:** Incluye `name`, `email`, `password`, `identification`, `birth`, `rol`.

### Inicio de Sesión (`/api/login`)
Los usuarios existentes pueden iniciar sesión utilizando su correo electrónico y contraseña. La API verifica las credenciales y, si son válidas, genera un token de autenticación que permite al usuario acceder a recursos protegidos.

- **Método:** POST
- **Cuerpo de Solicitud:** Incluye `email`, `password`.

### Actualización de Contraseña (`/api/update-password`)
Los usuarios pueden actualizar su contraseña proporcionando su contraseña actual y la nueva. Este proceso incluye validaciones para garantizar que la nueva contraseña no sea igual a la anterior y que la contraseña actual sea correcta.

- **Método:** PUT
- **Cuerpo de Solicitud:** Incluye `user_id`, `oldPassword`, `newPassword`.

### Recuperación de Usuarios (`/api/get-user`)
Permite a los administradores recuperar la lista de todos los usuarios en el sistema. Esta función es esencial para la gestión y supervisión de usuarios, facilitando la toma de decisiones informadas.

- **Método:** GET

### Actualización de Información del Usuario (`/api/update-user`)
Los administradores pueden actualizar la información de un usuario, incluyendo su nombre, identificación, correo electrónico, fecha de nacimiento y rol. Esta funcionalidad es crucial para mantener la información actualizada y relevante.

- **Método:** PUT
- **Cuerpo de Solicitud:** Incluye `user_id`, `name`, `user_identification`, `email`, `birth`, `rol`.

### Eliminación de Usuarios (`/api/delete-user/{id}`)
Permite la eliminación de un usuario específico del sistema utilizando su ID. Esta función es fundamental para gestionar la base de datos y asegurar que los usuarios no deseados sean eliminados de manera efectiva.

- **Método:** DELETE
- **Parámetro:** `id` en la ruta.

## Manejo de Errores
Cada función está diseñada para manejar errores de manera efectiva, proporcionando respuestas claras en caso de que algo salga mal. Los errores pueden incluir problemas de validación, errores en la conexión con la base de datos o problemas de autorización.




# Configuración de Variables de Entorno
Para que la API funcione correctamente, debes crear un archivo `.env` en la raíz de tu proyecto con las siguientes variables de entorno:

```markdown

DB_HOST= "tu_host"           # Dirección del servidor de la base de datos (por ejemplo, "localhost" o "127.0.0.1")
DB_USER= "tu_usuario"        # Nombre de usuario para acceder a la base de datos
DB_PASSWORD= "tu_contraseña"  # Contraseña del usuario de la base de datos
DB_NAME= "tu_nombre_bd"       # Nombre de la base de datos que utilizarás
JWT_KEY= "tu_clave_secreta"   # Clave secreta utilizada para firmar los tokens JWT
DB_TABLE_NAME= "tu_nombre_tabla"  # Nombre de la tabla de la base de datos
```

# Pruebas de la API

Una vez que hayas configurado correctamente la aplicación y hayas creado el archivo `.env` con las variables necesarias, podrás probar la API y acceder a la documentación interactiva.

## Acceso a la Documentación

La documentación de la API está disponible en el siguiente enlace:

[http://localhost:4000/api/v1/docs/](http://localhost:4000/api/v1/docs/)

### Instrucciones para Probar la API

1. **Ejecuta el Servidor**: Asegúrate de que tu servidor esté en funcionamiento. Puedes hacerlo ejecutando el siguiente comando en la raíz de tu proyecto:

   ```bash
   npm run dev
   ```

## Conclusión

La API de Motor Solution es una herramienta vital para la gestión de usuarios en la aplicación. Ofrece un conjunto robusto de funcionalidades que permiten a los administradores y usuarios interactuar con el sistema de manera segura y eficiente. Con un enfoque en la seguridad y la facilidad de uso, esta API asegura que las operaciones relacionadas con la gestión de usuarios sean rápidas y efectivas.

