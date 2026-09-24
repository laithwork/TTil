import {test,after} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {randomUUID} from 'node:crypto';
process.env.TTIL_TEST='1';
process.env.TTIL_DATA_DIR=mkdtempSync(path.join(tmpdir(),'ttil-test-'));
const {app,db,seedAccounts}=await import('../server.js');
seedAccounts({ibra:'test-only-password-one',Laith:'test-only-password-two'});
const server=app.listen(0,'127.0.0.1');
await new Promise(r=>server.once('listening',r));
const origin=`http://127.0.0.1:${server.address().port}`;
let cookie='',csrf='';
async function request(url,method='GET',body,authenticated=true,headers={}){
 const res=await fetch(origin+'/api'+url,{method,headers:{'Content-Type':'application/json',...(authenticated?{cookie,'x-csrf-token':csrf}:{}),...headers},body:body===undefined?undefined:JSON.stringify(body)});
 return {status:res.status,data:await res.json(),headers:res.headers};
}
after(()=>{server.close();db.close();});
test('Store and admin workflows use a separate test database',async t=>{
 let data,product,variant,order;
 const customer={name:'Test Customer',phone:'0790000000',city:'Amman',address:'Test only, building 1'};
 await t.test('Private data cannot be accessed without signing in',async()=>assert.equal((await request('/admin/data')).status,401));
 await t.test('Only two accounts exist, stored as hashes',async()=>{const users=db.prepare('SELECT * FROM users').all();assert.equal(users.length,2);assert.ok(users.every(u=>u.hash.includes(':')&&!u.hash.includes('test-only')));assert.equal((await request('/register','POST',{})).status,404);});
 await t.test('Invalid login fails; real login sets HttpOnly cookie',async()=>{assert.equal((await request('/login','POST',{username:'ibra',password:'wrong'})).status,401);const r=await request('/login','POST',{username:'ibra',password:'test-only-password-one'});assert.equal(r.status,200);cookie=r.headers.get('set-cookie').split(';')[0];assert.match(r.headers.get('set-cookie'),/HttpOnly/);csrf=r.data.csrf;data=(await request('/admin/data')).data;product=data.products[0];variant=product.variants[0];});
 await t.test('Admin mutations enforce CSRF and origin',async()=>{assert.equal((await request('/admin/settings','PUT',data.settings,true,{'x-csrf-token':'bad'})).status,403);assert.equal((await request('/admin/settings','PUT',data.settings,true,{Origin:'https://bad.example'})).status,403);});
 await t.test('Admin can pause checkout',async()=>{assert.equal((await request('/admin/settings','PUT',{...data.settings,acceptOrders:false})).status,200);assert.equal((await request('/orders','POST',{customer,items:[{productId:product.id,variantId:variant.id,quantity:1}],requestKey:randomUUID()})).status,409);});
 await t.test('Admin can configure delivery and open COD orders',async()=>{assert.equal((await request('/admin/settings','PUT',{...data.settings,acceptOrders:true,seedData:false})).status,200);});
 await t.test('Server calculates real prices and aggregates duplicate quantities',async()=>{const item={productId:product.id,variantId:variant.id,quantity:1,price:.01};const q=await request('/quote','POST',{items:[item,item]});assert.equal(q.data.subtotal,product.price*2);assert.equal(q.data.lines.length,1);assert.equal((await request('/quote','POST',{items:[{...item,quantity:variant.stock+1}]})).status,400);});
 await t.test('Order reserves stock exactly once across retries',async()=>{const body={customer,items:[{productId:product.id,variantId:variant.id,quantity:2}],requestKey:randomUUID()};const r=await request('/orders','POST',body);assert.equal(r.status,201);order=r.data;assert.equal((await request('/orders','POST',body)).data.id,order.id);const d=(await request('/admin/data')).data;assert.equal(d.orders.length,1);assert.equal(d.products[0].variants[0].stock,variant.stock-2);});
 await t.test('Stale product and inventory edits cannot overwrite reserved stock',async()=>{assert.equal((await request('/admin/products/'+product.id,'PUT',product)).status,409);assert.equal((await request('/admin/inventory','PATCH',{updates:[{productId:product.id,variantId:variant.id,expectedStock:variant.stock,stock:100}]})).status,409);});
 await t.test('Cancellation restores stock once and cannot be reopened',async()=>{for(let i=0;i<2;i++)assert.equal((await request('/admin/orders/'+order.id,'PATCH',{status:'cancelled'})).status,200);const d=(await request('/admin/data')).data;assert.equal(d.products[0].variants[0].stock,variant.stock);assert.equal((await request('/admin/orders/'+order.id,'PATCH',{status:'confirmed'})).status,400);});
 await t.test('Product captions, variants, inventory and draft visibility persist',async()=>{const p=(await request('/admin/data')).data.products[0];const result=await request('/admin/products/'+p.id,'PUT',{...p,caption:'Test caption',status:'draft'});assert.equal(result.status,200);assert.equal(result.data.caption,'Test caption');assert.equal((await request('/catalog')).data.products.length,2);assert.equal((await request('/admin/inventory','PATCH',{updates:[{productId:p.id,variantId:variant.id,expectedStock:variant.stock,stock:4}]})).status,200);});
 await t.test('Discounts calculate server-side and invalid files are rejected',async()=>{const p=(await request('/catalog')).data.products[0];assert.equal((await request('/admin/discounts/test-offer','PUT',{code:'TTIL10',type:'percent',value:10,minimum:0,limit:5,active:true})).status,200);const q=await request('/quote','POST',{items:[{productId:p.id,variantId:p.variants[0].id,quantity:1}],code:'TTIL10'});assert.equal(q.data.discount,Math.round(p.price*10)/100);const res=await fetch(origin+'/api/admin/media',{method:'POST',headers:{cookie,'x-csrf-token':csrf,'Content-Type':'image/png'},body:'not an image at all'});assert.equal(res.status,400);});
 await t.test('Exports contain store records, never credentials or sessions',async()=>{const r=await request('/admin/export');assert.equal(r.status,200);assert.ok(!('users' in r.data));assert.ok(!('sessions' in r.data));});
 await t.test('Second administrator can sign in; logout invalidates session',async()=>{const r=await request('/login','POST',{username:'Laith',password:'test-only-password-two'},false);assert.equal(r.status,200);assert.equal((await request('/logout','POST',{})).status,200);assert.equal((await request('/me')).status,401);});
});
