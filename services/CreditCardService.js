import { API_URL } from '../Config';

import { publicRoute } from './DefaultOptions';

import * as SecureStore from 'expo-secure-store';

export default class CreditCardService {
    
    async addCreditCard(formData, success, error) {

        publicRoute['headers']['Authorization'] = `Bearer ${ await SecureStore.getItemAsync('token') }`;

        var response = await fetch(API_URL + '/v1/credit/add',{
            ...publicRoute,
            method: 'POST',
            body: JSON.stringify(formData)
        });

        try{
            var detail = await response.json();
            success(detail);
        } catch(err) {
            error(err);
        }

    }

    async getLessCreditCardInfo(userID, success, error) {

        publicRoute['headers']['Authorization'] = `Bearer ${ await SecureStore.getItemAsync('token') }`;

        try{
            var response = await fetch(API_URL + '/v1/credit/getLess',{
                ...publicRoute,
                method: 'POST',
                body: JSON.stringify(userID)
            });

            var detail = await response.json();
            success(detail);
        } catch(err) {
            error(err);
        }

    }
    
    async getAllCreditCardInfo(userID, success, error) {

        publicRoute['headers']['Authorization'] = `Bearer ${ await SecureStore.getItemAsync('token') }`;

        try{
            var response = await fetch(API_URL + '/v1/credit/getAll',{
                ...publicRoute,
                method: 'POST',
                body: JSON.stringify(userID)
            });
            var detail = await response.json();
            success(detail);
        } catch(err) {
            error(err);
        }

    }
    
    async deleteCreditCard(userID, success, error) {

        publicRoute['headers']['Authorization'] = `Bearer ${ await SecureStore.getItemAsync('token') }`;

        try{
            var response = await fetch(API_URL + '/v1/credit',{
                ...publicRoute,
                method: 'DELETE',
                body: JSON.stringify(userID)
            });

            var detail = await response.json();
            
            if(detail.message) return error(detail);

            if(detail.success) return success(detail);

        } catch(err) {
            error(err);
        }

    }
}