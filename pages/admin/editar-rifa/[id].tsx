import { GetServerSideProps } from "next"
import { Router, useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring"
import { ChangeEvent, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { LayoutAdmin } from "../../../components/LayoutAdmin"
import { useApi } from "../../../hooks/useApi"
import { Rifa } from "../../../types/Rifa"
import { parseCookies } from 'nookies'
import { getAPIClient } from "../../../hooks/axios"
import { useForm } from "react-hook-form"
import { tabRifa } from "../../../utils/tabEditarRifa"
import { CategoriaRifa } from "../../../types/CategoriaRifa"
import { Modal } from "../../../components/Modal"
import { quantidadeNumero } from "../../../utils/quantidadeDeNumeros"
import { Alerta } from "../../../components/Alerta"
import { ToggleButon } from "../../../components/ToggleButon"

type Props = {
    rifa: Rifa[]
    categoriaRifa: CategoriaRifa[]
}

type FormData = {
    nome: string,
    linkRifa: string,
    regulamento: string,
    descricao: string,
    categoriaId: string,
    quantidadeNumeros: string,
    numeroWhatsapp: string,
    valorNumero: string,
    dataFinalSorteio: string,
}

type FormImagem = {
    imagemRifa: Array<File>
}

const editarRifa = ({ rifa, categoriaRifa }: Props) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>()
    const { register: registerImagem, handleSubmit: handleSubmitImagem, formState: { errors: errorsImagem } } = useForm<FormImagem>()
    const { register: registerPremio, handleSubmit: handleSubmitPremio, formState: { errors: errorsPremio } } = useForm()
    const { register: registerPromocao, handleSubmit: handleSubmitPromocao, formState: { errors: errorsPromocao } } = useForm()
    const [openTab, setOpenTab] = useState(1);
    const [rifas, setRifas] = useState<Array<Rifa>>(rifa);
    const [editarLink, setEditarLink] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showModalExcluir, setShowModalExcluir] = useState<boolean>(false);
    const [carregando, setCarregando] = useState<boolean>(false);
    const [images, setImages] = useState<Array<string>>([]);
    const [idImagem, setIdImagem] = useState<number>();
    const [idPremio, setIdPremio] = useState<number>();
    const [idPromocao, setIdPromocao] = useState<number>();
    const [dataSorteio, setDataSorteio] = useState<boolean>();
    const route = useRouter();
    const api = useApi();

    useEffect(() => {
        if (rifa[0].data_final_sorteio) {
            setDataSorteio(true);
        }

    }, [])


    const atualizarRifa = async (data: FormData) => {
        setCarregando(true);
        const resposta = await api.atualizarRifa(rifa[0].id, data);
        if (resposta.erro === "") {
            setCarregando(false);
            toast.success("Rifa atualizada.");
        } else {
            setCarregando(false);
            toast.success(resposta.erro);
        }
    }

    const adicionarImagem = async (data: FormImagem) => {
        setCarregando(true);
        const formData = new FormData();
        for (let i = 0; i < data.imagemRifa.length; i++) {
            formData.append("imagemRifa[]", data.imagemRifa[i])
        }
        const resposta = await api.adicionarImagem(rifa[0].id, formData);
        if (resposta.erro === "") {
            const respostaRifa = await api.buscaRifa(rifa[0].id)
            setRifas(respostaRifa.rifas);
            setShowModal(false);
            toast.success("Imagem Adicionada");
            setCarregando(false);
        } else {
            toast.error(resposta.erro)
            setCarregando(false);
            setShowModal(false);

        }
    }

    const adicionarPremio = async (data: object) => {
        setCarregando(true);
        const resposta = await api.adicionarPremio(rifa[0].id, data);
        if (resposta.erro === "") {
            const respostaRifa = await api.buscaRifa(rifa[0].id)
            setRifas(respostaRifa.rifas);
            setShowModal(false);
            setCarregando(false);
            toast.success("Premio Adicionado");
        } else {
            toast.error(resposta.erro)
            setCarregando(false);
            setShowModal(false);

        }
    }
    const adicionarPromocao = async (data: object) => {
        setCarregando(true);
        const resposta = await api.adicionarPromocao(rifa[0].id, data);
        if (resposta.erro === "") {
            const respostaRifa = await api.buscaRifa(rifa[0].id)
            setRifas(respostaRifa.rifas);
            setShowModal(false);
            setCarregando(false);
            toast.success("Promocao Adicionada");
        } else {
            toast.error(resposta.erro)
            setShowModal(false);
            setCarregando(false);

        }
    }


    const exibeImagem = (e: ChangeEvent<HTMLInputElement>) => {
        const imagens = [];
        if (e.target.files && e.target.files?.length > 0) {
            for (let index = 0; index < e.target.files.length; index++) {
                imagens.push(URL.createObjectURL(e.target.files[index]));

            }
            setImages(imagens);
        }
    }

    const deletarImagem = async () => {
        if (idImagem) {
            setCarregando(true);
            const resposta = await api.deletarImagem(idImagem);
            if (resposta.erro === "") {
                const respostaRifa = await api.buscaRifa(rifa[0].id)
                setRifas(respostaRifa.rifas);
                toast.success('Imagem excluída.')
                setShowModalExcluir(false);
                setCarregando(false);
            } else {
                toast.success(resposta.erro)
                setShowModalExcluir(false);
                setCarregando(false);
            }
        } else {
            console.log('Id não encontrado');
        }

    }
    const deletarPremio = async () => {
        if (idPremio) {
            setCarregando(true);
            const resposta = await api.deletarPremio(rifa[0].id, idPremio);
            if (resposta.erro === "") {
                const respostaRifa = await api.buscaRifa(rifa[0].id)
                setRifas(respostaRifa.rifas);
                toast.success('Premio excluído.')
                setShowModalExcluir(false);
                setCarregando(false);
            } else {
                toast.success(resposta.erro)
                setShowModalExcluir(false);
                setCarregando(false);
            }
        } else {
            console.log('Id não encontrado');
        }

    }
    const deletarPromocao = async () => {
        if (idPromocao) {
            setCarregando(true);
            const resposta = await api.deletarPromocao(idPromocao);
            if (resposta.erro === "") {
                const respostaRifa = await api.buscaRifa(rifa[0].id)
                setRifas(respostaRifa.rifas);
                toast.success('Promoção excluída.')
                setShowModalExcluir(false);
                setCarregando(false);
            } else {
                toast.success(resposta.erro)
                setShowModalExcluir(false);
                setCarregando(false);
            }
        } else {
            console.log('Id não encontrado');
        }

    }

    return (
        <LayoutAdmin>
            <>
                <Alerta />
                <div className="bg-white shadow mb-5 p-3">
                    <h1>Editar Rifa</h1>
                    <h5 className="fs-12px text-black-50 mb-4">Gerencie suas rifas, com a praticidade que só a rifaweb te oferece.</h5>
                </div>
                {!rifa
                    ?
                    <span className="fs-4 block text-center alert alert-info">Não foi encontrado nenhuma rifa</span>
                    :
                    <>
                        <div className="flex flex-wrap">
                            <div className="w-full">
                                <ul className="flex mb-0 list-none pb-4 flex-col md:flex-row ">
                                    {tabRifa.map((tab, index) => (
                                        <li key={index} className="justify-self-center mt-2 md:mr-2 last:mr-0 flex-auto text-center">
                                            <a className={`text-xs cursor-pointer no-underline font-bold uppercase px-5 py-3 shadow rounded block leading-normal
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
                                            <div className={openTab === 1 ? "block" : "hidden"} id="rifa">
                                                <form onSubmit={handleSubmit(atualizarRifa)}>
                                                    <div className="grid grid-cols-6 gap-6">
                                                        <div className="col-span-6 sm:col-span-3">
                                                            <label htmlFor="tituloRifa" className="block text-sm font-medium text-gray-700">Título da rifa</label>
                                                            <input
                                                                {...register('nome', {
                                                                    validate: {
                                                                        required: (value) => { return !!value.trim() }
                                                                    }
                                                                })}
                                                                required
                                                                placeholder="Exemplo: IPHONE 13 PRO MAX"
                                                                type="text"
                                                                defaultValue={rifas[0].nome}
                                                                autoComplete="given-name"
                                                                className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-400 rounded-md ${errors.nome && 'focus:ring-red-500 focus:border-red-500'}`}
                                                            />
                                                            {errors.nome && errors.nome.type === "required" ? <p className="text-red-600">Preencha o titulo da rifa.</p> : null}
                                                        </div>

                                                        <div className="col-span-6 sm:col-span-3">
                                                            <label htmlFor="linkRifa" className="block text-sm font-medium text-gray-700">Link da rifa</label>
                                                            <div className="mt-1 flex shadow-sm">
                                                                <span className="hidden md:inline-flex items-center px-2 rounded-l-md border border-r-0 border-gray-300 bg-gray- text-blue-700 text-sm">https://rifaweb.app/rifa/</span>
                                                                <input
                                                                    {...register('linkRifa', {
                                                                        validate: {
                                                                            required: (value) => { if (!editarLink) return !!value.trim() }
                                                                        }
                                                                    })}
                                                                    placeholder="Exemplo: iphone-13-pro-max"
                                                                    type="text"
                                                                    disabled={editarLink}
                                                                    defaultValue={rifas[0].link_rifa}
                                                                    autoComplete="family-name"
                                                                    className="focus:ring-indigo-500 disabled:bg-gray-300 focus:border-indigo-500 w-full sm:text-sm border border-gray-300"
                                                                />
                                                                <span onClick={() => setEditarLink(!editarLink)} className="inline-flex items-center  px-3 border-gray-300 bg-green-600 text-white cursor-pointer text-sm"><i className="bi bi-pencil-square"></i></span>
                                                            </div>
                                                            {errors.linkRifa && errors.linkRifa.type === "required" ? <p className="text-red-600">Preencha o link da rifa.</p> : null}
                                                        </div>

                                                        <div className="col-span-6 sm:col-span-3">
                                                            <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição</label>
                                                            <textarea
                                                                {...register('descricao', {
                                                                    validate: {
                                                                        required: (value) => { return !!value.trim() }
                                                                    }
                                                                })}
                                                                required
                                                                defaultValue={rifas[0].descricao}
                                                                autoComplete="regulamento"
                                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-400 rounded-md"
                                                            />
                                                        </div>
                                                        <div className="col-span-6 sm:col-span-3">
                                                            <label htmlFor="regulamento" className="block text-sm font-medium text-gray-700">Regulamento</label>
                                                            <textarea
                                                                {...register('regulamento', {
                                                                    validate: {
                                                                        required: (value) => { return !!value.trim() }
                                                                    }
                                                                })}
                                                                required
                                                                defaultValue={rifas[0].regulamento}
                                                                autoComplete="regulamento"
                                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-400 rounded-md"
                                                            />
                                                        </div>

                                                        <div className="col-span-6 sm:col-span-3">
                                                            <label htmlFor="categoriaId" className="block text-sm font-medium text-gray-700">Categoria</label>
                                                            <select
                                                                {...register('categoriaId', {
                                                                    validate: {
                                                                        required: (value) => { return !!value.trim() }
                                                                    }
                                                                })}
                                                                required
                                                                autoComplete="categoria-nome"
                                                                defaultValue={rifas[0].categoria_rifa_idcategoria}
                                                                className="mt-1 block w-full py-2 px-3 border border-gray-400 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                                {categoriaRifa.map((categoria, index) => (
                                                                    <option key={index} value={categoria.id}>{categoria.nome}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className="col-span-6 sm:col-span-3">
                                                            <ToggleButon
                                                                dot={dataSorteio}
                                                                titulo="Data Sorteio"
                                                                onClick={() => { setDataSorteio(!dataSorteio); dataSorteio && setValue('dataFinalSorteio', '') }}
                                                            />
                                                            {dataSorteio &&
                                                                <input
                                                                    {...register('dataFinalSorteio', {
                                                                        validate: {
                                                                            required: (value) => { if (!dataSorteio) { return !!value.trim() } }
                                                                        }
                                                                    })}
                                                                    type="datetime-local"
                                                                    disabled={!dataSorteio}
                                                                    name="dataFinalSorteio"
                                                                    id="dataFinalSorteio"
                                                                    defaultValue={rifa[0].data_final_sorteio}
                                                                    className={`block w-full focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm border-gray-400 rounded-md ${errors.nome && 'focus:ring-red-500 focus:border-red-500'}`}
                                                                />
                                                            }
                                                            {errors.dataFinalSorteio && errors.dataFinalSorteio.type === "required" ? <p className="text-red-600">Preencha a data do sorteio.</p> : null}
                                                        </div>
                                                        <div className="col-span-6 sm:col-span-3">
                                                            <label htmlFor="quantidadeNumeros" className="block text-sm font-medium text-gray-700">Quantide de numeros</label>
                                                            <select
                                                                {...register('quantidadeNumeros', {
                                                                    validate: {
                                                                        // required: (value) => { return !!value.trim() }
                                                                    }
                                                                })}
                                                                disabled={true}
                                                                defaultValue={rifa[0].quantidade_numeros}
                                                                autoComplete="quantidadeNumeros"
                                                                className="mt-1 block w-full py-2 px-3 border border-gray-500 bg-slate-50 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-300"
                                                            >
                                                                {quantidadeNumero.map((numeros, index) => (
                                                                    <option disabled={true} key={index} value={numeros.quantidade} >{numeros.texto}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className="col-span-6 sm:col-span-3">
                                                            <label htmlFor="valorNumero" className="block text-sm font-medium text-gray-700">Valor de cada número</label>
                                                            <div className="mt-1 flex rounded-md shadow-sm">
                                                                <span className="inline-flex items-center px-3 rounded-l-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">R$</span>
                                                                <input
                                                                    {...register('valorNumero', {
                                                                        validate: {
                                                                            required: (value) => { return !!value.trim() }
                                                                        }
                                                                    })}
                                                                    required
                                                                    type="number"
                                                                    placeholder="Valor"
                                                                    defaultValue={rifas[0].valor_numero}
                                                                    autoComplete="valorNumero"
                                                                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none sm:text-sm border-gray-300"
                                                                />
                                                                <span className="inline-flex items-center px-3 rounded-r-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">,00</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="px-4 mt-5 text-right sm:px-6">
                                                        <button disabled={carregando} className={"botao botao-primario"}> {carregando ? <div className="px-4 animate-spin bi bi-arrow-repeat"></div> : 'Atualizar Rifa'} </button>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                                <div className="flex flex-col gap-y-8 justify-center p-4 ">
                                                    <div>
                                                        <button className="botao botao-sucesso" onClick={() => { setShowModal(true); console.log(showModal) }}><i className="bi bi-plus-square mr-2"></i>Adicionar Imagem</button>
                                                    </div>
                                                    {rifas[0].imagens_rifa?.map((imagem, index) => (
                                                        <div key={index} className="flex flex-row bg-gray-100 p-2">
                                                            <div className="basis-4/5">
                                                                <img className="h-36 w-36 shrink-0 object-cover rounded overflow-hidden" src={imagem.imagem} alt="" />
                                                            </div>
                                                            <div className="basis-1/5 self-center">
                                                                <button className="botao bg-red-600" onClick={() => { setShowModalExcluir(true); setIdImagem(imagem.id) }}>
                                                                    <i className="bi bi-trash mr-2"></i>Excluir
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <Modal
                                                        tipo="button"
                                                        onClick={deletarImagem}
                                                        titulo="Deseja realmente excluir essa imagem?"
                                                        showModal={showModalExcluir}
                                                        closeModal={() => setShowModalExcluir(false)}
                                                    >
                                                        <div></div>
                                                    </Modal>
                                                </div>
                                                <Modal
                                                    tipo="submit"
                                                    carregando={carregando}
                                                    handleSubmit={handleSubmitImagem(adicionarImagem)}
                                                    titulo="Adicionar Imagem"
                                                    showModal={showModal}
                                                    closeModal={() => setShowModal(false)}>
                                                    <>
                                                        <label className="block text-sm text-start font-medium text-gray-700"> Imagens da rifa </label>
                                                        <div className="mt-1 flex justify-center px-4 pt-2 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                            <div className="space-y-1 text-center">
                                                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" />
                                                                </svg>
                                                                <div className="flex text-sm text-gray-600">
                                                                    <label htmlFor="imagemRifa" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                                        <span>Carregar imagens</span>
                                                                        <input
                                                                            {...registerImagem('imagemRifa',
                                                                                {
                                                                                    required: 'Selecione uma imagem'
                                                                                }
                                                                            )}
                                                                            type="file"
                                                                            id="imagemRifa"
                                                                            onChange={exibeImagem}
                                                                            className="sr-only"
                                                                            accept="image/*"
                                                                            multiple />
                                                                    </label>
                                                                    <p className="pl-1"></p>
                                                                    {errorsImagem.imagemRifa ? <p className="text-red-600">Seleciona uma imagem</p> : null}
                                                                </div>
                                                                {images.length > 0 ?
                                                                    <>
                                                                        <div className="flex flex-wrap space-x-2">
                                                                            {images.map((image, index) => (
                                                                                <img key={index} className="mt-3 h-24 w-24 shrink-0 object-cover rounded overflow-hidden" src={image} alt="fotoPerfil" />
                                                                            ))}
                                                                        </div>
                                                                    </>
                                                                    :
                                                                    <p className="text-xs text-gray-500">PNG, JPG, GIF</p>
                                                                }
                                                            </div>
                                                        </div>
                                                    </>
                                                </Modal>
                                            </div>
                                            <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                                                <div className="flex flex-col gap-y-8 justify-center p-4 ">
                                                    <div>
                                                        <button className="botao botao-sucesso" onClick={() => setShowModal(true)}><i className="bi bi-plus-square mr-2"></i> Adicionar Premio</button>
                                                    </div>
                                                    {rifas[0].premios_rifa?.map((premio, index) => (
                                                        <div key={index} className="flex flex-row bg-gray-100 p-4 items-center">
                                                            <div className="basis-4/5">
                                                                <label htmlFor="">{premio.ordem}º Ganhador (a)</label>
                                                                <h4 className="shrink-0 object-cover rounded overflow-hidden">{premio.nome_premio}</h4>
                                                            </div>
                                                            <div className="basis-1/5">
                                                                <button className="botao bg-red-600" onClick={() => { setShowModalExcluir(true); setIdPremio(premio.id) }}>
                                                                    <i className="bi bi-trash mr-2"></i>Excluir
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <Modal
                                                        tipo="button"
                                                        onClick={deletarPremio}
                                                        titulo="Deseja realmente excluir esse premio?"
                                                        showModal={showModalExcluir}
                                                        closeModal={() => setShowModalExcluir(false)}
                                                    >
                                                        <div></div>
                                                    </Modal>
                                                </div>
                                                <Modal
                                                    tipo="submit"
                                                    carregando={carregando}
                                                    handleSubmit={handleSubmitPremio(adicionarPremio)}
                                                    titulo="Adicionar Premio"
                                                    showModal={showModal}
                                                    closeModal={() => setShowModal(false)}>
                                                    <div className="flex flex-col pb-3">
                                                        <label htmlFor="premio">Premio</label>
                                                        <input
                                                            {...registerPremio('nomePremio',
                                                                {
                                                                    validate: {
                                                                        required: (value) => { return !!value.trim() }
                                                                    }
                                                                }
                                                            )}
                                                            className={`form-control ${errorsPremio.nomePremio ? 'is-invalid' : 'is-valid'}`}
                                                            type="text" />

                                                        {errorsPremio.nomePremio && errorsPremio.nomePremio.type === "required" ? <p className="text-red-600">Digite um premio</p> : null}
                                                    </div>
                                                </Modal>
                                            </div>
                                            <div className={openTab === 4 ? "block" : "hidden"} id="link3">
                                                <div className="flex flex-col gap-y-8 justify-center md:p-4">
                                                    <div>
                                                        <button className="botao botao-sucesso" onClick={() => setShowModal(true)}><i className="bi bi-plus-square mr-2"></i> Adicionar Promoção</button>
                                                    </div>
                                                    {rifas[0].promocao_rifa?.map((promocao, index) => (
                                                        <div key={index} className="flex flex-row bg-gray-100 p-4 items-center">
                                                            <div className="basis-2/6">
                                                                <label htmlFor="">Numeros</label>
                                                                <h4 className="shrink-0 object-cover rounded overflow-hidden">{promocao.quantidade_numero}</h4>
                                                            </div>
                                                            <div className="basis-2/6">
                                                                <label htmlFor="">Valor</label>
                                                                <h4 className="shrink-0 object-cover rounded overflow-hidden">{promocao.valor_promocao}</h4>
                                                            </div>
                                                            <div className="basis-2/6">
                                                                <button className="botao bg-red-600" onClick={() => { setShowModalExcluir(true); setIdPromocao(promocao.id) }}>
                                                                    <i className="bi bi-trash mr-2"></i>Excluir
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <Modal
                                                        tipo="button"
                                                        onClick={deletarPromocao}
                                                        titulo="Deseja realmente excluir essa promoção?"
                                                        showModal={showModalExcluir}
                                                        closeModal={() => setShowModalExcluir(false)}
                                                    >
                                                        <div></div>
                                                    </Modal>
                                                </div>
                                                <Modal
                                                    tipo="submit"
                                                    carregando={carregando}
                                                    handleSubmit={handleSubmitPromocao(adicionarPromocao)}
                                                    titulo="Adicionar Promoção"
                                                    showModal={showModal}
                                                    closeModal={() => setShowModal(false)}>
                                                    <div className="flex flex-col">
                                                        <div className="flex flex-col">
                                                            <label htmlFor="Numero">Quantidade de numeros</label>
                                                            <input
                                                                {...registerPromocao('quantidadeNumero', {
                                                                    required: 'A quantidade de numeros para promoção',
                                                                    validate: {
                                                                        required: (value) => { return !!value.trim() }
                                                                    }
                                                                })}
                                                                className="form-control"
                                                                type="number" />
                                                            {errorsPromocao.quantidadeNumero && errorsPromocao.quantidadeNumero.type === "required" ? <p className="text-red-600">Preencha quantidade de numeros para promoção</p> : null}
                                                        </div>
                                                        <div className="flex flex-col mt-2">
                                                            <label htmlFor="Numero">Valor</label>
                                                            <input
                                                                {...registerPromocao('valorPromocao', {
                                                                    required: 'Digite o valor da promoção',
                                                                    validate: {
                                                                        required: (value) => { return !!value.trim() }
                                                                    }
                                                                })}
                                                                className="form-control"
                                                                type="number" />
                                                            {errorsPromocao.valorPromocao && errorsPromocao.valorPromocao.type === "required" ? <p className="text-red-600">Preencha o valor da promoção</p> : null}
                                                        </div>
                                                    </div>
                                                </Modal>
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

    if (rifas[0].status === "Finalizado") {
        return {
            redirect: {
                destination: '/admin',
                permanent: false
            }
        }
    }

    //busca rifas
    const api = useApi();
    const respostaCategoria = await api.buscaCategoriaRifa();
    const categoriaRifa: CategoriaRifa[] = respostaCategoria.categoriaRifa;

    return {
        props: {
            rifa: rifas,
            categoriaRifa: categoriaRifa,
        }
    }
}