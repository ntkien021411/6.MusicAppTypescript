import express, { Express} from "express";
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


//Router client
import clientRoutes from "./routes/client/index.route";
clientRoutes(app);


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
