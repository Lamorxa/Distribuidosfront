import React, { Component } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class TransferirOtro extends Component {

    salir = () => {
        window.location.href = "./menu";
    }

    confirmar = () => {
        window.location.href = "./menu";
    }

    render() {
        return (
            <div className='containerPrincipal'>
                <div className='containerSecundario'>
                    <div className='form-group'>
                        <label>Cuenta destino</label><br />
                        <input type='text' className='form-control' name='destino'/><br />
                        <label>Cuenta origen</label><br />
                        <input type='text' className='form-control' name='bancoA' value={'Banco A'} readOnly /><br />
                        <button className='btn btn-primary' onClick={() => this.confirmar()}>Confirmar</button><br /><br />
                        <button className='btn btn-primary' onClick={() => this.salir()}>Salir</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default TransferirOtro;