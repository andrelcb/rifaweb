import Image from "next/image";
import Link from "next/link";
import { Rifa } from "../../types/Rifa";
import styles from './styles.module.css';

type Props = {
    rifa: Rifa,
    nomeBotao: string,
    link: string,
}

export const RifaItem = ({ rifa, nomeBotao, link }: Props) => {
    return (
        <Link href={link}>
            <div className={`card mt-4 relative cursor-pointer transition ease-in duration-75 hover:scale-105 shadow-md `}>
                {rifa.nome_criador && <p className="card-text">{rifa.nome_criador}Andre leonardo</p>}
                <img src={rifa.imagensRifas[0].imagem} className="card-img-top h-48 w-48 lg:h-60 lg:w-48" />
                <p className="absolute top-6 right-2 bg-green-500 px-3 py-1 text-sm font-semibold text-white tracking-wide rounded">R$ {rifa.valor_numero}</p>
                <div className="card-body">
                    <h3 className={`fs-2`}>{rifa.nome}</h3>
                    <div className="flex items-center mt-4">
                        <button type="button" className="botao botao-primario "><i className="bi bi-ticket-perforated iconRifa"></i> {nomeBotao}</button>
                    </div>
                </div>
            </div>
        </Link>
    );
}