import React, { Component } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class TransferirMio extends Component {

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
                        <label>Cuenta origen</label><br />
                        <input type='text' className='form-control' name='bancoA' value={'Banco A'}readOnly /><br />
                        <label>Cuenta destino</label><br />
                        <select className='form-control' name='banco' readOnly>
                            <option value='Banco A'>Banco A</option>
                            <option value='Banco B'>Banco B</option>
                            <option value='Banco C'>Banco C</option>
                        </select><br/>
                        <button className='btn btn-primary'onClick={() => this.confirmar()}>Confirmar</button><br /><br />
                        <button className='btn btn-primary' onClick={() => this.salir()}>Salir</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default TransferirMio;