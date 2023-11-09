import { Box, Typography, Button, Dialog, IconButton } from "@mui/material";
import TextInput from "./TextInput";
import { useEffect, useState } from "react";
import Joi from "joi";
import "../generalStyles.css"
import { SnackbarProvider } from 'notistack'
import CloseIcon from '@mui/icons-material/Close';


export default function CreateTaskDialog({ openAdd, setOpenAdd, handleCreateTask }) {
    const user = JSON.parse(localStorage.getItem("user"))

    const [data, setData] = useState({
        name: "",
        user: user._id,
        desc: "",
        priority: 0,
        dueDate: ""
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
        name: Joi.string().required().label("Name"),
        desc: Joi.string().label("Description"),
        priority: Joi.number().label("Priority"),
        dueDate: Joi.date().label("Due Date"),
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { data, id: user._id };
        handleCreateTask(payload)
        setData({
            name: "",
            user: user._id,
            desc: "",
            priority: 0,
            dueDate: ""
        });
        setOpenAdd(false)
    };


    return (
        <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <Box className="center vertSpace horSpace" style={{ width: "20rem" }}>
        <IconButton
                    aria-label="close"
                    onClick={()=> setOpenAdd(false)}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            <SnackbarProvider />
            <form onSubmit={handleSubmit}>
                <Typography variant="h4">Create Task</Typography>
                <TextInput
                    label="Name"
                    placeholder="Task Name"
                    name="name"
                    value={data.name}
                    handleInputState={handleInputState}
                    schema={schema.name}
                    handleErrorState={handleErrorState}
                    error={errors.name}
                    required={true}
                    size="medium"
                    style={{ width: "15rem" }}
                />
                <TextInput
                    label="Description"
                    placeholder="Task Description"
                    name="desc"
                    value={data.desc}
                    handleInputState={handleInputState}
                    schema={schema.desc}
                    handleErrorState={handleErrorState}
                    error={errors.desc}
                    required={false}
                    size="medium"
                    style={{ width: "15rem" }}
                />
                <TextInput
                    label="Due Date"
                    placeholder="Task Due Date"
                    name="dueDate"
                    handleInputState={handleInputState}
                    schema={schema.dueDate}
                    handleErrorState={handleErrorState}
                    error={errors.dueDate}
                    required={false}
                    type="date"
                    size="medium"
                    style={{ width: "10rem" }}
                />
                <TextInput
                    label="Priority"
                    placeholder="Task Priority"
                    name="priority"
                    value={data.priority}
                    handleInputState={handleInputState}
                    schema={schema.priority}
                    handleErrorState={handleErrorState}
                    error={errors.priority}
                    required={false}
                    type="number"
                    size="medium"
                    style={{ width: "5rem" }}
                />
                <Button style={{ marginLeft: "2rem" }} variant="contained" label="Sign Up" type="submit">Create Task</Button>
            </form>
        </Box>
        </Dialog>
    )
}