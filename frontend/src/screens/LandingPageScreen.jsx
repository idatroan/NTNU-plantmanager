import { useState } from "react";
import Card from "../components/card/Card"

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

const LandingPageScreen = () => {

    const [sort, setSort] = useState('watering');

    // Sort by role, first name or last name
    if (plants) {
        plants.sort((a, b) => {
            if (sort === 'watering') {
                if (a.watering < b.watering) return -1;
                if (a.watering > b.watering) return 1;
            } else if (sort === 'fertilizing') {
                if (a.fertilizing < b.fertilizing) return -1;
                if (a.fertilizing > b.fertilizing) return 1;
            }
            return 0;
        })
        }

    const plantCards = plants.map(plant => {
        return <Card header={plant.title} subheader={plant.subtitle} watering={plant.watering} fertilizing={plant.fertilizing}/>
    })

    return (
        <div>
            <div className="cards">
                <form className="plant-sort">
                    <label htmlFor="plant-sort">Sort by</label>
                    <select name="plant-sort" id="plant-sort" value={sort} onChange={(e) => setSort(e.target.value)}>
                        <option value="watering">Watering</option>
                        <option value="fertilizing">Fertilizing</option>
                    </select>
                </form>
                <div className="card-container">
                    {plantCards}
                </div>
            </div>
        </div>
    )

}

export default LandingPageScreen;