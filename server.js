const express = require("express")

var app = express();
var PORT = process.env.PORT || 8080;

var db = require("./models");
var exphbs = require("express-handlebars");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Starting point for express directory
app.use(express.static("public"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/user-routes")(app);
require("./routes/charity-routes")(app);
require("./routes/transaction-routes")(app);
require("./routes/html-routes")(app);
require("./routes/login-routes")(app);




db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });