import Image from "next/image"

export const Footer = () => {
    return (
        <div className="bgPrimary text-white">
            <div className="container bgPrimary">
                <footer className="d-flex flex-wrap justify-content-between align-items-center py-5">
                    <div className="col-md-4 d-flex align-items-center">
                        <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                            <Image src="/logoTicket.png" alt="" width="30" height="30" className="d-inline-block align-text-top" />
                        </a>
                        <span className="mb-3 mb-md-0 text-muted">2022 @Rifaweb - Todos direitos reservados</span>
                    </div>

                    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                        <li className="ms-3"><a href="https://twitter.com/rifaweb.app"><i className="bi bi-twitter"></i></a></li>
                        <li className="ms-3"><a  href="https://instagram.com/rifaweb.app"><i className="bi bi-instagram"></i></a></li>
                        <li className="ms-3"><a href="https://twitter.com/rifaweb.app"><i className="bi bi-facebook"></i></a></li>
                    </ul>
                </footer>
            </div>
        </div>
    )
}