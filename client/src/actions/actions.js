import {
GET_DOGS,
GET_DOG_BY_ID,
GET_TEMPERAMENT,
GET_DOGS_BY_NAME,
TOGGLE_LOADING,
} from './actionTypes';
import axios from 'axios';
import { DOG_URL, CREATE_DOG_URL, TEMPERAMENT_URL} from '../constants';

export const toggleLoading = () => {
    return {type: TOGGLE_LOADING, payload: true}
}

export const getDogs = (temp, origin, sort) => {
    return async (dispatch) => {
        const response = await axios.get(DOG_URL);
        const allDogs = response.data;

        return dispatch({
            type: GET_DOGS,
            payload: {
                allDogs,
                temp,
                origin,
                sort
            }
        })
    }
}

export const searchDogs = (name) => {
    return async (dispatch) => {
        const response = await axios.get(`${DOG_URL}?name=${name}`);
        const allDogs = response.data;

        return dispatch({
            type: GET_DOGS_BY_NAME,
            payload: allDogs
        })
    }
}

export const getDogById = (id) => {
    return async (dispatch) => {
        const response = await axios.get(`${DOG_URL}/${id}`);
        const dogById = response.data;
        let dog;
        if(!dogById.hasOwnProperty('ID')){
            dog = {
                    name: dogById.name,
                    temperament: dogById.temperament,
                    image: dogById.image.url,
                    height: dogById.height.metric,
                    weight: dogById.weight.metric,
                    lifeSpan: dogById.life_span
                }
            }
        return dispatch({
            type: GET_DOG_BY_ID,
            payload: dog
        })
    }
}

export const getTemperament = () => {
    return async (dispatch) => {
        const response = await axios.get(TEMPERAMENT_URL);
        const dogTemperament = response.data;
        return dispatch({
            type: GET_TEMPERAMENT,
            payload: dogTemperament
        })
    }
}