import axios from "axios";
import { enqueueSnackbar } from 'notistack'

export const getlists = async (payload) => {
    const token = JSON.parse(localStorage.getItem("token"));
	try {
        const url = "http://localhost:8080/api/lists/user";
        const { data } = await axios({
            method: 'get',
            url: url,
            data: payload.id,
            headers: {
                "x-auth-token" : token
            }
        })
        // enqueueSnackbar(data.message, {variant: "success"});
		return data.data;
	} catch (error) {
        enqueueSnackbar(error, {variant: "error"});
		return false;
	}
};

export const getlistbyid = async (payload) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const id = payload.id
	try {
        const url = "http://localhost:8080/api/lists/" + id;
        const { data } = await axios({
            method: 'get',
            url: url,
            data: id,
            headers: {
                "x-auth-token" : token
            }
        })
        // enqueueSnackbar(data.message, {variant: "success"});
		return data.data;
	} catch (error) {
        console.log(error)
        // enqueueSnackbar(error, {variant: "error"});
		return false;
	}
};

export const deletelist = async (id) => {
    const token = JSON.parse(localStorage.getItem("token"));
	try {
        const url = "http://localhost:8080/api/lists/" +id;
        const { data } = await axios({
            method: 'delete',
            url: url,
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

export const createlist = async (payload) => {
    const token = JSON.parse(localStorage.getItem("token"));
	try {
        const url = "http://localhost:8080/api/lists";
        const { data } = await axios({
            method: 'post',
            url: url,
            data: payload.data,
            headers: {
                "x-auth-token" : token
            }
        })
        enqueueSnackbar(data.message, {variant: "success"});
		return data.data;
	} catch (error) {
        enqueueSnackbar(error.response.data.message, {variant: "error"});
		return false;
	}
};

export const removeTaskFromList = async (payload) => {
    const token = JSON.parse(localStorage.getItem("token"));
	try {
        const url = "http://localhost:8080/api/lists/remove-task";
        const { data } = await axios({
            method: 'put',
            url: url,
            data: payload,
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

export const addTaskToList = async (payload) => {
    const token = JSON.parse(localStorage.getItem("token"));
	try {
        const url = "http://localhost:8080/api/lists/add-task";
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
        console.log(error)
        enqueueSnackbar(error.response.data.message, {variant: "error"});
		return false;
	}
};