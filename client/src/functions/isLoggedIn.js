export function isLoggedIn() {
    // Obtén el token de autenticación del almacenamiento local
    const token = localStorage.getItem('token');
  
    // Si el token existe, el usuario está autenticado
    if (token) {
      return true;
    }
  
    // Si no hay token, el usuario no está autenticado
    return false;
  }