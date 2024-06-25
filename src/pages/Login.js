import React, { Component } from 'react';
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';
import { getAuth } from '../Service/auth';

const baseUrl = "http://localhost:3001/usuarios";
const cookies = new Cookies();



class Login extends Component {

    state = {
        form: {
            username: "",
            password: ""
        }
    }

    handleChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }


     iniciar = async () =>{
        try {
        const { username, password } = this.state.form; 
        console.log(username,password);
        const respuesta = await getAuth(username,password)
        console.log(respuesta);

        if(respuesta===null || respuesta === undefined){
            throw new Error("resultados no validos")
        }
        console.log(respuesta);
        return respuesta
     

        } catch (error) {
            alert(error)
        }
    }

    iniciarSesion = async () => {
        const res = await this.iniciar();
        console.log(res);
        cookies.set('username', res.username, { path: "/" });
        cookies.set('nombre', res.nombre, { path: "/" });
        cookies.set('dinero', res.dinero, { path: "/" });
        cookies.set('userId', res.userId, { path: "/" });
        window.location.href = "./menu";

                
    }

    componentDidMount() {
        if (cookies.get('username')) {
            window.location.href = "./menu";
        }
    }

    render() {
        return (
            <div className='containerPrincipal'>
                <div className='containerSecundario'>
                    <div className='form-group'>
                        <label>BANCO A</label><br />
                        <label>DNI del usuario</label><br />
                        <input type='text' className='form-control' name='username' onChange={this.handleChange} /><br />
                        <label>Password</label><br />
                        <input type='password' className='form-control' name='password' onChange={this.handleChange} /><br />
                        <button className='btn btn-primary' onClick={() => this.iniciarSesion()}>Iniciar</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;