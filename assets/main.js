(function(){
  var y=document.getElementById('yr'); if(y) y.textContent=new Date().getFullYear();
  var nav=document.getElementById('nav'), b=document.getElementById('burger');
  if(b) b.onclick=function(){nav.classList.toggle('open');document.body.classList.toggle('menu-open',nav.classList.contains('open'))};
  // accordion toggles for sections with sub-links (phone menu)
  if(nav) nav.querySelectorAll('li').forEach(function(li){var sub=li.querySelector('.sub');if(!sub)return;var t=document.createElement('button');t.className='acc';t.type='button';t.setAttribute('aria-label','展开');li.insertBefore(t,sub);t.onclick=function(e){e.preventDefault();li.classList.toggle('open')};});
  // close mobile menu after choosing an item
  if(nav) nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('open');document.body.classList.remove('menu-open')})});
  // always open a new page at the top (or at its #section); stops the viewer restoring the previous page's scroll position
  try{if('scrollRestoration' in history) history.scrollRestoration='manual';}catch(e){}
  function toTarget(){var h=decodeURIComponent(location.hash.slice(1));var el=h&&document.getElementById(h);if(el){el.scrollIntoView();}else{window.scrollTo(0,0);}}
  toTarget(); window.addEventListener('load',function(){toTarget();setTimeout(toTarget,120);});
  // image fallback: keep layout if an image fails to load
  
  // hero slider
  var slides=document.querySelectorAll('.slide'), dots=document.querySelectorAll('.dots button'), i=0, t;
  function go(n){ if(!slides.length) return; slides[i].classList.remove('on'); dots[i]&&dots[i].classList.remove('on'); i=(n+slides.length)%slides.length; slides[i].classList.add('on'); dots[i]&&dots[i].classList.add('on'); }
  function auto(){ clearInterval(t); t=setInterval(function(){go(i+1)},6000); }
  dots.forEach(function(d,k){d.onclick=function(){go(k);auto()}}); if(slides.length>1) auto();
  // product gallery thumbs
  document.querySelectorAll('.pd-gal').forEach(function(g){var m=g.querySelector('.main');g.querySelectorAll('.thumbs img').forEach(function(th){th.onclick=function(){m.src=th.dataset.big;g.querySelectorAll('.thumbs img').forEach(function(x){x.classList.remove('on')});th.classList.add('on')}})});
  // purity grade tabs
  document.querySelectorAll('.gradebox').forEach(function(box){box.querySelectorAll('.gtab').forEach(function(t){t.onclick=function(){box.querySelectorAll('.gtab,.gpane').forEach(function(x){x.classList.toggle('on',x.dataset.g===t.dataset.g)})}})});
  // purity readout: step through grades once, rest on 6.0N
  var pv=document.getElementById('pv'),pg=document.getElementById('pg');
  if(pv&&pg&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){var sp=[].slice.call(pg.children),k=0;
    function show(n){sp.forEach(function(x,j){x.classList.toggle('on',j===n)});pv.textContent=sp[n].dataset.v;}
    show(0);var tm=setInterval(function(){k++;show(k);if(k>=sp.length-1)clearInterval(tm)},650);
    sp.forEach(function(x,j){x.style.cursor='pointer';x.onclick=function(){clearInterval(tm);show(j)}});}
  // reveal on scroll
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.1});document.querySelectorAll('.reveal').forEach(function(el){io.observe(el)})}else{document.querySelectorAll('.reveal').forEach(function(el){el.classList.add('in')})}
  // inquiry form -> mailto
  var f=document.getElementById('inq');
  if(f){ var q=new URLSearchParams(location.search).get('p'); if(q){var s=f.querySelector('select');[].forEach.call(s.options,function(o){if(o.value===q)s.value=q})}
    f.onsubmit=function(e){e.preventDefault();var d=new FormData(f);
    var body='联系人：'+d.get('name')+'\n电话：'+d.get('tel')+'\n公司：'+d.get('co')+'\n意向产品：'+d.get('prod')+'\n纯度/规格/用量：'+d.get('msg');
    location.href='mailto:'+f.dataset.mail+'?subject='+encodeURIComponent('官网询价 - '+d.get('prod'))+'&body='+encodeURIComponent(body);
    document.getElementById('ok').style.display='block';};
  }
})();
