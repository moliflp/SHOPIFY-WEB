
// ####### CONFIGURACIÓN #######
var CONFIG={
  // Fecha y hora en que termina la promo (AAAA-MM-DDTHH:MM:SS). Si ya pasó, la barra se oculta sola. Debe ser una fecha REAL.
  promoFin:"",   // vacío = sin barra de promo. Solo ponla si la oferta termina DE VERDAD en esa fecha.
  // Porcentaje de descuento desde el que sale la etiqueta "Chollo"
  chollo:42,
  // Productos por categoría que se ven al principio (el resto, con "Ver todo el catálogo")
  inicial:2,
  // Envío: coste y compra mínima para envío gratis. Pon los REALES (envio:0 = siempre gratis; gratisDesde:0 = sin barra de envío gratis).
  envio:4.95, // PROVISIONAL: sustituir por el coste real del transportista
  gratisDesde:39,
  // Códigos de descuento. Deben existir también en Shopify (Descuentos) para que valgan de verdad.
  // tipo: "pct" = porcentaje · "eur" = euros fijos · "envio" = envío gratis · minimo = compra mínima en euros
  // El primer código es el "de bienvenida": sale sugerido en el carrito y al apuntarse a la newsletter.
  codigos:[],   // vacío = sin códigos en el navegador. Los descuentos se crean en Shopify (Descuentos), no aquí.

  // Métodos de pago que se muestran. Pon activo:false a los que tu pasarela NO tenga activados (no muestres uno que no funcione).
  pagos:[
    { "nombre": "Tarjeta Visa / Mastercard", "activo": true },
    { "nombre": "Apple Pay", "activo": true },
    { "nombre": "Google Pay", "activo": true },
    { "nombre": "Bizum", "activo": true },
    { "nombre": "PayPal", "activo": true },
    { "nombre": "American Express", "activo": false },
    { "nombre": "Klarna", "activo": false }
  ]
};

// ####### PRODUCTOS #######
// Cada producto es UNA línea. Para cambiar un precio, toca solo esa línea. Campos:
//   cat      → categoría: 1 Audio · 2 Carga · 3 Hogar · 4 Gaming · 5 Coche
//   nombre   → nombre de la tarjeta (la foto se busca como img/<nombre-en-minúsculas-con-guiones>.jpg)
//   precio   → precio actual en euros (con punto decimal)
//   anterior → precio anterior REAL (el más bajo de los últimos 30 días) o null si no hay rebaja (sale "Nuevo")
//   icono    → número del icono de ICONOS que se ve mientras no hay foto
var ICON_BY_NAME={"Soporte de auriculares para escritorio": 16, "Estuche rígido para auriculares": 22, "Organizador de cables de escritorio": 17, "Funda organizadora de cables de viaje": 17, "Soporte de portátil ergonómico": 18, "Soporte de móvil para escritorio": 13, "Kit de limpieza para pantallas": 19, "Pack 3 tapas de privacidad para webcam": 20, "Alfombrilla XXL de escritorio": 21, "Soporte para mando y auriculares": 16, "Reposamuñecas para teclado": 21, "Soporte de móvil magnético": 13, "Soporte de móvil para rejilla del coche": 13, "Organizador de maletero plegable": 17};
var PRODUCTOS=(window.TCN_PRODUCTOS||[]).map(function(p){p.icono=ICON_BY_NAME[p.nombre]||0;return p});

// ####### FASE 2: NO PUBLICAR hasta tener la documentación del proveedor #######
// Llevan batería, radio o conexión eléctrica: necesitan marcado CE, declaración UE de conformidad del modelo exacto,
// datos del responsable en la UE y registro RAEE/pilas del productor. Cuando lo tengas por escrito, muévelos arriba.
// (Todos sin precio anterior: una tienda nueva no tiene historial de 30 días.)
var PRODUCTOS_FASE2=[
// { "cat": 1, "nombre": "Auriculares inalámbricos", "precio": 24.9, "anterior": null, "icono": 0 },
// { "cat": 1, "nombre": "Altavoz Bluetooth portátil", "precio": 29.9, "anterior": null, "icono": 1 },
// { "cat": 1, "nombre": "Micrófono de solapa USB-C", "precio": 14.9, "anterior": null, "icono": 1 },
// { "cat": 2, "nombre": "Cargador inalámbrico magnético", "precio": 19.9, "anterior": null, "icono": 2 },
// { "cat": 2, "nombre": "Power bank 10.000 mAh", "precio": 24.9, "anterior": null, "icono": 3 },
// { "cat": 2, "nombre": "Pack 3 cables USB-C", "precio": 12.9, "anterior": null, "icono": 4 },
// { "cat": 2, "nombre": "Hub USB-C 7 en 1", "precio": 34.9, "anterior": null, "icono": 5 },
// { "cat": 2, "nombre": "Cargador de coche 45 W USB-C", "precio": 16.9, "anterior": null, "icono": 2 },
// { "cat": 2, "nombre": "Cable magnético 3 en 1", "precio": 11.9, "anterior": null, "icono": 4 },
// { "cat": 3, "nombre": "Tira LED inteligente", "precio": 19.9, "anterior": null, "icono": 6 },
// { "cat": 3, "nombre": "Enchufe Wi-Fi inteligente x2", "precio": 17.9, "anterior": null, "icono": 7 },
// { "cat": 3, "nombre": "Barra de luz para monitor", "precio": 29.9, "anterior": null, "icono": 8 },
// { "cat": 3, "nombre": "Mini proyector portátil", "precio": 79.9, "anterior": null, "icono": 9 },
// { "cat": 3, "nombre": "Cámara de seguridad Wi-Fi", "precio": 34.9, "anterior": null, "icono": 10 },
// { "cat": 3, "nombre": "Humidificador USB de escritorio", "precio": 17.9, "anterior": null, "icono": 7 },
// { "cat": 3, "nombre": "Lámpara LED de escritorio regulable", "precio": 21.9, "anterior": null, "icono": 8 },
// { "cat": 4, "nombre": "Ratón gaming RGB", "precio": 19.9, "anterior": null, "icono": 11 },
// { "cat": 4, "nombre": "Teclado mecánico compacto", "precio": 39.9, "anterior": null, "icono": 12 },
// { "cat": 4, "nombre": "Auriculares gaming con micrófono", "precio": 27.9, "anterior": null, "icono": 16 },
// { "cat": 5, "nombre": "Dash cam Full HD", "precio": 49.9, "anterior": null, "icono": 14 },
// { "cat": 5, "nombre": "Localizador Bluetooth x4", "precio": 29.9, "anterior": null, "icono": 15 },
// { "cat": 5, "nombre": "Aspirador de coche portátil", "precio": 24.9, "anterior": null, "icono": 19 },
];

