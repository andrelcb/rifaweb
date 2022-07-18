import styles from './styles.module.css';
import { SideBarRota } from '../../../utils/SideBar'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthContext } from '../../../contexts/Auth/AuthContext';
import { useContext, useState } from 'react';
import path from 'path';

type Props = {
    exibeSideBar: boolean
}
export const SideBar = ({ exibeSideBar }: Props) => {
    const router = useRouter();
    const auth = useContext(AuthContext);
    const [exibeSaldo, setExibeSaldo] = useState<boolean>(false);
    const [subMenuOpen, setSubmenuOpen] = useState<boolean>(false);

    return (
        <>
            <div className={`h-screen flex-col bg-rifaweb-primario text-white ${exibeSideBar ? 'flex md:hidden w-screen' : 'hidden md:flex md:w-auto'} `}>
                <div className="flex p-4 flex-col justify-center">
                    <div className="flex">
                        <img src={auth.usuario?.imagem_perfil ? auth.usuario?.imagem_perfil : '/usuarioPadrao.png'} className="text-[#1759ff] h-12 w-12 shrink-0 object-cover rounded-full overflow-hidden me-2" />
                        <h4 className="text-2xl mt-2">{auth.usuario?.nome_usuario}</h4>
                    </div>
                    <div className="mt-3">
                        <span className="">SALDO DISPONÍVEL</span>
                    </div>
                    <div className="relative font-semibold flex">
                        <span className={`text-3xl rounded-md ${exibeSaldo ? 'text-white' : 'text-[#113dac] bg-[#113dac]'}`}>R$ {auth.usuario?.saldo}</span>
                        <span><i onClick={() => setExibeSaldo(!exibeSaldo)} className={`cursor-pointer text-2xl ml-2 ${exibeSaldo ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'}`}></i></span>
                    </div>
                </div>

                <ul className={`nav flex-col mb-auto text-lg mt-2 cursor-pointer`}>
                    {SideBarRota.map((menu, index) => (
                        <div key={index}>
                            <Link href={menu.path[0]}>
                                <li className={`flex py-3 mt-1 p-4 ${subMenuOpen && menu.submenu && 'bg-[#113dac]'} ${menu.path?.includes(router.pathname) ? 'bg-[#113dac]' : null}`} onClick={() => menu.submenu && setSubmenuOpen(!subMenuOpen)}>
                                    <a className={`text-slate-50 no-underline hover:text-gray-300 flex-1`}>
                                        <i className={`${menu.icone}`}></i> {menu.nome}
                                    </a>
                                    {menu.submenu &&
                                        <i className={`text-sm bi bi-caret-right ${subMenuOpen ? 'rotate-90 transition-all duration-200' : 'rotate-0 transition-all'}`}></i>
                                    }
                                </li>
                            </Link>
                            {
                                menu.submenu && subMenuOpen &&
                                <ul key={index} className='bg-[#113dac] transition-all duration-500'>
                                    {menu.submenu.map((subMenu, index) => (
                                        <Link key={index} href={subMenu.path[0]}>
                                            <li className='flex py-3 p-3' key={index}>
                                                <span className='text-slate-50 text-base no-underline hover:text-gray-300 flex-1'>
                                                    {subMenu.nome}
                                                </span>
                                            </li>
                                        </Link>
                                    ))}
                                </ul>
                            }
                        </div>


                    ))}

                    {/* //Perfil */}
                    <a href={`/${auth.usuario?.nome_usuario}`} target={'_blank'} className={`text-slate-50 no-underline hover:text-gray-300`}
                        aria-current="page">
                        <li className={`py-3 p-4`}>
                            <i className={`bi bi-person`}></i> Perfil
                        </li>
                    </a>

                    {/* //logout */}
                    <li className={`py-3 p-4`}>
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