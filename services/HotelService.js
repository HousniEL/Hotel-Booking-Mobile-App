import { API_URL } from '../Config';

import Hotel_Room_Type from '../models/Hotel_Room_Type';

import { publicRoute } from './DefaultOptions';

export default class HotelService {

    async getLessDetailHotels(generalFilter, success, error) {

        var response = await fetch(API_URL + '/v1/hotels',{
            ...publicRoute,
            method: 'POST',
            body: generalFilter
        });

        try{
            var detail = await response.json();
            success(detail);
        } catch(err) {
            error(err);
        }

    }

    async getHotelById(id, success, error){

        var response = await fetch(API_URL + '/v1/hotels/' + id, {
            ...publicRoute,
            method: 'GET'
        });

        try{
            var object = await response.json();
            var rooms = [];
            for(let room of object.hotel_rooms_type){
                rooms.push(new Hotel_Room_Type(room));
            }
            success(object, rooms);
        } catch(e) {
            error(e);
        }

    }

}