import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const notesinitial = [ ]

  const host = "http://localhost:5000";
  const [notes, setNotes] = useState(notesinitial);
  //    const update=()=>{
  //        setTimeout(() => {
  //            setstate({
  //             "name":"bhuwan Tariyal",
  //            "class":"12th B",
  //            "year":"2020-21"
  //         })
  //        }, 5000);
  //    }


  //GEt all notes 
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      }

    });

    const json = await response.json();
    setNotes(json);
  }



  //ADD a note
  const addNote = async (title, description, tag) => {
      const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      
      body: JSON.stringify({title,description,tag}) 
    });

    const json=await response.json();
    console.log("Adding a new node");
    //TODO api call
    const note =json;
    setNotes(notes.concat(note));
  }




  //Delete a note
  const deleteNote = async (id) => {
    //TODO api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),


      }

      
    });
    const json= await response.json();
    console.log(json);
    console.log("Delete the note with id : " + id);
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }




  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //api call

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),

      },

      body: JSON.stringify({title,description,tag})
    });
    const json = await response.json();
    console.log(json);
    //
   const  newNotes=JSON.parse(JSON.stringify(notes));
    //logic for edit clint;
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

    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </noteContext.Provider>

  )

}

export default NoteState