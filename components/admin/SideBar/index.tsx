import styles from './styles.module.css';
import { SideBarRota } from '../../../utils/SideBar'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthContext } from '../../../contexts/Auth/AuthContext';
import { useContext, useState } from 'react';


type Props = {
    classSideBar: string;
}

export const SideBar = ({ classSideBar }: Props) => {
    const router = useRouter();
    const auth = useContext(AuthContext);

    return (
        <>
            <div className={`${styles.sideBar} ${classSideBar}`}>
                <div className="flex p-4 flex-col justify-center">
                    <div className="flex">
                        <img src={auth.usuario?.imagem_perfil ? auth.usuario?.imagem_perfil : '/usuarioPadrao.png'} className="text-[#1759ff] h-12 w-12 shrink-0 object-cover rounded-full overflow-hidden me-2" />
                        <h4 className="text-2xl mt-2 font-bold">{auth.usuario?.nome_usuario}</h4>
                    </div>
                    <div className="mt-3">
                        <span className="">SALDO DISPONÍVEL</span>
                    </div>
                    <div className="">
                        <span className="fs-2">R$ {auth.usuario?.saldo}</span>
                    </div>
                </div>

                <ul className={`nav flex-col mb-auto text-lg mt-2 cursor-pointer`}>
                    {SideBarRota.map((link, index) => (
                        <Link key={index} href={link.path[0]}>
                            <li className={`py-1.5 p-4 ${link.path.includes(router.pathname) ? 'bg-[#113dac]' : null}`}>
                                <a className={`text-slate-50 no-underline hover:text-gray-300`}
                                    aria-current="page">
                                    <i className={`${link.icone}`}></i> {link.nome}
                                </a>
                            </li>
                        </Link>
                    ))}
                    {/* //logout */}
                    <li className={`py-1.5 p-4`}>
                        <a className={`text-slate-50 no-underline hover:text-gray-300`}
                            aria-current="page" onClick={() => auth.logout()}>
                            <i className={`bi bi-box-arrow-left`}></i> Sair
                        </a>
                    </li>
                </ul>
                <hr />
                <div className='flex flex-row space-x-4 justify-center mb-3'>
                    <i className="text-2xl bi bi-instagram"></i>
                    <i className="text-2xl bi bi-twitter"></i>
                    <i className="text-2xl bi bi-whatsapp"></i>
                </div>
            </div>
        </>
    )
}