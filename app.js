// ---- 16 waste streams ----
// family: metals | adsorbents | oil | other
// route: pay | reclaim | both
var STREAMS = [
  {n:1, fam:"metals", family:"Catalyst metals", name:"Spent hydroprocessing catalyst",
   route:"Recover molybdenum, vanadium, nickel and cobalt by oxidative roasting plus leaching, or regenerate and return to service near fresh activity.",
   type:"both", label:"Pay-us-recoverer or reclaim on site"},
  {n:2, fam:"metals", family:"Catalyst metals", name:"Spent hydrocracking catalyst",
   route:"Nickel-molybdenum and nickel-tungsten grades, some noble metal. Best candidate to regenerate, or recover nickel, tungsten, platinum and palladium.",
   type:"both", label:"Pay-us-recoverer or reclaim on site"},
  {n:3, fam:"metals", family:"Catalyst metals", name:"Spent FCC equilibrium catalyst",
   route:"Reuse as a cement pozzolan. Structurally minor in Egypt today, future facing.",
   type:"pay", label:"Pay-us-recoverer"},
  {n:4, fam:"metals", family:"Catalyst metals", name:"Spent reforming catalyst",
   route:"Platinum-rhenium on alumina. Precious-metal recovery at high payable rates. The highest value per tonne of all streams.",
   type:"pay", label:"Pay-us-recoverer"},
  {n:5, fam:"metals", family:"Catalyst metals", name:"Spent ammonia and gas-treating catalysts",
   route:"Nickel, copper-zinc and zinc-oxide guard charges. Recover nickel, copper and zinc, and time the change-out with the turnaround.",
   type:"pay", label:"Pay-us-recoverer"},
  {n:6, fam:"metals", family:"Catalyst metals", name:"Spent sulfur-recovery and tail-gas catalyst",
   route:"Claus alumina and titania. Screen and reuse, route alumina to cement raw meal, recover the cobalt-molybdenum tail-gas charge.",
   type:"both", label:"Pay-us-recoverer or reclaim on site"},
  {n:7, fam:"adsorbents", family:"Adsorbents, sieves, mercury", name:"Spent molecular sieves and adsorbents",
   route:"Thermal reactivation, then reuse.",
   type:"reclaim", label:"Reclaim on site"},
  {n:8, fam:"adsorbents", family:"Adsorbents, sieves, mercury", name:"Spent mercury guard beds",
   route:"From gas and LNG plants. Thermal retorting recovers liquid mercury, handled by a specialist recoverer abroad.",
   type:"pay", label:"Pay-us-recoverer"},
  {n:9, fam:"oil", family:"Oil-bearing", name:"Spent bleaching and treating clay",
   route:"From lube, wax, white-oil and used-oil lines. Solvent de-oiling plus thermal reactivation, or cement co-processing.",
   type:"reclaim", label:"Reclaim on site"},
  {n:10, fam:"oil", family:"Oil-bearing", name:"Oily sludge",
   route:"Crude tank-bottom sludge, separator and flotation float. Recover the crude oil by three-phase centrifugation or thermal desorption.",
   type:"reclaim", label:"Reclaim on site"},
  {n:11, fam:"other", family:"Other", name:"Spent caustic",
   route:"Sulfidic, naphthenic and cresylic. Wet-air oxidation or neutralization to sodium salts, and recover cresylic acid.",
   type:"reclaim", label:"Reclaim on site"},
  {n:12, fam:"other", family:"Other", name:"Petroleum coke",
   route:"Characterize and blend as kiln fuel, or calcine to premium anode and needle grade.",
   type:"pay", label:"Pay-us-recoverer"},
  {n:13, fam:"adsorbents", family:"Adsorbents, sieves, mercury", name:"Spent amine, glycol residue and carbon",
   route:"Reclaim the solvent and reactivate the activated carbon.",
   type:"reclaim", label:"Reclaim on site"},
  {n:14, fam:"oil", family:"Oil-bearing", name:"Used lube oil re-refining residue",
   route:"Switch from informal acid-clay processing to vacuum distillation plus hydrofinishing into base oil, displacing imports.",
   type:"reclaim", label:"Reclaim on site"},
  {n:15, fam:"oil", family:"Oil-bearing", name:"Wastewater biological sludge and carbon",
   route:"Dewater for a big tonnage cut, cement co-processing, and reactivate the granular carbon.",
   type:"reclaim", label:"Reclaim on site"},
  {n:16, fam:"other", family:"Other", name:"Turnaround miscellaneous solids",
   route:"Refractory, ceramic support balls, insulation and blasting debris. Leach-test and classify, downgrade clean refractory to ordinary landfill, recover usable material.",
   type:"both", label:"Pay-us-recoverer or reclaim on site"}
];