// ####### ICONOS #######
var ICONOS=['<rect x="14" y="14" width="12" height="24" rx="6"/><path d="M20 38v10"/><rect x="38" y="14" width="12" height="24" rx="6"/><path d="M44 38v10"/>','<rect x="16" y="8" width="32" height="48" rx="10"/><circle cx="32" cy="24" r="6"/><circle cx="32" cy="42" r="8"/>','<circle cx="32" cy="32" r="22"/><path d="M36 14 26 34h10l-4 16"/>','<rect x="18" y="6" width="28" height="52" rx="6"/><path d="M34 20 27 34h8l-4 10"/>','<path d="M12 44c0-14 14-8 20-16s8-14 20-14"/><rect x="48" y="8" width="8" height="12" rx="2"/><rect x="8" y="44" width="8" height="12" rx="2"/>','<rect x="8" y="22" width="48" height="20" rx="6"/><path d="M16 30h6M28 30h6M40 30h6M32 22v-8"/>','<path d="M8 40c8-20 16 20 24 0s16 20 24 0"/><circle cx="12" cy="24" r="2"/><circle cx="32" cy="20" r="2"/><circle cx="52" cy="24" r="2"/>','<rect x="14" y="14" width="36" height="36" rx="8"/><path d="M26 24v8M38 24v8M26 40h12"/>','<rect x="8" y="14" width="48" height="30" rx="3"/><path d="M24 54h16M32 44v10"/><rect x="18" y="8" width="28" height="4" rx="2"/>','<rect x="6" y="22" width="52" height="24" rx="8"/><circle cx="40" cy="34" r="8"/><path d="M14 30h8"/>','<path d="M10 22h34v20H10z"/><path d="M44 28l12-6v20l-12-6"/><path d="M20 50h14"/>','<rect x="18" y="8" width="28" height="48" rx="14"/><path d="M32 8v18M18 26h28"/>','<rect x="6" y="18" width="52" height="30" rx="5"/><path d="M14 28h4M24 28h4M34 28h4M44 28h4M16 38h32"/>','<rect x="20" y="6" width="24" height="40" rx="5"/><path d="M32 46v10M22 56h20"/>','<circle cx="32" cy="30" r="20"/><circle cx="32" cy="30" r="8"/><path d="M32 50v8M24 58h16"/>','<circle cx="32" cy="36" r="18"/><circle cx="32" cy="36" r="4"/><path d="M26 10c4 4 8 4 12 0"/>','<path d="M20 54h24M32 54V30"/><path d="M18 30a14 14 0 0 1 28 0"/><rect x="14" y="28" width="6" height="12" rx="3"/><rect x="44" y="28" width="6" height="12" rx="3"/>','<rect x="10" y="20" width="44" height="26" rx="6"/><path d="M18 30h28M18 38h28"/><path d="M26 20v-6h12v6"/>','<rect x="12" y="14" width="40" height="26" rx="3"/><path d="M6 46h52l-6 8H12z"/>','<path d="M20 8h24l-4 18H24z"/><path d="M32 26v10"/><path d="M14 56l10-20h16l10 20z"/>','<circle cx="32" cy="32" r="20"/><circle cx="32" cy="32" r="7"/><path d="M8 56 56 8"/>','<rect x="4" y="20" width="56" height="26" rx="4"/><path d="M12 28h40M12 38h40"/>','<rect x="10" y="18" width="44" height="30" rx="10"/><path d="M24 18v-4h16v4M32 28v10"/>'];

