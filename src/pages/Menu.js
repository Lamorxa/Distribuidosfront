import React, { Component } from "react";
import Cookies from "universal-cookie";
import UserAccounts from "./UserAccounts";
const cookies = new Cookies();

class Menu extends Component {

    cerraSesion = () => {
        cookies.remove('username', { path: "/" });
        cookies.remove('nombre', { path: "/" });
        cookies.remove('dinero', { path: "/" })
        window.location.href = "./";
    }

    transferirMIO = () => {
        window.location.href = "./transferirMio";
    }

    transferirOTRO = () => {
        window.location.href = "./transferirOtro";
    }

    componentDidMount() {
        if (!cookies.get('username')) {
            window.location.href = "./";
        }
    }

    render() {
        console.log('DNI ' + cookies.get('username'));
        console.log('Nombre ' + cookies.get('nombre'));
        console.log('Dinero ' + cookies.get('dinero'));
        return (
            <div className='containerPrincipal'>
                <div className='containerSecundario'>
                    <div className='form-group'>
                        <label>Cuentas de {cookies.get('nombre')}</label><br/>
                        <UserAccounts />
                        <button className='btn btn-primary' onClick={() => this.transferirMIO()}>Transferir entre mis cuentas</button><br /><br />
                        <button className='btn btn-primary' onClick={() => this.transferirOTRO()}>Transferir a otras cuentas</button><br /><br />
                        <button className='btn btn-primary' onClick={() => this.cerraSesion()}> Cerrar Sesion</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Menu;