(function(){
var $=function(i){return document.getElementById(i)},f=$('maker'),cv=$('preview'),state={t:'',f:'',m:'',s:0,d:'abeto',l:'m'},last=null;
var q=new URLSearchParams(location.search),tpl=WC.TEMPLATES.filter(function(t){return t[0]===q.get('plantilla')})[0];
var box=$('designs');
WC.DESIGNS.forEach(function(d,i){var l=document.createElement('label');l.className='design-opt';l.innerHTML='<input type="radio" name="design" value="'+d.id+'"'+(i?'':' checked')+'><canvas width="150" height="210"></canvas><span>'+d.name+'</span>';box.appendChild(l);WC.render(l.querySelector('canvas'),{d:d.id,m:'x'},{width:300,plain:true})});
WC.GREET.forEach(function(g,i){var o=new Option(g,i);$('saludo').add(o)});
Object.keys(WC.CATS).forEach(function(k){$('categoria').add(new Option(WC.CATS[k],k))});
function read(){state.t=$('para').value;state.f=$('de').value;state.m=$('mensaje').value;state.s=+$('saludo').value;state.d=f.elements.design.value;state.l=f.elements.letra.value}
function paint(){read();if(state.m.trim()){$('err-mensaje').hidden=true;$('mensaje').removeAttribute('aria-invalid')}$('contador').textContent=Array.from($('mensaje').value).length+'/'+WC.MAX.msg;WC.render(cv,state,{width:840})}
function suggest(){var c=$('categoria').value,list=WC.TEMPLATES.filter(function(t){return t[1]===c}),cur=$('mensaje').value,i=list.findIndex(function(t){return t[3]===cur}),n=list[(i+1)%list.length];$('mensaje').value=n[3];$('err-mensaje').hidden=true;$('mensaje').removeAttribute('aria-invalid');paint()}
if(tpl){$('mensaje').value=tpl[3];$('categoria').value=tpl[1];if(tpl[2]==='reyes')$('saludo').value='3';var r=f.querySelector('input[name=design][value='+tpl[2]+']');if(r)r.checked=true}
else if(q.get('diseno')){var r2=f.querySelector('input[name=design][value="'+CSS.escape(q.get('diseno'))+'"]');if(r2)r2.checked=true}
f.addEventListener('input',paint);$('otra').addEventListener('click',suggest);$('categoria').addEventListener('change',suggest);
f.addEventListener('submit',function(e){e.preventDefault();read();var c=WC.normalize(state);if(!c.m){$('err-mensaje').hidden=false;$('mensaje').setAttribute('aria-invalid','true');$('mensaje').focus();return}
last=c;var url=WC.cardUrl(c),saved=WC.save(c);$('enlace').value=url;$('ver').href=url;$('wa').href='https://wa.me/?text='+encodeURIComponent('Te he preparado una felicitación: '+url);$('mail').href='mailto:?subject='+encodeURIComponent('Tienes una felicitación de Navidad')+'&body='+encodeURIComponent('Te he preparado una felicitación. Ábrela aquí:\n'+url);
$('compartir').hidden=!navigator.share;$('guardada').textContent=saved?'También la verás en Mis tarjetas, en este navegador.':'';$('estado').textContent='';$('resultado').hidden=false;$('resultado').focus();$('resultado').scrollIntoView({block:'nearest'})});
$('copiar').addEventListener('click',function(){var i=$('enlace');function ok(){$('estado').textContent='Enlace copiado.'}if(navigator.clipboard&&isSecureContext)navigator.clipboard.writeText(i.value).then(ok,fb);else fb();function fb(){i.select();try{document.execCommand('copy');ok()}catch(e){$('estado').textContent='Selecciona el enlace y cópialo a mano.'}}});
$('compartir').addEventListener('click',function(){navigator.share({title:'Tu felicitación de Navidad',text:'Te he preparado una felicitación.',url:$('enlace').value}).catch(function(){})});
$('descargar').addEventListener('click',function(){var b=this;b.disabled=true;WC.download(last).then(function(){$('estado').textContent='Imagen descargada.'},function(){$('estado').textContent='No se pudo crear la imagen. Prueba con otro navegador.'}).then(function(){b.disabled=false})});
paint();
var demo=$('demo-sheet');if(demo){WC.render(demo,{t:'Marta',f:'Tu hermano Pablo',m:'Este año también me toca a mí traer el turrón. Prometo no comérmelo por el camino.',s:0,d:'abeto',l:'m'},{width:840});WCenvelope($('demo-stage'))}
})();
