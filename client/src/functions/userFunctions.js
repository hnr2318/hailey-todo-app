import axios from "axios";
import jwt_decode from "jwt-decode";
import { enqueueSnackbar } from 'notistack'

export const updateUser = async (payload) => {
    const token = JSON.parse(localStorage.getItem("token"));
	try {
		const url = `http://localhost:8080/api/users/${payload.id}`;
		const { data } = await axios({
            method: 'put',
            url: url,
            data: payload.data,
            headers: {
                "x-auth-token" : token
            }
        })
        enqueueSnackbar(data.message, {variant: "success"});
		return true;
	} catch (error) {
        enqueueSnackbar(error.response.data.message, {variant: "error"});
		return false;
	}
};

export const signup = async (errors, data) => {
    if (Object.keys(errors).length === 0) {
        try {
            const url = "http://localhost:8080/api/users";
            const response = await axios.post(url, data);
            enqueueSnackbar("Account created successfully", {variant: "success"})
            if(response.status === 200){
                setTimeout(() => {
                    window.location = "/login";
                }, 1000);
            }
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status < 500
            ) {
                enqueueSnackbar(error.response.data.message, {variant: "error"})
            } else {
                enqueueSnackbar("Something went wrong", {variant: "error"})
            }
        }
    } else {
        enqueueSnackbar("Please fill out properly", {variant: "warning"})
    }
}

export const login = async (payload) => {
    try {
        const url = "http://localhost:8080/api/login";
        const { data } = await axios.post(url, payload);
        const decodeData = jwt_decode(data.data);
        enqueueSnackbar(data.message, {variant: "success"});
        localStorage.setItem("user", JSON.stringify(decodeData))
        localStorage.setItem("token", JSON.stringify(data.data))
        setTimeout(() => {
            window.location = "/home";
        }, 1000);
        return true;
    } catch (error) {
        if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500
        ) {
            enqueueSnackbar(error.response.data.message, {variant: "error"});
        } else {
            enqueueSnackbar("Something went wrong", {variant: "error"});
        }
        return false;
    }
};