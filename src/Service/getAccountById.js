export async function getAccountById(userAccount) {
    const api = `http://localhost:8080/api/accounts/${userAccount}`;
    console.log(api);
    
    try {
      const result = await fetch(api);
      const accountData = await result.json();
      
      if(!result.ok){
        throw  new Error("Esa cuenta no existe")
      }

      if (!accountData) {
        throw  new Error("Error interno en API")
      }
  
      return accountData;
      
    } catch (error) {
      console.error("Error occurred while fetching user accounts:", error);
      return null;
    }
  }
  