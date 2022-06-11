import styles from './styles.module.css';
import { navBar } from '../../utils/navbar'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthContext } from '../../contexts/Auth/AuthContext';
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
                <div className="align-items-center p-3">
                    <div className="row">
                        <div className="d-flex col-sm-12 ">
                            <img src="https://github.com/mdo.png" alt="" width="42" height="42" className="rounded-circle me-2" />
                            <span className="fs-4">{auth.usuario?.nome}</span>
                        </div>
                        <div className="col-sm-12 mt-3">
                            <span className="">SALDO DISPONÍVEL</span>
                        </div>
                        <div className="col-sm-12">
                            <span className="fs-2">R$ {auth.usuario?.saldo}</span>
                        </div>
                    </div>
                </div>
                <ul className="nav nav-pills flex-column mb-auto fs-5 mt-2">
                    {navBar.map((link, index) => (
                        <li key={index} className="p-1">
                            <Link href={link.path}>
                                <a className={
                                    `${[
                                        styles.navLink, link.path === router.pathname ? styles.navLinkActive : null
                                    ].join(" ")}`
                                } aria-current="page">
                                    <i className={`${link.icone} m-2`}></i> {link.nome}
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
                <hr />
                <div className="dropdown">
                    <a href="#" className="d-flex align-items-center link-light text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                        <strong>Andre</strong>
                    </a>
                    <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                        <li><Link href={'/admin/criar-rifa'}><a className="dropdown-item">Criar rifa</a></Link></li>
                        <li><a className="dropdown-item" href="#">Perfil</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><button className='dropdown-item' onClick={auth.logout}>Sair</button></li>
                    </ul>
                </div>
            </div>
        </>
    )
}