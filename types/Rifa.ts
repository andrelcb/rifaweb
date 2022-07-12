import { PremioType } from "./PremioType";
import { PromocaoType } from "./PromocaoType";
import { Usuario } from "./Usuario";

type imagensRifa = {
    id: number,
    imagem: string,
    ordem: number
}

export type Rifa = {
    id: number;
    nome: string;
    link_rifa: string;
    valor_numero: string;
    quantidade_numeros?: number;
    imagens_rifa: Array<imagensRifa>;
    premios_rifa: Array<PremioType>
    promocao_rifa: Array<PromocaoType>
    descricao?: string;
    regulamento?: string;
    data_final_sorteio?: string;
    data_limite_pagamento?: string;
    categoria_rifa_idcategoria: number;
    status: string;
    usuario: Usuario
}