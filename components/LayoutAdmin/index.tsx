import { ReactElement, useContext, useState } from "react"
import { GetServerSideProps } from "next";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useRouter } from "next/router";
import { SideBar } from "../admin/SideBar";
import styles from './styles.module.css';

type Props = {
    children: ReactElement;
}
export const LayoutAdmin = ({ children }: Props) => {
    const auth = useContext(AuthContext);
    const [exibeSideBar, setExibeSideBar] = useState<boolean>(false);
    const router = useRouter();

    return (
        <>
            <button onClick={() => setExibeSideBar(!exibeSideBar)} className="text-2xl flex md:hidden px-4 py-1 bg-rifaweb-primario text-white w-full" type="button">
                <i className={`bi ${exibeSideBar ? 'bi-list-check' : 'bi-list'}`}></i>
            </button>
            <div className="flex">
                <SideBar exibeSideBar={exibeSideBar} />
                <div className="md:p-2 flex-1 h-screen overflow-y-scroll">
                    {children}
                </div>
            </div>
        </>
    );

}