import { Accordion, AccordionSummary, Box, AccordionDetails, Typography, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import ListofTasks from "./ListofTasks";
import TaskCard from "./TaskCard";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function UpcomingTasks() {
    const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("tasks")) ?? []);
    const [todaysTasks, setTodaysTasks] = useState([])
    const [weeksTasks, setWeeksTasks] = useState([])
    const [overdueTasks, setOverdueTasks] = useState([])
    const [modalTask, setModalTask] = useState({})

    const [openModal, setOpenModal] = useState(false);
    const [date, setDate] = useState(new Date());
    const dbDate = date.toISOString().split('T')[0]

    function handleOpenModal(task) {
        setOpenModal(true)
        setModalTask(task)
    }

    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    function sortTasksByDate() {
        const endOfWeek = addDays(date, 7)
        const thisWeek = []
        const overdue = []
        const today = []
        tasks.forEach(task => {
            var taskDate = new Date(task.dueDate)
            if (task.dueDate === dbDate && task.status < 100) {
                today.push(task)
            } else if (taskDate < date && task.status < 100) {
                overdue.push(task)
            } else if (taskDate < endOfWeek && task.status < 100) {
                thisWeek.push(task)
            }
            setTodaysTasks(today)
            setOverdueTasks(overdue)
            setWeeksTasks(thisWeek)
        });
    }

    useEffect(() => {
        const index = tasks.findIndex((task) => task._id === modalTask._id)
        const newTasks = [...tasks];
        newTasks[index] = modalTask
        localStorage.setItem("tasks", JSON.stringify(newTasks))
        setTasks(JSON.parse(localStorage.getItem("tasks")))
    }, [modalTask])

    useEffect(() => {
        sortTasksByDate()
    }, [tasks])

    useEffect(() => {
        setTodaysTasks([])
        setWeeksTasks([])
        setOverdueTasks([])
        setOpenModal(false)
        if (tasks.length > 0) {
            sortTasksByDate()
        }
    }, [])

    return (
        <Box style={{ width: "60%", marginTop: '3rem' }}>
            <Stack direction="row">
            <Box style={{ width: "50%" }}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography variant="h6">Today ({todaysTasks.length})</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ListofTasks tasks={todaysTasks} handleOpenModal={handleOpenModal} lfate={false} />
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography variant="h6">Overdue ({overdueTasks.length})</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ListofTasks tasks={overdueTasks} handleOpenModal={handleOpenModal} late={true} />
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography variant="h6">This Week ({weeksTasks.length})</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ListofTasks tasks={weeksTasks} handleOpenModal={handleOpenModal} late={false} />
                    </AccordionDetails>
                </Accordion>
                </Box>
                {openModal ? <TaskCard setOpenModal={setOpenModal} task={modalTask} setTask={setModalTask} /> : null}
            </Stack>
        </Box>
    )
}