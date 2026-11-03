/* Lógica del prototipo: carga screens/*.html, navegación por rol, recorridos y avisos. Datos en js/data.js */
var D=window.PROTO;
D.owner={};Object.keys(D.screens).forEach(function(r){D.screens[r].forEach(function(n){D.owner[n]=r})});
D.tourList=D.tours.map(function(t){return[t.title,t.steps.map(function(s){return[s.screen,s.text]})]});
var cur=null,tour=null,hist=[],tt;
var $=function(i){return document.getElementById(i)};
var dev=$("dev"),stage=$("stage");
function lab(el){return el.textContent.replace(/\s+/g," ").trim()}
function toast(m){var t=$("toast");t.textContent=m;t.classList.add("on");clearTimeout(tt);tt=setTimeout(function(){t.classList.remove("on")},2600)}
function roleLabel(r){for(var i=0;i<D.roles.length;i++)if(D.roles[i][0]===r)return D.roles[i][1]}
function fit(){
  var adm=D.owner[cur]==="admin";
  dev.className="device "+(adm?"adm":"ph");
  dev.style.transform="none";
  var w=dev.offsetWidth,h=dev.offsetHeight;
  var availW=stage.parentElement.clientWidth||w;
  var availH=Math.max(460,window.innerHeight-280);
  var s=Math.min(1,availW/w,availH/h);
  dev.style.transform="scale("+s+")";
  stage.style.width=Math.floor(w*s)+"px";stage.style.height=Math.floor(h*s)+"px";
}
function show(n,push){
  if(push&&cur)hist.push(cur);
  cur=n;
  var all=document.querySelectorAll(".scr");
  for(var i=0;i<all.length;i++)all[i].hidden=all[i].dataset.n!==n;
  var sec=$("s-"+n);var sc=sec.querySelectorAll("*");
  for(var j=0;j<sc.length;j++)if(sc[j].scrollTop)sc[j].scrollTop=0;
  $("cTitle").textContent=D.names[n];
  $("cRole").textContent=roleLabel(D.owner[n]);
  paint();fit();
  try{history.replaceState(null,"","#"+n.toLowerCase())}catch(e){}
}
function paint(){
  var rb=document.querySelectorAll("#roles button");
  for(var i=0;i<rb.length;i++)rb[i].setAttribute("aria-pressed",rb[i].dataset.r===D.owner[cur]?"true":"false");
  var tb=document.querySelectorAll("#tours button");
  for(var k=0;k<tb.length;k++)tb[k].setAttribute("aria-pressed",tour&&+tb[k].dataset.t===tour.t?"true":"false");
  $("bBack").disabled=!hist.length;
  var c=$("cap"),p=$("bPrev"),x=$("bNext"),st=$("stepTxt");
  if(tour){
    var steps=D.tourList[tour.t][1];
    c.textContent=steps[tour.k][1];
    p.hidden=false;x.hidden=false;p.disabled=tour.k===0;x.disabled=tour.k===steps.length-1;
    st.textContent=D.tourList[tour.t][0]+" · paso "+(tour.k+1)+" de "+steps.length;
  }else{
    c.textContent="Toca los botones y las pestañas del teléfono, o elige un recorrido a la izquierda.";
    p.hidden=true;x.hidden=true;st.textContent="";
  }
}
function go(n,msg){
  var j=-1;
  if(tour){var steps=D.tourList[tour.t][1];
    for(var i=Math.max(0,tour.k-1);i<steps.length;i++){if(steps[i][0]===n){j=i;break}}
    if(j>=0)tour.k=j;else tour=null}
  show(n,true);
  if(msg)toast(msg);
}
function startTour(t){tour={t:t,k:0};hist=[];show(D.tourList[t][1][0][0],false)}
function role(r){tour=null;hist=[];show(D.start[r],false)}
function back(){if(!hist.length)return;var n=hist.pop();tour=null;show(n,false)}
function tourStep(d){if(!tour)return;var steps=D.tourList[tour.t][1];var k=tour.k+d;if(k<0||k>=steps.length)return;tour.k=k;show(steps[k][0],false)}
var SILENT={};D.silent.forEach(function(s){SILENT[s]=1});
function press(e){
  var t=e.target;
  var g=t.closest("[data-go]");
  if(g&&g.dataset.go){go(g.dataset.go);return}
  var b=t.closest("button");
  if(!b)return;
  var l=lab(b);
  if(b.getAttribute("aria-label")==="Volver"){back();return}
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
  $("cTitle").textContent="Cargando pantallas…";
  return Promise.all(names.map(function(n){return fetch("screens/"+n+".html").then(function(r){if(!r.ok)throw new Error(n);return r.text()})})).then(function(list){
    var h="";
    list.forEach(function(t,i){var n=names[i];h+='<section class="scr '+(D.owner[n]==="admin"?"adm":"ph")+'" id="s-'+n+'" data-n="'+n+'" hidden>'+prefix(t,n)+"</section>"});
    dev.innerHTML=h;
  });
}
function init(){
  var R=$("roles"),i;
  D.roles.forEach(function(r){var li=document.createElement("li"),b=document.createElement("button");b.dataset.r=r[0];b.setAttribute("aria-pressed","false");b.textContent=r[1];b.onclick=function(){role(r[0])};li.appendChild(b);R.appendChild(li)});
  var T=$("tours");
  D.tourList.forEach(function(t,k){var li=document.createElement("li"),b=document.createElement("button");b.dataset.t=k;b.setAttribute("aria-pressed","false");b.innerHTML="<span></span><small>"+t[1].length+" pantallas</small>";b.firstChild.textContent=t[0];b.onclick=function(){startTour(k)};li.appendChild(b);T.appendChild(li)});
  var adm=document.querySelectorAll(".scr.adm");
  adm.forEach(function(sec){
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
  $("bBack").onclick=back;$("bPrev").onclick=function(){tourStep(-1)};$("bNext").onclick=function(){tourStep(1)};
  document.addEventListener("keydown",function(e){if(e.target.closest&&e.target.closest("input,textarea"))return;if(e.key==="ArrowRight")tourStep(1);if(e.key==="ArrowLeft")tourStep(-1)});
  window.addEventListener("resize",fit);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fit);
  var h=(location.hash||"").slice(1),start=D.start.nuevo;
  Object.keys(D.owner).forEach(function(n){if(n.toLowerCase()===h)start=n});
  show(start,false);
}
load().then(init).catch(function(e){$("cTitle").textContent="No se pudieron cargar las pantallas ("+e.message+"). Abre el prototipo desde un servidor, no con doble clic."});
