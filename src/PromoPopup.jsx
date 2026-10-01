import React,{useEffect,useRef,useState} from 'react';
import {ArrowUpRight,Sparkle,X} from '@phosphor-icons/react';
import {promoAccentStyle} from './promoTheme';

export default function PromoPopup({promo,blocked}){
 const [open,setOpen]=useState(false);
 const dialog=useRef(null);
 const previousFocus=useRef(null);
 const page=location.pathname==='/'?'home':location.pathname.startsWith('/products')?'products':'other';
 const eligible=page!=='other'&&(!promo?.page||promo.page==='all'||promo.page===page);
 const key=`ttil-promo-seen-${promo?.code}`;
 function dismissed(){if(promo?.frequency==='7d'||promo?.frequency==='30d'){const until=Date.now()+(promo.frequency==='7d'?7:30)*86400000;localStorage.setItem(key,String(until));}else sessionStorage.setItem(key,'1');}
 function close(){dismissed();setOpen(false);}
 useEffect(()=>{
  if(!promo?.enabled||!promo.code||blocked||!eligible)return;
  if(sessionStorage.getItem(key)||Number(localStorage.getItem(key))>Date.now())return;
  const timer=setTimeout(()=>setOpen(true),(promo.delay||8)*1000);
  return()=>clearTimeout(timer);
 },[promo?.enabled,promo?.code,promo?.delay,promo?.frequency,promo?.page,blocked,eligible]);
 useEffect(()=>{if(!open)return;previousFocus.current=document.activeElement;dialog.current?.querySelector('button')?.focus();const onKey=e=>{if(e.key==='Escape')close();if(e.key==='Tab'){const items=[...dialog.current.querySelectorAll('button,a[href]')];const first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}};document.addEventListener('keydown',onKey);return()=>{document.removeEventListener('keydown',onKey);previousFocus.current?.focus?.();};},[open,promo?.frequency,promo?.code]);
 useEffect(()=>{if(blocked||!eligible||!promo?.enabled)setOpen(false);},[blocked,eligible,promo?.enabled]);
 if(!open)return null;
 return <div className="promo-scrim" role="presentation" onClick={close}><section ref={dialog} className={`promo-popup promo-theme-${promo.theme==='light'?'light':'dark'}`} style={promoAccentStyle(promo.accent)} role="dialog" aria-modal="true" aria-label="Store promotion" onClick={e=>e.stopPropagation()}><button className="promo-close" aria-label="Close promotion" onClick={close}><X size={19}/></button><span className="promo-kicker">{promo.kicker||'TTIL / AN INVITATION'}</span>{promo.showMark!==false&&<Sparkle className="promo-mark" size={58} weight="thin" aria-hidden="true"/>}<h2>{promo.title}</h2><p>{promo.body}</p><div className="promo-code">Use code <strong>{promo.code}</strong> at checkout</div><a href="/products" onClick={dismissed}>{promo.button||'Shop the collection'} <ArrowUpRight size={18}/></a><small className="promo-fine-print">{promo.note||'Terms and availability are set by the discount code.'}</small></section></div>;
}
