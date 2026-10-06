import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { useState } from "react";

import logo from "@/assets/logo-escura.svg.asset.json";
import hero from "@/assets/home-hero.png.asset.json";
import dashboard from "@/assets/home-dashboard-relatorios.webp.asset.json";
import journey1 from "@/assets/1-crie-e-divulgue.webp.asset.json";
import journey2 from "@/assets/2-venda-e-organize.png.asset.json";
import journey3 from "@/assets/3-opere-oevento.png.asset.json";
import journey4 from "@/assets/4-engaje-app.png.asset.json";
import journey5 from "@/assets/5-finalize-certificados.webp.asset.json";
import event1 from "@/assets/evento-291947-banner.jpeg.asset.json";
import event2 from "@/assets/evento-294023-banner.jpeg.asset.json";
import event3 from "@/assets/evento-289466-banner.jpeg.asset.json";
import event4 from "@/assets/evento-294588-banner.jpeg.asset.json";
import event5 from "@/assets/evento-299793-banner.jpeg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Doity | Plataforma completa para eventos" },
      { name: "description", content: "Crie, divulgue e opere seu evento com autonomia. Tudo conectado na mesma plataforma." },
      { property: "og:title", content: "Doity | Plataforma completa para eventos" },
      { property: "og:description", content: "Tudo que seu evento precisa, em um só lugar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const events = [
  { image: event1.url, category: "ODONTOLOGIA", title: "XIV ENCONTRO PERNAMBUCANO DE ODONTOLOGIA", date: "17 de out. de 2026 · Recife, PE" },
  { image: event2.url, category: "RECURSOS FLORESTAIS E ENGENHARIA FLORESTAL", title: "Uso de Drones na Silvicultura - 3ª Edição", date: "21 de out. de 2026 · Botucatu, SP" },
  { image: event3.url, category: "TECNOLOGIA", title: "AI BRASIL Experience", date: "28 de out. de 2026 · São Paulo, SP" },
  { image: event4.url, category: "MEDICINA", title: "XXI CONGRESSO MÉDICO AMAZÔNICO", date: "06 de nov. de 2026 · Belém, PA" },
  { image: event5.url, category: "MULTIDISCIPLINAR", title: "Agile Trends 2027", date: "12 de abr. de 2027 · São Paulo, SP" },
];

const journey = [
  { number: "01", title: "Crie e divulgue", text: "Monte o site, publique programação e palestrantes e deixe tudo pronto para divulgar.", image: journey1.url },
  { number: "02", title: "Venda e organize inscrições", text: "Crie ingressos, lotes, cupons e formulários e receba pagamentos por Pix, cartão ou boleto.", image: journey2.url },
  { number: "03", title: "Opere o evento", text: "Credencie participantes, imprima etiquetas, controle acessos e acompanhe a operação em tempo real.", image: journey3.url },
  { number: "04", title: "Engaje", text: "Leve programação, networking, gamificação, notificações e patrocinadores para o celular do participante.", image: journey4.url },
  { number: "05", title: "Finalize e continue o relacionamento", text: "Emita certificados, acompanhe dados e mantenha todo o histórico do evento organizado.", image: journey5.url },
];

const audience = [
  ["Corporativos", "Eventos empresariais, convenções, encontros e experiências de marca."],
  ["Acadêmicos e científicos", "Congressos, simpósios, submissões, avaliações e anais."],
  ["Feiras e exposições", "Expositores, patrocinadores, leads, credenciamento e CAEX."],
  ["Esportivos", "Inscrições, categorias, participantes e operação presencial."],
  ["Religiosos", "Congressos, encontros, inscrições e comunicação com grandes públicos."],
];

