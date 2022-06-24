import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import checkIcon from '../../public/checkIcon.svg'
import iconePix from '../../public/iconePix.svg'
import { ReservaType } from "../../types/ReservaType";
import copy from "copy-to-clipboard";
import { toast, ToastContainer } from "react-toastify";


type Props = {
    reserva: ReservaType;
}

const Reserva = ({ reserva }: Props) => {
    const api = useApi();
    const [imagemQrCode, setImagemQrCode] = useState('');
    const [qrCode, setQrCode] = useState('');
    const route = useRouter();
    const [carregando, setCarregando] = useState<boolean>(false);

    useEffect(() => {
        if (reserva.status == 'Reservado' && reserva.txid != null) {
            verificaTxid();
        }
    }, [])

    const verificaTxid = async () => {
        setCarregando(true);
        if (reserva.txid != "") {
            const resposta = await api.geraQrCodePix(reserva.txid);
            if (resposta.qrcode) {
                setCarregando(false);
                setImagemQrCode(resposta.qrcode.imagemQrcode)
                setQrCode(resposta.qrcode.qrcode)
            }
            setCarregando(false);
        } else {
            setCarregando(false);
        }
    }

    const geraCobrancaPix = async () => {
        setCarregando(true);
        const resposta = await api.geraCobrancaPix(reserva);
        if (resposta.qrcode) {
            setCarregando(false);
            setImagemQrCode(resposta.qrcode.imagemQrcode)
            setQrCode(resposta.qrcode.qrcode)
        } else {
            toast.error('Ocorreu algum erro, tente novamente mais tarde.', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            setCarregando(false);

        }
    }
    const copyToClipboard = () => {
        copy(qrCode);
        toast.success('Codigo QR Code copiado com sucesso!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }

    return (
        <>
            <ToastContainer />
            <div className={`py-5 h-50 px-5 ${reserva.status == 'Reservado' ? 'bgPrimary' : 'bg-green-500'} mx-auto text-white`}>
                <Link href={'/'}>
                    <a className="text-white navbar-brand"><img className='d-inline-block align-text-top' src='/logoTicket.png' width={30} height={30} /> Rifaweb</a>
                </Link>
                <div className="container">
                    <div className="row">
                        <div className="text-start col-12 col-lg-7 col-xl-6 mr-auto mb-8 mb-lg-0 mt-4">
                            <h1 className="font-bold text-4xl md:text-5xl">{reserva.status == 'Reservado' ? 'A sua reserva foi confirmada com sucesso.' : 'O seus números já foram pagos!'} </h1>
                            <p className="mt-4">{reserva.status == 'Reservado' ? 'Agora é só efetuar o pagamento para participar.' : 'Agora é só esperar a data do sorteio. Boa sorte!'}</p>
                        </div>

                        <div className="col-12 col-lg-5 col-xl-5 text-center">
                            <Image className="stroke-cyan-500" src={checkIcon} color={'black'} height={200} width={200}></Image>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">

                {/* AVISO */}
                {reserva.status == 'Reservado' &&
                    <div className="bg-red-500 border-t-4 border-red-900 rounded-b text-white px-4 py-3 shadow-md mt-3" role="alert">
                        <div className="flex ">
                            <div className="py-1"><svg className="fill-current h-6 w-6 text-white mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg></div>
                            <div>
                                <p className="font-bold">Atenção</p>
                                <p className="text-lg font-mono">Garanta seu número efetuando o pagamento em até 24 hora(s). Caso contrario seus numeros serão expirados.</p>
                            </div>
                        </div>
                    </div>
                }

                {/* INFORMAÇÕES DA RESERVA */}
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-8">
                        <div className="px-2 py-6 sm:px-0">
                            <div className="card shadow-md shadow-blue-200 p-4">
                                <h3><i className="bi bi-info-circle mr-2"></i>{reserva.status == 'Reservado' ? 'Informações da reserva.' : 'Pedido Pago.'} </h3>
                                <div className="row mt-3">
                                    <div className="col-sm-4 col-md-4 col-lg-6">
                                        <span>Participante:</span>
                                    </div>
                                    <div className="col-sm-4 col-md-4 col-lg-6">
                                        <span>{reserva.nome}</span>
                                    </div>
                                </div>
                                <div className="row mt-5">
                                    <div className="col-sm-4 col-md-4 col-lg-6">
                                        <span>Telefone:</span>
                                    </div>
                                    <div className="col-sm-4 col-md-4 col-lg-6">
                                        <span>{reserva.numero_celular}</span>
                                    </div>
                                </div>
                                <div className="row mt-5">
                                    <div className="col-sm-4 col-md-4 col-lg-6">
                                        <span>Valor total:</span>
                                    </div>
                                    <div className="col-sm-4 col-md-4 col-lg-6 text-green-600 text-lg font-semibold">
                                        <span>R$ {reserva.valor_total}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-12 col-md-12 col-lg-4">
                        <div className="px-2 py-6 sm:px-0">
                            <div className="card shadow-md shadow-blue-200 p-4">
                                <h3><i className="text-blue-800 bi bi-ticket-perforated"></i> {reserva.status == 'Reservado' ? 'Números reservados.' : 'Números pagos.'} </h3>
                                <div className="row mt-3">
                                    <div className="col-sm-12 col-md-12">
                                        {reserva.numeros.map((numero, index) => (
                                            <label key={index} className={`text-center rounded-lg h-10 w-20 cursor-pointer ${reserva.status == 'Reservado' ? 'bg-yellow-400' : 'bg-green-500 text-white'} p-2 m-1`}>{numero.numero}</label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {!carregando ?
                    (<div className="flex items-center mx-auto">
                        <div className="flex-col">
                            <div className="px-2 py-6 sm:px-0">
                                {imagemQrCode == "" && reserva.status == 'Reservado' &&
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
                            </div>
                        </div>
                    </div>
                    ) : (
                        <div className="flex justify-center items-center flex-col mx-auto p-4 relative">
                            <div className="text-9xl text-[#1a2e59] animate-spin bi bi-arrow-repeat"></div>
                        </div>
                    )
                }


                {imagemQrCode != "" && reserva.status == 'Reservado' &&
                    <div className="flex justify-center items-center flex-col mx-auto shadow p-4 relative">
                        <h4 className="text-2xl"><i className="bi bi-qr-code-scan"></i> Leia o QR Code abaixo utilizando o app do seu banco escolhendo a opção PIX ou copie a chave de pagamento.</h4>
                        <div className="flex-row mt-3">
                            <input type="text" className="w-60 md:w-72 h-10 rounded-r-sm form-input border-green-500 mx-auto text-green-500" defaultValue={qrCode} readOnly />
                            <button onClick={copyToClipboard} className="botao botao-sucesso h-10">Copiar</button>
                        </div>
                        <img src={imagemQrCode} />
                    </div>
                }
            </div>

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