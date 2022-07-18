import { Layout } from "../../components/Layout";

const TermosDeUso = () => {
    return (
        <Layout>
            <div className="container flex flex-col my-24 shadow-md p-4 justify-center text-gray-500">
                <h4 className="font-sans">Termos de uso</h4>
                <hr />
                <p>Ao criar uma conta de organizador ou participar de uma ação entre amigos na RifaWeb, você declara ter lido estes termos de uso e passa a aceitá-los.</p>

                <section className="cadastroSite text-justify">
                    <h4>Do cadastro e uso do site</h4>
                    <p>
                        Após cadastrar-se na RifaWeb o usuário poderá participar e/ou criar ações entre amigos popularmente conhecidas como rifas, com o objetivo de arrecadar fundos para causas sociais e/ou pessoais.
                    </p>
                    <p>
                        Para utilizar a RifaWeb o usuário precisa ter completado 18 anos.

                    </p>
                    <p>
                        O usuário declara ter lido e aceitado esses termos e se compromete a segui-los sob pena de ter a conta suspensa temporariamente ou em definitivo, dessa forma ficando impedido de utilizar o App e participar de ações.
                        A criadora do site se reserva o direito de avaliar a conduta de todos os usuários no que tange a criação e a participação dos mesmos nas ações entre amigos presentes neste App, isso inclui reservas de bilhetes, envios de imagens, títulos e descrições de suas ações, bem como fotos de perfil.

                    </p>
                    <p>
                        Para realizar quaisquer procedimentos nas ações é necessário estar conectado à internet.
                    </p>
                </section>

                <section className="envolvimentoSite text-justify">
                    <h4>Do envolvimento do RifaWeb</h4>
                    <p>A RifaWeb não se envolve nas rifas e sob nenhuma hipótese poderá ser responsabilizado legalmente por quaisquer fatos ocorridos nas rifas.</p>
                </section>

                <section className="taxas text-justify">
                    <h4>Das taxas e tarifas</h4>
                    <p>Será aplicada taxa de serviço de 12% (Dose por cento) por número vendido via PIX</p>
                </section>
                <section className="pagamento text-justify">
                    <h4>Do recebimento de pagamentos</h4>
                    <p>Para receber os pagamentos o criador da ação deverá informar: a chave PIX para que possa ser realizado o saque, a qualquer momento.</p>
                    <p>O valor mínimo para solicitação de saque é de R$ 1,00 (Um real).</p>
                    <p>A RifaWeb se reserva o direito de reajustar suas taxas de serviço e tarifas, bem como modificar a forma de cobrança da mesma, informando o usuário no momento da criação de cada rifa.</p>
                </section>
                <section className="rifas text-justify">
                    <h4>Da criação das rifas entre amigos</h4>
                    <p>Todo e qualquer usuário com conta ativa na RifaWeb poderá criar rifas desde que respeitando e seguindo os termos de utilização. A incumbência pelas informações e imagens utilizadas na criação das ações é do usuário na sua integralidade, isentando
                        a RifaWeb de quaisquer problemas decorrentes de participações nestas rifas, cabendo a RifaWeb apenas recomendar que todos os usuários somente participem de ações cujo os responsáveis sejam pessoas conhecidas, com as quais possuam relação de confiança.
                    </p>
                    <p>Uma vez que a rifa tenha um numero reservado ou pago, alguns campos são automaticamente bloqueados e só será permitido editar as seguintes informações:  para o sorteio e Imagem do prêmio, promoções, premios. Os demais campos não poderão ser alterados para garantir a lisura da rifa.</p>
                    <p>Não é permitido a criação de rifas duplicadas com o mesmo tema. A violação deste item poderá levar à suspensão da conta de usuário.</p>
                    <p>Todos os processos da plataforma são completamente automatizados sem nenhuma intervenção humana. Apenas os números sorteados pela LOTERIA FEDERAL são adicionados pelo criador da rifa. A RifaWeb não cria, não administra, não participa e nem mesmo sorteia quaisquer rifas aqui disponibilizadas, apenas fornece a plataforma para a realização das mesmas.</p>
                    <p>Todo e qualquer usuário que criar uma rifa compromete-se a realizá-la respeitando todos os termos aqui dispostos, sendo o único responsável pela entrega do prêmio.</p>
                </section>
                <section className="participacaoRifa text-justify">
                    <h4>Da participação nas rifas</h4>
                    <p>Toda e qualquer pessoa maior de 18 anos pode participar de ações disponíveis. A RifaWeb recomenda a todos os usuários que apenas participem de ações criadas por usuários conhecidos, do seu circulo de amizades e que tenha uma relação de amizade e confiança. A RifaWeb não realiza mediações caso haja algum tipo de disputa entre o criador da ação e seus participantes, ou seja, tudo deverá ser tratado entre as partes CRIADOR DA AÇÃO e PARTICIPANTE. Caberá a RifaWeb apenas suspender temporariamente ou definitivamente uma conta de usuário e/ou rifa que viole os termos aqui dispostos.</p>
                </section>
                <section className="definicaoGanhador text-justify">
                    <h4>Da definição do ganhador</h4>
                    <p>Os ganhadores serão definidos com base no resultado da Loteria Federal da data do sorteio. Todas rifas deverão OBRIGATORIAMENTE ser realizadas em uma data onde seja realizado o sorteio da Loteria Federal (quarta ou quinta).</p>
                    <p>Em ações com mais de mil bilhetes onde não houver ganhador e o organizador optar por FORÇAR GANHADOR, o algoritmo encontrará os ganhador entre os bilhetes pagos mais próximos do bilhete sorteado sem ganhador, caso o bilhete premiado tenha numeração maior que o número total de bilhetes da ação o algoritmo buscará o ganhador entre os bilhetes pagos usando o a função RAND, ou seja, encontrará um ganhador de forma aleatória. </p>
                    <p>O ganhador do sorteio será sempre o participante que tiver seu nome e celular gravados no número premiado. No caso de pagamento em duplicidade, ou seja, em casos raros onde duas pessoas clicam no mesmo bilhete simultaneamente o ganhador do sorteio será o participante que tiver o nome e celular gravados no bilhete no momento do sorteio. O participante que, no caso de compra em duplicidade não tiver o nome gravado no bilhete deverá solicitar reembolso do valor pago pelo bilhete em questão.</p>
                </section>
                <section className="cancelmanetoRifa text-justify">
                    <h4>Da definição do ganhador</h4>
                    <p>A RifaWeb poderá, sem aviso prévio, cancelar qualquer rifa que viole um ou mais termos aqui dispostos.</p>
                </section>
                <section className="reembolso text-justify">
                    <h4>Do reembolso</h4>
                    <p>O reembolso de números vendidos on-line via PIX dentro da plataforma é de responsabilidade do criador.</p>
                </section>
                <section className="usodeImagem text-justify">
                    <h4>Do uso das imagens de perfil</h4>
                    <p>A criadora do site poderá utilizar a imagem de perfil enviada pelo usuário para fins de divulgação das rifas, bem como na capa e nas demais páginas do site.</p>
                </section>
                <section className="proibicao text-justify">
                    <h4>Das proibições</h4>
                    <p>É completamente vedado o uso de perfis falsos visando criar rifas sem a genuína intenção de realizá-las seguindo os termos aqui dispostos.</p>
                    <p>É completamente vedado a participação do organizador em sua própria rifa.</p>
                    <p>É completamente vedado ofertar como prêmio bem alienado (que ainda não está quitado) como imóveis e veículos.</p>
                    <p>É completamente vedado simular vendas para alcançar a meta de forma artificial.</p>
                    <p>Será cancelada qualquer rifa que ofereça como prêmio ou como parte do prêmio: Conteúdo sexualmente explícito, armas de fogo, armas brancas, simulacros de armas de fogo, produtos perecíveis, medicamentos, serviços, produtos químicos de potencial periculosidade, explosivos ou qualquer outro que a RifaWeb julgue inapropriado ou em inconformidade com os termos aqui dispostos ou com as leis vigentes. Ações que tenham em sua descrição conteúdo preconceituoso, ofensivo ou violento também serão canceladas.</p>
                    <p>A RifaWeb pode alterar a qualquer momento estes termos visando melhorar a qualidade do serviço oferecido.</p>
                    <p>A RifaWeb informará a todos os usuários sempre que ocorrer uma alteração nos termos de uso e o usuário deverá aceitar as mudanças para continuar utilizando o site.</p>
                </section>
            </div>
        </Layout>
    )
}

export default TermosDeUso;