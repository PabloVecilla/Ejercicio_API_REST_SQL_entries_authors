const entry = require('../models/entries.model'); // Importar el modelo de la BBDD

// GET http://localhost:3000/api/entries --> ALL
// GET http://localhost:3000/entries?email=hola@gmail.com --> por email
const getEntries = async (req, res) => {
    try {
        let entries;
        const email = req.query.email; 

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            return res.status(400).json({
            items_found: 0,
            email,
            error: "Formato de email no válido",
            });
        }

        if (email) {
            entries = await entry.getEntriesByEmail(email);
        }
        else {
            entries = await entry.getAllEntries();
        }
        res.status(200).json(entries); // [ matching entries ]
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
    
}

// Create entry by email
const createEntry = async (req, res) => {
    const newEntry = req.body; // {title,content,email,category}
    const { title, content, email, category } = newEntry; 
    
    if (!title || !content || !email) {
        return res.status(400).json({
            items_created: 0, 
            data: newEntry, 
            error: "Missing data: title, content, email"
        })
    }
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
        items_created: 0,
        data: newEntry,
        error: "Unvalid email",
        });
    }
    try {
        const response = await entry.createEntry(newEntry);
        res.status(201).json({
        items_created: response,
        data: newEntry
        });
    } catch (e){
        res.status(400).json({
            items_created: 0, 
            data: newEntry, 
            error: e.message
        })
    }
    
}

// PUT 
const updateEntry = async (req, res) => {
    const editedEntry = req.body; // {newTitle, title,content,email,category}
    const { title, email, id_entry } = editedEntry; 
    
    if (!id_entry) {
        return res.status(400).json({
            items_edited: 0, 
            data: editedEntry, 
            error: "Mandatory id_entry to update entry"
        })
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
        return res.status(400).json({
        items_edited: 0,
        data: editedEntry,
        error: "Invalid email",
        });
    }
    // Se podría comprobar si existe el autor. 
    // Creando author.model.getAuthorByEmail(), if returns 0 rows
    try {
        const response = await entry.updateEntry(editedEntry);
        res.status(201).json({
        items_edited: response,
        data: editedEntry
        });
    } catch (e){
        res.status(400).json({
            items_created: 0, 
            data: editedEntry, 
            error: e.message
        })
    }
}; 

//DELETE http://localhost:3000/api/entries
const deleteEntry = async (req,res) => {
    const { id_entry } = req.params;
    if(!id_entry){
      return res.status(400).json({
        items_deleted: 0,
        error: "Mandatory id_entry to delete entry",
      });
    }
  
    try {
      const response = await entry.deleteEntry(id_entry);
  
      if(response === 0){
        return res.status(404).json({
          items_deleted: 0,
          error: "Entry not found",
        });
      }
  
      res.status(200).json({
        items_deleted: response,
        message: "Entry deleted correctly",
      });
  
    } catch (e) {
      res.status(500).json({
        items_deleted: 0,
        error: e.message,
      });
    }
  }; 

module.exports = {
    getEntries,  //--> GET
    createEntry, //--> POST
    updateEntry, //--> PUT
    deleteEntry // --> DELETE
}