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
    numerosReservados: Array<number>,
    numerosPagos: Array<number>
}

const RifaCompra = ({ rifa, premioRifa, promocaoRifa, numerosReservados, numerosPagos }: Props) => {

    const [numerosSelecionado, setNumerosSelecionado] = useState<Array<number>>([]);
    const [numerosItem, setNumerosItems] = useState<NumeroType[]>([]);
    const [precoNumero, setPrecoNumero] = useState(0);
    const [disponivel, setDisponivel] = useState(0);
    const api = useApi();
    const { register, handleSubmit } = useForm();
    const route = useRouter();

    useEffect(() => {
        montaNumerosRifas();
    }, [])

    const handleNumeros = async (index: number) => {
        let numeroItemTemp = [...numerosItem];
        let numerosSelecionadoTemp = [...numerosSelecionado];

        if (numeroItemTemp[index].status == 'Disponivel') {
            numeroItemTemp[index].status = 'Selecionado'

            numerosSelecionadoTemp.push(index);
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
            var remover = numerosSelecionadoTemp.findIndex(x => x === index);
            numerosSelecionadoTemp.splice(remover, 1)
            let preco = parseFloat(rifa[0].valor_numero);
            setPrecoNumero(precoNumero - preco);
            setNumerosSelecionado(numerosSelecionadoTemp);
        }

        setNumerosItems(numeroItemTemp);

    }

    const montaNumerosRifas = () => {
        let numerosItemTemp: NumeroType[] = [];
        if (rifa[0].quantidade_numeros) {
            if (numerosReservados.length > 0 && numerosPagos.length > 0) {
                const disponivel = rifa[0].quantidade_numeros - (numerosReservados.length + numerosPagos.length);
                setDisponivel(disponivel);
            }
            for (var index = 0; index < rifa[0].quantidade_numeros; index++) {
                //verifica os numeros reservados da rifa
                if (numerosReservados.includes(index)) {
                    numerosItemTemp.push({
                        numero: index,
                        status: 'Reservado'
                    });

                    continue;
                }

                //verifica os numeros pagos da rifa
                if (numerosPagos.includes(index)) {
                    numerosItemTemp.push({
                        numero: index,
                        status: 'Pago'
                    });

                    continue;
                }
                numerosItemTemp.push({
                    numero: index,
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
                            <button className="w-35 m-2 py-2 px-3 bg-black text-white text-sm font-semibold rounded-md shadow focus:outline-none">
                                Todos <span className="m-2 bg-white text-black py-1 px-2 rounded-md">{rifa[0].quantidade_numeros}</span>
                            </button>
                            <button className="m-2 py-2 px-3 bg-gray-300 text-black text-sm font-semibold rounded-md shadow focus:outline-none">
                                Disponíveis <span className="bg-black text-white py-1 px-2 rounded-md">{disponivel}</span>
                            </button>
                            <button className="m-2 py-2 px-3 bg-warning text-white text-sm font-semibold rounded-md shadow focus:outline-none">
                                Reservados <span className="bg-yellow-600 py-1 px-2 rounded-md">{numerosReservados.length}</span>
                            </button>
                            <button className="m-2 py-2 px-3 bg-green-500 text-white text-sm font-semibold rounded-md shadow focus:outline-none">
                                Pagos <span className="bg-green-800 py-1 px-2 rounded-md">{numerosPagos.length}</span>
                            </button>
                        </div>

                        <div className="flex-wrap d-flex mt-4">
                            {numerosItem.map((item, index) => (
                                <Numeros
                                    key={index}
                                    item={item}
                                    onClick={() => handleNumeros(index)}

                                />
                            ))}
                        </div>
                    </div>
                </div>


                {numerosSelecionado.length > 0 &&
                    <div className="fixed-bottom bg-white">
                        <div className="row text-center m-3">
                            <div className="p-3">
                                {numerosSelecionado.map((numero, index) => (
                                    <label key={index} className="text-center rounded-lg h-10 w-20 cursor-pointer bg-warning p-2 m-1">{numero} </label>
                                ))}
                                <span className="p-2">Total: <b className="text-green-600">{precoNumero.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</b></span>
                                <button className="btn btn-primary p-3" data-bs-toggle="modal" data-bs-target="#modalReserva"><i className="bi bi-arrow-right-short"></i>Prosseguir</button>
                            </div>
                        </div>
                    </div>
                }

                <div className="modal fade" id="modalReserva" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="align-self-center ml-2 font-weight-bold fs-15px modal-title text-dark mb-0" id="exampleModalLabel">Reserva de número(s)</h4>
                                <button type="button" className="modal-close" data-dismiss="modal" aria-hidden="true">×</button>
                            </div>
                            <form onSubmit={handleSubmit(reservarNumeros)}>
                                <div className="modal-body text-black">
                                    <p className="fs-14px d-block mb-3">Valor a pagar: <b className="text-green-600">{precoNumero.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</b></p>

                                    <span className="fs-14px">Números selecionados:</span>
                                    <div className="m-0 pt-2 pb-5 text-start">
                                        {numerosSelecionado.map((numero, index) => (
                                            <label key={index} className="text-center rounded-lg h-10 w-20 cursor-pointer bg-warning p-2 m-1">{numero}</label>
                                        ))}
                                    </div>
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

                                    <small className="fs-11px">
                                        Ao reservar meus números declaro ter lido e concordado com os
                                        <a href="" target="_blank" className="text-primary">termos de uso</a>
                                    </small>
                                </div>
                                <div className="modal-footer text-right pl-0 pr-0">
                                    <div className="p-4">
                                        <button type="button" className="btn btn-secondary p-2 m-1" data-bs-dismiss="modal">Cancelar</button>
                                        <button className="btn btn-success p-2">Reservar</button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>


            </>
        </Layout>
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
    let numerosReservados: Array<number> = [];
    if (respostaNumeroReservado.numerosStatus) {
        numerosReservados = respostaNumeroReservado.numerosStatus;
    }

    //busca numeros reservados
    const statusPago = { status: 'Pago' };
    const respostaNumerosPagos = await api.buscaNumerosReservados(rifas[0].id, statusPago);
    let numerosPagos: Array<number> = [];
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