// ####### LÓGICA #######
(function(){
var R=matchMedia('(prefers-reduced-motion: reduce)').matches,mx=0,my=0,sy=0,boost=0,px=0,py=0,rx=0,ry=0,hue=75,pend=null,sc2=1;
function $(i){return document.getElementById(i)}
var root=document.documentElement,dot=$('dot'),ring=$('ring'),W=$('w'),live=$('live');
function scramble(el,t){if(el._i)clearInterval(el._i);if(R){el.textContent=t;return}var c='ABCDEFGHJKLMNPRSTUVXYZ0123456789',f=0,n=24;el._i=setInterval(function(){el.textContent=t.split('').map(function(ch,i){return ch===' '||i<f*t.length/n?ch:c[Math.random()*c.length|0]}).join('');if(++f>n){el.textContent=t;clearInterval(el._i)}},40)}
// ####### PORTADA ANIMADA (titular letra a letra y en 3D) #######
document.documentElement.classList.add('js');var H1=$('h1'),ht=$('h1t');ht.innerHTML=ht.textContent.split('').map(function(c,i){return '<span class="lt" style="--i:'+i+'">'+c+'</span>'}).join('');

// ####### CARGA #######
var ld=$('ld'),ln=$('ldn'),n=0,iv=setInterval(function(){n=Math.min(100,n+(R?100:18+Math.random()*14|0));ln.textContent=n;if(n>=100){clearInterval(iv);ld.classList.add('off');document.body.classList.add('go');scramble(W,'que conecta contigo')}},60);

// ####### CURSOR Y PARALAJE #######
document.addEventListener('pointermove',function(e){if(e.pointerType==='touch')return;mx=e.clientX/innerWidth*2-1;my=e.clientY/innerHeight*2-1;px=e.clientX;py=e.clientY;dot.style.transform='translate('+px+'px,'+py+'px)'});
document.addEventListener('pointerover',function(e){ring.classList.toggle('big',!!e.target.closest('a,button,.tilt,input,.row'))});
var HD=document.querySelector('header');function hdr(){sy=scrollY;var p=document.getElementById('promo');HD.style.top=(Math.max(0,(p&&p.offsetHeight?p.offsetHeight:0)-sy)+10)+'px';HD.classList.toggle('sc',sy>24)}addEventListener('scroll',hdr,{passive:true});hdr();
var rail=$('rail'),cart=$('cart'),cn=0;

// ####### FUNCIONES DE PRODUCTO #######
function eur(n){return n.toFixed(2).replace('.',',')+' €'}
function tilt(el){
// ####### [MEJORA ②] TILT 3D SUAVE + BRILLO QUE SIGUE AL CURSOR #######
var tx=0,ty=0,cx=0,cy=0,on=0,co=0,raf=0;
function paint(){cx+=(tx-cx)*.14;cy+=(ty-cy)*.14;co+=(on-co)*.14;
el.style.transform='perspective(900px) rotateX('+(-cy*16)+'deg) rotateY('+(cx*18)+'deg) scale3d('+(1+co*.035)+','+(1+co*.035)+',1)';
el.style.setProperty('--gx',(cx+.5)*100+'%');el.style.setProperty('--gy',(cy+.5)*100+'%');
el.style.setProperty('--tx',cx.toFixed(3));el.style.setProperty('--ty',cy.toFixed(3));el.style.setProperty('--o',co.toFixed(3));
if(Math.abs(tx-cx)+Math.abs(ty-cy)+Math.abs(on-co)>.002)raf=requestAnimationFrame(paint);else{raf=0;if(!on)el.style.transform=''}}
function go(){if(!raf)raf=requestAnimationFrame(paint)}
function mv(e){if(R||e.pointerType==='touch')return;var r=el.getBoundingClientRect();tx=(e.clientX-r.left)/r.width-.5;ty=(e.clientY-r.top)/r.height-.5;on=1;go()}
function out(){tx=0;ty=0;on=0;go()}
el.addEventListener('pointermove',mv);el.addEventListener('pointerdown',mv);el.addEventListener('pointerleave',out);el.addEventListener('pointerup',out);el.addEventListener('pointercancel',out)}
function slug(t){return t.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
// ####### TARJETAS DE PRODUCTO #######
PRODUCTOS.forEach(function(p){
var a=document.createElement('article'),d=p.anterior&&p.anterior>p.precio,pct=d?Math.round((1-p.precio/p.anterior)*100):0;
a.className='tilt';a.setAttribute('data-c',p.cat);
a.innerHTML=(d?'<span class="bd">-'+pct+'%</span>'+(pct>=CONFIG.chollo?'<span class="bd h">Chollo</span>':''):'<span class="bd">Nuevo</span>')
+'<div class="ph"><svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+ICONOS[p.icono]+'</svg><img src="'+(p.img||'')+'" alt="'+p.nombre+'" loading="lazy" onerror="this.remove()"></div>'
+'<h3><a class="pl" href="#p-'+slug(p.nombre)+'">'+p.nombre+'</a></h3>'
// ####### PRECIOS (dentro de la tarjeta) #######
+'<div class="pr"><span><span class="pn">'+eur(p.precio)+'</span>'+(d?'<s class="po">'+eur(p.anterior)+'</s>':'')+'</span></div>'
+(d?'<div class="sv">Ahorras '+eur(p.anterior-p.precio)+'</div>':'')
+'<button class="btn sm" type="button">'+(d?'Aprovechar oferta':'Añadir al carrito')+'</button>';
a.querySelector('button').addEventListener('click',function(){anadir(p);var b=this;b.textContent='Añadido ✓';setTimeout(function(){b.textContent=d?'Aprovechar oferta':'Añadir al carrito'},1400)});
tilt(a);rail.appendChild(a)});
// ####### FICHA DE PRODUCTO (página completa dentro de la tienda: #p-<nombre>) #######
// Cada ficha: [descripción, [características], qué incluye, [dato extra, valor] o null, advertencias]
// Contrasta TODO con el modelo real de tu proveedor y sustituye los [CONFIRMAR] antes de publicar.
var AV='Lee las instrucciones antes de usar el producto. Si incluye piezas pequeñas, mantenlo fuera del alcance de niños pequeños.',
IMAN='Los imanes pueden afectar a marcapasos y a tarjetas de banda magnética: mantenlos alejados. No manipules el móvil mientras conduces y colócalo sin tapar tu visión de la carretera.',
FICHAS={
'soporte-de-auriculares-para-escritorio':['Soporte para dejar tus auriculares en el escritorio: los protege de golpes y caídas y libera espacio en la mesa.',['Auriculares a mano y fuera de la mesa','Base estable para que no se vuelque','Pensado para auriculares de diadema'],'1 soporte para auriculares',['Compatibilidad','Auriculares de diadema [CONFIRMAR: tamaños]'],AV],
'estuche-rigido-para-auriculares':['Estuche rígido para llevar y proteger tus auriculares en la mochila o el bolso.',['Cubierta rígida contra golpes y presión','Formato práctico para viajar','Mantiene los auriculares recogidos'],'1 estuche rígido',['Compatibilidad','Auriculares [CONFIRMAR: tipo y tamaño]'],AV],
'organizador-de-cables-de-escritorio':['Organizador para guiar y sujetar los cables del escritorio y evitar el enredo.',['Menos cables sueltos sobre la mesa','Fácil de colocar en el escritorio','Admite varios cables a la vez'],'1 organizador de cables',['Capacidad','[CONFIRMAR: número de cables]'],AV],
'funda-organizadora-de-cables-de-viaje':['Funda con compartimentos para llevar cargadores, cables y pequeños accesorios ordenados.',['Compartimentos para cables y accesorios','Formato compacto para mochila o maleta','Evita que los cables se enreden'],'1 funda organizadora',null,AV],
'soporte-de-portatil-ergonomico':['Soporte que eleva el portátil para que la pantalla quede más alta y trabajes con mejor postura.',['Pantalla a una altura más cómoda','Deja circular el aire bajo el portátil','Base antideslizante para que no se mueva'],'1 soporte de portátil',['Compatibilidad','Portátiles de [CONFIRMAR: rango de pulgadas]'],AV],
'soporte-de-movil-para-escritorio':['Soporte para apoyar el móvil en la mesa y verlo cómodamente en videollamadas, vídeos o recetas.',['Ángulo cómodo para ver la pantalla','Base estable sobre la mesa','Para la mayoría de móviles'],'1 soporte de móvil',['Compatibilidad','Móviles de [CONFIRMAR: ancho máximo]'],AV],
'kit-de-limpieza-para-pantallas':['Kit para limpiar pantallas de móvil, tablet, portátil y monitor sin dejar marcas.',['Quita huellas y polvo de las pantallas','Formato práctico para llevar','Uso sencillo'],'[CONFIRMAR: contenido exacto del kit]',null,'No apliques líquido directamente sobre la pantalla; rocíalo antes sobre el paño. Apaga y desconecta el dispositivo antes de limpiarlo. '+AV],
'pack-3-tapas-de-privacidad-para-webcam':['Tapas deslizantes para cubrir la cámara del portátil, tablet o monitor cuando no la usas.',['Cubren la webcam cuando no la necesitas','Se adhieren sobre la cámara','Pack de 3 unidades'],'3 tapas de privacidad',['Unidades','3'],'Comprueba que la tapa no impida cerrar la tapa del portátil antes de pegarla. '+AV],
'alfombrilla-xxl-de-escritorio':['Alfombrilla grande que cubre teclado y ratón, con superficie lisa para que el ratón se deslice bien.',['Cabe el teclado y el ratón en una sola superficie','Base antideslizante','Para ratón de oficina o gaming'],'1 alfombrilla XXL',['Medidas','[CONFIRMAR: largo x ancho x grosor]'],AV],
'soporte-para-mando-y-auriculares':['Soporte de escritorio para dejar el mando y los auriculares a mano y ordenados.',['Mando y auriculares siempre en su sitio','Libera espacio en la mesa','Base estable'],'1 soporte',['Compatibilidad','Mandos y auriculares [CONFIRMAR: modelos]'],AV],
'reposamunecas-para-teclado':['Reposamuñecas para apoyar las muñecas al escribir o jugar y trabajar con más comodidad.',['Apoyo blando para las muñecas','Base antideslizante','Para teclados de [CONFIRMAR: tamaño]'],'1 reposamuñecas',['Medidas','[CONFIRMAR: largo x ancho x alto]'],AV],
'soporte-de-movil-magnetico':['Soporte magnético para el coche que sujeta el móvil a la vista para usar el navegador.',['Sujeción magnética del móvil','Fácil de colocar y de quitar','Móvil a la vista del conductor'],'1 soporte magnético',['Compatibilidad','Móviles [CONFIRMAR: requisitos de la placa metálica]'],IMAN],
'soporte-de-movil-para-rejilla-del-coche':['Soporte que se engancha a la rejilla de ventilación del coche para llevar el móvil a la vista.',['Se sujeta a la rejilla de ventilación','Fácil de instalar y de quitar','Móvil a la vista del conductor'],'1 soporte para rejilla',['Compatibilidad','Rejillas [CONFIRMAR] y móviles de [CONFIRMAR: ancho máximo]'],'No manipules el móvil mientras conduces y colócalo sin tapar tu visión de la carretera. '+AV],
'organizador-de-maletero-plegable':['Organizador plegable para ordenar el maletero y evitar que las cosas se muevan al conducir.',['Compartimentos para ordenar el maletero','Se pliega cuando no lo usas','Menos objetos rodando al conducir'],'1 organizador plegable',['Medidas','[CONFIRMAR: desplegado y plegado]'],AV]},
CNP=['','Audio','Carga','Hogar','Gaming','Coche'],pgD=$('lg-producto'),pgM=$('pd'),T0=document.title,pgP=null;
function lis(a){return a.map(function(x){return '<li>'+x+'</li>'}).join('')}
var CK='<path d="M5 12.5l4.5 4.5L19 7.5"/>',ICT='<path d="M2 6h12v10H2zM14 10h4l3 3v3h-7"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',ICR='<path d="M4 8h11a5 5 0 010 10H8M4 8l4-4M4 8l4 4"/>',ICS='<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>';
function sv(d){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+d+'</svg>'}
function ico(p,w){return '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="'+w+'" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+ICONOS[p.icono]+'</svg>'}
function ficha(p){
var sl=slug(p.nombre),f=FICHAS[sl]||['',[],'',null,AV],d=p.anterior&&p.anterior>p.precio,pct=d?Math.round((1-p.precio/p.anterior)*100):0,
env=CONFIG.envio===0?'Envío gratis':'Envío '+eur(CONFIG.envio)+(CONFIG.gratisDesde>0?', gratis desde '+eur(CONFIG.gratisDesde):''),
rel=PRODUCTOS.filter(function(x){return x!==p&&x.cat===p.cat}).concat(PRODUCTOS.filter(function(x){return x!==p&&x.cat!==p.cat})).slice(0,3),
sp=[['Material','<mark>[CONFIRMAR]</mark>'],['Medidas','<mark>[CONFIRMAR]</mark>'],['Peso','<mark>[CONFIRMAR]</mark>'],['Color','<mark>[CONFIRMAR]</mark>']];
if(f[3])sp.push([f[3][0],f[3][1]]);
sp.push(['Garantía legal','3 años desde la entrega'],['Envío','España peninsular y Baleares, con seguimiento'],['Fabricante / responsable en la UE','<mark>[RELLENAR: nombre y dirección]</mark>']);
return '<div class="tb"><button type="button" class="vol" data-px>← Tienda</button><span class="bc">Inicio / '+CNP[p.cat]+' / '+p.nombre+'</span></div>'
+'<div class="ph2"><div class="gal">'+ico(p,1.6)+'<img src="'+(p.img||'')+'" alt="'+p.nombre+'" onerror="this.remove()"><span class="tag">'+(d?'-'+pct+'%':'Nuevo')+'</span></div>'
+'<div class="inf"><span class="eb">'+CNP[p.cat]+'</span><h1 class="t">'+p.nombre+'</h1>'
+'<div class="pb"><span class="pn2">'+eur(p.precio)+'</span>'+(d?'<s class="po2">'+eur(p.anterior)+'</s><span class="sv2">Ahorras '+eur(p.anterior-p.precio)+'</span>':'')+'</div>'
+'<p class="nt">IVA incluido. '+env+'.</p><p class="ld">'+f[0]+'</p>'
+'<ul class="ck">'+f[1].map(function(x){return '<li>'+sv(CK)+'<span>'+x+'</span></li>'}).join('')+'</ul>'
+'<div class="by"><span class="qc"><button type="button" class="qb" data-q="-1" aria-label="Menos unidades">−</button><output id="pq">1</output><button type="button" class="qb" data-q="1" aria-label="Más unidades">+</button></span><button type="button" class="btn cta pab">Añadir al carrito</button></div>'
+'<div class="tr"><div>'+sv(ICT)+'<b>Con seguimiento</b><span>España peninsular y Baleares</span></div><div>'+sv(ICR)+'<b>14 días</b><span>para desistir de la compra</span></div><div>'+sv(ICS)+'<b>3 años</b><span>de garantía legal</span></div></div></div></div>'
+'<section class="sec"><h2>Especificaciones</h2><div class="sg">'+sp.map(function(r){return '<div><span>'+r[0]+'</span><b>'+r[1]+'</b></div>'}).join('')+'</div></section>'
+'<section class="sec"><h2>Qué incluye</h2><p class="ld" style="margin-top:0">'+f[2]+'</p></section>'
+'<section class="sec"><h2>Envío, devoluciones y seguridad</h2>'
+'<details open><summary>Envío y entrega</summary><p>'+env+'. Plazo estimado: <mark>[CONFIRMAR: X a Y días laborables]</mark>, siempre dentro del máximo legal de 30 días. Con número de seguimiento. El precio final incluye IVA y, si procede, aduanas. Más en los <a href="#terminos">términos de compra</a>.</p></details>'
+'<details><summary>Devolución y garantía</summary><p>14 días naturales para desistir sin dar explicaciones (el coste de devolver el producto lo asume el cliente) y 3 años de garantía legal, sin coste si el producto es defectuoso. Detalles en <a href="#devoluciones">devoluciones</a> y <a href="#terminos">términos de compra</a>.</p></details>'
+'<details><summary>Seguridad e información del producto</summary><p>'+f[4]+'</p><p>Fabricante o responsable en la UE: <mark>[RELLENAR: nombre y dirección]</mark>.</p></details></section>'
+'<section class="sec"><h2>También te puede interesar</h2><div class="rel">'+rel.map(function(x){return '<a href="#p-'+slug(x.nombre)+'">'+ico(x,1.6)+x.nombre+'<b>'+eur(x.precio)+'</b></a>'}).join('')+'</div></section>'
+'<div class="sb"><div><b>'+eur(p.precio)+'</b><span>'+p.nombre+'</span></div><button type="button" class="btn pab">Añadir</button></div>'}
function abrirP(p){pgP=p;pgM.innerHTML=ficha(p);document.title=p.nombre+' — TECUNELO';
var ld=document.getElementById('pld');if(ld)ld.remove();ld=document.createElement('script');ld.type='application/ld+json';ld.id='pld';
ld.textContent=JSON.stringify({'@context':'https://schema.org','@type':'Product',name:p.nombre,description:(FICHAS[slug(p.nombre)]||[''])[0],category:CNP[p.cat],offers:{'@type':'Offer',priceCurrency:'EUR',price:p.precio.toFixed(2),url:location.href}});document.head.appendChild(ld);
if(!pgD.open)pgD.showModal();pgD.scrollTop=0;document.body.classList.add('nsc');try{history.replaceState(null,'','#p-'+slug(p.nombre))}catch(e){}
var b=pgM.querySelector('.vol');if(b)b.focus({preventScroll:true})}
pgD.addEventListener('close',function(){document.title=T0;var ld=document.getElementById('pld');if(ld)ld.remove();pgP=null;
if(!document.querySelector('dialog.lgl[open]'))document.body.classList.remove('nsc');if(location.hash.indexOf('#p-')===0){try{history.replaceState(null,'',location.pathname+location.search)}catch(e){}}});
pgD.addEventListener('click',function(e){if(e.target===pgD){pgD.close();return}
if(e.target.closest('[data-px]')){pgD.close();return}
var q=e.target.closest('[data-q]');if(q){var o=$('pq');o.textContent=Math.max(1,Math.min(10,(+o.textContent)+(+q.getAttribute('data-q'))));return}
if(e.target.closest('.pab')&&pgP){var n=+$('pq').textContent;for(var i=0;i<n;i++)anadir(pgP)}});
[].slice.call(rail.children).forEach(function(a,i){a.addEventListener('click',function(e){if(e.target.closest('button,a'))return;abrirP(PRODUCTOS[i])})});
function hashP(){var m=location.hash.match(/^#p-(.+)$/);if(!m)return;var p=PRODUCTOS.filter(function(x){return slug(x.nombre)===m[1]})[0];if(p&&(!pgP||pgP!==p))abrirP(p)}
addEventListener('hashchange',hashP);hashP();


// ####### PROMO (cuenta atrás) #######
var END=new Date(CONFIG.promoFin).getTime(),pr=$('promo'),cd=$('cd');
function tk(){var d=END-Date.now();if(d<=0){pr.style.display='none';return false}function z(x){return(x<10?'0':'')+x}cd.textContent='termina en '+Math.floor(d/864e5)+'d '+z(Math.floor(d/36e5)%24)+':'+z(Math.floor(d/6e4)%60)+':'+z(Math.floor(d/1e3)%60);return true}
if(CONFIG.promoFin&&tk())setInterval(tk,1000);else pr.style.display='none';

// ####### BOTONES MAGNÉTICOS #######
document.querySelectorAll('.mag').forEach(function(el){
el.addEventListener('pointermove',function(e){if(R)return;var r=el.getBoundingClientRect();el.style.transform='translate('+((e.clientX-r.left-r.width/2)*.3)+'px,'+((e.clientY-r.top-r.height/2)*.4)+'px)'});
el.addEventListener('pointerleave',function(){el.style.transform=''})});

// ####### NEWSLETTER #######
$('f').addEventListener('submit',function(e){e.preventDefault();this.querySelector('button').textContent='¡Apuntado!'});

// ####### MÉTODOS DE PAGO (solo se muestran los marcados como activos) #######
[].forEach.call(document.querySelectorAll('.pay'),function(u){CONFIG.pagos.forEach(function(m){if(m.activo){var l=document.createElement('li');l.textContent=m.nombre;u.appendChild(l)}})});

// ####### APARICIÓN AL HACER SCROLL (efecto 3D) #######
var io='IntersectionObserver' in window?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15}):null;
[].forEach.call(document.querySelectorAll('.msg p,.msg svg,.hk li,.top .h,.pa,.row,.row .pay li,footer .pay li,.lg,.nl h2,#f,.nl .nt'),function(e,i){e.classList.add('rv');e.style.setProperty('--d',(i%6)*70+'ms');if(io)io.observe(e);else e.classList.add('in')});

// ####### SELECTOR DE CATEGORÍAS #######
var C=$('c'),B=[].slice.call(C.querySelectorAll('button')),lbl=$('lbl'),sel=-1,lock=false;
var L=['-5px','16.666%','33.333%','50%','66.666%','83.333%'],Wd=['calc(16.666% + 5px)','16.666%','16.666%','16.666%','16.666%','calc(16.666% + 5px)'];
var CAT=[{h:75,w:'que conecta contigo',g:0},{h:75,w:'que se escucha',g:1},{h:45,w:'que no se queda sin pilas',g:3},{h:150,w:'que te entiende',g:2},{h:310,w:'que gana partidas',g:4},{h:195,w:'que viaja contigo',g:5}];
function cap(i){C.style.setProperty('--cl',L[i]);C.style.setProperty('--cw',Wd[i])}
function apply(i){var c=CAT[i];hue=c.h;scramble(W,c.w);root.style.setProperty('--ac','hsl('+c.h+' 100% 62%)');pend=c.g;boost=1;document.body.setAttribute('data-cat',i||'all');filtrar(i);if(i)setTimeout(irAProductos,500);live.textContent=i?'Categoría '+B[i-1].getAttribute('data-l'):'Vista general'}
B.forEach(function(b){
b.addEventListener('click',function(){if(lock)return;lock=true;setTimeout(function(){lock=false},800);var i=+b.getAttribute('data-i');
if(sel<0){sel=i;C.classList.add('sel');B.forEach(function(x){if(x!==b){x.disabled=true;x.setAttribute('aria-hidden','true');x.setAttribute('tabindex','-1')}});b.textContent='Volver';b.classList.add('reset');apply(i)}
else{sel=-1;C.classList.remove('sel');B.forEach(function(x){x.disabled=false;x.removeAttribute('aria-hidden');x.removeAttribute('tabindex')});b.textContent=b.getAttribute('data-l');b.classList.remove('reset');cap(0);apply(0)}});
function hov(){if(sel>=0)return;cap(+b.getAttribute('data-i'));lbl.style.opacity='.5'}
function unhov(){var a=document.activeElement;if(a&&a.tagName==='BUTTON'&&a.matches(':focus-visible'))return;cap(0);lbl.style.opacity=''}
b.addEventListener('pointerenter',hov);b.addEventListener('focus',hov);b.addEventListener('blur',unhov)});
C.addEventListener('pointerleave',function(){if(sel<0){cap(0);lbl.style.opacity=''}});

// ####### CARRITO (estado, panel y total) #######
var CESTA=[],cl=$('cl'),ct=$('ct'),cc=$('cn'),ov=$('ov'),mn=$('mn'),cp=$('cp'),FSt=$('fst'),FSb=$('fsb'),SG=$('sg'),RS=$('rs'),CM=$('cmsg'),COD=$('cod'),APL=$('apl'),CHIP=$('chip'),CODIGO=null,fsOk=false,tsT;
try{JSON.parse(localStorage.getItem('tcn_cesta')||'[]').forEach(function(s){var p=PRODUCTOS.filter(function(x){return x.nombre===s.n})[0];if(p&&s.q>0)CESTA.push({p:p,n:Math.min(99,s.q|0)})})}catch(e){}
function anadir(p){var f=CESTA.filter(function(x){return x.p===p})[0];if(f)f.n++;else CESTA.push({p:p,n:1});pintar();toast(p.nombre);cart.classList.remove('bump');void cart.offsetWidth;cart.classList.add('bump')}
function descuento(sub){if(!CODIGO||sub<CODIGO.minimo)return 0;return CODIGO.tipo==='pct'?sub*CODIGO.valor/100:CODIGO.tipo==='eur'?Math.min(CODIGO.valor,sub):0}
function pintar(){var n=0,sub=0,ah=0;cl.innerHTML=CESTA.length?'':'<p class="vac">Tu carrito está vacío. Añade algo del catálogo.</p>';
CESTA.forEach(function(x){n+=x.n;sub+=x.n*x.p.precio;if(x.p.anterior>x.p.precio)ah+=x.n*(x.p.anterior-x.p.precio);var d=document.createElement('div');d.className='ci';d.innerHTML='<b>'+x.p.nombre+'</b><b>'+eur(x.n*x.p.precio)+'</b><span>'+eur(x.p.precio)+' / ud.</span><div class="q"><button type="button" aria-label="Quitar uno">−</button><span>'+x.n+'</span><button type="button" aria-label="Añadir uno">+</button></div>';
var bs=d.querySelectorAll('button');bs[0].onclick=function(){if(--x.n<1)CESTA.splice(CESTA.indexOf(x),1);pintar()};bs[1].onclick=function(){x.n++;pintar()};cl.appendChild(d)});
var ds=descuento(sub),gr=!!(CODIGO&&CODIGO.tipo==='envio'&&sub>=CODIGO.minimo)||(CONFIG.gratisDesde>0&&sub>=CONFIG.gratisDesde),env=!n?0:(gr?0:CONFIG.envio),tot=sub-ds+env;
if(CONFIG.gratisDesde>0){var f=CONFIG.gratisDesde-sub;FSb.style.width=Math.min(100,sub/CONFIG.gratisDesde*100)+'%';FSt.innerHTML=!n?'Envío gratis desde <b>'+eur(CONFIG.gratisDesde)+'</b>':f>0?'Te faltan <b>'+eur(f)+'</b> para el envío gratis':'🎉 <b>¡Envío gratis conseguido!</b>';var ok=n&&f<=0;if(ok&&!fsOk)confeti();fsOk=ok}else $('fs').style.display='none';
RS.innerHTML=n?'<div><span>Subtotal</span><span>'+eur(sub)+'</span></div>'+(ds?'<div class="ds"><span>Código '+CODIGO.codigo+'</span><span>−'+eur(ds)+'</span></div>':'')+'<div><span>Envío</span><span>'+(env?eur(env):'Gratis')+'</span></div>':'';
SG.innerHTML='';if(n){var en=CESTA.map(function(x){return x.p}),su=PRODUCTOS.filter(function(p){return en.indexOf(p)<0}).sort(function(a,b){return a.precio-b.precio}).slice(0,3);SG.innerHTML='<h4>Completa tu pedido</h4>';su.forEach(function(p){var e=document.createElement('div');e.className='su';e.innerHTML='<b>'+p.nombre+'</b><span>'+eur(p.precio)+'</span><button class="btn sm" type="button">+ Añadir</button>';e.querySelector('button').onclick=function(){anadir(p)};SG.appendChild(e)})}
APL.textContent=CODIGO?'Quitar':'Aplicar';CHIP.style.display=CODIGO?'none':'';
if(CODIGO)msg(sub>=CODIGO.minimo?'✓ '+CODIGO.codigo+': '+CODIGO.texto:'Añade '+eur(CODIGO.minimo-sub)+' más para usar '+CODIGO.codigo,sub>=CODIGO.minimo?'ok':'er');
try{localStorage.setItem('tcn_cesta',JSON.stringify(CESTA.map(function(x){return{n:x.p.nombre,q:x.n}})))}catch(e){}
ct.textContent=eur(tot);cc.textContent=n;$('pagar').disabled=!n}
function msg(t,c){CM.textContent=t;CM.className='cmsg '+c}
function aplicar(c){c=c.trim().toUpperCase();var k=CONFIG.codigos.filter(function(x){return x.codigo===c})[0];if(!c){msg('Escribe un código','er');return}if(!k){msg('Ese código no existe o ha caducado','er');return}CODIGO=k;pintar();if(CESTA.reduce(function(s,x){return s+x.n*x.p.precio},0)>=k.minimo)confeti()}
APL.onclick=function(){if(CODIGO){CODIGO=null;msg('','');COD.value='';pintar();return}aplicar(COD.value)};
COD.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();APL.click()}});
if(CONFIG.codigos.length)CHIP.innerHTML='Código de bienvenida: <b>'+CONFIG.codigos[0].codigo+'</b> · toca para aplicar';if(!CONFIG.codigos.length){$('cdt').style.display='none';$('cdb').style.display='none'}
$('cdt').onclick=function(){var b=$('cdb'),o=b.classList.toggle('on');this.setAttribute('aria-expanded',o);if(o)COD.focus()};
if(CONFIG.codigos.length)CHIP.onclick=function(){COD.value=CONFIG.codigos[0].codigo;aplicar(COD.value)};
function confeti(){return;for(var i=0;i<26;i++){var s=document.createElement('i');s.className='cf';s.style.cssText='left:'+(innerWidth/2)+'px;top:'+(innerHeight*.45)+'px;background:'+(i%2?'#fff':'var(--ac)')+';--dx:'+((Math.random()-.5)*innerWidth*.7)+'px;--dy:'+((Math.random()-.2)*innerHeight*.6)+'px;--r:'+(Math.random()*720)+'deg';document.body.appendChild(s);setTimeout(function(x){x.remove()}.bind(null,s),1200)}}
function toast(t){var e=$('ts');e.innerHTML='<i class="ok" aria-hidden="true">✓</i><span class="tx"><strong></strong><small>Añadido al carrito</small></span><b>Ver</b>';e.querySelector('strong').textContent=t;e.classList.add('on');clearTimeout(tsT);tsT=setTimeout(function(){e.classList.remove('on')},2200)}
$('ts').onclick=function(){abrir(cp)};
function abrir(d){cerrar();d.classList.add('on');d.setAttribute('aria-hidden','false');ov.classList.add('on');document.body.classList.add('nsc');setTimeout(function(){d.querySelector('.x').focus()},60)}
function cerrar(){[mn,cp].forEach(function(d){d.classList.remove('on');d.setAttribute('aria-hidden','true')});ov.classList.remove('on');document.body.classList.remove('nsc')}
cart.onclick=function(e){e.preventDefault();abrir(cp)};ov.onclick=cerrar;
[].forEach.call(document.querySelectorAll('.x,.ml a'),function(b){b.addEventListener('click',cerrar)});
addEventListener('keydown',function(e){if(e.key==='Escape')cerrar()});
$('pagar').onclick=function(){var b=this;if(!CESTA.length)return;b.disabled=true;b.textContent='Redirigiendo al pago…';
var items=CESTA.map(function(x){return{id:x.p.vid,quantity:x.n}});
fetch('/cart/clear.js',{method:'POST'}).then(function(){return fetch('/cart/add.js',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items:items})})})
.then(function(r){if(!r.ok)throw 0;location.href='/checkout'}).catch(function(){b.disabled=false;b.textContent='Finalizar compra';alert('No se ha podido iniciar el pago. Inténtalo de nuevo.')})};
pintar();

