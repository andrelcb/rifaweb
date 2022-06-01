import Link from 'next/link';
import Router from 'next/router';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import styles from './styles.module.css';

const Login = () => {
    const auth = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    useEffect(() => {
        if(auth.usuario){
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
        if(email && senha) {
            const isLogged = await auth.login(email, senha);
            if(isLogged) {
                Router.push('/admin');
            } else {
                console.log('Senha ou usuario errado');
            }
        }
    }

    return (
        <main className={`${styles.login} ${styles.formSignin} w-100 m-auto text-center`}>
            <form>
                <img className="mb-4" src="/vercel.svg" alt="" width="200" />
                <h1 className="h3 mb-3 fw-normal">Login</h1>

                <div className={`${styles.formFloating} form-floating`}>
                    <input type="email" className="form-control"  id="email" onChange={handleEmail} placeholder="name@example.com" />
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
        </main>
    )
}

export default Login;