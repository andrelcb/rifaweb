import { ToastContainer } from "react-toastify"

export const Alerta = () => {
    return (
        <ToastContainer
            position="top-right"
            theme="colored"
            autoClose={3000}
            hideProgressBar={false}
            closeOnClick={true}
            pauseOnHover={false}
            draggable={true}
        />
    )
}