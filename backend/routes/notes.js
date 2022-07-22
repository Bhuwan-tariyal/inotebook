const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

//route 1 get all the notes using get:"/api/user/fetchallnotes"
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
})


//route 2 Adding the  new notes using Post: "/api/auth/addnote"
router.post('/addnote', fetchuser, [body('title', 'enter the valid title').isLength({ min: 3 }), //validation of email and password
body('description', 'description atleast 5 latter').isLength({ min: 5 }),
], async (req, res) => {
   
       
   
        const { title, description, tag } = req.body;
        //if there are errors ,return bad request and the error
        const errors = validationResult(req);
    // } catch (error) {
    //     console.log(error.message);
    //     res.status(500).send("Some error ouccer");
    // }
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
  
    try {
        //create a new notes 
        const note = new Note(
            {
                title, description, tag, user: req.user.id
            }
        )
        const savenotes = await note.save();
        res.send(savenotes);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error ouccer");
    }

})

//route 3 Updating  an existing notes using Post: "/api/auth/updatenote"
//put req is use for updating so we are using put not post
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const {title,description,tag}=req.body; //destructing 
    //Create a newNote object
    const newNote={};
    if(title){newNote.title=title}
    if(description){newNote.description=description}
    if(tag){newNote.tag=tag}


    //find the note to be update and update
    
    let note= await Note.findById(req.params.id);
    //authenticate the id of the notes
    if(!note){
       return res.status(404).send("Not Found");
    }
    //authenticate the user
    if(note.user.toString() !== req.user.id){return res.status(401).send("not allowed");}
    //here the upating the notes
    note =await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json(note);


})

//route 3 deleting  an existing notes using deleti: "/api/notes/deletenote".login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    const {title,description,tag}=req.body;

        //find the note to be delete and deleted it
    
    let note= await Note.findById(req.params.id);
    //authenticate the id of the notes
    if(!note){
       return res.status(404).send("Not Found");
    }
    //authenticate the user
    if(note.user.toString() !== req.user.id){return res.status(401).send("not allowed");}

    note =await Note.findByIdAndDelete(req.params.id)
    res.json({"Success":"Note haas been deleted", note: note});

})
module.exports = router