const CUR='DT',EMAIL='contact@exemple.com',$=id=>document.getElementById(id);
const COLS=[['#1b2a5c','Marine'],['#00aeef','Cyan'],['#ec008c','Magenta'],['#ffd100','Jaune'],['#f2efe8','Blanc'],['#14171f','Noir']];
const FIN=[['Mat',{r:.85,m:0,cc:0}],['Brillant',{r:.22,m:0,cc:1}],['Soft-touch',{r:.62,m:0,cc:.15}],['MÃƒÆ’Ã‚Â©tallisÃƒÆ’Ã‚Â©',{r:.28,m:.9,cc:0}]],FS=[0,.05,.1,.2];
const S={p:0,c:1,t:'Mon Atelier',logo:null,f:1,q:50};
const esc=t=>t.replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
const nz=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
const fm=x=>x.toLocaleString('fr-FR',{maximumFractionDigits:x<10?2:0})+' '+CUR;
const lum=h=>{const n=parseInt(h.slice(1),16);return .299*(n>>16)+.587*(n>>8&255)+.114*(n&255)};
const on=h=>lum(h)>165?'#101828':'#ffffff';
if(!window.THREE){document.body.insertAdjacentHTML('beforeend','<div class="err">La 3D nÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢a pas pu se charger. VÃƒÆ’Ã‚Â©rifiez votre connexion.</div>');throw 0}
let R;try{R=new THREE.WebGLRenderer({canvas:$('gl'),antialias:true,alpha:true})}catch(e){document.body.insertAdjacentHTML('beforeend','<div class="err">Votre navigateur ne gÃƒÆ’Ã‚Â¨re pas la 3D.</div>');throw e}
R.setPixelRatio(Math.min(devicePixelRatio||1,2));R.outputEncoding=THREE.sRGBEncoding;R.toneMapping=THREE.ACESFilmicToneMapping;R.toneMappingExposure=1.2;
const scene=new THREE.Scene(),cam=new THREE.PerspectiveCamera(35,1,.1,100);
// studio : lumiÃƒÆ’Ã‚Â¨res colorÃƒÆ’Ã‚Â©es pour les reflets
{const pm=new THREE.PMREMGenerator(R),es=new THREE.Scene();
 es.add(new THREE.Mesh(new THREE.SphereGeometry(30,32,16),new THREE.MeshBasicMaterial({color:0x141a2c,side:THREE.BackSide})));
 const sb=(w,h,x,y,z,c,k)=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:new THREE.Color(c).multiplyScalar(k),side:THREE.DoubleSide}));m.position.set(x,y,z);m.lookAt(0,0,0);es.add(m)};
 sb(16,7,0,14,3,0xffffff,7);sb(7,12,-14,3,5,0x00aeef,6);sb(7,12,14,2,5,0xec008c,6);sb(12,3,0,-9,7,0xffd9a0,3);sb(10,10,0,3,16,0xffffff,3.5);
 scene.environment=pm.fromScene(es,.04).texture}
const key=new THREE.DirectionalLight(0xffffff,.5);key.position.set(3,5,6);scene.add(key,new THREE.AmbientLight(0xffffff,.25));
// outils gÃƒÆ’Ã‚Â©omÃƒÆ’Ã‚Â©trie
const V=(a)=>a.map(p=>new THREE.Vector2(p[0],p[1])),LA=(a)=>new THREE.LatheGeometry(V(a),72);
function rr(w,h,r){const s=new THREE.Shape(),x=-w/2,y=-h/2;s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);return s}
const slab=(w,h,r,d,b)=>{const g=new THREE.ExtrudeGeometry(rr(w,h,r),{depth:d,bevelEnabled:true,bevelThickness:b,bevelSize:b,bevelSegments:4,curveSegments:14});g.center();return g};
const phys=()=>new THREE.MeshPhysicalMaterial({color:0xffffff,roughness:.3,metalness:0,clearcoat:1,clearcoatRoughness:.05,side:THREE.DoubleSide});
const solid=(c,r,m)=>new THREE.MeshStandardMaterial({color:c,roughness:r==null?.5:r,metalness:m||0});
function decal(w,h,geo,x,y,z){const cv=document.createElement('canvas');cv.width=512;cv.height=Math.max(128,Math.round(512*h/w));const t=new THREE.CanvasTexture(cv);t.encoding=THREE.sRGBEncoding;t.anisotropy=8;
  const m=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({map:t,transparent:true,roughness:.45,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-4}));m.position.set(x||0,y||0,z||0);return{m,cv,t}}
