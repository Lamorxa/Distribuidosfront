import React, { useState } from "react";
import "../css/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "universal-cookie";
import { getAuth } from "../Service/auth";

const cookies = new Cookies();

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const iniciar = async () => {
    try {
      const { username, password } = form;
      console.log(username, password);
      const loginData = {
        username: username,
        password:password
      }
      const respuesta = await getAuth(loginData);
      console.log(respuesta);

      if (respuesta === null || respuesta === undefined) {
        throw new Error("resultados no validos");
      }
      console.log(respuesta);
      return respuesta;
    } catch (error) {
      alert(error);
    }
  };

  const iniciarSesion = async () => {
    const res = await iniciar();
    console.log(res);
    if (res) {
      cookies.set("username", res.username, { path: "/" });
      cookies.set("nombre", res.nombre, { path: "/" });
      cookies.set("userId", res.userId, { path: "/" });
      window.location.href = "./menu";
    }
  };

 
  return (
    <div className="containerPrincipal">
      <div className="containerSecundario">
        <div className="form-group">
          <label>BANCO A</label>
          <br />
          <label>DNI del usuario</label>
          <br />
          <input
            type="text"
            className="form-control"
            name="username"
            value={form.username}
            onChange={handleChange}
          />
          <br />
          
          <label>Password</label>
          <br />
          <input
            type="password"
            className="form-control"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          <br />
          <button className="btn btn-primary" onClick={iniciarSesion}>
            Iniciar
          </button>
        </div>
      </div>
    </div>
  );
}
