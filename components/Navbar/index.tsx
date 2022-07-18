import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import ImageLogo from '../../public/logo.png';
import styles from './Nabar.module.css';

export const Navbar = () => {
    const auth = useContext(AuthContext);
    return (
        <header className='p-3 bgPrimary navbar-expand-lg text-white'>
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="navbar navbar-expand-lg bgPrimary" aria-label="Offcanvas navbar large">
                    <div className="container-fluid">
                        <Link href={'/'}>
                            <a className="text-white navbar-brand"><img className='d-inline-block align-text-top' src='/logoTicket.png' width={30} height={30} /> Rifaweb</a>
                        </Link>
                        <button className="text-white navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar2" aria-controls="offcanvasNavbar2">
                            <i className="bi bi-text-paragraph"></i>
                        </button>

                        <div className="offcanvas offcanvas-end text-white bgPrimary" tabIndex={-1} id="offcanvasNavbar2" aria-labelledby="offcanvasNavbar2Label">
                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title" id="offcanvasNavbar2Label"><img className='d-inline-block align-text-top' src='/logoTicket.png' width={30} height={30} /> Rifaweb</h5>
                                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body">
                                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                    <li className="nav-item">
                                        <Link href={'/'}><a className='nav-link text-white hover:bg-blue-900 rounded mx-2'>Inicio</a></Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href={'/termos-de-uso'}><a className='nav-link text-white hover:bg-blue-900 rounded mx-2'>Termo de uso</a></Link>
                                    </li>
                                </ul>

                                <div className="d-flex mt-3 mt-lg-0" role="search">
                                    {!auth.usuario ? (
                                        <>
                                            <Link href={'/admin'}>
                                                <a className="botao bg-slate-50 hover:bg-slate-200 text-black"><i className="bi bi-person"></i>Criar minha rifa</a>
                                            </Link>
                                        </>
                                    ) : (
                                        <Link href={'/admin'}>
                                            <a className="botao bg-white text-black"><i className='bi bi-gear mr-2'></i>{auth.usuario.nome_usuario}</a>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );

}