import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API
})


export const useApi = () => ({
    autorizaToken: (token:string) => {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    validarToken: async () => {
        const resposta = await api.post('/auth/validar');
        return resposta.data;
    },

    login: async (email: string, senha: string) => {
        const resposta = await api.post('/auth/login', { email, senha });
        return resposta.data;
    },

    cadastro: async (data:object) => {
        const resposta = await api.post('/auth/cadastrar', data);
        return resposta.data
    },

    logout: async () => {
        const resposta = await api.post('/auth/logout');
        return resposta.data;
    },

    buscaRifas: async (paramentros:object) => {
        const resposta = await api.get('/rifa/buscar-rifas', { params: paramentros });
        return resposta.data;
    }
})