export async function getAuth(loginData) {
    const baseUrl = "http://localhost:8081/api/users/auth";
console.log(loginData);
    try {
      const respuesta = await fetch(baseUrl,{
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      });
      if (!respuesta.ok) {
        console.log(respuesta);
        throw new Error('Network response was not ok');
      }
  
      const user = await respuesta.json();
      if(!user){
      throw new Error("No existe")
      }

  
      return user
    } catch (error) {
      alert("No existe");
      console.error('Fetch error:', error);
      return false;
    }
  }
  