import { Box, Typography, Button, Select, MenuItem, InputLabel, FormControl, Stack } from "@mui/material";
import TextInput from "./TextInput";
import { useEffect, useState } from "react";
import Joi from "joi";
import "../generalStyles.css"
import { SnackbarProvider } from 'notistack'
import { gettasks } from "../functions/taskFunctions";
import { getlists, addTaskToList } from "../functions/listFunctions";

export default function AddTaskToList() {
    const user = JSON.parse(localStorage.getItem("user"))
    const [lists, setLists] = useState(() => JSON.parse(localStorage.getItem("lists")) ?? []);
    const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("tasks")) ?? []);

    const [data, setData] = useState({
        listId: "",
        taskId: "",
    });
    const [errors, setErrors] = useState({});

    const handleInputState = (e) => {
        const name = e.name;
        const value = e.value;
        setData({ ...data, [name]: value })
    };

    const handleErrorState = (name, value) => {
        value === ""
            ? delete errors[name]
            : setErrors(() => ({ ...errors, [name]: value }));
    };

    const schema = {
        listId: Joi.string().required().label("List Name"),
        taskId: Joi.string().required().label("Task Name"),
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { data, id: user._id };
        const res = await addTaskToList(payload);
        setData({
            listId: "",
            taskId: "",
        });
    };

    const fetchLists = async () => {
        // e.preventDefault();
        const payload = { id: user._id };
        const res = await getlists(payload);
        if (res !== false) {
            setLists(res)
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
        fetchLists()
        fetchTasks()
    }, [])

    // useEffect(() => {
    //     fetchLists()
    // }, [data])


    return (
        <Box className="center vertSpace horSpace">
            <SnackbarProvider />
            <form onSubmit={handleSubmit}>
                <Stack direction="column">
                    <Typography variant="h4">Add Task to list</Typography>
                    <FormControl sx={{ minWidth: 180 }}>
                        <InputLabel>List Name</InputLabel>
                        <Select name="listId" label="List Name" className="vertSpace" value={data.listId} onChange={e => handleInputState(e.target)}>
                            {lists && lists.map((list) => (
                                <MenuItem key={list._id} value={list._id}>{list.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: 180 }}>
                        <InputLabel>Task Name</InputLabel>
                        <Select name="taskId" label="Task Name" className="vertSpace" value={data.taskId} onChange={e => handleInputState(e.target)}>
                            {tasks && tasks.map((task) => (
                                <MenuItem key={task._id} value={task._id}>{task.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button style={{ marginLeft: "2rem" }} variant="contained" label="Sign Up" type="submit">Add to List</Button>
                </Stack>
            </form>
        </Box>
    )
}