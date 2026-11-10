/* Prototipo "Tú eres UNACEM Ecuador": recorrido guiado primero, exploración libre después.
   Datos en js/data.js · pantallas en screens/*.html */
var D=window.PROTO;
D.owner={};Object.keys(D.screens).forEach(function(r){D.screens[r].forEach(function(n){D.owner[n]=r})});
D.tourList=D.tours.map(function(t){return[t.title,t.steps.map(function(s){return[s.screen,s.text]})]});
var cur=null,tour=null,parked=null,hist=[],tt,doneSet={};
var $=function(i){return document.getElementById(i)};
var dev=$("dev"),stage=$("stage"),area=$("area");
try{doneSet=JSON.parse(sessionStorage.getItem("unacemDone")||"{}")}catch(e){}
function saveDone(){try{sessionStorage.setItem("unacemDone",JSON.stringify(doneSet))}catch(e){}}
function lab(el){return el.textContent.replace(/\s+/g," ").trim()}
function toast(m){var t=$("toast");t.textContent=m;t.classList.add("on");clearTimeout(tt);tt=setTimeout(function(){t.classList.remove("on")},2600)}
function roleLabel(r){for(var i=0;i<D.roles.length;i++)if(D.roles[i][0]===r)return D.roles[i][1]}
function steps(){return D.tourList[tour.t][1]}

/* Ajuste de tamaño: en celular el teléfono ocupa todo el ancho y se adapta al alto disponible */
function fit(){
  var adm=D.owner[cur]==="admin";
  var aw=area.clientWidth-24,ah=area.clientHeight-24;
  var narrow=area.clientWidth<600;
  var s;
  old=$("hint");if(old)old.remove();
  if(adm){
    dev.className="device adm";dev.style.transform="none";
    var w=1100,h=dev.offsetHeight;
    s=Math.max(.6,Math.min(1,aw/w));
    dev.style.transform="scale("+s+")";
    stage.style.width=Math.round(w*s)+"px";stage.style.height=Math.round(h*s)+"px";
    if(w*s>aw+1){var n=document.createElement("div");n.id="hint";n.className="note";n.textContent="Panel web · desliza para ver más";area.appendChild(n);}
    return;
  }
  if(narrow){
    s=Math.min(1.15,aw/390);
    var sh=Math.max(700,Math.min(844,Math.floor(ah/s)));
    dev.className="device ph narrow";dev.style.setProperty("--sh",sh+"px");
    dev.style.transform="scale("+s+")";
    stage.style.width=Math.round(390*s)+"px";stage.style.height=Math.round(sh*s)+"px";
  }else{
    dev.className="device ph";dev.style.setProperty("--sh","844px");dev.style.transform="none";
    var w2=dev.offsetWidth,h2=dev.offsetHeight;
    s=Math.min(1,aw/w2,ah/h2);
    dev.style.transform="scale("+s+")";
    stage.style.width=Math.round(w2*s)+"px";stage.style.height=Math.round(h2*s)+"px";
  }
}
var old;

function show(n,push){
  if(push&&cur)hist.push(cur);
  cur=n;
  var all=document.querySelectorAll(".scr");
  for(var i=0;i<all.length;i++)all[i].hidden=all[i].dataset.n!==n;
  var sc=$("s-"+n).querySelectorAll("*");
  for(var j=0;j<sc.length;j++)if(sc[j].scrollTop)sc[j].scrollTop=0;
  area.scrollTop=0;area.scrollLeft=0;
  $("done").hidden=true;
  paint();fit();nudge();
  try{history.replaceState(null,"","#"+(tour?"recorrido-"+(tour.t+1)+"-"+(tour.k+1):n.toLowerCase()))}catch(e){}
}

