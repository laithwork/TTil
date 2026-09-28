import React from 'react';
import {ArrowUpRight} from '@phosphor-icons/react';
import {Reveal} from './Editorial';

export default function HomeEditorial({settings,products}) {
 const caravan=products.find(p=>p.id==='caravan-hoodie');
 return <>
  <section className="home-journal" aria-labelledby="journal-heading">
   <Reveal className="journal-photo"><img src={settings.editorialImage||'/media/ttil-caravan-editorial-v1.png'} alt="Face-hidden model styling the washed-black Caravan hoodie with layered denim" loading="lazy"/></Reveal>
   <Reveal className="journal-text"><span className="editorial-label">JOURNAL / 001</span><h2 id="journal-heading">{settings.editorialTitle||'A familiar story.\nA different silhouette.'}</h2><p>{settings.editorialBody||'The Caravan hoodie. Washed charcoal, a quiet palette, and a print that speaks for itself.'}</p>{caravan&&<a className="text-link" href={`/products/${caravan.id}`}>Explore {caravan.name}<ArrowUpRight size={20}/></a>}<span className="journal-caption">CARAVAN / THINGS THAT I LIKE</span></Reveal>
  </section>
  <section className="vision-mark" aria-label="Our vision — Things That I Like"><img src="/media/ttil-logo.svg" alt="Things That I Like" loading="lazy"/></section>
 </>;
}
