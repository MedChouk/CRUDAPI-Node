const express = require("express");
const mongoose = require("mongoose");
const Todo = require("./Model/Todo");

const PORT = 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//connection link database
/* https://cloud.mongodb.com/v2/64e520493a8607175f51e422#/clusters */

//connection data base
const url = 'mongodb+srv://admin:admin123@oumaimadb.3trbsdz.mongodb.net/'
mongoose.connect(
    url, { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => {
    console.log("Connected to database !!");
})
.catch((err) => {
    console.log(`Connection failed !! `);
    console.log(err.message);
});

app.get("/", (req, res) => {
    res.send("Let's build a CRUD API!");
});

app.get("/todos", async (req, res) => {
    try {
        const todos = await Todo.find({})
        res.status(200).json(todos)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
  });

app.post("/todo", async (req, res) => {
try {
    const todo = await Todo.create(req.body)
    res.status(200).json(todo)
} catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
}
});

app.get("/todo/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const todo = await Todo.findById(id)
        res.status(200).json(todo)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
});

app.put("/todo/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const todo = await Todo.findByIdAndUpdate(id, req.body);
        if (!todo) {
            return res.status(404).json({message: `Cannot find any todo with ID ${id}`})
        }
        const updateTodo = await Todo.findById(id)
        res.status(200).json(updateTodo);
    } catch (error) { 
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
});

app.delete("/todo/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) {
            return res.status(404).json({message: `Cannot find any todo with ID ${id}`})
        }
        res.status(200).json(todo);
    } catch (error) { 
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
});

app.listen(PORT, async () => {
console.log(`Node API App is running on http://localhost:${PORT}`);
});