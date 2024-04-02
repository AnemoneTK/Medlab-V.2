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
              // maxAge: 500000,
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
      "SELECT user_name,name,surname,role,withdraw,add_new,purchase FROM user where user_name = ?",
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
  db.query("SELECT COUNT(*) as totalProduct FROM product", (err, result) => {
    if (err) {
      res.json({ status: "error", message: err });
      return;
    }
  });

  // db.query("SELECT COUNT(*) as expProduct FROM lot WHERE low_stock >= quantity", (err, result) => {
  //   if (err) {
  //     res.json({ status: "error", message: err });
  //     return;
  //   }
  // });
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
  const low_stock = req.body.low_stock;
  const unit = req.body.unit;
  const type = req.body.type;
  const category = req.body.category;
  const detail = req.body.detail;
  const direction = req.body.direction;

  db.query(
    "INSERT INTO product (id, name, low_stock, unit, type, category, detail, direction) VALUES(?,?,?,?,?,?,?,?)",
    [id, name, low_stock, unit, type, category, detail, direction],
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
  const sql = `
  SELECT * FROM product 
  INNER JOIN unit ON product.unit = unit.unit_id 
  INNER JOIN type ON product.type = type.type_id 
  INNER JOIN category ON product.category = category.category_id
  WHERE id = ?
  `;
  db.query(sql, id, (err, result) => {
    if (err) {
      res.json({ status: "error", message: err });
      return;
    } else {
      res.send(result);
    }
  });
});

app.put("/updateProduct", jsonParser, (req, res) => {
  const id = req.body.id;
  const low_stock = req.body.low_stock;
  const name = req.body.name;
  const unit = req.body.unit;
  const type = req.body.type;
  const category = req.body.category;
  const detail = req.body.detail;
  const direction = req.body.direction;
  db.query(
    "UPDATE product SET id = ?, name = ?, low_stock = ?, unit = ?, type = ?, category = ?, detail = ?, direction = ? WHERE id = ?",
    [id, name, low_stock, unit, type, category, detail, direction, id],
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
app.post("/purchase", jsonParser, (req, res) => {
  const user_name = req.body.user_name;
  const orderList = req.body.orderList;
  let purchase_id;

  db.query(
    "INSERT INTO purchase (purcher) VALUES (?)",
    user_name,
    (err, result) => {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      } else {
        purchase_id = result.insertId;
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
                  "INSERT INTO purchase_detail (purchase_id,lot_id) VALUES (?,?)",
                  [purchase_id, result.insertId + i],
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

app.post("/Warehouse", jsonParser, (req, res) => {
  const warehouse_id = req.body.warehouse_id;

  // get total locations in warehouse
  const totalLocations = `
      SELECT COUNT(*) AS total_locations
      FROM location
      WHERE warehouse_id = ?`;

  // get total lots in warehouse along with count where before_date >= DATEDIFF(exp_date, due_date)
  const totalLots = `
      SELECT
        COUNT(lot.lot_id) AS total_lots,
        SUM(CASE WHEN lot.before_date >= DATEDIFF(lot.exp_date, lot.due_date) THEN 1 ELSE 0 END) AS total_lots_before_date
      FROM location l
      LEFT JOIN lot ON l.location_id = lot.location_id
      WHERE l.warehouse_id = ?
      GROUP BY l.location_id`;

  // Execute total locations query
  db.query(totalLocations, warehouse_id, (err, totalLocationsResult) => {
    if (err) {
      res.json({ status: "error", message: err });
      return;
    }

    // Execute total lots query
    db.query(totalLots, warehouse_id, (err, totalLotsResult) => {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }

      // Calculate total lots and lots with before_date >= DATEDIFF(exp_date, due_date)
      const totalLotsCount = totalLotsResult.reduce(
        (total, current) => total + current.total_lots,
        0
      );
      const totalLotsBeforeDateCount = totalLotsResult.reduce(
        (total, current) => total + current.total_lots_before_date,
        0
      );

      res.json({
        status: "success",
        total_locations: totalLocationsResult[0].total_locations,
        total_lots: totalLotsCount,
        total_lots_before_date: totalLotsBeforeDateCount,
      });
    });
  });
});

app.post("/WarehouseDetail", jsonParser, (req, res) => {
  const warehouse_id = req.body.warehouse_id;

  // get total lots in location where warehouse_id = input warehouse_id
  const lotsInLocation = `
      SELECT  * 
      FROM lot
      LEFT JOIN product ON lot.p_id = product.id
      LEFT JOIN location ON lot.location_id = location.location_id
      LEFT JOIN warehouse ON warehouse.warehouse_id = location.warehouse_id
      WHERE location.warehouse_id = ? AND lot.location_id = location.location_id`;

  // Execute total lots query
  db.query(lotsInLocation, warehouse_id, (err, result) => {
    if (err) {
      res.json({ status: "error", message: err });
      return;
    }else{
      res.send(result);
    }
  });
});
// app.post("/WarehouseDetail", jsonParser, (req, res) => {
//   const warehouse_id = req.body.warehouse_id;

//   // get total locations in warehouse
//   const getLocations = `
//       SELECT *
//       FROM location
//       WHERE warehouse_id = ?`;

//   // get total lots in location where warehouse_id = input warehouse_id
//   const lotsInLocation = `
//       SELECT  *
//       FROM lot
//       LEFT JOIN product ON lot.p_id = product.id
//       LEFT JOIN location ON lot.location_id = location.location_id
//       LEFT JOIN warehouse ON warehouse.warehouse_id = location.warehouse_id
//       WHERE location.warehouse_id = ? AND lot.location_id = location.location_id`;

//   // Execute total locations query
//   db.query(getLocations, warehouse_id, (err, totalLocationsResult) => {
//     if (err) {
//       res.json({ status: "error", message: err });
//       return;
//     }

//     // Execute total lots query
//     db.query(lotsInLocation, warehouse_id, (err, totalLotsResult) => {
//       if (err) {
//         res.json({ status: "error", message: err });
//         return;
//       }

//       res.json({
//         status: "success",
//         locations: totalLocationsResult,
//         lots_in_locations: totalLotsResult,
//       });
//     });
//   });
// });

app.delete("/deleteWarehouse", jsonParser, (req, res) => {
  const warehouse_id = req.body.warehouse_id;

  db.query(
    "SELECT * FROM location WHERE warehouse_id = ?",
    [warehouse_id],
    (err, result) => {
      if (!result.length) {
        db.query(
          "DELETE FROM warehouse WHERE warehouse_id = ?",
          warehouse_id,
          (err, result) => {
            if (err) {
              res.json({ status: "error", message: err });
              return;
            } else {
              res.json({ status: "success", message: "Delete  Successfully" });
            }
          }
        );
      } else {
        res.json({
          status: "error",
          message: "Cannot delete warehouse with existing location",
        });
      }
    }
  );
});

app.listen("3000", () => {
  console.log("Server is running on port 3000");
});
