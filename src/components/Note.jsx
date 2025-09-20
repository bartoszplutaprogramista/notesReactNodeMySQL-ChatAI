import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { api } from '../config/api';
import ChatbotIcon_Note from "./ChatbotIcon_Note";



function Note({ data, fetchData }) {

  const [editNote, setEditNote] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [activeChatbotNoteId, setActiveChatbotNoteId] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const chatbotNoteRef = useRef(null);
  // const chatbotNoteRefs = useRef({});





  const handleEdit = (note) => {
    setEditNote(note);
    setEditTitle(note.titleOfNote);
    setEditContent(note.noteOfNote);
  };
  const handleSave = (id) => {
    api.post('/editnote', {
      id,
      title: editTitle,
      content: editContent
    })
      .then(res => {
        if (res.data.Status === "Success") {
          fetchData();
          setEditNote(null);
        } else {
          alert("Nie zaktualizowano");
        }
      })
      .catch(err => {
        console.error('Error details: ', err);
        alert("Wystąpił błąd podczas edycji notatki");
      });
  };

  const handleDelete = (id) => {
    api.post('/deletenote', { id })
      .then(res => {
        if (res.data.Status === "Success") {
          console.warn(res.data.data.message);
          fetchData();
        } else {
          alert("Nie usunięto");
        }
      })
      .catch(err => {
        console.error('Error details: ', err);
        alert("Wystąpił błąd podczas usuwania notatki");
      });
  };

  // const toggleChatbotPanel = (id) => {
  //   setActiveChatbotNoteId(prev => (prev === id ? null : id));
  // };

  const toggleChatbotPanel = (id) => {
    if (activeChatbotNoteId === id) {
      // Kliknięto ikonę dla aktywnej notatki → zamykamy z animacją
      setIsClosing(true);
      setTimeout(() => {
        setActiveChatbotNoteId(null);
        setIsClosing(false);
      }, 500); // czas trwania animacji
    } else if (activeChatbotNoteId !== null) {
      // Inna notatka jest aktywna → najpierw zamykamy starą
      setIsClosing(true);
      setTimeout(() => {
        setActiveChatbotNoteId(id); // otwieramy nową
        setIsClosing(false);
      }, 500);
    } else {
      // Żadna notatka nie była aktywna → otwieramy od razu
      setActiveChatbotNoteId(id);
    }
  };

  // Ostatnie któe działało
  useEffect(() => {
    if (activeChatbotNoteId && !isClosing) {
      const timeout = setTimeout(() => {
        if (chatbotNoteRef.current) {
          chatbotNoteRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      }, 50); // krótka pauza na render
      return () => clearTimeout(timeout);
    }
  }, [activeChatbotNoteId, isClosing]);


  // useEffect(() => {
  //   if (activeChatbotNoteId && !isClosing) {
  //     const timeout = setTimeout(() => {
  //       const el = document.querySelector(`[data-note-id="${activeChatbotNoteId}"]`);
  //       if (el) {
  //         el.scrollIntoView({ behavior: 'smooth', block: 'end' });
  //       }
  //     }, 50);
  //     return () => clearTimeout(timeout);
  //   }
  // }, [activeChatbotNoteId, isClosing]);

  // useEffect(() => {
  //   if (activeChatbotNoteId && !isClosing) {
  //     const timeout = setTimeout(() => {
  //       const el = chatbotNoteRefs.current[activeChatbotNoteId];
  //       if (el) {
  //         el.scrollIntoView({ behavior: 'smooth', block: 'end' });
  //       }
  //     }, 50);
  //     return () => clearTimeout(timeout);
  //   }
  // }, [activeChatbotNoteId, isClosing]);


  return (
    <div className="outer-container">
      <div className="general-note-my">
        {data.length > 0 ? (
          data.map((item) => (
            <div key={item.idOfNote}>
              <div className="note">
                {editNote && editNote.idOfNote === item.idOfNote ? (
                  <div className="note-properties">
                    <input
                      className="edit-note p-note-bold"
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      maxLength="22"
                    />
                    <textarea
                      className="edit-note p-note h-100"
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      maxLength="400"
                    />
                    <div className="buttons-notes">
                      <button className="border" onClick={() => handleSave(item.idOfNote)}><SaveIcon /></button>
                    </div>
                  </div>
                ) : (
                  // <div>
                  <div className="note-properties">
                    <p className="p-note-bold">{item.titleOfNote}</p>
                    <div className="scrollable">
                      <p className="p-note">{item.noteOfNote}</p>
                    </div>
                    <div className="buttons-notes">
                      <div>
                        <small className="me-2">
                          {item.editedDateOfNote
                            ? `E.: ${new Date(item.editedDateOfNote).toLocaleDateString('pl-PL')}`
                            : `D: ${new Date(item.dateOfNote).toLocaleDateString('pl-PL')}`}
                        </small>
                      </div>
                      <button className="me-2" title="ChatBot" onClick={() => toggleChatbotPanel(item.idOfNote)}>
                        <ChatbotIcon_Note />
                      </button>

                      <button className="me-2" title="Edytuj" onClick={() => handleEdit(item)}>
                        <EditIcon />
                      </button>
                      <button title="Usuń" onClick={() => handleDelete(item.idOfNote)}>
                        <DeleteIcon />
                      </button>
                      {/* </div> */}
                    </div>
                    {activeChatbotNoteId === item.idOfNote && (
                      // <div className="chatbot-note mt-2 border border-danger ">
                      //ostatni div którey działał
                      <div
                        ref={chatbotNoteRef}
                        className={`chatbot-note mt-2 border border-danger ${isClosing ? 'slide-up' : 'slide-down'}`}
                      >
                        {/* // <div */}
                        {/* //   ref={(el) => { */}
                        {/* //     if (el) chatbotNoteRefs.current[item.idOfNote] = el;
                          //   }}
                          //   className={`chatbot-note mt-2 border border-danger ${isClosing ? 'slide-up' : 'slide-down'}`}
                          // > */}

                        {/* <div className="note-properties"> */}
                        {/* <p className="p-note-bold">Chatbot dla: {item.titleOfNote}</p> */}
                        <div className="scrollable-bot">
                          <p className="p-note">Tu może być interakcja z chatbotem dla tej notatki.Tu może być interakcja z chatbotem dla tej notatki.Tu może być interakcja z chatbotem dla tej notatki</p>
                          {/* Możesz tu dodać komponent chatbotowy */}
                        </div>
                        <div className="buttons-notes">
                          {/* <button onClick={() => setActiveChatbotNoteId(null)} className="material-symbols-rounded">keyboard_arrow_up</button> */}
                          <button
                            onClick={() => {
                              setIsClosing(true);
                              setTimeout(() => {
                                setActiveChatbotNoteId(null);
                                setIsClosing(false);
                              }, 500); // czas trwania animacji
                            }}
                            className="material-symbols-rounded mt-1"
                          >
                            keyboard_arrow_up
                          </button>

                        </div>
                        {/* </div> */}
                      </div>
                    )}
                  </div>



                  // </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>Nie ma żadnych notatek</p>
        )}
      </div>
    </div >
  );
}

export default Note;
