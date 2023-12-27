const express = require("express")
const router = express.Router();
const fetchuser = require("../middleware/fetchUser");
const Notes = require("../models/Notes")
const { body, validationResult } = require("express-validator")


router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })

        res.json(notes);
    } catch (e) {
        return res.status(500).send(e)
    }
})
router.post('/addnote', fetchuser, [body('title').isLength({ min: 3 }), body('description').isLength({ min: 5 })], async (req, res) => {

    try {

        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })

        const savedNote = await (note.save())
        res.json(savedNote)
    } catch (error) {
        return res.status(500).send({ error: error })
    }
})



router.put('/updatenote/:id', fetchuser, async (req, res) => {

    try {

        const { title, description, tag } = req.body;
        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }


        let note = await Notes.findById(req.params.id);
        if (!note) { res.status(404).send("Note not found") }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");

        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    } catch (error) {
        return res.status(500).send({ error: error })
    }
})

router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {

        let note = await Notes.findById(req.params.id);
        if (!note) { res.status(404).send("Note not found") }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");

        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json( "successfully deleted the note")
    } catch (error) {
        return res.status(500).send({ error: error })
    }
})
module.exports = router;