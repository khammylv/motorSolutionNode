export const validation = (body) => {

  if (!body) {
    return true;
  }

  // Check if body has required fields
  if (!body.name ||!body.userIdentification ||!body.email || !body.rol || !body.password) {
    return true;
  }


  return false;
}

export const validationClient = (body) => {

  if (!body) {
    return true;
  }

  // Check if body has required fields
  if (!body.name ||!body.clientIdentification ||!body.email) {
    return true;
  }


  return false;
}

export const validationVehicle = (body) => {

  if (!body) {
    return true;
  }

  // Check if body has required fields
  if (!body.idClient ||!body.brand ||!body.model || !body.plate || !body.repair_description) {
    return true;
  }


  return false;
}