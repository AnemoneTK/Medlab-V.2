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

app.get("/inventorySummary", (req, res) => {
  // Count total products
  const countProductQuery = "SELECT COUNT(*) as totalProduct FROM product";
  
  // Show low stock products
  const showLowStockQuery = `
    SELECT
        product.id AS p_id,
        product.low_stock,
        IFNULL(SUM(lot.quantity), 0) AS total_quantity,
        CASE
            WHEN IFNULL(SUM(lot.quantity), 0) <= product.low_stock THEN 'Low Stock'
            ELSE 'Sufficient Stock'
        END AS stock_status
    FROM
        product
    LEFT JOIN
        lot ON product.id = lot.p_id
    GROUP BY
        product.id`;

  // Count low stock products
  const countLowStockQuery = `
    SELECT COUNT(*) AS low_stock_count
    FROM (
        SELECT
            product.id AS p_id,
            product.low_stock,
            IFNULL(SUM(lot.quantity), 0) AS total_quantity,
            CASE
                WHEN IFNULL(SUM(lot.quantity), 0) <= product.low_stock THEN 'Low Stock'
                ELSE 'Sufficient Stock'
            END AS stock_status
        FROM
            product
        LEFT JOIN
            lot ON product.id = lot.p_id
        GROUP BY
            product.id
    ) AS stock_summary
    WHERE stock_status = 'Low Stock'`;

  const overdueLotsQuery = `
    SELECT *
    FROM lot
    WHERE DATEDIFF(exp_date, CURRENT_DATE) <= before_date`;
    
  const countOverdueLotsQuery = `
    SELECT COUNT(*) AS overdue_lot_count
    FROM lot
    WHERE DATEDIFF(exp_date, CURRENT_DATE) <= before_date`;

  db.query(countProductQuery, (err, productResult) => {
    if (err) {
      res.json({ status: "error", message: err });
      return;
    }
    const totalProductCount = productResult[0].totalProduct;

    db.query(showLowStockQuery, (err, lowStockResult) => {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      const lowStockProducts = lowStockResult.filter((product) => product.stock_status === 'Low Stock');

      db.query(countLowStockQuery, (err, countLowStockResult) => {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        }
        const lowStockCount = countLowStockResult[0].low_stock_count;

        db.query(overdueLotsQuery, (err, overdueLotsResult) => {
          if (err) {
            res.json({ status: "error", message: err });
            return;
          }

          db.query(countOverdueLotsQuery, (err, countOverdueLotsResult) => {
            if (err) {
              res.json({ status: "error", message: err });
              return;
            }
            const overdueLotCount = countOverdueLotsResult[0].overdue_lot_count;

            res.json({
              status: "success",
              total_product_count: totalProductCount,
              low_stock_products: lowStockProducts,
              low_stock_count: lowStockCount,
              overdue_lots: overdueLotsResult,
              overdue_lot_count: overdueLotCount
            });
          });
        });
      });
    });
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
        const sql = "INSERT INTO lot (p_id, quantity) VALUES ?";
        const values = orderList.map((order) => [order.p_id, order.quantity]);

        db.query(sql, [values], (err, lotResult) => {
          if (err) {
            res.json({ status: "error", message: err });
            return;
          } else {
            const lotIds = [];
            for (let i = 0; i < lotResult.affectedRows; i++) {
              lotIds.push(lotResult.insertId + i);
            }

            const purchaseDetailValues = orderList.map((order, index) => [
              purchase_id,
              lotIds[index],
              order.p_id,
              order.quantity,
            ]);

            db.query(
              "INSERT INTO purchase_detail (purchase_id, lot_id, p_id, quantity) VALUES ?",
              [purchaseDetailValues],
              (err, purchaseDetailResult) => {
                if (err) {
                  res.json({ status: "error", message: err });
                  return;
                } else {
                  res.json({
                    status: "success",
                    message: "Insert Successfully",
                    purchase_id: purchase_id,
                  });
                }
              }
            );
          }
        });
      }
    }
  );
});

