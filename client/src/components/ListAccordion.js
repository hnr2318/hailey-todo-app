import { useState, useEffect } from 'react'
import axios from "axios";
import { Stack, Box, Typography, IconButton, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import "../generalStyles.css"
import TaskAccordion from './TaskAccordion';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { removeTaskFromList } from '../functions/listFunctions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ListAccordion({ id, name, desc }) {
	const token = JSON.parse(localStorage.getItem("token"));
	const [list, setList] = useState({});
	const [tasks, setTasks] = useState([]);
	const [model, setModel] = useState(false);

	const getListTasks = async (id) => {
		try {
			const url = "https://hailey-todo-app.onrender.com/api/lists/" + id;
			const { data } = await axios({
				method: 'get',
				url: url,
				headers: {
					"x-auth-token": token
				}
			})
			setList(data.data.list);
			setTasks(data.data.tasks);
		} catch (error) {
		}
	};

	const handleRemoveTask = async (taskId) => {
		const originalTasks = [...tasks];
		const payload = { listId: id, taskId: taskId };
		const filterTasks = originalTasks.filter((task) => task._id !== taskId);
		setTasks(filterTasks);
		const res = await removeTaskFromList(payload);
		!res && setTasks(originalTasks);
	};

	useEffect(() => {
		getListTasks(id);
	}, [id]);

	return (
		<Box className="center vertSpace horSpace" style={{ width: "25rem" }}>
			{/* <SnackbarProvider /> */}
			<Accordion style={{ width: "24rem" }}>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography className="labelText" variant="body1"><b style={{fontWeight: 500}}>{name}</b></Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography className="labelText" variant="body1">Description: {desc}</Typography><Typography variant="body1">{desc}</Typography>
					{tasks && tasks.map((task) => (
						<Stack direction="row" key={task._id}>
							<IconButton aria-label="delete" onClick={() => handleRemoveTask(task._id)}>
								<RemoveCircleIcon fontSize='small' />
							</IconButton>
							<TaskAccordion listId={list._id} name={task.name} desc={task.desc} priority={task.priority} dueDate={task.dueDate} />
						</Stack>
					))}
				</AccordionDetails>
			</Accordion>
		</Box>
	)
}