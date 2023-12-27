import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {
    let navigate = useNavigate()
    const context = useContext(NoteContext);
    const { notes, getNotes ,editNote} = context;
    useEffect(() => {
        if (localStorage.getItem('token')){
            getNotes()
        }
        else{
            navigate("/login")
        }
    })
    const refClose =useRef(null)
   const updateNote=(currentNote)=>{
    setNote({id:currentNote._id ,etitle : currentNote.title,edescription:currentNote.description,etag : currentNote.tag})
}
    const [note, setNote] = useState({id :"", etitle: "", edescription: "", etag: "default" })

    return (
        <>
            <AddNote showAlert={props.showAlert} />
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} onChange={(e) => {
                                        setNote({ ...note, [e.target.name]: e.target.value })
                                    }} minLength={5} required  />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={(e) => {
                                        setNote({ ...note, [e.target.name]: e.target.value })
                                    }} minLength={5} required  />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" value={note.etag} name="etag" onChange={(e) => {
                                        setNote({ ...note, [e.target.name]: e.target.value })
                                    }}/>
                                </div>


                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={(e)=>{
                                editNote(note.id,note.etitle,note.edescription,note.etag) 
                                props.showAlert("Updated successfully","success")

                                refClose.current.click()
                                }}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="  row my-2">
                <h1>Your Notes</h1>
                <div className="container">

                {notes.length ===0 && "No notes to display !"}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} showAlert={props.showAlert} updateNote={updateNote} />
                })}
            </div>
        </>
    )
}

export default Notes
