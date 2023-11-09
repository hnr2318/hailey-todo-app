import { Container, Typography, Stack, Box, Button } from "@mui/material";
import "../generalStyles.css"
import { useEffect, useState } from "react";
import Clock from "../components/Clock";
import UpcomingTasks from "../components/UpcomingTasks"
import HomeNotes from "../components/HomeNotes";

export default function Home() {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) ?? {});
    const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem("notes")) ?? []);

    return (
        <>
            <Stack direction="column" style={{ marginLeft: "20rem", marginRight: "20rem" }}>
                <Container style={{ textAlign: "center", marginBottom: "3rem" }}>
                    {user ? <Typography variant="h4" style={{ fontWeight: 300, fontSize: '2.5rem', marginBottom: "3rem" }}>Welcome {user.name}!</Typography> : <Typography variant="h5">Sign up or Login to Continue!</Typography>}
                    <Clock />
                    <Button variant="contained" style={{marginRight: "2rem", marginTop: "2rem", backgroundColor: "emerald"}}>+ Add Task</Button>
                    <Button variant="contained" style={{marginLeft: "2rem", marginTop: "2rem", backgroundColor: "sienna"}}>+ Add Note</Button>
                </Container>
                <Stack direction="row" >
                    <UpcomingTasks />
                    <Box style={{width: '10rem'}}/>
                    <HomeNotes notes={notes} setNotes={setNotes}/>
                </Stack>
            </Stack>
        </>
    )
}