function paint(d,col){const c=d.cv.getContext('2d'),W=d.cv.width,H=d.cv.height;c.clearRect(0,0,W,H);const o=on(col);c.fillStyle=c.strokeStyle=o;c.textAlign='center';
  const r=Math.min(W,H)*.2,cy=H*.38;
  if(S.logo){const im=S.logo,s=Math.min(r*2.4/im.width,r*2.4/im.height);c.drawImage(im,W/2-im.width*s/2,cy-im.height*s/2,im.width*s,im.height*s)}
  else{c.lineWidth=r*.1;c.beginPath();c.arc(W/2,cy,r,0,6.283);c.stroke();c.font='600 '+r*1.1+'px Geist,system-ui,sans-serif';c.fillText((S.t.trim()[0]||'A').toUpperCase(),W/2,cy+r*.38)}
  let fs=H*.15;c.font='700 '+fs+'px Geist,system-ui,sans-serif';const m=c.measureText(S.t).width;if(m>W*.82)fs*=W*.82/m;c.font='700 '+fs+'px Geist,system-ui,sans-serif';c.fillText(S.t,W/2,H*.8);d.t.needsUpdate=true}
const shTex=(()=>{const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d'),g=x.createRadialGradient(64,64,4,64,64,62);g.addColorStop(0,'rgba(0,0,0,.55)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,128,128);return new THREE.CanvasTexture(c)})();
// produits
const BUILD=[
 ()=>{const b=phys(),g=new THREE.Group(),body=new THREE.Mesh(LA([[0,-1],[.86,-1],[.96,-.97],[1,-.88],[1,.92],[.97,1],[.9,1],[.88,.92],[.88,-.82],[0,-.82]]),b);
  const hd=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(.97,.55,0),new THREE.Vector3(1.55,.62,0),new THREE.Vector3(1.82,0,0),new THREE.Vector3(1.55,-.62,0),new THREE.Vector3(.97,-.55,0)]),40,.1,14),b);
  const d=decal(1.5,1.1,new THREE.CylinderGeometry(1.006,1.006,1.1,32,1,true,-.75,1.5),0,0,0);g.add(body,hd,d.m);return{g,mats:[b],ds:[d],bot:-1,w:2.9}},
 ()=>{const b=phys(),g=new THREE.Group(),body=new THREE.Mesh(LA([[0,-1.5],[.62,-1.5],[.72,-1.45],[.76,-1.3],[.76,.55],[.7,.95],[.5,1.2],[.32,1.3],[.3,1.5],[0,1.5]]),b);
  const cap=new THREE.Mesh(new THREE.CylinderGeometry(.36,.36,.42,48),solid(0x2b303b,.35,.8));cap.position.y=1.68;const rg=new THREE.Mesh(new THREE.TorusGeometry(.33,.03,12,48),solid(0xc9ced8,.25,.9));rg.rotation.x=Math.PI/2;rg.position.y=1.46;
  const d=decal(1.5,1.3,new THREE.CylinderGeometry(.766,.766,1.3,32,1,true,-.97,1.94),0,-.35,0);g.add(body,cap,rg,d.m);return{g,mats:[b],ds:[d],bot:-1.5,w:1.6}},
 ()=>{const b=phys(),g=new THREE.Group(),cover=new THREE.Mesh(slab(1.7,2.3,.12,.3,.04),b);
  const pages=new THREE.Mesh(new THREE.BoxGeometry(1.58,2.2,.26),solid(0xf1ede2,.9));pages.position.set(.06,-.02,-.03);
  const band=new THREE.Mesh(new THREE.BoxGeometry(.07,2.34,.4),solid(0x15161a,.5));band.position.x=.55;
  const d=decal(1.4,1.7,new THREE.PlaneGeometry(1.4,1.7),-.08,.1,.196);g.add(pages,cover,band,d.m);return{g,mats:[b],ds:[d],bot:-1.2,w:1.8}},
 ()=>{const b=phys(),g=new THREE.Group(),mk=(m,x,y,z,r)=>{const o=new THREE.Mesh(slab(2.1,1.25,.08,.04,.012),m);o.position.set(x,y,z);o.rotation.z=r;return o};
  g.add(mk(solid(0xffffff,.6),-.22,-.12,-.12,.2),mk(solid(0xf6f3ec,.6),.1,-.06,-.06,-.1),mk(b,0,0,0,0));
  const d=decal(2.1,1.25,new THREE.PlaneGeometry(2.1,1.25),0,0,.032);g.add(d.m);g.rotation.x=-.2;return{g,mats:[b],ds:[d],bot:-.8,w:2.4,base:{x:-.25}}},
 ()=>{const b=phys(),g=new THREE.Group(),disc=new THREE.Mesh(LA([[0,-.07],[.92,-.07],[1,-.04],[1,.04],[.92,.07],[0,.07]]),b);disc.geometry.rotateX(Math.PI/2);disc.position.y=-.2;
  const ring=new THREE.Mesh(new THREE.TorusGeometry(.22,.045,16,40),solid(0xc9ced8,.25,.9));ring.position.y=1.12;const lk=new THREE.Mesh(new THREE.TorusGeometry(.16,.04,12,32),solid(0xc9ced8,.25,.9));lk.position.y=.86;lk.rotation.y=Math.PI/2;
  const d=decal(1.8,1.8,new THREE.CircleGeometry(.88,64),0,-.2,.078);g.add(disc,ring,lk,d.m);return{g,mats:[b],ds:[d],bot:-1.2,w:2}}
