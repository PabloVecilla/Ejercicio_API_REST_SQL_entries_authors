const authors = require('../models/authors.model'); // Importar el modelo de la BBDD

// GET http://localhost:3000/api/entries --> ALL
// GET http://localhost:3000/entries?email=hola@mail.com --> mail
const getAuthors = async (req, res) => {
    try {
        let author;
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
            author = await authors.getAuthorByEmail(email);
            return res.status(200).json(author[0]); // matching author
        }
        else {
            author = await authors.getAllAuthors();
            if (!author.length) return res.status(404).json("No authors available"); 
            return res.status(200).json(author); // matching authors
        }
        
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
    
}

// POST 
const createAuthor = async (req, res) => {
    const newAuthor = req.body; // {name,surname,email,image}
    const { name, surname, email, image } = newAuthor; 
    
    if (!name || !surname || !email) {
        return res.status(400).json({
            items_created: 0, 
            data: newAuthor, 
            error: "Missing data: name, surname, email"
        })
    }

    // Validate name and surname: 
    const namesRegex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s-]+$/; 
    if (!namesRegex.test(name) || !namesRegex.test(surname)){
        return res.status(400).json({
            items_created: 0,
            data: newAuthor,
            error: "Invalid name fields",
            });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
        items_created: 0,
        data: newAuthor,
        error: "Invalid email",
        });
    }

    // Validate image format:: 
    const imgRegex = /\.(jpe?g|png|gif|bmp|webp)$/i;
    if (!imgRegex.test(image)) {
        return res.status(400).json({
        items_created: 0,
        data: newAuthor,
        error: "Invalid image format",
        });
    }

    try {
        const response = await authors.createAuthor(newAuthor);
        res.status(201).json({
            message: `usuario creado: ${newAuthor.email}`
        });
    } catch (e){
        res.status(400).json({
            items_created: 0, 
            data: newAuthor, 
            error: e.message
        })
    }
    
}

// PUT http://localhost:3000/api/authors/
const updateAuthor = async (req, res) => {
    const editedAuthor = req.body; // {name, surname,email,image,oldEmail}
    const { name, surname, email, image, oldEmail } = editedAuthor; 
    
    if (!name || !surname || !email || !oldEmail) {
        return res.status(400).json({
            items_edited: 0, 
            data: editedAuthor, 
            error: "Missing data (name, surname, email, old email) needed to update author"
        })
    }
// VALIDATIONS
    // Validate name and surname: 
    const namesRegex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s-]+$/; 
    if (!namesRegex.test(name) || !namesRegex.test(surname)){
        return res.status(400).json({
            items_created: 0,
            data: newAuthor,
            error: "Invalid name fields",
            });
    }

    // VALIDATE EMAIL
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
        return res.status(400).json({
        items_edited: 0,
        data: editedAuthor,
        error: "Invalid email",
        });
    }

    // Validate image format:: 
    const imgRegex = /\.(jpe?g|png|gif|bmp|webp)$/i;
    if (!imgRegex.test(image)) {
        return res.status(400).json({
        items_created: 0,
        data: newAuthor,
        error: "Invalid image format",
        });
    }
// END OF VALIDATIONS --> create functions for validations
    try {
        const response = await authors.updateAuthor(editedAuthor);
        res.status(200).json({
            message: `usuario actualizado: ${editedAuthor.email}`
        });
    } catch (e){
        res.status(400).json({
            items_updated: 0, 
            data: editedAuthor, 
            error: e.message
        })
    }
}; 

//DELETE http://localhost:3000/api/authors
const deleteAuthor = async (req,res) => {
    const { email } = req.body;
    if(!email){
      return res.status(400).json({
        items_deleted: 0,
        error: "Mandatory email to delete author",
      });
    }
  
    try {
      const response = await authors.deleteAuthor(email);
  
      if(response === 0){
        return res.status(404).json({
          items_deleted: 0,
          error: "Author not found",
        });
      }
  
      res.status(200).json({
        items_deleted: response,
        message: `Se ha borrado ${email}`
      });
  
    } catch (e) {
      res.status(500).json({
        items_deleted: 0,
        error: e.message,
      });
    }
  }; 

module.exports = {
    getAuthors,  //--> GET
    createAuthor, //--> POST
    updateAuthor, //--> PUT
    deleteAuthor // --> DELETE
}