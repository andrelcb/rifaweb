export type Usuario = {
    cpf:string;
    data_cadastro:Date;
    id: number;
    nome: string;
    nome_usuario:string;
    saldo:string;
    email: string;
    imagem_perfil: string;
    password?: string;
}