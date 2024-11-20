# API de Motor Solution

Nuestra API está diseñada para optimizar la gestión de talleres automotrices, ofreciendo un sistema integral para registrar y administrar usuarios, clientes y vehículos. A continuación, te presentamos sus principales funcionalidades:

#### 1. **Gestión de Usuarios**  
La API permite la creación y administración de usuarios con roles específicos, asegurando un control eficiente sobre los permisos y accesos:  
- **Administradores**: usuarios con acceso total al sistema, responsables de gestionar empleados, clientes y configuraciones generales.  
- **Empleados**: usuarios con acceso limitado, enfocados en la atención al cliente y el registro de vehículos y sus visitas al taller.  

##### Funciones principales:  
- Registro de nuevos usuarios con datos básicos (nombre, correo electrónico, rol, contraseña).  
- Autenticación y autorización según el rol asignado.  
- Actualización y eliminación de perfiles de usuarios.  

#### 2. **Gestión de Clientes**  
La API permite registrar clientes del taller, almacenando información clave para personalizar la experiencia del servicio.  

##### Funciones principales:  
- Registro de nuevos clientes con detalles como nombre, número de contacto y correo electrónico.  
- Actualización de la información del cliente según sea necesario.  
- Listado de clientes registrados, incluyendo historial de visitas.  

#### 3. **Registro y Gestión de Vehículos**  
El sistema facilita el registro de vehículos asociados a cada cliente, asegurando un seguimiento detallado de cada caso atendido en el taller.  

##### Funciones principales:  
- Asociación de vehículos a un cliente específico, con datos como marca, modelo, año y matrícula.  
- Registro detallado de la visita al taller:  
  - Fecha de ingreso.  
  - Razón de la visita (ejemplo: mantenimiento preventivo, reparación específica, diagnóstico técnico).  
  - Observaciones adicionales.  
- Historial completo de visitas por vehículo para consultas futuras.  

#### 4. **Consulta de Información y Reportes**  
La API incluye funcionalidades para realizar consultas y generar reportes:  
- Historial de clientes y vehículos.  
- Razones más comunes de visitas al taller.  
- Desempeño de empleados en la atención al cliente.  

Esta API está diseñada para ser altamente escalable y segura, integrándose fácilmente con sistemas existentes y adaptándose a las necesidades de talleres de cualquier tamaño.

# Configuración de Variables de Entorno
Para que la API funcione correctamente, debes crear un archivo `.env` en la raíz de tu proyecto con las siguientes variables de entorno:

```markdown

DB_HOST= "tu_host"           # Dirección del servidor de la base de datos (por ejemplo, "localhost" o "127.0.0.1")
DB_USER= "tu_usuario"        # Nombre de usuario para acceder a la base de datos
DB_PASSWORD= "tu_contraseña"  # Contraseña del usuario de la base de datos
DB_NAME= "tu_nombre_bd"       # Nombre de la base de datos que utilizarás
JWT_KEY= "tu_clave_secreta"   # Clave secreta utilizada para firmar los tokens JWT
DB_TABLE_NAME= "tu_nombre_tabla"  # Nombre de la tabla de la base de datos
DB_TABLE_CLIENT = "tabla_cliente"  # Nombre de la tabla clientes de la base de datos
DB_TABLE_VEHICLE = "tabla_vehiculo" # Nombre de la tabla vehiculos de la base de datos
SECRET_KEY = "llave_secreta_creacion_de_administrador" # Nombre de la llave secreta para creacion del administrador principal
SECRET_KEY_SWAGGER = "secret_key_swagger" # Nombre de la llave secreta para creacion del administrador principal usada para test de api
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

