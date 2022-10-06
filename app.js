const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var tasks = ["I am first task!"]

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

app.get("/", function (req, res) {
    var today = new Date();
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    var day = today.toLocaleDateString("en-US", options)


    res.render("list", { kindOfDay: day, newItems: tasks });
});

app.post("/", function(req,res) {
    var task =  req.body.newItem

    tasks.push(task)


    console.log(task);
    res.redirect("/")
})

app.listen(process.env.PORT || 3000, function () {
    console.log("Server started at port 3000");
});