var FAM_COLOR = {
  metals:"#22d3a6",
  adsorbents:"#a78bfa",
  oil:"#0ea5e9",
  other:"#f5a623"
};

function tagClass(type){ return type === "pay" ? "pay" : type === "reclaim" ? "reclaim" : "both"; }

function buildCards(){
  var grid = document.getElementById("streamGrid");
  var html = "";
  for(var i=0;i<STREAMS.length;i++){
    var s = STREAMS[i];
    html += '<article class="stream-card" data-fam="'+s.fam+'" style="--fam-color:'+FAM_COLOR[s.fam]+'">'
      + '<div class="sc-top"><span class="sc-num">'+(s.n<10?"0":"")+s.n+'</span>'
      + '<span class="sc-fam">'+s.family+'</span></div>'
      + '<h3 class="sc-name">'+s.name+'</h3>'
      + '<p class="sc-route">'+s.route+'</p>'
      + '<span class="sc-tag '+tagClass(s.type)+'"><span class="dot"></span>'+s.label+'</span>'
      + '</article>';
  }
  grid.innerHTML = html;
}

function setupFilter(){
  var bar = document.getElementById("filterBar");
  bar.addEventListener("click", function(e){
    var btn = e.target.closest(".chip");
    if(!btn) return;
    var f = btn.getAttribute("data-filter");
    var chips = bar.querySelectorAll(".chip");
    for(var i=0;i<chips.length;i++) chips[i].classList.remove("active");
    btn.classList.add("active");
    var cards = document.querySelectorAll(".stream-card");
    for(var j=0;j<cards.length;j++){
      var show = (f === "all") || (cards[j].getAttribute("data-fam") === f);
      cards[j].classList.toggle("hide", !show);
    }
  });
}

function setupReveal(){
  var els = document.querySelectorAll(".reveal");
  if(!("IntersectionObserver" in window)){
    for(var i=0;i<els.length;i++) els[i].classList.add("in");
    return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); }
    });
  }, {threshold:.14, rootMargin:"0px 0px -8% 0px"});
  for(var k=0;k<els.length;k++) io.observe(els[k]);
}

function setupProgress(){
  var bar = document.getElementById("scrollProgress");
  function update(){
    var h = document.documentElement.scrollHeight - window.innerHeight;
    var pct = h > 0 ? (window.scrollY / h) * 100 : 0;
    bar.style.width = pct + "%";
  }
  window.addEventListener("scroll", update, {passive:true});
  update();
}

