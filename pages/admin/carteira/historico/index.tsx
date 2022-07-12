import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { Alerta } from "../../../../components/Alerta"
import { LayoutAdmin } from "../../../../components/LayoutAdmin";



const Historico = () => {
    return (
        <LayoutAdmin>
            <>
                <Alerta />
                <div className="bg-white shadow mb-5 p-3">
                    <h1>Historico de transação</h1>
                    <h5 className="fs-12px text-black-50 mb-4">Todas suas transações de pedidos e saques.</h5>
                </div>
            </>
        </LayoutAdmin>
    )
}


export default Historico;

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