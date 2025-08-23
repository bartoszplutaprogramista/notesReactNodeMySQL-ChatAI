import ChatBotAIBody from "./ChatBotAIBody";
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from "react-router";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Header from "./Header";
import Footer from "./Footer";
import { api } from '../config/api';

export default function Home() {
    const [auth, setAuth] = useState(false);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [dataAll, setData] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    axios.defaults.withCredentials = true;
    useEffect(() => {
        api.get('/')
            .then(res => {
                if (res.data.Status === "Success") {
                    setAuth(true);
                    setName(res.data.name)
                } else {
                    setAuth(false);
                    setMessage(res.data.Message);

                }

            })
    }, []);

    const handleLogout = () => {
        api.get('/logout')
            .then(res => {
                if (res.data.Status === "Success") {
                    window.location.reload();
                } else {
                    alert("error");
                }
            }).catch(err => console.log(err))
    }

    const fetchData = () => {
        api.get('/getAllNotes', { withCredentials: true })
            .then(response => {
                if (response.data.success && response.data.data) {
                    setData(response.data.data);
                } else if (response.data.Message) {
                    console.warn("Info z backendu:", response.data.Message);
                    setData([]);
                }

            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        api.get('/check-session', { withCredentials: true })
            .then(res => {
                if (res.data.isLoggedIn) {
                    setIsLoggedIn(true);
                    fetchData();
                } else {
                    setIsLoggedIn(false);
                    setData([]);
                }
            })
            .catch(err => {
                console.error("Błąd sprawdzania sesji:", err);
            });
    }, []);


    return (
        <div className='mt-4'>
            {
                auth ?
                    <div>
                        <div className="my-container">
                            <div className="d-flex justify-content-center">
                                <h3>Jesteś zalogowany jako {name}</h3>
                                <button className='btn btn-danger ms-2 mb-2' onClick={handleLogout}>Wyloguj się</button>
                            </div>
                            <Header />
                            <ChatBotAIBody />
                            <CreateArea onAdd={fetchData} />
                            <Note data={dataAll} fetchData={fetchData} />
                        </div>
                        <Footer />
                    </div>
                    :
                    <div className="d-flex align-items-center justify-content-center mt-5 flex-column">
                        <div className="home-page">
                            <h3>Aplikacja "Pamiętnik + Coach AI" pozwala na dodawanie nowych wpisów ich edycję oraz usuwanie. Dodana data pozwala (przy każdym nowo dodanym wpisie) na zorientowanie się kiedy dany wpis został dodany lub i czy wogóle był edytowany. W prawym dolnym rogu mamy opcję chatu z gemini. </h3>
                        </div>
                        <h3 className="mt-4 text-center">Zaloguj się lub zarejestruj się teraz</h3>
                        <Link to="/login" className='btn btn-primary ms-3'>Zaloguj się/Zarejestruj się</Link>
                    </div>
            }

        </div>
    )
}