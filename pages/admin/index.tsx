import { useContext } from "react";
import { LayoutAdmin } from "../../components/LayoutAdmin";
import { AuthContext } from "../../contexts/Auth/AuthContext";

const Admin = () => {
    const auth = useContext(AuthContext);

    return (
        <LayoutAdmin>
            <>
                <div className="bg-white shadow mb-5 p-5">
                    <h2>Olá {auth.usuario?.nome}</h2>
                    <h5 className="fs-12px text-black-50 mb-4">Bem vindo ao jeito mais prático e barato de criar sua rifa.</h5>
                </div>
            </>
        </LayoutAdmin>
    )
}

export default Admin;