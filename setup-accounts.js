process.env.TTIL_TEST='1';
const {seedAccounts,db}=await import('./server.js');
const ibra=process.env.TTIL_IBRA_PASSWORD,laith=process.env.TTIL_LAITH_PASSWORD;
if(!ibra||!laith)throw new Error('Set TTIL_IBRA_PASSWORD and TTIL_LAITH_PASSWORD before running setup.');
seedAccounts({ibra,Laith:laith});
db.close();
console.log('The two administrator accounts are ready. Passwords are stored as salted scrypt hashes.');
