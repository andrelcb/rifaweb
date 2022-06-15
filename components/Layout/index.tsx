import { ReactElement } from "react"
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

type Props = {
    children: ReactElement;
}


export const Layout = ({ children }: Props) => {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    );

}