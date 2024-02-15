import express, { Express, Request, Response } from "express";
const app: Express = express();


//Connect Database
import * as database from "./config/database";
database.connect();


// ENV
import dotenv from "dotenv";
dotenv.config();
const port: Number | String = process.env.PORT || 3000;


// dùng ngôn ngữ pug
app.set("views", `./views`);
app.set("view engine", "pug");

//Nhúng phải tĩnh css,js,images
app.use(express.static(`./public`));

app.get("/topics", async (req:Request , res:Response) =>{
    res.render("client/pages/topics/index");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