function BrandButton({ children, outline = false }: { children: React.ReactNode; outline?: boolean }) {
  return <a href="#comece" className={outline ? "btn btn-outline" : "btn btn-primary"}>{children}</a>;
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cookies, setCookies] = useState(true);
  return (
    <main>
      <header className="site-header">
        <nav className="nav-shell" aria-label="Navegação principal">
          <a href="#top" aria-label="Doity"><img className="brand" src={logo.url} alt="Doity" /></a>
          <div className="desktop-nav">
            <a href="#eventos">Participantes <ChevronDown size={13}/></a><a href="#solucoes">Soluções <ChevronDown size={13}/></a><a href="#publicos">Para quem é <ChevronDown size={13}/></a><a href="#precos">Preços</a><a href="#conteudos">Conteúdos</a>
          </div>
          <div className="nav-actions"><a className="login" href="#entrar">Entrar</a><BrandButton outline>Falar com especialista</BrandButton><BrandButton>Criar evento grátis</BrandButton></div>
          <button className="menu-button" aria-label="Abrir menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
        </nav>
        {menuOpen && <div className="mobile-nav"><a href="#eventos">Participantes</a><a href="#solucoes">Soluções</a><a href="#publicos">Para quem é</a><a href="#precos">Preços</a><a href="#conteudos">Conteúdos</a><BrandButton>Criar evento grátis</BrandButton></div>}
      </header>

      <section id="top" className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow"><span className="dots">● ●</span> A plataforma completa para eventos de sucesso</p>
          <h1>Tudo que seu <span>evento</span> precisa, em um só lugar</h1>
          <p className="lead">Crie, divulgue e opere seu evento com autonomia. Site, inscrições, pagamentos, credenciamento, aplicativo, certificados e muito mais. Tudo conectado na mesma plataforma.</p>
          <div className="hero-actions"><BrandButton>Criar evento grátis</BrandButton><BrandButton outline>Falar com um especialista</BrandButton><a className="text-link" href="#eventos">Encontrar eventos <ArrowRight size={14}/></a></div>
        </div>
        <img className="hero-image" src={hero.url} alt="Plataforma Doity no notebook e no celular, com módulos do ecossistema" />
      </section>

      <section id="eventos" className="section events-section">
        <div className="section-heading row-heading"><div><h2>Conheça eventos que acontecem na Doity</h2><p>Encontre congressos, cursos e encontros que já estão abertos para inscrição.</p></div><div className="slider-actions"><button aria-label="Anterior"><ChevronLeft/></button><button aria-label="Próximo"><ChevronRight/></button><a href="#todos">Ver todos →</a></div></div>
        <div className="events-row">{events.map((event) => <article className="event-card" key={event.title}><img src={event.image} alt=""/><div className="event-body"><p className="event-category">{event.category}</p><h3>{event.title}</h3><p className="event-date">{event.date}</p></div></article>)}</div>
      </section>

      <section className="section autonomy">
        <div><h2>Do it yourself. Doity.</h2><p>A Doity foi criada para dar autonomia a quem organiza.</p><p>Você configura seu evento, publica, vende ingressos, acompanha participantes e ajusta a operação no seu ritmo.</p><p>Sem precisar depender de uma equipe técnica para cada mudança.</p><strong>Seu evento. Sua operação. Seu controle.</strong></div>
        <img src={dashboard.url} alt="Painel da plataforma Doity" />
      </section>

      <section id="solucoes" className="journey-section">
        <div className="section"><div className="section-heading centered"><h2>Da ideia ao pós-evento</h2><p>Uma única plataforma acompanhando toda a jornada, do site ao certificado.</p></div>
          <div className="journey-list">{journey.map((item, i) => <article className={`journey-item ${i % 2 ? "reverse" : ""}`} key={item.number}><div className="journey-copy"><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p><a href="#saiba">Conhecer solução <ArrowRight size={15}/></a></div><div className="journey-visual"><img src={item.image} alt={item.title}/></div></article>)}</div>
          <div className="mini-solutions"><a href="#cientificos"><strong>Trabalhos científicos</strong><span>Submissões, avaliações, anais e certificados para eventos acadêmicos.</span><b>Saiba mais →</b></a><a href="#todas"><strong>Ver todas as soluções</strong><span>Mapa completo da plataforma e dos módulos consultivos.</span><b>Saiba mais →</b></a></div>
        </div>
      </section>

      <section id="precos" className="growth"><div className="section growth-inner"><h2>Comece simples. Evolua quando precisar.</h2><p>Nem todo evento precisa de tudo no primeiro dia. Você pode começar com site + inscrições + pagamentos e adicionar novas soluções conforme a operação cresce.</p><div className="steps"><span>Começar</span><b>→</b><span>Operar</span><b>→</b><span>Expandir</span></div><strong>Uma plataforma que acompanha o tamanho do seu evento.</strong></div></section>

      <section className="section complex"><div className="section-heading centered"><h2>Operações mais complexas também cabem aqui</h2><p>Além da plataforma principal, a Doity possui soluções para eventos com necessidades específicas.</p></div><div className="complex-grid">{[["CAEX","Centralize a gestão de expositores e patrocinadores, entregas, documentos, credenciais e atendimento."],["Curadoria","Organize propostas de conteúdo, avaliações, aprovações e montagem da programação."],["Aplicativo exclusivo","Crie uma experiência própria para o participante com networking, negócios e engajamento."]].map((x,i)=><article key={x[0]}><div className={`abstract abstract-${i+1}`}></div><h3>{x[0]}</h3><p>{x[1]}</p><a href="#saiba">Saiba mais →</a></article>)}</div></section>

      <section id="publicos" className="audience-section"><div className="section"><div className="section-heading centered"><h2>Doity: perfeita para diferentes tipos de eventos</h2><p>A tecnologia é a mesma. A operação muda conforme o evento.</p></div><div className="audience-grid">{audience.map((item,i)=><a href="#saiba" className={`audience-card audience-${i+1}`} key={item[0]}><div><h3>{item[0]}</h3><p>{item[1]}</p><span>Conhecer →</span></div></a>)}</div></div></section>

      <section id="comece" className="cta-section"><div><p className="eyebrow">● ● PRONTO PARA COMEÇAR?</p><h2>Seu próximo evento começa aqui.</h2><p>Crie sua conta gratuitamente ou fale com quem entende de operação de eventos.</p><div><BrandButton>Criar evento grátis</BrandButton><BrandButton outline>Falar com especialista</BrandButton></div></div></section>
      <footer id="conteudos"><div className="footer-shell"><div><img src={logo.url} alt="Doity"/><p>Tecnologia para eventos de todos os tamanhos.</p></div><div><strong>Plataforma</strong><a href="#solucoes">Soluções</a><a href="#precos">Preços</a><a href="#eventos">Eventos</a></div><div><strong>Conteúdos</strong><a href="#blog">Blog</a><a href="#materiais">Materiais gratuitos</a><a href="#ajuda">Central de ajuda</a></div><div><strong>Doity</strong><a href="#sobre">Sobre nós</a><a href="#carreiras">Carreiras</a><a href="#contato">Contato</a></div></div><div className="copyright">© 2026 Doity. Todos os direitos reservados.</div></footer>
      {cookies && <aside className="cookie-box"><p>Usamos cookies opcionais para medir o desempenho e melhorar sua experiência. Você pode aceitar ou recusar conforme nossa <b>política de cookies.</b></p><button onClick={()=>setCookies(false)}>Recusar</button><button className="accept" onClick={()=>setCookies(false)}>Aceitar</button></aside>}
    </main>
  );
}