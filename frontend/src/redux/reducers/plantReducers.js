import * as actionTypes from '../constants/plantConstants';

export const getPlantsReducer = (state = { plants: [] }, action) => {
    switch(action.type) {
        case actionTypes.GET_PLANT_REQUEST:
            return {
                ...state,
                loading: true,
                users: []
            }
        case actionTypes.GET_PLANT_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload
            }
        case actionTypes.GET_PLANT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }   
};

export const getPlantDetailsReducer = (state = { plant: {} }, action) => {
    switch(action.type) {
        case actionTypes.GET_PLANT_DETAILS_REQUEST:
            return {
                ...state, loading: true,
            }
        case actionTypes.GET_PLANT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            }
        case actionTypes.GET_PLANT_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case actionTypes.GET_PLANT_DETAILS_RESET:
            return {
                ...state,
                user: {}
            }
        default:
            return state
    }
};

export const plantCreateReducer = (state = {}, action) => {
    switch(action.type) {
        case actionTypes.PLANT_CREATE_REQUEST:
            return { ...state, loading: true }
        case actionTypes.PLANT_CREATE_SUCCESS:
            return { ...state, loading: false, userInfo: action.payload, success: true }
        case actionTypes.PLANT_CREATE_FAIL:
            return { ...state, loading: false, error: action.payload }
        case actionTypes.PLANT_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const plantUpdateReducer = (state = {}, action) => {
    switch(action.type) {
        case actionTypes.PLANT_UPDATE_REQUEST:
            return { loading: true }
        case actionTypes.PLANT_UPDATE_SUCCESS:
            return { loading: false, userInfo: action.payload, success: true }
        case actionTypes.PLANT_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case actionTypes.PLANT_UPDATE_RESET:
            return {};
        default:
            return state
    }
}

export const plantDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case actionTypes.PLANT_DELETE_REQUEST:
            return { loading: true }
        case actionTypes.PLANT_DELETE_SUCCESS:
            return { loading: false, success: true }
        case actionTypes.PLANT_DELETE_FAIL:
            return { loading: false, error: action.payload }
        case actionTypes.PLANT_DELETE_RESET:
            return {};
        default:
            return state
    }
}