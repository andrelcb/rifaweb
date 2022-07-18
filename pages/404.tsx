import Link from 'next/link'
import { Layout } from '../components/Layout'

export default function FourOhFour() {
    return <>
        <Layout>
            <div className='mt-20 flex justify-center items-center'>
                <div className='flex flex-col w-96 shadow-lg p-4 rounded-md'>
                    <span className='font-bold'>
                        Esssa página não foi encontrado.
                        Verifique o endereço e tente novamente.
                    </span>
                    <img src="/404.webp" className='' alt="" />
                    <Link href="/">
                        <a className='botao botao-primario mt-3'>
                            voltar para o inicio
                        </a>
                    </Link>
                </div>
            </div>
        </Layout>

    </>
}