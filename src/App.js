import React, {useState, useEffect} from 'react';

import{CssBaseline, Grid} from '@material-ui/core';
//CssBaseline = a component from material UI that normalizes the style,  fixing padding, background colors...etc for us

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';


import { getPlacesData } from './api';

const App = () =>{
    //state: place   stateFunction: setPlaces
    //initial state of place at start our places can simply be an empty array
    const[places, setPlaces] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);

    //to make the get request dynamic so that it'll only call the right restaurants for a certain coord
    //bounds are for the topright and bottom left bounds for the map
    //initial value is simply an empty object for coords, and null for bounds
    //both set functions will be passed as props to the Map component
    const[coordinates, setCoordinates] = useState({});
    const[bounds, setBounds] = useState({});

    //this gets the child on map when the child is clicked
    //we declare it at App level since this child prop needs to be passed to multiple components
    const[childClicked,setChildClicked] = useState(null);

    //this state checks whether the page is still loading
    const[isLoading, setIsLoading] = useState(false);

    //a useState hook as demonstrated below: type = the state, setType = the function that changes state
    //the'restaurant' is the default value of the state
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');

    //this useEffect will only happen at the start to get the users coordinates at the start
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(({coords:{latitude, longitude}})=>{
            setCoordinates({lat: latitude, lng: longitude});
        })
    },[]);

    //this useEffect filters the places and keep only those matches the rating condition
    useEffect(() => {
        const filteredPlaces = places.filter((place)=>Number(place.rating)>= rating);;
        //will only return the places if its rating is larger than the selected
        setFilteredPlaces(filteredPlaces);
    }, [rating])

    //this useEffect happens when type, or  coordinates, or bounds have changed
    useEffect(()=>{
        if(bounds.sw && bounds.ne){
            setIsLoading(true);
            // console.log(coordinates, bounds);
            // pass in bounds coord to the getPlaceData function that will fetch restaurants around
            getPlacesData(type, bounds.sw, bounds.ne)
            .then((data)=>{
                console.log(data);
                setPlaces(data?.filter((place)=> place.name&& place.num_reviews>0)); //filter out dummy restaurants without a name and reviews
                setFilteredPlaces([]);//everytime that we get new places data, then reset filtered places
                setIsLoading(false);
                setRating('');
            })
        }
    }, [type, bounds]);

    
    

    return(
        <>
            <CssBaseline/>
            <Header setCoordinates={setCoordinates}/>
            <Grid container spacing={3} style ={{width: '100%'}}>
                {/*xs={12} means taking full width on mobile sizes,  md={4} means only taking 1/3 on medium sizes*/}
                <Grid item xs={12} md={4}>
                    <List 
                        // the below check if filteredPlaces array has something, otherwise pass the original places
                        places={filteredPlaces.length? filteredPlaces: places}
                        childClicked={childClicked}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map 
                    //passing the two set state functions for coordinates and bounds
                    setCoordinates = {setCoordinates} 
                    setBounds = {setBounds}
                    //coordinates itself is also needed in maps, so the state itself must also be passed
                    coordinates = {coordinates} 
                    //pass the fetched place data to maps as well
                    places={filteredPlaces.length? filteredPlaces: places}
                    setChildClicked={setChildClicked}
                    />
                </Grid>
            </Grid>
            
        </>
    );
}

export default App;