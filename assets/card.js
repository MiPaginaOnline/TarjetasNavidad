(function(){
var $=function(i){return document.getElementById(i)},m=/[#&]c=([\w-]+)/.exec(location.hash),c=m&&WC.decode(m[1]);
if(!c){$('ok').hidden=true;$('bad').hidden=false;return}
$('titulo').textContent=(c.t?c.t+', tienes':'Tienes')+' una felicitación';document.title='Tienes una felicitación | WishCraft';
$('sobre-para').textContent=c.t?'Para '+c.t:'';
WC.render($('sheet'),c,{width:840});WCenvelope($('stage'));
$('descargar').addEventListener('click',function(){var b=this;b.disabled=true;WC.download(c).then(function(){$('estado').textContent='Imagen descargada.'},function(){$('estado').textContent='No se pudo crear la imagen. Prueba con otro navegador.'}).then(function(){b.disabled=false})});
var share=$('compartir');if(!navigator.share)share.hidden=true;
share.addEventListener('click',function(){var data={title:'Felicitación de Navidad',url:location.href};WC.blob(c).then(function(b){var file=new File([b],WC.fileName(c),{type:'image/png'});return navigator.canShare&&navigator.canShare({files:[file]})?navigator.share({files:[file],title:data.title}):navigator.share(data)}).catch(function(){})});
})();
