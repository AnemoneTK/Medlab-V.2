const mysql = require("mysql");
const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  port: "3000",
  password: "",
  database: "medlab",
});

app.get("/product", (req, res) => {
  db.query("SELECT * FROM product", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/addProduct", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const type = req.body.type;
  const category = req.body.category;

  db.query(
    "INSERT INTO product (id, name, type, category) VALUES(?,?,?,?)",
    [id, name, type, category],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Insert success");
      }
    }
  );
});

app.listen("3002", () => {
  console.log("Server is running on port 3002");
});