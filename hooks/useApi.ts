import { ParsedUrlQuery } from "querystring";
import { getAPIClient } from "./axios";

const api = getAPIClient();


export const useApi = () => ({
    autorizaToken: (token: string) => {
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

    cadastro: async (data: object) => {
        const resposta = await api.post('/auth/cadastrar', data);
        return resposta.data
    },
    atualizarUsuario: async (data: object) => {
        const resposta = await api.post('/usuario/atualizar-usuario', data, { headers: { 'Content-Type': 'multipart/form-data' } });
        return resposta.data
    },

    logout: async () => {
        const resposta = await api.post('/auth/logout');
        return resposta.data;
    },

    buscaRifas: async (paramentros: object) => {
        const resposta = await api.get('/rifa/buscar-rifas', { params: paramentros });
        return resposta.data;
    },
    buscaRifa: async (id: any) => {
        const resposta = await api.get(`/rifa/${id}`);
        return resposta.data;
    },

    buscaPremioRifa: async (id: number) => {
        const resposta = await api.get(`/rifa/${id}/buscar-premios-rifa`);
        return resposta.data;
    },
    buscaPromocaoRifa: async (id: number) => {
        const resposta = await api.get(`/rifa/${id}/buscar-promocao-rifa`);
        return resposta.data;
    },
    buscaNumerosReservados: async (id: number, paramentros: object) => {
        const resposta = await api.get(`/rifa/${id}/buscar-numeros-status`, { params: paramentros });
        return resposta.data;

    },
    reservarNumeros: async (data: object, id: number) => {
        const resposta = await api.post(`/rifa/${id}/reservar-numeros/`, data);
        return resposta.data;
    },
    buscaDadosReserva: async (id: string) => {
        const resposta = await api.get(`/reserva/${id}/buscar-dados-reserva`);
        return resposta.data;
    },
    buscarNumerosPedidoCelular: async (rifaId: number, data: object) => {
        const resposta = await api.get(`/buscar-numeros-pedido-celular/${rifaId}`, { params: data });
        return resposta.data;
    },
    buscaCategoriaRifa: async () => {
        const resposta = await api.get(`/buscar-categoria-rifa`);
        return resposta.data;

    },
    cadastrarRifa: async (data: object) => {
        const resposta = await api.post('/rifa/inserir-rifa', data, { headers: { 'Content-Type': 'multipart/form-data' } });
        return resposta.data
    },
    atualizarRifa: async (id: number, data: object) => {
        const resposta = await api.put(`/rifa/${id}/atualizar-rifa`, data);
        return resposta.data
    },
    adicionarImagem: async (id: number, data: object) => {
        const resposta = await api.post(`/rifa/${id}/adicionar-imagem-rifa`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
        return resposta.data
    },
    adicionarPremio: async (id: number, data: object) => {
        const resposta = await api.post(`/rifa/${id}/adicionar-premio-rifa`, data);
        return resposta.data
    },
    adicionarPromocao: async (id: number, data: object) => {
        const resposta = await api.post(`/rifa/${id}/adicionar-promocao-rifa`, data);
        return resposta.data
    },
    deletarImagem: async (id: number) => {
        const resposta = await api.delete(`/rifa/${id}/deletar-imagem`);
        return resposta.data
    },
    deletarPremio: async (id: number) => {
        const resposta = await api.delete(`/rifa/${id}/deletar-premio`);
        return resposta.data
    },
    deletarPromocao: async (id: number) => {
        const resposta = await api.delete(`/rifa/${id}/deletar-promocao`);
        return resposta.data
    },
    buscaPedidos: async (params: object) => {
        const resposta = await api.get(`/pedidos/`, { params: params });
        return resposta.data;
    },
    geraCobrancaPix: async (data: object) => {
        const resposta = await api.post(`/gerar-cobranca-pix`, data);
        return resposta.data;
    },
    geraQrCodePix: async (id: string) => {
        const resposta = await api.get(`/gera-qrcode-pix/${id}`);
        return resposta.data;
    },
})