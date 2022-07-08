import Link from "next/link";
import { ChangeEvent, useState } from "react";
import Pagination from "react-js-pagination";
import { toast } from "react-toastify";
import { Alerta } from "../../components/Alerta";
import { Layout } from "../../components/Layout";
import { RifaItem } from "../../components/RifaItem";
import { useApi } from "../../hooks/useApi";
import { CategoriaRifa } from "../../types/CategoriaRifa";
import { Rifa } from "../../types/Rifa";
import { Rifas } from "../../types/RifaPaginate";

type Props = {
    rifa: Rifas,
    categoria: CategoriaRifa[]
}

const Rifas = ({ rifa, categoria }: Props) => {
    const [categoriaFiltro, setCategoriaFiltro] = useState<string>();
    const [valorFiltro, setValorFiltro] = useState<string>();
    const [rifaState, setRifaState] = useState<Rifas>(rifa);
    const [carregando, setCarregando] = useState<boolean>();
    const api = useApi();

    const buscaRifas = async (page: number = 1) => {
        const paramentros = {
            page: page,
            categoria_rifa_idcategoria: categoriaFiltro,
            valor_numero: valorFiltro
        }

        setCarregando(true);
        const resposta = await api.buscaRifas(paramentros);
        if (resposta.rifas) {
            setCarregando(false);
            setRifaState(resposta.rifas);
        } else {
            setCarregando(false);
            toast.error('Erro ao fazer a busca.');
        }
    }

    return (
        <Layout>
            <div className="container py-5">
                <Alerta />
                <div className="py-5">
                    <div className="container">
                        <div className="bg-light p-2">
                            <div className="pb-3 col-lg-6 col-md-8 mx-8">
                                <h1 className="text-red"><i className="bi bi-ticket-perforated iconRifa"></i> Rifas</h1>
                            </div>
                            <div className="filtro row">
                                <div className="col-lg-4 position-relative m-2">
                                    <select className="form-select form-select-lg mb-2" aria-label=".form-select-lg example" onChange={(e: ChangeEvent<HTMLSelectElement>) => setCategoriaFiltro(e.target.value)}>
                                        <option value={""}>Todas categorias</option>
                                        {categoria.map((categoria, index) => (
                                            <option key={index} value={categoria.id}>{categoria.nome}</option>
                                        ))}

                                    </select>
                                </div>
                                <div className="col-lg-4 position-relative m-2">
                                    <select className="form-select form-select-lg mb-2" aria-label=".form-select-lg example" onChange={(e: ChangeEvent<HTMLSelectElement>) => setValorFiltro(e.target.value)} >
                                        <option value={""}>Todos os preços</option>
                                        <option value="2">Até R$2,00</option>
                                        <option value="10">Até R$10,00</option>
                                        <option value="20">Até R$20,00</option>
                                        <option value="30">Até R$30,00</option>
                                        <option value="60">Até R$60,00</option>
                                        <option value="100">Acima de R$100,00</option>
                                    </select>
                                </div>
                                <div className="col-lg-2 position-relative m-2">
                                    <button onClick={() => buscaRifas()} className="btn btn-primary align-self-center m-1">
                                        <i className="bi bi-search"></i> Buscar
                                    </button>
                                </div>
                            </div>
                        </div>
                        {!carregando ?
                            <div className="flex flex-col">
                                {rifaState.total > 1 ?
                                    <>
                                        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
                                            {rifaState.data.map((rifaItem, index) => (
                                                <RifaItem
                                                    key={index}
                                                    nomeBotao="Participar"
                                                    link={`/rifa/${rifaItem.link_rifa}`}
                                                    rifa={rifaItem} />
                                            ))}
                                        </div>
                                        <div className="flex mt-10 justify-center">
                                            {rifaState && rifaState.data.length > 0 && rifaState.total > 1 &&
                                                <Pagination
                                                    activePage={rifaState.current_page}
                                                    totalItemsCount={rifaState.total}
                                                    itemsCountPerPage={rifaState.per_page}
                                                    onChange={(numeroPagina) => buscaRifas(numeroPagina)}
                                                    itemClass={'page-item'}
                                                    linkClass={'page-link'}
                                                    firstPageText="Primeira Página"
                                                    lastPageText={"Última Página"}
                                                />}

                                        </div>
                                    </>
                                    :
                                    <div className="mt-10 flex mx-auto items-center p-3 bg-yellow-300">Não foi encontrada rifas para esse filtro de pesquisa.</div>
                                }
                            </div>
                            :
                            <div className="mx-auto flex justify-center">
                                <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                                    <span className="visually-hidden">Carregando...</span>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Layout >
    );
}


export const getServerSideProps = async () => {
    const api = useApi();
    const paramentros = { limit: 100 };
    const resposta = await api.buscaRifas(paramentros);
    const rifas: Rifas = resposta.rifas;

    const respostaCategoria = await api.buscaCategoriaRifa();
    const categoria: CategoriaRifa[] = respostaCategoria.categoriaRifa;


    return {
        props: {
            rifa: rifas,
            categoria: categoria,
        }
    }
}

export default Rifas;