export async function getUserAccounts(userId) {
  const api = `http://localhost:8080/api/accounts/user/${userId}`;
  console.log(api);
  
  try {
    const result = await fetch(api);
    const accountsData = await result.json();
    
    const response = accountsData.map((item)=>{
      return item
    })

    console.log(response);

    console.log(accountsData);
    if (!accountsData) {
      return null;
    }

    return accountsData;
    
  } catch (error) {
    console.error("Error occurred while fetching user accounts:", error);
    return null;
  }
}