app.post("/purchaseDetail", jsonParser, (req, res) => {
  const purchase_id = req.body.purchase_id;
  const sql = `
  SELECT * FROM purchase_detail
  INNER JOIN lot ON purchase_detail.lot_id = lot.lot_id
  INNER JOIN product ON lot.p_id = product.id
  INNER JOIN unit ON product.unit = unit.unit_id
  WHERE purchase_id = ?
  `;
  db.query(sql, purchase_id, (err, result) => {
    if (err) {
      res.json({ status: "error", message: err });
      return;
    } else {
      res.send(result);
    }
  });
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

    db.query(totalLots, warehouse_id, (err, totalLotsResult) => {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }

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

  const lotsInLocation = `
      SELECT  * , DATEDIFF(lot.exp_date, lot.due_date) AS days_left
      FROM location
      LEFT JOIN warehouse ON warehouse.warehouse_id = location.warehouse_id
      LEFT JOIN lot ON location.location_id = lot.location_id  
      LEFT JOIN product ON lot.p_id = product.id
      LEFT JOIN unit ON product.unit = unit.unit_id
      WHERE location.warehouse_id = ? OR lot.location_id = NULL
      ORDER BY location.Location_name;`;

  db.query(lotsInLocation, warehouse_id, (err, result) => {
    if (err) {
      res.json({ status: "error", message: err });
      return;
    } else {
      res.send(result);
    }
  });
});

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

app.post("/createLocation", jsonParser, (req, res) => {
  const location_name = req.body.location_name;
  const warehouse_id = req.body.warehouse_id;

  db.query(
    "SELECT * FROM location WHERE Location_name = ?",
    location_name,
    (err, location) => {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      } else if (location.length > 0) {
        res.json({
          status: "Already",
          message: "Warehouse name already exist",
        });
      } else {
        db.query(
          "INSERT INTO location (Location_name , warehouse_id) VALUES (?,?)",
          [location_name, warehouse_id],
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

app.delete("/deleteLocation", jsonParser, (req, res) => {
  const location_name = req.body.location_name;

  db.query(
    "DELETE FROM location WHERE Location_name = ?",
    location_name,
    (err, result) => {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      } else {
        res.json({ status: "success", message: "Delete  Successfully" });
      }
    }
  );
});

// ----- Import -----
// Get Empty Location

app.get("/getEmptyLocation", jsonParser, (req, res) => {
  const sql = `
  SELECT warehouse.warehouse_id, warehouse.warehouse_name,location.location_id, location.Location_name
  FROM location 
  LEFT JOIN warehouse ON location.warehouse_id = warehouse.warehouse_id
  LEFT JOIN lot ON location.location_id = lot.location_id 
  WHERE lot.location_id IS NULL`;
  db.query(sql, (err, result) => {
    if (err) {
      res.json({ status: "error", message: err });
      return;
    } else {
      res.send(result);
    }
  });
});

app.post("/getDetailForImport", jsonParser, (req, res) => {
  const purchase_id = req.body.purchase_id;

  // Query to check if there are any purchase records for the given purchase ID
  let purchaseCheck = `
    SELECT COUNT(*) AS purchaseCount
    FROM purchase
    WHERE purchase_id = ?`;

  db.query(purchaseCheck, purchase_id, (err, purchaseCheckResult) => {
    if (err) {
      res.json({ status: "error", message: err });
      return;
    }

    const purchaseCount = purchaseCheckResult[0].purchaseCount;

    if (purchaseCount === 0) {
      res.json({
        status: "No purchase order",
        message: "No purchase order found for the given purchase ID",
      });
      return;
    }

    // Query to count occurrences of lot.location_id that are not null
    let LocationCount = `
      SELECT COUNT(*) AS locationCount
      FROM purchase_detail
      WHERE purchase_id = ?  AND location_id IS NOT NULL`;

    // Query to count occurrences of lot.exp_date that are empty
    let ExpDateCount = `
      SELECT COUNT(*) AS expDateCount
      FROM lot
      LEFT JOIN purchase_detail ON lot.lot_id = purchase_detail.lot_id
      WHERE purchase_detail.purchase_id = ? AND lot.exp_date IS NULL`;

    db.query(LocationCount, purchase_id, (err, locationResult) => {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }

      const locationCount = locationResult[0].locationCount;

      if (locationCount > 0) {
        res.json({
          status: "Imported",
          message: "Locations are already imported",
        });
        return;
      }

      // Execute the query to count empty exp_dates
      db.query(ExpDateCount, purchase_id, (err, expDateResult) => {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        }
        const expDateCount = expDateResult[0].expDateCount;
        // If waiting for vendor, send response
        if (expDateCount > 0) {
          res.json({
            status: "Waiting",
            message: "Waiting for vendor to provide expiration dates",
          });
          return;
        }

        // Query to retrieve purchase details
        let sql = `
          SELECT *
          FROM purchase_detail
          LEFT JOIN purchase ON purchase.purchase_id = purchase_detail.purchase_id
          LEFT JOIN lot ON lot.lot_id = purchase_detail.lot_id
          LEFT JOIN product ON product.id = lot.p_id
          LEFT JOIN unit ON product.unit = unit.unit_id
          LEFT JOIN location ON location.location_id = lot.location_id
          WHERE purchase.purchase_id = ?`;

        // Execute the main query
        db.query(sql, purchase_id, (err, result) => {
          if (err) {
            res.json({ status: "error", message: err });
            return;
          } else {
            if (result.length === 0) {
              res.json({
                status: "Not found",
                message: "No records found for the given purchase ID",
              });
            } else {
              res.json({ status: "success", data: result });
            }
          }
        });
      });
    });
  });
});


app.put("/import", jsonParser, (req, res) => {
  const purchase_id = req.body.purchase_id;
  const user_name = req.body.user_name;
  const updateList = req.body.updateList;

  // Start a transaction
  db.beginTransaction((err) => {
    if (err) {
      return res.json({ status: "error", message: "Transaction failed to start" });
    }

    // Insert into import table
    let importSQL = `INSERT INTO import (purchase_id, importer) VALUES (?, ?)`;
    db.query(importSQL, [purchase_id, user_name], (err, importResult) => {
      if (err) {
        // Rollback transaction if insert operation fails
        return db.rollback(() => {
          res.json({ status: "error", message: "Failed to import data", error: err });
        });
      }

      // Update location_id in lot table for each item in updateList array
      let updatePromises = updateList.map((updateItem) => {
        return new Promise((resolve, reject) => {
          // Update location_id in lot table
          let updateLot = `UPDATE lot SET location_id = ? WHERE lot_id = ?`;
          db.query(updateLot, [updateItem.location_id, updateItem.lot_id], (err, updateLotResult) => {
            if (err) {
              reject(err);
            } else {
              // Update location_id in purchase_detail table
              let updatePurchaseDetail = `UPDATE purchase_detail SET location_id = ? WHERE lot_id = ?`;
              db.query(updatePurchaseDetail, [updateItem.location_id, updateItem.lot_id], (err, updatePurchaseDetailResult) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(updatePurchaseDetailResult);
                }
              });
            }
          });
        });
      });

      // Execute all update promises
      Promise.all(updatePromises)
        .then(() => {
          // Commit transaction if all updates are successful
          db.commit((err) => {
            if (err) {
              // Rollback transaction if commit fails
              return db.rollback(() => {
                res.json({ status: "error", message: "Failed to commit transaction", error: err });
              });
            }
            // If everything is successful, send success response
            res.json({ status: "success", message: "Imported Successfully" });
          });
        })
        .catch((updateErr) => {
          // Rollback transaction if any update operation fails
          return db.rollback(() => {
            res.json({ status: "error", message: "Failed to update location", error: updateErr });
          });
        });
    });
  });
});



// ----- History -----
app.get("/purchaseHistory", jsonParser, (req, res) => {
  db.query("SELECT * FROM purchase", (err, purchaseResult) => {
    if (err) {
      res.json({ status: "error", message: err });
      return;
    } else {
      // Check if purchaseResult array is empty
      if (purchaseResult.length === 0) {
        res.json({ status: "No data", message: "No data", data: [] });
        return;
      }

      const purchaseIds = purchaseResult.map((purchase) => purchase.purchase_id);
      const sql = `
        SELECT *,purchase_detail.quantity FROM purchase_detail
        LEFT JOIN purchase ON purchase.purchase_id = purchase_detail.purchase_id
        LEFT JOIN lot on purchase_detail.lot_id = lot.lot_id   
        LEFT JOIN product ON product.id = purchase_detail.p_id
        LEFT JOIN unit ON product.unit = unit.unit_id
        LEFT JOIN location ON location.location_id = purchase_detail.location_id
        WHERE purchase.purchase_id IN (?)`;

      db.query(sql, [purchaseIds], (err, detailResult) => {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        } else {
          const combinedData = purchaseResult.map((purchase) => {
            const details = detailResult.filter(
              (detail) => detail.purchase_id === purchase.purchase_id
            );
            return { ...purchase, details };
          });
          res.json({ status: "success", data: combinedData });
        }
      });
    }
  });
});


