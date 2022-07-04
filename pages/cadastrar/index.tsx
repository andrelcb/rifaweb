import Link from 'next/link';
import Router from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { toast } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form';
import { Alerta } from '../../components/Alerta';
import NumberFormat from 'react-number-format';
import { useValidar } from '../../hooks/useValidar';

interface formData {
    nome: string,
    cpf: string,
    numeroCelular: string,
    email: string,
    senha: string,
    confirmarEmail: string,
    confirmarSenha: string
}

const Cadastrar = () => {
    const auth = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors }, control } = useForm<formData>();
    const [carregando, setCarregando] = useState<boolean>(false);
    const validar = useValidar();

    useEffect(() => {
        if (auth.usuario) {
            Router.push('/admin');
        }
    }, [auth])

    const handleCadastrar = async (data: Object) => {
        setCarregando(true);
        const resposta = await auth.cadastro(data)
        if (resposta.usuario) {
            setCarregando(false);
            Router.push('/admin');
        } else {
            setCarregando(false);
            toast.error(resposta.erro);
        }

    }

    return (
        <main className={'min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'}>
            <Alerta />
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
                                    {...register('nome', {
                                        required: "Esse campo é obrigatorio",
                                        pattern: {
                                            value: /[A-Z][a-z]* [A-Z][a-z]*/,
                                            message: "Digite o nome completo com as primeiras letras maisculas."
                                        }
                                    })}
                                    type="text"
                                    className={`form-control ${errors.nome && 'is-invalid'}`}
                                    id="nome"
                                    placeholder="name@example.com" />
                                <label htmlFor="nome">Nome completo</label>
                            </div>
                            {errors.nome ? <p className="text-red-600">{errors.nome.message}</p> : null}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className='form-floating mb-3'>
                                <Controller
                                    name="cpf"
                                    aria-label="cpf"
                                    control={control}
                                    rules={{
                                        required: 'Esse campo é obrigatório',
                                        minLength: {
                                            value: 14,
                                            message: "Digite o CPF corretamente."
                                        },
                                        validate: {
                                            validaCpf: (value) => validar.validaCpf(value)
                                        }
                                    }}
                                    render={({ field }) => <NumberFormat
                                        format="###.###.###-##"
                                        className={`form-control ${errors.cpf && 'is-invalid'}`}
                                        placeholder="insira seu cpf"
                                        {...field}
                                        aria-describedby="addon-wrapping" />}
                                />
                                <label htmlFor="cpf">CPF</label>
                                {errors.cpf && errors.cpf.type !== "validaCpf" && (<p className="text-red-600">{errors.cpf.message}</p>)}
                                {errors.cpf && errors.cpf.type === "validaCpf" ? <p className="text-red-600">O CPF não é válido</p> : null}
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className='form-floating mb-3'>
                                <Controller
                                    name="numeroCelular"
                                    aria-label="numeroCelular"
                                    control={control}
                                    rules={{
                                        required: 'Esse campo é obrigatório',
                                        minLength: {
                                            value: 14,
                                            message: "O numero do celular precisar ter no minimo 9 digitos"
                                        },
                                    }}
                                    render={({ field }) => <NumberFormat
                                        {...field}
                                        format="(##) #########"
                                        mask=""
                                        className={`form-control ${errors.numeroCelular && 'is-invalid'}`}
                                        placeholder="Digite o numero do seu celular com DDD"
                                        aria-describedby="addon-wrapping" />}
                                />
                                <label htmlFor="numeroCelular">Numero/Whatsapp</label>
                                {errors.numeroCelular ? <p className="text-red-600">{errors.numeroCelular.message}</p> : null}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className='form-floating mb-3'>
                                <input
                                    {...register('email', {
                                        required: 'Esse campo é obrigatório',
                                        pattern: {
                                            value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message: 'Digite um e-mail válido'
                                        }
                                    })}
                                    type="email"
                                    className={`form-control ${errors.email && 'is-invalid'}`}
                                    id="email"
                                    placeholder="name@example.com" />
                                <label htmlFor="email">Endereço de e-mail</label>
                                {errors.email ? <p className="text-red-600">{errors.email.message}</p> : null}

                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className='form-floating mb-3'>
                                <input
                                    {...register('confirmarEmail', {
                                        required: 'Esse campo é obrigatório',
                                        pattern: {
                                            value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message: 'Digite um e-mail válido'
                                        }
                                    })}
                                    type="email"
                                    className={`form-control ${errors.confirmarEmail && 'is-invalid'}`}
                                    id="confirmarEmail"
                                    placeholder="name@example.com" />
                                <label htmlFor="confirmarEmail">Confirmar e-mail</label>
                                {errors.confirmarEmail ? <p className="text-red-600">{errors.confirmarEmail.message}</p> : null}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className='form-floating'>
                                <input
                                    {...register('senha', {
                                        required: "Digite a senha para continuar.",
                                        minLength: {
                                            value: 6,
                                            message: "A senha precisa ter mais que 6 caracter"
                                        }
                                    })}
                                    type="password"
                                    className={`form-control ${errors.senha && 'is-invalid'}`}
                                    id="senha"
                                    placeholder="Senha" />
                                <label htmlFor="senha">Senha</label>
                                {errors.senha ? <p className="text-red-600">{errors.senha.message}</p> : null}
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className='form-floating'>
                                <input
                                    {...register('confirmarSenha', {
                                        required: "Confirme a senha para continuar.",
                                        minLength: {
                                            value: 6,
                                            message: "A senha precisa ter mais que 6 caracter"
                                        }
                                    })}
                                    type="password"
                                    className={`form-control ${errors.confirmarSenha && 'is-invalid'}`}
                                    id="confirmarSenha"
                                    placeholder="Senha" />
                                <label htmlFor="confirmarSenha">Confirmar senha</label>
                                {errors.confirmarSenha ? <p className="text-red-600">{errors.confirmarSenha.message}</p> : null}
                            </div>
                        </div>
                    </div>

                    <div className="checkbox mb-3 mt-2">
                        <label>
                            <input required type="checkbox" /> Eu li e concordo com os <Link href={'/termos-de-uso'}>termos de uso</Link>
                        </label>
                    </div>

                    <button disabled={carregando} className="w-100 botao botao-primario">
                        {carregando ? <div className="px-4 text-lg animate-spin bi bi-arrow-repeat"></div> : 'Cadastrar'}
                    </button>
                    <p className="mt-5 mb-3 text-muted">Possui uma conta Rifaweb?  <Link href={'/login'}>Entrar</Link> </p>
                </form>
            </div>
        </main>
    )
}

export default Cadastrar;