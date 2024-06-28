import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import UserAccounts from "./UserAccounts";
import { getUserAccounts } from "../Service/Accounts";
import "../css/Menu.css";
import Navar from "../components/Navar";
const cookies = new Cookies();

export default function Menu() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    if (!cookies.get("username")) {
      window.location.href = "./";
    }
  }, []);

  useEffect(() => {
    async function getData() {
      const userId = cookies.get("userId");
      const accounts = await getUserAccounts(userId);
      console.log(accounts);
      setAccounts(accounts);
    }

    getData();
  }, []);

  const cerraSesion = () => {
    cookies.remove("username", { path: "/" });
    cookies.remove("nombre", { path: "/" });
    cookies.remove("dinero", { path: "/" });
    window.location.href = "./";
  };

  console.log("DNI " + cookies.get("username"));
  console.log("Nombre " + cookies.get("nombre"));
  console.log("Dinero " + cookies.get("dinero"));

  return (
    <div
      className="d-flex flex-column align-items-center"
      style={{ width: "100%", height: "100vh" }}
    >
      <div style={{ width: "100%" }}>
        <Navar></Navar>
      </div>

      <div className="card" style={{ width: "40rem" }}>
        <div className="card-header text-center">
          <h5>Mis Cuentas</h5>
        </div>
        <div className="card-body p-5">
          <div className="form-group">
            <UserAccounts accounts={accounts} />
          </div>
          <div class="d-grid gap-2 col-12 mx-auto .-5">
          <button
            className="btn btn-danger btn-lg btn-block"
            onClick={() => cerraSesion()}
          >
            Salir
          </button>
        </div>
        </div>
        
      </div>
    </div>
  );
}
