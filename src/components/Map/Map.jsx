import React from 'react';
import GoogleMapReact from 'google-map-react';
import{Paper, Typography, useMediaQuery} from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from'./styles';
import mapStyles from './mapStyles';


const Map = ({setCoordinates, setBounds, coordinates, places, setChildClicked}) =>{
    //calling the useStyles hook
    const classes = useStyles();
    //the isDesktop variable will be set to true when the width of the device is larger than 600px
    const isDesktop = useMediaQuery('(min-width: 600px)');
    //define an object that has the latitude and the longitude property
    //var coordinates = {lat: 0, lng: 0}; //no longer need this as we have coordinates passing in as prop



    return(
        <div className = {classes.mapContainer}>
            <GoogleMapReact
                //the below prop takes the api key from https://console.cloud.google.com/projectcreate
                //on the link, you can create the project on google cloud platform and get the api key
                bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
                defaultCenter = {coordinates}
                center = {coordinates}
                defaultZoom ={14}
                margin={[50, 50, 50, 50]}
                options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
                onChange={(e)=>{
                    //console.log(e);
                    setCoordinates({lat: e.center.lat, lng: e.center.lng});
                    setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw})
                }}
                //when a child is clicked, the child will get populated at App level
                onChildClick={(child)=>{setChildClicked(child)}}
            >
                {places?.map((place, i)=>(
                    <div
                        className = {classes.markerContainer}
                        lat={Number(place.latitude)} //cast the value to numbers since in json they are strings
                        lng={Number(place.longitude)}
                        key={i}
                    >    
                        {/* below code is to render different things depending on mobile or desktops */}
                        {/* ths isDesktop, as defined on the top using useMediaQuery, will return true if width is larger then 600 */}
                        {
                            !isDesktop?(
                                <LocationOnOutlinedIcon color="primary" fontSize="large"/>
                            ):(
                                //paper is vasically a divs with a background
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography className={classes.Typography} variant="subtitle2" gutterBottom>
                                        {place.name}
                                    </Typography>
                                    <img
                                    className = {classes.pointer}
                                    src={place.photo? place.photo.images.large.url : 'https://groupdvcdn.azureedge.net/Content/Uploads/2016/02/restaurant.jpg'}
                                    alt={place.name}
                                    />
                                    <Rating size="small" value={Number(place.rating)} readOnly/>
                                </Paper>
                            )
                        }
                    </div>
                ))}
                
            </GoogleMapReact>
        </div>
    );
}

export default Map;