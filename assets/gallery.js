(function(){
var grid=document.getElementById('grid'),btns=document.querySelectorAll('.filters button'),st=document.getElementById('estado');
function el(h){var d=document.createElement('div');d.innerHTML=h.trim();return d.firstChild}
function show(key){btns.forEach(function(b){b.setAttribute('aria-pressed',b.dataset.f===key)});grid.textContent='';
if(key==='mias'){var a=WC.store(),n=0;a.forEach(function(x){var c=WC.decode(x.code);if(!c)return;n++;var t=el('<article class="tpl"><canvas></canvas><div class="tpl-actions"><a class="btn alt">Abrir</a><button class="btn alt" type="button">Borrar</button></div></article>');WC.render(t.querySelector('canvas'),c,{width:460});t.querySelector('a').href='card.html#c='+x.code;t.querySelector('button').addEventListener('click',function(){WC.removeSaved(x.code);show('mias');st.textContent='Tarjeta borrada de este navegador.'});grid.appendChild(t)});
if(!n)grid.appendChild(el('<div class="empty"><h2>Aún no has creado ninguna tarjeta</h2><p>Las que crees en este navegador aparecerán aquí.</p><a class="btn" href="index.html#crear">Crear mi tarjeta</a></div>'));return}
WC.TEMPLATES.filter(function(t){return key==='todas'||t[1]===key}).forEach(function(t){var card={m:t[3],d:t[2],s:t[1]==='tradicional'&&t[2]==='reyes'?3:0,l:'m'},e=el('<article class="tpl"><canvas></canvas><a class="btn alt">Usar esta tarjeta</a></article>');WC.render(e.querySelector('canvas'),card,{width:460});e.querySelector('a').href='index.html?plantilla='+t[0]+'#crear';grid.appendChild(e)})}
btns.forEach(function(b){b.addEventListener('click',function(){show(b.dataset.f)})});
var h=location.hash.slice(1);show(h==='mias'?'mias':'todas');
})();
