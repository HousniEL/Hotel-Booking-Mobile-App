import { API_URL } from '../Config';

import { publicRoute } from './DefaultOptions';

import * as SecureStore from 'expo-secure-store';

export default class FavoriteService{
    
    async addFavorite(object, success, error){

        publicRoute['headers']['Authorization'] = `Bearer ${ await SecureStore.getItemAsync('token') }`;

        try{
            var response = await fetch(API_URL + '/v1/favorite/add',{
                ...publicRoute,
                method: 'POST',
                body: JSON.stringify(object)
            });

            var detail = await response.json();

            if( detail.message ) return error(detail);

            return success(detail);
        } catch (e) {
            return error(e);
        }

    }
    async deleteFavorite(object, success, error){

        publicRoute['headers']['Authorization'] = `Bearer ${ await SecureStore.getItemAsync('token') }`;

        try{
            var response = await fetch(API_URL + '/v1/favorite/delete',{
                ...publicRoute,
                method: 'DELETE',
                body: JSON.stringify(object)
            });

            var detail = await response.json();

            if( detail.message ) return error(detail);

            return success(detail);
        } catch (e) {
            return error(e);
        }

    }
    
    async listFavorites(object, success, error){

        publicRoute['headers']['Authorization'] = `Bearer ${ await SecureStore.getItemAsync('token') }`;

        try{
            var response = await fetch(API_URL + '/v1/favorite/all',{
                ...publicRoute,
                method: 'POST',
                body: JSON.stringify(object)
            });

            var detail = await response.json();

            if( detail.message ) return error(detail);

            return success(detail);
        } catch (e) {
            return error(e);
        }

    }

    async getFavoritePerPage(ids, success, error) {

        try{
            var response = await fetch(API_URL + '/v1/favorite/chunk',{
                ...publicRoute,
                method: 'POST',
                body: JSON.stringify(ids)
            });

            var detail = await response.json();
            if( detail.message ) return error(detail); 
            return success(detail);
        } catch(e) {
            return error(e);
        }

    }
    
    async checkFavorite(object, success, error){

        publicRoute['headers']['Authorization'] = `Bearer ${ await SecureStore.getItemAsync('token') }`;

        try{
            var response = await fetch(API_URL + '/v1/favorite/check',{
                ...publicRoute,
                method: 'POST',
                body: JSON.stringify(object)
            });
            var detail = await response.json();

            if( detail.message ) return error(detail);

            return success(detail);
        } catch (e) {
            return error(e);
        }

    }

}