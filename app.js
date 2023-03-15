const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const app = express();

const dbPath = path.join(__dirname, "moviesData.db");
let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
  }
};
initializeDBAndServer();

app.get("/movies/", async (request, response) => {
  const getMoviesQuery = `
        SELECT
            *
        FROM
            movie
        ORDER BY
            movie_id;`;
  const moviesArray = await db.all(getMoviesQuery);
  response.send(moviesArray);
});