/* Resalta el botón que lleva al siguiente paso del recorrido */
function target(){
  if(!tour)return null;var st=steps();if(tour.k>=st.length-1)return null;
  var next=st[tour.k+1][0];if(next===cur)return null;
  var sec=$("s-"+cur);
  var g=sec.querySelector('[data-go="'+next+'"]');if(g)return g;
  var bs=sec.querySelectorAll("button"),rt=D.routes[cur]||{},tb=D.tabs[D.owner[cur]]||{};
  for(var i=0;i<bs.length;i++){
    var l=lab(bs[i]),inNav=bs[i].closest('[role="navigation"]');
    var r=inNav?tb[l]:rt[l];if(Array.isArray(r))r=r[0];
    if(r===next)return bs[i];
  }
  return null;
}
function nudge(){
  var o=document.querySelectorAll(".nudge");for(var i=0;i<o.length;i++)o[i].classList.remove("nudge");
  var t=target();if(t)t.classList.add("nudge");
}

function paint(){
  var chips=document.querySelectorAll("#roles button");
  for(var i=0;i<chips.length;i++)chips[i].setAttribute("aria-pressed",!tour&&chips[i].dataset.r===D.owner[cur]?"true":"false");
  var tb=document.querySelectorAll("#tours button");
  for(var k=0;k<tb.length;k++){
    var on=tour&&+tb[k].dataset.t===tour.t;
    if(on)tb[k].setAttribute("aria-current","true");else tb[k].removeAttribute("aria-current");
    tb[k].classList.toggle("ok",!!doneSet[tb[k].dataset.t]);
  }
  $("pill").textContent=roleLabel(D.owner[cur]);
  $("scrn").textContent=D.names[cur];
  var sg=$("segs"),p=$("bPrev"),x=$("bNext"),c=$("cap");
  if(tour){
    var st=steps(),last=tour.k===st.length-1;
    $("ttl").textContent=D.tourList[tour.t][0];
    $("cnt").textContent="Paso "+(tour.k+1)+" de "+st.length;
    if(sg.classList.contains("roles")){sg.classList.remove("roles");sg.innerHTML=""}
    if(sg.children.length!==st.length){
      sg.innerHTML="";
      st.forEach(function(_,i){var b=document.createElement("button");b.setAttribute("aria-label","Ir al paso "+(i+1));b.innerHTML="<i></i>";b.onclick=function(){goStep(i)};sg.appendChild(b)});
    }
    for(var q=0;q<sg.children.length;q++)sg.children[q].className=q<tour.k?"on":q===tour.k?"cur":"";
    c.textContent=st[tour.k][1];
    p.textContent="← Anterior";p.disabled=tour.k===0;p.onclick=function(){goStep(tour.k-1)};
    x.textContent=last?"Terminar ✓":"Siguiente →";x.disabled=false;x.onclick=last?finish:function(){goStep(tour.k+1)};
  }else{
    sg.innerHTML="";sg.classList.add("roles");
    D.roles.forEach(function(r){var b=document.createElement("button");b.className="rc";b.textContent=r[1];b.setAttribute("aria-pressed",r[0]===D.owner[cur]?"true":"false");b.onclick=function(){role(r[0])};sg.appendChild(b)});
    var cb=sg.querySelector('[aria-pressed="true"]');if(cb&&cb.scrollIntoView)cb.scrollIntoView({inline:"center",block:"nearest"});
    $("ttl").textContent=D.names[cur];$("cnt").textContent="";
    var n=D.screens[D.owner[cur]].length;
    c.innerHTML="Toca los botones y pestañas del teléfono para moverte."+(n>1?"<small>"+n+" pantallas en este rol.</small>":"");
    p.textContent="← Atrás";p.disabled=!hist.length;p.onclick=back;
    x.textContent="Cambiar de rol";x.onclick=picker;x.disabled=false;
  }
}

