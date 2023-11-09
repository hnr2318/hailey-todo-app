import { useState } from 'react'
import { Box, Typography, Card, IconButton, Stack, TextField } from '@mui/material';
import "../generalStyles.css"
import EditIcon from '@mui/icons-material/Edit';
import EditNoteCard from './EditNoteCard';

export default function NoteCard({ note, handleUpdateNote }) {
    const [editMode, setEditMode] = useState(false)
    const formatDate = new Date(note.date)
    const [myNote, setMyNote] = useState(note)

    return (
        <Box className="center vertSpace horSpace" style={{ width: "17rem" }}>
            <Card style={{ width: "16rem", padding: '1rem' }}>
                {editMode ? <EditNoteCard note={myNote} setNote={setMyNote} setEditMode={setEditMode} handleUpdateNote={handleUpdateNote}/> :
                    <Stack direction="row" spacing={'1rem'}>
                        <Stack direction="column" spacing={'1rem'}>
                            <Typography className="labelText" variant="body1"><b style={{ fontWeight: 500 }}>{note.desc}</b></Typography>
                            <Typography className="labelText" variant="body2"><b style={{ fontWeight: 500, fontSize: '.9rem' }}>{formatDate.toLocaleString('default', { dateStyle: 'medium' })}</b></Typography>
                        </Stack>
                        <IconButton onClick={() => setEditMode(true)}><EditIcon /></IconButton>
                    </Stack>
                }
            </Card>
        </Box>
    )
}