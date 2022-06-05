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

type Props = {
    rifa: Rifa[];
    premioRifa: PremioType[];
    promocaoRifa: PromocaoType[];
}

const RifaCompra = ({ rifa, premioRifa, promocaoRifa }: Props) => {
    const [numerosSelecionado, setNumerosSelecionado] = useState<Array<number>>([]);
    const [numerosItem, setNumerosItems] = useState<NumeroType[]>([]);
    const [precoNumero, setPrecoNumero] = useState(0);

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
        const array = [1, 2, 3];
        if (rifa[0].quantidade_numeros) {
            for (var index = 0; index < rifa[0].quantidade_numeros; index++) {
                if (array.includes(index)) {
                    numerosItemTemp.push({
                        numero: index,
                        status: 'Reservado'
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


    return (
        <Layout>
            <>
                <div className="bg-white shadow-lg shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-900">{rifa[0].nome}</h1>
                    </div>
                </div>

                <div className="container">
                    <div className="row g-0">
                        <div className="col-sm-6 col-md-8">
                            <div className="px-2 py-6 sm:px-0">
                                <div id="carouselRifa" className="carousel slide shadow-md shadow-2xl shadow-blue-400" data-bs-ride="carousel">
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
                                <div className="card shadow-md shadow-2xl shadow-blue-400 p-4">
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
                                <div className="card-body ring-2 ring-blue-500 ring-offset-4 ring-offset-blue-100 shadow-md shadow-2xl shadow-blue-400 p-4">
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

                <div className="bg-white shadow-lg shadow mb-5">
                    <div className="max-w-full px-4 sm:px-6 lg:px-8 p-5">
                        <h1 className="text-center text-3xl font-bold text-gray-900">Filtro</h1>
                        <div className="flex-wrap d-flex">
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
                                <span className="p-2">Total: R$ <b>{precoNumero.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</b></span>
                                <button className="btn btn-primary">Reservar</button>
                            </div>
                        </div>
                    </div>
                }


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
    const paramentros = { limit: 6, link_rifa: link };
    const resposta = await api.buscaRifas(paramentros);
    const rifas: Rifa[] = resposta.rifas;

    //busca premio
    const respostaPremio = await api.buscaPremioRifa(link);
    const premioRifa: PremioType[] = respostaPremio.premioRifa;

    //busca promocao
    const respostaPromocao = await api.buscaPromocaoRifa(link);
    const promocaoRifa: PromocaoType[] = respostaPromocao.promocaoRifa;

    return {
        props: {
            rifa: rifas,
            premioRifa: premioRifa,
            promocaoRifa: promocaoRifa
        }
    }
}