import { Layout } from "../../components/Layout";

const PoliticaDePrivacidade = () => {
    return (
        <Layout>
            <div className="container flex flex-col my-24 shadow-md p-4 justify-center text-gray-500">
                <h4 className="font-sans">Política de Privacidade</h4>
                <hr />
                <p>A privacidade e a proteção dos seus dados pessoais são um objetivo permanente da RifaWeb, pelo que é nosso firme compromisso zelar pela segurança e confidencialidade desses dados.</p>

                <p>Apenas recolhemos os dados estritamente necessários à nossa atividade. Esses dados não serão utilizados para outras finalidades que não aquelas que forem indicadas.</p>

                <p>Os dados recolhidos serão conservados pelo período necessário para a finalidade para o qual foram recolhidos, salvo disposições legais em vigor e/ou verificando-se algum interesse legítimo por parte da RifaWeb para a sua manutenção, exceto se prevalecerem direitos ou liberdades fundamentais do titular dos dados.</p>

                <p>No âmbito da sua atividade a RifaWeb poderá ceder os seus dados pessoais a entidades terceiras mas, nesses casos, a RifaWeb assegurará que tais entidades apresentaram garantias suficientes de aplicação de medidas técnicas e organizativas adequadas ao tratamento dos dados nos termos do Regulamento Geral de Protecção de Dados (RGPD).</p>

                <section className="tipoDados text-justify">
                    <h4>Que tipos de dados pessoais são recolhidos</h4>
                    <p>A RifaWeb recolhe apenas os dados pessoais necessários para instruir os processos individuais dos seus usuários.</p>
                </section>
                <section className="finalidade text-justify">
                    <h4>Para que finalidades são recolhidas esses dados pessoais</h4>
                    <p>O recolha e tratamento da informação obtida tem por finalidade manter, administrar e gerir a relação existente entre o usuário e a RifaWeb, bem como manter o usuário informado e/ou obter sugestões do mesmo sobre valências, serviços e atividades que possam ser do seu interesse. A RifaWeb utilizará ainda os seus dados pessoais para produzir estatísticas de uso de suas aplicações.</p>
                </section>
                <section className="acesso text-justify">
                    <h4>Quem tem acesso aos seus dados pessoais</h4>
                    <p>A RifaWeb adotou medidas para garantir que os seus funcionários ou colaboradores com acesso aos seus dados pessoais, no contexto das respectivas tarefas, procederão ao correto tratamento desses dados, nos termos da presente política de privacidade e das obrigações legais de proteção de dados em vigor.
                    </p>
                    <p>Sempre que a RifaWeb cede dados pessoais cujo tratamento é responsável a entidades terceiras, no âmbito da sua atividade profissional, salvaguardará junto dessas entidades, mediante instrumento contratual, o cumprimento do RGPD e demais legislação aplicável, no que respeita à segurança e proteção dos seus dados pessoais.</p>
                </section>
                <section className="participacaoRifa text-justify">
                    <h4>Da participação nas rifas</h4>
                    <p>Toda e qualquer pessoa maior de 18 anos pode participar de ações disponíveis. A RifaWeb recomenda a todos os usuários que apenas participem de ações criadas por usuários conhecidos, do seu circulo de amizades e que tenha uma relação de amizade e confiança. A RifaWeb não realiza mediações caso haja algum tipo de disputa entre o criador da ação e seus participantes, ou seja, tudo deverá ser tratado entre as partes CRIADOR DA AÇÃO e PARTICIPANTE. Caberá a RifaWeb apenas suspender temporariamente ou definitivamente uma conta de usuário e/ou rifa que viole os termos aqui dispostos.</p>
                </section>
                <section className="adicionar text-justify">
                    <h4>Adicionar, Alterar e Apagar Dados Pessoais</h4>
                    <p>Os titulares dos dados podem adicionar, retificar, solicitar a portabilidade ou a exclusão dos seus dados pessoais através do endereço de e-mail: contato@rifaweb.app</p>
                    <p>Tais pedidos serão tratados no prazo máximo de 30 dias.</p>
                </section>
                <section className="segurancaDadosPessoais text-justify">
                    <h4>Segurança dos Dados Pessoais</h4>
                    <p>A RifaWeb compromete-se a cumprir a sua obrigação de sigilo com os dados pessoais recolhidos e tomará as medidas necessárias para impedir a sua alteração, perda ou acesso não autorizado, de acordo com a legislação em vigor.</p>
                </section>
                <section className="coockies text-justify">
                    <h4>Uso de Cookies</h4>
                    <p>O site RifaWeb utiliza cookies próprios e de terceiros para analisar a atividade do utilizador, melhorar os seus serviços na página web e fornecer uma boa experiência de navegação. Estes cookies não armazenam informações de identificação pessoal e, ao usar a nossa página web, está autorizando o uso destes cookies.</p>
                </section>
                <section className="modificacao text-justify">
                    <h4>Modificação da Política de Privacidade</h4>
                    <p>A RifaWeb pode modificar sua Política de Privacidade de acordo com a legislação aplicável em cada momento. Em todo o caso, qualquer modificação da Política de Privacidade será devidamente publicitada para que seja informado sobre as alterações efetuadas no tratamento dos seus dados pessoais e, sendo legalmente exigível, poderá dar o seu consentimento.</p>
                </section>
                <section className="contatos text-justify">
                    <h4>Das proibições</h4>
                    <p>Se tiver alguma questão relacionada com a presente política de privacidade, ou alguma sugestão que deseje apresentar, poderá contatar-nos através do e-mail contato@rifaweb.app </p>
                </section>
            </div>
        </Layout>
    )
}

export default PoliticaDePrivacidade;