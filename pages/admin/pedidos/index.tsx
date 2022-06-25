import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { ChangeEvent, useEffect, useState } from "react";
import { LayoutAdmin } from "../../../components/LayoutAdmin"
import { getAPIClient } from "../../../hooks/axios";
import { useApi } from "../../../hooks/useApi";
import { Pedidos } from "../../../types/Pedidos";
import { Rifa } from "../../../types/Rifa";
import { status } from "../../../utils/status";
import Pagination from "react-js-pagination";

type Props = {
    rifa: Rifa[],
}

const PedidosPagina = ({ rifa }: Props) => {
    const api = useApi();
    const [rifaFiltro, setRifaFiltro] = useState<string>();
    const [statusFiltro, setStatusFiltro] = useState<string>();

    const [pedidos, setPedidos] = useState<Pedidos>();

    const [carregando, setCarregando] = useState<boolean>(false);

    useEffect(() => {
        buscaPedidos()

    }, [statusFiltro, rifaFiltro])

    const buscaPedidos = async (page: number = 1) => {
        //busca ultimos pedidos
        const params = { page: page, rifasId: rifaFiltro, statusPedido: statusFiltro }
        setCarregando(true);
        const respostaPedidos = await api.buscaPedidos(params);
        if (respostaPedidos) {
            if (respostaPedidos.pedidos.data.length > 0) {
                setPedidos(respostaPedidos.pedidos);
            } else {
                setPedidos(respostaPedidos.pedidos);

            }
        }
        setCarregando(false);
    }

    return (
        <LayoutAdmin>
            <>
                <div className="bg-white shadow mb-5 p-3">
                    <h1>Meus pedidos</h1>
                    <h5 className="fs-12px text-black-50 mb-4">Todos os pedidos.</h5>
                </div>

                {/* pedidos */}
                <div className="mx-auto mt-10 mb-8 p-8 shadow-lg">
                    <h2><i className="bi bi-filter"></i>Filtrar pedidos</h2>
                    <form>
                        <div className="flex flex-col md:flex-row gap-2 py-4">
                            <div className="basis-1/4">
                                <label htmlFor="status" className="block font-medium text-gray-700">Status</label>
                                <select id="status" className="form-control" onChange={(e: ChangeEvent<HTMLSelectElement>) => setStatusFiltro(e.target.value)}>
                                    <option value={""}>Todos</option>
                                    {status.map((status, index) => (
                                        <option key={index} value={status}>{status}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="basis-1/4">
                                <label htmlFor="status" className="block font-medium text-gray-700">Rifa</label>
                                <select className="form-control" name="rifaId" onChange={(e: ChangeEvent<HTMLSelectElement>) => setRifaFiltro(e.target.value)}>
                                    <option value={""}>Todos</option >
                                    {rifa.map((rifa) => (
                                        <option key={rifa.id} value={rifa.id}>{rifa.nome}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </form>

                    {!carregando ?
                        <div className="flex flex-col">
                            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="py-3 inline-block min-w-full ">
                                    <div className="overflow-hidden">
                                        <table className="min-w-full table-auto">
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
                                                {pedidos?.data.map((pedido, index) => (
                                                    <tr key={index} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-300">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            {pedido.nomeRifa}
                                                        </td>
                                                        <td className="flex flex-col text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                                            <span>{pedido.nomeCliente}</span>
                                                            <span><i className="text-green-600 bi bi-whatsapp"></i> {pedido.numeroCelular}</span>
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
                                                {pedidos?.data.length === 0 &&
                                                    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-300">
                                                        <td className="text-center px-6 py-4 whitespace-nowrap text-sm font-medium text-red-500">
                                                            Não foi encotrado pedidos. Tente outro filtro.
                                                        </td>
                                                    </tr>
                                                }
                                            </tbody>
                                        </table>
                                        <div className="flex mt-4 justify-center">
                                            {pedidos && pedidos.data.length > 0 &&
                                                <Pagination
                                                    activePage={pedidos.current_page}
                                                    totalItemsCount={pedidos.total}
                                                    itemsCountPerPage={pedidos.per_page}
                                                    onChange={(numeroPagina) => buscaPedidos(numeroPagina)}
                                                    itemClass={'page-item'}
                                                    linkClass={'page-link'}
                                                    firstPageText="Primeira Página"
                                                    lastPageText={"Última Página"}
                                                />}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="mx-auto flex justify-center">
                            <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                                <span className="visually-hidden">Carregando...</span>
                            </div>
                        </div>
                    }
                </div>
            </>
        </LayoutAdmin>
    )
}

export default PedidosPagina;

export const getServerSideProps: GetServerSideProps = async (context) => {
    // usa contexto para verificar a autenticação dos nookies via server side
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
    return {
        props: {
            rifa: rifas,
        }
    }
}