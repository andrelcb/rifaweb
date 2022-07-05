export type Usuario = {
    id: number;
    cpf: string;
    data_cadastro: Date;
    nome: string;
    nome_usuario: string;
    saldo: string;
    email: string;
    numero_celular: string;
    imagem_perfil: string;
    password?: string;
    biografia?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
    telegram?: string;
}