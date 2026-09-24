import sharp from 'sharp';
import {mkdirSync,copyFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.dirname(fileURLToPath(import.meta.url));
const target=path.join(root,'public/media');
mkdirSync(target,{recursive:true});
const source='C:/Users/laith/.codex/generated_images/01a0cff8-7f63-7a52-8098-64bec7b6aafa/';
const files={'hero':'exec-86a2910c-63a8-4175-ae9b-17d1b8cc1ceb.png','hoodie-black':'exec-ef4e5546-7876-4556-a14e-60116430c731.png','hoodie-blue':'exec-106a0317-9a14-441b-8f5f-bfb524adbea8.png','tee':'exec-8695d4d9-5443-4894-a7e0-4f35d574727e.png'};
for(const [name,file] of Object.entries(files)) await sharp(source+file).webp({quality:91}).toFile(path.join(target,name+'.webp'));
const modelSheets={
 'washed-hoodie':'exec-b2e9d209-01fb-43ab-9975-5009f6e166e7.png',
 'afterimage-hoodie':'exec-a1632d71-7667-47ff-b4c9-111957c19d85.png',
 'memory-tee':'exec-8d601db6-38c0-4aa5-9360-992718c24e2b.png'
};
for(const [name,file] of Object.entries(modelSheets)){
 const metadata=await sharp(source+file).metadata();
 const half=Math.floor(metadata.width/2);
 await sharp(source+file).extract({left:0,top:0,width:half,height:metadata.height}).resize(900,1200,{fit:'cover'}).webp({quality:91}).toFile(path.join(target,name+'-front.webp'));
 await sharp(source+file).extract({left:metadata.width-half,top:0,width:half,height:metadata.height}).resize(900,1200,{fit:'cover'}).webp({quality:91}).toFile(path.join(target,name+'-back.webp'));
}
const realStudio={
 'studio-wide':'C:/Users/laith/Downloads/Team BTS for DELAROQ shoot.jpg',
 'studio-overhead':'C:/Users/laith/Downloads/bts📷.jpg',
 'studio-white':'C:/Users/laith/Downloads/download (8).jpg'
};
for(const [name,file] of Object.entries(realStudio)) await sharp(file).rotate().resize(2200,1800,{fit:'inside',withoutEnlargement:true}).webp({quality:88}).toFile(path.join(target,name+'.webp'));
copyFileSync('C:/Users/laith/Downloads/LOGO FOR TTIL.svg',path.join(target,'brand-mark.svg'));
console.log('Website assets prepared.');