,
 ()=>{const b=phys(),g=new THREE.Group();
  const base=new THREE.Mesh(new THREE.BoxGeometry(2.25,.28,.48),solid(0x252b38,.3,.65));base.position.y=-1.45;
  const pole=new THREE.Mesh(new THREE.CylinderGeometry(.035,.035,3.1,20),solid(0xb9c2d1,.25,.85));pole.position.set(-.92,.05,0);
  const banner=new THREE.Mesh(new THREE.PlaneGeometry(1.8,2.65),b);banner.position.set(0,.12,.02);
  const top=new THREE.Mesh(new THREE.CylinderGeometry(.035,.035,1.85,20),solid(0xb9c2d1,.25,.85));top.rotation.z=Math.PI/2;top.position.set(0,1.42,.02);
  const d=decal(1.7,2.45,new THREE.PlaneGeometry(1.7,2.45),0,.12,.045);g.add(base,pole,banner,top,d.m);return{g,mats:[b],ds:[d],bot:-1.62,w:2.6}}
];
const PR=[['Mug','Mug personnalisÃ©',12],['Gourde','Gourde isotherme',28],['Carnet','Carnet Ã  Ã©lastique',18],['Cartes','Cartes de visite',.35],['Porte-clÃ©','Porte-clÃ© NFC',8],['Roll-up','Roll-up 85 Ã— 200 cm',45]];
const IT=BUILD.map((f,i)=>{const o=f();o.g.userData={};if(!o.base)o.base={x:0};
  const sh=new THREE.Mesh(new THREE.PlaneGeometry(o.w*1.9,o.w*1.9),new THREE.MeshBasicMaterial({map:shTex,transparent:true,depthWrite:false}));sh.rotation.x=-Math.PI/2;sh.position.y=o.bot-.06;o.g.add(sh);
  const holder=new THREE.Group();holder.add(o.g);o.h=holder;o.sc=0;o.v=0;o.ts=0;holder.visible=false;scene.add(holder);return o});
function refresh(){const c=COLS[S.c][0],f=FIN[S.f][1];
  IT.forEach(it=>{it.mats.forEach(m=>{m.color.set(c);m.roughness=f.r;m.metalness=f.m;m.clearcoat=f.cc;m.clearcoatRoughness=.05;m.needsUpdate=true});it.ds.forEach(d=>paint(d,c))});
  $('b3').style.background=c==='#14171f'?'#7a8aff':c==='#f2efe8'?'#ffc8a0':c;
  const p=pr();$('q').textContent=S.q+' piÃƒÆ’Ã‚Â¨ces';$('pz').textContent=fm(p.t);$('up').textContent=fm(p.u)+' / piÃƒÆ’Ã‚Â¨ce'+(p.d<1?' Ãƒâ€šÃ‚Â· ÃƒÂ¢Ã‹â€ Ã¢â‚¬â„¢'+Math.round((1-p.d)*100)+' %':'');
  press('#cl .sw','c',S.c);press('#fn .chip','f',S.f)}
function pr(){const d=S.q>=250?.8:S.q>=100?.9:1,u=PR[S.p][2]*(1+FS[S.f])*d;return{u,t:u*S.q,d}}
const press=(g,a,v)=>document.querySelectorAll(g).forEach(b=>b.setAttribute('aria-pressed',b.dataset[a]==v));
function pick(i){S.p=i;IT.forEach((it,k)=>{it.ts=k===i?1:0;if(k===i){it.h.visible=true;it.sc=Math.min(it.sc,.01)}});ryV=.14;ry=0;
  document.querySelectorAll('.tab').forEach((b,k)=>b.setAttribute('aria-pressed',k===i));const t=$('bgt');t.style.opacity=0;setTimeout(()=>{t.textContent=PR[i][0];t.style.opacity=1},180);refresh()}
