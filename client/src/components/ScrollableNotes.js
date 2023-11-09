import { Card, List, ListItem, ListItemText, ListSubheader, Typography, IconButton, Button, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { getnotes, deletenote } from "../functions/noteFunctions";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { createnote } from "../functions/noteFunctions";
import "../generalStyles.css"
import CreateNoteDialog from "./CreateNoteDialog";

export default function ScrollableNotes({ setNotes, notes }) {
    const user = JSON.parse(localStorage.getItem("user"))
    const [openAdd, setOpenAdd] = useState(false)

    const handleDeleteNote = async (noteId) => {
        const originalNotes = [...notes];
        const filterNotes = originalNotes.filter((note) => note._id !== noteId);
        setNotes(filterNotes);
        const res = await deletenote(noteId);
        !res && setNotes(originalNotes);
    };

    const handleCreateNote = async (payload) => {
        const res = await createnote(payload);
        if (res !== false) {
            setNotes([...notes, res]);
        }
    };


    const fetchNotes = async () => {
        // e.preventDefault();
        const payload = { id: user._id };
        const res = await getnotes(payload);
        if (res !== false) {
            setNotes(res)
        }
    };

    useEffect(() => {
        fetchNotes()
    }, [])

    return (
        <>
            <Card style={{ width: "25%" }}>
                <List sx={{
                    overflow: 'auto',
                    maxHeight: '35rem',
                }} subheader={<li />}>
                    <li key={`section-1`}>
                        <ul style={{ padding: '1rem' }}>
                            <ListSubheader style={{ padding: "1rem" }}><Typography variant="h6">Notes</Typography></ListSubheader>
                            {notes.map((note) => {
                                return (
                                    <ListItem key={note._id}>
                                        <IconButton aria-label="delete" onClick={() => handleDeleteNote(note._id)} style={{marginRight: "1.5rem"}}>
                                            <DeleteForeverIcon fontSize='medium' style={{ color: "red" }} />
                                        </IconButton>
                                        <ListItemText primary={note.name} secondary={note.desc} />
                                    </ListItem>
                                )
                            })}
                        </ul>
                    </li>
                </List>
                <Box style={{margin: "2rem"}}>
                    <Button variant="contained" onClick={() => setOpenAdd(true)}>+ Add Note</Button>
                </Box>
            </Card>
            <CreateNoteDialog openAdd={openAdd} setOpenAdd={setOpenAdd} handleCreateNote={handleCreateNote}/>
        </>
    )
}