import Link from 'next/link';
import Router from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import styles from './styles.module.css';
import { useForm } from 'react-hook-form';

const Cadastrar = () => {
    const auth = useContext(AuthContext);
    const { register, handleSubmit } = useForm();
    const [erro, setErro] = useState('');

    useEffect(() => {
        if (auth.usuario) {
            Router.push('/admin');
        }
    }, [auth])

    const handleCadastrar = async (data: Object) => {
        const resposta = await auth.cadastro(data)
        if(resposta.usuario) {
            Router.push('/admin');
        } else {
            setErro(resposta.erro);
        }

    }

    return (
        <main className={`${styles.login} ${styles.formSignin} w-100 m-auto text-center`}>
            <form onSubmit={handleSubmit(handleCadastrar)}>
                <img className="mb-4" src="/vercel.svg" alt="" width="200" />
                <h1 className="h3 mb-3 fw-normal">Cadastrar</h1>
                <div className="alert-primary mb-2">{erro}</div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className='form-floating mb-3'>
                            <input
                                {...register('nome')}
                                type="text"
                                className="form-control"
                                id="nome"
                                placeholder="name@example.com" />
                            <label htmlFor="nome">Nome completo</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className='form-floating mb-3'>
                            <input
                                {...register('cpf')}
                                type="number"
                                className="form-control"
                                id="cpf"
                                placeholder="name@example.com" />
                            <label htmlFor="cpf">CPF</label>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className='form-floating mb-3'>
                            <input
                                {...register('numeroCelular')}
                                type="number"
                                className="form-control"
                                id="numeroCelular"
                                placeholder="name@example.com" />
                            <label htmlFor="numeroCelular">Numero/Whatsapp</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className='form-floating mb-3'>
                            <input
                                {...register('email')}
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="name@example.com" />
                            <label htmlFor="email">Endereço de e-mail</label>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className='form-floating mb-3'>
                            <input
                                {...register('confirmarEmail')}
                                type="email"
                                className="form-control"
                                id="confirmarEmail"
                                placeholder="name@example.com" />
                            <label htmlFor="confirmarEmail">Confirmar e-mail</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className='form-floating'>
                            <input
                                {...register('senha')}
                                type="password"
                                className="form-control"
                                id="senha"
                                placeholder="Senha" />
                            <label htmlFor="senha">Senha</label>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className='form-floating'>
                            <input
                                {...register('confirmarSenha')}
                                type="password"
                                className="form-control"
                                id="confirmarSenha"
                                placeholder="Senha" />
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

export default Cadastrar;