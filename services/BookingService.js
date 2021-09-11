import { API_URL } from '../Config';

import { publicRoute } from './DefaultOptions';

import * as SecureStore from 'expo-secure-store';

export default class BookingService {
    
    async addBooking(bookingInfo, success, error) {

        publicRoute['headers']['Authorization'] = `Bearer ${ await SecureStore.getItemAsync('token') }`;

        var bookedInfo = {
            Hotel_ID : bookingInfo.Hotel_ID,
            User_ID : bookingInfo.User_ID,
            Date_From : bookingInfo.Date_From,
            Date_To : bookingInfo.Date_To,
            Status : 'In Progress',
            Room_Count : bookingInfo.table.length + 1
        }

        var response = await fetch(API_URL + '/v1/book',{
            ...publicRoute,
            method: 'POST',
            body: JSON.stringify(bookedInfo)
        });

        try{
            var detail = await response.json();
            success(detail);
        } catch(err) {
            error(err);
        }

    }

    async addRoomsBooked(BookingID, setOfRooms, success, error) {

        publicRoute['headers']['Authorization'] = `Bearer ${ await SecureStore.getItemAsync('token') }`;

        var thereIsAnError = false;

        for( let room of setOfRooms ){
            
            var bookedRoom = {
                Booking_ID : BookingID,
                Hotel_Room_Type_ID : room.id,
                Pers_count : room.totalPers
            }

            var response = await fetch(API_URL + '/v1/book/bookedRooms',{
                ...publicRoute,
                method: 'POST',
                body: JSON.stringify(bookedRoom)
            });
    
            try{
                await response.json();
            } catch(err) {
                thereIsAnError = true;
                break;
            }
        }

        if( !thereIsAnError ){
            success(' ');
        } else error('Something went wrong.');

    }
}