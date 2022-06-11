import { ReactElement, useContext, useState } from "react"
import { RequireAuth } from "../../contexts/Auth/RequireAuth";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useRouter } from "next/router";
import { SideBar } from "../SideBar";
import styles from './styles.module.css';

type Props = {
    children: ReactElement;
}
export const LayoutAdmin = ({ children }: Props) => {
    const auth = useContext(AuthContext);
    const router = useRouter();
    const [classSideBar, setClassSideBar] = useState('d-none d-md-flex w-64 flex-column flex-shrink-0 p-4 bgPrimary text-white');
    const [showSideBar, setShowSideBar] = useState(false);

    const exibeSideBar = () => {
        if (showSideBar == false) {
            setShowSideBar(true);
            setClassSideBar('d-flex d-md-none w-screen h-auto flex-column flex-shrink-0 p-4 bgPrimary text-white')
        } else {
            setShowSideBar(false);
            setClassSideBar('d-none d-md-flex w-64 flex-column flex-shrink-0 p-4 bgPrimary text-white');
        }
    }
    return (
        <RequireAuth>
            <>
                <div className=' text-white block md:hidden bgPrimary border-0 p-2'>
                    <button onClick={exibeSideBar} className="fs-2" type="button">
                        <i className="bi bi-text-paragraph"></i>
                    </button>
                </div>
                <main className={`d-flex flex-nowrap`}>
                    <SideBar classSideBar={classSideBar} />
                    <div className="overflow-y-scroll max-h-screen h-screen max-w-screen w-screen">
                        <div className="container-fluid py-2 md:py-5">
                            {children}
                        </div>
                    </div>
                </main>
            </>
        </RequireAuth>
    );

}