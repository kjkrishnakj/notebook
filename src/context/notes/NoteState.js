import React, { useState } from "react";
import NoteContext from "../notes/NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:3200"
    const notesInitial = []


    const [notes, setNotes] = useState(notesInitial)


    const getNotes = async () => {
        //fetch api for fetch all notes
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        })
        const json = await response.json();
        console.log("res" +json);
        setNotes(json)
        
    }
    const addNote = async (title, description, tag) => {
        //fetch api for add notes
        const response = await fetch(`${host}/api/notes/addnote`, {
            
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
        })

        const note = await response.json();

        setNotes(notes.concat(note))
    }

    const deleteNote = async (id) => {

        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem('token')
            },
        })
        const json = response.json();
        console.log(json);

        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)

    }

    const editNote = async (id, title, description, tag) => {
        //fetching api
       
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body:JSON.stringify({title,description,tag})
        })
        const json = await response.json();
        console.log(json);
        let newNotes =JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }

        }
        setNotes(newNotes);
    }



    return (

        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote,getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;