import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import { LayoutAdmin } from "../../../components/LayoutAdmin"
import { useApi } from "../../../hooks/useApi";
import { CategoriaRifa } from "../../../types/CategoriaRifa";
import { quantidadeNumero } from "../../../utils/quantidadeDeNumeros";
import Router from "next/router";
import { parseCookies } from 'nookies'

type Props = {
    categoriaRifa: CategoriaRifa[]
}

interface ImageRifa {
    name: string
}

type FormValues = {
    nome: string,
    linkRifa: string,
    regulamento: string,
    descricao: string,
    categoriaId: string,
    quantidadeNumeros: string,
    numeroWhatsapp: string,
    valorNumero: string,
    imagemRifa: Array<File>,
    nome_premio: {
        premio: string
    }[];
}

const CriarRifa = ({ categoriaRifa }: Props) => {
    const { register, handleSubmit, control } = useForm<FormValues>({
        defaultValues: {
            nome: '',
            linkRifa: '',
            regulamento: '',
            descricao: '',
            categoriaId: '',
            quantidadeNumeros: '',
            numeroWhatsapp: '',
            valorNumero: '',
            imagemRifa: [],
            nome_premio: [{ premio: "" }]
        }

    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "nome_premio"
    });

    const api = useApi()
    const [carregando, setCarregando] = useState<boolean>(false);

    const cadastraRifa = async (data: FormValues) => {
        const imagens = data.imagemRifa;
        const formData = new FormData();
        formData.append('nome', data.nome);
        formData.append('linkRifa', data.linkRifa);
        formData.append('descricao', data.descricao);
        formData.append('regulamento', data.regulamento);
        formData.append('categoriaId', data.categoriaId);
        formData.append('quantidadeNumeros', data.quantidadeNumeros);
        formData.append('numeroWhatsapp', data.numeroWhatsapp);
        formData.append('valorNumero', data.valorNumero);
        data.nome_premio.forEach(element => {
            formData.append('nome_premio[]', element.premio);
        });
        for (let i = 0; i < imagens.length; i++) {
            formData.append("imagemRifa[]", imagens[i])
        }

        if (data) {
            setCarregando(true);
            const resposta = await api.cadastrarRifa(formData);
            console.log(resposta);
            if (resposta.erro === "") {
                setCarregando(false);
                toast.success("Rifa cadastrada com sucesso!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                Router.push(`/admin/editar-rifa/${resposta.rifa.id}`)
            } else {
                setCarregando(false);
                toast.error(resposta.erro, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } else {
            toast.error("Preencha os campos", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return (
        <LayoutAdmin>
            <>
                <ToastContainer />
                <div className="bg-white shadow mb-5 p-3">
                    <h1>Criar nova rifa</h1>
                    <h5 className="fs-12px text-black-50 mb-4">Crie suas rifas sem pagar nada. Com as menores taxas do brasil.</h5>
                </div>

                <div className="mt-10 sm:mt-0">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="mt-1 md:mt-0 md:col-span-3">
                            <form onSubmit={handleSubmit(cadastraRifa)}>
                                <div className="shadow overflow-hidden sm:rounded-md">
                                    <div className="px-4 py-5 bg-white sm:p-6">
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="tituloRifa" className="block text-sm font-medium text-gray-700">Título da rifa</label>
                                                <input
                                                    {...register('nome')}
                                                    required
                                                    placeholder="Exemplo: IPHONE 13 PRO MAX"
                                                    type="text"
                                                    name="nome"
                                                    id="nome"
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
                                                    name="linkRifa"
                                                    id="linkRifa"
                                                    autoComplete="family-name"
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-400 rounded-md"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição</label>
                                                <textarea
                                                    {...register('descricao')}
                                                    required
                                                    name="descricao"
                                                    id="descricao"
                                                    autoComplete="regulamento"
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-400 rounded-md"
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="regulamento" className="block text-sm font-medium text-gray-700">Regulamento</label>
                                                <textarea
                                                    {...register('regulamento', { required: "Esse campo é obrigatorio" })}
                                                    required
                                                    name="regulamento"
                                                    id="regulamento"
                                                    autoComplete="regulamento"
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-400 rounded-md"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="categoriaId" className="block text-sm font-medium text-gray-700">Categoria</label>
                                                <select
                                                    {...register('categoriaId', { required: "Esse campo é obrigatorio" })}
                                                    required
                                                    id="categoriaId"
                                                    name="categoriaId"
                                                    autoComplete="categoria-nome"
                                                    className="mt-1 block w-full py-2 px-3 border border-gray-400 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                    <option value="">Selecione a categoria</option>
                                                    {categoriaRifa.map((categoria, index) => (
                                                        <option key={index} value={categoria.id}>{categoria.nome}</option>
                                                    ))}
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
                                                    <option value="">Selecione a quantidade de numeros</option>
                                                    {quantidadeNumero.map((numero, index) => (
                                                        <option key={index} value={numero.quantidade}>{numero.texto}</option>
                                                    ))}
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
                                                        name="valorNumero"
                                                        id="valorNumero"
                                                        autoComplete="valorNumero"
                                                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none sm:text-sm border-gray-300"
                                                    />
                                                    <span className="inline-flex items-center px-3 rounded-r-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">,00</span>
                                                </div>
                                            </div>

                                            <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700"> Imagens da rifa </label>
                                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                    <div className="space-y-1 text-center">
                                                        {/* <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg> */}
                                                        <div className="flex text-sm text-gray-600">
                                                            <label htmlFor="imagemRifa" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                                <span>Carregar imagem</span>
                                                                <input
                                                                    {...register('imagemRifa', { required: "Esse campo é obrigatorio" })}
                                                                    required
                                                                    type="file"
                                                                    className=""
                                                                    accept="image/*"
                                                                    multiple />
                                                            </label>
                                                            <p className="pl-1">ou arraste e solte</p>
                                                        </div>
                                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                                                <label htmlFor="nome_premio" className="block text-sm font-medium text-gray-700">Premios da rifa</label>
                                                {fields.map((premio, index) => (
                                                    <div key={premio.id} className="mt-2 flex rounded-md shadow-sm">
                                                        <input
                                                            type="text"
                                                            {...register(`nome_premio.${index}.premio`)}
                                                            placeholder={`${index + 1}ª Premio`}
                                                            autoComplete="nome_premio"
                                                            required
                                                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none sm:text-sm border-gray-300"
                                                        />
                                                        <button onClick={() => remove(index)}
                                                            type="button"
                                                            className="inline-flex items-center px-3 rounded-r-md border border-r-0 border-gray-300 bg-red-500 text-white text-sm">remover</button>
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        append({
                                                            premio: ""
                                                        })
                                                    }
                                                    className="btn btn-success mt-2">
                                                    <i className="bi bi-plus-square"></i> Adicionar Premio
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                    <span className="px-3 text-sm mt text-slate-600">Ao criar esta rifa declaro ter lido e concordado com os <a href="">termos de uso</a> da plataforma RifaWeb.</span>
                                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                        <button type="submit" className={carregando ? 'disabled btn btn-primary inline-flex justify-center px-4' : "btn btn-primary inline-flex justify-center px-4"}>{carregando ? 'Carregando..' : 'Criar rifa'}</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        </LayoutAdmin>
    )
}

export default CriarRifa;

interface Params extends ParsedUrlQuery {
    link: string;
}

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

    const api = useApi();

    //busca rifas
    const resposta = await api.buscaCategoriaRifa();
    const categoriaRifa: CategoriaRifa[] = resposta.categoriaRifa;

    return {
        props: {
            categoriaRifa: categoriaRifa,
        }
    }
}