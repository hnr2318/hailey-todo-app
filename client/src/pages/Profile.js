import Joi from "joi";
import { useState, useEffect } from "react";
import { updateUser } from "../functions/userFunctions";
import {Box, Typography, Button} from '@mui/material'
import { SnackbarProvider } from "notistack";
import TextInput from "../components/TextInput";
import RadioInput from "../components/Radio";


const genders = ["male", "female", "non-binary"];

export default function Profile(){
    const [data, setData] = useState({
        name: "",
        birthDate: "",
        gender: "",
    });
	const [errors, setErrors] = useState({});
    const user = JSON.parse(localStorage.getItem("user"));

    const handleInputState = (e) => {
        const name = e.name;
        const value = e.value;
        setData({...data, [name]: value})
    };

	const handleErrorState = (name, value) => {
		value === ""
			? delete errors[name]
			: setErrors(() => ({ ...errors, [name]: value }));
	};

	const schema = {
		name: Joi.string().min(5).max(10).required().label("Name"),
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const payload = { data, id: user._id };
		const res = await updateUser(payload);
		// res && history.push("/home");
	};

	useEffect(() => {
		if (user) {
			const dk = {
				name: user.name,
				birthDate: user.birthDate,
				gender: user.gender,
			};
			setData(dk);
		}
	}, []);

    return (
        <Box className="center vertSpace">
            <SnackbarProvider />
            <form onSubmit={handleSubmit}>
                <Typography variant="h4">Profile</Typography>
                <Typography variant="subtitle1" style={{fontStyle: "italic"}}>Update Your Information</Typography>
                <TextInput
                    label="What should we call you?"
                    placeholder="Enter a profile name"
                    name="name"
                    handleInputState={handleInputState}
                    schema={schema.name}
                    handleErrorState={handleErrorState}
                    error={errors.name}
                    required={true}
                    size="small"
                />
                <TextInput
                    label="When's your birthday?"
                    placeholder="MM-DD-YYYY"
                    name="birthDate"
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
                <Button style={{marginLeft: "2rem"}} variant="contained" label="Sign Up" type="submit">Update</Button>
            </form>
        </Box>
    )
}