interface NumerosReserva {
    numero:number;
}

export type ReservaType = {
    id: number;
    nome: string;
    numero_celular: string;
    cpf:string;
    email:string;
    valor_total:string;
    status:string;
    numeros:Array<NumerosReserva>;
}