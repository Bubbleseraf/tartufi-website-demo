import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import heroImage from '../assets/images/hero-tartufi.webp'
import recipeImage from '../assets/images/tagliolini-tartufo.webp'
import oilImage from '../assets/images/olio-tartufo.webp'
import creamImage from '../assets/images/crema-tartufo.webp'
import truffleBirthImage from '../assets/images/processo-nascita.webp'
import truffleHuntImage from '../assets/images/processo-ricerca.webp'
import truffleSelectionImage from '../assets/images/processo-selezione.webp'
import truffleMakingImage from '../assets/images/processo-lavorazione.webp'
import whiteTruffleImage from '../assets/images/varieta-bianco.webp'
import blackTruffleImage from '../assets/images/varieta-nero-pregiato.webp'
import bianchettoImage from '../assets/images/varieta-bianchetto.webp'
import summerTruffleImage from '../assets/images/varieta-estivo.webp'
import uncinatoImage from '../assets/images/varieta-uncinato.webp'
import brumaleImage from '../assets/images/varieta-brumale.webp'
import Icon from '../components/Icon'

function EditorialHero({ eyebrow, title, copy, image = heroImage, className = '' }) {
  return <section className={`editorial-hero ${className}`} style={{ backgroundImage: `linear-gradient(90deg, rgba(16,15,13,.76), rgba(16,15,13,.16)), url(${image})` }}><div className="site-container"><span className="eyebrow eyebrow--light">{eyebrow}</span><h1>{title}</h1><p>{copy}</p></div></section>
}

const truffleVarieties = [
  {
    name: 'Bianco pregiato',
    latin: 'Tuber magnatum Pico',
    period: 'Fine settembre — dicembre',
    aroma: 'Ampio e complesso, con richiami di miele, fieno, terra umida e una nota delicatamente agliacea.',
    ideal: 'A crudo su tagliolini, risotti, uova, fondute e piatti dal gusto misurato.',
    image: whiteTruffleImage,
  },
  {
    name: 'Nero pregiato',
    latin: 'Tuber melanosporum Vitt.',
    period: 'Dicembre — metà marzo',
    aroma: 'Elegante e persistente, con sfumature terrose, fruttate e una piacevole profondità di bosco.',
    ideal: 'Risotti, paste fresche, uova, carni delicate, salse e preparazioni con una breve cottura.',
    image: blackTruffleImage,
  },
  {
    name: 'Bianchetto',
    latin: 'Tuber borchii Vitt.',
    period: 'Metà gennaio — metà aprile',
    aroma: 'Deciso e pungente, caratterizzato da note agliacee che diventano più marcate con la maturazione.',
    ideal: 'Burro, salse, uova, vellutate e primi piatti; preferisce dosi attente e cotture leggere.',
    image: bianchettoImage,
  },
  {
    name: 'Nero estivo',
    latin: 'Tuber aestivum Vitt.',
    period: 'Maggio — agosto',
    aroma: 'Delicato, con sentori di fungo, nocciola e sottobosco; più gentile rispetto alle varietà invernali.',
    ideal: 'Bruschette, ripieni, paste, insalate, formaggi freschi e preparazioni tiepide.',
    image: summerTruffleImage,
  },
  {
    name: 'Uncinato',
    latin: 'Tuber uncinatum Chatin',
    period: 'Fine settembre — dicembre',
    aroma: 'Avvolgente e boschivo, più intenso dello scorzone estivo, con note di terra e frutta secca.',
    ideal: 'Pasta, risotti, polenta, uova, funghi e carni bianche.',
    image: uncinatoImage,
  },
  {
    name: 'Nero invernale',
    latin: 'Tuber brumale Vitt.',
    period: 'Gennaio — metà marzo',
    aroma: 'Intenso e persistente, con sfumature muschiate e un gusto più netto e rustico.',
    ideal: 'Salse, zuppe, ripieni, carni, patate e preparazioni dal sapore strutturato.',
    image: brumaleImage,
  },
]

