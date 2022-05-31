import Link from 'next/link';
import styles from './styles.module.css';

const Login = () => {
    return (
        <main className={`${styles.login} ${styles.formSignin} w-100 m-auto text-center`}>
            <form>
                <img className="mb-4" src="/logo.svg" alt="" width="50" />
                <h1 className="h3 mb-3 fw-normal">Cadastrar</h1>
                <div className="row">
                    <div className="col-sm-12">
                        <div className='form-floating mb-3'>
                            <input type="email" className="form-control" id="nomeCompleto" placeholder="name@example.com" />
                            <label htmlFor="nomeCompleto">Nome completo</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className='form-floating mb-3'>
                            <input type="email" className="form-control" id="email" placeholder="name@example.com" />
                            <label htmlFor="email">Endereço de e-mail</label>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className='form-floating mb-3'>
                            <input type="email" className="form-control" id="email" placeholder="name@example.com" />
                            <label htmlFor="email">Confirmar e-mail</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className='form-floating'>
                            <input type="password" className="form-control" id="senha" placeholder="Password" />
                            <label htmlFor="senha">Senha</label>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className='form-floating'>
                            <input type="password" className="form-control" id="confirmarSenha" placeholder="Password" />
                            <label htmlFor="confirmarSenha">Confirmar senha</label>
                        </div>
                    </div>
                </div>

                <div className="checkbox mb-3 mt-2">
                    <label>
                        <input type="checkbox" /> Eu li e concordo com os <Link href={'/login'}>termos de uso</Link>
                    </label>
                </div>

                <button className="w-100 btn btn-lg btn-primary">Cadastrar</button>
                <p className="mt-5 mb-3 text-muted">Possui uma conta Rifaweb?  <Link href={'/login'}>Entrar</Link> </p>
            </form>
        </main>
    )
}

export default Login;