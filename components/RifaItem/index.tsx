import Image from "next/image";
import Link from "next/link";
import { Rifa } from "../../types/Rifa";
import styles from './styles.module.css';

type Props = {
    dados: Rifa,
    nomeBotao: string,
    link: string,
}

export const RifaItem = ({ dados, nomeBotao, link }: Props) => {
    return (
        <Link href={link}>
            <div className={`mt-4 relative cursor-pointer transition ease-in-out hover:scale-110 card shadow-2xl shadow-blue-500`}>
                <img src={dados.imagensRifas} className="card-img-top h-60 w-48" />
                <p className="absolute top-0 -translate-y-1/2 bg-green-500 px-3 py-1 text-sm font-semibold text-white tracking-wide rounded-full">R$ {dados.valor_numero}</p>
                <div className="card-body">
                    <h3 className={`fs-2`}>{dados.nome}</h3>
                    {dados.nome_criador && <p className="card-text">Dono: {dados.nome_criador}</p>}
                    <div className="flex items-center">
                        <button type="button" className="botao bg-sky-400 hover:bg-sky-800 "><i className="bi bi-ticket-perforated iconRifa"></i> {nomeBotao}</button>
                    </div>
                </div>
            </div>
        </Link>
    );
}