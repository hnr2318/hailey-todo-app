import { Box, Typography, Button, Dialog, IconButton } from "@mui/material";
import TextInput from "./TextInput";
import { useState } from "react";
import Joi from "joi";
import "../generalStyles.css"
import { SnackbarProvider } from 'notistack'
import CloseIcon from '@mui/icons-material/Close';

export default function CreateNoteDialog({ openAdd, setOpenAdd, handleCreateNote }) {
    const user = JSON.parse(localStorage.getItem("user"))
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    
    const [data, setData] = useState({
        desc: "",
        date: date,
        user: user._id,
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
        desc: Joi.string().required().label("Description"),
        date: Joi.date().required().label("Date"),
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { data, id: user._id };
        handleCreateNote(payload)
        setData({
            desc: "",
            date: date,
            user: user._id,
        });
        setOpenAdd()
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
                    <Typography variant="h4">Create Note</Typography>
                    <TextInput
                    label="Description"
                    placeholder="Note Description"
                    name="desc"
                    value={data.desc}
                    handleInputState={handleInputState}
                    schema={schema.desc}
                    handleErrorState={handleErrorState}
                    error={errors.desc}
                    required={true}
                    size="medium"
                    style={{ width: "15rem" }}
                />
                    <Button style={{ marginLeft: "2rem" }} variant="contained" label="Sign Up" type="submit">Create Note</Button>
                </form>
            </Box>
        </Dialog>
    )
}