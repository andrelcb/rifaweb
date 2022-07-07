import { ReactElement } from "react"
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

type Props = {
    children: ReactElement;
}


export const Layout = ({ children }: Props) => {
    return (
        <div className="flex flex-col h-screen justify-between">
            <Navbar />
            <main className="mb-auto">
                {children}
            </main>
            <Footer />
        </div>

    );

}