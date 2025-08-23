import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router";
import { api } from '../config/api';

export default function Login() {
    const [values, setValues] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();

        api.post('/login', values)
            .then(res => {
                if (res.data.Status === "Success") {
                    console.warn(res.data.data.Message);
                    navigate('/');
                } else {
                    alert("❌Nie ma nikogo w bazie: " + res.data.Message);
                }
            })
            .catch(err => {
                if (err.response && err.response.status === 401) {
                    alert("🔐 Nieprawidłowy email lub hasło");
                } else if (err.response && err.response.status === 400) {
                    alert("❌ Błąd walidacji: " + JSON.stringify(err.response.data.errors));
                } else {
                    alert("💥 Błąd serwera");
                }
                console.error("Axios error:", err);
            });
    };


    return (
        <div className='d-flex justify-content-center align-items-center login-page vh-100'>
            <div className='bg-white p-3 rounded login-registration-width'>
                <h2>Logowanie</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder="Wpisz email" name='email' autoComplete='off' onChange={e => setValues({ ...values, email: e.target.value })} className='form-control rounded-0' required />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Hasło</strong></label>
                        <input type="password" placeholder="Wpisz hasło" name='password' onChange={e => setValues({ ...values, password: e.target.value })} className='form-control rounded-0' required />
                    </div>
                    <button type='submit' className='btn btn-danger w-100 rounded-0'>Zaloguj się</button>
                </form>
                <div className="mt-2">
                    <b>Nie masz konta? <Link className={"link-styles"} to="/registration">Zarejestruj się</Link></b>
                </div>
            </div>


        </div>
    )
}