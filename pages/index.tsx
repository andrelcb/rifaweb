import type { NextPage } from 'next'
import Image from 'next/image'
import { Layout } from '../components/Layout'
import styles from '../styles/Home.module.css'
import HomeFoto from '../public/home.jpg'
import Link from 'next/link'
import { RifaItem } from '../components/RifaItem'
import { useApi } from '../hooks/useApi'
import { Rifa } from '../types/Rifa'
import { useEffect } from 'react'

type Props = {
  rifa: Rifa[];
}

const Home = ({ rifa }: Props) => {
  return (
    <Layout>
      <>
        <div className={styles.homeContainer}>
          <div className="container text-white p-5">
            <div className="row align-items-center">
              <div className={'col-6 mx-auto col-md-6 order-md-2'}>
                <Image className={`${styles.imageInicio} img-fluid mb-3 mb-md-0`} src={HomeFoto} width={1024} height={800} />
              </div>
              <div className="col-md-6 text-start">
                <h1 className={styles.tituloHome}>Crie suas rifas com facilidade</h1>
                <p className="textCenter">
                  Crie e gerencie suas rifas de forma prática em segundos com o melhor preço do mercado.
                </p>
                <div className="flex-column mt-5 mb-4">
                  <Link href={'/cadastrar'}><a className='btn btn-success btn-lg'>Criar minha conta</a></Link>
                </div>
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
              <h1 className="text-red"><i className="bi bi-ticket-perforated iconRifa"></i> Rifas</h1>
            </div>

            <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 g-3">
              {rifa.map((rifaItem, index) => (
                <RifaItem key={index} dados={{ imagensRifas: rifaItem.imagensRifas[1], nome: rifaItem.nome, nome_criador: rifaItem.nome_criador, id: 1, link_rifa: rifaItem.link_rifa, valor_numero: rifaItem.valor_numero }} />
              ))}
            </div>

            <div className='text-center pt-4'>
              <Link href={'/rifa'}>
                <a className='py-2 btn btn-primary'>Ver todas as rifas</a>
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


