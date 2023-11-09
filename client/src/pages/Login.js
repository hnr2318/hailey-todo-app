import TextInput from "../components/TextInput";
import { useState } from "react";
import Joi from "joi";
import { Checkbox, Button, Typography, FormControlLabel, Box } from "@mui/material";
import { Link } from "react-router-dom";
import "../generalStyles.css"
import { login } from "../functions/userFunctions";
import { SnackbarProvider } from 'notistack'

export default function Login() {
    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});

    const handleInputState = (e) => {
        const name = e.name;
        const value = e.value;
        setData({...data, [name]: value})
    };

    const handleErrorState = (name, value) => {
        value === ""
            ? delete errors[name]
            : setErrors({ ...errors, [name]: value });
    };

    const schema = {
        email: Joi.string().email({ tlds: false }).required().label("Email"),
        password: Joi.string().required().label("Password"),
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(errors).length === 0) {
            login(data);
        } else {
            console.log("please fill out properly");
        }
    };

    return (
        <Box className="center vertSpace">
            <SnackbarProvider />
            <form onSubmit={handleSubmit}>
                <Typography variant="h4">Login</Typography>
                <TextInput
                    label="Enter your email"
                    placeholder="Enter your email"
                    name="email"
                    handleInputState={handleInputState}
                    schema={schema.email}
                    handleErrorState={handleErrorState}
                    value={data.email}
                    error={errors.email}
                    required={true}
                    size="medium" />

                <TextInput
                    label="Password"
                    placeholder="Password"
                    name="password"
                    handleInputState={handleInputState}
                    schema={schema.password}
                    handleErrorState={handleErrorState}
                    value={data.password}
                    error={errors.password}
                    type="password"
                    required={true}
                    size="medium" />
                <FormControlLabel style={{ marginLeft: "1rem" }} control={<Checkbox />} label="Remember Me" />
                <br></br>
                <Button id="loginButton" variant="contained" label="Sign Up" type="submit">Login</Button>
                <Link to="/signup" className="links" ><Typography variant="body1" style={{ marginLeft: "1rem" }}>Don't have an account?</Typography></Link>
            </form>
        </Box>
    )
}