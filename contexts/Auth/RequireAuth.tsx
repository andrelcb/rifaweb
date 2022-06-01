import { useRouter } from "next/router";
import { ReactElement, useContext, useEffect } from "react";
import Login from "../../pages/login";
import { AuthContext } from "./AuthContext";

export const RequireAuth = ({ children }: {children:JSX.Element}) => {
    const auth = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if(!localStorage.getItem('rifaAuthToken')) {
            router.push('/login');
        }
    })


    return children;
}