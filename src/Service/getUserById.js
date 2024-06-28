export async function getUserById(id) {
    const api = `http://localhost:8081/api/users/${id}`;
    
    try {
      const result = await fetch(api);
      const userData = await result.json();
      
      if(!result.ok){
        throw  new Error("Esa usuario no existe")
      }

      if (!userData) {
        throw  new Error("Error interno en API")
      }
  
      return userData;
      
    } catch (error) {
      console.error("Error occurred while fetching user accounts:", error);
      return null;
    }
  }
  