import {List, ListItem, ListItemText, IconButton} from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch';
import CircularProgressWithLabel from "../components/CircularProgress"

export default function ListofTasks({tasks, handleOpenModal, late}) {
    return (
        <>
            <List>
                {tasks.map((task) => {
                    var color = "primary"
                    if (task.status === 100) {
                        color = "success"
                    } else if (task.status < 50) {
                        color = "secondary"
                    }
                    return (
                        <ListItem key={task._id}>
                            <CircularProgressWithLabel color={color} value={task.status} late={late ? true : undefined}/>
                            <ListItemText primary={task.name} />
                            <IconButton onClick={() => handleOpenModal(task)}><LaunchIcon /></IconButton>
                        </ListItem>
                    )
                })}
            </List>
        </>
    )
}