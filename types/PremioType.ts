import { NumeroType } from "./NumeroType"
import { PedidoType } from "./Pedidos"

export type PremioType = {
    id: number,
    nome_premio: string,
    ordem: number,
    pedido?: PedidoType,
    numero?: NumeroType,
}