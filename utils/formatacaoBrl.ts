export default function currencyFormatter(value: string) {
    if (!Number(value)) return "";

    const valorFloat = parseFloat(value);

    const amount = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(valorFloat / 100);

    return `${amount}`;
}