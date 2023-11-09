import { useEffect, useState } from "react";
import { gettaskbyid } from "../functions/taskFunctions";
import axios from "axios";
import { Typography, Box } from "@mui/material";

export default function ScrollableListItem({ taskId }) {
    const token = JSON.parse(localStorage.getItem("token"));
    const [task, setTask] = useState({})

    const gettask = async () => {
        const payload = { id: taskId };
        const res = await gettaskbyid(payload);
        if (res !== false) {
            setTask(res)
        }
    }

    useEffect(() => {
        gettask()
    }, [])

    return (
        <>
            {task &&
                <Box ><Typography>{task.name}</Typography></Box>
            }
        </>
    )
}