// vue
let ry=0,ryV=0,px=0,py=0,tx=0,tz=0;const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
function resize(){const w=innerWidth,h=innerHeight,a=w/h;R.setSize(w,h);cam.aspect=a;const z=Math.max(8.2,6.4/a);cam.position.set(0,.3,z);cam.lookAt(0,0,0);cam.updateProjectionMatrix();
  const vh=2*z*Math.tan(17.5*Math.PI/180),vw=vh*a;IT.forEach(it=>it.h.position.set(a>1.15?-vw*.13:0,a>1.15?0:vh*.2,0))}
resize();addEventListener('resize',resize);
const cv=$('gl');let drag=false,lx=0;
cv.addEventListener('pointerdown',e=>{drag=true;lx=e.clientX;cv.setPointerCapture(e.pointerId)});cv.addEventListener('pointerup',()=>drag=false);cv.addEventListener('pointercancel',()=>drag=false);
cv.addEventListener('pointermove',e=>{px=e.clientX/innerWidth-.5;py=e.clientY/innerHeight-.5;if(drag){ryV=(e.clientX-lx)*.012;lx=e.clientX}});
(function frame(t){
  ry+=ryV;ryV+=((rm?0:.004)-ryV)*.04;tx+=(py*.35-tx)*.06;tz+=(-px*.16-tz)*.06;
  IT.forEach(it=>{it.v+=(it.ts-it.sc)*.12;it.v*=.76;it.sc+=it.v;const s=Math.max(it.sc,.0001);it.h.scale.setScalar(s);if(it.ts===0&&it.sc<.01)it.h.visible=false;
    if(it.ts===1||it.h.visible){it.g.rotation.set(it.base.x+tx,ry,tz);it.h.position.y=(it.h.position.y*.9)+(((innerWidth/innerHeight>1.15?0:2*Math.max(8.2,6.4*innerHeight/innerWidth)*.3153*.2)+(rm?0:Math.sin(t*.0014)*.08))*.1)}});
  R.render(scene,cam);requestAnimationFrame(frame)})(0);
// interface
$('tabs').innerHTML=PR.map((p,i)=>'<button class="tab" aria-pressed="'+(i==0)+'" data-i="'+i+'">'+p[0]+'</button>').join('');
$('tabs').onclick=e=>{const b=e.target.closest('.tab');if(b)pick(+b.dataset.i)};
$('cl').innerHTML=COLS.map((c,i)=>'<button class="sw" data-c="'+i+'" style="--c:'+c[0]+'" aria-label="'+c[1]+'"></button>').join('');
$('fn').innerHTML=FIN.map((f,i)=>'<button class="chip" data-f="'+i+'">'+f[0]+'</button>').join('');
$('cl').onclick=e=>{const b=e.target.closest('.sw');if(b){S.c=+b.dataset.c;refresh()}};
$('fn').onclick=e=>{const b=e.target.closest('.chip');if(b){S.f=+b.dataset.f;refresh()}};
$('tx').oninput=e=>{S.t=e.target.value||' ';refresh()};
$('mn').onclick=()=>{S.q=Math.max(10,S.q-10);refresh()};$('pl').onclick=()=>{S.q=Math.min(1000,S.q+10);refresh()};
function setLogo(f){if(!f||!f.type.startsWith('image/')||f.size>3e6)return;const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{S.logo=im;$('lt').innerHTML='<img src="'+r.result+'" alt=""> '+esc(f.name.slice(0,22));$('lr').hidden=false;refresh()};im.src=r.result};r.readAsDataURL(f)}
$('lf').onchange=e=>setLogo(e.target.files[0]);
$('lr').onclick=()=>{S.logo=null;$('lf').value='';$('lt').textContent='ÃƒÂ¯Ã‚Â¼Ã¢â‚¬Â¹ Ajouter une image';$('lr').hidden=true;refresh()};
['dragover','dragenter'].forEach(ev=>$('dp').addEventListener(ev,e=>e.preventDefault()));$('dp').addEventListener('drop',e=>{e.preventDefault();setLogo(e.dataTransfer.files[0])});
// barre de commande en langage naturel (rÃƒÆ’Ã‚Â¨gles simples)
function ask(){const raw=$('ask').value.trim();if(!raw)return;const q=nz(raw),ok=[];
  const PK=[['mug','tasse'],['gourde','bouteille','thermos'],['carnet','cahier','notebook'],['carte','visite'],['porte-cle','porte cle','cle','nfc','keychain'],['roll-up','roll up','rollup','kakemono','banner']];
  PK.forEach((ks,i)=>{if(ks.some(k=>q.includes(k))&&!ok.p&&ok.p!==0){S.p=i;ok.p=i}});
  const CK=[['marine','bleu marine'],['cyan','bleu','turquoise'],['magenta','rose','rouge','fuchsia'],['jaune','dore','orange'],['blanc','white'],['noir','black']];
  for(let i=0;i<CK.length;i++){if(CK[i].some(k=>q.includes(k))){S.c=i;ok.c=1;break}}
  const FK=[3,'metal'],FB=[1,'brill','glossy'],FSO=[2,'soft','velour'],FM=[0,'mat'];
  for(const f of [FK,FB,FSO,FM]){if(f.slice(1).some(k=>q.includes(k))){S.f=f[0];ok.f=1;break}}
  const mq=q.match(/(\d{2,4})\s*(pieces?|ex|x|exemplaires)?/);if(mq){S.q=Math.max(10,Math.min(1000,Math.round(+mq[1]/10)*10));ok.q=1}
  const nm=raw.match(/[«"](.+?)[»"]/)||raw.match(/\\bnom\\s+([A-Za-zÀ-ÿ-]+)/i);if(nm){S.t=nm[1].trim().slice(0,18);$('tx').value=S.t;ok.n=1}
  pick(S.p);$('fb').textContent=Object.keys(ok).length||ok.p===0?'ÃƒÂ¢Ã…â€œÃ‚Â¦ Compris : '+PR[S.p][0]+' Ãƒâ€šÃ‚Â· '+COLS[S.c][1]+' Ãƒâ€šÃ‚Â· '+FIN[S.f][0]+' Ãƒâ€šÃ‚Â· '+S.q+' piÃƒÆ’Ã‚Â¨ces Ãƒâ€šÃ‚Â· Ãƒâ€šÃ‚Â« '+S.t+' Ãƒâ€šÃ‚Â»':'Essayez par exemple : Ãƒâ€šÃ‚Â« mug rose brillant, 50 piÃƒÆ’Ã‚Â¨ces, ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œSarahÃƒÂ¢Ã¢â€šÂ¬Ã‚Â Ãƒâ€šÃ‚Â».'}
