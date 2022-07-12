import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { useState } from "react";
import { Layout } from "../components/Layout";
import { RifaItem } from "../components/RifaItem";
import { useApi } from "../hooks/useApi";
import { Usuario } from "../types/Usuario";
import { tabUsuario } from "../utils/tabUsuario";


type Props = {
    usuario: Usuario
}

const Usuario = ({ usuario }: Props) => {
    const [openTab, setOpenTab] = useState(1);
    
    return (
        <Layout>
            <div className="container">
                <div className="relative flex flex-row shadow-lg p-4 mt-32 justify-center">
                    <img
                        className={`absolute top-0 -translate-y-1/2 h-40 w-40 shrink-0 object-cover rounded-full overflow-hidden ${!usuario.imagem_perfil ? 'bg-rifaweb-primario' : null}`}
                        src={usuario.imagem_perfil ? usuario.imagem_perfil : '/usuarioPadrao.png'} alt="fotoPerfil" />

                    <div className="flex flex-col my-16 items-center">
                        <h3 className="text-center">{usuario.nome}</h3>
                        <div className="inline-flex text-2xl space-x-3 text-rifaweb-primario">
                            {usuario.facebook && <a target={'_blank'} href={usuario.facebook}><i className="bi bi-facebook"></i></a>}
                            {usuario.instagram && <a target={'_blank'} href={usuario.instagram}><i className="bi bi-instagram"></i></a>}
                            {usuario.numero_celular && <a target={'_blank'} href={`https://api.whatsapp.com/send?phone=55${usuario.numero_celular}&text=Ol%C3%A1%2C%20tudo%20bem?`}><i className="bi bi-whatsapp"></i></a>}
                            {usuario.twitter && <a target={'_blank'} href={usuario.twitter}><i className="bi bi-twitter"></i></a>}
                            {usuario.telegram && <a target={'_blank'} href={usuario.telegram}><i className="bi bi-telegram"></i></a>}
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap mb-14 mt-20">
                    <div className="flex flex-row space-x-2 shadow">
                        {tabUsuario.map((tab, index) => (
                            <button key={index} onClick={() => setOpenTab(tab.tab)}
                                className={`px-4 py-2 ${openTab == tab.tab ? 'text-white bg-rifaweb-primario' : 'text-rifaweb-primario shadow-lg bg-slate-50 hover:bg-rifaweb-primario hover:text-white'}`}>{tab.nome}</button>
                        ))}
                    </div>
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                        <div className="px-4 py-5 flex-auto">
                            <div className={openTab === 1 ? "block" : "hidden"} id="rifa">
                                <div className="tab-content tab-space">
                                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
                                        {usuario.rifas?.map((rifa, index) => (
                                            <RifaItem
                                                key={index}
                                                rifa={rifa}
                                                nomeBotao={'Participar'}
                                                link={`/rifa/${rifa.link_rifa}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className={openTab === 2 ? "block" : "hidden"} id="sobre">
                                <div className="tab-content tab-space">
                                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
                                        {usuario.rifas?.map((rifa, index) => (
                                            <RifaItem
                                                key={index}
                                                rifa={rifa}
                                                nomeBotao={'Participar'}
                                                link={`/rifa/${rifa.link_rifa}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className={openTab === 3 ? "block" : "hidden"} id="sobre">
                                <h3 className="">Sobre: {usuario.nome}</h3>
                                <p className="text-justify">{usuario.biografia}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}


export default Usuario;

interface Params extends ParsedUrlQuery {
    nomeusuario: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { nomeusuario } = context.params as Params;

    const api = useApi();
    //busca usuarios
    const resposta = await api.buscaUsuarios(nomeusuario);
    const usuario: Usuario = resposta.usuario;

    return {
        props: {
            usuario: usuario,
        }
    }
}