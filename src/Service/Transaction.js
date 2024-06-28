export async function transfer(transfer) {
  const api = `http://localhost:8080/api/accounts/transfer`;
  console.log(api);

  try {
    const result = await fetch(api, {
      method: "POST",
      body: JSON.stringify(transfer),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    });

    if(!result.ok){
       throw  new Error("Error interno en API")
    }

    const accountsData = await result.json();
    if(!accountsData){
        throw new Error("Error, intentalo mas tarde")
    }

    return accountsData;

  } catch (error) {
    console.error("Error occurred while fetching user accounts:", error);
    return null;
  }
}
