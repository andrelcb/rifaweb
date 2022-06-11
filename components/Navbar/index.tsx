import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import ImageLogo from '../../public/logo.png';
import styles from './Nabar.module.css';

export const Navbar = () => {
    const auth = useContext(AuthContext);
    const [loading, setLoading] = useState();

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
                                        <Link href={'/'}><a className='nav-link text-white'>Inicio</a></Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href={'/termo-de-uso'}><a className='nav-link text-white'>Termo de uso</a></Link>
                                    </li>
                                </ul>

                                <div className="d-flex mt-3 mt-lg-0" role="search">
                                    {!auth.usuario ? (
                                        <>
                                            <Link href={'/login'}>
                                                <a className="btn btn btn-outline-light me-2">Fazer Login</a>
                                            </Link>
                                            <Link href={'/cadastrar'}>
                                                <a className="btn btn-success"><i className="bi bi-person"></i>Criar Conta</a>
                                            </Link>
                                        </>
                                    ) : (
                                        <Link href={'/admin'}>
                                            <a className="btn btn btn-outline-light me-2">{auth.usuario.nome}</a>
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