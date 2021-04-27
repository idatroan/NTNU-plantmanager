import * as actionTypes from '../constants/plantConstants';
import axios from 'axios';

const userInfo = JSON.parse(localStorage.getItem('userInfo'));

let token = undefined;

if (userInfo) {
    token = userInfo.token;
}

export const getPlants = () => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_PLANTS_REQUEST });

        const { data } = await axios.get('/plants');

        dispatch({ 
            type: actionTypes.GET_PLANTS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: actionTypes.GET_PLANTS_FAIL,
            payload: 
                error.response && error.response.data.message 
                    ? error.response.data.message 
                    : error.message,
        });
    }
};

export const getPlantDetails = (id) => async (dispatch) => {

    dispatch({ type: actionTypes.GET_PLANT_DETAILS_REQUEST });
    try {
        const { data } = await axios.get(`/plants/${id}`);

        dispatch({ 
            type: actionTypes.GET_PLANT_DETAILS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: actionTypes.GET_PLANT_DETAILS_FAIL,
            payload: 
                error.response && error.response.data.message 
                    ? error.response.data.message 
                    : error.message,
        });
    }
};

export const createPlant = (firstName, lastName, email, password) => async (dispatch) => {
    dispatch({
        type: actionTypes.PLANT_CREATE_REQUEST,
        payload: { email, password },
    })
    try {
        const { data } = await axios.post('/register', {
            firstName, 
            lastName, 
            email, 
            password,
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({
            type: actionTypes.PLANT_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: actionTypes.PLANT_CREATE_FAIL,
            payload:
                error.response && error.response.data.message 
                    ? error.response.data.message 
                    : error.message,
        });
    }
};

export const updateUser = (firstName, lastName, email, role, id) => async (dispatch) => {
    dispatch({
        type: actionTypes.USER_UPDATE_REQUEST
    })
    try {
        const { data } = await axios.put(`/users/${id}`, {
            firstName, 
            lastName, 
            email, 
            role, 
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({
            type: actionTypes.USER_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: actionTypes.USER_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message 
                    ? error.response.data.message 
                    : error.message,
        });
    }
};

export const userDelete = (id) => async (dispatch) => {
    dispatch({
        type: actionTypes.USER_DELETE_REQUEST, 
        payload: id
    })
    try {
        const { data } = await axios.delete(`/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({
            type: actionTypes.USER_DELETE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: actionTypes.USER_DELETE_FAIL,
            payload:
                error.response && error.response.data.message 
                    ? error.response.data.message 
                    : error.message,
        });
    }
};