import { Alerta } from "../../../../components/Alerta"
import { LayoutAdmin } from "../../../../components/LayoutAdmin";



const Saque = () => {
    return (
        <LayoutAdmin>
            <>
                <Alerta />
                <div className="bg-white shadow mb-5 p-3">
                    <h1>Saque</h1>
                    <h5 className="fs-12px text-black-50 mb-4">Realize seus saques de forma pratica e rápida via pix.</h5>
                </div>
            </>
        </LayoutAdmin>

    )
}

export default Saque;