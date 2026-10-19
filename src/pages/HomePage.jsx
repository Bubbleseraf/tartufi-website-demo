import { Link } from 'react-router-dom'
import heroImage from '../assets/images/hero-tartufi.webp'
import recipeImage from '../assets/images/tagliolini-tartufo.webp'
import giftImage from '../assets/images/confezione-regalo.webp'
import freshImage from '../assets/images/tartufo-fresco.webp'
import oilImage from '../assets/images/olio-tartufo.webp'
import ProductCard from '../components/ProductCard'
import Icon from '../components/Icon'
import { featuredProducts } from '../data/products'

function SectionTitle({ eyebrow, title, copy, align = 'left' }) {
  return (
    <div className={`section-title section-title--${align}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      <section className="hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(15,14,12,.78) 0%, rgba(15,14,12,.44) 42%, rgba(15,14,12,.05) 72%), url(${heroImage})` }}>
        <div className="site-container hero__inner">
          <div className="hero__content reveal-up">
            <span className="eyebrow eyebrow--light">Tartufi siciliani · Selezionati a mano</span>
            <h1>La terra racconta.<br /><em>Noi ne custodiamo l’aroma.</em></h1>
            <p>Dai boschi della Sicilia alla tua tavola: tartufi freschi e specialità artigianali scelte nel rispetto delle stagioni.</p>
            <div className="hero__actions">
              <Link className="button button--light" to="/shop">Scopri la selezione <Icon name="arrow" size={18} /></Link>
              <Link className="link-arrow link-arrow--light" to="/chi-siamo">La nostra storia <Icon name="arrow" size={17} /></Link>
            </div>
          </div>
          <div className="hero__note">
            <span>Ora disponibile</span>
            <strong>Nero pregiato</strong>
            <small>Stagione autunno · inverno</small>
          </div>
        </div>
      </section>

      <section className="intro-section section" id="intro">
        <div className="site-container intro-grid">
          <div className="intro-mark" aria-hidden="true"><span>01</span><Icon name="leaf" size={42} /></div>
          <div className="intro-heading"><span className="eyebrow">Il rituale della terra</span><h2>Il lusso più raro<br />ha radici profonde.</h2></div>
          <div className="intro-copy"><p>Seguiamo il ritmo del bosco, scegliendo ogni tartufo per profumo, consistenza e maturazione. Un lavoro fatto di attesa, conoscenza e gesti precisi.</p><Link className="link-arrow" to="/il-tartufo">Conosci il tartufo <Icon name="arrow" size={17} /></Link></div>
        </div>
      </section>

      <section className="products-section section section--cream">
        <div className="site-container">
          <div className="section-heading-row">
            <SectionTitle eyebrow="La bottega" title="Una selezione essenziale" copy="Pochi prodotti, scelti con cura per portare in cucina tutta la profondità del tartufo." />
            <Link className="link-arrow desktop-link" to="/shop">Vedi tutti i prodotti <Icon name="arrow" size={17} /></Link>
          </div>
          <div className="product-grid">
            {featuredProducts.map((product, index) => <ProductCard product={product} key={product.id} priority={index < 2} />)}
          </div>
          <Link className="button button--outline mobile-cta" to="/shop">Vedi tutti i prodotti</Link>
        </div>
      </section>

      <section className="category-showcase section">
        <div className="site-container">
          <SectionTitle eyebrow="Scegli il tuo percorso" title="Tre modi di incontrare il tartufo" align="center" />
          <div className="category-grid">
            <Link className="category-card category-card--large" to="/shop?categoria=Fresco">
              <img src={freshImage} alt="Tartufo fresco" loading="lazy" />
              <span className="category-card__overlay" />
              <div><span>01</span><h3>Tartufo fresco</h3><p>Il bosco, nella sua forma più pura.</p><i><Icon name="arrow" size={20} /></i></div>
            </Link>
            <Link className="category-card" to="/shop?categoria=Condimenti">
              <img src={oilImage} alt="Condimenti al tartufo" loading="lazy" />
              <span className="category-card__overlay" />
              <div><span>02</span><h3>Dispensa</h3><p>Profumi da usare ogni giorno.</p><i><Icon name="arrow" size={20} /></i></div>
            </Link>
            <Link className="category-card" to="/shop?categoria=Idee%20regalo">
              <img src={giftImage} alt="Confezione regalo al tartufo" loading="lazy" />
              <span className="category-card__overlay" />
              <div><span>03</span><h3>Idee regalo</h3><p>Un gesto da ricordare.</p><i><Icon name="arrow" size={20} /></i></div>
            </Link>
          </div>
        </div>
      </section>

      <section className="story-section">
        <div className="story-section__image" style={{ backgroundImage: `url(${heroImage})` }}><span className="story-section__stamp">Dal bosco<br />dal 1998</span></div>
        <div className="story-section__content">
          <span className="eyebrow eyebrow--light">Persone, cani, territorio</span>
          <h2>Ogni tartufo comincia da una relazione.</h2>
          <p>Conosciamo i cercatori, osserviamo le stagioni e rispettiamo le zone di raccolta siciliane. È così che preserviamo la qualità del prodotto e la vitalità del territorio.</p>
          <div className="story-stats"><div><strong>24<small>h</small></strong><span>dalla selezione<br />alla preparazione</span></div><div><strong>100<small>%</small></strong><span>cura<br />siciliana</span></div></div>
          <Link className="button button--light-outline" to="/chi-siamo">Dentro la nostra storia <Icon name="arrow" size={18} /></Link>
        </div>
      </section>

      <section className="values-section section section--cream">
        <div className="site-container values-grid">
          <article><span><Icon name="leaf" /></span><h3>Rispetto della stagione</h3><p>La disponibilità segue il ciclo naturale, senza forzature.</p></article>
          <article><span><Icon name="shield" /></span><h3>Selezione accurata</h3><p>Controlliamo profumo, consistenza e maturazione di ogni pezzo.</p></article>
          <article><span><Icon name="truck" /></span><h3>Spedizione protetta</h3><p>Confezioni studiate per preservare freschezza e aroma.</p></article>
          <article><span>✦</span><h3>Consiglio personale</h3><p>Ti aiutiamo a scegliere quantità, conservazione e abbinamenti.</p></article>
        </div>
      </section>

      <section className="recipe-feature section">
        <div className="site-container recipe-feature__grid">
          <div className="recipe-feature__image"><img src={recipeImage} alt="Tagliolini al tartufo nero" loading="lazy" /><span>Ricetta<br />della settimana</span></div>
          <div className="recipe-feature__content">
            <span className="eyebrow">Dalla nostra cucina</span>
            <h2>Tagliolini, burro e tartufo nero.</h2>
            <p>Una ricetta fatta di pochi gesti, dove la temperatura e la semplicità lasciano spazio al vero protagonista.</p>
            <div className="recipe-meta"><span><strong>20</strong> minuti</span><span><strong>4</strong> persone</span><span><strong>5</strong> ingredienti</span></div>
            <Link className="button button--dark" to="/ricette">Scopri la ricetta <Icon name="arrow" size={18} /></Link>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  )
}

export function Newsletter() {
  const handleSubmit = (event) => {
    event.preventDefault()
    event.currentTarget.reset()
    event.currentTarget.classList.add('is-sent')
  }

  return (
    <section className="newsletter">
      <div className="site-container newsletter__inner">
        <div><span className="eyebrow eyebrow--light">Lettere dal bosco</span><h2>Stagioni, raccolti<br />e storie da assaporare.</h2></div>
        <form onSubmit={handleSubmit}><label><span className="visually-hidden">La tua email</span><input type="email" required placeholder="La tua email" /><button type="submit" aria-label="Iscriviti"><Icon name="arrow" /></button></label><small>Iscrivendoti accetti la nostra informativa privacy.</small><p className="form-success">Grazie, sei nella lista.</p></form>
      </div>
    </section>
  )
}