// ####### FILTRO, CONTADOR Y SALTO A PRODUCTOS #######
var CARDS=[].slice.call(rail.children),todos=false,catAct=0,cnt=$('cnt'),vt=$('vt');
function filtrar(i){catAct=i;var n=0,v={};CARDS.forEach(function(a){var c=+a.getAttribute('data-c');v[c]=(v[c]||0)+1;var ok=i?c===i:(todos||v[c]<=CONFIG.inicial);a.hidden=!ok;if(ok)n++});
cnt.textContent=(i?B[i-1].getAttribute('data-l'):todos?'Todo el catálogo':'Nuestra selección')+' · '+n+' producto'+(n===1?'':'s');vt.style.display=i?'none':'';vt.textContent=todos?'Ver menos':'Ver todo el catálogo'}
vt.addEventListener('click',function(e){e.preventDefault();todos=!todos;filtrar(0)});
function irAProductos(){var t=$('top');if(t)t.scrollIntoView({behavior:R?'auto':'smooth',block:'start'})}
filtrar(0);

// ####### MENÚ DEL CATÁLOGO (tres rayas) #######
function irCat(i){if(sel>=0){var cur=B[sel-1];sel=-1;C.classList.remove('sel');B.forEach(function(x){x.disabled=false;x.removeAttribute('aria-hidden');x.removeAttribute('tabindex')});cur.textContent=cur.getAttribute('data-l');cur.classList.remove('reset');cap(0)}
if(i){var b=B[i-1];sel=i;C.classList.add('sel');B.forEach(function(x){if(x!==b){x.disabled=true;x.setAttribute('aria-hidden','true');x.setAttribute('tabindex','-1')}});b.textContent='Volver';b.classList.add('reset')}else todos=true;
apply(i);if(!i)setTimeout(irAProductos,450)}
function pintarMenu(){var ml=$('ml'),it=[[0,'Todo el catálogo',PRODUCTOS.length]];ml.innerHTML='';B.forEach(function(b,j){it.push([j+1,b.getAttribute('data-l'),PRODUCTOS.filter(function(p){return p.cat===j+1}).length])});
it.forEach(function(x){var b=document.createElement('button');b.type='button';b.className='mi'+(catAct===x[0]?' a':'');b.innerHTML='<span>'+x[1]+'</span><em>'+x[2]+'</em>';b.onclick=function(){cerrar();irCat(x[0])};ml.appendChild(b)})}
$('hb').onclick=function(){pintarMenu();abrir(mn)};

