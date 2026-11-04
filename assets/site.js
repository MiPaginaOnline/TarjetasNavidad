(function(){
var b=document.querySelector('.menu-btn'),n=document.getElementById('nav');
if(b&&n){b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o);b.textContent=o?'Cerrar':'Menú'});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&n.classList.contains('open')){n.classList.remove('open');b.setAttribute('aria-expanded',false);b.textContent='Menú';b.focus()}})}
var cd=document.getElementById('countdown');
if(cd){var now=new Date(),t=new Date(now.getFullYear(),now.getMonth(),now.getDate()),m=now.getMonth(),d=now.getDate(),x=new Date(now.getFullYear(),11,25);
if(m===11&&d===25)cd.textContent='¡Hoy es Navidad!';else{if(t>x)x=new Date(now.getFullYear()+1,11,25);var dd=Math.round((x-t)/864e5);cd.textContent=dd===1?'Falta 1 día para Navidad':'Faltan '+dd+' días para Navidad'}}
var y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
var rev=document.getElementById('privacy-settings');
if(rev)rev.addEventListener('click',function(){var s=document.getElementById('privacy-status');if(window.googlefc&&googlefc.showRevocationMessage){googlefc.callbackQueue.push(googlefc.showRevocationMessage)}else if(s){s.textContent='Las opciones aparecerán aquí cuando los anuncios estén activos. Ahora mismo este navegador no ha cargado ningún anuncio.'}});
window.WCsnow=function(cv){if(!cv||matchMedia('(prefers-reduced-motion: reduce)').matches)return;var c=cv.getContext('2d'),f=[],raf;function size(){cv.width=cv.offsetWidth;cv.height=cv.offsetHeight}size();addEventListener('resize',size);for(var i=0;i<40;i++)f.push({x:Math.random(),y:Math.random(),r:1+Math.random()*2.6,s:.15+Math.random()*.45,o:Math.random()*6});function tick(){c.clearRect(0,0,cv.width,cv.height);c.fillStyle='rgba(255,255,255,.4)';f.forEach(function(p){p.y+=p.s/cv.height*2;p.o+=.01;if(p.y>1)p.y=-.02;c.beginPath();c.arc(p.x*cv.width+Math.sin(p.o)*14,p.y*cv.height,p.r,0,6.3);c.fill()});raf=requestAnimationFrame(tick)}tick();document.addEventListener('visibilitychange',function(){cancelAnimationFrame(raf);if(!document.hidden)tick()})};
var s=document.querySelector('canvas.snow');if(s)WCsnow(s);
window.WCenvelope=function(stage,onOpen){var seal=stage.querySelector('.seal');seal.addEventListener('click',function(){stage.classList.add('open');if(onOpen)onOpen()})};
})();
