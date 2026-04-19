const queries = require('../queries/entries.queries'); 
const pool = require('../config/db_pgsql'); 



// GET all entries
const getAllEntries = async () => {
    let client, result;
    try {
        client = await pool.connect(); // wait till connected
        const data = await client.query(queries.getAllEntries)
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (client) client.release(); // prevents crash if pool.connect() crashes
    }
    return result
}

// GET entries by email
const getEntriesByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.getEntriesByEmail, [email])
        result = data.rows
        
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (client) client.release(); // prevents crash if pool.connect() crashes
    }
    return result
}

// CREATE
const createEntry = async (entry) => {
    const { title, content, email, category } = entry;
    let client, result;
    try {
        client = await pool.connect(); 
        const data = await client.query(queries.createEntry,[title, content, email, category])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (client) client.release();
    }
    return result
}

// UPDATE
const updateEntry = async (entry) => {
    const { newTitle, title, content, email, category } = entry;
    let client, result;
    try {
        client = await pool.connect(); 
        const data = await client.query(queries.updateEntry,[newTitle, content, email, category, title])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (client) client.release();
    }
    return result; 
}

// DELETE
const deleteEntry = async (title) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.deleteEntry, [title]); 
        result = [data.rowCount, title]; 
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (client) client.release();
    }
    return result; 
}

const entries = {
    getAllEntries,
    getEntriesByEmail,
    createEntry,
    updateEntry,
    deleteEntry
}

module.exports = entries;


// TEST

    /* getEntriesByEmail("birja@thebridgeschool.es")
    .then(data=>console.log(data))
 */


/* getAllEntries()
.then(data=>console.log(data)) */



/* let newEntry = {
    title: "Se acabaron las mandarinas de TB",
    content: "Corren rumores de que papa noel tenía un saco vacio y lo llenó",
    email: "guillermu@thebridgeschool.es",
    category: "sucesos"
}

createEntry(newEntry)
    .then(data => console.log(data));  */

/*      let title = "Se acabaron las mandarinas de TB"; 

deleteEntry(title)
    .then(data => console.log(data));  */

/* let editedEntry = {
    new_title: "Se acabaron las Magdalenas",
    title: "Noticia: Un panda anda suelto por la ciudad",
    content: "Corren rumores de que papa noel tenía un saco vacio y lo llenó",
    email: "guillermu@thebridgeschool.es",
    category: "sucesos"
}

updateEntry(editedEntry)
    .then(data => console.log(data));  */