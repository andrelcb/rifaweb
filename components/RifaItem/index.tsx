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
            <div className={`card mt-4 relative flex flex-col cursor-pointer rounded-md transition ease-in duration-75 hover:scale-105 shadow-md `}>
                <Link href={`/${rifa.usuario?.nome_usuario}`}>
                    <div className="inline-flex items-center space-x-2 p-2 hover:text-rifaweb-primario ">
                        {!rifa.usuario?.imagem_perfil ?
                            <img className="h-12 w-12 shrink-0 object-cover rounded-full overflow-hidden bg-rifaweb-primario" src={'/usuarioPadrao.png'} alt="fotoPerfil" />
                            :
                            <img className="h-12 w-12 shrink-0 object-cover rounded-full overflow-hidden" src={rifa.usuario.imagem_perfil} alt="fotoPerfil" />

                        }
                        <p className="inline-flex">{rifa.usuario?.nome_usuario}</p>

                    </div>
                </Link>
                <img src={rifa.imagens_rifa[0].imagem} className="card-img-top object-cover h-60 w-48" />
                {rifa.status === 'Ativo' ?
                    <p className="absolute top-20 right-2 bg-green-500 px-3 py-1 text-lg font-mono text-white tracking-wide rounded">R$ {rifa.valor_numero}</p>
                    :
                    <p className="absolute top-20 right-2 bg-red-500 px-3 py-1 text-lg font-mono text-white tracking-wide rounded">RIFA FINALIZADA</p>
                }
                <div className="card-body flex-1 ">
                    <h3 className={`text-2xl`}>{rifa.nome}</h3>
                    <div className="flex items-center mt-4 ">
                        <button type="button" className={`botao ${rifa.status === 'Finalizado' ? 'bg-green-500' : 'botao-primario'}`}>
                            <i className="bi bi-ticket-perforated iconRifa mr-2"></i>
                            {rifa.status == 'Ativo' ? nomeBotao : 'Visualizar'}
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}