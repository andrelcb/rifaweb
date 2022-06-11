import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { Router } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import checkIcon from '../../public/checkIcon.svg'
import iconePix from '../../public/iconePix.svg'
import { ReservaType } from "../../types/ReservaType";

type Props = {
    reserva: ReservaType;
}

const Reserva = ({ reserva }: Props) => {
    const api = useApi();
    const [imagemQrCode, setImagemQrCode] = useState('');
    const [qrCode, setQrCode] = useState('');

    useEffect(() => {
    })

    const geraCobrancaPix = async () => {
        const resposta = await api.geraCobrancaPix(reserva);
        if (resposta.qrcode) {
            setImagemQrCode(resposta.qrcode.imagemQrcode)
            setQrCode(resposta.qrcode.qrcode)
        }
    }

    return (
        <>
            <div className="py-5 h-50 px-5 bgPrimary mx-auto text-white">
                <Link href={'/'}>
                    <a className="text-white navbar-brand"><img className='d-inline-block align-text-top' src='/logoTicket.png' width={30} height={30} /> Rifaweb</a>
                </Link>
                <div className="container">
                    <div className="row">
                        <div className="text-start col-12 col-lg-7 col-xl-6 mr-auto mb-8 mb-lg-0">
                            <h1 className="font-bold text-5xl">A sua reserva foi confirmada com sucesso. </h1>
                            <p className="mt-4">Agora é só efetuar o pagamento e ja vai estar participando da rifa.</p>
                        </div>

                        <div className="col-12 col-lg-5 col-xl-5 text-center">
                            <Image className="stroke-cyan-500" src={checkIcon} color={'black'} height={200} width={200}></Image>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                {/* INFORMAÇÕES DA RESERVA */}
                <div className="row">
                    <div className="col-sm-6 col-md-8">
                        <div className="px-2 py-6 sm:px-0">
                            <div className="card shadow-md shadow-blue-200 p-4">
                                <h3><i className="bi bi-info-circle"></i> Informações da reserva</h3>
                                <div className="row mt-3">
                                    <div className="col-sm-4 col-md-6">
                                        <span>Participante:</span>
                                    </div>
                                    <div className="col-sm-4 col-md-6">
                                        <span>{reserva.nome}</span>
                                    </div>
                                </div>
                                <div className="row mt-5">
                                    <div className="col-sm-4 col-md-6">
                                        <span>Telefone:</span>
                                    </div>
                                    <div className="col-sm-4 col-md-6">
                                        <span>{reserva.numero_celular}</span>
                                    </div>
                                </div>
                                <div className="row mt-5">
                                    <div className="col-sm-4 col-md-6">
                                        <span>Valor total reserva:</span>
                                    </div>
                                    <div className="col-sm-4 col-md-6 text-green-600 text-lg font-semibold">
                                        <span>R$ {reserva.valor_total}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-4 col-md-4">
                        <div className="px-2 py-6 sm:px-0">
                            <div className="card shadow-md shadow-blue-200 p-4">
                                <h3><i className="text-blue-800 bi bi-ticket-perforated"></i> Números reservados</h3>
                                <div className="row mt-3">
                                    <div className="col-sm-12 col-md-12">
                                        {reserva.numeros.map((numero, index) => (
                                            <label key={index} className="text-center rounded-lg h-10 w-20 cursor-pointer bg-warning p-2 m-1">{numero.numero}</label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-6 col-md-12">
                        <div className="px-2 py-6 sm:px-0">
                            {imagemQrCode == "" &&
                                <>
                                    <h2><i className="bi bi-credit-card"></i> Selecione a forma de pagamento</h2>
                                    <div className="row col-sm-4">
                                        <div onClick={geraCobrancaPix} className="cursor-pointer hover:scale-125 ease-in-out duration-200 delay-10 text-center mt-4 card shadow-md shadow-blue-200 p-4 h-32 w-32">
                                            <Image className="" src={iconePix} height={150} width={200}></Image>
                                            <span className="mt-3">Pix</span>
                                        </div>
                                        {/* <div className="cursor-pointer hover:scale-125 ease-in-out duration-200 delay-10 text-center mt-4 card shadow-md shadow-blue-200 p-4 h-32 w-48">
                                        <i className="text-blue-800 bi bi-credit-card text-3xl"></i>
                                        <span className="mt-3">Cartão de credito</span>
                                    </div> */}
                                    </div>
                                </>
                            }
                            {imagemQrCode != "" &&
                                <div className="row col-sm-12 col-md-12 text-center">
                                    <h2><i className="bi bi-qr-code-scan"></i> Realize o pagamento e ja vai esta participando...</h2>
                                    <h6 className="mt-3 cursor-pointer">{qrCode}</h6>
                                    <div className="w-full overflow-hidden relative">
                                        <Image src={imagemQrCode} width={300} height={300} />
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/*             
            <div className="text-center mt-5">
                <p className="text-black">Voltar para o site</p>
                <Link href={'/'}>
                    <a className="btn btn-primary font-weight-light"><i className="bi bi-arrow-left-short"></i> Voltar</a>
                </Link>
            </div> */}

            <div className="text-center mt-10">
                <i className="text-green-500 bi bi-shield-check"></i><b className="text-muted">Pagamento seguro</b>
            </div>

            <footer className="text-center opacity-4 p-4 mt-5">
                <span className="text-muted mt-5">2022 @Rifaweb - Todos direitos reservados</span>
            </footer>
        </>
    )
}

interface Params extends ParsedUrlQuery {
    id: string;
}


export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params as Params;
    const api = useApi();

    const retornoReserva = await api.buscaDadosReserva(id);
    const reserva: ReservaType = retornoReserva.dadosReserva;

    return {
        props: {
            reserva
        }
    }
}


export default Reserva;