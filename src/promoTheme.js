export function promoAccentStyle(value){
 const accent=/^#[0-9a-f]{6}$/i.test(value||'')?value:'#e5df52';
 const channels=[1,3,5].map(i=>parseInt(accent.slice(i,i+2),16)/255).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4);
 const luminance=.2126*channels[0]+.7152*channels[1]+.0722*channels[2];
 return {'--promo-accent':accent,'--promo-on-accent':luminance>.179?'#111':'#fff'};
}
