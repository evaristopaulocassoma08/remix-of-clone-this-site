import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";

import { participantesMenu, paraQuemMenu, solucoesMenu } from "@/lib/menus";
import logo from "@/assets/logo-escura.svg.asset.json";

/** Internal routes use Link (no reload); "#" anchors stay plain <a>. */
function NavHref({ href, className, children, onClick }: { href: string; className?: string; children: ReactNode; onClick?: () => void }) {
  if (href.startsWith("#")) return <a href={href} className={className} onClick={onClick}>{children}</a>;
  const [path, hash] = href.split("#");
  return <Link to={path || "/"} hash={hash || undefined} className={className} onClick={onClick}>{children}</Link>;
}

export function BrandButton({ children, outline = false, href = "/#comece" }: { children: ReactNode; outline?: boolean; href?: string }) {
  return <NavHref href={href} className={outline ? "btn btn-outline" : "btn btn-primary"}>{children}</NavHref>;
}

function NavDropdown({ label, href, groups, flat = false }: { label: string; href: string; groups: typeof solucoesMenu; flat?: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("click", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  return (
    <div className="nav-item" ref={ref} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <NavHref href={href} onClick={() => setOpen(true)}>
        {label} <ChevronDown size={13} className={open ? "chevron open" : "chevron"} />
      </NavHref>
      <div className={`mega-menu ${flat ? "mega-flat" : ""} ${open ? "open" : ""}`} aria-hidden={!open}>
        {(() => {
          const [g] = groups;
          if (flat && g) {
            return (
              <>
                <p className="mega-group">{g.group}</p>
                {g.items.map(([title, desc, itemHref]) => (
                  <NavHref key={title} href={itemHref} className="mega-item" onClick={() => setOpen(false)}>
                    <strong>{title}</strong>
                    <span>{desc}</span>
                  </NavHref>
                ))}
              </>
            );
          }
          return groups.map((g) => (
            <div key={g.group}>
              <p className="mega-group">{g.group}</p>
              {g.items.map(([title, desc, itemHref]) => (
                <NavHref key={title} href={itemHref} className="mega-item" onClick={() => setOpen(false)}>
                  <strong>{title}</strong>
                  <span>{desc}</span>
                </NavHref>
              ))}
            </div>
          ));
        })()}
      </div>
    </div>
  );
}

function MobileGroup({ label, menu, open, toggle, close }: { label: string; menu: typeof solucoesMenu; open: boolean; toggle: () => void; close: () => void }) {
  return (
    <div>
      <button className="mobile-trigger" aria-expanded={open} onClick={toggle}>
        {label} <ChevronDown size={14} className={open ? "chevron open" : "chevron"} />
      </button>
      {open && (
        <div className="mobile-sol">
          {menu.map((g) => (
            <div key={g.group}>
              <p>{g.group}</p>
              {g.items.map(([title, desc, href]) => (
                <NavHref key={title} href={href} onClick={close}>
                  <strong>{title}</strong>
                  <span>{desc}</span>
                </NavHref>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobilePart, setMobilePart] = useState(false);
  const [mobileSol, setMobileSol] = useState(false);
  const [mobileAud, setMobileAud] = useState(false);
  const close = () => { setMenuOpen(false); setMobilePart(false); setMobileSol(false); setMobileAud(false); };
  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Navegação principal">
        <NavHref href="/"><img className="brand" src={logo.url} alt="Doity" /></NavHref>
        <div className="desktop-nav">
          <NavDropdown label="Participantes" href="/#eventos" groups={participantesMenu} flat />
          <NavDropdown label="Soluções" href="/#solucoes" groups={solucoesMenu} />
          <NavDropdown label="Para quem é" href="/#publicos" groups={paraQuemMenu} flat />
          <NavHref href="/#precos">Preços</NavHref>
          <NavHref href="/#conteudos">Conteúdos</NavHref>
        </div>
        <div className="nav-actions">
          <a className="login" href="/#entrar">Entrar</a>
          <BrandButton outline>Falar com especialista</BrandButton>
          <BrandButton>Criar evento grátis</BrandButton>
        </div>
        <button className="menu-button" aria-label="Abrir menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </nav>
      {menuOpen && (
        <div className="mobile-nav">
          <MobileGroup label="Participantes" menu={participantesMenu} open={mobilePart} toggle={() => setMobilePart(!mobilePart)} close={close} />
          <MobileGroup label="Soluções" menu={solucoesMenu} open={mobileSol} toggle={() => setMobileSol(!mobileSol)} close={close} />
          <MobileGroup label="Para quem é" menu={paraQuemMenu} open={mobileAud} toggle={() => setMobileAud(!mobileAud)} close={close} />
          <NavHref href="/#precos" onClick={close}>Preços</NavHref>
          <NavHref href="/#conteudos" onClick={close}>Conteúdos</NavHref>
          <BrandButton href="/#comece">Criar evento grátis</BrandButton>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer id="conteudos">
      <div className="footer-shell">
        <div><img src={logo.url} alt="Doity" /><p>Tecnologia para eventos de todos os tamanhos.</p></div>
        <div>
          <strong>Plataforma</strong>
          <NavHref href="/#solucoes">Soluções</NavHref>
          <NavHref href="/#precos">Preços</NavHref>
          <NavHref href="/#eventos">Eventos</NavHref>
          <NavHref href="/plataforma-de-eventos">Plataforma de eventos</NavHref>
        </div>
        <div>
          <strong>Conteúdos</strong>
          <NavHref href="/#blog">Blog</NavHref>
          <NavHref href="/#materiais">Materiais gratuitos</NavHref>
          <NavHref href="/#ajuda">Central de ajuda</NavHref>
        </div>
        <div>
          <strong>Doity</strong>
          <NavHref href="/#sobre">Sobre nós</NavHref>
          <NavHref href="/#carreiras">Carreiras</NavHref>
          <NavHref href="/#contato">Contato</NavHref>
        </div>
      </div>
      <div className="copyright">© 2026 Doity. Todos os direitos reservados.</div>
    </footer>
  );
}

export function CookieBox() {
  const [cookies, setCookies] = useState(true);
  if (!cookies) return null;
  return (
    <aside className="cookie-box">
      <p>Usamos cookies opcionais para medir o desempenho e melhorar sua experiência. Você pode aceitar ou recusar conforme nossa <b>política de cookies.</b></p>
      <button onClick={() => setCookies(false)}>Recusar</button>
      <button className="accept" onClick={() => setCookies(false)}>Aceitar</button>
    </aside>
  );
}