function TruffleVarietiesCarousel() {
  const trackRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [atEnd, setAtEnd] = useState(false)

  const move = (direction) => {
    const track = trackRef.current
    const firstCard = track?.firstElementChild
    if (!track || !firstCard) return
    const gap = Number.parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 0
    track.scrollBy({ left: direction * (firstCard.getBoundingClientRect().width + gap), behavior: 'smooth' })
  }

  const handleScroll = () => {
    const track = trackRef.current
    const firstCard = track?.firstElementChild
    if (!track || !firstCard) return
    const gap = Number.parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 0
    const nextIndex = Math.round(track.scrollLeft / (firstCard.getBoundingClientRect().width + gap))
    setActiveIndex(Math.max(0, Math.min(nextIndex, truffleVarieties.length - 1)))
    setAtEnd(track.scrollLeft >= track.scrollWidth - track.clientWidth - 2)
  }

  return (
    <section className="varieties-section section" aria-labelledby="varieties-title">
      <div className="site-container">
        <header className="varieties-section__header">
          <div>
            <span className="eyebrow">Le varietà</span>
            <h2 id="varieties-title">Ogni stagione ha<br /><em>il suo carattere.</em></h2>
          </div>
          <div className="carousel-controls">
            <span><strong>{String(activeIndex + 1).padStart(2, '0')}</strong> / {String(truffleVarieties.length).padStart(2, '0')}</span>
            <button onClick={() => move(-1)} disabled={activeIndex === 0} aria-label="Varietà precedente"><Icon name="arrow" size={19} /></button>
            <button onClick={() => move(1)} disabled={atEnd} aria-label="Varietà successiva"><Icon name="arrow" size={19} /></button>
          </div>
        </header>
        <div className="varieties-carousel" ref={trackRef} onScroll={handleScroll}>
          {truffleVarieties.map((variety, index) => (
            <article className="variety-card" key={variety.latin}>
              <div className="variety-card__image">
                <img src={variety.image} alt={`${variety.name}, ${variety.latin}`} loading="lazy" />
                <span>{String(index + 1).padStart(2, '0')}</span>
              </div>
              <div className="variety-card__body">
                <p className="variety-card__latin">{variety.latin}</p>
                <h3>{variety.name}</h3>
                <dl>
                  <div><dt>Periodo di raccolta</dt><dd>{variety.period}</dd></div>
                  <div><dt>Profilo aromatico</dt><dd>{variety.aroma}</dd></div>
                  <div><dt>Ideale per</dt><dd>{variety.ideal}</dd></div>
                </dl>
              </div>
            </article>
          ))}
        </div>
        <p className="varieties-section__note">Periodi indicativi: le date di raccolta possono variare secondo il calendario della singola regione. Le immagini hanno funzione editoriale.</p>
      </div>
    </section>
  )
}

