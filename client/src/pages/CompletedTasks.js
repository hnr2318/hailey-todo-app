import { useState, useEffect } from "react"
import axios from "axios";

export default function CompletedTasks() {
    const [tasks, setTasks] = useState([]);

    const getCompletedTasks = async () => {
		try {
			const url = process.env.REACT_APP_API_URL + `/tasks/complete`;
			const { data } = await axios.get(url);
			setTasks(data.data);
		} catch (error) {
		}
	};

	useEffect(() => {
		getCompletedTasks();
	}, []);

    return (
        <>
            <p>List</p>
            <p>Completed Tasks</p>
            <p>By: User</p>
            <p>Name</p>
        </>
    )
}