// ####### ESCENA 3D #######
if(!window.THREE)return;
var LITE=innerWidth<760||R||(navigator.hardwareConcurrency||8)<=4;
var cv=$('gl'),rd=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true});rd.setPixelRatio(Math.min(window.devicePixelRatio||1,LITE?1.75:2));
var sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(50,1,.1,100);cam.position.z=7;
var G=[new THREE.DodecahedronGeometry(1.6,0),new THREE.TorusKnotGeometry(1,.3,120,14),new THREE.IcosahedronGeometry(1.6,1),new THREE.TorusGeometry(1.2,.45,14,40),new THREE.BoxGeometry(1.9,1.9,1.9,3,3,3),new THREE.CylinderGeometry(1,1.3,2,8,3)];
var pivot=new THREE.Group();sc.add(pivot);
// ####### [MEJORA ④] ENTORNO, LUCES Y MATERIALES PREMIUM #######
function makeEnv(){var c=document.createElement('canvas');c.width=512;c.height=256;var g=c.getContext('2d'),gr=g.createLinearGradient(0,0,0,256);
gr.addColorStop(0,'#35604a');gr.addColorStop(.45,'#0d1d14');gr.addColorStop(.55,'#040906');gr.addColorStop(1,'#22402f');g.fillStyle=gr;g.fillRect(0,0,512,256);
g.globalAlpha=.95;g.fillStyle='#fff';g.fillRect(50,46,100,38);g.fillRect(320,36,130,28);g.globalAlpha=.75;g.fillStyle='#d8ff7a';g.fillRect(215,104,44,96);g.fillStyle='#bfe9ff';g.fillRect(438,88,52,76);g.globalAlpha=1;
var t=new THREE.CanvasTexture(c);t.mapping=THREE.EquirectangularReflectionMapping;return t}
var ENV=makeEnv(),T=0;
var amb=new THREE.AmbientLight(0xffffff,.3),key=new THREE.DirectionalLight(0xffffff,1.1),rimA=new THREE.PointLight(0xffffff,1.8,40),rimB=new THREE.PointLight(0xffffff,1.4,40);
key.position.set(4,5,6);sc.add(amb,key,rimA,rimB);
var wire=new THREE.Mesh(G[0],new THREE.MeshBasicMaterial({wireframe:true,transparent:true,opacity:.55}));
var shell=new THREE.Mesh(G[0],new THREE.MeshPhysicalMaterial({color:0x9fe0b4,metalness:.15,roughness:.04,transparent:true,opacity:.16,envMap:ENV,envMapIntensity:2.2,clearcoat:1,clearcoatRoughness:0,side:THREE.DoubleSide,depthWrite:false}));
var core=new THREE.Mesh(new THREE.OctahedronGeometry(.8),new THREE.MeshPhysicalMaterial({color:0xe6eee0,metalness:1,roughness:.1,envMap:ENV,envMapIntensity:1.8,clearcoat:1,clearcoatRoughness:.05,flatShading:true}));
var r1=new THREE.Mesh(new THREE.TorusGeometry(2.4,.03,16,160),new THREE.MeshStandardMaterial({metalness:1,roughness:.18,envMap:ENV,envMapIntensity:1.6,emissiveIntensity:.6}));
var r2=new THREE.Mesh(new THREE.TorusGeometry(3,.03,16,160),new THREE.MeshStandardMaterial({metalness:1,roughness:.18,envMap:ENV,envMapIntensity:1.6,emissiveIntensity:.6}));
r1.rotation.x=1.2;r2.rotation.y=1.1;pivot.add(shell,wire,core,r1,r2);
function recolor(){var h=hue;wire.material.color.set('hsl('+h+',100%,62%)');shell.material.color.set('hsl('+h+',70%,70%)');
r1.material.color.set('hsl('+((h+50)%360)+',100%,70%)');r1.material.emissive.set('hsl('+((h+50)%360)+',100%,28%)');
r2.material.color.set('hsl('+((h+310)%360)+',100%,70%)');r2.material.emissive.set('hsl('+((h+310)%360)+',100%,28%)');
rimA.color.set('hsl('+h+',100%,60%)');rimB.color.set('hsl('+((h+60)%360)+',100%,60%)');window.TCN_hue=h}recolor();
var N=LITE?500:1500,pos=new Float32Array(N*3);
for(var i=0;i<N;i++){var r=3.8+Math.random()*7,a=Math.random()*6.283,b=Math.acos(2*Math.random()-1);pos[i*3]=r*Math.sin(b)*Math.cos(a);pos[i*3+1]=r*Math.sin(b)*Math.sin(a);pos[i*3+2]=r*Math.cos(b)}
var pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(pos,3));
var DOT=(function(){var c=document.createElement('canvas');c.width=c.height=64;var g=c.getContext('2d'),r=g.createRadialGradient(32,32,0,32,32,32);r.addColorStop(0,'rgba(255,255,255,1)');r.addColorStop(.35,'rgba(255,255,255,.6)');r.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=r;g.fillRect(0,0,64,64);return new THREE.CanvasTexture(c)})();
var pts=new THREE.Points(pg,new THREE.PointsMaterial({size:.07,map:DOT,color:0xd8f5b0,transparent:true,opacity:.8,depthWrite:false}));sc.add(pts);
// ####### FIGURAS FLOTANTES (viajan con el scroll) #######
var fl=[],fg=[new THREE.OctahedronGeometry(.28),new THREE.BoxGeometry(.4,.4,.4),new THREE.TetrahedronGeometry(.36)],lh=-1;
for(var q=0;q<(LITE?10:30);q++){var m=new THREE.Mesh(fg[q%3],new THREE.MeshStandardMaterial({metalness:.95,roughness:.22,envMap:ENV,envMapIntensity:1.5,flatShading:true,transparent:true,opacity:.6})),an=q*.7,rr=3.6+Math.random()*4.5;m.position.set(Math.cos(an)*rr,Math.sin(an)*rr*.7,0);m.userData={z:Math.random()*28-14,s:.3+Math.random()};sc.add(m);fl.push(m)}

