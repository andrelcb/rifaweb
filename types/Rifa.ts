import { PremioType } from "./PremioType";
import { PromocaoType } from "./PromocaoType";

type imagensRifa = {
    id: number,
    imagem: string,
    ordem: number
}

export type Rifa = {
    id: number;
    nome: string;
    nome_criador: string;
    link_rifa: string;
    valor_numero: string;
    quantidade_numeros?: number;
    imagensRifas: Array<imagensRifa>;
    premios_rifa: Array<PremioType>
    promocao_rifa: Array<PromocaoType>
    descricao?: string;
    regulamento?: string;
    data_final_sorteio?: string;
    data_limite_pagamento?: string;
    categoria_rifa_idcategoria: number
}