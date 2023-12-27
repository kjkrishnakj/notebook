import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';

const AddNote = () => {

    const context =useContext(NoteContext);
    const {addNote} = context;
    const [note,setNote] = useState({title:"",description:"",tag:" "})

const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
}

    return (
        <div>
            <div className="container my-3">

                <h2>Add a Note</h2>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" value={note.title} name='title'  onChange={onChange} minLength={5} required  />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" value={note.description} name = "description" onChange={(e) => {
                                        setNote({ ...note, [e.target.name]: e.target.value })
                                    }} minLength={5} required  />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" required name = "tag" value={note.tag} onChange={onChange} minLength={3}     />
                    </div>
                   
                    <button disabled={note.title.length<3||note.description.length<5} type="submit" className="btn btn-primary" onClick={(e)=>{
                         e.preventDefault();
                         addNote(note.title,note.description,note.tag)
                         setNote({title:"",description:"",tag:""});

                    }}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
