import React, { Component } from 'react';
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';

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

    iniciarSesion = async () => {
        const { username, password } = this.state.form;
        const encryptedPassword = md5(password);

        await axios.get(baseUrl)
            .then(response => {
                console.log('Respuesta del servidor:', response.data);

                const user = response.data.find(user => user.username === username && user.password === encryptedPassword);
                if (user) {
                    cookies.set('username', user.username, { path: "/" });
                    cookies.set('nombre', user.nombre, { path: "/" });
                    cookies.set('dinero', user.dinero, { path: "/" });
                    cookies.set('userId', user.userId, { path: "/" });
                    
                    alert(`Bienvenido ${user.nombre}`);
                    window.location.href = "./menu";
                } else {
                    alert('El usuario o la contraseña no son correctas');
                }
            })
            .catch(error => {
                console.error('Error al obtener usuarios:', error);
            });
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