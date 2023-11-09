import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Clock() {
    const [date, setDate] = useState(new Date());
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDate(new Date());
        }, 1000)

        return () => clearInterval(intervalId)
    }, [])

    const nthNumber = (number) => {
        if (number > 3 && number < 21) return "th";
        switch (number % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    };

    return (
        <>
            <Typography variant="h4" style={{ fontWeight: 100, marginTop: "1rem", fontSize: "1.7rem" }}>
                {month} {day}{nthNumber(day)}, {year}
            </Typography>
            <Typography variant="h4" style={{ fontWeight: 100, marginTop: "1rem", fontSize: "2rem" }}>
                {date.toLocaleTimeString()}
            </Typography>
        </>
    )

}