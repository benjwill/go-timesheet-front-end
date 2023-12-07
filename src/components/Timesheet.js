import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Timesheet = () => {
    const [timesheet, setTimesheet] = useState([]);

    useEffect(()=> {
        const headers = new Headers();
        headers.append("Content-Type", "application/json")

        const requestOptions = {
            method: "GET",
            headers: headers,
        }

        fetch(`http://localhost:8080/timesheets`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setTimesheet(data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    let goTimeToJsString = (t) => {
        let date = new Date(t.substring(0, 10));
        let hours = t.substring(11, 13);
        let minutes = t.substring(14, 16);

        date.setHours(hours);
        date.setMinutes(minutes);

        return {
            "date": date.toDateString(),
            "time": `${t.substring(11, 13)}:${t.substring(14, 16)}`,
            "jsDate": date,
        };
    }

    let timeSpent = (t1, t2) => {
        let d1 = goTimeToJsString(t1);
        let d2 = goTimeToJsString(t2);

        let difference = Math.abs(d1["jsDate"]-d2["jsDate"]) / 1000 / 60;
        return difference;
    }

    return(
        <>
        <div>
            <h2>Timesheet</h2>
            <hr/>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Total Time Spent (Minutes)</th>
                    </tr>
                </thead>
                <tbody>
                    {timesheet.map((m) => (
                        <tr key={m.id}>
                            <td>
                                <Link to={`/timesheet/${m.id}`}>
                                    {goTimeToJsString(m.date)["date"]}
                                </Link>
                            </td>
                            <td>{goTimeToJsString(m.start_time)["time"]}</td>
                            <td>{goTimeToJsString(m.end_time)["time"]}</td>
                            <td>{timeSpent(m.start_time, m.end_time)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    )
}

export default Timesheet;