export function TrufflePage() {
  const chapters = [
    {
      eyebrow: 'Dove tutto ha inizio',
      title: 'Sotto la terra,',
      emphasis: 'in perfetto equilibrio.',
      lead: 'Il tartufo nasce nel silenzio, vicino alle radici degli alberi con cui condivide acqua, minerali e tempo.',
      copy: 'Questa relazione naturale, chiamata micorriza, crea un legame invisibile tra fungo, pianta e terreno. Il clima, la composizione del suolo e il ritmo delle piogge danno a ogni esemplare un carattere irripetibile.',
      image: truffleBirthImage,
      alt: 'Tartufo nero che cresce sotto le radici nel terreno del bosco',
      note: 'Terra · radici · simbiosi',
    },
    {
      eyebrow: 'Ogni cosa a suo tempo',
      title: 'La cerca è fatta',
      emphasis: 'di ascolto e attesa.',
      lead: 'Il cane riconosce ciò che l’occhio non può vedere. Il cercatore interpreta il bosco e protegge il punto in cui il tartufo è nato.',
      copy: 'Non si tratta soltanto di trovare: bisogna conoscere le stagioni, leggere il terreno e raccogliere con rispetto. Dopo ogni ritrovamento la terra viene ricomposta, perché il bosco possa continuare il proprio ciclo.',
      image: truffleHuntImage,
      alt: 'Cane da cerca e tartufaio nel bosco siciliano',
      note: 'Istinto · esperienza · rispetto',
    },
    {
      eyebrow: 'La scelta quotidiana',
      title: 'Ogni pezzo viene',
      emphasis: 'conosciuto a mano.',
      lead: 'La selezione comincia dal profumo e continua attraverso consistenza, forma e grado di maturazione.',
      copy: 'Puliamo delicatamente ogni tartufo e lo osserviamo uno per uno. Non cerchiamo uniformità: cerchiamo integrità e carattere. Solo gli esemplari che esprimono il momento giusto proseguono verso la tavola o la lavorazione.',
      image: truffleSelectionImage,
      alt: 'Selezione e pulizia manuale dei tartufi appena raccolti',
      note: 'Pulizia · controllo · selezione',
    },
    {
      eyebrow: 'La lavorazione',
      title: 'Custodire il gusto,',
      emphasis: 'senza coprirlo.',
      lead: 'Quando il tartufo diventa una specialità da dispensa, il nostro compito resta lo stesso: preservarne identità e profondità.',
      copy: 'Lavoriamo in piccoli lotti, con ricette essenziali e passaggi precisi. Olio, creme e conserve nascono per accompagnare la materia, non per mascherarla. È una lavorazione artigianale che unisce memoria siciliana e sensibilità contemporanea.',
      image: truffleMakingImage,
      alt: 'Preparazione artigianale di una conserva al tartufo',
      note: 'Piccoli lotti · ricette essenziali',
    },
  ]

  return <>
    <EditorialHero className="editorial-hero--truffle" eyebrow="Il tartufo" title={<>Una storia che nasce<br /><em>sotto la superficie.</em></>} copy="Dal legame con la terra alla lavorazione artigianale: il nostro modo di conoscere, scegliere e custodire il tartufo." />
    <section className="truffle-story">
      <div className="site-container">
        <header className="truffle-story__intro">
          <span className="eyebrow eyebrow--light">Dal bosco alla bottega</span>
          <h2>Quattro passaggi.<br /><em>Un solo rispetto.</em></h2>
          <p>La qualità nasce prima della raccolta e continua in ogni gesto successivo. Questo è il percorso che accompagna il tartufo fino alla nostra tavola.</p>
        </header>

        <div className="truffle-chapters">
          {chapters.map((chapter, index) => (
            <article className={`truffle-chapter ${index % 2 ? 'truffle-chapter--reverse' : ''}`} key={chapter.eyebrow}>
              <figure className="truffle-chapter__media">
                <img src={chapter.image} alt={chapter.alt} loading={index === 0 ? 'eager' : 'lazy'} />
                <figcaption>{chapter.note}</figcaption>
              </figure>
              <div className="truffle-chapter__content">
                <span className="truffle-chapter__number">0{index + 1}</span>
                <span className="eyebrow eyebrow--light">{chapter.eyebrow}</span>
                <h2>{chapter.title}<br /><em>{chapter.emphasis}</em></h2>
                <p className="truffle-chapter__lead">{chapter.lead}</p>
                <p>{chapter.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
    <TruffleVarietiesCarousel />
    <section className="editorial-cta"><div><span className="eyebrow eyebrow--light">La selezione del momento</span><h2>Scopri ciò che il bosco offre oggi.</h2><Link className="button button--light" to="/shop">Vai alla bottega <Icon name="arrow" size={18} /></Link></div></section>
  </>
}

export function StoryPage() {
  return <>
    <EditorialHero eyebrow="La nostra storia" title={<>Radici siciliane.<br /><em>Uno sguardo nuovo.</em></>} copy="TARTUFI&TARTUFI è un’azienda siciliana dedicata al tartufo, al territorio e alle persone che ne custodiscono la cultura." />
    <section className="manifesto section"><div className="site-container manifesto__grid"><div><span className="eyebrow">Manifesto</span><h2>Non vendiamo abbondanza.<br />Cerchiamo autenticità.</h2></div><div><p className="dropcap">Crediamo in una filiera fatta di relazioni dirette, stagioni rispettate e lavorazioni essenziali. Il tartufo non ha bisogno di essere trasformato in qualcosa che non è.</p><p>La nostra idea di lusso nasce dalla conoscenza: sapere da dove arriva un prodotto, quando è stato raccolto e come utilizzarlo al meglio.</p></div></div></section>
    <section className="story-visual"><img src={heroImage} alt="Bosco siciliano all’alba e tartufi appena raccolti" /><blockquote>“La qualità non si forza.<br />Si aspetta, si riconosce, si rispetta.”</blockquote></section>
    <section className="process section section--cream"><div className="site-container"><div className="section-title section-title--center"><span className="eyebrow">Il nostro metodo</span><h2>Dal terreno alla tavola</h2></div><div className="process-grid">{[['01','Ricerca','Collaboriamo con cercatori che conoscono e rispettano il proprio territorio.'],['02','Selezione','Valutiamo ogni tartufo attraverso profumo, consistenza e grado di maturazione.'],['03','Cura','Prepariamo e proteggiamo ogni ordine per mantenerne intatte le qualità.'],['04','Racconto','Condividiamo consigli semplici per valorizzare ogni prodotto in cucina.']].map(([n,t,p]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{p}</p></article>)}</div></div></section>
    <section className="editorial-cta editorial-cta--light"><div><span className="eyebrow">Incontriamoci</span><h2>Hai una domanda o un progetto speciale?</h2><Link className="button button--dark" to="/contatti">Parliamone <Icon name="arrow" size={18} /></Link></div></section>
  </>
}

const recipes = [
  { title: 'Tagliolini al tartufo nero', meta: '20 min · Facile', image: recipeImage },
  { title: 'Uovo morbido e crema di tartufo', meta: '15 min · Facile', image: creamImage },
  { title: 'Crostini, caprino e miele al tartufo', meta: '10 min · Facile', image: oilImage },
]

export function RecipesPage() {
  return <>
    <section className="page-hero page-hero--recipes"><div className="site-container"><span className="eyebrow">Ricette e abbinamenti</span><h1>Pochi ingredienti.<br /><em>Il gesto giusto.</em></h1><p>Idee essenziali per portare il tartufo a tavola senza coprirne la voce.</p></div></section>
    <section className="recipes-grid-section section"><div className="site-container"><div className="recipe-grid">{recipes.map((recipe, index) => <article className="recipe-card" key={recipe.title}><div><img src={recipe.image} alt={recipe.title} loading="lazy" /><span>0{index + 1}</span></div><p>{recipe.meta}</p><h2>{recipe.title}</h2><button className="link-arrow">Leggi la ricetta <Icon name="arrow" size={17} /></button></article>)}</div></div></section>
    <section className="pairing-banner"><div className="site-container"><div><span className="eyebrow eyebrow--light">Guida rapida</span><h2>Calore sì, cottura no.</h2></div><p>Affetta il tartufo sul piatto appena servito: il calore libera gli aromi, mentre una cottura lunga tende a disperderli.</p></div></section>
  </>
}

export function ContactPage() {
  const [sent, setSent] = useState(false)
  const handleSubmit = (event) => { event.preventDefault(); setSent(true); event.currentTarget.reset() }
  return <section className="contact-page section"><div className="site-container contact-grid"><div className="contact-copy"><span className="eyebrow">Parliamo</span><h1>Ogni domanda merita una risposta <em>fatta bene.</em></h1><p>Scrivici per informazioni sui prodotti, ordini regalo o collaborazioni. Questa prima bozza non invia ancora dati a un server.</p><div className="contact-details"><a href="mailto:info@tartufietartufi.it"><span><Icon name="mail" /></span><div><small>Email</small>info@tartufietartufi.it</div></a><div><span><Icon name="map" /></span><div><small>Bottega</small>Sicilia, Italia</div></div><a href="#instagram"><span><Icon name="instagram" /></span><div><small>Instagram</small>@tartufietartufi</div></a></div></div><form className="contact-form" onSubmit={handleSubmit}><div className="field-row"><label>Nome<input required name="name" placeholder="Il tuo nome" /></label><label>Email<input required name="email" type="email" placeholder="nome@email.it" /></label></div><label>Argomento<select name="subject"><option>Informazioni sui prodotti</option><option>Ordine o spedizione</option><option>Regali aziendali</option><option>Collaborazioni</option></select></label><label>Messaggio<textarea required name="message" rows="6" placeholder="Come possiamo aiutarti?" /></label><label className="check-field"><input type="checkbox" required /><span>Ho letto e accetto l’informativa privacy.</span></label><button className="button button--dark" type="submit">Invia il messaggio <Icon name="arrow" size={18} /></button>{sent && <p className="contact-success">Messaggio preparato correttamente. Il collegamento al backend verrà aggiunto in seguito.</p>}</form></div></section>
}

export function NotFoundPage() {
  return <div className="not-found"><span className="eyebrow">Errore 404</span><h1>Questa strada non porta nel bosco.</h1><p>La pagina che cerchi non è disponibile.</p><Link className="button button--dark" to="/">Torna alla home</Link></div>
}