function goStep(k){
  var st=steps();if(k<0||k>=st.length)return;
  tour.k=k;show(st[k][0],false);
}
function startTour(t,k){
  closeMenu();parked=null;tour={t:t,k:k||0};hist=[];
  $("segs").innerHTML="";
  show(D.tourList[t][1][tour.k][0],false);
}
function role(r){closeMenu();$("done").hidden=true;if(tour)parked={t:tour.t,k:tour.k};tour=null;hist=[];show(D.start[r],false)}
function back(){if(!hist.length)return;var n=hist.pop();show(n,false)}
function go(n,msg){
  if(tour){
    var st=steps(),j=-1;
    for(var i=Math.max(0,tour.k-1);i<st.length;i++){if(st[i][0]===n){j=i;break}}
    if(j>=0)tour.k=j;else{parked={t:tour.t,k:tour.k};tour=null}
  }
  show(n,true);
  if(msg)toast(msg);
}
function finish(){
  doneSet[tour.t]=1;saveDone();paint();
  var t=tour.t,nxt=t+1<D.tourList.length?t+1:null;
  var d=$("done");
  d.innerHTML='<div class="done-card"><h2>¡Terminaste!</h2><p>Completaste «'+D.tourList[t][0]+'».</p></div>';
  var card=d.firstChild;
  function add(txt,cls,fn){var b=document.createElement("button");b.className="btn "+cls;b.textContent=txt;b.onclick=fn;card.appendChild(b)}
  if(nxt!==null)add("Siguiente recorrido: "+D.tourList[nxt][0],"pri",function(){startTour(nxt)});
  add("Elegir otro recorrido",nxt===null?"pri":"",function(){d.hidden=true;openMenu(true)});
  add("Explorar libremente por rol","ghost",function(){d.hidden=true;parked=null;tour=null;paint();openMenu(true)});
  add("Repetir este recorrido","ghost",function(){startTour(t)});
  d.hidden=false;
}
function picker(){
  var d=$("done");
  d.innerHTML='<div class="done-card"><h2>¿Quién eres?</h2><p>Elige un rol para ver la app como la vería esa persona.</p></div>';
  var card=d.firstChild;
  D.roles.forEach(function(r){var b=document.createElement("button");b.className="btn "+(r[0]==="nuevo"?"pri":"");b.textContent=r[1];b.onclick=function(){role(r[0])};card.appendChild(b)});
  var g=document.createElement("button");g.className="btn ghost";g.textContent="Prefiero un recorrido guiado";g.onclick=function(){d.hidden=true;startTour(0,0)};card.appendChild(g);
  d.hidden=false;
}
function openMenu(){$("menu").classList.add("open");$("bMenu").setAttribute("aria-expanded","true")}
function closeMenu(){$("menu").classList.remove("open");$("bMenu").setAttribute("aria-expanded","false")}

