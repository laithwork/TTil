import React,{useEffect,useState} from 'react';
import {ArrowLeft,Plus} from '@phosphor-icons/react';
import {Button,Money} from './shared';

export default function ProductPage({product:p,add,onGuide}){
 const [photo,setPhoto]=useState(0),[color,setColor]=useState(p.variants[0]?.color||''),[size,setSize]=useState('');
 useEffect(()=>{setPhoto(0);setColor(p.variants[0]?.color||'');setSize('');},[p.id]);
 const images=p.images?.length?p.images:[p.image];
 const colors=[...new Map(p.variants.map(v=>[v.color,v])).values()];
 const variant=p.variants.find(v=>v.color===color&&v.size===size);
 return <section className="product-page">
  <a className="product-back" href="/shop"><ArrowLeft size={18}/> All products</a>
  <div className="product-page-grid">
   <div className="product-gallery">
    <div className="product-gallery-main"><img src={images[photo]} alt={`${p.name}, ${photo===0?'product view':photo===images.length-1?'fabric and print detail':'studio view'}`} fetchPriority="high"/></div>
    {images.length>1&&<div className="product-gallery-thumbs">{images.map((image,i)=><button key={image} onClick={()=>setPhoto(i)} aria-label={`View product photo ${i+1}`} aria-pressed={photo===i}><img src={image} alt=""/></button>)}</div>}
   </div>
   <div className="product-page-copy">
    <span className="product-category">{p.category}</span><h1>{p.name}</h1>
    <div className="product-page-price"><Money value={p.price}/>{p.compareAt>p.price&&<del><Money value={p.compareAt}/></del>}</div>
    <p>{p.description}</p>
    <div className="option-label">Color <span>{color}</span></div>
    <div className="color-choices">{colors.map(v=><button key={v.color} aria-label={v.color} aria-pressed={color===v.color} className={color===v.color?'selected':''} onClick={()=>{setColor(v.color);setSize('');}}><span style={{background:v.hex}}/></button>)}</div>
    <div className="option-label">Size <button onClick={onGuide}>Size guide</button></div>
    <div className="sizes">{p.variants.filter(v=>v.color===color).map(v=><button key={v.id} disabled={!v.stock} className={size===v.size?'selected':''} aria-pressed={size===v.size} onClick={()=>setSize(v.size)}>{v.size}</button>)}</div>
    <Button className="full" disabled={!variant||variant.stock<=0} onClick={()=>add(p,variant)}>{variant?'Add to bag':'Select a size'}<Plus size={19}/></Button>
    <small className="stock-note">{variant?variant.stock<=5?`Only ${variant.stock} left in this size`:'Available now':'Choose your size to add to bag.'}</small>
    <details><summary>Delivery & care</summary><p>Cash on delivery within Jordan. Follow the care instructions on your garment label.</p></details>
   </div>
  </div>
 </section>;
}
