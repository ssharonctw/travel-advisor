
//axios = a library that will help us make our calls
//axios method automatically set to get
import axios from 'axios';

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'


  


//async makes a function return a Promise 
//await makes javascript wait until the promsie settles and returns its 
export const getPlacesData = async(type, sw, ne) => {
    try {
        //if request is successful
        //here the const destructs the data twice
        //the {type} in the url will change depend on the passed in props "type", which might be restaurants, attractions or hotels
        const {data: {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,  {
    
            params: {
              bl_latitude: sw.lat,
              tr_latitude: ne.lat,
              bl_longitude: sw.lng,
              tr_longitude: ne.lng,
            },
        
            headers: {
              'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
              'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_TRAVEL_API_KEY_BACKUP
            }
          });

        return data;
    } catch (error) {
        //if not sucdessfull
        console.log(error)
    }
}
