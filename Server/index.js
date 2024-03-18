const mysql = require("mysql");
const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  port: "3306",
  password: "root",
  database: "medlab",
});

app.get("/product", (req, res) => {
  db.query("SELECT * FROM product INNER JOIN type ON product.type = type.type_id", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


app.get("/countProduct", (req, res) => {
  db.query("SELECT COUNT(*) as count FROM product", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/addNewProduct", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const type = req.body.type;
  const category = req.body.category;

  db.query("INSERT INTO product (id, name, type, category) VALUES(?,?,?,?)",
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

app.get("/getType", (req,res) =>{
  db.query("SELECT * FROM type", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
})
app.get("/getCategory", (req,res) =>{
  db.query("SELECT * FROM category", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
})

app.listen("3000", () => {
  console.log("Server is running on port 3000");
});
