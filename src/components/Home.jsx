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

    //ChatBotAi
    // const [chatHistory, setChatHistory] = useState([]);
    // const [showChatBot, setShowChatBot] = useState(false);
    // const chatBodyRef = useRef();

    // const generateBotResponse = async (history) => {
    //     //Helper function to update chat history
    //     const updateHistory = (text, isError = false) => {
    //         setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking..."), { role: "model", text, isError }]);
    //     }

    //     //Format chat history for API request
    //     history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));

    //     const requestOptions = {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ contents: history })
    //     };

    //     try {
    //         // Make the API call to get the bot's response
    //         const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
    //         const data = await response.json();
    //         if (!response.ok) throw new Error(data.error.message || "Something went wrong!");

    //         //Clean and update chat history with bot's response
    //         const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
    //         updateHistory(apiResponseText);
    //     } catch (error) {
    //         updateHistory(error.message, true);
    //     }
    // };

    // useEffect(() => {
    //     //Auto scroll whenever chat history updates
    //     chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" });
    // }, [chatHistory]);

    //EndChatBotAI

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
                setData(response.data);
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
                            <h3>Aplikacja "Notatki" pozwala na dodawanie nowych notatek ich edycję oraz usuwanie. Dodana data pozwala (przy każdej nowo dodanej notatce) na zorientowanie się kiedy notatka została dodana  lub i czy wogóle była edytowana.</h3>
                        </div>
                        <h3 className="mt-4">Zaloguj się lub zarejestruj się teraz</h3>
                        <Link to="/login" className='btn btn-primary ms-3'>Zaloguj się/Zarejestruj się</Link>
                    </div>
            }

        </div>
    )
}