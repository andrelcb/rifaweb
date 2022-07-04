import { ReactElement, useState } from "react"


type Props = {
    children: ReactElement,
    titulo: string,
    showModal: boolean,
    carregando?: boolean,
    tipo: "button" | "submit" | "reset" | undefined,
    closeModal(): void,
    handleSubmit?(): void,
    onClick?(): void
}

export const Modal = ({ children, titulo, closeModal, handleSubmit, showModal, carregando, onClick, tipo }: Props) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className={`fixed-top w-full h-full top-0 left-0 ${showModal ? 'flex' : 'hidden'} items-center justify-center`}>
                <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

                <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                    {/* <!-- Add margin if you want to see some of the overlay behind the modal--> */}
                    <div className="modal-content py-4 text-left px-6">
                        {/* <!--Title--> */}
                        <div className="flex justify-between items-center pb-3">
                            <p className="text-2xl font-bold">{titulo}</p>
                            <div className="modal-close cursor-pointer z-50" onClick={closeModal}>
                                <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                    <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                                </svg>
                            </div>
                        </div>

                        {/* <!--Body--> */}
                        {children}

                        {/* <!--Footer--> */}
                        <div className="flex justify-end space-x-3 pt-2">
                            <button type="button" className="botao bg-red-500" onClick={closeModal}>Cancelar</button>
                            <button disabled={carregando} type={tipo} onClick={onClick} className="botao botao-primario" >{carregando ? <div className="px-4 animate-spin bi bi-arrow-repeat"></div> : 'Confirmar'}</button>
                        </div>

                    </div>
                </div>
            </div>
        </form>
    )
}