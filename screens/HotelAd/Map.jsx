import React, { useState, useEffect } from 'react';

import { StyleSheet, View, Dimensions } from 'react-native';

import Geocoder from 'react-native-geocoding';

Geocoder.init('AIzaSyDyluv3zU9P2-zYT3IUSPDmLFDA8Fj0t2g');

import MapView, { Marker, ProviderPropType  } from 'react-native-maps';

function randomColor() {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, 0)}`;
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function Map({ provider, address }) {

    const [region, setRegion] = useState();

    const [marker, setMarker] = useState();

    useEffect(() => {
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
    }, []);

    return (
        <>
        {
            region && marker && (

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
            )
        }
        </>
    )
}


Map.prototype = {
    provide: ProviderPropType
}