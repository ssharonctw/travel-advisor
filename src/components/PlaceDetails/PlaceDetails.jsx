import React from 'react';
import {Box, Typography, Button, Card, CardMedia, CardActions, Chip, CardContent} from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';

//the below {place} gets the props passing in
const PlaceDetails = ({place, selected, refProp}) =>{
    //console.log(place);
    const classes = useStyles();

    //if is selected, then call the reProp.current.scrollIntoView to scroll to the element
    if(selected) refProp?.current?.scrollIntoView({behavior: "smooth", block:"start"} )

    return(
        <Card elevation={6}>
            {/* elevation = 6 will give the cards some nice shadowing */}
            <CardMedia
                style = {{height: 350}} // defines the height of the image
                image = {place.photo? place.photo.images.large.url : 'https://groupdvcdn.azureedge.net/Content/Uploads/2016/02/restaurant.jpg'}
                title = {place.name}
                />
            <CardContent>
                {/* gutterBottom gives extra space at the bottom */}
                <Typography gutterBottom variant="h5">{place.name}</Typography>

                {/*  */}
                <Box display="flex" justifyContent="space-between">
                    <Rating size="small" value={Number(place.rating)} readOnly/>
                    <Typography gutterBottom variant="subtitle1">out of {place.num_reviews} reviews</Typography>
                </Box>

                {/* box below shows price level */}
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1">Price</Typography>
                    <Typography gutterBottom variant="subtitle1">{place.price_level}</Typography>
                </Box>

                {/* box below shows ranking */}
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1">Ranking</Typography>
                    <Typography gutterBottom variant="subtitle1">{place.ranking}</Typography>
                </Box>

                {/* the below creates a box dynamically depend on whether the place has awards */}
                {place?.awards?.map((award)=>(
                    <Box my={1} display="flex" justifyContent="space-between">
                        {/* my -> m = margin y = y_axis so my=1 gives a nice margin both top and bottom*/}
                        <img src={award.images.small} alt={award.display_name}/>
                        <Typography variant="subtitle2" color = "textSecondary">{award.display_name}</Typography>
                    </Box>
                ))}
                {/* below creates a chip (the grey bubbles) dynamically depend on whether the place has cuisine tags */}
                {place?.cuisine?.map(({name})=>(
                    <Chip key={name} size="small" label={name} className={classes.chip}></Chip>
                ))}
                {place?.address &&(
                    <Typography gutterBottom variant = "subtitle2" color="textSecondary" className = {classes.subtitle}>
                        <LocationOnIcon/>{place.address}
                    </Typography>
                )}
                {place?.phone &&(
                    <Typography gutterBottom variant = "subtitle2" color="textSecondary" className = {classes.spacing}>
                        <PhoneIcon/>{place.phone}
                    </Typography>
                )}
                <CardActions>
                    {/* the button below will navigate to the store's page. the _blank ensures page opens in a new browser*/}
                    <Button size="small" color="primary" onClick={()=>window.open(place.website, '_blank')}>
                        Website
                    </Button>
                    {/* the button below will navigate to the store's page. the _blank ensures page opens in a new browser*/}
                    <Button size="small" color="primary" onClick={()=>window.open(place.web_url, '_blank')}>
                        Trip Advisor
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );
}

export default PlaceDetails;