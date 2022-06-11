import { LayoutAdmin } from "../../../components/LayoutAdmin"

const CriarRifa = () => {
    return (
        <LayoutAdmin>
            <>
                <div className="bg-white shadow mb-5 p-3">
                    <h1>Criar nova rifa</h1>
                    <h5 className="fs-12px text-black-50 mb-4">Crie suas rifas sem pagar nada. Com as menores taxas do brasil.</h5>
                </div>
                <form>
                    <div className="modal-body text-black">
                        <span className="fs-14px font-semibold">Nome Completo:</span>
                        <div className="input-group flex-nowrap mt-2 mb-3">
                            <span className="input-group-text" id="addon-wrapping"><i className="bi bi-person"></i></span>
                            <input
                                type="text"
                                required
                                className="form-control"
                                name="nomeCompleto"
                                placeholder="Insira seu nome completo"
                                aria-label="nomeCompleto"
                                aria-describedby="addon-wrapping" />
                        </div>

                        <span className="fs-14px font-semibold">Celular: </span>
                        <div className="input-group flex-nowrap mt-2 mb-3">
                            <span className="input-group-text" id="addon-wrapping"><i className="bi bi-phone"></i></span>
                            <input
                                type="text"
                                required
                                className="form-control"
                                placeholder="insira seu celular com DDD"
                                aria-label="celular"
                                name="celular"
                                aria-describedby="addon-wrapping" />
                        </div>

                        <span className="fs-14px font-semibold">Email: </span>
                        <div className="input-group flex-nowrap mt-2 mb-3">
                            <span className="input-group-text" id="addon-wrapping"><i className="bi bi-envelope"></i></span>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="insira seu e-mail"
                                aria-label="email"
                                name="email"
                                aria-describedby="addon-wrapping" />
                        </div>

                        <span className="fs-14px font-semibold">CPF: </span>
                        <div className="input-group flex-nowrap mt-2 mb-3">
                            <span className="input-group-text" id="addon-wrapping"><i className="bi bi-person-bounding-box"></i></span>
                            <input
                                type="text"
                                required
                                className="form-control"
                                placeholder="insira seu cpf"
                                aria-label="cpf"
                                name="cpf"
                                aria-describedby="addon-wrapping" />
                        </div>
                    </div>
                    <div className="modal-footer text-right pl-0 pr-0">
                        <div className="p-4">
                            <button type="button" className="btn btn-secondary p-2 m-1" data-bs-dismiss="modal">Cancelar</button>
                            <button className="btn btn-success p-2">Reservar</button>
                        </div>
                    </div>
                </form>
            </>
        </LayoutAdmin>
    )
}

export default CriarRifa;