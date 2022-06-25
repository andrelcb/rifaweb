import { GetServerSideProps } from "next"
import { Router, useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring"
import { useEffect, useState } from "react"
import { ToastContainer } from "react-toastify"
import { LayoutAdmin } from "../../../components/LayoutAdmin"
import { useApi } from "../../../hooks/useApi"
import { Rifa } from "../../../types/Rifa"
import { parseCookies } from 'nookies'
import { getAPIClient } from "../../../hooks/axios"
import { useForm } from "react-hook-form"
import { tabRifa } from "../../../utils/tabEditarRifa"

type Props = {
    rifa: Rifa[]
}
const editarRifa = ({ rifa }: Props) => {
    const { register, handleSubmit, control } = useForm()
    const [openTab, setOpenTab] = useState(1);
    const route = useRouter();

    return (
        <LayoutAdmin>
            <>
                <ToastContainer />
                <div className="bg-white shadow mb-5 p-3">
                    <h1>Editar Rifa</h1>
                    <h5 className="fs-12px text-black-50 mb-4">Gerencie suas rifas, com a praticidade que só a rifaweb te oferece.</h5>
                </div>
                {rifa.length === 0 ?
                    <span className="fs-4 block text-center alert alert-info">Não foi encontrado nenhuma rifa</span>
                    :
                    <>
                        <div className="flex flex-wrap">
                            <div className="w-full">
                                <ul className="flex mb-0 list-none pt-3 pb-4 flex-col md:flex-row">
                                    {tabRifa.map((tab) => (
                                        <li key={tab.tab} className="-mb-px mt-2 md:mr-2 last:mr-0 flex-auto text-center">
                                            <a className={`text-xs cursor-pointer no-underline font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal
                                                    ${(openTab === tab.tab ? "text-white bg-[#1759ff]" : "text-bg-[#1759ff] bg-white")}`}

                                                onClick={e => { e.preventDefault(); setOpenTab(tab.tab); }}>
                                                {tab.nome}
                                            </a>
                                        </li>
                                    ))}
                                </ul>

                                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                                    <div className="px-4 py-5 flex-auto">
                                        <div className="tab-content tab-space">
                                            <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                                <form>
                                                    <div className="grid grid-cols-6 gap-6">
                                                        <div className="col-span-6 sm:col-span-3">
                                                            <label htmlFor="tituloRifa" className="block text-sm font-medium text-gray-700">Título da rifa</label>
                                                            <input
                                                                {...register('nome')}
                                                                required
                                                                placeholder="Exemplo: IPHONE 13 PRO MAX"
                                                                type="text"
                                                                defaultValue={rifa[0].nome}
                                                                autoComplete="given-name"
                                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-400 rounded-md"
                                                            />
                                                        </div>

                                                        <div className="col-span-6 sm:col-span-3">
                                                            <label htmlFor="linkRifa" className="block text-sm font-medium text-gray-700">Link da rifa</label>
                                                            <input
                                                                {...register('linkRifa')}
                                                                required
                                                                placeholder="Exemplo: iphone-13-pro-max"
                                                                type="text"
                                                                defaultValue={rifa[0].link_rifa}
                                                                autoComplete="family-name"
                                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-400 rounded-md"
                                                            />
                                                        </div>

                                                        <div className="col-span-6 sm:col-span-3">
                                                            <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição</label>
                                                            <textarea
                                                                {...register('descricao')}
                                                                required
                                                                defaultValue={rifa[0].descricao}
                                                                autoComplete="regulamento"
                                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-400 rounded-md"
                                                            />
                                                        </div>
                                                        <div className="col-span-6 sm:col-span-3">
                                                            <label htmlFor="regulamento" className="block text-sm font-medium text-gray-700">Regulamento</label>
                                                            <textarea
                                                                {...register('regulamento', { required: "Esse campo é obrigatorio" })}
                                                                required
                                                                defaultValue={rifa[0].regulamento}
                                                                autoComplete="regulamento"
                                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-400 rounded-md"
                                                            />
                                                        </div>

                                                        <div className="col-span-6 sm:col-span-3">
                                                            <label htmlFor="categoriaId" className="block text-sm font-medium text-gray-700">Categoria</label>
                                                            <select
                                                                {...register('categoriaId', { required: "Esse campo é obrigatorio" })}
                                                                required
                                                                autoComplete="categoria-nome"
                                                                className="mt-1 block w-full py-2 px-3 border border-gray-400 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                                <option value="">Selecione a categoria</option>
                                                            </select>
                                                        </div>
                                                        <div className="col-span-6 sm:col-span-3"></div>
                                                        <div className="col-span-6 sm:col-span-3">
                                                            <label htmlFor="quantidadeNumeros" className="block text-sm font-medium text-gray-700">Quantide de numeros</label>
                                                            <select
                                                                {...register('quantidadeNumeros', { required: "Esse campo é obrigatorio" })}
                                                                required
                                                                autoComplete="quantidadeNumeros"
                                                                className="mt-1 block w-full py-2 px-3 border border-gray-500 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                            >
                                                                <option defaultValue={rifa[0].quantidade_numeros}>{rifa[0].quantidade_numeros}</option>
                                                            </select>
                                                        </div>
                                                        <div className="col-span-6 sm:col-span-3">
                                                            <label htmlFor="valorNumero" className="block text-sm font-medium text-gray-700">Valor de cada número</label>
                                                            <div className="mt-1 flex rounded-md shadow-sm">
                                                                <span className="inline-flex items-center px-3 rounded-l-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">R$</span>
                                                                <input
                                                                    {...register('valorNumero', { required: "Esse campo é obrigatorio" })}
                                                                    required
                                                                    type="number"
                                                                    placeholder="Valor"
                                                                    defaultValue={rifa[0].valor_numero}
                                                                    autoComplete="valorNumero"
                                                                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none sm:text-sm border-gray-300"
                                                                />
                                                                <span className="inline-flex items-center px-3 rounded-r-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">,00</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="px-4 mt-5 text-right sm:px-6">
                                                        <button type="submit" className={"btn btn-primary inline-flex justify-center px-4"}> Atualizar Rifa</button>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                                <p>
                                                    Completely synergize resource taxing relationships via
                                                    premier niche markets. Professionally cultivate one-to-one
                                                    customer service with robust ideas.
                                                    <br />
                                                    <br />
                                                    Dynamically innovate resource-leveling customer service for
                                                    state of the art customer service.
                                                </p>
                                            </div>
                                            <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                                                <p>
                                                    Efficiently unleash cross-media information without
                                                    cross-media value. Quickly maximize timely deliverables for
                                                    real-time schemas.
                                                    <br />
                                                    <br /> Dramatically maintain clicks-and-mortar solutions
                                                    without functional solutions.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </>
        </LayoutAdmin>
    )
}

export default editarRifa

interface Params extends ParsedUrlQuery {
    link: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    // usa contexto para verificar a autenticação dos nookies via server side
    const apiClient = getAPIClient(context);
    const { 'rifaAuthToken': token } = parseCookies(context);
    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }
    const { id } = context.params as Params;

    //busca rifa
    const resposta = await apiClient.get(`/rifa/${id}`);
    const rifas: Rifa[] = resposta.data.rifas;

    return {
        props: {
            rifa: rifas,
        }
    }
}