app.get("/importHistory", jsonParser, (req, res) => {
  db.query("SELECT * FROM import", (err, importResult) => {
    if (err) {
      res.json({ status: "error", message: err });
      return;
    } else {
      if (importResult.length === 0) {
        res.json({
          status: "No import",
          message: "No import records found",
        });
        return;
      }

      const purchaseIds = importResult.map((imp) => imp.purchase_id);
      const sql = `
        SELECT *,purchase_detail.quantity FROM purchase_detail
        LEFT JOIN purchase ON purchase.purchase_id = purchase_detail.purchase_id
        LEFT JOIN lot ON lot.lot_id = purchase_detail.lot_id
        LEFT JOIN product ON product.id = purchase_detail.p_id
        LEFT JOIN unit ON product.unit = unit.unit_id
        LEFT JOIN location ON location.location_id = purchase_detail.location_id
        WHERE purchase_detail.purchase_id IN (?)`;

      db.query(sql, [purchaseIds], (err, detailResult) => {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        } else {
          const combinedData = importResult.map((imp) => {
            const details = detailResult.filter(
              (detail) => detail.purchase_id === imp.purchase_id
            );
            return { ...imp, details };
          });
          res.json({ status: "success", data: combinedData });
        }
      });
    }
  });
});


app.listen("3000", () => {
  console.log("Server is running on port 3000");
});
