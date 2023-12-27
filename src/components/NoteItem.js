import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
    const context = useContext(NoteContext)
    const {deleteNote} = context;
    const {note,updateNote} =props
    if (!note) {
        return null; // or render a loading state or placeholder
    }
    return (
    <div className='col-md-3'>
      <div className="card my-3">
      <div className="card-header">

    <h5 className="card-title " >{note.title}</h5>
      </div>
      <div className="card-body">
    
    <p className="card-text"> {note.description}</p>
        <div className="d-flex">

    <i className="fa-solid fa-trash mx-2" onClick={()=>{
      deleteNote(note._id);
      props.showAlert("Deleted successfully","success"
      )}}></i>
    <i className="fa-solid fa-pen-to-square mx-2"data-bs-target="#staticBackdrop" data-bs-toggle="modal" onClick={()=>{updateNote(note);}}></i>
        </div>
  </div>
</div>
    </div>
  )
}

export default NoteItem
