import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import UserAccounts from "./UserAccounts";
import { getUserAccounts } from "../Service/Accounts";
import "../css/Menu.css";
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

  const transferirMIO = () => {
    window.location.href = "./transferirMio";
  };

  const transferirOTRO = () => {
    window.location.href = "./transferirOtro";
  };

  console.log("DNI " + cookies.get("username"));
  console.log("Nombre " + cookies.get("nombre"));
  console.log("Dinero " + cookies.get("dinero"));
  return (
    <div className="layout">
      <div className="container">
        <UserAccounts accounts={accounts} />

        <div className="button-wrapper">
          <button className="button" onClick={() => transferirMIO()}>
            Transferir entre mis cuentas
          </button>
          <button className="button" onClick={() => transferirOTRO()}>
            Transferir a otras cuentas
          </button>
          <button className="button" onClick={() => cerraSesion()}>
            {" "}
            Cerrar Sesion
          </button>
        </div>
      </div>
    </div>
  );
}
