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
            Rooms_Count : bookingInfo.table.length,
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
            const detail = await response.json();
            success(detail);
        } catch(err) {
            error(err);
        }

    }

    async sendEmail(object, success, error){
        publicRoute['headers']['Authorization'] = `Bearer ${ await SecureStore.getItemAsync('token') }`;

        var response = await fetch( API_URL + '/v1/book/status', {
            ...publicRoute,
            method : 'POST',
            body : JSON.stringify(object)
        } );

        try {
            var detail = await response.json();
    
            if( detail.success ) return success('Email send');
            return error(detail);
        } catch(e) {
            error(e.messsage);
        }


    }

    async getBookings(userID, success, error){
        publicRoute['headers']['Authorization'] = `Bearer ${await SecureStore.getItemAsync('token')}`;

        const response = await fetch(API_URL + '/v1/book/allReservations', {
            ...publicRoute,
            method: 'POST',
            body: JSON.stringify(userID)
        })

        try {
            const detail = await response.json();
            if( detail.message ){
                return error(detail.message);
            }
            return success(detail);
        } catch (e) {
            return error(e);
        }

    }
    
    async getBookingInfo(object, success, error){
        publicRoute['headers']['Authorization'] = `Bearer ${await SecureStore.getItemAsync('token')}`;

        const response = await fetch(API_URL + '/v1/book/allInfo', {
            ...publicRoute,
            method: 'POST',
            body: JSON.stringify(object)
        })

        try {
            const detail = await response.json();
            if( detail.message ){
                return error(detail.message);
            }
            return success(detail);
        } catch (e) {
            return error(e);
        }

    }

}