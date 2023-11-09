import { Card, List, ListItem, ListItemText, ListSubheader, Typography, IconButton, Button, Box, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { useState, useEffect } from "react";
import { gettasks, deletetask } from "../functions/taskFunctions";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { createtask } from "../functions/taskFunctions";
import "../generalStyles.css"
import CreateTaskDialog from "./CreateTaskDialog";

export default function ScrollableTasks({ setTasks, tasks }) {
    const user = JSON.parse(localStorage.getItem("user"))
    const [openAdd, setOpenAdd] = useState(false)

    const handleDeleteTask = async (taskId) => {
        const originalTasks = [...tasks];
        const filterTasks = originalTasks.filter((task) => task._id !== taskId);
        setTasks(filterTasks);
        const res = await deletetask(taskId);
        !res && setTasks(originalTasks);
    };

    const handleCreateTask = async (payload) => {
        const res = await createtask(payload);
        if (res !== false) {
            setTasks([...tasks, res]);
        }
    };


    const fetchTasks = async () => {
        // e.preventDefault();
        const payload = { id: user._id };
        const res = await gettasks(payload);
        if (res !== false) {
            setTasks(res)
        }
    };

    useEffect(() => {
        fetchTasks()
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
                            <ListSubheader style={{ padding: "1rem" }}><Typography variant="h6">Tasks</Typography></ListSubheader>
                            {tasks && tasks.map((task) => {
                                const formatDate = new Date(task.dueDate).toLocaleString('default', { dateStyle: 'medium' })
                                return (
                                    <ListItem key={task._id}>
                                        <Accordion style={{ width: "100%" }}>
                                            <AccordionSummary>
                                                <IconButton aria-label="delete" onClick={() => handleDeleteTask(task._id)} style={{ marginRight: "1.5rem" }}>
                                                    <DeleteForeverIcon fontSize='medium' style={{ color: "red" }} />
                                                </IconButton>
                                                <ListItemText primary={task.name} secondary={task.desc} />
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <List>
                                                    <ListItem>
                                                        <ListItemText primary={"Due Date"} secondary={formatDate} />
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText primary={"Priority"} secondary={task.priority} />
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText primary={"Status"} secondary={task.status} />
                                                    </ListItem>
                                                </List>
                                            </AccordionDetails>
                                        </Accordion>
                                    </ListItem>
                                )
                            })}
                        </ul>
                    </li>
                </List>
                <Box style={{ margin: "2rem" }}>
                    <Button variant="contained" onClick={() => setOpenAdd(true)}>+ Add Task</Button>
                </Box>
            </Card>
            <CreateTaskDialog openAdd={openAdd} setOpenAdd={setOpenAdd} handleCreateTask={handleCreateTask}/>
        </>
    )
}