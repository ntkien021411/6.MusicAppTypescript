import express, { Express} from "express";
const app: Express = express();




//Connect Database
import * as database from "./config/database";
database.connect();


// ENV
import dotenv from "dotenv";
dotenv.config();
const port: Number | String = process.env.PORT || 3000;

import path, { dirname } from "path"


// dùng ngôn ngữ pug
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

//Nhúng phải tĩnh css,js,images
app.use(express.static(`${__dirname}/public`));

//TinyMCE
app.use('/tinymce', 
express.static(path.join(__dirname, 'node_modules', 'tinymce'))
);

// Dùng body parser
import bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));


//Ghi đè lại router
import methodOverride from "method-override"
// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride("_method"));


//Biến toàn cục 
// App Locals Variables , chỉ dùng dc trong file pug
import { systemConfig } from "./config/config";
app.locals.prefixAdmin = systemConfig.prefixAdmin;


//Router client
import clientRoutes from "./routes/client/index.route";
clientRoutes(app);

import adminRoutes from "./routes/admin/index.route";
adminRoutes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
