import { API_URL } from '../Config';

import { publicRoute } from './DefaultOptions';

import * as SecureStore from 'expo-secure-store';

export default class BookingService {
    
    async addBooking(bookingInfo, onlinePayment, totalAmount, success, error) {

        publicRoute['headers']['Authorization'] = `Bearer ${ await SecureStore.getItemAsync('token') }`;

        var bookedInfo = {
            Hotel_ID : bookingInfo.Hotel_ID,
            User_ID : bookingInfo.User_ID,
            Date_From : bookingInfo.Date_From,
            Date_To : bookingInfo.Date_To,
            Status : 'In Progress',
            Room_Count : bookingInfo.table.length + 1,
            Online_Payment : onlinePayment,
            Total_Amount : totalAmount
        }

        var response = await fetch(API_URL + '/v1/book/add',{
            ...publicRoute,
            method: 'POST',
            body: JSON.stringify(bookedInfo)
        });

        try{
            var idBooking = await response.json();
            success(idBooking);
        } catch(err) {
            error(err);
        }

    }

    async addRoomsBooked(BookingID, setOfRooms, success, error) {

        publicRoute['headers']['Authorization'] = `Bearer ${ await SecureStore.getItemAsync('token') }`;

        var bookedRoom = {
            Booking_ID : BookingID,
            rooms : setOfRooms
        }

        var response = await fetch(API_URL + '/v1/book/bookedRooms',{
            ...publicRoute,
            method: 'POST',
            body: JSON.stringify(bookedRoom)
        });

        try{
            await response.json();
            success(' ');
        } catch(err) {
            error(err);
        }

    }
}