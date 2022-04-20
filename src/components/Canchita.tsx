import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { IPlaces } from "../interfaces/interfaces";
import { getBookings } from "../services/places";
import { Layout } from "./share/Layout";

const Canchita: React.FC<{ place: IPlaces, setSelectedPlace: Function, isLogged: boolean }> = ({ place, setSelectedPlace, isLogged }) => {

    const [hours, sethours] = useState([
        {
            start: "08:00",
            end: "09:00",
            disponibility: [0, 0, 0, 0, 0, 0, 0]
        },
        {
            start: "09:00",
            end: "10:00",
            disponibility: [0, 0, 0, 0, 0, 0, 0]
        },
        {
            start: "10:00",
            end: "11:00",
            disponibility: [0, 0, 0, 0, 0, 0, 0]
        },
        {
            start: "11:00",
            end: "12:00",
            disponibility: [0, 0, 0, 0, 0, 0, 0]
        },
        {
            start: "12:00",
            end: "13:00",
            disponibility: [0, 0, 0, 0, 0, 0, 0]
        },
        {
            start: "13:00",
            end: "14:00",
            disponibility: [0, 0, 0, 0, 0, 0, 0]
        },
        {
            start: "14:00",
            end: "15:00",
            disponibility: [0, 0, 0, 0, 0, 0, 0]
        },
        {
            start: "15:00",
            end: "16:00",
            disponibility: [0, 0, 0, 0, 0, 0, 0]
        }
    ]);
    const [showAlert, setShowAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading) {
            const updateHour = (hourStart: number, day: number) => {
                if (hourStart === 4) {
                    hours[0].disponibility[day] = 1;
                    return sethours(hours => [...hours]);
                } else if (hourStart === 5) {
                    hours[1].disponibility[day] = 1;
                    return sethours(hours => [...hours]);
                } else if (hourStart === 6) {
                    hours[2].disponibility[day] = 1;
                    return sethours(hours => [...hours]);
                } else if (hourStart === 7) {
                    hours[3].disponibility[day] = 1;
                    return sethours(hours => [...hours]);
                } else if (hourStart === 8) {
                    hours[4].disponibility[day] = 1;
                    return sethours(hours => [...hours]);
                } else if (hourStart === 9) {
                    hours[5].disponibility[day] = 1;
                    return sethours(hours => [...hours]);
                } else if (hourStart === 10) {
                    hours[6].disponibility[day] = 1;
                    return sethours(hours => [...hours]);
                } else if (hourStart === 11) {
                    hours[7].disponibility[day] = 1;
                    return sethours(hours => [...hours]);
                }
            }
            const updateDisponibility = (hourStart: number, day: number) => {
                if (hourStart === 8) {
                    hours[0].disponibility[day] = 2;
                    return sethours(hours => [...hours]);
                } else if (hourStart === 9) {
                    hours[1].disponibility[day] = 2;
                    return sethours(hours => [...hours]);
                } else if (hourStart === 10) {
                    hours[2].disponibility[day] = 2;
                    return sethours(hours => [...hours]);
                } else if (hourStart === 11) {
                    hours[3].disponibility[day] = 2;
                    return sethours(hours => [...hours]);
                } else if (hourStart === 12) {
                    hours[4].disponibility[day] = 2;
                    return sethours(hours => [...hours]);
                } else if (hourStart === 13) {
                    hours[5].disponibility[day] = 2;
                    return sethours(hours => [...hours]);
                } else if (hourStart === 14) {
                    hours[6].disponibility[day] = 2;
                    return sethours(hours => [...hours]);
                } else if (hourStart === 15) {
                    hours[7].disponibility[day] = 2;
                    return sethours(hours => [...hours]);
                }
            }

            place.schedules?.forEach(schedule => {
                const hourStart = new Date(schedule.dtStart).getHours();
                if (schedule.day === "LUN") {
                    updateHour(hourStart, 0);
                } else if (schedule.day === "MAR") {
                    updateHour(hourStart, 1);
                } else if (schedule.day === "MIE") {
                    updateHour(hourStart, 2);
                } else if (schedule.day === "JUE") {
                    updateHour(hourStart, 3);
                } else if (schedule.day === "VIE") {
                    updateHour(hourStart, 4);
                } else if (schedule.day === "SAB") {
                    updateHour(hourStart, 5);
                } else if (schedule.day === "DOM") {
                    updateHour(hourStart, 6);
                }
            })
            getBookings(place.id).then((response: { day: string, dtStart: string }[]) => {
                response.forEach(booking => {
                    const day = new Date(booking.day).getDay()
                    const hStart = new Date(booking.dtStart).getHours();
                    updateDisponibility(hStart, day);
                })
            })
        }
        setLoading(true);
    }, [place, hours, loading])


    useEffect(() => {
        let image = document.getElementById("canchita-image")
        if (image) {
            image.style.height = "300px"
            image.style.backgroundImage = `url(${place.attachment.signedUrl})`
            image.style.backgroundRepeat = "no-repeat"
            image.style.backgroundSize = "cover"
            image.style.backgroundPosition = "center"
        }
        return
    }, [place])

    const handleReservePlace = (day: number, disponibility: number, hourStart: string) => {
        const nowDay = new Date().getDay();
        if (disponibility === 2 || disponibility === 0) return setShowAlert(true);
        if (nowDay <= day + 1) {
            if (disponibility === 1) {
                let hStart = new Date(`2022-02-02 ${hourStart}:00:00`);
                setSelectedPlace({ place: place, hourStart: hStart, day: day })
                return navigate(`/booking/${place.id}`)
            }
        } else {
            setShowAlert(true);
        }
    }

    const statusClass = (disp: number) => {
        if (disp === 0) return "disabled"
        else if (disp === 1) return "available"
        else return "booked"
    }

    const statusDescription = (disp: number) => {
        if (disp === 0) return ""
        else if (disp === 1) return "Disponible"
        else return "Reservado"
    }

    if (!isLogged) return <Navigate to="/login" />

    return (
        <Layout>
            <section className="canchita">
                <div className="u_wrapper">
                    <div className="canchita-image" id="canchita-image">

                    </div>
                    <div className="canchita-information">
                        <h1>{place.name}</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum voluptates assumenda, placeat soluta maiores molestiae, necessitatibus ullam odio odit beatae consequuntur nihil unde, dolorum possimus aperiam earum quae dolore. Magnam?</p>
                        <p>Direction: {place.direction}</p>
                    </div>
                    <div className="canchita-schedules">
                        <table>
                            <thead>
                                <tr>
                                    <th>Hours</th>
                                    <th>Monday</th>
                                    <th>Tuesday</th>
                                    <th>Wednesday</th>
                                    <th>Thursday</th>
                                    <th>Friday</th>
                                    <th>Saturday</th>
                                    <th>Sunday</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    hours.map((hour, index) => (
                                        <tr key={index}>
                                            <td>{hour.start} - {hour.end}</td>
                                            {
                                                hour.disponibility.map((disponibility, index) => <td key={index} onClick={() => handleReservePlace(index, disponibility, hour.start)} className={statusClass(hour.disponibility[index])}>{statusDescription(hour.disponibility[index])}</td>)
                                            }
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    {
                        showAlert && <div className="canchita-alert">
                            <span>No puedes elegir un horario reservado o no disponible</span>
                            <span className="canchita-alert-close" onClick={() => setShowAlert(false)}>&times;</span>
                        </div>
                    }
                </div>
            </section>
        </Layout>
    )
}

export { Canchita };