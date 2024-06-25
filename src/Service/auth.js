export async function getAuth(username, password) {
    const baseUrl = "http://localhost:3001/usuarios";
    try {
      const respuesta = await fetch(baseUrl);
      if (!respuesta.ok) {
        throw new Error('Network response was not ok');
      }
  
      const authData = await respuesta.json();
  
      const authenticatedUser = authData.find((item) => {
        console.log(password, item.password);
        if (item.username === username && item.password === password) {
          console.log("correcto");
          alert("Bienvenido " + item.nombre);
          return true;
        }
        return false;
      });
  
      return authenticatedUser || false;
    } catch (error) {
      alert("error de fetch");
      console.error('Fetch error:', error);
      return false;
    }
  }
  