import { Box, Typography, Button, Dialog, IconButton } from "@mui/material";
import TextInput from "./TextInput";
import { useState } from "react";
import Joi from "joi";
import "../generalStyles.css"
import { SnackbarProvider } from 'notistack'
import CloseIcon from '@mui/icons-material/Close';

export default function CreateListDialog({ openAdd, setOpenAdd, handleCreateList }) {
    const user = JSON.parse(localStorage.getItem("user"))
    const [data, setData] = useState({
        name: "",
        user: user._id,
        desc: "",
        tasks: [],
        img: ""
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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { data, id: user._id };
        handleCreateList(payload)
        setData({
            name: "",
            user: user._id,
            desc: "",
            tasks: [],
            img: ""
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
                    <Typography variant="h4">Create List</Typography>
                    <TextInput
                        label="Name"
                        placeholder="List Name"
                        name="name"
                        handleInputState={handleInputState}
                        schema={schema.name}
                        handleErrorState={handleErrorState}
                        value={data.name}
                        error={errors.name}
                        required={true}
                        size="medium"
                        style={{ width: "15rem" }}
                    />
                    <TextInput
                        label="Description"
                        placeholder="List Description"
                        name="desc"
                        handleInputState={handleInputState}
                        schema={schema.desc}
                        handleErrorState={handleErrorState}
                        value={data.desc}
                        error={errors.desc}
                        required={false}
                        size="medium"
                        style={{ width: "15rem" }}
                    />
                    <Button style={{ marginLeft: "2rem" }} variant="contained" label="Sign Up" type="submit">Create List</Button>
                </form>
            </Box>
        </Dialog>
    )
}