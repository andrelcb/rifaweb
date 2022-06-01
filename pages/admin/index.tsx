import { useContext } from "react";
import { LayoutAdmin } from "../../components/LayoutAdmin";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { RequireAuth } from "../../contexts/Auth/RequireAuth";
import RifaItem from "../rifa/[id]";

const Admin = () => {
    const auth = useContext(AuthContext);

    return (
        <LayoutAdmin>
            <div className="container p-5">
                <h2>Olá {auth.usuario?.nome}</h2>
                <h2>Olá {auth.usuario?.nome}</h2>
                <h2>Olá {auth.usuario?.nome}</h2>
                <h2>Olá {auth.usuario?.nome}</h2>
                <h2>Olá {auth.usuario?.nome}</h2>
                <h2>Olá {auth.usuario?.nome}</h2>
                <h2>Olá {auth.usuario?.nome}</h2>

            </div>
        </LayoutAdmin>
    )
}

export default Admin;