// ============================================================
//  SIMULATOR
// ============================================================
// Per-stream simulator data (keyed by stream number n).
// route: "pay" = Route 1 recoverer pays, "reclaim" = Route 2 reclaim on site,
//        "either" = both routes viable.
var SIM = {
  1:{contains:"molybdenum, vanadium, nickel, cobalt", route:"either", how:"roast and leach to recover the metals, or regenerate and return to service", hazard:"self-heating solids; hydrogen-sulphide and arsine on unloading"},
  2:{contains:"nickel, tungsten, platinum, palladium", route:"either", how:"regenerate for reuse, or recover the metals", hazard:"pyrophoric self-heating"},
  3:{contains:"alumina-silica fines", route:"reclaim", how:"reuse as a cement pozzolan", hazard:"fine dust"},
  4:{contains:"platinum, rhenium", route:"pay", how:"precious-metal recovery; the recoverer pays high rates", hazard:"chloride and handling dust"},
  5:{contains:"nickel, copper, zinc", route:"either", how:"recover the metals, or screen and reuse", hazard:"pyrophoric reduced metal; chromium-six dust"},
  6:{contains:"alumina, titania, cobalt-molybdenum", route:"either", how:"screen and reuse, route alumina to cement, recover the cobalt-molybdenum", hazard:"hydrogen-sulphide; dust"},
  7:{contains:"zeolite, alumina, silica", route:"reclaim", how:"thermal reactivation and reuse", hazard:"dust; trapped hydrocarbons"},
  8:{contains:"mercury", route:"pay", how:"thermal retorting recovers the mercury", hazard:"mercury vapour (lethal)"},
  9:{contains:"oil-soaked clay", route:"either", how:"solvent de-oiling and reactivation, or cement co-processing", hazard:"self-heating clay"},
  10:{contains:"crude oil, water, solids", route:"reclaim", how:"three-phase centrifuge or thermal desorption recovers the oil", hazard:"confined space; hydrogen-sulphide; benzene; pyrophoric iron sulphide"},
  11:{contains:"sodium salts, sulphides, cresylics", route:"either", how:"wet-air oxidation or neutralization to sodium salts; recover cresylic acid", hazard:"toxic gas on acidification"},
  12:{contains:"carbon, some vanadium and nickel", route:"pay", how:"blend as kiln fuel, or calcine to premium anode grade", hazard:"dust; explosion risk"},
  13:{contains:"amine, glycol, carbon", route:"either", how:"reclaim the solvent and reactivate the carbon", hazard:"pyrophoric iron sulphide; hydrogen-sulphide"},
  14:{contains:"base oil, acid tar", route:"reclaim", how:"vacuum distillation and hydrofinishing into base oil", hazard:"acid-tar handling"},
  15:{contains:"organics, water, carbon", route:"reclaim", how:"dewater, cement co-processing, reactivate the carbon", hazard:"biohazard; hydrogen-sulphide"},
  16:{contains:"ceramics, refractory, fibres", route:"reclaim", how:"classify, downgrade clean refractory, recover usable material", hazard:"asbestos and silica dust; pyrophoric support balls"}
};

function streamByN(n){ for(var i=0;i<STREAMS.length;i++){ if(STREAMS[i].n===n) return STREAMS[i]; } return null; }

function routeDecisionText(route){
  if(route==="pay") return "Route 1 - hand to a recoverer who pays";
  if(route==="reclaim") return "Route 2 - reclaim and reprocess on site";
  return "Either route - hand to a paying recoverer, or reclaim on site";
}
function routeShort(route){
  if(route==="pay") return "Route 1";
  if(route==="reclaim") return "Route 2";
  return "Either";
}

var simState = {
  running:false,
  timers:[],
  logged:{},      // n -> true (one row per stream, no duplicates)
  count:0
};