$('go').onclick=ask;$('ask').addEventListener('keydown',e=>{if(e.key==='Enter')ask()});
// panier
let cart=[];
$('ad').onclick=()=>{const p=pr();cart.push({n:PR[S.p][1],q:S.q+' piÃƒÆ’Ã‚Â¨ces Ãƒâ€šÃ‚Â· '+COLS[S.c][1]+' Ãƒâ€šÃ‚Â· '+FIN[S.f][0]+' Ãƒâ€šÃ‚Â· Ãƒâ€šÃ‚Â« '+S.t.trim()+' Ãƒâ€šÃ‚Â»'+(S.logo?' Ãƒâ€šÃ‚Â· avec logo':''),t:p.t,l:!!S.logo});$('cn').textContent=cart.length;const a=$('ad');a.textContent='AjoutÃƒÆ’Ã‚Â© ÃƒÂ¢Ã…â€œÃ¢â‚¬Å“';setTimeout(()=>a.textContent='Ajouter au panier',1000)};
function cartV(){const t=cart.reduce((s,l)=>s+l.t,0);
  $('ls').innerHTML=cart.length?cart.map((l,i)=>'<div class="ln"><div><b>'+esc(l.n)+'</b><small>'+esc(l.q)+'</small></div><div style="text-align:right"><b>'+fm(l.t)+'</b><br><button class="lnk" data-d="'+i+'">Retirer</button></div></div>').join(''):'<p style="color:var(--muted)">Votre panier est vide.</p>';
  $('gt').textContent=cart.length?'Total estimÃƒÆ’Ã‚Â© : '+fm(t):'';
  const body='Bonjour,\n\nJe souhaite un devis pour :\n'+cart.map(l=>'- '+l.n+' : '+l.q).join('\n')+'\n\nTotal estimÃƒÆ’Ã‚Â© : '+fm(t)+(cart.some(l=>l.l)?'\n\n(Je joins mon logo ÃƒÆ’Ã‚Â  ce message.)':'');
  $('mail').style.display=cart.length?'grid':'none';$('mail').href='mailto:'+EMAIL+'?subject='+encodeURIComponent('Demande de devis')+'&body='+encodeURIComponent(body)}
$('cb').onclick=()=>{cartV();if(!$('cd').open)$('cd').showModal()};
$('ls').onclick=e=>{const b=e.target.closest('[data-d]');if(b){cart.splice(+b.dataset.d,1);$('cn').textContent=cart.length;cartV()}};
$('cx').onclick=()=>$('cd').close();
document.fonts&&document.fonts.ready.then(refresh);
pick(0);




