import Image from "next/image";
import Link from "next/link";
import { Rifa } from "../../../types/Rifa";
import styles from './styles.module.css';

type Props = {
    rifa: Rifa,
    nomeBotao: string,
    link: string,
    buscaPremiosRifa(): Promise<void>;
}

export const RifaCard = ({ rifa, nomeBotao, link, buscaPremiosRifa }: Props) => {
    return (

        <div className={`card mt-4 relative flex flex-col  rounded-md shadow-md `}>
            <img src={rifa.imagens_rifa[0].imagem} className="card-img-top object-cover h-60 w-48" />
            {rifa.status === 'Ativo' ?
                <p className="absolute top-5 right-2 bg-green-500 px-3 py-1 text-lg font-mono text-white tracking-wide rounded">R$ {rifa.valor_numero}</p>
                :
                <p className="absolute top-5 right-2 bg-red-500 px-3 py-1 text-lg font-mono text-white tracking-wide rounded">RIFA FINALIZADA</p>
            }
            <div className="card-body flex-1 ">
                <h3 className={`text-2xl`}>{rifa.nome}</h3>
                <div className="flex items-center mt-4 space-x-2 text-sm">
                    {rifa.status === 'Ativo' ?
                        <>
                            <Link href={link}>
                                <button type="button" className="botao botao-primario px-2"><i className="bi bi-ticket-perforated iconRifa"></i> {nomeBotao}</button>
                            </Link>
                            <a target={'_blank'} href={`/rifa/${rifa.link_rifa}`} className="botao bg-green-600 px-2"><i className="bi bi-eye mr-2"></i>Visualizar</a>
                            <button onClick={buscaPremiosRifa} className="botao bg-red-600 px-2">Finalizar Rifa</button>
                        </>
                        :
                        <>
                            <a target={'_blank'} href={`/rifa/${rifa.link_rifa}`} className="botao bg-green-600 "><i className="bi bi-eye mr-2"></i>Visualizar</a>
                        </>
                    }
                </div>
            </div>
        </div>

    );
}