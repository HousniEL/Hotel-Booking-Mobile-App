import React, { useState } from 'react';

//import { GOOGLE_API_KEY } from '@env';

//import { Dimensions } from 'react-native';

//import Geocoder from 'react-native-geocoding';

//Geocoder.init(GOOGLE_API_KEY);

import MapView, { Marker, ProviderPropType  } from 'react-native-maps';

function randomColor() {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, 0)}`;
}

//const width = Dimensions.get('window').width;
//const height = Dimensions.get('window').height;

export default function Map({ provider, address }) {

    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

    const [marker, setMarker] = useState({
        coordinate: { latitude: 37.78825, longitude: -122.4324 },
        color: randomColor()
    });


    function onRegionChange(region) {
        setRegion(region);
    }

    /*useEffect(() => {
        Geocoder.from(address)
            .then(json => {
                var location = json.results[0].geometry.location;
                setRegion({
                    latitude: location.lat,
                    longitude: location.lng,
                    latitudeDelta: 0.0922,
                    longitudeDelta: width/height,
                });
                setMarker({
                    coordinate: { latitude: location.lat, longitude: location.lng },
                    color: randomColor()
                })
            })
            .catch(error => console.warn(error));
    }, []);*/

    return (
        <>
        {
            region && marker && (

                <MapView
                    provider={provider}
                    style={{height: 200}}
                    region={region}
                    onRegionChange={onRegionChange}
                >
                    <Marker
                        coordinate={marker.coordinate}
                        pinColor={marker.color}
                    />
                </MapView>
            )
        }
        </>
    )
}


Map.prototype = {
    provide: ProviderPropType
}

/*
    <MapView
        provider={provider}
        style={{height: 200}}
        initialRegion={region}
    >
        <Marker
            coordinate={marker.coordinate}
            pinColor={marker.color}
        />
    </MapView>
*/