import { Box, Typography, Button, TextField } from "@mui/material";
import TextInput from "../components/TextInput";
import { useState } from "react";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import RadioInput from "../components/Radio";
import "../generalStyles.css"
import { SnackbarProvider } from 'notistack'
import { signup } from "../functions/userFunctions";
import handleInputChange from "../functions/inputChange"

const genders = ["male", "female", "non-binary"];

export default function SignUp() {

    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        birthDate: "",
        gender: "",
    });
    const [errors, setErrors] = useState({});

    const handleInputState = (name, value) => {
        setData((data) => ({ ...data, [name]: value }));
    };

    const handleErrorState = (name, value) => {
        value === ""
            ? delete errors[name]
            : setErrors(() => ({ ...errors, [name]: value }));
    };

    const schema = {
        email: Joi.string().email({ tlds: false }).required().label("Email"),
        password: passwordComplexity().required().label("Password"),
        name: Joi.string().min(5).max(10).required().label("Name"),
    };
    const handleSignup = async (e) => {
        e.preventDefault();
        signup(errors, data);
    };

    function inputChange(e) {
        console.log("input change")
        handleInputChange(e.target, setData)
    }

    return (
        <Box className="center vertSpace">
            <SnackbarProvider />
            <form onSubmit={handleSignup}>
                <Typography variant="h4">Sign Up</Typography>
                {/* <TextInput
                    label="What's your email?"
                    placeholder="Enter your email"
                    name="email"
                    handleInputState={handleInputState}
                    schema={schema.email}
                    handleErrorState={handleErrorState}
                    value={data.email}
                    error={errors.email}
                    required={true}
                    size="small"
                /> */}
                <TextField
                    label="What's your email?"
                    placeholder="Enter your email"
                    name="email"
                    value={data.email}
                    onChange={inputChange}
                    required
                    size="small"
                />
                <TextInput
                    label="Create a password"
                    placeholder="Create a password"
                    name="password"
                    handleInputState={handleInputState}
                    schema={schema.password}
                    handleErrorState={handleErrorState}
                    value={data.password}
                    error={errors.password}
                    type="password"
                    required={true}
                    size="small"
                />
                <TextInput
                    label="What should we call you?"
                    placeholder="Enter a profile name"
                    name="name"
                    handleInputState={handleInputState}
                    schema={schema.name}
                    handleErrorState={handleErrorState}
                    value={data.name}
                    error={errors.name}
                    required={true}
                    size="small"
                />
                <TextInput
                    label="When's your birthday?"
                    placeholder="MM-DD-YYYY"
                    name="birthDate"
                    value={data.birthDate}
                    handleInputState={handleInputState}
                    required={true}
                    type="date"
                    size="small"
                />
                <RadioInput
                    label="What's your gender?"
                    name="gender"
                    handleInputState={handleInputState}
                    options={genders}
                    required={true}
                />
                <Button style={{ marginLeft: "2rem" }} variant="contained" label="Sign Up" type="submit">Sign Up</Button>
            </form>
        </Box>
    )
}