import { GetServerSideProps, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { ChangeEvent, useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import { Numeros } from "../../components/Numeros";
import { useApi } from "../../hooks/useApi";
import { NumeroType } from "../../types/NumeroType";
import { PremioType } from "../../types/PremioType";
import { PromocaoType } from "../../types/PromocaoType";
import { Rifa } from "../../types/Rifa";
import { Controller, useForm } from 'react-hook-form';
import { ToastContainer, toast } from "react-toastify";
import NumberFormat from "react-number-format";
import Link from "next/link";
import { useValidar } from "../../hooks/useValidar";
import { Rifas } from "../../types/RifaPaginate";
import { Alerta } from "../../components/Alerta";

type Props = {
    rifa: Rifa[];
    premioRifa: PremioType[];
    promocaoRifa: PromocaoType[];
    numerosReservados: Array<string>,
    numerosPagos: Array<string>
}

interface FormData {
    nomeCompleto: string,
    numeroCelular: string,
    email: string,
    cpf: string,
}

type Pedidos = {
    id: number,
    numeros: string,
    status: string
}

const RifaCompra = ({ rifa, premioRifa, promocaoRifa, numerosReservados, numerosPagos }: Props) => {

    const [numerosSelecionado, setNumerosSelecionado] = useState<Array<string>>([]);
    const [numerosItem, setNumerosItems] = useState<NumeroType[]>([]);
    const [precoNumero, setPrecoNumero] = useState<number>(0);
    const [disponivel, setDisponivel] = useState<number>(0);
    const [filtro, setFiltro] = useState<string>('Todos');
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showModalNumeros, setShowModalNumeros] = useState<boolean>(false);
    const [pedidos, setPedidos] = useState<Array<Pedidos>>();
    const [carregando, setCarregando] = useState<boolean>(false);
    const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>();
    const api = useApi();
    const route = useRouter();
    const validar = useValidar();
    const [pageYPosition, setPageYPosition] = useState(0);

    useEffect(() => {
        montaNumerosRifas();
        if (typeof window !== "undefined") {
            window.addEventListener('scroll', getPageYAfterScroll);
        }
    }, [])

    const getPageYAfterScroll = () => {
        setPageYPosition(window.scrollY);
    }
    const scrollTop = () => {
        window.scrollTo(0, 0);
    }

    const handleNumeros = async (index: number, numero: string) => {
        let numeroItemTemp = [...numerosItem];
        let numerosSelecionadoTemp = [...numerosSelecionado];

        if (numeroItemTemp[index].status == 'Disponivel') {

            numeroItemTemp[index].status = 'Selecionado'
            numerosSelecionadoTemp.push(numero);
            let preco = parseFloat(rifa[0].valor_numero);

            setPrecoNumero(precoNumero + preco);

            if (promocaoRifa.length) {
                promocaoRifa.forEach((promocao) => {
                    if (numerosSelecionadoTemp.length == promocao.quantidade_numero) {
                        preco = parseFloat(promocao.valor_promocao);
                        setPrecoNumero(preco);
                    }
                })
            }
            setNumerosSelecionado(numerosSelecionadoTemp);
        }
        else if (numeroItemTemp[index].status == 'Selecionado') {
            numeroItemTemp[index].status = 'Disponivel';
            var remover = numerosSelecionadoTemp.findIndex(x => x === numero);
            numerosSelecionadoTemp.splice(remover, 1)
            let preco = parseFloat(rifa[0].valor_numero);
            setPrecoNumero(precoNumero - preco);
            setNumerosSelecionado(numerosSelecionadoTemp);
        }

        setNumerosItems(numeroItemTemp);

    }

    const filtrarNumeros = (status: string) => {
        setFiltro(status);
    }

    const montaNumerosRifas = () => {
        let numerosItemTemp: NumeroType[] = [];
        const quantidadeNumeros = rifa[0].quantidade_numeros;
        let numeros: string = '';

        //verifica total de rifas dispooniveis
        if (quantidadeNumeros) {
            if (numerosReservados.length > 0) {
                setDisponivel(quantidadeNumeros - numerosReservados.length);
            } else if (numerosPagos.length > 0) {
                setDisponivel(quantidadeNumeros - numerosPagos.length);
            }

            if (numerosReservados.length > 0 && numerosPagos.length > 0) {
                setDisponivel(quantidadeNumeros - (numerosReservados.length + numerosPagos.length));
            }

            ////monta rifa com quatidades de numeros escolhido
            for (var index = 0; index < quantidadeNumeros; index++) {
                //verifica quantidade de numeros decimas para adicionar zero a esquerda
                if (quantidadeNumeros <= 100) {
                    numeros = addZeroes(index, 2);
                } else if (quantidadeNumeros <= 1000) {
                    numeros = addZeroes(index, 3);
                } else {
                    numeros = addZeroes(index, 4);
                }


                //verifica os numeros reservados da rifa
                if (numerosReservados.includes(numeros)) {
                    numerosItemTemp.push({
                        numero: numeros,
                        status: 'Reservado'
                    });

                    continue;
                }

                //verifica os numeros pagos da rifa
                if (numerosPagos.includes(numeros)) {
                    numerosItemTemp.push({
                        numero: numeros,
                        status: 'Pago'
                    });

                    continue;
                }
                numerosItemTemp.push({
                    numero: numeros,
                    status: 'Disponivel'
                });
            }
        }

        setNumerosItems(numerosItemTemp);
    }

    const reservarNumeros = async (data: FormData) => {
        const formData = new FormData();
        formData.append('nomeCompleto', data.nomeCompleto);
        formData.append('cpf', data.cpf);
        formData.append('numeroCelular', data.numeroCelular);
        formData.append('email', data.email);
        console.log(numerosSelecionado);
        for (let i = 0; i < numerosSelecionado.length; i++) {
            formData.append('numeros[]', numerosSelecionado[i]);
        }

        formData.append('valorTotal', precoNumero.toString());

        const id = rifa[0].id;
        setCarregando(true);
        const retorno = await api.reservarNumeros(formData, id)
        if (retorno.idRifa) {
            setCarregando(false);
            route.push(`/reserva/${retorno.idRifa}`);
        } else {
            setCarregando(false);
            toast.error(retorno.erro, {
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

    const addZeroes = (num: number, len: number) => {
        var numberWithZeroes = String(num);
        var counter = numberWithZeroes.length;

        while (counter < len) {

            numberWithZeroes = "0" + numberWithZeroes;

            counter++;

        }

        return numberWithZeroes;
    }

    const buscaNumerosRifa = async (data: FormData) => {
        if (data.numeroCelular) {
            const rifaId = rifa[0].id;
            setCarregando(true);
            const resposta = await api.buscarNumerosPedidoCelular(rifaId, data);
            if (resposta.pedidos) {
                setCarregando(false);
                setPedidos(resposta.pedidos);
                console.log(pedidos);
            } else {
                setPedidos([]);
                setCarregando(false);
                toast.error(resposta.erro);
            }
        }
    }

    return (
        <Layout>
            <>
                <Alerta />
                {pageYPosition > 900 &&
                    <a onClick={() => scrollTop()} className="cursor-pointer fixed botao botao-primario bottom-20 right-0 ">
                        <i className="bi bi-chevron-up"></i>
                    </a>
                }
                <div id="inico" className="flex flex-row bg-white justify-center shadow">
                    <div className="flex flex-col md:flex-row max-w-7xl justify-start py-6 px-4 sm:px-6 lg:px-8 md:space-x-20">
                        <h1 className="text-2xl font-bold text-gray-900">
                            {rifa[0].nome}
                        </h1>
                        {rifa[0].status === 'Finalizado' &&
                            <div className="flex flex-col text-center mt-10 md:mt-0 text-white">
                                <span className="text-center rounded-md text-uppercase bg-green-500 w-52">Rifa Finalizada</span>
                            </div>
                        }
                        {rifa[0].data_final_sorteio &&
                            <div className="flex flex-col mt-10 md:mt-0 text-white rounded-md text-uppercase bg-green-600 w-52 p-1 text-center">
                                <span className="">Data do sorteio</span>
                                <span className="font-bold">{rifa[0].data_final_sorteio}</span>
                            </div>
                        }
                        <div className="flex-col md:flex-row text-2xl space-x-3 text-rifaweb-primario mt-10 md:mt-0">
                            <Link href={`/${rifa[0].usuario.nome_usuario}`}>
                                <span className="cursor-pointer hover:text-rifaweb-primario text-black-50"><i className="bi bi-person-circle"></i> {rifa[0].usuario.nome_usuario}</span>
                            </Link>
                            {rifa[0].usuario.facebook && <a target={'_blank'} href={rifa[0].usuario.facebook}><i className="bi bi-facebook"></i></a>}
                            {rifa[0].usuario.instagram && <a target={'_blank'} href={rifa[0].usuario.instagram}><i className="bi bi-instagram"></i></a>}
                            {rifa[0].usuario.numero_celular && <a target={'_blank'} href={`https://api.whatsapp.com/send?phone=55${rifa[0].usuario.numero_celular}&text=Ol%C3%A1%2C%20tudo%20bem?`}><i className="bi bi-whatsapp"></i></a>}
                            {rifa[0].usuario.twitter && <a target={'_blank'} href={rifa[0].usuario.twitter}><i className="bi bi-twitter"></i></a>}
                            {rifa[0].usuario.telegram && <a target={'_blank'} href={rifa[0].usuario.telegram}><i className="bi bi-telegram"></i></a>}
                        </div>
                    </div>

                </div>

                <div className="container">
                    {rifa[0].status === 'Finalizado' &&
                        <div className="flex flex-col my-9 shadow-sm">
                            <h1 className="text-xl md:text-3xl text-center uppercase">Numeros vencedores! ???? ???? ????</h1>
                            <h3 className="text-center uppercase text-base md:text-lg text-gray-400">Data que foi realizado o sorteio: {rifa[0]?.data_final_sorteio}</h3>

                            <div className="flex justify-center font-bold flex-row md:space-x-56 bg-green-500 p-4 w-full text-white">
                                <span className="flex-1">Vencedor(a)</span>
                                <span>Numero Vencedor</span>
                            </div>
                            {premioRifa.map((premio, index) => (
                                <div key={index} className="flex justify-center flex-row md:space-x-56 shadow-sm p-4 w-full">
                                    <span className="flex-1 font-semibold">{premio.ordem}?? Ganhador(a) - {premio.pedido?.nome}</span>
                                    <span className="pago numero bg-green-500 text-white">{premio.numero?.numero}</span>
                                </div>
                            ))}
                        </div>
                    }
                    <div className="row">
                        <div className="col-sm-8 col-md-8">
                            <div className="px-2 py-6 sm:px-0">
                                <div id="carouselRifa" className="carousel slide shadow-2xl shadow-blue-400" data-bs-ride="carousel">
                                    <div className="carousel-indicators">
                                        {rifa[0].imagens_rifa.map((imagem, index) => (
                                            index == 1 ? (
                                                <button key={index} type="button" data-bs-target="#carouselRifa" data-bs-slide-to={index} className="active" aria-current="true" aria-label="Slide 1"></button>
                                            ) : (
                                                <button key={index} type="button" data-bs-target="#carouselRifa" data-bs-slide-to={index} aria-current="true" aria-label="Slide 1"></button>

                                            )
                                        ))}
                                    </div>
                                    <div className="carousel-inner">
                                        {rifa[0].imagens_rifa.map((imagem, index) => (
                                            index == 0 ? (
                                                <div key={index} className='carousel-item active'>
                                                    <img src={imagem.imagem} className="d-block w-100" alt="..." />
                                                </div>
                                            ) : (
                                                <div key={index} className='carousel-item'>
                                                    <img src={imagem.imagem} className="d-block w-100" alt="..." />
                                                </div>
                                            )
                                        ))}
                                    </div>
                                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselRifa" data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Voltar</span>
                                    </button>
                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselRifa" data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Pr??ximo</span>
                                    </button>
                                </div>

                            </div>
                        </div>

                        <div className="col-sm-4 col-md-4">
                            <div className="py-6">
                                <div className="card shadow-md shadow-blue-400 p-4">
                                    <div className="rounded-md bg-green-500 text-white text-center py-3">
                                        <span className=" text-sm">Por Apenas</span><br />
                                        <b className="font-bold text-2xl">R$ {rifa[0].valor_numero}</b>
                                    </div>
                                    <hr />
                                    <div className="mt-3">
                                        <div className="text-white rounded-md text-uppercase font-weight-bold bg-red-800  p-2 text-center">
                                            <b>Premio(s)</b> <i className="bi bi-trophy"></i>
                                        </div>
                                        <p className="text-justify p-2">
                                            {premioRifa.map((premioItem, index) => (
                                                <span key={index}><b>{premioItem.ordem}?? Ganhador(a): </b>{premioItem.nome_premio} <br /></span>
                                            ))}
                                        </p>
                                    </div>
                                    <div className="mt-3">
                                        <div className="text-white rounded-md text-uppercase font-weight-bold bg-indigo-800  p-2 text-center">
                                            <b>DESCRI????O DA RIFA</b>
                                        </div>
                                        <div className="text-justify p-2">
                                            {rifa[0].descricao}
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <div className="text-white rounded-md text-uppercase font-weight-bold bg-warning p-2  text-center">
                                            <b>REGULAMENTO</b>
                                        </div>
                                        <div className="text-justify p-2">
                                            {rifa[0].regulamento}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* promo????o */}
                        {promocaoRifa.length > 0 &&
                            <div className="col-sm-12 col-md-12 mt-4">
                                <div className="card-body ring-2 ring-blue-500 ring-offset-4 ring-offset-blue-100 shadow-2xl shadow-blue-400 p-4">
                                    <h2 className="text-center"><i className="text-blue-400 bi bi-megaphone"></i> Promo????o</h2>
                                    <div className="d-md-flex justify-content-evenly">
                                        {promocaoRifa.map((promocao, index) => (
                                            <strong key={index} className="mt-3 d-block h5"><span>{promocao.quantidade_numero}</span> numeros por <span className="text-green-500">R$ {promocao.valor_promocao}</span></strong>
                                        ))
                                        }
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                </div>

                {rifa[0].status !== "Finalizado" &&
                    <>

                        <div className="bg-white shadow mb-5">
                            <div className="max-w-full px-3 md:px-12 sm:px-6 lg:px-8 p-5">
                                <h2 className="text-center text-3xl font-bold text-gray-900"><i className="bi bi-filter"></i> Filtrar n??meros</h2>
                                <div className="text-center">
                                    <button className="botao w-35 m-2 py-2.5 px-3 bg-black text-white text-sm font-semibold rounded shadow-2xl focus:outline-none hover:bg-slate-600" onClick={() => filtrarNumeros('Todos')}>
                                        Todos <span className="m-2 bg-white text-black py-1 px-3 rounded">{rifa[0].quantidade_numeros}</span>
                                    </button>
                                    <button className="botao m-2 py-2.5 px-3 bg-gray-300 text-black text-sm font-semibold rounded shadow focus:outline-none" onClick={() => filtrarNumeros('Disponivel')}>
                                        Dispon??veis <span className="m-2 bg-black text-white py-1 px-3 rounded">{disponivel}</span>
                                    </button>
                                    <button className="botao m-2 py-2.5 px-3 bg-yellow-400 text-white text-sm font-semibold rounded shadow focus:outline-none" onClick={() => filtrarNumeros('Reservado')}>
                                        Reservados <span className="m-2 bg-yellow-600 py-1 px-3 rounded">{numerosReservados.length}</span>
                                    </button>
                                    <button className="botao m-2 py-2.5 px-3 bg-green-500 text-white text-sm font-semibold rounded shadow focus:outline-none" onClick={() => filtrarNumeros('Pago')}>
                                        Pagos <span className="m-2 bg-green-800 py-1 px-3 rounded">{numerosPagos.length}</span>
                                    </button>
                                    <button className="botao m-2 py-2.5 px-3 bg text-white bg-orange-400 text-sm font-semibold rounded shadow focus:outline-none" onClick={() => setShowModalNumeros(true)}>
                                        <i className="text-md  bi bi-ticket-perforated"></i> Meus Numeros
                                    </button>
                                </div>

                                <div className="flex-wrap d-flex mt-4">
                                    {numerosItem.map((item, index) => (
                                        <Numeros
                                            key={index}
                                            filtro={filtro}
                                            item={item}
                                            onClick={() => handleNumeros(index, item.numero)}

                                        />
                                    ))}
                                </div>
                            </div>
                        </div>


                        {/* exibe valor total de numeros e numeros */}
                        {numerosSelecionado.length > 0 &&
                            <div className="fixed flex bottom-0 w-full z-40 bg-white">
                                <div className="flex-col mx-auto text-center m-3 py-3">
                                    {numerosSelecionado.map((numero, index) => (
                                        <label key={index} className="text-white numero bg-yellow-400">{numero} </label>
                                    ))}
                                    <span className="p-2">Total: <b className="text-green-600">{precoNumero.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</b></span>
                                    <button className="btn btn-primary px-3" onClick={() => setShowModal(true)}><i className="bi bi-arrow-right-short"></i>Prosseguir</button>
                                </div>
                            </div>
                        }

                        {/* MODAL PARA RESERVAR NUMEROS */}
                        {showModal ? (
                            <>
                                <div className="fixed-top w-screen h-screen flex justify-center items-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"                        >
                                    <div className="w-auto my-2 mx-auto max-w-3xl">
                                        {/*content*/}
                                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
                                            {/*header*/}
                                            <div className="p-4 border-b border-solid border-slate-200 rounded-t">
                                                <h3 className="fs-14px d-block">Valor a pagar: <b className="text-green-600">{precoNumero.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</b></h3>

                                                <span className="text-lg text-start">N??meros selecionados:</span>
                                                <div className="m-0 pt-2 text-start">
                                                    {numerosSelecionado.map((numero, index) => (
                                                        <label key={index} className="text-white numero bg-yellow-400">{numero}</label>
                                                    ))}
                                                </div>
                                                <button
                                                    className="p-1 ml-auto bg-transparent border- text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                    onClick={() => setShowModal(false)}
                                                >
                                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                        X
                                                    </span>
                                                </button>
                                            </div>

                                            {/*body*/}
                                            <form className="needs-validatio" onSubmit={handleSubmit(reservarNumeros)}>
                                                <div className="relative p-4 flex-auto">
                                                    <div className="body text-black">
                                                        <p className="fs-12px text-black-50 mb-4">Por favor, preencha os campos abaixo:</p>

                                                        <span className="fs-14px font-semibold">Nome Completo:</span>
                                                        <div className="input-group flex-nowrap mt-2 mb-1">
                                                            <span className="input-group-text" id="addon-wrapping"><i className="bi bi-person"></i></span>
                                                            <input
                                                                {...register('nomeCompleto',
                                                                    {
                                                                        required: "Esse campo ?? obrigatorio",
                                                                        pattern: {
                                                                            value: /[A-Z][a-z]* [A-Z][a-z]*/,
                                                                            message: "Digite o nome completo com as primeiras letras maisculas."
                                                                        }
                                                                    })}
                                                                type="text"
                                                                className={`form-control ${errors.nomeCompleto ? 'is-invalid' : 'is-valid'}`}
                                                                name="nomeCompleto"
                                                                placeholder="Insira seu nome completo"
                                                                aria-label="nomeCompleto"
                                                                aria-describedby="addon-wrapping" />
                                                        </div>
                                                        {errors.nomeCompleto ? <p className="text-red-600">{errors.nomeCompleto.message}</p> : null}

                                                        <span className="fs-14px font-semibold">Celular com DDD: </span>
                                                        <div className="input-group flex-nowrap mt-2 mb-1 col-md-4">
                                                            <span className="input-group-text" id="addon-wrapping"><i className="bi bi-phone"></i></span>
                                                            <Controller
                                                                name="numeroCelular"
                                                                aria-label="numeroCelular"
                                                                control={control}
                                                                rules={{
                                                                    required: 'Esse campo ?? obrigat??rio',
                                                                    minLength: {
                                                                        value: 14,
                                                                        message: "O numero do celular precisar ter no minimo 9 digitos"
                                                                    },
                                                                }}
                                                                render={({ field }) => <NumberFormat
                                                                    {...field}
                                                                    format="(##) #########"
                                                                    mask=""
                                                                    className={`form-control ${errors.numeroCelular ? 'is-invalid' : 'is-valid'}`}
                                                                    placeholder="Digite o numero do seu celular com DDD"
                                                                    aria-describedby="addon-wrapping" />}
                                                            />
                                                        </div>
                                                        {errors.numeroCelular ? <p className="text-red-600">{errors.numeroCelular.message}</p> : null}

                                                        <span className="fs-14px font-semibold">Email: </span>
                                                        <div className="input-group flex-nowrap mt-2 mb-1">
                                                            <span className="input-group-text" id="addon-wrapping"><i className="bi bi-envelope"></i></span>
                                                            <input
                                                                {...register('email',
                                                                    {
                                                                        required: 'Esse campo ?? obrigat??rio',
                                                                        pattern: {
                                                                            value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                                            message: 'Digite um e-mail v??lido'
                                                                        }
                                                                    }
                                                                )}
                                                                type="email"
                                                                className={`form-control ${errors.email ? 'is-invalid' : 'is-valid'}`}
                                                                placeholder="insira seu e-mail"
                                                                aria-label="email"
                                                                name="email"
                                                                aria-describedby="addon-wrapping" />
                                                        </div>
                                                        {errors.email ? <p className="text-red-600">{errors.email.message}</p> : null}

                                                        <span className="fs-14px font-semibold">CPF: </span>
                                                        <div className="input-group flex-nowrap mt-2 mb-1">
                                                            <span className="input-group-text" id="addon-wrapping"><i className="bi bi-person-bounding-box"></i></span>
                                                            <Controller
                                                                name="cpf"
                                                                aria-label="cpf"
                                                                control={control}
                                                                rules={{
                                                                    required: 'Esse campo ?? obrigat??rio',
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
                                                                    className={`form-control ${errors.cpf ? 'is-invalid' : 'is-valid'}`}
                                                                    placeholder="insira seu cpf"
                                                                    {...field}
                                                                    aria-describedby="addon-wrapping" />}
                                                            />
                                                        </div>
                                                        {errors.cpf && errors.cpf.type !== "validaCpf" && (<p className="text-red-600">{errors.cpf.message}</p>)}
                                                        {errors.cpf && errors.cpf.type === "validaCpf" ? <p className="text-red-600">O CPF n??o ?? v??lido</p> : null}
                                                    </div>

                                                    <small className="fs-11px">
                                                        Ao reservar meus n??meros declaro ter lido e concordado com os <a href="/termos-de-uso" target="_blank" className="text-primary">termos de uso</a>
                                                    </small>
                                                </div>
                                                {/*footer*/}
                                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                    <button
                                                        type="button"
                                                        className="botao btn-secondary m-1"
                                                        onClick={() => setShowModal(false)}>
                                                        Cancelar
                                                    </button>
                                                    <button
                                                        disabled={carregando}
                                                        type="submit"
                                                        className={`botao botao-primario`}>
                                                        {carregando ? <div className="px-4 animate-spin bi bi-arrow-repeat"></div> : 'Reservar'}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
                            </>
                        ) : null}



                        <div className={`fixed-top w-screen h-screen flex justify-center items-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none ${showModalNumeros ? 'flex' : 'hidden'}`}>
                            <div className="absolute w-full h-full bg-gray-900 opacity-50"></div>
                            <div className="w-auto my-1 mx-auto max-w-xl">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
                                    {/* body */}
                                    <div className="relative p-4 flex-auto">
                                        <button
                                            className="p-1 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setShowModalNumeros(false)}
                                        >
                                            <span className=" text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                <i className="bi bi-x-lg"></i>
                                            </span>
                                        </button>
                                        <h3 className="text-2xl"><i className="text-md bi bi-ticket-perforated mr-3"></i>Buscar meus n??meros</h3>
                                        <div className="body text-black mt-4">
                                            <form onSubmit={handleSubmit(buscaNumerosRifa)}>
                                                <div className="input-group flex-nowrap mb-1 col-md-4">
                                                    <span className="input-group-text" id="addon-wrapping"><i className="bi bi-ticket-perforated"></i></span>
                                                    <Controller
                                                        name="numeroCelular"
                                                        aria-label="celular"
                                                        control={control}
                                                        rules={{
                                                            required: 'Esse campo ?? obrigat??rio',
                                                            minLength: {
                                                                value: 14,
                                                                message: "O numero do celular precisar ter no minimo 9 digitos"
                                                            },
                                                        }}
                                                        render={({ field }) => <NumberFormat
                                                            {...field}
                                                            format="(##) #########"
                                                            mask=""
                                                            className={`form-control ${errors.numeroCelular ? 'is-invalid' : 'is-valid'}`}
                                                            placeholder="Celular com DDD"
                                                            aria-describedby="addon-wrapping" />}
                                                    />
                                                    <button
                                                        disabled={carregando}
                                                        type="submit"
                                                        className='botao botao-primario'>
                                                        {carregando ? <div className="px-4 animate-spin bi bi-arrow-repeat"></div> : 'Pesquisar'}
                                                    </button>
                                                </div>
                                                {errors.numeroCelular ? <p className="text-red-600">{errors.numeroCelular.message}</p> : null}
                                            </form>
                                        </div>
                                    </div>
                                    {/*footer*/}
                                    <div className="items-center justify-start px-4 pb-4 border-slate-200 rounded-b">
                                        {pedidos?.map((pedido) => (
                                            <Link href={`/reserva/${pedido.id}`}>
                                                <label
                                                    key={pedido.id}
                                                    className={`text-white numero ${pedido.status == 'Reservado' ? 'bg-orange-400 hover:bg-orange-300' : 'bg-green-500 hover:bg-green-300'}`}
                                                    data-bs-placement="bottom"
                                                    title="Clique para efetuar o pagamento">
                                                    {pedido.numeros}
                                                </label>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </>
        </Layout >
    )
}



export default RifaCompra;

interface Params extends ParsedUrlQuery {
    link: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { link } = context.params as Params;

    const api = useApi();

    //busca rifas
    const paramentros = { link_rifa: link };
    const resposta = await api.buscaRifas(paramentros);
    const rifas: Rifas = resposta.rifas;

    if (!rifas) {
        return {
            redirect: {
                destination: '/rifa',
                permanent: false
            }
        }
    }

    //busca premio
    const respostaPremio = await api.buscaPremioRifa(rifas.data[0].id);
    const premioRifa: PremioType[] = respostaPremio.premioRifa;


    //busca promocao
    const respostaPromocao = await api.buscaPromocaoRifa(rifas.data[0].id);
    const promocaoRifa: PromocaoType[] = respostaPromocao.promocaoRifa;

    //busca numeros reservados
    const status = { status: 'Reservado' };
    const respostaNumeroReservado = await api.buscaNumerosReservados(rifas.data[0].id, status);
    let numerosReservados: Array<string> = [];
    if (respostaNumeroReservado.numerosStatus) {
        numerosReservados = respostaNumeroReservado.numerosStatus;
    }

    //busca numeros reservados
    const statusPago = { status: 'Pago' };
    const respostaNumerosPagos = await api.buscaNumerosReservados(rifas.data[0].id, statusPago);
    let numerosPagos: Array<string> = [];
    if (respostaNumerosPagos.numerosStatus) {
        numerosPagos = respostaNumerosPagos.numerosStatus;
    }

    return {
        props: {
            rifa: rifas.data,
            premioRifa: premioRifa,
            promocaoRifa: promocaoRifa,
            numerosReservados: numerosReservados,
            numerosPagos: numerosPagos
        }
    }
}