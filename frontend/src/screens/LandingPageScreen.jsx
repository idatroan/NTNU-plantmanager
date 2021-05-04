import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

// Actions
import { getPlants as listPlants } from '../redux/actions/plantActions';

// Components
import Card from "../components/card/Card"
import PlantCard from "../components/plant-card/PlantCard";
import Loading from '../components/loading/Loading';

// Helpers
import { daysLeft } from '../helpers/countDays';

// const plants = [
//     {
//         _id: 1,
//         title: "Grønne leif",
//         subtitle: "Aloe vera",
//         watering: 5,
//         fertilizing: 46,
//     },
//     {
//         _id: 2,
//         title: "Gule guri",
//         subtitle: "Thymus",
//         watering: 8,
//         fertilizing: 12,
//     },
//     {
//         _id: 3,
//         title: "Lilla laila",
//         subtitle: "Celastrus",
//         watering: 12,
//         fertilizing: 1,
//     },
//     {
//         _id: 4,
//         title: "Blåe ola",
//         subtitle: "Lavandula",
//         watering: 1,
//         fertilizing: 59,
//     },
//     {
//         _id: 5,
//         title: "Røde øde",
//         subtitle: "Populus",
//         watering: -3,
//         fertilizing: 134,
//     },
//     {
//         _id: 6,
//         title: "Turkise lise",
//         subtitle: "Crocus",
//         watering: 12,
//         fertilizing: 40,
//     },
//     {
//         _id: 7,
//         title: "Hvite pelle",
//         subtitle: "Adonis",
//         watering: 0,
//         fertilizing: -4,
//     },
//     {
//         _id: 8,
//         title: "Oransje kari",
//         subtitle: "Betula",
//         watering: 3,
//         fertilizing: 0,
//     }
// ]

const LandingPageScreen = () => {

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const [sort, setSort] = useState('watering');

    // const getPlants = useSelector(state => state.getPlants);
    // const { plants, loading, error } = getPlants;

    // const dispatch = useDispatch;

    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')

    useEffect(async () => {
        // dispatch(listUsers());
        setLoading(true)
        const { data } = await axios.get('/plants')
        try {
            setPlants(data)
            setLoading(false)
        } catch (error) {
            setError(error)
            setLoading(false)
        }
    }, []);

    // const plantCards = plants.map(plant => {
    //     return <Card header={plant.title} subheader={plant.subtitle} watering={plant.watering} fertilizing={plant.fertilizing} _id={plant._id} user={userInfo}/>
    // })

    // if (userInfo) {
    //     if (userInfo.user.role === 'user') return;
    //     if ((JSON.parse(localStorage.getItem('notified')) === false) || !localStorage.getItem('notified')) {
    //         plants.forEach(plant => {
    //             if ((plant.watering === 0) || (plant.watering < 0) || (plant.fertilizing === 0) || (plant.fertilizing < 0)) {
    //                 localStorage.setItem('notify', 'true')
    //             }
    //         })
    //     }
        
    //     if (JSON.parse(localStorage.getItem('notify'))) {
    //         plants.forEach(plant => {
    //             console.log(plant.watering)
    //             if (plant.watering === 0) {
    //                 alert(`${plant.title} need watering today!`)
    //                 localStorage.setItem('notified', 'true')
    //                 localStorage.setItem('notify', 'false')
    //             }
    //             if (plant.watering < 0) {
    //                 alert(`Watering for ${plant.title} is overdue by ${plant.watering} days!`)
    //                 localStorage.setItem('notified', 'true')
    //                 localStorage.setItem('notify', 'false')
    //             }
    //             if(plant.fertilizing === 0) {
    //                 alert(`Fertilizing for ${plant.title} is overdue by ${plant.fertilizing} days!`)
    //                 localStorage.setItem('notified', 'true')
    //                 localStorage.setItem('notify', 'false')
                    
    //             }
    //             if(plant.fertilizing < 0) {
    //                 alert(`${plant.title} need fertilizing today!`)
    //                 localStorage.setItem('notified', 'true')
    //                 localStorage.setItem('notify', 'false')
    //             }
    //         })
    //     }
    // }

    // Sort by watering or fertilizing
    if (plants) {
        plants.sort((a, b) => {
            let aDaysLeftWater = daysLeft(a.lastWateredAtTime, a.waterFrequency)
            let bDaysLeftWater = daysLeft(b.lastWateredAtTime, b.waterFrequency)
            let aDaysLeftFertilizer = daysLeft(a.lastFertilizedAtTime, a.fertilizingFrequency)
            let bDaysLeftFertilizer = daysLeft(b.lastFertilizedAtTime, b.fertilizingFrequency)
            if (sort === 'watering') {
                if (aDaysLeftWater < bDaysLeftWater) return -1;
                if (aDaysLeftWater > bDaysLeftWater) return 1;
            } else if (sort === 'fertilizing') {
                if (aDaysLeftFertilizer < bDaysLeftFertilizer) return -1;
                if (aDaysLeftFertilizer > bDaysLeftFertilizer) return 1;
            }
            return 0;
        })
    }

    const plantCards = plants.map(plant => {
        return <Card key={plant._id} header={plant.name} subheader={plant.type} watering={daysLeft(plant.lastWateredAtTime, plant.waterFrequency)} fertilizing={daysLeft(plant.lastFertilizedAtTime, plant.fertilizingFrequency)} _id={plant._id}/>
    })


    return (
        <div>
            {error &&  'something went wrong'}
            <div className="cards">
                <form className="plant-sort">
                    <label htmlFor="plant-sort">Sort by</label>
                    <select name="plant-sort" id="plant-sort" value={sort} onChange={(e) => setSort(e.target.value)}>
                        <option value="watering">Watering</option>
                        <option value="fertilizing">Fertilizing</option>
                    </select>
                </form>
                <div className="card-container">
                    {loading && <Loading />}
                    {plantCards}
                </div>
            </div>
        </div>
    )

}

export default LandingPageScreen;