import axios from 'axios';
export default class APIHelper {
    
    static url = 'https://api.spacexdata.com/v4/launches/upcoming';

    static fetchUpcomingSpaceX(): Promise<any>{
        return axios.get(APIHelper.url)
    }
}