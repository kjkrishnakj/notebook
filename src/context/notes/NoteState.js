import React, { useState } from "react";
import NoteContext from "../notes/NoteContext";

const NoteState = (props) => {
    const st = {
        "name": "jrishn",
        "class" : "11A"
    }
    const [state,setState] = useState(st);

    const update=()=>{
        setTimeout(()=>{
            setState({"name" : "changed"})
        },2000)
    }
    return (

        <NoteContext.Provider value ={{state,update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;