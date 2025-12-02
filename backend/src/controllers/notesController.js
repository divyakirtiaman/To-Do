import Note from "../models/Note.js";
export async function getNotes(req, res) {
    try{
        const notes=await Note.find();
        res.status(200).json(notes);
    }catch(error){
    console.log("Erroris getAllNotes controller",error);
    res.status(500).json({message: "you just fatched thr notes"});
    }

}

export async function getNotesById(req,res){
    try{
        const note= await Note.findById(req.params.id);
        if(!note){
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json(note);
    }

    catch(error){
        console.log("Error in getNoteById controller",error);
        res.status(500).json({message: "internal server error"});
    }
}

export async function createNote(req, res) {
    
        try{
            const {title,content }=req.body;
            const newNode= new Note({title,content});

            await newNode.save();
            res.status(201).json({message: "Note created successfully"});
        }catch(error){
            console.log("Error in creatNote controller",error);
            res.status(500).json({message: "internal server error"});
        }
    
    
}

export async function updateNote(req, res) {
    try{
        const {title,content}=req.body;
        const updatedNote= await Note.findByIdAndUpdate(
            req.params.id,
            {title,content},
            {new:true}
        );
        if(!updatedNote){
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json({message: "Note updated successfully"});
        
        
    }catch(error){
        console.log("Error in updateNote controller",error);
        res.status(500).json({message: "internal server error"});
    }
}
   

export async function deleteNote(req, res) {
    try{
        const deletedNote= await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote){
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json({message: "Note deleted successfully"});
            
        
    }catch(error){
        console.log("Error in deleteNote controller",error);
        res.status(500).json({message: "internal server error"});
    }
}

