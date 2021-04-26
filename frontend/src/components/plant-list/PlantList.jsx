import './PlantList.css';
import { Link } from "react-router-dom"
import Button from "../button/Button";

const plants = [
    {
        title: "Grønne leif",
        subtitle: "Aloe vera",
        watering: 5,
        fertilizing: 46,
    },
    {
        title: "Gule guri",
        subtitle: "Thymus",
        watering: 8,
        fertilizing: 12,
    },
    {
        title: "Lilla laila",
        subtitle: "Celastrus",
        watering: 12,
        fertilizing: 1,
    },
    {
        title: "Blåe ola",
        subtitle: "Lavandula",
        watering: 1,
        fertilizing: 59,
    },
    {
        title: "Røde øde",
        subtitle: "Populus",
        watering: -3,
        fertilizing: 134,
    },
    {
        title: "Turkise lise",
        subtitle: "Crocus",
        watering: 12,
        fertilizing: 40,
    },
    {
        title: "Hvite pelle",
        subtitle: "Adonis",
        watering: 0,
        fertilizing: -4,
    },
    {
        title: "Oransje kari",
        subtitle: "Betula",
        watering: 3,
        fertilizing: 0,
    }
]

const PlantList = () => {
    return (
        <div>
            {/* {loadingDelete && <Loading/>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            {successDelete && <MessageBox variant="success">User deleted!</MessageBox>} */}
            <div className="component-container">
                <h2>Plant's</h2>
                {plants.map(plant => (
                    <div className="plant">
                        <div>{plant.title}</div>
                        <div>{plant.subtitle}</div>
                        <Link to="#">Edit</Link>
                        <Button value="Delete" variant="btn--danger--solid" size="btn--small"/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PlantList;