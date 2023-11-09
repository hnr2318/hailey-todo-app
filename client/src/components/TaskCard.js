import { IconButton, Button, Card, CardContent, Popover, CardHeader, TextField, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import "../generalStyles.css"
import { updateTask } from "../functions/taskFunctions";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function TaskCard(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        props.setOpenModal(false)
        setOpen(false);
    }
    const task = props.task
    const [updatedTask, setUpdatedTask] = useState(task)
    const [anchorEl, setAnchorEl] = useState(null);
    const popOpen = Boolean(anchorEl);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        handleOpen()
    }, [])

    useEffect(() => {
        setUpdatedTask(task)
    }, [task])

    function handleMarkComplete() {
        changeUpdateTask("status", 100)
        handleSubmit('complete')
    }

    function changeUpdateTask(name, value) {
        if (name === "priority" || name === "status") {
            value = parseInt(value, 10) || "";
        }
        setUpdatedTask({ ...updatedTask, [name]: value })
    }

    const handleSubmit = async (e) => {
        console.log(updatedTask)
        if (e !== 'complete') {
            e.preventDefault();
        }
        const payload = { id: task._id, task: updatedTask };
        const res = await updateTask(payload);
        props.setTask(updatedTask)
    };

    return (
        <>
            <Card style={{ width: "20rem", marginLeft: "2rem", height: "fit-content", backgroundColor: "rgba(25, 118, 210, 0.05)" }}>
                <CardHeader title={<TextField name="name" value={updatedTask.name} onChange={(e) => changeUpdateTask(e.target.name, e.target.value)} label="Name" variant="filled" />} action={<IconButton onClick={handleClose}><CloseIcon /></IconButton>} />
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Stack direction={"column"} style={{ width: "15rem" }} spacing="1.5rem">
                            <TextField name="desc" value={updatedTask.desc} onChange={(e) => changeUpdateTask(e.target.name, e.target.value)} label="Description" variant="outlined" />
                            <TextField name="dueDate" value={updatedTask.dueDate} onChange={(e) => changeUpdateTask(e.target.name, e.target.value)} label="Due Date" variant="outlined" type="date"/>
                            <TextField name="priority" value={parseInt(updatedTask.priority) || ""} onChange={(e) => changeUpdateTask(e.target.name, e.target.value)} label="Priority" variant="outlined" type="number" />
                            <TextField name="status" value={parseInt(updatedTask.status) || ""} onChange={(e) => changeUpdateTask(e.target.name, e.target.value)} label="Status (%)" variant="outlined" type="number" />
                        </Stack>
                        <Stack direction={"row"}>
                            <Button style={{ marginTop: "1rem" }} type="submit">Save</Button>
                            <Typography style={{ width: "15%" }}></Typography>
                            <Button style={{ marginTop: "1rem", color: "green" }}
                                onClick={handleMarkComplete}
                                onMouseEnter={handlePopoverOpen}
                                onMouseLeave={handlePopoverClose}
                                aria-owns={open ? 'mouse-over-popover' : undefined}
                                aria-haspopup="true">Mark Complete</Button>
                            <Popover
                                id="mouse-over-popover"
                                sx={{
                                    pointerEvents: 'none',
                                    opacity: 0.7
                                }}
                                open={popOpen}
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                onClose={handlePopoverClose}
                                disableRestoreFocus
                            >
                                <Typography sx={{ p: 1 }}>Click save after marking complete!</Typography>
                            </Popover>
                        </Stack>
                    </form>
                </CardContent>
            </Card>
        </>
    )
}