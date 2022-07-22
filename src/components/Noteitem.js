import React, { useContext } from 'react'

import noteContext from '../context/notes/noteContext';

function Noteitem(props) {
    const { note, updateNote } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;
    return (

        <div className='col-md-3 '>
            <div className="card my-2" >
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <button type="button" className="btn1 btn-sm  btn-outline-primary mx-2" onClick={() => {
                            updateNote(note);
                        }}>Update</button>

                        <button type="button" className="btn1 btn-sm btn-outline-danger mx-1" onClick={() => {
                            deleteNote(note._id);
                            props.showAlert("Delete Successfully","success");
                        }}>Delete</button>
                    </div>
                    <p className="card-text">{note.description}</p>
                    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                </div>
            </div>
        </div>
    )
}

export default Noteitem