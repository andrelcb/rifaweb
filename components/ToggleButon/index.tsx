
type Props = {
    titulo: string,
    onClick(): void,
    dot?:boolean
}

export const ToggleButon = ({ onClick, titulo,dot }: Props) => {
    return (
        <div className="flex items-center w-full">
            <label htmlFor="toggleB" className="flex items-center cursor-pointer">
                {/* <!-- toggle --> */}
                <div className="relative">
                    {/* <!-- input --> */}
                    <input type="checkbox" id="toggleB" className="sr-only" onClick={onClick} />
                    {/* <!-- line --> */}
                    <div className="block line bg-gray-600 w-10 h-4 rounded-full"></div>
                    {/* <!-- dot --> */}
                    <div className={`dot ${dot && 'translate-x-full bg-rifaweb-primario'} absolute bg-slate-50 w-6 h-6 rounded-full shadow -left-1 -top-1 transition`}></div>
                </div>
                {/* <!-- label --> */}
                <div className="ml-3 text-gray-700 font-medium">
                    {titulo}
                </div>
            </label>
        </div>
    )
}