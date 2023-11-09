import { Stack, IconButton } from "@mui/material"
import "../generalStyles.css"
import { SnackbarProvider } from 'notistack'
import { useEffect, useState } from "react"
import { gettasks, deletetask } from "../functions/taskFunctions"
import { createtask } from "../functions/taskFunctions";
import ScrollableTasks from "../components/ScrollableTasks"

export default function Tasks() {
    const user = JSON.parse(localStorage.getItem("user"))
    const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("tasks")) ?? []);

    const fetchTasks = async () => {
        const payload = { id: user._id };
        const res = await gettasks(payload);
        if (res !== false) {
            setTasks(res)
        }
        localStorage.setItem("tasks", JSON.stringify(res))
    };

    const handleDeleteTask = async (taskId) => {
        const originalTasks = [...tasks];
        const filterTasks = originalTasks.filter((task) => task._id !== taskId);
        setTasks(filterTasks);
        const res = await deletetask(taskId);
        !res && setTasks(originalTasks);
    };

    const handleCreateTask = async (payload) => {
        const res = await createtask(payload);
        if (res !== false){
            setTasks([...tasks, res]);
        }
    };

    useEffect(() => {
        fetchTasks()
    }, [])

    return (
        <>
            <Stack className="center vertSpace" direction="row">
                <ScrollableTasks tasks={tasks} setTasks={setTasks}/>
            </Stack>
            <SnackbarProvider />
        </>
    )
}
