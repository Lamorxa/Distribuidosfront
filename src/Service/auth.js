async function getLocalUser(loginData) {
  try {
    const response = await fetch('/localUsersbank1.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const users = await response.json();

    // Buscar el usuario por username y password
    const user = users.find(user => 
      user.username === loginData.username && user.password === loginData.password
    );

    console.log('Local user found:', user); // Log para depuración

    return user || null;
  } catch (error) {
    console.error("Error occurred while fetching local users:", error);
    return null;
  }
}

export async function getAuth(loginData) {
  const localUser = await getLocalUser(loginData);
  console.log('Login data:', loginData); // Log para depuración

  if (localUser) {
    return localUser;
  }

  const baseUrl = "http://localhost:8081/api/users/auth";
  console.log('API login data:', loginData); // Log para depuración

  try {
    const respuesta = await fetch(baseUrl, {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    });

    // Verificar si la respuesta no es correcta (status no en el rango 200-299)
    if (!respuesta.ok) {
      console.log(respuesta);
      throw new Error('Network response was not ok');
    }

    const user = await respuesta.json();

    console.log('API user found:', user); // Log para depuración

    // Verificar si el usuario es nulo o indefinido
    if (!user) {
      throw new Error("No existe");
    }

    // Devolver el objeto user si todo fue bien
    return user;

  } catch (error) {
    alert("No existe");
    console.error('Fetch error:', error);
    return false; // Devolver false en caso de error
  }
}