var SILENT={};D.silent.forEach(function(s){SILENT[s]=1});
function press(e){
  var t=e.target;
  var g=t.closest("[data-go]");
  if(g&&g.dataset.go){go(g.dataset.go);return}
  var b=t.closest("button");
  if(!b)return;
  var l=lab(b);
  if(b.getAttribute("aria-label")==="Volver"){if(hist.length)back();else toast("Esta es la primera pantalla de este recorrido.");return}
  if(b.closest('[role="navigation"]')){
    var tb=D.tabs[D.owner[cur]]||{};
    if(tb[l]){go(tb[l]);return}
    if(l==="Soporte"){toast("Soporte funciona igual para todos los roles. Míralo en Nuevo ingreso.");return}
    toast("Esta pestaña no está dibujada en el prototipo.");return;
  }
  if(cur==="AdminPremios"&&l==="Confirmar entrega"){b.textContent="Entregado";b.disabled=true;b.style.opacity=".6";toast("Entrega confirmada. El nuevo ingreso recibe un aviso.");return}
  var r=(D.routes[cur]||{})[l];
  if(r){
    if(Array.isArray(r)){go(r[0],r[1]);return}
    if(D.owner[r]){go(r);return}
    toast(r);return;
  }
  if(SILENT[l])return;
  toast("Acción de ejemplo: no avanza en este prototipo.");
}
function key(e){if(e.key==="Enter"||e.key===" "){var g=e.target.closest("[data-go]");if(g){e.preventDefault();go(g.dataset.go)}}}
function prefix(h,n){return h.replace(/ id="([^"]+)"/g,' id="'+n+'-$1"').replace(/ for="([^"]+)"/g,' for="'+n+'-$1"')}
function load(){
  var names=Object.keys(D.owner);
  $("ttl").textContent="Cargando pantallas…";
  return Promise.all(names.map(function(n){return fetch("screens/"+n+".html").then(function(r){if(!r.ok)throw new Error(n);return r.text()})})).then(function(list){
    var h="";
    list.forEach(function(t,i){var n=names[i];h+='<section class="scr '+(D.owner[n]==="admin"?"adm":"ph")+'" id="s-'+n+'" data-n="'+n+'" hidden>'+prefix(t,n)+"</section>"});
    dev.innerHTML=h;
  });
}
function init(){
  D.roles.forEach(function(r){var b=document.createElement("button");b.dataset.r=r[0];b.setAttribute("aria-pressed","false");b.textContent=r[1];b.onclick=function(){role(r[0])};$("roles").appendChild(b)});
  D.tourList.forEach(function(t,k){var li=document.createElement("li"),b=document.createElement("button");b.dataset.t=k;b.innerHTML='<span class="n"></span><span class="t"></span>';b.firstChild.textContent=k+1;b.lastChild.innerHTML="<span></span><small>"+t[1].length+" pantallas</small>";b.lastChild.firstChild.textContent=t[0];b.onclick=function(){startTour(k)};li.appendChild(b);$("tours").appendChild(li)});
  document.querySelectorAll(".scr.adm").forEach(function(sec){
    sec.querySelectorAll("div").forEach(function(d){
      if(d.children.length===0&&D.side[lab(d)]&&d.parentElement.children.length>=6){d.dataset.go=D.side[lab(d)];d.setAttribute("role","button");d.tabIndex=0}
    });
  });
  Object.keys(D.hot).forEach(function(n){
    D.hot[n].forEach(function(h){
      var sec=$("s-"+n),best=null;
      sec.querySelectorAll("div").forEach(function(d){
        var s=d.getAttribute("style")||"";
        if(s.indexOf("border-radius")>-1&&d.textContent.indexOf(h[0])>-1){if(!best||d.textContent.length<best.textContent.length)best=d}
      });
      if(best){best.dataset.go=h[1];best.classList.add("hot");best.setAttribute("role","button");best.tabIndex=0;best.setAttribute("aria-label",h[0]+": abrir detalle")}
    });
  });
  dev.addEventListener("click",press);dev.addEventListener("keydown",key);
  $("bMenu").onclick=openMenu;$("mClose").onclick=closeMenu;$("scrim").onclick=closeMenu;
  document.addEventListener("keydown",function(e){
    if(e.key==="Escape"){closeMenu();return}
    if(e.target.closest&&e.target.closest("input,textarea"))return;
    if(tour&&e.key==="ArrowRight"&&tour.k<steps().length-1)goStep(tour.k+1);
    if(tour&&e.key==="ArrowLeft"&&tour.k>0)goStep(tour.k-1);
  });
  window.addEventListener("resize",fit);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fit);
  var h=(location.hash||"").slice(1),m;
  if(m=h.match(/^recorrido-(\d+)(?:-(\d+))?$/)){
    var t=+m[1]-1,k=m[2]?+m[2]-1:0;
    if(D.tourList[t]&&D.tourList[t][1][k]){startTour(t,k);return}
  }
  if(m=h.match(/^rol-(\w+)$/)){if(D.start[m[1]]){role(m[1]);return}}
  var free=null;Object.keys(D.owner).forEach(function(n){if(n.toLowerCase()===h)free=n});
  if(free){show(free,false);return}
  role("nuevo");picker();
}
load().then(init).catch(function(e){$("ttl").textContent="No se pudieron cargar las pantallas ("+e.message+"). Ábrelo desde un servidor, no con doble clic."});
