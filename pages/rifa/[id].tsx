import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { Layout } from "../../components/Layout";
import { Rifa } from "../../types/Rifa";

type Props = {
    rifa: Rifa
}

const RifaItem = ({ rifa }: Props) => {
    const router = useRouter();
    const { rifas } = router.query;

    return (
        <Layout>
            <div>
                <h1>RIFA</h1>
                {/* <h2>{rifa.title}</h2> */}
                {/* <p>{rifa.body}</p> */}

            </div>
        </Layout>
    )
}



export default RifaItem;

export const getStaticPaths = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const rifas: Rifa[] = await response.json();

    const paths = rifas.map(rifas => ({
        params: { id: rifas.id.toString() }
    }));
    return { paths, fallback: 'blocking' }
}

interface Iparams extends ParsedUrlQuery {
    id: string
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { id } = context.params as Iparams;
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const rifa = await response.json();
    return {
        props: {
            rifa
        }
    }
}