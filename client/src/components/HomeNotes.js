import { Card, List, ListItem, ListItemText, ListSubheader, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { getnotes } from "../functions/noteFunctions";

export default function HomeNotes({ setNotes, notes }) {
    const user = JSON.parse(localStorage.getItem("user"))

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
            <Card style={{ width: "30%"}}>
                <List sx={{
                    overflow: 'auto',
                    maxHeight: '35rem',
                }} subheader={<li />}>
                    <li key={`section-1`}>
                        <ul style={{padding:'1rem'}}>
                            <ListSubheader style={{padding: "1rem"}}><Typography variant="h6">Notes</Typography></ListSubheader>
                            {notes.map((note) => {
                                return (
                                    <ListItem key={note._id}>
                                        <ListItemText primary={note.desc} secondary={note.date} />
                                    </ListItem>
                                )
                            })}
                        </ul>
                    </li>
                </List>
            </Card>
        </>
    )
}