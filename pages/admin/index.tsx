import { useContext, useEffect, useState } from "react";
import { LayoutAdmin } from "../../components/LayoutAdmin";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { GetServerSideProps } from "next";
import { parseCookies } from 'nookies'
import { getAPIClient } from "../../hooks/axios";
import { Rifa } from "../../types/Rifa";
import { Pedidos } from "../../types/Pedidos";
import Link from "next/link";
import { RifaCard } from "../../components/admin/RifaCard";
import { Modal } from "../../components/Modal";
import { useForm } from "react-hook-form";
import { PremioType } from "../../types/PremioType";
import { useApi } from "../../hooks/useApi";
import { toast } from "react-toastify";
import { Alerta } from "../../components/Alerta";


type Props = {
    rifa: Rifa[],
    pedidos: Pedidos
}

type formData = {
    premio: {
        idPremio: number,
        numero: string
    }[],
    concurso: string
}
const Admin = ({ rifa, pedidos }: Props) => {
    const auth = useContext(AuthContext);
    const api = useApi();
    const [rifas, setRifas] = useState<Array<Rifa>>(rifa)
    const [rifaFinalizada, setRifaFinalizada] = useState<Array<string>>([]);
    const [rifaAtivo, setRifaAtivo] = useState<Array<string>>([]);
    const [carregando, setCarregando] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [idRifa, setIdRifa] = useState<number>();
    const [premiosRifa, setPremiosRifa] = useState<Array<PremioType>>();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<formData>();

    useEffect(() => {
        rifaStatus();
    }, [])

    const rifaStatus = () => {
        let rifaAtivoTemp = [...rifaAtivo];
        rifa.forEach((rifa) => {
            if (rifa.status == 'Ativo') {
                rifaAtivoTemp.push(rifa.status);
            }

            setRifaAtivo(rifaAtivoTemp);
        })

        let rifasFinalizadasTemp = [...rifaFinalizada];
        rifa.forEach((rifa) => {
            if (rifa.status == 'Finalizado') {
                rifasFinalizadasTemp.push(rifa.status);
            }

            setRifaFinalizada(rifasFinalizadasTemp);
        })
    }

    const finalizarRifa = async (data: formData) => {
        if (data && idRifa) {
            const resposta = await api.finalizarRifa(idRifa, data);
            if (resposta.erro === "") {
                setShowModal(false);
                if (resposta.sorteado) {
                    toast.success(resposta.sorteado);
                    const respostaRifa = await api.buscaRifaPorUsuario();
                    if (respostaRifa.rifas) {
                        setRifas(respostaRifa.rifas);
                    }
                }

            } else {
                toast.error(resposta.erro);
            }
        }
    }

    const buscaPremiosRifa = async (id: number) => {
        setShowModal(true)
        if (id) {
            setIdRifa(id);
            setCarregando(true);
            const resposta = await api.buscaPremioRifa(id);
            if (resposta.premioRifa) {
                setValue('premio', [])
                setPremiosRifa(resposta.premioRifa);
                setCarregando(false);
            }
        } else {
            toast.error('Entrar em contato com a rifaweb.')
        }
    }

    return (
        <LayoutAdmin>
            <>
                <Alerta />
                <div className="bg-white shadow mb-5 p-5">
                    <h2>Olá {auth.usuario?.nome}</h2>
                    <h5 className="fs-12px text-black-50 mb-4">Bem vindo ao jeito mais prático e barato de criar sua rifa.</h5>
                </div>


                {/* transforma em component futuramente */}
                <div className="mx-auto p-2 lg:p-8 grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8 text-white">
                    <div className="p-6 text-center bgPrimary rounded-xl shadow-lg flex items-center space-x-4">
                        <h3><i className="bi bi-ticket-perforated"></i></h3>
                        <h3>Rifas Ativas</h3>
                        <h3>{rifaAtivo.length}</h3>
                    </div>
                    <div className="p-6 text-center bg-red-600 rounded-xl shadow-lg flex items-center space-x-4">
                        <h3><i className="bi bi-ticket-perforated"></i></h3>
                        <h3>Rifas Finalizadas</h3>
                        <h3>{rifaFinalizada.length}</h3>
                    </div>
                </div>
                {rifa.length > 0 ?
                    (
                        <>
                            <div className="mx-auto p-8 shadow">
                                <h3>Minhas rifas</h3>

                                <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8">
                                    {rifas?.map((rifaItem, index) => (
                                        <RifaCard
                                            buscaPremiosRifa={() => buscaPremiosRifa(rifaItem.id)}
                                            key={index}
                                            nomeBotao="Editar"
                                            link={`/admin/editar-rifa/${rifaItem.id}`}
                                            rifa={rifaItem} />
                                    ))}
                                </div>
                            </div>
                            {/* FINALIZAR RIFA */}
                            <Modal
                                tipo="submit"
                                carregando={carregando}
                                handleSubmit={handleSubmit(finalizarRifa)}
                                titulo="Finalizar Rifa"
                                showModal={showModal}
                                closeModal={() => setShowModal(false)}>
                                {carregando
                                    ?
                                    (<div className="mx-auto flex justify-center z-40">
                                        <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                                            <span className="visually-hidden">Carregando...</span>
                                        </div>
                                    </div>)
                                    :
                                    (<div className="flex flex-col">
                                        <div className="alert alert-warning shadow-md">
                                            Todos os premios precisam ter um ganhador. Os resultados são baseado na Loteria Federal.
                                        </div>
                                        {premiosRifa?.map((premio, index) => (
                                            <div key={index} className="flex flex-col mt-4">
                                                <input
                                                    {...register(`premio.${index}.idPremio`)}
                                                    type="hidden"
                                                    defaultValue={premio.id}
                                                />
                                                <label htmlFor="premio">{premio.ordem}º Resultado Loteria Federal</label>
                                                <input
                                                    {...register(`premio.${index}.numero`, {
                                                        required: 'Digite o numero ganhador da Loterial Federal',

                                                    })}
                                                    className="form-control"
                                                    placeholder={'Premio: ' + premio.nome_premio}
                                                    type="text" />
                                                {errors.premio?.[index] ? <p className="text-red-600">Preencha o {premio.ordem}º Resultado Loteria Federal</p> : null}
                                            </div>
                                        ))}
                                        <div className="flex flex-col mt-4">
                                            <label htmlFor="concurso">Concurso Loteria Federal</label>
                                            <input
                                                {...register('concurso', {
                                                    required: 'Digite o concurso da Loterial Federal.',
                                                    validate: {
                                                        required: (value) => { return !!value.trim() }
                                                    }
                                                })}
                                                className="form-control"
                                                placeholder="EX: 5426"
                                                type="text" />
                                            {errors.concurso && errors.concurso.type === "required" ? <p className="text-red-600">Preencha o valor da promoção</p> : null}
                                        </div>
                                    </div>)
                                }

                            </Modal>
                            {pedidos.data.length > 0 &&
                                <div className="mx-auto mt-10 mb-8 p-8 shadow-lg">
                                    <h3>Ultimos pedidos</h3>

                                    <div className="flex flex-col">
                                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                            <div className="py-3 inline-block min-w-full ">
                                                <div className="overflow-hidden">
                                                    <table className="min-w-full">
                                                        <thead className="bg-white border-b">
                                                            <tr>
                                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                    Rifa
                                                                </th>
                                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                    Cliente
                                                                </th>
                                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                    Data
                                                                </th>
                                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                    Numeros
                                                                </th>
                                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                    Status
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {pedidos.data.map((pedido, index) => (
                                                                <tr key={index} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-300">
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                        {pedido.nomeRifa}
                                                                    </td>
                                                                    <td className="flex flex-col text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                                                        <span>{pedido.nomeCliente}</span>
                                                                        <a className="no-underline"
                                                                            target={'_blank'}
                                                                            href={`https://api.whatsapp.com/send?phone=55${pedido.numeroCelular}&text=Ol%C3%A1%2C%20tudo%20bem ${pedido.nomeCliente}%3F%20vi%20que%20voc%C3%AA%20reservou%20um%20numero%20da%20minha%20rifa%2C%20precisa%20de%20ajuda%20para%20realizar%20o%20pagamento%3F`}><i className="text-green-600 bi bi-whatsapp inline-flex"></i> {pedido.numeroCelular}</a>
                                                                    </td>
                                                                    <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                                                        {pedido.dataCadastro}
                                                                    </td>
                                                                    <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                                                        {pedido.numeros}
                                                                    </td>
                                                                    <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                                                        <span className={`numero text-white ${pedido.statusPedido == 'Pago' ? 'bg-green-500' : 'bg-yellow-400'}`}>{pedido.statusPedido}</span>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </>
                    )
                    :
                    (
                        <div className="flex flex-row space-x-5 mx-auto mt-8 text-black shadow-md border-2 border-red-600 p-10 rounded-md">
                            <h3 className="text-2xl">Você ainda não possui nenhuma rifa.</h3>
                            <Link href='/admin/criar-rifa'>
                                <button className="botao botao-sucesso">Criar Rifa</button>
                            </Link>
                        </div>
                    )
                }

            </>
        </LayoutAdmin>
    )
}

export default Admin;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { 'rifaAuthToken': token } = parseCookies(context);
    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }
    const apiClient = getAPIClient(context);
    //busca rifa
    const resposta = await apiClient.get(`/rifas`);
    const rifas: Rifa[] = resposta.data.rifas;

    //busca ultimos pedidos
    const respostaPedidos = await apiClient.get(`/pedidos`);
    const pedidos: Pedidos = respostaPedidos.data.pedidos;

    return {
        props: {
            rifa: rifas,
            pedidos: pedidos
        }
    }

}