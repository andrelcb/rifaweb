import axios from "axios";
import { parseCookies } from 'nookies';

export function getAPIClient(context?: any) {
    const { 'rifaAuthToken': token } = parseCookies(context);

    const api = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API,
    })

    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    return api;
}