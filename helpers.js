import { API_URL } from './Config';

export function fetchPublishableKey(response){
    fetch(`${API_URL}/config`, { method: 'GET' })
        .then( res => {
            if(res.ok) return res.json();
            return res.json().then(json => Promise.reject(json) );
        })
        .then( ({ key }) => {
            response(key);
        } )
        .catch( err => {
            console.log(err);
        })
}