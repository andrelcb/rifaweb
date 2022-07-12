export const SideBarRota = [
    { nome: 'Inicio', path: ['/admin'], icone: 'bi bi-house-door', spacing: true },
    {
        nome: 'Carteira',
        icone: 'bi bi-wallet',
        path: [''],
        submenu: [
            { nome: 'Saque', path: ['/admin/carteira/saque'] },
            { nome: 'Histórico', path: ['/admin/carteira/historico'] }
        ]
    },
    { nome: 'Criar Rifa', path: ['/admin/criar-rifa', '/admin/editar-rifa/[id]'], icone: 'bi bi-ticket-perforated', spacing: true },
    { nome: 'Pedidos', path: ['/admin/pedidos'], icone: 'bi bi-bag-check', spacing: true },
    { nome: 'Configurações', path: ['/admin/configuracao'], icone: 'bi bi-gear', spacing: true },
];