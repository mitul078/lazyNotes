const express = require("express")
const connectToDB = require("./src/db/db")
const noteModel = require("./src/models/note.model")
const cors = require("cors")
connectToDB()
const app = express()
app.use(cors())
app.use(express.json())
app.get("/", (req, res) => {
    res.send("Hello World")
})
app.post("/notes", async (req, res) => {
    const { title, content } = req.body
    await noteModel.create({
        title, content
    })
    res.json({
        message: "Created"
    })
})

app.get("/notes", async (req, res) => {
    const notes = await noteModel.find()
    res.json({
        message: "Get All Notes",
        notes
    })
})

app.delete("/notes/:id", async (req, res) => {
    const index = req.params.id
    await noteModel.findByIdAndDelete({
        _id: index
    })
    res.json({
        message: "Deleted"
    })
})
app.listen(3000, () => {
    console.log("server is running on ")
})




