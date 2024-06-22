import React, { useState, useEffect } from "react";
import NoteContext from "../notes/NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:3200";
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);

    // Fetch all notes
    const getNotes = async () => {
        try {
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                }
            });
            const json = await response.json();
            if (Array.isArray(json)) {
                setNotes(json);
            } else {
                console.error('Unexpected response format:', json);
                setNotes([]);
            }
        } catch (error) {
            console.error('Error fetching notes:', error);
            setNotes([]);
        }
    };

    // Add a note
    const addNote = async (title, description, tag) => {
        try {
            const response = await fetch(`${host}/api/notes/addnote`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, tag })
            });
            const note = await response.json();
            setNotes(notes.concat(note));
        } catch (error) {
            console.error('Error adding note:', error);
        }
    };

    // Delete a note
    const deleteNote = async (id) => {
        try {
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                }
            });
            const json = await response.json();
            console.log(json);

            const newNotes = notes.filter(note => note._id !== id);
            setNotes(newNotes);
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    // Edit a note
    const editNote = async (id, title, description, tag) => {
        try {
            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, tag })
            });
            const json = await response.json();
            console.log(json);

            const newNotes = notes.map(note => {
                if (note._id === id) {
                    return { ...note, title, description, tag };
                }
                return note;
            });
            setNotes(newNotes);
        } catch (error) {
            console.error('Error editing note:', error);
        }
    };

    useEffect(() => {
        getNotes();
    }, []);

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
