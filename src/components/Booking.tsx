import { useState } from 'react';
import { Navigate } from 'react-router-dom'
import { ISaveBooking, ISelectedPlace } from '../interfaces/interfaces';
import { saveBooking } from '../services/reserve';
import { Layout } from './share/Layout';

const Booking: React.FC<{ isLogged: boolean, selectedPlace: ISelectedPlace }> = ({ isLogged, selectedPlace }) => {

    const [showAlert, setShowAlert] = useState(0);

    const renderDay = (day: number): string => {
        if (day === 0) {
            return "Lunes";
        } else if (day === 1) {
            return "Martes";
        } else if (day === 2) {
            return "Miercoles";
        } else if (day === 3) {
            return "Jueves";
        } else if (day === 4) {
            return "Viernes";
        } else if (day === 5) {
            return "Sabado";
        } else if (day === 6) {
            return "Domingo";
        } else {
            return "";
        }
    }

    const sendBooking = () => {
        let fechaPlusOneHour = new Date(selectedPlace.hourStart);
        fechaPlusOneHour.setHours(fechaPlusOneHour.getHours() + 1);

        let daySelected = new Date();

        const aditionalDays = (selectedPlace.day + 1) - daySelected.getDay()

        daySelected.setDate(daySelected.getDate() + aditionalDays);

        let booking: ISaveBooking = {
            placeId: selectedPlace.place.id,
            day: daySelected.toISOString(),
            dtStart: new Date(selectedPlace.hourStart).toISOString(),
            dtEnd: fechaPlusOneHour.toISOString()
        }

        saveBooking(booking).then(response => {
            if (response.id) {
                setShowAlert(1);
            } else {
                setShowAlert(2);
            }
        })
    }

    if (!isLogged) return <Navigate to="/login" />

    return (
        <Layout>
            <section className="booking">
                <div className="u_wrapper">
                    <h1>Termina de reservar tu cancha</h1>
                    <p>Revisa los datos de tu reserva y confirma</p>
                    <table className='date-table'>
                        <tbody>
                            <tr>
                                <td>Nombre de la cancha</td>
                                <td>{selectedPlace.place.name}</td>
                            </tr>
                            <tr>
                                <td>Dirección</td>
                                <td>{selectedPlace.place.direction}</td>
                            </tr>
                            <tr>
                                <td>Día</td>
                                <td>{renderDay(selectedPlace.day)}</td>
                            </tr>
                            <tr>
                                <td>Hora de inicio</td>
                                <td>{"0" + new Date(selectedPlace.hourStart).getHours() + ":00 am"}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='flex-center-center'>
                        <button type='button' className='confirm-button' onClick={sendBooking} >Confirmar reserva</button>
                    </div>
                    {
                        showAlert !== 0 && <div className={["canchita-alert", showAlert === 1 && "success"].join(" ")}>
                            <span>{showAlert === 1 ? "Canchita reservada exitosamente" : "No se pudo reservar la canchita"}</span>
                            <span className="canchita-alert-close" onClick={() => setShowAlert(0)}>&times;</span>
                        </div>
                    }
                </div>
            </section>
        </Layout >
    )
}

export { Booking }; 