import "../generalStyles.css"
import { useParams } from "react-router-dom"
import { Box, Typography, Card, CardContent, Divider, Container } from "@mui/material"
import { gettaskbyid } from "../functions/taskFunctions"
import { useEffect, useState } from "react"
import { getlistbyid } from "../functions/listFunctions"
import TaskCard from "../components/TaskCard"
import ListofTasks from "../components/ListofTasks"

export default function SingleList() {
    let { id } = useParams();
    const [list, setList] = useState({})
    const [tasks, setTasks] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [modalTask, setModalTask] = useState({})

    const fetchList = async () => {
        const payload = { id: id };
        const res = await getlistbyid(payload);
        if (res !== false) {
            setList(res.list)
        }
    };

    const fetchTasksByIds = async () => {
        const taskIds = list.tasks
        const returnArr = []
        for (let i = 0; i < taskIds.length; i++) {
            const payload = { id: taskIds[i] };
            const res = await gettaskbyid(payload);
            if (res !== false) {
                returnArr.push(res)
            }
        }
        setTasks(returnArr)
    };

    useEffect(() => {
        const index = tasks.findIndex((task) => task._id === modalTask._id)
        const newTasks = [...tasks];
        newTasks[index] = modalTask
        setTasks(newTasks)
    }, [modalTask])

    useEffect(() => {
        setOpenModal(false)
        setModalTask({})
        fetchList();
    }, [id])


    useEffect(() => {
        if (list.tasks && list.tasks.length > 0) {
            fetchTasksByIds();
        } else {
            setTasks([])
        }
    }, [list])

    function handleOpenModal(task) {
        setOpenModal(true)
        setModalTask(task)
    }

    return (
        <Box className="center" style={{marginTop: "5rem"}}>
            {list ?
                <Card style={{ width: "30rem" }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
                            {list.name}
                        </Typography>
                        <Typography variant="h5" component="div">
                        </Typography>
                        <Typography variant="subtitle1">
                            {list.desc}
                        </Typography>
                        <Divider />
                        {tasks.length > 0 ?
                            <ListofTasks tasks={tasks} handleOpenModal={handleOpenModal} />
                            : <Container style={{marginTop: "2rem", width: "50%", textAlign: "center"}}><Typography variant="subtitle2">No Tasks</Typography></Container>}
                    </CardContent>
                </Card>
                : null}
            {openModal ? <TaskCard setOpenModal={setOpenModal} task={modalTask} setTask={setModalTask} /> : null}
        </Box>
    )
}