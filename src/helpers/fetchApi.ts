import axios, { AxiosError, AxiosResponse } from "axios";
import Swal from 'sweetalert2';

const baseUrl = process.env.REACT_APP_API_URL;

export const fetchSinToken = async (endPoint: string, data: any = {}, method: string = 'GET') => {
    const url = `${baseUrl}/${endPoint}`;
    if (method === 'GET') {
        const response = await axios.get(url).then((response: AxiosResponse) => response.data).catch((error: AxiosError) => Swal.fire('Error', error.message, 'error'));
        return response;

    } else if (method === 'POST') {
        const resp = await axios.post(url, data, {
            headers: {
                'Content-type': 'application/json'
            },
        }).then((response: AxiosResponse) => response.data).catch((error: AxiosError) => Swal.fire('Error', error.response?.data.msg, 'error'));
        return resp;
    }
}


export const fetchConToken = async (endPoint: string, data: any = {}, method: string = 'GET') => {
    const url = `${baseUrl}/${endPoint}`;
    const token = localStorage.getItem('token') || '';
    if (method === 'GET') {
        try {
            const response = await axios.get(url, {
                headers: {
                    'x-token': token
                }
            });
            return response.data;
        } catch (e) {
            return {
                ok: false
            }
        }
    } else if (method === 'POST') {
        try {
            const response = await axios.post(url, data, {
                headers: {
                    'Content-type': 'application/json',
                    'x-token': token
                }
            })
            return response.data;
        } catch (error) {
            return {
                ok: false
            }
        }
    } else if (method === 'PUT') {
        try {
            const response = await axios.put(url, data, {
                headers: {
                    'Content-type': 'application/json',
                    'x-token': token
                }
            })
            return response.data;
        } catch (error) {
            return {
                ok: false
            }
        }
    } else if (method === 'DELETE') {
        try {
            const response = await axios.delete(url, {
                headers: {
                    'Content-type': 'application/json',
                    'x-token': token
                }
            })
            return response.data;
        } catch (error) {
            return {
                ok: false,
            }
        }
    }

}






