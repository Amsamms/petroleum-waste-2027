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

document.addEventListener("DOMContentLoaded", function(){
  buildCards();
  setupFilter();
  setupReveal();
  setupProgress();
});
