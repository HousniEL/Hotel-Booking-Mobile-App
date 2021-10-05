import { API_URL } from '../Config';

import { publicRoute } from './DefaultOptions';

import * as SecureStore from 'expo-secure-store';

export default class UserService{

    async SignUp(formData, success, error){

        try{
            var response = await fetch( API_URL + '/v1/users/register', {
                ...publicRoute,
                method: 'POST',
                body: JSON.stringify(formData)
            } );

            var content = await response.json();
            if(content.message){
                return error(content);
            }
            return success(content);
        } catch(e) {
            error(e);
        }

    }

    async LogIn(formData, success, error){

        try{
            var response = await fetch( API_URL + '/v1/users/login', {
                ...publicRoute,
                method: 'POST',
                body: JSON.stringify(formData)
            } );

            var content = await response.json();
            if(content.pwd || content.email){
                return error(content);
            }
            if(content.verifie){
                return success(content);
            }
            await SecureStore.setItemAsync('token', content.token);
            await SecureStore.setItemAsync('user', JSON.stringify(content.user));
            await SecureStore.setItemAsync('rated', JSON.stringify([]));
            return success(content.user);
        } catch(e) {
            return error(e);
        }

    }

    async LogOut(success, error){

        publicRoute['headers']['Authorization'] = `Bearer ${ await SecureStore.getItemAsync('token') }`;

        try{
            var response = await fetch( API_URL + '/v1/users/logout', {
                ...publicRoute,
                method: 'DELETE'
            } );

            var content = await response.json();
            if( content.message === "Log Out" ){
                await SecureStore.deleteItemAsync('token');
                await SecureStore.deleteItemAsync('user');
                await SecureStore.deleteItemAsync('rated');
                return success();
            }
            return error("Unauthorized");
        } catch(e) {
            return error(e);
        }
        
    }

    async codeVerification(object, success, error){
        try{
            var response = await fetch( API_URL + '/v1/users/verification', {
                ...publicRoute,
                method: 'POST',
                body: JSON.stringify(object)
            } );

            var content = await response.json();
            if(content.error){
                return success(content);
            }
            await SecureStore.setItemAsync('token', content.token);
            await SecureStore.setItemAsync('user', JSON.stringify(content.user));
            await SecureStore.setItemAsync('rated', JSON.stringify([]));
            return success(content.user);
        } catch(e) {
            return error(e);
        }

    }

}