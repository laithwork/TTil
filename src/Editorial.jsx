import React,{useRef} from 'react';
import {motion,useScroll,useTransform,useReducedMotion} from 'motion/react';
import {ArrowUpRight} from '@phosphor-icons/react';

export function Reveal({children,delay=0,className=''}){
 const reduce=useReducedMotion();
 return <motion.div className={className} initial={reduce?false:{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.12}} transition={{duration:.7,delay,ease:[.16,1,.3,1]}}>{children}</motion.div>;
}
export function CampaignHero({settings,product}){
 const target=useRef(null),reduce=useReducedMotion();
 const {scrollYProgress}=useScroll({target,offset:['start start','end start']});
 const opacity=useTransform(scrollYProgress,[0,.7],[1,0]);
 return <section className="hero campaign-hero landing-hero" ref={target}>
  <h1 className="visually-hidden">Things That I Like</h1>
  <div className="landing-artwork" aria-hidden="true" />
  {product&&<motion.a className="landing-product" href={`/products/${product.id}`} initial={reduce?false:{opacity:0,y:12}} animate={{opacity:1,y:0}} whileTap={reduce?{}:{scale:.98}} transition={{type:'spring',bounce:0,duration:.35}} aria-label={`View ${product.name}`}>
   <img src={product.image} alt={product.name}/>
   <div><span>Worn by the model</span><strong>{product.name}</strong><small>{product.price.toFixed(2)} JOD</small></div><ArrowUpRight className="landing-product-arrow" size={20}/>
  </motion.a>}
  <motion.div className="landing-copy" style={reduce?{}:{opacity}} initial={reduce?false:{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.8,ease:[.16,1,.3,1]}}>
   <a href="/shop">Visit our products <ArrowUpRight size={18}/></a>
  </motion.div>
 </section>;
}
export function ProductVisual({product,className='',single=false}){
 const alternate=!single&&product.images?.[1]&&product.images[1]!==product.image?product.images[1]:null;
 return <span className={`product-visual ${alternate?'has-alternate':''} ${className}`}><img className="visual-front" src={product.image} alt={`${product.name}, front view on model`} loading="lazy"/>{alternate&&<img className="visual-back" src={alternate} alt={`${product.name}, back view on model`} loading="lazy"/>}</span>;
}
