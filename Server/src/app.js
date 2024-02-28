import { createConnection } from "mysql";
import cors from "cors";
import express, { json } from "express";
const app = express();

app.use(cors());
app.use(json());

const db = createConnection({
  user: "root",
  host: "localhost:3000",
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

app.listen("3000", () => {
  console.log("Server is running on port 3000");
});
