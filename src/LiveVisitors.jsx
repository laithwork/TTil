import React,{useEffect,useState} from 'react';
import {UsersThree,ArrowClockwise} from '@phosphor-icons/react';

export default function LiveVisitors({request,compact=false}){
 const [live,setLive]=useState(null),[error,setError]=useState(false),[refreshing,setRefreshing]=useState(false);
 async function refresh(){setRefreshing(true);try{setLive(await request('/admin/live'));setError(false);}catch{setError(true);}finally{setRefreshing(false);}}
 useEffect(()=>{refresh();const timer=setInterval(()=>{if(!document.hidden)refresh();},15000);return()=>clearInterval(timer);},[]);
 return <section className={`panel live-visitors ${compact?'compact':''}`}><div className="panel-heading"><div className="live-title"><span className="live-beacon"/><div><h2>Visitors right now</h2><small>Active storefront browsers in the last 3 minutes</small></div></div><button className="icon-button" aria-label="Refresh live visitors" onClick={refresh} disabled={refreshing}><ArrowClockwise size={17}/></button></div><div className="live-body"><div className="live-number"><UsersThree size={22}/><strong aria-live="polite">{live?.visitors??'—'}</strong><span>{error?'Tracking unavailable':'Live estimate'}</span></div><div className="live-behavior"><div><span>Active carts</span><strong>{live?.activeCarts??'—'}</strong></div><div><span>Checking out</span><strong>{live?.checkingOut??'—'}</strong></div></div>{!compact&&<div className="live-pages"><h3>Pages they’re viewing</h3>{live?.pages?.length?live.pages.map(x=><div key={x.page}><span>{x.page==='/'?'Home':x.page}</span><strong>{x.n}</strong></div>):<p>No active storefront sessions yet.</p>}</div>}</div></section>;
}
