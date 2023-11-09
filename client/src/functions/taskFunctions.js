import axios from "axios";
import { enqueueSnackbar } from 'notistack'

export const createtask = async (payload) => {
    const token = JSON.parse(localStorage.getItem("token"));
	try {
        const url = "https://hailey-todo-app.onrender.com/api/tasks";
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

export const gettaskbyid = async (payload) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const id = payload.id
	try {
        const url = "https://hailey-todo-app.onrender.com/api/tasks/" + id;
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

export const deletetask = async (id) => {
    const token = JSON.parse(localStorage.getItem("token"));
	try {
        const url = "https://hailey-todo-app.onrender.com/api/tasks/" +id;
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

export const updateTask = async (payload) => {
    const token = JSON.parse(localStorage.getItem("token"));
	try {
        const url = `https://hailey-todo-app.onrender.com/api/tasks/${payload.id}`;
        const { data } = await axios({
            method: 'put',
            url: url,
            data: payload.task,
            headers: {
                "x-auth-token" : token
            }
        })
        // enqueueSnackbar(data.message, {variant: "success"});
		return true;
	} catch (error) {
        console.log(error)
		return false;
	}
};

export const gettasks = async (payload) => {
    const token = JSON.parse(localStorage.getItem("token"));
	try {
        const url = "https://hailey-todo-app.onrender.com/api/tasks/user";
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
        enqueueSnackbar(error.response.data.message, {variant: "error"});
		return false;
	}
};