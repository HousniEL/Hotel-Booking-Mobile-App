import { API_URL } from '../Config';

import Hotel_Room_Type from '../models/Hotel_Room_Type';

import { publicRoute } from './DefaultOptions';

import * as SecureStore from 'expo-secure-store';

export default class HotelService {

    async getLessDetailHotels(generalFilter, success, error) {

        try{
            var response = await fetch(API_URL + '/v1/hotels',{
                ...publicRoute,
                method: 'POST',
                body: JSON.stringify(generalFilter)
            });
            var detail = await response.json();
            if( detail.message ) return error(detail); 
            return success(detail);
        } catch(err) {
            return error(err);
        }

    }

    async getLessDetailHotelsPerPage(ids, success, error) {

        try{
            var response = await fetch(API_URL + '/v1/hotels/getsome',{
                ...publicRoute,
                method: 'POST',
                body: JSON.stringify(ids)
            });

            var detail = await response.json();
            if( detail.message ) return error(detail); 
            return success(detail);
        } catch(err) {
            return error(err);
        }

    }

    async getHotelById(id, success, error){

        try{
            var response = await fetch(API_URL + '/v1/hotels/' + id, {
                ...publicRoute,
                method: 'GET'
            });

            var object = await response.json();
            var rooms = [];
            for(let room of object.hotel_rooms_type){
                rooms.push(new Hotel_Room_Type(room));
            }
            return success(object, rooms);
        } catch(err) {
            return error(err);
        }

    }

    async rate(object, success, error){

        publicRoute['headers']['Authorization'] = `Bearer ${ await SecureStore.getItemAsync('token') }`;

        try{
            var response = await fetch(API_URL + '/v1/hotels/rate', {
                ...publicRoute,
                method: 'POST',
                body: JSON.stringify(object)
            });

            var detail = await response.json();
            return success(detail);
        } catch(err) {
            return error(err);
        }
    }

}