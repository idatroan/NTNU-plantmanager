import React, { Component } from 'react';
import './PlantList.css';
import { Link } from "react-router-dom"
import Button from "../Button/Button";
import axios from 'axios';
import Loading from '../loading/Loading';
import MessageBox from '../message-box/MessageBox';

class PlantList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }

    componentDidMount = async () => {
        this.setState({loading: true})
        const { data } = await axios.get('/plants')
        try {
            this.setState({plants: data})
            this.setState({loading: false})
        } catch (error) {
            this.setState({loading: false})
            this.setState({error: error})
        }
        const plantArray = this.state.plants;
        const plants = plantArray.map(plant => (
            <div className="plant">
                <div>{plant.name}</div>
                <div>{plant.type}</div>
                <Link to="#">Edit</Link>
                <Button value="Delete" variant="danger" size="small"/>
            </div>
        ))
        this.setState({plantList: plants})
    }

    render = () => {
        return (
            <div>
                {this.state.error && <MessageBox variant="danger">{this.state.error}</MessageBox>}
                <div className="component-container">
                    <h2>Plant's</h2>
                    {this.state.loading && <Loading/>}
                    {this.state.plantList}
                </div>
            </div>
        )
    }
}

export default PlantList;