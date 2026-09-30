import React,{useEffect,useState} from 'react';
import {ArrowUpRight,X} from '@phosphor-icons/react';

export default function PromoPopup({promo,blocked}){
 const [open,setOpen]=useState(false);
 useEffect(()=>{
  if(!promo?.enabled||!promo.code||blocked)return;
  const key=`ttil-promo-seen-${promo.code}`;
  if(sessionStorage.getItem(key))return;
  const timer=setTimeout(()=>{sessionStorage.setItem(key,'1');setOpen(true);},(promo.delay||8)*1000);
  return()=>clearTimeout(timer);
 },[promo?.enabled,promo?.code,promo?.delay,blocked]);
 if(!open)return null;
 return <div className="promo-scrim" role="presentation" onClick={()=>setOpen(false)}><section className="promo-popup" role="dialog" aria-modal="true" aria-label="Store promotion" onClick={e=>e.stopPropagation()}><button className="promo-close" aria-label="Close promotion" onClick={()=>setOpen(false)}><X size={19}/></button><span className="promo-kicker">A little something for you / TTIL</span><div className="promo-mark" aria-hidden="true">✳</div><h2>{promo.title}</h2><p>{promo.body}</p><div className="promo-code">Use code <strong>{promo.code}</strong> at checkout</div><a href="/products">{promo.button||'Shop the collection'} <ArrowUpRight size={18}/></a><small>Terms and availability are set by the discount code.</small></section></div>;
}
