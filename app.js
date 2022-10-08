const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")

// console.log(date());

const app = express();

var tasks = ["I am first task!"]
let workItems = []

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

app.get("/", function (req, res) {

    let day = date.getDate();
    // let day = date.getDay();

    res.render("list", { listTitle: day, newItems: tasks });
});

app.post("/", function(req,res) {

    var task =  req.body.newItem
    
    if(req.body.list === "Work") {
        workItems.push(task)
        res.redirect("/work")
    }
    else {
        tasks.push(task)
        res.redirect("/")
    }

    console.log(req.body);

    console.log(task);
})

app.get("/work", function(req,res) {
    res.render("list", {listTitle: "Work List", newItems: workItems})
})

app.post("/work", function(req, res){
    let item = req.body.newItem
    workItems.push(item)
    res.redirect("/work")
})

app.get("/about", function(req,res){
    res.render("about")
})

app.listen(process.env.PORT || 3000, function () {
    console.log("Server started at port 3000");
});
