import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import axios from 'axios';
import { api } from '../config/api';
// import { useNavigate } from 'react-router-dom';

function CreateArea({ onAdd }) {

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/savetodatabase', note, {
      withCredentials: true,
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    })
      .then(res => {
        if (res.data.Status === "Success") {
          console.warn("Info z backendu:", res.data.data.message);
          onAdd();
          setNote({
            title: "",
            content: ""
          });
        } else {
          alert("Nie dodano");
        }
      })
      .catch(err => console.error(err));
  }

  return (
    <div>
      <form className="create-note" onSubmit={handleSubmit}>

        <input
          name="title"
          onChange={handleChange}
          // onChange={e => setNote(prev => ({ ...prev, [e.target.name]: e.target.value }))}
          // setNote({ ...note, title: e.target.value });
          // setNote(prev => ({ ...prev, [e.target.name]: e.target.value }))
          // { handleChange };
          value={note.title}
          placeholder="Tytuł notatki..."
          maxLength="22"
        />


        <textarea
          name="content"
          onChange={handleChange}
          // onChange={e => setNote(prev => ({ ...prev, [e.target.value]: e.target.value }))}
          // onChange={e => {
          // setNote(prev => ({ ...prev, [e.target.value]: e.target.value }))
          // setNote({ ...note, content: e.target.value });
          // { handleChange };

          value={note.content}
          placeholder="Wpisz treść notatki..."
          rows="3"
          maxLength="400"
        />
        <button title="Dodaj notatkę" type='submit'><AddIcon /></button>
      </form>
      <div className="d-flex justify-content-center">
      </div>
    </div>
  );
}

export default CreateArea;