function size(){rd.setSize(innerWidth,innerHeight,false);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()}size();addEventListener('resize',size);
document.addEventListener('click',function(e){if(!e.target.closest('a,button,input,.tilt,.row,#c'))boost=1});
// ####### [MEJORA ③] CÁMARA CON SCROLL: una "escena" por sección #######
var SEC=['.hero','#top','.msg','#info','#news'].map(function(s){return document.querySelector(s)}),SYc=[],SN=[].slice.call(document.querySelectorAll('#sn button'));
var KF=[
{c:[0,0,7],p:[0,.2,0],s:1},
{c:[2.4,1,6.4],p:[3.9,-.2,-1.6],s:.75},
{c:[-2.8,-.8,5.6],p:[-2.5,.3,0],s:1.15},
{c:[0,2.4,6.2],p:[3.1,0,-.6],s:.9},
{c:[0,0,5],p:[0,0,0],s:1.6}];
var cur={c:[0,0,7],p:[0,.2,0],s:1},sIdx=-1;
function measure(){SYc=SEC.map(function(e){if(!e)return 0;var r=e.getBoundingClientRect();return scrollY+r.top+r.height/2})}
measure();addEventListener('resize',measure);addEventListener('load',measure);setInterval(measure,1200);
SN.forEach(function(b,i){b.setAttribute('aria-label','Ir a '+b.title);b.addEventListener('click',function(){var e=SEC[i];if(e)e.scrollIntoView({behavior:R?'auto':'smooth',block:i?'start':'start'})})});
function sm(t){return t*t*(3-2*t)}
function mix(a,b,t){return a+(b-a)*t}
function aim(){var yc=sy+innerHeight*.5,i=0,n=SYc.length;while(i<n-1&&yc>=SYc[i+1])i++;
var j=Math.min(i+1,n-1),t=j===i?0:sm(Math.min(1,Math.max(0,(yc-SYc[i])/Math.max(1,SYc[j]-SYc[i])))),a=KF[i],b=KF[j],m=innerWidth>760?1:.36,dy=innerWidth>760?0:1.2;
var tg={c:[mix(a.c[0],b.c[0],t)*m,mix(a.c[1],b.c[1],t),mix(a.c[2],b.c[2],t)+(innerWidth>760?0:1.6)],p:[mix(a.p[0],b.p[0],t)*m,mix(a.p[1],b.p[1],t)+dy,mix(a.p[2],b.p[2],t)],s:mix(a.s,b.s,t)};
var act=t>.5?j:i;if(act!==sIdx){sIdx=act;SN.forEach(function(x,q){x.classList.toggle('on',q===act)})}
for(var q=0;q<3;q++){cur.c[q]+=(tg.c[q]-cur.c[q])*.06;cur.p[q]+=(tg.p[q]-cur.p[q])*.06}cur.s+=(tg.s-cur.s)*.06}
var k=R?.25:1;
function loop(){
aim();T+=.01*k;rimA.position.set(Math.cos(T)*6,Math.sin(T*.8)*3,3);rimB.position.set(Math.cos(T+3)*6,Math.sin(T*.6+2)*3,2);
rx+=(px-rx)*.15;ry+=(py-ry)*.15;ring.style.transform='translate('+rx+'px,'+ry+'px)';
pivot.rotation.x+=((my*.5)-pivot.rotation.x)*.05;pivot.rotation.y+=((mx*.8)-pivot.rotation.y)*.05;
wire.rotation.y+=.004*k;wire.rotation.x+=.002*k;core.rotation.y-=.01*k;core.rotation.x+=.006*k;r1.rotation.z+=.006*k;r2.rotation.z-=.004*k;pts.rotation.y+=.0007*k;pts.rotation.x=sy*.0004;
if(pend!==null){sc2+=(0-sc2)*.25;if(sc2<.06){wire.geometry=G[pend];shell.geometry=G[pend];pend=null;recolor()}}else sc2+=(1-sc2)*.12;
boost*=.92;var s=(Math.max(.001,sc2)+boost*.25)*cur.s;pivot.scale.set(s,s,s);
pivot.position.set(cur.p[0],cur.p[1],cur.p[2]);shell.rotation.copy(wire.rotation);
cv.style.opacity=Math.max(.7,1-sy/innerHeight*.3);
fl.forEach(function(m){var u=m.userData;m.rotation.x+=.01*u.s*k;m.rotation.y+=.013*u.s*k;m.position.z=((u.z+sy*.008+14)%28)-14;m.material.opacity=.15+.5*(1-Math.abs(m.position.z)/14)});
if(lh!==hue){lh=hue;fl.forEach(function(m,j){m.material.color.set('hsl('+((hue+j*9)%360)+',100%,62%)')})}
cam.position.x+=(cur.c[0]+mx*.7-cam.position.x)*.1;cam.position.y+=(cur.c[1]-my*.45-cam.position.y)*.1;cam.position.z=cur.c[2];cam.lookAt(cur.p[0]*.35,cur.p[1]*.35,0);
if(!R)H1.style.transform='perspective(1000px) rotateY('+(mx*7)+'deg) rotateX('+(-my*5)+'deg)';
rd.render(sc,cam);requestAnimationFrame(loop)}
loop();
})();



