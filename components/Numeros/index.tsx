import { NumeroType } from "../../types/NumeroType"



type Props = {
    item: NumeroType,
    onClick: () => void,
    filtro: string
}

export const Numeros = ({ item, onClick, filtro }: Props) => {
    return (
        <>
            {item.status == 'Disponivel' && filtro == 'Todos' &&
                <label
                    onClick={onClick}
                    className={`disponivel numero text-center rounded-lg h-10 w-20 cursor-pointer hover:bg-blue-200 bg-gray-300 p-2 m-1`}>
                    {item.numero}
                </label>
            }
            {item.status == 'Selecionado' && filtro == 'Todos' &&
                <label
                    onClick={onClick}
                    className={`disponivel numero text-white text-center rounded-lg h-10 w-20 cursor-pointer bg-[#274584] p-2 m-1`}>
                    {item.numero}
                </label>
            } 
            {item.status == 'Reservado' && filtro == 'Todos' &&
                <label
                    onClick={onClick}
                    className={`reservado numero text-center text-white font-bold rounded-lg h-10 w-20 cursor-pointer bg-warning p-2 m-1`}>
                    {item.numero}
                </label>
            }
            {item.status == 'Pago' && filtro == 'Todos' &&
                <label
                    onClick={onClick}
                    className={`pago numero text-center rounded-lg h-10 w-20 cursor-pointer bg-green-500 p-2 m-1`}>
                    {item.numero}
                </label>
            }

            {/* //reservado */}
            {item.status == 'Reservado' && filtro == 'Reservado' &&
                <label
                    onClick={onClick}
                    className={`reservado numero text-center text-white font-bold rounded-lg h-10 w-20 cursor-pointer bg-warning p-2 m-1`}>
                    {item.numero}
                </label>
            }

            {/* //Pagos */}
            {item.status == 'Pago' && filtro == 'Pago' &&
                <label
                    onClick={onClick}
                    className={`pago numero text-center rounded-lg h-10 w-20 cursor-pointer bg-green-500 p-2 m-1`}>
                    {item.numero}
                </label>
            }

            {/* //Disponivel */}
            {item.status == 'Disponivel' && filtro == 'Disponivel' &&
                <label
                    onClick={onClick}
                    className={`disponivel numero text-center rounded-lg h-10 w-20 cursor-pointer hover:bg-blue-200 bg-gray-300 p-2 m-1`}>
                    {item.numero}
                </label>
            }
        </>
    )

}