function prefersReduced(){
  return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function buildSimChips(){
  var wrap = document.getElementById("simChips");
  if(!wrap) return;
  var html = "";
  for(var i=0;i<STREAMS.length;i++){
    var s = STREAMS[i];
    html += '<button type="button" class="sim-chip" data-n="'+s.n+'" style="--fam-color:'+FAM_COLOR[s.fam]+'">'
      + '<span class="scn">'+(s.n<10?"0":"")+s.n+'</span>'+s.name+'</button>';
  }
  wrap.innerHTML = html;
  wrap.addEventListener("click", function(e){
    var btn = e.target.closest(".sim-chip");
    if(!btn) return;
    runStream(parseInt(btn.getAttribute("data-n"),10), btn);
  });
}

function clearSimTimers(){
  for(var i=0;i<simState.timers.length;i++) clearTimeout(simState.timers[i]);
  simState.timers = [];
}

function setRunningChip(btn){
  var chips = document.querySelectorAll(".sim-chip");
  for(var i=0;i<chips.length;i++) chips[i].classList.remove("running");
  if(btn) btn.classList.add("running");
}

function lightRoute(route){
  var r1 = document.getElementById("lightR1");
  var r2 = document.getElementById("lightR2");
  if(!r1||!r2) return;
  r1.classList.remove("lit"); r2.classList.remove("lit");
  if(route==="pay"||route==="either") r1.classList.add("lit");
  if(route==="reclaim"||route==="either") r2.classList.add("lit");
}

function makeLine(cls, html){
  var p = document.createElement("p");
  p.className = "cline " + (cls||"");
  p.innerHTML = html;
  return p;
}

function runStream(n, btn){
  var s = streamByN(n);
  var sim = SIM[n];
  if(!s||!sim) return;

  clearSimTimers();
  setRunningChip(btn);
  if(!btn){
    var chips = document.querySelectorAll('.sim-chip[data-n="'+n+'"]');
    if(chips.length) chips[0].classList.add("running");
  }

  var con = document.getElementById("console");
  con.innerHTML = "";

  var routeCls = sim.route==="pay" ? "r-pay" : sim.route==="reclaim" ? "r-reclaim" : "r-either";

  var lines = [
    {cls:"", html:'<span class="lead-in">&gt; </span>Stream identified: <span class="val">'+s.name+'</span> ('+s.family+')'},
    {cls:"", html:'<span class="lead-in">&gt; </span>Contains: <span class="val">'+sim.contains+'</span>'},
    {cls:"l-route "+routeCls, html:'<span class="lead-in">&gt; </span>Decision: '+routeDecisionText(sim.route)},
    {cls:"", html:'<span class="lead-in">&gt; </span>Recovery method: <span class="val">'+sim.how+'</span>'},
    {cls:"l-flag", html:'<span class="lead-in">&gt; </span>Safety flags: '+sim.hazard},
    {cls:"l-done", html:'<span class="lead-in">&gt; </span>Added to hazardous-waste register.'}
  ];

  lightRoute(sim.route);
  simState.running = true;

  if(prefersReduced()){
    for(var i=0;i<lines.length;i++){
      var el = makeLine(lines[i].cls, lines[i].html);
      el.classList.add("show");
      con.appendChild(el);
    }
    logToRegister(s, sim);
    simState.running = false;
    return;
  }

  var delay = 220;
  for(var k=0;k<lines.length;k++){
    (function(idx){
      var t = setTimeout(function(){
        var el = makeLine(lines[idx].cls, lines[idx].html);
        con.appendChild(el);
        // force reflow so transition fires
        void el.offsetWidth;
        el.classList.add("show");
        if(idx === lines.length-1){
          logToRegister(s, sim);
          simState.running = false;
        }
      }, delay*(idx+1));
      simState.timers.push(t);
    })(k);
  }
}

function logToRegister(s, sim){
  if(simState.logged[s.n]) return; // already logged, keep one row per stream
  simState.logged[s.n] = true;
  simState.count++;

  var body = document.getElementById("regBody");
  var empty = body.querySelector(".reg-empty");
  if(empty) body.removeChild(empty);

  var routeCls = sim.route==="pay" ? "reg-route-pay" : sim.route==="reclaim" ? "reg-route-reclaim" : "reg-route-either";

  var tr = document.createElement("tr");
  tr.className = "reg-row-new";
  tr.innerHTML =
      '<td>'+simState.count+'</td>'
    + '<td>'+s.name+'</td>'
    + '<td>'+sim.contains+'</td>'
    + '<td class="'+routeCls+'">'+routeShort(sim.route)+'</td>'
    + '<td>'+sim.how+'</td>'
    + '<td><span class="reg-status"><span class="dot"></span>Logged</span></td>';
  body.appendChild(tr);

  updateRegCount();
}

function updateRegCount(){
  var c = document.getElementById("regCount");
  if(c) c.textContent = simState.count + " of 16 streams logged";
}

function clearRegister(){
  simState.logged = {};
  simState.count = 0;
  var body = document.getElementById("regBody");
  body.innerHTML = '<tr class="reg-empty"><td colspan="6">No streams logged yet. Run a stream above to add the first row.</td></tr>';
  updateRegCount();
}

function setupRegisterClear(){
  var btn = document.getElementById("regClear");
  if(btn) btn.addEventListener("click", clearRegister);
}

// wire the existing grid cards to the simulator
function setupGridToSim(){
  var grid = document.getElementById("streamGrid");
  if(!grid) return;
  grid.addEventListener("click", function(e){
    var card = e.target.closest(".stream-card");
    if(!card) return;
    var idx = Array.prototype.indexOf.call(grid.children, card);
    // map DOM index back to stream number via the rendered order (STREAMS order)
    var s = STREAMS[idx];
    if(!s) return;
    var sim = document.getElementById("simulator");
    if(sim && sim.scrollIntoView) sim.scrollIntoView({behavior: prefersReduced() ? "auto" : "smooth", block:"start"});
    var btn = document.querySelector('.sim-chip[data-n="'+s.n+'"]');
    var run = function(){ runStream(s.n, btn); };
    if(prefersReduced()) run(); else setTimeout(run, 520);
  });
  // make cards look clickable
  var cards = grid.querySelectorAll(".stream-card");
  for(var i=0;i<cards.length;i++){ cards[i].style.cursor = "pointer"; }
}

// ============================================================
//  ANIMATED CIRCULAR FLOW LOOP (canvas)
// ============================================================
function setupFlowLoop(){
  var canvas = document.getElementById("flowCanvas");
  if(!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");
  var W = canvas.width, H = canvas.height;
  var cx = W*0.5, cy = H*0.46, rx = W*0.32, ry = H*0.30;

  var reduced = prefersReduced();

  // particles travel around the ellipse loop
  var N = 7;
  var parts = [];
  for(var i=0;i<N;i++){ parts.push({ang: (i/N)*Math.PI*2, speed: 0.012 + (i%3)*0.0015}); }

  function pointOn(ang){
    return { x: cx + Math.cos(ang)*rx, y: cy + Math.sin(ang)*ry };
  }

  // nodes: plant at left of loop, reuse at right of loop
  var plantAng = Math.PI;        // left
  var reuseAng = 0;              // right
  var plant = pointOn(plantAng);
  var reuse = pointOn(reuseAng);

  function drawNode(p, label, color){
    ctx.beginPath();
    ctx.arc(p.x, p.y, 17, 0, Math.PI*2);
    ctx.fillStyle = "#0f1a2e";
    ctx.fill();
    ctx.lineWidth = 2.4;
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.fillStyle = "#e8eef7";
    ctx.font = "600 12px -apple-system,Segoe UI,Roboto,sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(label, p.x, p.y + 36);
  }

  function frame(){
    ctx.clearRect(0,0,W,H);

    // loop track
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI*2);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(34,211,166,0.32)";
    ctx.stroke();

    // greyed, crossed-out landfill / kiln branch dropping from the bottom
    var bottom = pointOn(Math.PI*0.5);
    ctx.beginPath();
    ctx.setLineDash([6,6]);
    ctx.moveTo(bottom.x, bottom.y);
    ctx.lineTo(bottom.x, H-26);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(159,178,204,0.32)";
    ctx.stroke();
    ctx.setLineDash([]);
    // cross-out X on the branch
    var bx = bottom.x, by = (bottom.y + (H-26))/2;
    ctx.beginPath();
    ctx.moveTo(bx-9, by-9); ctx.lineTo(bx+9, by+9);
    ctx.moveTo(bx+9, by-9); ctx.lineTo(bx-9, by+9);
    ctx.lineWidth = 2.6;
    ctx.strokeStyle = "rgba(239,111,111,0.8)";
    ctx.stroke();
    ctx.fillStyle = "rgba(159,178,204,0.6)";
    ctx.font = "600 11px -apple-system,Segoe UI,Roboto,sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("landfill / kiln", bx, H-12);

    // particles
    for(var i=0;i<parts.length;i++){
      var p = parts[i];
      if(!reduced){ p.ang += p.speed; if(p.ang > Math.PI*2) p.ang -= Math.PI*2; }
      var pos = pointOn(p.ang);
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 4, 0, Math.PI*2);
      var g = ctx.createRadialGradient(pos.x,pos.y,0,pos.x,pos.y,6);
      g.addColorStop(0,"#22d3a6");
      g.addColorStop(1,"rgba(34,211,166,0)");
      ctx.fillStyle = g;
      ctx.fill();
    }

    // nodes on top
    drawNode(plant, "plant", "#0ea5e9");
    drawNode(reuse, "reuse", "#22d3a6");
  }

  var rafId = null, visible = false;
  function loop(){ if(visible){ frame(); rafId = requestAnimationFrame(loop); } }
  function start(){ if(!visible){ visible = true; loop(); } }
  function stop(){ visible = false; if(rafId){ cancelAnimationFrame(rafId); rafId = null; } }

  if(reduced){ frame(); return; } // single static draw, no animation

  // pause when off-screen
  if("IntersectionObserver" in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting) start(); else stop();
      });
    }, {threshold:0.05});
    io.observe(canvas);
  } else {
    start();
  }
}

document.addEventListener("DOMContentLoaded", function(){
  buildCards();
  setupFilter();
  setupReveal();
  setupProgress();
  buildSimChips();
  setupRegisterClear();
  setupGridToSim();
  setupFlowLoop();
});
