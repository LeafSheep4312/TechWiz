const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");


require("dotenv").config();

const database = require("./config/database");
database.connect();

const systemConfig = require("./config/system");

const app = express();
const port = process.env.PORT;

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));

//Flash
app.use(cookieParser("ABCD"));
app.use(session({ cookie: { maxAge: 60000}}));
app.use(flash());

const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");

app.set("views",`${__dirname}/views`);
app.set("view engine", "pug");

//App local variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static(`${__dirname}/public`));

//route
route(app);
routeAdmin(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})
