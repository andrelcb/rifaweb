import { useContext } from "react";
import { LayoutAdmin } from "../../components/LayoutAdmin";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { GetServerSideProps } from "next";
import { parseCookies } from 'nookies'
import { getAPIClient } from "../../hooks/axios";
import { Rifa } from "../../types/Rifa";
import { RifaItem } from "../../components/RifaItem";
import { Pedidos } from "../../types/Pedidos";


type Props = {
    rifa: Rifa[],
    pedidos: Pedidos[]
}
const Admin = ({ rifa, pedidos }: Props) => {
    const auth = useContext(AuthContext);

    return (
        <LayoutAdmin>
            <>
                <div className="bg-white shadow mb-5 p-5">
                    <h2>Olá {auth.usuario?.nome}</h2>
                    <h5 className="fs-12px text-black-50 mb-4">Bem vindo ao jeito mais prático e barato de criar sua rifa.</h5>
                </div>


                {/* transforma em component futuramente */}
                <div className="mx-auto p-8 mt-8 grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8 text-white">
                    <div className="p-6 text-center bgPrimary rounded-xl shadow-lg flex items-center space-x-4">
                        <h3><i className="bi bi-ticket-perforated"></i></h3>
                        <h3>Quantidade de rifas</h3>
                        <h3>{rifa.length}</h3>
                    </div>
                    <div className="p-6 text-center bg-blue-800 rounded-xl shadow-lg flex items-center space-x-4">
                        <h3><i className="bi bi-bag"></i></h3>
                        <h3>Pedidos Totais</h3>
                        <h3>0</h3>
                    </div>
                    <div className="p-6 text-center bg-yellow-500 rounded-xl shadow-lg flex items-center space-x-4">
                        <h3><i className="bi bi-bag"></i></h3>
                        <h3>Pedidos reservados</h3>
                        <h3>0</h3>
                    </div>
                </div>
                <div className="mx-auto p-8 shadow-lg">
                    <h3>Minhas rifas</h3>

                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8">
                        {rifa.map((rifaItem, index) => (
                            <RifaItem key={index} nomeBotao="Editar" link={`/admin/editar-rifa/${rifaItem.id}`} dados={{ imagensRifas: rifaItem.imagensRifas[0], nome: rifaItem.nome, nome_criador: rifaItem.nome_criador, id: rifaItem.id, link_rifa: rifaItem.link_rifa, valor_numero: rifaItem.valor_numero }} />
                        ))}
                    </div>
                </div>

                <div className="mx-auto mt-10 mb-8 p-8 shadow-lg">
                    <h3>Ultimos pedidos</h3>

                    <div className="flex flex-col">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
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
                                            {pedidos.map((pedido) => (
                                                <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-300">
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
                                                        <span className={` text-center px-3 rounded-md ${pedido.status == 'Pago' ? 'bg-success' : 'bg-warning'} p-2 text-white font-bold`}>{pedido.status}</span>
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
    const respostaPedidos = await apiClient.get(`/buscar-pedidos`);
    const pedidos: Pedidos[] = respostaPedidos.data.pedidos;

    return {
        props: {
            rifa: rifas,
            pedidos: pedidos
        }
    }

}