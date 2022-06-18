import { GetServerSideProps, GetStaticProps } from "next";
import Router, { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { ChangeEvent, useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import { Numeros } from "../../components/Numeros";
import { useApi } from "../../hooks/useApi";
import { NumeroType } from "../../types/NumeroType";
import { PremioType } from "../../types/PremioType";
import { PromocaoType } from "../../types/PromocaoType";
import { Rifa } from "../../types/Rifa";
import { useForm } from 'react-hook-form';

type Props = {
    rifa: Rifa[];
    premioRifa: PremioType[];
    promocaoRifa: PromocaoType[];
    numerosReservados: Array<string>,
    numerosPagos: Array<string>
}

const RifaCompra = ({ rifa, premioRifa, promocaoRifa, numerosReservados, numerosPagos }: Props) => {

    const [numerosSelecionado, setNumerosSelecionado] = useState<Array<string>>([]);
    const [numerosItem, setNumerosItems] = useState<NumeroType[]>([]);
    const [precoNumero, setPrecoNumero] = useState(0);
    const [disponivel, setDisponivel] = useState(0);
    const [filtro, setFiltro] = useState('Todos');
    const [showModal, setShowModal] = useState<boolean>(false);
    const { register, handleSubmit } = useForm();
    const api = useApi();
    const route = useRouter();

    useEffect(() => {
        montaNumerosRifas();
    }, [])

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
        //monta rifa com quatidades de numeros

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
            for (var index = 0; index < quantidadeNumeros; index++) {
                if (quantidadeNumeros <= 100) {
                    numeros = addZeroes(index, 2);
                } else if (quantidadeNumeros <= 1000) {
                    numeros = addZeroes(index, 3);
                } else if (quantidadeNumeros <= 5000) {
                    numeros = addZeroes(index, 4);
                } else {
                    numeros = addZeroes(index, 5);
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

    const reservarNumeros = async (data: Object) => {
        const id = rifa[0].id;
        const retorno = await api.reservarNumeros(data, numerosSelecionado, id, precoNumero)
        if (retorno.idRifa) {
            route.push(`/reserva/${retorno.idRifa}`);
        } else {
            console.log('erro');
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

    return (
        <Layout>
            <>
                <div className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-900">{rifa[0].nome}</h1>
                    </div>
                </div>

                <div className="container">
                    <div className="row g-0">
                        <div className="col-sm-6 col-md-8">
                            <div className="px-2 py-6 sm:px-0">
                                <div id="carouselRifa" className="carousel slide shadow-2xl shadow-blue-400" data-bs-ride="carousel">
                                    <div className="carousel-indicators">
                                        {rifa[0].imagensRifas.map((imagem: any, index: any) => (
                                            index == 1 ? (
                                                <button key={index} type="button" data-bs-target="#carouselRifa" data-bs-slide-to={index} className="active" aria-current="true" aria-label="Slide 1"></button>
                                            ) : (
                                                <button key={index} type="button" data-bs-target="#carouselRifa" data-bs-slide-to={index} aria-current="true" aria-label="Slide 1"></button>

                                            )
                                        ))}
                                    </div>
                                    <div className="carousel-inner">
                                        {rifa[0].imagensRifas.map((imagem: any, index: any) => (
                                            index == 0 ? (
                                                <div key={index} className='carousel-item active'>
                                                    <img src={imagem} className="d-block w-100" alt="..." />
                                                </div>
                                            ) : (
                                                <div key={index} className='carousel-item'>
                                                    <img src={imagem} className="d-block w-100" alt="..." />
                                                </div>
                                            )
                                        ))}
                                    </div>
                                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselRifa" data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselRifa" data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>

                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="py-6">
                                <div className="card shadow-md shadow-blue-400 p-4">
                                    <div className="rounded-lg bg-green-500 text-white text-center py-2 br-5">
                                        <span className="text-uppercase font-bold fs-17px">Valor</span><br />
                                        R$ <b className="fs-20px">{rifa[0].valor_numero}</b>
                                    </div>
                                    <hr className="border-8 border-sky-500" />
                                    {rifa[0].data_final_sorteio &&
                                        <div className="pt-3">
                                            <div className="text-white rounded-lg text-uppercase font-weight-bold bg-red-600 p-2 br- text-center">
                                                <b>Data sorteio</b>
                                            </div>
                                            <h3 className="text-center pt-3">{rifa[0].data_final_sorteio}</h3>
                                        </div>
                                    }
                                    <div className="pt-3">
                                        <div className="text-white rounded-lg text-uppercase font-weight-bold bg-red-800 p-2 br- text-center">
                                            <b>Premio(s)</b> <i className="bi bi-trophy"></i>
                                        </div>
                                        <p className="text-justify pt-3">
                                            {premioRifa.map((premioItem, index) => (
                                                <span key={index}><b>{premioItem.ordem}ª Ganhador(a): </b>{premioItem.nome_premio} <br /></span>
                                            ))}
                                        </p>
                                    </div>
                                    <div className="pt-3">
                                        <div className="text-white rounded-lg text-uppercase font-weight-bold bg-indigo-800 p-2 br- text-center">
                                            <b>DESCRIÇÃO DA RIFA</b>
                                        </div>
                                        <p className="text-justify pt-3">
                                            {rifa[0].descricao}
                                        </p>
                                    </div>
                                    <div className="pt-2">
                                        <div className="text-white rounded-lg text-uppercase font-weight-bold bg-warning p-2 br- text-center">
                                            <b>REGULAMENTO</b>
                                        </div>
                                        <p className="text-justify pt-3">
                                            {rifa[0].regulamento}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* promoção */}
                        {promocaoRifa.length > 0 &&
                            <div className="col-sm-12 col-md-12 mt-4">
                                <div className="card-body ring-2 ring-blue-500 ring-offset-4 ring-offset-blue-100 shadow-2xl shadow-blue-400 p-4">
                                    <h2 className="text-center"><i className="text-blue-400 bi bi-megaphone"></i> Promoção</h2>
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

                <div className="bg-white shadow mb-5">
                    <div className="max-w-full px-3 md:px-12 sm:px-6 lg:px-8 p-5">
                        <h2 className="text-center text-3xl font-bold text-gray-900"><i className="bi bi-filter"></i> Filtrar números</h2>
                        <div className="text-center">
                            <button className="w-35 m-2 py-2 px-3 bg-black text-white text-sm font-semibold rounded-md shadow focus:outline-none" onClick={() => filtrarNumeros('Todos')}>
                                Todos <span className="m-2 bg-white text-black py-1 px-2 rounded-md">{rifa[0].quantidade_numeros}</span>
                            </button>
                            <button className="m-2 py-2 px-3 bg-gray-300 text-black text-sm font-semibold rounded-md shadow focus:outline-none" onClick={() => filtrarNumeros('Disponivel')}>
                                Disponíveis <span className="bg-black text-white py-1 px-2 rounded-md">{disponivel}</span>
                            </button>
                            <button className="m-2 py-2 px-3 bg-warning text-white text-sm font-semibold rounded-md shadow focus:outline-none" onClick={() => filtrarNumeros('Reservado')}>
                                Reservados <span className="bg-yellow-600 py-1 px-2 rounded-md">{numerosReservados.length}</span>
                            </button>
                            <button className="m-2 py-2 px-3 bg-green-500 text-white text-sm font-semibold rounded-md shadow focus:outline-none" onClick={() => filtrarNumeros('Pago')}>
                                Pagos <span className="bg-green-800 py-1 px-2 rounded-md">{numerosPagos.length}</span>
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
                        <div className="flex-row items-center text-center m-3">
                            <div className="p-3">
                                {numerosSelecionado.map((numero, index) => (
                                    <label key={index} className="text-white text-semibold rounded-lg h-10 w-20 cursor-pointer bg-warning p-2 m-1">{numero} </label>
                                ))}
                                <span className="p-2">Total: <b className="text-green-600">{precoNumero.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</b></span>
                                <button className="btn btn-primary px-3" onClick={() => setShowModal(true)}><i className="bi bi-arrow-right-short"></i>Prosseguir</button>
                            </div>
                        </div>
                    </div>
                }

                {/* MODAL PARA RESERVAR NUMEROS */}
                {showModal ? (
                    <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed-top inset-0 z-50 outline-none focus:outline-none"                        >
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="p-4 border-b border-solid border-slate-200 rounded-t">
                                        <h3 className="fs-14px d-block mb-3">Valor a pagar: <b className="text-green-600">{precoNumero.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</b></h3>

                                        <span className="fs-14px">Números selecionados:</span>
                                        <div className="m-0 pt-2 pb-5 text-start">
                                            {numerosSelecionado.map((numero, index) => (
                                                <label key={index} className="text-white text-semibold text-center rounded-lg h-10 w-20 cursor-pointer bg-warning p-2 m-1">{numero}</label>
                                            ))}
                                        </div>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setShowModal(false)}
                                        >
                                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                ×
                                            </span>
                                        </button>
                                    </div>

                                    {/*body*/}
                                    <form onSubmit={handleSubmit(reservarNumeros)}>
                                        <div className="relative p-4 flex-auto">
                                            <div className="body text-black">
                                                <p className="fs-12px text-black-50 mb-4">Por favor, preencha os campos abaixo:</p>

                                                <span className="fs-14px font-semibold">Nome Completo:</span>
                                                <div className="input-group flex-nowrap mt-2 mb-3">
                                                    <span className="input-group-text" id="addon-wrapping"><i className="bi bi-person"></i></span>
                                                    <input
                                                        {...register('nomeCompleto')}
                                                        type="text"
                                                        required
                                                        className="form-control"
                                                        name="nomeCompleto"
                                                        placeholder="Insira seu nome completo"
                                                        aria-label="nomeCompleto"
                                                        aria-describedby="addon-wrapping" />
                                                </div>

                                                <span className="fs-14px font-semibold">Celular: </span>
                                                <div className="input-group flex-nowrap mt-2 mb-3">
                                                    <span className="input-group-text" id="addon-wrapping"><i className="bi bi-phone"></i></span>
                                                    <input
                                                        {...register('celular')}
                                                        type="text"
                                                        required
                                                        className="form-control"
                                                        placeholder="insira seu celular com DDD"
                                                        aria-label="celular"
                                                        name="celular"
                                                        aria-describedby="addon-wrapping" />
                                                </div>

                                                <span className="fs-14px font-semibold">Email: </span>
                                                <div className="input-group flex-nowrap mt-2 mb-3">
                                                    <span className="input-group-text" id="addon-wrapping"><i className="bi bi-envelope"></i></span>
                                                    <input
                                                        {...register('email')}
                                                        type="email"
                                                        className="form-control"
                                                        placeholder="insira seu e-mail"
                                                        aria-label="email"
                                                        name="email"
                                                        aria-describedby="addon-wrapping" />
                                                </div>

                                                <span className="fs-14px font-semibold">CPF: </span>
                                                <div className="input-group flex-nowrap mt-2 mb-3">
                                                    <span className="input-group-text" id="addon-wrapping"><i className="bi bi-person-bounding-box"></i></span>
                                                    <input
                                                        {...register('cpf')}
                                                        type="text"
                                                        required
                                                        className="form-control"
                                                        placeholder="insira seu cpf"
                                                        aria-label="cpf"
                                                        name="cpf"
                                                        aria-describedby="addon-wrapping" />
                                                </div>
                                            </div>
                                            <small className="fs-11px">
                                                Ao reservar meus números declaro ter lido e concordado com os <a href="/termos-de-uso" target="_blank" className="text-primary">termos de uso</a>
                                            </small>
                                        </div>
                                        {/*footer*/}
                                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                            <button
                                                type="button"
                                                className="btn btn-secondary p-2 m-1"
                                                onClick={() => setShowModal(false)}>
                                                Cancelar
                                            </button>
                                            <button
                                                type="submit"
                                                className="btn btn-success p-2">
                                                Reservar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}


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
    const rifas: Rifa[] = resposta.rifas;

    //busca premio
    const respostaPremio = await api.buscaPremioRifa(rifas[0].id);
    const premioRifa: PremioType[] = respostaPremio.premioRifa;


    //busca promocao
    const respostaPromocao = await api.buscaPromocaoRifa(rifas[0].id);
    const promocaoRifa: PromocaoType[] = respostaPromocao.promocaoRifa;

    //busca numeros reservados
    const status = { status: 'Reservado' };
    const respostaNumeroReservado = await api.buscaNumerosReservados(rifas[0].id, status);
    let numerosReservados: Array<string> = [];
    if (respostaNumeroReservado.numerosStatus) {
        numerosReservados = respostaNumeroReservado.numerosStatus;
    }

    //busca numeros reservados
    const statusPago = { status: 'Pago' };
    const respostaNumerosPagos = await api.buscaNumerosReservados(rifas[0].id, statusPago);
    let numerosPagos: Array<string> = [];
    if (respostaNumerosPagos.numerosStatus) {
        numerosPagos = respostaNumerosPagos.numerosStatus;
    }


    return {
        props: {
            rifa: rifas,
            premioRifa: premioRifa,
            promocaoRifa: promocaoRifa,
            numerosReservados: numerosReservados,
            numerosPagos: numerosPagos
        }
    }
}