import React, { useState, useEffect } from 'react';

import {
    StyleSheet,
    TouchableHighlight,
    Image
} from 'react-native';

import { useFilter } from '../contexts/FilterContext';

const starsActive = [
    require('../../../assets/Images/Rating/1.png'),
    require('../../../assets/Images/Rating/2.png'),
    require('../../../assets/Images/Rating/3.png'),
    require('../../../assets/Images/Rating/4.png'),
    require('../../../assets/Images/Rating/5.png'),
]

const starsInactive = [
    require('../../../assets/Images/Rating/1-d.png'),
    require('../../../assets/Images/Rating/2-d.png'),
    require('../../../assets/Images/Rating/3-d.png'),
    require('../../../assets/Images/Rating/4-d.png'),
    require('../../../assets/Images/Rating/5-d.png'),
]

export default function Rating() {

    const { appliedFilter, AddFilter } = useFilter();

    const starsState = [
        true,
        true,
        true,
        true,
        true
    ]

    const [ratings, setRatings] = useState(starsState);

    useEffect(() => {

        const ff =  function() {
            if( appliedFilter.get('category')){
                let newStarsState = [false, false, false, false, false];
                var selectedCategories = appliedFilter.get('category').value;
                for(let i = 0; i < selectedCategories.length; i++){
                    newStarsState[selectedCategories[i] - 1] = true;
                }
                setRatings(newStarsState);
            }
            appliedFilter.delete('category');
        }

        ff();
    }, [])

    useEffect( () => {
        setFilter();
    }, [ratings])

    function setFilter(){
        selectedStars = [];
        for(let i = 1; i < ratings.length + 1; i++){
            if(ratings[i-1]){
                selectedStars.push(i);
            }
        }
        var object = { value : selectedStars };
        AddFilter('category', object);
    }

    function handleRating(star){
        var ratingsCopy = ratings.map( (value, idx) => {
            if(idx === star) return !value;
            return value;
        });
        setRatings(ratingsCopy);
    }

    return (
        <>
            {
                (ratings) && (
                ratings.map( (value, idx) => {
                    var url = (value === true) ? starsActive[idx] : starsInactive[idx];
                    return ( 
                        <TouchableHighlight
                            underlayColor={'#EEE'}
                            activeOpacity={0.8}
                            key={idx.toString()}
                            style={ value ? styles.touchableActive : styles.touchableInactive}
                            onPress={() => handleRating(idx)}
                        >
                        <Image 
                                style={{
                                    width: 35,
                                    height: 35
                                }}
                                source={url}
                            />
                        </TouchableHighlight>
                    )
                })
                )
            }
        </>
    )
}

const styles = StyleSheet.create({
    touchableActive: {
        borderColor: 'gold',
        borderWidth: 1,
        borderRadius: 5,
        padding: 2
    },
    touchableInactive: {
        borderColor: '#999',
        borderWidth: 1,
        borderRadius: 5,
        padding: 2
    }
})
