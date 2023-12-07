import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TimeInstance = () => {
    const [time, setTime] = useState({});
    let { id } = useParams();

    useEffect(() => {
        let myTime = {
            id: 1,
            date: (new Date(2023, 9, 3)).toLocaleDateString(),
            start_time: new Date(2023, 9, 3, 10, 0),
            end_time: new Date(2023, 9, 3, 10, 30),
            description: "I worked on the website.",
        }
        myTime.duration = (myTime.end_time.getTime() - myTime.start_time.getTime()) / 1000 / 60;
        myTime.start_time = myTime.start_time.toTimeString();
        myTime.end_time = myTime.end_time.toTimeString();

        setTime(myTime);
    }, [id])
    
    return(
        <div>
            <h2>How Long I Was Programming on: {time.date}</h2>
            <p><em>Duration: {time.duration} minutes</em></p>
            <p>Start time: {time.start_time}</p>
            <p>End time: {time.end_time}</p>
            <p>{time.description}</p>
            <hr/>
        </div>
    )
}

export default TimeInstance;