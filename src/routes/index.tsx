import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, Heart, Leaf, Music2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import garden from "@/assets/parque.jpg";
import flowers from "@/assets/playa.jpg";
import friends from "@/assets/plaza.jpg";
import sea from "@/assets/paseo.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Para ti, con amor · Feliz cumpleaños" },
    { name: "description", content: "Una celebración del 16 de octubre entre flores, recuerdos, música y palabras desde el corazón." },
    { property: "og:title", content: "Para ti, con amor · Feliz cumpleaños" },
    { property: "og:description", content: "Un pequeño jardín de recuerdos para celebrar tu vida este 16 de octubre." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: BirthdayPage,
});

const moments = [
  { src: flowers, title: "momentos especiales", caption: "dia en la playa.", note: "aqui va algo" },
  { src: friends, title: "Las risas que se quedan", caption: "momentos", note: "va algo" },
  { src: sea, title: "Donde siempre queremos volver", caption: "te seo lo mejor", note: "me tengo que poner creativo jaja" },
];
const navigation = [{ id: "inicio", label: "Inicio" }, { id: "tu-dia", label: "Tu día" }, { id: "recuerdos", label: "Recuerdos" }, { id: "para-ti", label: "Para ti" }, { id: "musica", label: "Música" }];

function BotanicalSprig({ className = "" }: { className?: string }) {
  return <svg className={`botanical-sprig ${className}`} viewBox="0 0 100 180" fill="none" aria-hidden="true"><path d="M48 173C43 122 67 75 63 10"/><path d="M52 142C20 142 12 126 17 109C36 109 49 120 52 142ZM55 118C82 117 94 98 84 83C65 90 57 101 55 118ZM57 93C33 91 23 75 28 61C47 63 56 79 57 93ZM62 68C81 62 89 48 80 34C66 42 61 54 62 68ZM62 43C48 32 48 18 58 8C68 18 68 32 62 43Z"/></svg>;
}

