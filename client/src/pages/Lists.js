import { Stack} from "@mui/material"
import "../generalStyles.css"
import { getlists } from "../functions/listFunctions"
import { SnackbarProvider } from 'notistack'
import { useEffect, useState } from "react"
import AddTaskToList from "../components/AddTaskToList"
import ScrollableLists from "../components/ScrollableLists"

export default function Lists() {
    const user = JSON.parse(localStorage.getItem("user"))
    const [lists, setLists] = useState(() => JSON.parse(localStorage.getItem("lists")) ?? []);

    const fetchLists = async () => {
        const payload = { id: user._id };
        const res = await getlists(payload);
        if (res !== false) {
            setLists(res)
        }
        localStorage.setItem("lists", JSON.stringify(res))
    };

    useEffect(() => {
        fetchLists()
    }, [])

    return (
        <>
            <Stack className="center vertSpace" direction="row">
                {/* <AddTaskToList /> */}
                <ScrollableLists lists={lists} setLists={setLists}/>
            </Stack>
            <SnackbarProvider />
        </>
    )
}
