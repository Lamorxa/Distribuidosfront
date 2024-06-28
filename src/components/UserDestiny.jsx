import React, { useEffect, useState } from "react";
import { getUserById } from "../Service/getUserById";

export default function UserDestiny({destinyAccount}) {

    const [name, setName] = useState("");

    useEffect(() => {
        async function getData() {
          const user = await getUserById(destinyAccount.userId);
        setName(user.name)
        }
    
        getData();
      }, [destinyAccount.userId]);
   
    
  return (
    <div class="card border-secondary mb-3">
      <div class="card-header">Depositar a {name} - COD: {destinyAccount.userId}</div>
      <div class="card-body text-secondary">
        <h5 class="card-title">{destinyAccount.uuid}</h5>
        <p class="card-text">
          {destinyAccount.bankId}
        </p>
      </div>
    </div>
  );
}
