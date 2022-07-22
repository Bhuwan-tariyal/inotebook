import React from 'react'
import { useContext, useEffect, useRef,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes,editNote } = context;
  let navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
      console.log("enter");
    }
    else{
      navigate('/login');
    }
    // eslint-disable-next-line
  }, [])
  
  const ref = useRef(null);
  const refClose=useRef(null);
  const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: "" })


  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
    
  }




  const handleClick = (e) => {
    console.log("updatimga note",note);
    e.preventDefault(); //pasge not load
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refClose.current.click();
    props.showAlert("Successfully Updated","success");
  }


  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <AddNote showAlert={props.showAlert}></AddNote>

      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form className='my-3'>
          <div className="mb-3">
            <label htmlFor="etitle" className="form-label">Title</label>
            <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" minLength={5} required onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="edescription" className="form-label" >Descreptions</label>
            <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" minLength={5} required onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="etag" className="form-label">Tags</label>
            <input type="text" className="form-control" minLength={5} id="etag" value={note.etag} name="etag" onChange={onChange} />
          </div>


        </form>
      </div>
      <div className="modal-footer">
        <button type="button" ref={refClose}className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" showAlert={props.showAlert} onClick={handleClick}>Update note</button>
      </div>
    </div>
  </div>
</div>
     
      <div className='row my-3'>
        <h3>Your notes</h3>
        {/* <div className="container">
        {notes.length===0 && 'No notes to display'}
        </div> */}
        {
          notes.map((note) => {
            return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note}></Noteitem> //note passing the props
          })
        }
      </div>
    </>
  )
}

export default Notes