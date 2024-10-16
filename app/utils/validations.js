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

