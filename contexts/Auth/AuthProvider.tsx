import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { Usuario } from "../../types/Usuario";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const api = useApi();

    useEffect(() => {
        const validarToken = async () => {
            const storageToken = localStorage.getItem('rifaAuthToken');
            if (storageToken) {
                api.autorizaToken(storageToken);
                const resposta = await api.validarToken();
                if (resposta.usuario) {
                    setUsuario(resposta.usuario);
                }
            }
        }
        validarToken();
    }, []);


    const login = async (email: string, senha: string) => {
        const data = await api.login(email, senha);

        if (data.usuario && data.token) {
            setUsuario(data.usuario);
            setToken(data.token);
            api.autorizaToken(data.token);
            return true;
        }

        return false;
    }

    const cadastro = async (data: object) => {
        const resposta = await api.cadastro(data);

        if (resposta.usuario && resposta.token) {
            setUsuario(resposta.usuario);
            setToken(resposta.token);
            api.autorizaToken(resposta.token);
            return resposta;
        }
        return resposta;
    }

    const logout = async () => {
        await api.logout();
        setUsuario(null);
        setToken('');

    }

    const setToken = (token: string) => {
        localStorage.setItem('rifaAuthToken', token);
    }

    return (
        <AuthContext.Provider value={{ usuario, login, logout, cadastro }}>
            {children}
        </AuthContext.Provider>

    );
}