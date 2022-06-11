import Link from 'next/link';
import Router from 'next/router';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import styles from './styles.module.css';

const Login = () => {
    const auth = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    useEffect(() => {
        if (auth.usuario) {
            Router.push('/admin');
        }
    }, [auth])

    const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }
    const handleSenha = (event: ChangeEvent<HTMLInputElement>) => {
        setSenha(event.target.value);
    }

    const handleLogin = async () => {
        if (email && senha) {
            const isLogged = await auth.login(email, senha);
            if (isLogged) {
                Router.push('/admin');
            } else {
                toast.error("Senha ou usuario errado", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    }

    return (
        <main className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
            <ToastContainer />
            <div className="max-w-md w-full space-y-8">
                <div>
                    <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">

                    </p>
                </div>
                <form className='mt-8 space-y-6'>
                    <div className={`${styles.formFloating} form-floating `}>
                        <input type="email" className="form-control" id="email" onChange={handleEmail} placeholder="name@example.com" />
                        <label htmlFor="email">Endereço de e-mail</label>
                    </div>
                    <div className={`${styles.formFloating} form-floating`}>
                        <input type="password" className="form-control" onChange={handleSenha} id="senha" placeholder="Password" />
                        <label htmlFor="senha">Senha</label>
                    </div>

                    <div className="mb-3">
                        <label><Link href={'/recuperar-senha'}>Esqueçeu sua senha?</Link></label>
                    </div>
                    <a className="w-100 btn btn-lg btn-primary" onClick={handleLogin}>Entrar</a>
                    <p className="mt-5 mb-3 text-muted">Não possui uma conta Rifaweb? <Link href={'/cadastrar'}>Criar uma conta</Link> </p>
                </form>
            </div>
        </main>
    )
}

export default Login;