const queries = {

    getAllAuthors: `SELECT *
                    FROM authors AS a
                    ORDER BY a.surname;`,

    getAuthorByEmail: `SELECT *
                    FROM authors a
                    WHERE a.email=$1;`,

    createAuthor:   `INSERT INTO authors(name,surname,email,image) 
                    VALUES ($1,$2,$3,$4);`,

    updateAuthor:    `UPDATE authors
                    SET name=$1, surname=$2, email=$3, image=$4 
                    WHERE email=$5;`,
    
    deleteAuthor:   `DELETE FROM authors a
                    WHERE a.email=$1;`
  };

module.exports = queries;