import { PremioType } from "./PremioType";
import { PromocaoType } from "./PromocaoType";
import { Rifa } from "./Rifa";
import { Usuario } from "./Usuario";

type imagensRifa = {
    id: number,
    imagem: string,
    ordem: number
}

export type Rifas = {
    data: Array<Rifa>,
    current_page: number,
    per_page: number,
    total: number
}