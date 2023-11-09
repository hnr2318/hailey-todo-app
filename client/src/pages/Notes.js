import { Stack, IconButton } from "@mui/material"
import "../generalStyles.css"
import { SnackbarProvider } from 'notistack'
import { useEffect, useState } from "react"
import { getnotes, deletenote, updatenote } from "../functions/noteFunctions"
import { createnote } from "../functions/noteFunctions";
import EditNoteCard from "../components/EditNoteCard"
import ScrollableNotes from "../components/ScrollableNotes"

export default function Notes() {
    const user = JSON.parse(localStorage.getItem("user"))
    const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem("notes")) ?? []);

    const fetchNotes = async () => {
        const payload = { id: user._id };
        const res = await getnotes(payload);
        if (res !== false) {
            setNotes(res)
            localStorage.setItem("notes", JSON.stringify(res))
        }
    };
    
    const handleUpdateNote = async (note) => {
        const payload = { id: note._id, note: note };
        const res = await updatenote(payload);
        fetchNotes()
    };
    
    useEffect(() => {
        fetchNotes()
    }, [])

    return (
        <>
            <Stack className="center vertSpace" direction="row">
                <ScrollableNotes notes={notes} setNotes={setNotes}/>
            </Stack>
            <SnackbarProvider />
        </>
    )
}
