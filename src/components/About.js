import React, { useEffect } from 'react'
import { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'
export default function About() {
  const a =useContext(NoteContext);
  useEffect(()=>{
    a.update()
  })
  return (
    <div>
      this is about us {a.state.name}
    </div>
  )
}
