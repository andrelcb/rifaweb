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
                    className={`disponivel numero text-gray-500 bg-gray-100 hover:bg-[#4877dd] hover:text-white`}>
                    {item.numero}
                </label>
            }
            {item.status == 'Selecionado' && filtro == 'Todos' &&
                <label
                    onClick={onClick}
                    className={`disponivel numero bg-[#274584] text-white`}>
                    {item.numero}
                </label>
            }
            {item.status == 'Reservado' && filtro == 'Todos' &&
                <label
                    onClick={onClick}
                    className={`reservado numero bg-yellow-400 text-white`}>
                    {item.numero}
                </label>
            }
            {item.status == 'Pago' && filtro == 'Todos' &&
                <label
                    onClick={onClick}
                    className={`pago numero bg-green-500 text-white`}>
                    {item.numero}
                </label>
            }

            {/* //reservado */}
            {item.status == 'Reservado' && filtro == 'Reservado' &&
                <label
                    onClick={onClick}
                    className={`reservado numero bg-yellow-400 text-white`}>
                    {item.numero}
                </label>
            }

            {/* //Pagos */}
            {item.status == 'Pago' && filtro == 'Pago' &&
                <label
                    onClick={onClick}
                    className={`pago numero text-white bg-green-500`}>
                    {item.numero}
                </label>
            }

            {/* //Disponivel */}
            {item.status == 'Disponivel' && filtro == 'Disponivel' &&
                <label
                    onClick={onClick}
                    className={`disponivel numero text-gray-500 bg-gray-100  hover:bg-[#4877dd] hover:text-white `}>
                    {item.numero}
                </label>
            }
        </>
    )

}