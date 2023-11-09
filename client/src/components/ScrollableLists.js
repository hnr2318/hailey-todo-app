import { Card, List, ListItem, ListItemText, ListSubheader, Typography, IconButton, Button, Box, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { useState, useEffect } from "react";
import { getlists, deletelist, removeTaskFromList } from "../functions/listFunctions";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { createlist } from "../functions/listFunctions";
import "../generalStyles.css"
import CreateListDialog from "./CreateListDialog";
import ScrollableListItem from "./ScrollableListItem";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

export default function ScrollableLists({ setLists, lists }) {
    const user = JSON.parse(localStorage.getItem("user"))
    const [openAdd, setOpenAdd] = useState(false)
    const [list, setList] = useState({});
    const [tasks, setTasks] = useState([]);

    const handleDeleteList = async (listId) => {
        const originalLists = [...lists];
        const filterLists = originalLists.filter((list) => list._id !== listId);
        setLists(filterLists);
        const res = await deletelist(listId);
        !res && setLists(originalLists);
    };

    const handleCreateList = async (payload) => {
        const res = await createlist(payload);
        if (res !== false) {
            setLists([...lists, res]);
        }
    };

    const handleRemoveTask = async (listId, taskId) => {
        const originalTasks = [...tasks];
        const payload = { listId: listId, taskId: taskId };
        console.log(listId, taskId)
        const filterTasks = originalTasks.filter((task) => task._id !== taskId);
        setTasks(filterTasks);
        const res = await removeTaskFromList(payload);
        if(res !== false){
            setTasks(filterTasks)
        }
    };


    const fetchLists = async () => {
        // e.preventDefault();
        const payload = { id: user._id };
        const res = await getlists(payload);
        if (res !== false) {
            setLists(res)
        }
    };

    useEffect(() => {
        fetchLists()
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
                            <ListSubheader style={{ padding: "1rem" }}><Typography variant="h6">Lists</Typography></ListSubheader>
                            {lists.map((list) => {
                                return (
                                    <ListItem key={list._id}>
                                        <Accordion style={{ width: "100%" }}>
                                            <AccordionSummary>
                                                <IconButton aria-label="delete" onClick={() => handleDeleteList(list._id)} style={{ marginRight: "1.5rem" }}>
                                                    <DeleteForeverIcon fontSize='medium' style={{ color: "red" }} />
                                                </IconButton>
                                                <ListItemText primary={list.name} secondary={list.desc} />
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <List style={{ marginLeft: "2rem" }}>
                                                    {list.tasks.map((task) => {
                                                        return (
                                                            <ListItem key={task}>
                                                                <IconButton aria-label="delete" onClick={() => handleRemoveTask(list._id, task)}>
                                                                    <RemoveCircleIcon fontSize='small' />
                                                                </IconButton>
                                                                <ScrollableListItem taskId={task} />
                                                            </ListItem>
                                                        )
                                                    })}
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
                    <Button variant="contained" onClick={() => setOpenAdd(true)}>+ Add List</Button>
                </Box>
            </Card>
            <CreateListDialog openAdd={openAdd} setOpenAdd={setOpenAdd} handleCreateList={handleCreateList} />
        </>
    )
}
{/* <ListItem key={list._id}>
    <IconButton aria-label="delete" onClick={() => handleDeleteList(list._id)} style={{ marginRight: "1.5rem" }}>
        <DeleteForeverIcon fontSize='medium' style={{ color: "red" }} />
    </IconButton>
    <ListItemText primary={list.name} secondary={list.desc} />
</ListItem> */}