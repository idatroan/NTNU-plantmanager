import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers as listUsers } from '../../redux/actions/userActions';


const PlantCard = (props) => {

    // const getUsers = useSelector(state => state.getUsers);
    // const { users, loading, error } = getUsers;

    // const dispatch = useDispatch;

    const [plants, setPlants] = useState([]);

    useEffect(async () => {
        // dispatch(listUsers());
       const { data } = await axios.get('/plants');
       setPlants(data)
    }, []);

    console.log(plants[0])

    return (
        <div>
        </div>
    )
}

export default PlantCard;