function BirthdayPage() {
  const [active, setActive] = useState("inicio");
  const [selected, setSelected] = useState<number | null>(null);
  const [wish, setWish] = useState(false);
  const [spotify, setSpotify] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: "-20% 0px -55% 0px" });
    navigation.forEach(item => { const section = document.getElementById(item.id); if (section) observer.observe(section); });
    return () => observer.disconnect();
  }, []);
  const go = (id: string) => { setActive(id); document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }); };
  const moment = selected === null ? null : moments[selected];

  return <main>
    <header className="floating-header">
      <a className="wordmark" href="#inicio" onClick={e => { e.preventDefault(); go("inicio"); }}><Leaf size={20} strokeWidth={1.4}/><span>Veronica<span className="wordmark-dot">.</span></span></a>
      <nav aria-label="Navegación principal">{navigation.map(item => <Button key={item.id} variant="navigation" onClick={() => go(item.id)} aria-current={active === item.id ? "location" : undefined}>{item.label}</Button>)}</nav>
      <Heart className="nav-heart" size={18} strokeWidth={1.4}/>
    </header>

    <section className="birthday-cover" id="inicio">
      <img className="cover-photo" src={garden} alt="Un paseo entre flores blancas en un jardín lleno de luz" width={1920} height={1024}/>
      <div className="cover-shade"/>
      <div className="cover-content"><p className="eyebrow cover-eyebrow"><span/>16 DE OCTUBRE · UN DÍA PARA CELEBRARTE</p><h1>Feliz<br/><em>cumpleaños.</em></h1><p className="cover-message">Hay personas que hacen la vida más bonita.<br/>Y tú eres una de ellas.</p><Button variant="botanical" onClick={() => go("tu-dia")}>desliza <ArrowDown size={16}/></Button><p className="cover-signature">con mucho cariño amistad</p></div>
      <span className="cover-index">UN NUEVO AÑO MAS DE VIDA</span>
      <Button variant="navigation" size="icon" className="scroll-cue" aria-label="Ir a tu día" onClick={() => go("tu-dia")}><ArrowDown size={18}/></Button>
    </section>

    <section className="day-section section-wrap" id="tu-dia">
      <div className="day-copy"><p className="eyebrow">NO ES UN DÍA CUALQUIERA</p><h2>El mundo es más bonito<br/>desde que <em>estás en él.</em></h2><p>Hay fechas importantes.<br/>El 16 de octubre es una de ellas.</p><div className="small-dedication"><span className="fine-line"/><span>Este día es para tí.</span><Leaf size={19} strokeWidth={1}/></div></div>
      <div className="calendar" aria-label="Calendario de octubre de 2026, cumpleaños el día 16"><BotanicalSprig className="calendar-sprig"/><div className="calendar-heading"><h3>Octubre</h3><span>2026</span></div><div className="calendar-grid">{["L", "M", "M", "J", "V", "S", "D"].map((day, i) => <span className="weekday" key={`w${i}`}>{day}</span>)}{Array.from({ length: 3 }, (_, i) => <span key={`blank${i}`}/>)}{Array.from({ length: 31 }, (_, i) => i + 1).map(day => day === 16 ? <Button key={day} variant="navigation" className="birthday-date" aria-label="16 de octubre: pide un deseo" onClick={() => setWish(true)}>16<Leaf className="date-leaf" size={16}/></Button> : <span key={day}>{day}</span>)}</div><div className="calendar-footer"><Heart size={13}/><span>El día que la vida nos dio un regalo</span></div></div>
    </section>

    <section className="memories-section" id="recuerdos"><div className="section-wrap memories-inner"><div className="section-heading"><p className="eyebrow">PEQUEÑOS MOMENTOS</p><h2>La vida, <em>en recuerdos.</em></h2><p>Somos un instante, mas vale vivirlo al maximo.</p></div><div className="polaroid-grid">{moments.map((photo, i) => <Button key={photo.src} variant="photo" className={`polaroid polaroid-${i}`} onClick={() => setSelected(i)} aria-label={`Ver recuerdo: ${photo.title}`}><span className="photo-tape"/><img src={photo.src} alt={photo.title} width={768} height={1024} loading="lazy"/><span className="polaroid-caption">{photo.caption}</span><span className="polaroid-number">0{i + 1} <Heart size={12}/></span></Button>)}</div><div className="gallery-end"><span/><Leaf size={19} strokeWidth={1.2}/><span/></div></div></section>

    <section className="letter-section section-wrap" id="para-ti"><div className="section-heading"><p className="eyebrow">aqui va algo...</p><h2>cara? foto? <em>que pongo.</em></h2></div><article className="letter-paper"><BotanicalSprig className="letter-sprig-top"/><BotanicalSprig className="letter-sprig-bottom"/><Heart className="letter-heart" size={22} strokeWidth={1}/><h3>..</h3><p>espacio en blancooooooooo</p><p></p><p></p><p></p><p className="letter-last"><br/></p><div className="letter-signature"><span></span></div></article></section>

    <section className="music-section" id="musica"><div className="section-wrap music-inner"><div className="music-copy"><p className="eyebrow">musica</p><h2>creo que aqui pondre algo<br/>cancion <em>una cancion</em></h2><p>que pondre, no lo se.<br/>....</p><span className="music-note"><Music2 size={16}/> tal vez si ponga una cancion</span></div><div className="spotify-container">{spotify ? <iframe title="Reproductor de Spotify: una canción para ti" src="https://open.spotify.com/embed/track/3U4isOIWM3VvDubwSI3y7a?utm_source=generator" width="100%" height="352" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"/> : <div className="spotify-preview"><div className="record-art"><BotanicalSprig/><span>.....<br/><em>......</em></span></div><div className="spotify-preview-info"><span className="spotify-brand"><Music2 size={16}/> Spotify</span><h3>prueba, cancion ramdom</h3><p>all of me</p><Button variant="botanical" onClick={() => setSpotify(true)}><Music2 size={15}/> Abrir reproductor</Button></div></div>}</div></div></section>
    <footer className="birthday-footer"><Leaf size={25} strokeWidth={1}/><p>Que la vida siempre te encuentre <em>floreciendo.</em></p><span>16 DE OCTUBRE · feliz cumpleaños</span><Heart size={14} strokeWidth={1.2}/></footer>

    <Dialog open={moment !== null} onOpenChange={open => { if (!open) setSelected(null); }}><DialogContent className="memory-dialog"><DialogTitle>{moment?.title}</DialogTitle><DialogDescription>{moment?.note}</DialogDescription>{moment && <img src={moment.src} alt={moment.title} width={768} height={1024}/>}<div className="memory-controls"><Button variant="ghost" size="icon" aria-label="Recuerdo anterior" onClick={() => setSelected(previous => ((previous ?? 0) + moments.length - 1) % moments.length)}><ArrowLeft/></Button><span>{(selected ?? 0) + 1} / {moments.length}</span><Button variant="ghost" size="icon" aria-label="Siguiente recuerdo" onClick={() => setSelected(previous => ((previous ?? 0) + 1) % moments.length)}><ArrowRight/></Button></div></DialogContent></Dialog>
    <Dialog open={wish} onOpenChange={setWish}><DialogContent className="wish-dialog"><Sparkles size={32}/><DialogTitle>pide un deseo.</DialogTitle><DialogDescription>Que todo eso que te hace ilusión encuentre su camino hacia ti. Feliz cumpleaños amistad.</DialogDescription><Button variant="botanical" onClick={() => setWish(false)}>Que así sea <Heart size={15}/></Button></DialogContent></Dialog>
  </main>;
}