import Link from 'next/link';
import Router from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
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
        if (resposta.usuario) {
            Router.push('/admin');
        } else {
            toast.error(resposta.erro, {
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

    return (
        <main className={'min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'}>
            <ToastContainer />
            <div className='max-w-md w-full space-y-8'>
                <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Bem vindo ao melhor site de rifas do brasil.
                </p>
                <form className='mt-8 space-y-6' onSubmit={handleSubmit(handleCadastrar)}>
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
            </div>
        </main>
    )
}

export default Cadastrar;