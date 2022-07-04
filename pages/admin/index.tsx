import { useContext } from "react";
import { LayoutAdmin } from "../../components/LayoutAdmin";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { GetServerSideProps } from "next";
import { parseCookies } from 'nookies'
import { getAPIClient } from "../../hooks/axios";
import { Rifa } from "../../types/Rifa";
import { RifaItem } from "../../components/RifaItem";
import { Pedidos } from "../../types/Pedidos";
import Link from "next/link";


type Props = {
    rifa: Rifa[],
    pedidos: Pedidos
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
                <div className="mx-auto p-2 lg:p-8 grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8 text-white">
                    <div className="p-6 text-center bgPrimary rounded-xl shadow-lg flex items-center space-x-4">
                        <h3><i className="bi bi-ticket-perforated"></i></h3>
                        <h3>Quantidade de rifas</h3>
                        <h3>{rifa?.length}</h3>
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
                {rifa.length > 0 ?
                    (
                        <>
                            <div className="mx-auto p-8 shadow-lg">
                                <h3>Minhas rifas</h3>

                                <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8">
                                    {rifa?.map((rifaItem, index) => (
                                        <RifaItem
                                            key={index}
                                            nomeBotao="Editar"
                                            link={`/admin/editar-rifa/${rifaItem.id}`}
                                            rifa={rifaItem} />
                                    ))}
                                </div>
                            </div>
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
                        <div className="flex mx-auto mt-8 text-white items-center">
                            <div className="shadow-2xl bg-red-700 text-white p-6 rounded-xl flex items-center space-x-4">
                                <h3 className="text-2xl">Você ainda não possui nenhuma rifa.</h3>
                                <Link href='/admin/criar-rifa'>
                                    <button className="botao botao-sucesso">Criar Rifa</button>
                                </Link>
                            </div>
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