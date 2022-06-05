import { NumeroType } from "../../types/NumeroType"



type Props = {
    item: NumeroType,
    onClick: () => void
}

export const Numeros = ({ item, onClick }: Props) => {
    return (
        <>
            {item.status == 'Disponivel' &&
                <label
                    onClick={onClick}
                    className={`disponivel text-center rounded-lg h-10 w-20 cursor-pointer hover:bg-blue-200 bg-gray-300 p-2 m-1`}>
                    {item.numero}
                </label>
            }
            {item.status == 'Selecionado' &&
                <label
                    onClick={onClick}
                    className={`disponivel text-white text-center rounded-lg h-10 w-20 cursor-pointer bg-[#274584] p-2 m-1`}>
                    {item.numero}
                </label>
            }
            {item.status == 'Reservado' &&
                <label
                    onClick={onClick}
                    className={`reservado  text-center rounded-lg h-10 w-20 cursor-pointer bg-warning p-2 m-1`}>
                    {item.numero}
                </label>
            }
            {item.status == 'Pago' &&
                <label
                    onClick={onClick}
                    className={`pago text-center rounded-lg h-10 w-20 cursor-pointer bg-green-500 p-2 m-1`}>
                    {item.numero}
                </label>
            }
        </>
    )

}