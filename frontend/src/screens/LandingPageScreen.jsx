import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const [sort, setSort] = useState('watering');

    useEffect(() => {
        if (userInfo) {
            if ((JSON.parse(localStorage.getItem('notified')) === false) || !localStorage.getItem('notified')) {
                plants.forEach(plant => {
                    if ((plant.watering === 0) || (plant.watering < 0) || (plant.fertilizing === 0) || (plant.fertilizing < 0)) {
                        localStorage.setItem('notify', 'true')
                    }
                })
            }
            
            if (JSON.parse(localStorage.getItem('notify'))) {
                plants.forEach(plant => {
                    console.log(plant.watering)
                    if (plant.watering === 0) {
                        alert(`${plant.title} need watering today!`)
                        localStorage.setItem('notified', 'true')
                        localStorage.setItem('notify', 'false')
                    }
                    if (plant.watering < 0) {
                        alert(`Watering for ${plant.title} is overdue by ${plant.watering} days!`)
                        localStorage.setItem('notified', 'true')
                        localStorage.setItem('notify', 'false')
                    }
                    if(plant.fertilizing === 0) {
                        alert(`Fertilizing for ${plant.title} is overdue by ${plant.fertilizing} days!`)
                        localStorage.setItem('notified', 'true')
                        localStorage.setItem('notify', 'false')
                        
                    }
                    if(plant.fertilizing < 0) {
                        alert(`${plant.title} need fertilizing today!`)
                        localStorage.setItem('notified', 'true')
                        localStorage.setItem('notify', 'false')
                    }
                })
            }
        }
    }, [])

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