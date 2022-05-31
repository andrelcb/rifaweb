import Image from "next/image";
import Link from "next/link";
import { Rifa } from "../../types/Rifa";
import styles from './styles.module.css';

type Props = {
    dados: Rifa
}

export const RifaItem = ({ dados }: Props) => {
    return (
        <Link href={`/rifa/${dados.linkRifa}`}>
            <div className="col mt-5 mb-2">
                <div className={`${styles.cardRifa} card shadow-md`}>
                    <img src={dados.imagem} className="card-img-top" />
                    
                    <div className="card-body">
                        <p className={`${styles.tituloRifa} fs-2`}>{dados.nome}</p>
                        <p className="card-text">Dono: {dados.nomeCriador}</p>
                        <p className="card-text">Valor da rifa: {dados.valorNumero}</p>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                                <button type="button" className="btn btn-success"><i className="bi bi-ticket-perforated iconRifa"></i> Participar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}