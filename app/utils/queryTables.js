import dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();


const createTableUserQuery = `
  CREATE TABLE IF NOT EXISTS ${process.env.DB_TABLE_NAME} (
    user_id INT NOT NULL AUTO_INCREMENT,
    birth DATE NOT NULL,
    email VARCHAR(255) COLLATE utf8mb3_unicode_ci NOT NULL,
    name VARCHAR(150) COLLATE utf8mb3_unicode_ci NOT NULL,
    rol VARCHAR(20) COLLATE utf8mb3_unicode_ci NOT NULL,
    user_identification VARCHAR(100) COLLATE utf8mb3_unicode_ci NOT NULL,
    password VARCHAR(255) COLLATE utf8mb3_unicode_ci NOT NULL,
    PRIMARY KEY (\`user_id\`),
    UNIQUE KEY \`email\` (\`email\`),
    UNIQUE KEY \`user_identification\` (\`user_identification\`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
`;

const createTableClientsQuery = `
  CREATE TABLE IF NOT EXISTS ${process.env.DB_TABLE_CLIENT} (
    client_id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
    name VARCHAR(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
    client_identification INT NOT NULL,
    phone VARCHAR(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
    PRIMARY KEY (\`client_id\`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
`;

const createTableVehicleQuery = `
  CREATE TABLE IF NOT EXISTS ${process.env.DB_TABLE_VEHICLE} (
    id_vehicle INT NOT NULL AUTO_INCREMENT,
    id_client INT DEFAULT NULL,
    brand_vehicle VARCHAR(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
    model_vehicle VARCHAR(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
    fecha_entrada DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_salida DATETIME DEFAULT NULL,
    plate_vehicle VARCHAR(50) COLLATE utf8mb3_unicode_ci NOT NULL,
    repair_description VARCHAR(500) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
    PRIMARY KEY (\`id_vehicle\`),
    KEY \`fk_client_vehicle\` (\`id_client\`),
    CONSTRAINT \`fk_client_vehicle\` FOREIGN KEY (\`id_client\`) REFERENCES \`tbl_clients\` (\`client_id\`) 
      ON DELETE SET NULL 
      ON UPDATE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
`;

export const queryCreationTables = {
    createTableUserQuery,
    createTableClientsQuery,
    createTableVehicleQuery
}