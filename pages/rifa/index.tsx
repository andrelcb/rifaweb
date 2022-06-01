import Link from "next/link";
import { Layout } from "../../components/Layout";
import { RifaItem } from "../../components/RifaItem";
import { useApi } from "../../hooks/useApi";
import { Rifa } from "../../types/Rifa";

type Props = {
    rifa: Rifa[]
}

const Rifas = ({ rifa }: Props) => {
    return (
        <Layout>
            <div className="container py-5">
                <div className="py-5 bg-light">
                    <div className="container">
                        <div className="pb-3 col-lg-6 col-md-8 mx-8">
                            <h1 className="text-red"><i className="bi bi-ticket-perforated iconRifa"></i> Rifas</h1>
                        </div>
                        <div className="filtro row">
                            <div className="col-lg-4 position-relative m-2">
                                <select className="form-select form-select-lg mb-2" aria-label=".form-select-lg example">
                                    <option>Todas categorias</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                            <div className="col-lg-4 position-relative m-2">
                                <select className="form-select form-select-lg mb-2" aria-label=".form-select-lg example">
                                    <option selected>Todos os preços</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                            <div className="col-lg-2 position-relative m-2">
                                <button className="btn btn-primary align-self-center m-1"><i className="bi bi-search"></i> Buscar</button>
                            </div>
                        </div>
                        <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 g-3">
                            {rifa.map((rifaItem, index) => (
                                <RifaItem key={index} dados={{ imagensRifas: rifaItem.imagensRifas[1], nome: rifaItem.nome, nome_criador: rifaItem.nome_criador, id: 1, link_rifa: rifaItem.link_rifa, valor_numero: rifaItem.valor_numero }} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}


export const getServerSideProps = async () => {
    const api = useApi();
    const paramentros = { limit: 100 };
    const resposta = await api.buscaRifas(paramentros);
    const rifas: Rifa[] = resposta.rifas;

    return {
      props: {
        rifa: rifas
      }
    }
  }

export default Rifas;