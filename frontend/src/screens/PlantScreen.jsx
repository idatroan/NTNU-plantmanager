//import Plant from "../components/plant/Plant";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { getPlantDetails } from '../redux/actions/plantActions';

// Components
import Button from '../components/button/Button';
import Loading from '../components/loading/Loading';
import MessageBox from '../components/message-box/MessageBox';

// Styling
import './PlantScreen.css';


const PlantScreen = (props) => {

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [location, setLocation] = useState('');
    const [waterFrequency, setWaterFrequency] = useState('');
    const [fertilizingFrequency, setFertilizingFrequency] = useState('');
    const [light, setLight] = useState('');
    const [lastWateredBy, setLastWateredBy] = useState('');
    const [lastWateredAt, setLastWateredAt] = useState('');
    const [lastFertilizedAt, setLastFertilizedAt] = useState('');
    const [lastFertilizedBy, setLastFertilizedBy] = useState('');

    // Check if user is logged in and if they're a gardener or manager
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const managerOrGardener = userInfo.user.role === 'manager' || 'gardener';

    const dispatch = useDispatch();

    const plantDetails = useSelector(state => state.getPlantDetails);
    const { plant, loading, error } = plantDetails;
    console.log(plantDetails);

    //alt={this.state.altText}

    useEffect(() => {
        if (plant && props.match.params.id !== plant._id) {
            dispatch(getPlantDetails(props.match.params.id))
        }

        if (plant) {
            setName(plant.name);
            setType(plant.type);
            setLocation(plant.location);
            setWaterFrequency(plant.waterFrequency);
            setFertilizingFrequency(plant.fertilizingFrequency);
            setLight(plant.light);
            setLastWateredBy(plant.lastWateredByUserId);
            setLastWateredAt(plant.lastWateredAtTime);
            setLastFertilizedAt(plant.lastFertilizedAtTime);
            setLastFertilizedBy(plant.lastFertilizedByUserId);
        }

    }, [dispatch, props.match.params.id, plant, managerOrGardener]);


    return (
        <div className="component-container">
            {/*<Plant { ...props} /> */}

            <img className="card__image" src={process.env.PUBLIC_URL + '/assets/img/default-plant.jpg'} alt="" />
                {loading && <Loading />}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div className="plant-container">
                    <div>
                        <h2>Name</h2>
                        <p>{ name }</p>
                        <h2>Type</h2>
                        <p>{ type }</p>
                        <h2>Location</h2>
                        <p>{ location }</p>
                    </div>

                    <div>
                        <h2>Water</h2>
                        <p>Every { waterFrequency } days</p>
                        <h2>Fertilizer</h2>
                        <p>Every { fertilizingFrequency } days</p>
                        <h2>Light</h2>
                        <p>{ light }</p>
                    </div>

                    <div>
                        <h2>Last Watered</h2>
                        <p>{ !lastWateredBy ? 'Never' : 'By ' + lastWateredBy + ' at ' + lastWateredAt }</p>
                        <h2>Last Fertilized</h2>
                        <p>{ !lastFertilizedBy ? 'Never' : 'By ' + lastFertilizedBy + ' at ' + lastFertilizedAt }</p>
                    </div>
                </div>
                {managerOrGardener ? <Button type="submit" value="Water" variant="btn--primary--solid" size="btn-medium"/>
                : <Button type="submit" value="Request Water" variant="btn--primary--solid" size="btn-medium"/>
                }

        </div>
    )
}

export default PlantScreen;