// ####### CONSENTIMIENTO DE COOKIES #######
// Esta tienda no carga analítica ni marketing por defecto. Cuando añadas una (Shopify, Meta, Google...),
// cárgala SOLO dentro de activar(): se ejecuta únicamente si el visitante la aceptó.
(function(){
var K='tecunelo_consent',ck=document.getElementById('ck'),cfg=ck.querySelector('.ckc'),an=document.getElementById('ck-an'),mk=document.getElementById('ck-mk');
function leer(){try{return JSON.parse(localStorage.getItem(K))}catch(e){return null}}
function activar(c){window.TECUNELO_CONSENT=c;document.dispatchEvent(new CustomEvent('consent',{detail:c}))
 // if(c.analitica){ /* cargar aquí el script de analítica */ }
 // if(c.marketing){ /* cargar aquí el píxel de anuncios */ }
}
function guardar(a,m){var c={analitica:a,marketing:m,fecha:new Date().toISOString()};try{localStorage.setItem(K,JSON.stringify(c))}catch(e){}ck.hidden=true;activar(c)}
var c0=leer();if(c0){activar(c0)}else{ck.hidden=false}
ck.addEventListener('click',function(e){var a=e.target.getAttribute&&e.target.getAttribute('data-a');if(!a)return;
 if(a==='all')guardar(true,true);else if(a==='no')guardar(false,false);
 else{if(cfg.hidden){cfg.hidden=false;e.target.textContent='Guardar selección'}else guardar(an.checked,mk.checked)}});
document.getElementById('ckr').onclick=function(){var c=leer()||{};an.checked=!!c.analitica;mk.checked=!!c.marketing;cfg.hidden=false;ck.querySelector('[data-a=cfg]').textContent='Guardar selección';ck.hidden=false};
})();

