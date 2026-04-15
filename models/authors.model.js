const queries = require('../queries/authors.queries'); 
const pool = require('../config/db_pgsql'); 



// GET all authors
const getAllAuthors = async () => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.getAllAuthors)
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (client) client.release(); // prevents crash if pool.connect() crashes
    }
    return result
}

// GET author by email
const getAuthorByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.getAuthorByEmail, [email])
        result = data.rows
        
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (client) client.release(); // prevents crash if pool.connect() crashes
    }
    return result
}

// CREATE author
const createAuthor = async (author) => {
    const { name, surname, email, image } = author;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.createAuthor,[name, surname, email, image])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (client) client.release();
    }
    return result
}

// UPDATE author (email)
const updateAuthor = async (author) => {
    const { name, surname, email, image, oldEmail } = author;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.updateAuthor,[name, surname, email, image, oldEmail])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (client) client.release();
    }
    return result; 
}

// DELETE author (email)
const deleteAuthor = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.deleteAuthor,[email])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (client) client.release();
    }
    return result; 
}

const authors = {
    getAllAuthors,
    getAuthorByEmail,
    createAuthor,
    updateAuthor,
    deleteAuthor
}

module.exports = authors;


// TEST

    /* getAuthorsByEmail("birja@thebridgeschool.es")
    .then(data=>console.log(data))
 */

/*
getAllAuthors()
.then(data=>console.log(data))
*/


/* let newAuthor = {
    name: "Paco",
    surname: "Pérez",
    email: "paco@thebridgeschool.es",
    image: "https://randomuser.me/api/portraits/thumb/men/6.jpg"
}

createAuthor(newAuthor)
    .then(data => console.log(data)) */

/* let editedAuthor = {
    email: "javier@thebridgeschool.es",
    name: "Javier",
    surname: "Espinosa",
    image: "https://randomuser.me/api/portraits/thumb/men/35.jpg",
    oldEmail: "jabier@thebridgeschool.es"
}

updateAuthor(editedAuthor)
    .then(data => console.log(data));  */