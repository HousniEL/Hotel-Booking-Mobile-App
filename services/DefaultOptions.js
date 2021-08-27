import * as SecureStore from 'expo-secure-store';


export const publicRoute = {
    headers: {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json',
    }
}

export const privateRoute = {
    headers: {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json',
        'Authorization' : `Bearer ${ SecureStore.getItemAsync('token') }`
    }
}