import axios from "axios";


export const fetchSinToken = async(url:string = 'http://localhost:4000/api', method:string = 'GET') => {
    if(method === 'GET'){
        const response = await axios.get(url + '/categories');
        return response.data;
    }
}


export const fetchConToken = async(url: string, method:string = 'GET', token: string) => {

    if(method === 'GET'){
        const response = axios.get(url);
        return response;
    }

}






