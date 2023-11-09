import { useState } from 'react'
import { Box, Typography, Card, IconButton, Stack, TextField, Button } from '@mui/material';
import "../generalStyles.css"
import { updatenote } from '../functions/noteFunctions';

export default function EditNoteCard({ note, setNote, setEditMode, handleUpdateNote }) {
    const [updatedNote, setUpdatedNote] = useState(note)
    const formatDate = new Date(note.date)

    function changeUpdateNote(name, value) {
        if (name === "priority" || name === "status") {
            value = parseInt(value, 10) || "";
        }
        setUpdatedNote({ ...updatedNote, [name]: value })
    }

    const handleSubmit = async (e) => {
        if (e !== 'complete') {
            e.preventDefault();
        }
        handleUpdateNote(updatedNote)
        setEditMode(false)
    };


    return (
        <form onSubmit={handleSubmit}>
            <TextField name="desc" value={updatedNote.desc} onChange={(e) => changeUpdateNote(e.target.name, e.target.value)} label="Description" variant="outlined" />
            <Button type="submit">Save Changes</Button>
        </form>
    )
}