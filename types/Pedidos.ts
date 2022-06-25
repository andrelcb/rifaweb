export type Pedido = {
    nomeRifa: string,
    numeros: string,
    nomeCliente: string,
    numeroCelular: string,
    valorTotal: string,
    statusPedido: string,
    dataCadastro: string
}


export type Pedidos = {
    data: Array<Pedido>,
    current_page: number,
    per_page: number,
    total: number
}