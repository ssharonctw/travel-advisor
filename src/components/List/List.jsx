import React, {useState, useEffect, createRef} from 'react';
//cirucularPorgress = material ui's loading bar
import {CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select} from '@material-ui/core';
import useStyles from './styles';
import PlaceDetails from '../PlaceDetails/PlaceDetails';

const List = ({places, childClicked, isLoading, type, setType, rating, setRating}) =>{
    const classes = useStyles();
    
    
    //create a state field that contains all the references
    //initialize with empty array as in the start there's no places. once we get the places we will set them to the state
    const [elRefs, setElRefs] = useState([]);
    
    //wrap the log message with {} so that when printing out, it seperates each item with {}
    //console.log({childClicked}); //this means the childinfo that was changed by map clickOnChild is passed successfully from App
    
    //using react createRef so that when a child is clicked, the list will navigate to the child clicked
    //the second parameter of useEffect means useEffect will be re-called everytime when "places" has changed
    useEffect(() => {
        setElRefs((refs) => Array(places.length).fill().map((_, i) => refs[i] || createRef()));
      }, [places]);

    //each place is an object with name property
    // const places = [
    //     {name: 'Cool Place'},
    //     {name: 'Best Beer'},
    //     {name: 'Best Steak'},     
    // ];

    return(
        <div className = {classes.container}>
            <Typography varient = "h4">
                Restaurants, Hotels & Attractions around you
            </Typography>
            {isLoading?(
                <div className={classes.loading}>
                    <CircularProgress size="5rem"/>
                </div>
            ):(
            <>
            <FormControl className={classes.formControl}>
                <InputLabel>Type</InputLabel>
                {/* the onChange below gives a callback function that has the event 'e' as the parameter*/}
                {/* e.target.value is where the value of the clicked element will be*/}
                {/* so when clicked on hotels, setType will be populated with 'hotels' */}
                <Select value={type} onChange={(e)=>setType(e.target.value)}>
                    <MenuItem value="restaurants">Restaurants</MenuItem>
                    <MenuItem value="hotels">Hotels</MenuItem>
                    <MenuItem value="attractions">Attractions</MenuItem>
                </Select>            
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel>Rating</InputLabel>
                {/* the onChange below gives a callback function that has the event 'e' as the parameter*/}
                {/* e.target.value is where the value of the clicked element will be*/}
                {/* so when clicked on hotels, setType will be populated with 'hotels' */}
                <Select value={rating} onChange={(e)=>setRating(e.target.value)}>
                    <MenuItem value={0}>All</MenuItem>
                    <MenuItem value={3}>Above 3.0</MenuItem>
                    <MenuItem value={4}>Above 4.0</MenuItem>
                    <MenuItem value={4.5}>Above 4.5</MenuItem>
                </Select>            
            </FormControl>
            <Grid container spacing={3} className ={classes.list}>
                {/* the block of code below places?.map() means only if you have places then .map() over them  */}
                {/* map takes a call back function. in each iteration of callback, it has one new place */}
                {/* the ()=>{returns a function} or ()=>(if instantly return a piece of JSX)  */}
                {places?.map((place, i)=>(
                    <Grid ref={elRefs[i]} key={i} item xs={12}>
                        {/*key ={i} is a bad practice if we need to delete item from a list*/}
                        {/* but in our case it's okay as we're not deleting any items */}
                        {/* the xs={12} means that from extra small device to big device it will take the full width of the list container */}
                        {/* the PlaceDetails is the custom component created in PlaceDetails.jsx, here we pass place as props */}
                        <PlaceDetails 
                            place={place}
                            //check if a restaurant is selected, also we have to convert the childClicked string to number
                            selected={Number(childClicked)===i}
                            //pass the elRef as prop
                            refProp = {elRefs[i]}
                        />
                    </Grid>   
                
                ))}
            </Grid>
            </>
            )}
        </div>
    );
}

export default List;