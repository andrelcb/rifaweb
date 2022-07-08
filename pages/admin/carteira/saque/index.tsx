import { ChangeEvent, useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import NumberFormat from "react-number-format";
import { toast } from "react-toastify";
import { Alerta } from "../../../../components/Alerta"
import { LayoutAdmin } from "../../../../components/LayoutAdmin";
import { AuthContext } from "../../../../contexts/Auth/AuthContext";
import { useApi } from "../../../../hooks/useApi";
import currencyFormatter from "../../../../utils/formatacaoBrl";


interface formData {
    chavePix: string,
    valor: number,
    senha: string,

}
const Saque = () => {
    const auth = useContext(AuthContext);
    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<formData>();
    const [chavePix, setChavePix] = useState<string>('CPF');
    const api = useApi();

    const changeChavePix = (e: ChangeEvent<HTMLSelectElement>) => {
        const chave = e.target.value;
        if (chave == "CPF" && auth.usuario?.cpf) {
            setChavePix(e.target.value)
            setValue('chavePix', auth.usuario?.cpf);
        }
        if (chave == "email" && auth.usuario?.cpf) {
            setChavePix(e.target.value)
            setValue('chavePix', auth.usuario?.email);
        }
        if (chave == "celular" && auth.usuario?.cpf) {
            setChavePix(e.target.value)
            setValue('chavePix', auth.usuario?.numero_celular);
        }
        if (chave == "aleatoria" && auth.usuario?.cpf) {
            setChavePix(e.target.value)
            setValue('chavePix', '');
        }
    }

    const sacar = async (data: formData) => {
        if (data) {
            const resposta = await api.sacar(data);
            if (resposta.erro === 0) {
                toast.success('Saque realizado com sucesso.');
            } else {
                toast.error(resposta.erro);
            }
        }

    }
    return (
        <LayoutAdmin>
            <>
                <Alerta />
                <div className="bg-white shadow mb-5 p-3">
                    <h1>Saque</h1>
                    <h5 className="fs-12px text-black-50 mb-4">Realize seus saques de forma pratica e rápida via pix.</h5>
                </div>

                <form onSubmit={handleSubmit(sacar)}>
                    <div className="flex flex-col p-4 shadow space-y-10">
                        <div className="flex flex-col p-3 w-80 md:w-2/4 shadow">
                            <h3 className="text-2xl">Destino do saque</h3>
                            <p className="text-black-50">Escolha sua chave pix.</p>
                            <label htmlFor="aleatoria" className="block text-sm font-medium text-gray-700">Tipo da chave pix</label>
                            <select className="select-form" onChange={changeChavePix}>
                                <option value="CPF">CPF</option>
                                <option value="email">Email</option>
                                <option value="celular">Telefone</option>
                                <option value="aleatoria">Aleatória</option>
                            </select>
                            <div className="mt-4">
                                {chavePix == 'CPF' &&
                                    <>
                                        <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">CPF</label>
                                        <input
                                            {...register('chavePix')}
                                            type="text"
                                            id="cpf"
                                            defaultValue={auth.usuario?.cpf}
                                            disabled
                                            className="form-control"
                                        />
                                    </>
                                }
                                {chavePix == 'email' &&
                                    <>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
                                        <input
                                            {...register('chavePix', {
                                                required: "Digite sua chave pix.",
                                                validate: {
                                                    required: (value) => { return !!value.trim() }
                                                }
                                            })}
                                            type="text"
                                            id="email"
                                            defaultValue={auth.usuario?.email}
                                            className={`form-control ${errors.chavePix ? 'is-invalid' : 'is-valid'}`}
                                        />
                                        {errors.chavePix && errors.chavePix.type === "required" ? <p className="text-red-600">Preencha a chave pix.</p> : null}
                                    </>
                                }
                                {chavePix == 'celular' &&
                                    <>
                                        <Controller
                                            name="chavePix"
                                            control={control}
                                            rules={{
                                                required: 'Esse campo é obrigatório',
                                                minLength: {
                                                    value: 15,
                                                    message: "O numero do celular precisar ter no minimo 9 digitos"
                                                },
                                            }}
                                            render={({ field }) => <NumberFormat
                                                {...field}
                                                format="(##) #####-####"
                                                mask=""
                                                className={`form-control ${errors.chavePix ? 'is-invalid' : 'is-valid'}`} />}
                                        />
                                        {errors.chavePix ? <p className="text-red-600">{errors.chavePix.message}</p> : null}
                                    </>
                                }
                                {chavePix == 'aleatoria' &&
                                    <>
                                        <label htmlFor="aleatoria" className="block text-sm font-medium text-gray-700">Chave Aletória</label>
                                        <input
                                            {...register('chavePix', {
                                                required: "Digite sua chave pix.",
                                                validate: {
                                                    required: (value) => { return !!value.trim() }
                                                }
                                            })}
                                            type="text"
                                            id="aleatoria"
                                            className={`form-control ${errors.chavePix ? 'is-invalid' : 'is-valid'}`}
                                        />
                                        {errors.chavePix && errors.chavePix.type === "required" ? <p className="text-red-600">Preencha a chave pix.</p> : null}
                                    </>
                                }
                            </div>
                        </div>
                        <div className="flex flex-col p-3 w-80 md:w-2/4 shadow">
                            <h3 className="text-2xl">Valor do saque</h3>
                            <p className="text-black-50">Informe o valor que deseja sacar.</p>
                            <label htmlFor="valorSaque" className="block text-sm font-medium text-gray-700">Valor do saque</label>

                            <Controller
                                name="valor"
                                control={control}
                                rules={{
                                    minLength: {
                                        value: 1,
                                        message: 'Favor Preencha o valor'
                                    }
                                }}
                                render={({ field }) =>
                                    <NumberFormat
                                        {...field}
                                        placeholder="R$ 0,00"
                                        className={`form-control ${errors.valor ? 'is-invalid' : 'is-valid'}`}
                                        format={currencyFormatter}
                                    />
                                }

                            />
                            <span className="text-sm text-gray-400 ml-2">O valor mínimo para o saque é de R$ 1,00</span>
                            {errors.valor && errors.valor.type === "required" ? <p className="text-red-600">O valor precisa ser maior que R$ 1,00</p> : null}
                        </div>
                        <div className="flex flex-col p-3 w-80 md:w-2/4 shadow">
                            <h3 className="text-2xl">Senha</h3>
                            <p className="text-black-50">Digite sua senha para sacar.</p>
                            <label htmlFor="valorSaque" className="block text-sm font-medium text-gray-700">Senha</label>
                            <input {...register('senha', {
                                validate: {
                                    required: (value) => { return !!value.trim() }
                                }
                            })}
                                className={`form-control ${errors.senha ? 'is-invalid' : 'is-valid'}`}
                                type="password" />
                            {errors.senha && errors.senha.type === "required" ? <p className="text-red-600">Digite a senha para sacar.</p> : null}
                        </div>
                        <div className="flex justify-end p-3 w-80 md:w-2/4">
                            <button className="botao bg-rifaweb-primario">Sacar</button>
                        </div>
                    </div>
                </form>
            </>
        </LayoutAdmin>

    )
}

export default Saque;
