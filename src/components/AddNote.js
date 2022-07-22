import React, { useContext, useState } from "react";
import noteContext from '../context/notes/noteContext';

function AddNote(props) {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    
    const handleClick = (e) => {
        e.preventDefault(); //pasge not load
        addNote(note.title,note.description,note.tag);
        setNote({ title: "", description: "", tag: "" }); 
        props.showAlert("Add note Successfully","success");
    }
    const onChange = (e) => {
        setNote({...note, [e.target.name] : e.target.value })
    }
    return (
        <div>
            <h2>Add a Note</h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control"   minLength={5} required id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Descreptions</label>
                    <input type="text" className="form-control"   minLength={5} required id="description" name="description" value={note.description} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tags</label>
                    <input type="text" className="form-control"  minLength={5} id="tag" name="tag" value={note.tag} onChange={onChange} />
                </div>
            
                <button type="submit" disabled={note.title.length<5 || note.description.length<5 || note.tag.length<5} className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote