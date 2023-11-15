const validate = (state) => {
    const errors = {};
    
    const patronEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    const patronCharact = /^[a-zA-Z0-9\s]+$/;
    const patronNumerico = /^[0-9]+$/;
   // const patronPassword = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;
    
    
    if (!state.name) errors.name = 'Este campo es requerido'
    if (!patronCharact.test((state.name))) errors.name = 'Caracteres especiales no son permitidos'
    if (state.name.length > 250){
      errors.name = 'Debe ser menor a 250 caracteres';
    }

    if (!state.last_name) errors.last_name = 'Este campo es requerido'
    if (!patronCharact.test((state.last_name))) errors.last_name = 'Caracteres especiales no son permitidos'
    if (state.last_name.length > 250){
      errors.last_name = 'Debe ser menor a 250 caracteres';
    }

    if(!state.email) errors.email = 'Este campo es requerido'
    if (!patronEmail.test(state.email)) errors.email = 'Debe corresponder a una dirección de correo'
    if (state.email.length > 250){
      errors.email = 'El nombre debe ser menor a 250 caracteres';
    }
   
    if(!state.phone_number) errors.phone = 'Este campo es requerido' 
    if (!patronNumerico.test(state.phone_number)) errors.phone = 'El teléfono debe ser numérico'
    if (state.phone_number.length > 15) {
        errors.phone = 'El campo debe ser menor a 15 digitos'
    }

   return errors;
}

export default validate;