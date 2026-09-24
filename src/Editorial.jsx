import React,{useRef} from 'react';
import {motion,useScroll,useTransform,useReducedMotion} from 'motion/react';
import {ArrowUpRight} from '@phosphor-icons/react';

export function Reveal({children,delay=0,className=''}){
 const reduce=useReducedMotion();
 return <motion.div className={className} initial={reduce?false:{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.12}} transition={{duration:.7,delay,ease:[.16,1,.3,1]}}>{children}</motion.div>;
}
export function CampaignHero({settings}){
 const target=useRef(null),reduce=useReducedMotion();
 const {scrollYProgress}=useScroll({target,offset:['start start','end start']});
 const y=useTransform(scrollYProgress,[0,1],['0%','12%']);
 const opacity=useTransform(scrollYProgress,[0,.7],[1,0]);
 return <section className="hero campaign-hero" ref={target}>
  <motion.img src={settings.heroImage} style={reduce?{}:{y}} alt="Three friends wearing the first TTIL collection in a daylight studio" fetchPriority="high"/>
  <div className="hero-shade"/>
  <motion.div className="hero-copy" style={reduce?{}:{opacity}} initial={reduce?false:{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.8,ease:[.16,1,.3,1]}}>
   <span className="editorial-label">{settings.heroEyebrow}</span>
   <h1>{settings.heroTitle.split('\n').map((line,i)=><React.Fragment key={i}>{i>0&&<br/>}{line}</React.Fragment>)}</h1>
   <a className="hero-cta editorial-cta" href="#collection">{settings.heroCta} <ArrowUpRight size={19}/></a>
  </motion.div>
  <span className="hero-foot">{settings.heroFoot}</span>
 </section>;
}
export function ProductVisual({product,className='',single=false}){
 const alternate=!single&&product.images?.[1]&&product.images[1]!==product.image?product.images[1]:null;
 return <span className={`product-visual ${alternate?'has-alternate':''} ${className}`}><img className="visual-front" src={product.image} alt={`${product.name}, front view on model`} loading="lazy"/>{alternate&&<img className="visual-back" src={alternate} alt={`${product.name}, back view on model`} loading="lazy"/>}</span>;
}
