import Link from 'next/link';
import styles from './styles.module.css';

const Login = () => {
    return (
        <main className={`${styles.login} ${styles.formSignin} w-100 m-auto text-center`}>
            <form>
                <img className="mb-4" src="/logo.svg" alt="" width="50"/>
                    <h1 className="h3 mb-3 fw-normal">Login</h1>

                    <div className={`${styles.formFloating} form-floating`}>
                        <input type="email" className="form-control" id="email" placeholder="name@example.com"/>
                        <label htmlFor="email">Endereço de e-mail</label>
                    </div>
                    <div className={`${styles.formFloating} form-floating`}>
                        <input type="password" className="form-control" id="senha" placeholder="Password"/>
                        <label htmlFor="senha">Senha</label>
                    </div>

                    <div className="mb-3">
                        <label><Link href={'/recuperar-senha'}>Esqueçeu sua senha?</Link></label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Entrar</button>
                    <p className="mt-5 mb-3 text-muted">Não possui uma conta Rifaweb? <Link href={'/cadastrar'}>Criar uma conta</Link> </p>
            </form>
        </main>
    )
}

export default Login;