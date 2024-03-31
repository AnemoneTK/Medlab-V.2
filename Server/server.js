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
const cookieParser = require("cookie-parser");
const { Warehouse } = require("../Client/src/page/user/warehouse_location/Warehouse");

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    exposedHeaders: ["SET-COOKIE"],
  })
);
app.use(cookieParser());
app.use(express.json());

// connect database
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  port: "3306",
  password: "root",
  database: "medlab",
});

// ----- User Account -----

// create user
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

//login and gen jwt token
app.post("/login", jsonParser, (req, res) => {
  const user_name = req.body.user_name;
  const user_password = req.body.user_password;
  const role = req.body.role;

  db.query(
    //check user account in database
    "SELECT * FROM user WHERE user_name= ? AND role = ?",
    [user_name, role],
    (err, user) => {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      //if user not found return "not found"
      if (user.length == 0) {
        res.json({ status: "not found", message: "User not found" });
        return;
      }
      //if all value correct return jwt token and status
      bcrypt.compare(
        user_password,
        user[0].user_password,
        function (err, result) {
          if (result) {
            const tokenUsername = jwt.sign(
              { user_name: user[0].user_name },
              secret,
              { expiresIn: "1h" }
            );
            res.cookie("token", tokenUsername, {
              maxAge: 500000,
              secure: true,
              httpOnly: true,
              // sameSite:"none",
            });
            res.json({
              status: "success",
              message: "Login successfully",
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

// check jwt token and return user detail for check withdraw and add_new rights
app.get("/authen", jsonParser, (req, res) => {
  try {
    const token = req.cookies.token;
    const user = jwt.verify(token, secret);
    db.query(
      "SELECT user_name,name,surname,role,withdraw,add_new FROM user where user_name = ?",
      user.user_name,
      (err, result) => {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        } else {
          res.send(result);
        }
      }
    );
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
});

app.get("/logout", jsonParser, (req, res) => {
  res.clearCookie("token");
  res.send("Cooking Cleared");
});

app.get("/userList", jsonParser, (req, res) => {
  db.query(
    "SELECT * FROM user INNER JOIN user_role ON user.role = user_role.role_id ",
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
app.post("/getUserDetail", jsonParser, (req, res) => {
  const user_name = req.body.username;

  db.query(
    "SELECT * FROM user WHERE user_name = ?",
    user_name,
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

// ----- Product -----

app.get("/product", jsonParser, (req, res) => {
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

app.put("/updateProduct", jsonParser, (req, res) => {
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

app.delete("/removeProduct", jsonParser, (req, res) => {
  const id = req.body.id;
  db.query("DELETE FROM product WHERE id = ?", id, (err, result) => {
    if (err) {
      res.json({ status: "error", message: err });
      return;
    } else {
      res.json({ status: "success", message: "Delete  Successfully" });
    }
  });
});

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

// ----- Order -----
app.post("/import", jsonParser, (req, res) => {
  const user_name = req.body.user_name;
  let import_id;
  const orderList = req.body.orderList;

  db.query(
    "INSERT INTO import (importer) VALUES (?)",
    user_name,
    (err, result) => {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      } else {
        import_id = result.insertId;
        const sql = "INSERT INTO lot (p_id,quantity) VALUES ?";
        const value = orderList.map((order) => [order.p_id, order.quantity]);

        db.query(sql, [value], (err, result) => {
          if (err) {
            res.json({ status: "error", message: err });
            return;
          } else {
            const promises = [];
            for (let i = 0; i < result.affectedRows; i++) {
              const promise = new Promise((resolve, reject) => {
                db.query(
                  "INSERT INTO import_detail (import_id,lot_id) VALUES (?,?)",
                  [import_id, result.insertId + i],
                  (err, result) => {
                    if (err) {
                      reject(err);
                    } else {
                      resolve();
                    }
                  }
                );
              });
              promises.push(promise);
            }

            Promise.all(promises)
              .then(() => {
                res.json({
                  status: "success",
                  message: "Insert Successfully",
                });
              })
              .catch((err) => {
                res.json({ status: "error", message: err });
              });
          }
        });
      }
    }
  );
});

// ----- Warehouse, Location -----
app.post("/createWarehouse", jsonParser, (req, res) => {
  const name = req.body.name;
  db.query(
    "SELECT * FROM warehouse WHERE warehouse_name = ?",
    name,
    (err, result) => {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      } else if (result.length > 0) {
        res.json({
          status: "Already",
          message: "Warehouse name already exist",
        });
        return;
      } else {
        db.query(
          "INSERT INTO warehouse (warehouse_name) VALUES (?)",
          name,
          (err, result) => {
            if (err) {
              res.json({ status: "error", message: err });
              return;
            } else {
              res.send(result);
            }
          }
        );
      }
    }
  );
});

app.get("/getWarehouse", jsonParser, (req, res) => {
  db.query("SELECT * FROM warehouse", (err, result) => {
    if (err) {
      res.json({ status: "error", message: err });
      return;
    } else {
      res.send(result);
    }
  });
});

app.post("/LocationInWarehouse", jsonParser, (req, res) => {
  const warehouse_id = req.body.warehouse_id;
  db.query(
    "SELECT COUNT(*) as countID FROM location WHERE warehouse_id = ?",
    warehouse_id,
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

app.listen("3000", () => {
  console.log("Server is running on port 3000");
});
