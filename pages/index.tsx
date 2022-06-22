import type { NextPage } from 'next'
import Image from 'next/image'
import { Layout } from '../components/Layout'
import styles from '../styles/Home.module.css'
import HomeFoto from '../public/HOME.png'
import Link from 'next/link'
import { RifaItem } from '../components/RifaItem'
import { useApi } from '../hooks/useApi'
import { Rifa } from '../types/Rifa'
import { useContext } from 'react'
import { AuthContext } from '../contexts/Auth/AuthContext'

type Props = {
  rifa: Rifa[];
}

const Home = ({ rifa }: Props) => {
  const auth = useContext(AuthContext);

  return (
    <Layout>
      <>
        <div className={styles.homeContainer}>
          <div className="container text-white mx-auto">
            <div className="row align-items-center">
              <div className={`hidden md:block col-6 mx-auto col-md-6 order-md-2`}>
                <Image className={`img-fluid mb-3 mb-md-0`} src={HomeFoto} width={1024} height={700} />
              </div>
              <div className="col-md-6 text-start">
                <h1 className={styles.tituloHome}>Crie suas rifas e publique gratuitamente</h1>
                <p className="textCenter">
                  Crie e gerencie suas rifas de forma prática em segundos com o melhor preço do mercado.
                </p>
                {!auth.usuario
                  ? <div className="flex-column mt-5 mb-4">
                    <Link href={'/cadastrar'}><a className='botao botao-sky py-3'><i className="bi bi-person"> </i>Criar minha conta</a></Link>
                  </div>
                  : <div className="flex-column mt-5 mb-4">
                    <Link href={'/admin/'}><a className='botao botao-sky py-3'>Gerencie suas rifa</a></Link>
                  </div>
                }
                <p className="text-muted text-start">
                  O melhor site para sua rifa.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="py-5 bg-light">
          <div className="container">
            <div className="pb-3 col-lg-6 col-md-8 mx-8">
              <h3 className="text-3xl"><i className="bi bi-ticket-perforated iconRifa"></i> Útilmas Rifas cadastradas</h3>
            </div>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
              {rifa.map((rifaItem, index) => (
                <RifaItem key={index} nomeBotao="Participar" link={`/rifa/${rifaItem.link_rifa}`} dados={{ imagensRifas: rifaItem.imagensRifas[0], nome: rifaItem.nome, nome_criador: rifaItem.nome_criador, id: rifaItem.id, link_rifa: rifaItem.link_rifa, valor_numero: rifaItem.valor_numero }} />
              ))}
            </div>

            <div className='text-center mt-20'>
              <Link href={'/rifa'}>
                <a className='botao botao-primario'>Ver todas as rifas</a>
              </Link>
            </div>
          </div>
        </div>
      </>
    </Layout>
  )
}

export default Home



export const getServerSideProps = async () => {
  const api = useApi();
  const paramentros = { limit: 6 };
  const resposta = await api.buscaRifas(paramentros);
  const rifas: Rifa[] = resposta.rifas;

  return {
    props: {
      rifa: rifas
    }
  }
}


