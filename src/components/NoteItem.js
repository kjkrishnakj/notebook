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
      <div className="card bg-transparent my-3" style={{ boxShadow: '13px 20px 6px rgba(0, 0, 0, 0.6)' }}>
      <div className="card-header" style={{backgroundColor:"#016fb9"}}>

    <h5 className="card-title my-1" style={{color:"white"}} >{note.title}</h5>
      </div>
      <div className="card-body">
    
    <p className="card-text"> {note.description}</p>
        <div className="d-flex">

    <i className="fa-solid fa-trash mx-2 my-2" style={{color: "#8f0505"}} onClick={()=>{
      deleteNote(note._id);
      props.showAlert("Deleted successfully","success"
      )}}></i>
    <i className="fa-solid fa-pen-to-square mx-2 my-2" style={{color: "#076600"}} data-bs-target="#staticBackdrop" data-bs-toggle="modal" onClick={()=>{updateNote(note);}}></i>
        </div>
  </div>
</div>
    </div>
  )
}

export default NoteItem
