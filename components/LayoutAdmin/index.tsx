import { ReactElement, useContext } from "react"
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { RequireAuth } from "../../contexts/Auth/RequireAuth";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useRouter } from "next/router";

type Props = {
    children: ReactElement;
}
export const LayoutAdmin = ({ children }: Props) => {
    const auth = useContext(AuthContext);
    const router = useRouter();

    const handleLogout = async () =>{
        await auth.logout();
        router.push('/login');
    }
        
    return (
        <div>
            <nav className="navbar navbar-expand-lg bgPrimary">
                <button onClick={handleLogout} className="btn-success btn-lg p-1">SAIR</button>
            </nav>
            <RequireAuth>
                <main className="py-5">
                    {children}
                </main>
            </RequireAuth>
        </div>
    );

}