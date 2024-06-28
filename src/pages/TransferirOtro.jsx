import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { getUserAccounts } from "../Service/Accounts";
import { transfer } from "../Service/Transaction";
import Navar from "../components/Navar";
import { getAccountById } from "../Service/getAccountById";
import UserDestiny from "../components/UserDestiny";

const cookies = new Cookies();

export default function TransferirOtro() {
  const [accounts, setAccounts] = useState([]);
  const [origin, setOrigin] = useState("");
  const [originBalance, setOriginBalace] = useState(0);
  const [destiny, setDestiny] = useState("");
  const [userDestinyId, setUserDestinyId] = useState("");
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!cookies.get("username")) {
      window.location.href = "./";
    }
  }, []);

  const reloadData = async () => {
    const userId = cookies.get("userId");
    const accounts = await getUserAccounts(userId);
    console.log(accounts);
    setAccounts(accounts);
  };

  const handleSelectOrigin = (account) => {
    const acountData = account.split(",");
    const uuid = acountData[0];
    const balance = acountData[2];
    console.log(balance);
    setOrigin(uuid);
    setOriginBalace(balance);
  };

  const handleSelectDestiny = (account) => {
    setDestiny(account);
  };

  useEffect(() => {
    async function getData() {
      const userId = cookies.get("userId");
      const accountsRes = await getUserAccounts(userId);
      console.log(accountsRes);
      setAccounts(accountsRes);
      setOriginBalace(accountsRes[0].balance);
      setOrigin(accountsRes[0].uuid);
    }

    getData();
  }, []);

  const salir = () => {
    window.location.href = "./menu";
  };

  const confirmTransaction = async () => {
    setLoading(true);

    if (Number.parseInt(originBalance) < Number.parseInt(amount)) {
      console.log(originBalance, amount);
      alert("Saldo insuficiente");
      setLoading(false);
      return;
    }

    if (origin.trim() === "" || origin.trim() === "" || amount <= 0) {
      alert("llena todos los datos");

      setLoading(false);
      return;
    }
    const transaction = {
      origin: origin,
      destiny: destiny,
      balance: Number.parseFloat(amount).toFixed(2),
    };
    console.log(transaction);

    const transactionResult = await transfer(transaction);
    if (!transactionResult || transactionResult.uuid === undefined) {
      alert("Ocurrió un erro, intentalo mas tarde");
      setLoading(false);
      return;
    }

    alert("Transaccion realizada con exito");
    reloadData();
    setLoading(false);
  };

  const serchDesinyAccount = async () => {

    if(String(destiny).trim()===""){
      alert("No ingreses datos vacios")
      return
    }
    try {
      const result = await getAccountById(destiny);
      if (!result || result === undefined) {
        alert("La cuenta que busca no existe");
        return;
      }
      

      console.log(result);
      setDestiny(result.uuid);
      setUserDestinyId(result.userId);
    } catch (error) {
      alert(error);
    }
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  if (accounts.length === 0) {
    return <div>No tienes cuentas registradas</div>;
  }
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
          <h5>Transferir a otra cuenta</h5>
        </div>
        <div className="card-body">
          <div className="form-group">
            <label className="mb-2">Cuenta origen</label>

            <select
              className="form-control mb-2"
              name="banco"
              onChange={(event) => handleSelectOrigin(event.target.value)}
            >
              {accounts.map((account) => (
                <option
                  key={account.uuid}
                  value={`${account.uuid},${account.bankId},${account.balance}`}
                >
                  BANCO: {account.bankId} -{" "}
                  <span style={{ fontWeight: "bold" }}>{account.uuid}</span> -
                  S/. {Number.parseFloat(account.balance).toFixed(2)}
                </option>
              ))}
            </select>

            <div class="input-group mb-3">
              <span class="input-group-text">Cuenta Destino</span>
              <input
                class="form-control"
                type="text"
                value={destiny}
                onChange={(event) => handleSelectDestiny(event.target.value)}
              />
            </div>

            <div class="d-grid gap-2 col-12 mx-auto mb-3">
              <button
                className="btn btn-success btn-lg btn-block"
                onClick={() => serchDesinyAccount()}
              >
                {loading ? (
                  <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <div>Buscar cuenta Destino</div>
                )}
              </button>
            </div>

            {userDestinyId !== "" && userDestinyId !== undefined && (
              <div>
               <UserDestiny destinyAccount={{userId:userDestinyId, uuid: destiny}} />

                <div class="input-group mb-3">
                  <span class="input-group-text">$</span>
                  <input
                    type="text"
                    class="form-control"
                    value={amount}
                    onChange={(event) => handleAmountChange(event)}
                    aria-label="Amount (to the nearest dollar)"
                  />
                </div>

                <div class="d-grid gap-2 col-12 mx-auto mb-3">
                  <button
                    className="btn btn-primary btn-lg btn-block"
                    onClick={() => confirmTransaction()}
                  >
                    {loading ? (
                      <div class="d-flex justify-content-center">
                        <div class="spinner-border" role="status">
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <div>Comfirmar</div>
                    )}
                  </button>
                </div>
              </div>
            )}

            <div class="d-grid gap-2 col-12 mx-auto">
              <button
                className="btn btn-danger btn-lg btn-block"
                onClick={() => salir()}
              >
                Salir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
