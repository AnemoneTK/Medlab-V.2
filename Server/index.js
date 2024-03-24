const mysql = require("mysql");
const cors = require("cors");
const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const bcrypt = require("bcrypt");
const saltRounds = 10;
var jwt = require("jsonwebtoken");
const secret = "Medlab-V.2";

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  port: "3306",
  password: "root",
  database: "medlab",
});
// ----- User Account -----
app.post("/createAccount", jsonParser, (req, res) => {
  const user_name = req.body.user_name;
  const user_password = req.body.user_password;
  const name = req.body.name;
  const surname = req.body.surname;
  const role = req.body.role;
  const withdraw = req.body.withdraw;
  const add_new = req.body.add_new;
  bcrypt.hash(user_password, saltRounds, function (err, hash) {
    db.query(
      "INSERT INTO user (user_name, user_password, name, surname, role, withdraw, add_new) VALUES(?,?,?,?,?,?,?)",
      [user_name, hash, name, surname, role, withdraw, add_new],
      (err, result) => {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        } else {
          res.json({
            status: "success",
            message: "Account created successfully",
          });
        }
      }
    );
  });
});

app.post("/login", jsonParser, (req, res) => {
  const user_name = req.body.user_name;
  const user_password = req.body.user_password;
  const role = req.body.role;

  db.query(
    "SELECT * FROM user WHERE user_name= ? AND role = ?",
    [user_name, role],
    (err, user) => {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      if (user.length == 0) {
        res.json({ status: "error", message: "User not found" });
        return;
      }
      bcrypt.compare(
        user_password,
        user[0].user_password,
        function (err, result) {
          if (result) {
            var token = jwt.sign({ user_name: user[0].user_name }, secret, {
              expiresIn: "1h",
            });
            res.json({
              status: "success",
              message: "Login successfully",
              token,
            });
          } else {
            res.json({ status: "error", message: "Login failed" });
            return;
          }
        }
      );
    }
  );
});

app.post("/authen", jsonParser, (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, secret);
    res.json({ status: "OK", decoded });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
});

// ----- Product -----

app.get("/product",jsonParser, (req, res) => {
  db.query(
    "SELECT * FROM product INNER JOIN unit ON product.unit = unit.unit_id INNER JOIN type ON product.type = type.type_id INNER JOIN category ON product.category = category.category_id ORDER by cast(id as unsigned)",
    (err, result) => {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/countProduct", (req, res) => {
  db.query("SELECT COUNT(*) as count FROM product", (err, result) => {
    if (err) {
      res.json({ status: "error", message: err });
      return;
    } else {
      res.send(result);
    }
  });
});

app.post("/checkProductID", jsonParser, (req, res) => {
  const id = req.body.id;
  db.query(
    "SELECT COUNT(*) as countID FROM product where id = ?",
    [id],
    (err, result) => {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/addNewProduct", jsonParser, (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const unit = req.body.unit;
  const type = req.body.type;
  const category = req.body.category;
  const detail = req.body.detail;
  const direction = req.body.direction;

  db.query(
    "INSERT INTO product (id, name, unit, type, category, detail, direction) VALUES(?,?,?,?,?,?,?)",
    [id, name, unit, type, category, detail, direction],
    (err, result) => {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      } else {
        res.json({ status: "success", message: "Insert  Successfully" });
      }
    }
  );
});

// Get product detail for edit
app.post("/getDetail", jsonParser, (req, res) => {
  const id = req.body.id;
  db.query(
    "SELECT * FROM product INNER JOIN unit ON product.unit = unit.unit_id INNER JOIN type ON product.type = type.type_id INNER JOIN category ON product.category = category.category_id WHERE id = ?",
    id,
    (err, result) => {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      } else {
        res.send(result);
      }
    }
  );
});
app.put("/updateProduct",jsonParser, (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const unit = req.body.unit;
  const type = req.body.type;
  const category = req.body.category;
  const detail = req.body.detail;
  const direction = req.body.direction;
  db.query(
    "UPDATE product SET id = ?, name = ? , unit = ?, type = ?, category = ?, detail = ?, direction = ? WHERE id = ?",
    [id, name, unit, type, category, detail, direction, id],
    (err, result) => {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      } else {
        res.send(result);
      }
    }
  );
});

app.delete( "/removeProduct", jsonParser , (req,res)=>{
  const id = req.body.id;
  db.query("DELETE FROM product WHERE id = ?",
  id,(err, result)=>{
    if(err){
      res.json({ status: "error", message: err });
        return;
    }else{
      res.json({ status: "success", message: "Delete  Successfully" });
    }
  })
})

app.get("/getUnit", jsonParser, (req, res) => {
  db.query("SELECT * FROM unit", (err, result) => {
    if (err) {
      res.json({ status: "error", message: err });
      return;
    } else {
      res.send(result);
    }
  });
});
app.get("/getType", jsonParser, (req, res) => {
  db.query("SELECT * FROM type", (err, result) => {
    if (err) {
      res.json({ status: "error", message: err });
      return;
    } else {
      res.send(result);
    }
  });
});
app.get("/getCategory", jsonParser, (req, res) => {
  db.query("SELECT * FROM category", (err, result) => {
    if (err) {
      res.json({ status: "error", message: err });
      return;
    } else {
      res.send(result);
    }
  });
});

app.listen("3000", () => {
  console.log("Server is running on port 3000");
});
