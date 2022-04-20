import { FormEvent, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { IPlaces } from "../interfaces/interfaces";
import { getPlaces } from "../services/places";
import { Layout } from "./share/Layout";


const Home: React.FC<{ setPlace: Function }> = ({ setPlace }) => {

    const [places, setPlaces] = useState<IPlaces[]>([]);
    const [filteredPlaces, setFilteredPlaces] = useState<IPlaces[]>([]);

    useEffect(() => {
        getPlaces().then(response => {
            setPlaces(response.places);
            setFilteredPlaces(response.places);
        })
    }, []);

    const filterPlaces = (e: FormEvent<HTMLInputElement>) => {
        const search = e.currentTarget.value;
        const filtered = places.filter(place => place.name.toLowerCase().includes(search.toLowerCase()));
        setFilteredPlaces(filtered);
    }

    return (
        <Layout>
            <section className="field">
                <div className="u_wrapper">
                    <div className="field-search">
                        <h1 className="field-title">Welcome to my website!</h1>
                        <div>
                            <i className="fa-solid fa-magnifying-glass"></i> <input type="text" placeholder="Buscar canchita" onChange={filterPlaces} />
                        </div>
                    </div>
                    <div className="field-information-cards">
                        {
                            filteredPlaces.map((item, index) => (
                                <Link to={`/canchita/${item.id}`} key={index} onClick={() => { setPlace(item) }}>
                                    <div className="field-information-card">
                                        <div className="field-information-card-image">
                                            <img src={item.attachment.signedUrl} alt="Place reference" loading="eager" />
                                            <div className="field-information-description">
                                                <h3>{item.name}</h3>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi eu aliquam consectetur, nisl nisi consectetur, nisi nisi.</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </section>
        </Layout >
    )
}

export { Home }