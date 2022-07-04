import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { ChangeEvent, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { Alerta } from "../../../components/Alerta";
import { LayoutAdmin } from "../../../components/LayoutAdmin";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { useApi } from "../../../hooks/useApi";
import { tabConfig } from "../../../utils/tabConfiguracao";

type FormValues = {
    nomeDeUsuario: string,
    biografia: string,
    regulamento: string,
    nomeCompleto: string,
    enderecoDeEmail: string,
    facebook: string,
    telegram: string,
    instagram: string,
    imagemPerfil: File,
}
const Configuracao = () => {
    const auth = useContext(AuthContext);
    const [openTab, setOpenTab] = useState(1);
    const [image, setImage] = useState<any>('');
    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<FormValues>();
    const [carregando, setCarregando] = useState<boolean>(false);
    const [editarNomeUsuario, setEditarNomeUsuario] = useState<boolean>(true);
    const api = useApi();


    const atualizaUsuario = async (data: object) => {
        const formData = new FormData();
        if (data) {
            formData
            setCarregando(true);
            const resposta = await api.atualizarUsuario(data);
            if (resposta.erro === "") {
                setCarregando(false);
                const resposta = await api.validarToken();
                auth.atualizaUsuario(resposta.usuario)
                toast.success("Usuário atualizado!");
            } else {
                setCarregando(false);
                toast.error(resposta.erro);
            }
        }

    }

    const exibeImagem = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files?.length > 0) {
            setImage(URL.createObjectURL(e.target.files[0]))
            setValue("imagemPerfil", e.target.files[0]);
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

                <div className="menu md:grid md:grid-cols-3 md:gap-0 shadow sm sm:overflow-hidden p-3">
                    <div className="md:col-span-1">
                        <div className="md:px-4">
                            <ul className="flex mb-0 list-none pb-4 flex-col">
                                {tabConfig.map((tab) => (
                                    <li key={tab.tab} className="mt-2 last:mr-0 flex-auto text-start">
                                        <a className={`text-xs cursor-pointer no-underline font-bold uppercase px-5 py-3 rounded block leading-normal
                                                    ${(openTab === tab.tab ? "text-white bg-[#1759ff]" : "text-bg-[#1759ff] bg-white")}`}

                                            onClick={e => { e.preventDefault(); setOpenTab(tab.tab); }}>
                                            <i className={`text-lg mr-2 ${tab.icon}`}></i> {tab.nome}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className={`${openTab === 1 ? "block" : "hidden"} sectionPerfil md:col-span-2`}>
                        <form className="" onSubmit={handleSubmit(atualizaUsuario)}>
                            <div className="px-4 bg-white space-y-6 sm:p-6">
                                <div className="grid grid-cols-3 gap-6">
                                    <div className="col-span-3 sm:col-span-2">
                                        <label htmlFor="nomeDeUsuario" className="block text-sm font-medium text-gray-700">Nome de usuário </label>
                                        <div className="mt-1 flex shadow-sm">
                                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> https://rifaweb.app/ </span>
                                            <input
                                                {...register('nomeDeUsuario', {
                                                    pattern: {
                                                        value: /^[A-Za-z]+$/i,
                                                        message: "Digite um nome de usuário válido"
                                                    }
                                                })}
                                                type="text"
                                                name="nomeDeUsuario"
                                                id="nomeDeUsuario"
                                                disabled={editarNomeUsuario}
                                                defaultValue={auth.usuario?.nome_usuario}
                                                className={` ${errors.nomeDeUsuario && 'is-invalid'} focus:ring-indigo-500 disabled:bg-gray-300 focus:border-indigo-500 w-full sm:text-sm border border-gray-300`}
                                                placeholder="nome de usuario" />
                                            <span onClick={() => setEditarNomeUsuario(!editarNomeUsuario)} className="inline-flex items-center  px-3 border-gray-300 bg-green-600 text-white cursor-pointer text-sm"><i className="bi bi-pencil-square"></i></span>
                                        </div>
                                        {errors.nomeDeUsuario ? <p className="text-red-600">{errors.nomeDeUsuario.message}</p> : null}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="biografia" className="block text-sm font-medium text-gray-700">Biografia</label>
                                    <div className="mt-1">
                                        <textarea
                                            {...register('biografia')}
                                            id="biografia"
                                            name="biografia"
                                            rows={3}
                                            defaultValue={auth.usuario?.biografia}
                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300"
                                            placeholder="">

                                        </textarea>
                                    </div>
                                    <p className="mt-2 text-sm text-gray-500">Sua Bio ficará visível na página do seu perfil.</p>
                                </div>

                                <div className="flex items-center space-x-6">
                                    {/* <label className="block text-sm font-medium text-gray-700">Foto Perfil</label> */}
                                    <div className="relative mt-1 flex justify-center items-center h-16">
                                        {!auth.usuario?.imagem_perfil && image === "" ?
                                            <img className="h-24 w-24 shrink-0 object-cover rounded-full overflow-hidden bg-rifaweb-primario" src={'/usuarioPadrao.png'} alt="fotoPerfil" />
                                            :
                                            <img className="h-24 w-24 shrink-0 object-cover rounded-full overflow-hidden" src={auth.usuario?.imagem_perfil && image === "" ? auth.usuario?.imagem_perfil : image} alt="fotoPerfil" />
                                        }
                                        <div className="absolute left-28">
                                            <div className="flex flex-col items-center">
                                                <i className="bi bi-camera text-4xl"></i>
                                                <span className="block text-gray-400 font-normal">Alterar Foto</span>
                                            </div>
                                        </div>
                                        <input
                                            {...register('imagemPerfil')}
                                            type="file"
                                            name="image"
                                            onChange={exibeImagem}
                                            className="h-full opacity-0 w-full cursor-pointer" />
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3 text-right sm:px-6">
                                <button disabled={carregando} type="submit" className="botao botao-primario">{carregando ? <div className="px-4 animate-spin bi bi-arrow-repeat"></div> : 'Atualizar'}</button>
                            </div>
                        </form>
                    </div>

                    <div className={`${openTab === 2 ? "block" : "hidden"} sectionInfoPessoal md:col-span-2`}>
                        <form onSubmit={handleSubmit(atualizaUsuario)}>
                            <div className="px-4 py-5 bg-white sm:p-6">
                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="nomeCompleto" className="block text-sm font-medium text-gray-700">Nome Completo</label>
                                        <input
                                            type="text"
                                            {...register('nomeCompleto')}
                                            defaultValue={auth.usuario?.nome}
                                            name="nomeCompleto"
                                            id="nomeCompleto"
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">CPF</label>
                                        <input
                                            type="text"
                                            defaultValue={auth.usuario?.cpf}
                                            name="cpf"
                                            id="cpf"
                                            readOnly
                                            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 bg-gray-300" />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="enderecoDeEmail" className="block text-sm font-medium text-gray-700">Email address</label>
                                        <input type="text"
                                            {...register('enderecoDeEmail')}
                                            name="enderecoDeEmail"
                                            id="enderecoDeEmail"
                                            defaultValue={auth.usuario?.email}
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300" />
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3 text-right sm:px-6">
                                <button type="submit" className="botao botao-primario">{carregando ? <div className="px-4 animate-spin bi bi-arrow-repeat"></div> : 'Atualizar'}</button>
                            </div>
                        </form>
                    </div>

                    <div className={`${openTab === 3 ? "block" : "hidden"} sectionRedeSocial md:col-span-2`}>
                        <form onSubmit={handleSubmit(atualizaUsuario)}>
                            <div className="px-4 py-5 bg-white sm:p-6">
                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="faceBook" className="block text-sm font-medium text-gray-700">FaceBook</label>
                                        <input
                                            {...register('facebook')}
                                            type="text"
                                            defaultValue={auth.usuario?.facebook}
                                            name="facebook"
                                            id="facebook"
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="instaGram" className="block text-sm font-medium text-gray-700">Instagram</label>
                                        <input
                                            {...register('instagram')}
                                            type="text"
                                            name="instagram"
                                            defaultValue={auth.usuario?.instagram}
                                            id="instagram"
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300" />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">Twitter</label>
                                        <input type="text"
                                            name="twitter"
                                            id="twitter"
                                            defaultValue={auth.usuario?.twitter}
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="telegram" className="block text-sm font-medium text-gray-700">Telegram</label>
                                        <input type="text"
                                            {...register('telegram')}
                                            name="telegram"
                                            id="telegram"
                                            defaultValue={auth.usuario?.telegram}
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300" />
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3 text-right sm:px-6">
                                <button type="submit" className="botao botao-primario">{carregando ? <div className="px-4 animate-spin bi bi-arrow-repeat"></div> : 'Atualizar'}</button>
                            </div>
                        </form>
                    </div>
                </div>

            </>
        </LayoutAdmin >
    )
}



export default Configuracao


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

    return {
        props: {}
    }
}