// ####### BOTÓN DE DESISTIMIENTO #######
(function(){
var EMAIL='[RELLENAR-CORREO-DE-SOPORTE]',d=document.getElementById('dsm'),f=document.getElementById('dsf'),r=document.getElementById('dsr');
document.getElementById('dso').onclick=function(){r.textContent='';d.showModal()};
document.getElementById('dsc').onclick=function(){d.close()};
f.addEventListener('submit',function(e){e.preventDefault();
 if(EMAIL.charAt(0)==='['){r.textContent='Falta configurar el correo de soporte (variable EMAIL).';return}
 var v=new FormData(f),cuerpo='Por la presente comunico que desisto de mi contrato de compra.\n\nNombre: '+v.get('n')+'\nPedido: '+v.get('p')+'\nCorreo: '+v.get('e')+'\nProductos: '+(v.get('x')||'todo el pedido')+'\nFecha: '+new Date().toLocaleString('es-ES');
 location.href='mailto:'+EMAIL+'?subject='+encodeURIComponent('Desistimiento - pedido '+v.get('p'))+'&body='+encodeURIComponent(cuerpo);
 r.textContent='Se ha abierto tu correo con la solicitud. Envíala para que quede constancia; te enviaremos un acuse de recibo.'});
})();


// ####### PÁGINAS LEGALES: se abren como panel sin salir de la tienda #######
(function(){
var ids=['aviso-legal','privacidad','cookies','terminos','devoluciones'],cur=null;
function cerrar(){if(cur){cur.close()}}
function abrir(id){if(ids.indexOf(id)<0)return false;var d=document.getElementById('lg-'+id);if(!d)return false;
 if(cur&&cur!==d)cur.close();cur=d;if(!d.open)d.showModal();d.scrollTop=0;document.body.classList.add('nsc');try{history.replaceState(null,'','#'+id)}catch(e){}return true}
ids.forEach(function(id){var d=document.getElementById('lg-'+id);
 d.addEventListener('close',function(){if(cur===d){cur=null;document.body.classList.remove('nsc');try{history.replaceState(null,'',location.pathname+location.search)}catch(e){}}});
 d.addEventListener('click',function(e){if(e.target===d)d.close()})});
document.addEventListener('click',function(e){var x=e.target.closest&&e.target.closest('[data-x]');if(x){cerrar();return}
 var a=e.target.closest&&e.target.closest('a[href^="#"]');if(!a)return;var id=a.getAttribute('href').slice(1);if(ids.indexOf(id)>=0){e.preventDefault();abrir(id)}},true);
if(location.hash)abrir(location.hash.slice(1));
addEventListener('hashchange',function(){abrir(location.hash.slice(1))});
})();
