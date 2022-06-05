import {createContext} from 'react';
import { Usuario } from '../../types/Usuario';

export type AuthContextType ={
    usuario: Usuario | null;
    login: (email: string, senha:string) => Promise<boolean>;
    logout: () => void;
    cadastro: (data:Object) => any;
}

export const AuthContext = createContext<AuthContextType>(null!);