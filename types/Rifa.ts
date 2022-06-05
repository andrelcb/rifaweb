export type Rifa = {
    id: number;
    nome: string;
    nome_criador: string;
    link_rifa: string;
    valor_numero: string;
    quantidade_numeros?: number;
    imagensRifas: any;
    descricao?: string;
    regulamento?: string;
    data_final_sorteio?: string;
    data_limite_pagamento?: string;
}