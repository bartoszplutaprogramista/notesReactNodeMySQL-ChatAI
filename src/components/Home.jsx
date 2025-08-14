import ChatbotIcon from "./ChatbotIcon";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";
import ChatBotAIBody from "./ChatBotAIBody";
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from "react-router";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Header from "./Header";
import Footer from "./Footer";

export default function Home() {
    const [auth, setAuth] = useState(false);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [dataAll, setData] = useState([]);

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:8081')
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
        axios.get('http://localhost:8081/logout')
            .then(res => {
                if (res.data.Status === "Success") {
                    location.reload(true);
                } else {
                    alert("error");
                }
            }).catch(err => console.log(err))
    }

    const fetchData = () => {
        axios.get('http://localhost:8081/getAllNotes')
            .then(response => {
                // setData(response.data.data);
                if (response.data.success && response.data.data) {
                    setData(response.data.data);
                } else if (response.data.Message) {
                    console.warn("Info z backendu:", response.data.Message);
                    // Możesz też ustawić pustą tablicę lub komunikat dla użytkownika
                    setData([]);
                }

            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        fetchData();
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
                            <h3>Aplikacja "Pamiętnik + Coach AI" pozwala na dodawanie nowych wpisów ich edycję oraz usuwanie. Dodana data pozwala (przy każdej nowo dodanym wpisie) na zorientowanie się kiedy dany wpis został dodany lub i czy wogóle był edytowany. W prawym dolnym rogu mamy opcję chatu z gemini. </h3>
                        </div>
                        <h3 className="mt-4">Zaloguj się lub zarejestruj się teraz</h3>
                        <Link to="/login" className='btn btn-primary ms-3'>Zaloguj się/Zarejestruj się</Link>
                    </div>
            }

        </div>
    )
}