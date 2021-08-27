import { API_URL } from '../Config';

import { publicRoute, privateRoute } from './DefaultOptions';

import * as SecureStore from 'expo-secure-store';

export default class UserService{

    async SignUp(formData, success, error){

        var response = await fetch( API_URL + '/v1/users/register', {
            ...publicRoute,
            method: 'POST',
            body: JSON.stringify(formData)
        } );

        try{
            var content = await response.json();
            if(content.errors){
                return error(content.errors);
            }
            console.log(content);
            //await SecureStore.setItemAsync('token', content.token);
            return success(content.user);
        } catch(e) {
            error(e);
        }

    }

    async LogIn(formData, success, error){
        var response = await fetch( API_URL + '/v1/users/login', {
            ...publicRoute,
            method: 'POST',
            body: JSON.stringify(formData)
        } );

        try{
            var content = await response.json();
            if(content.errors){
                return error(content.errors);
            }
            await SecureStore.setItemAsync('token', content.token);
            return success(content.user);
        } catch(e) {
            return error(e);
        }

    }

    async LogOut(success, error){

        var response = await fetch( API_URL + '/v1/users/logout', {
            ...privateRoute,
            method: 'DELETE'
        } );

        try{
            var content = await response.json();
            if( content.message === "Log Out" ) return success();
            return error("Unauthorized");
        } catch(e) {
            return error(e);
        }
        
    }

}