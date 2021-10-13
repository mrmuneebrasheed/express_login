const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const port = 3000;
const userRoutes = require("./routes/userRoutes");
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: false }));
app.use(userRoutes);

app.listen(port, () => {
    console.log("Server Running on port: " + port);
});
