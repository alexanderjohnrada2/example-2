/* ===== EDIT THIS: path to your logo photo ===== */
const LOGO_SRC = "images/logo.png";
/* ============================================== */

/* ---------- Data ---------- */
const COURSES=[
 {n:"Mathematics in Modern World",c:"GEED 104",t:"Professor",p:"Olivia Claire Mitchell"},
 {n:"Chemistry for Engineering",c:"CHEM 015",t:"Engr.",p:"Gabriel Lorenzo Santos"},
 {n:"Computer Engineering as a Discipline",c:"CMPE 101",t:"Engr.",p:"Valentina Grace Mendoza"},
 {n:"Programming Logic and Design",c:"CMPE 102",t:"Engr.",p:"Julian Sebastian Rivera"},
 {n:"Civic Welfare Training Service 1",c:"CWTS 001",t:"Professor",p:"Natalia Elise Castillo"},
 {n:"Understanding the Self",c:"GEED 001",t:"Professor",p:"Alessia Camille Romano"},
 {n:"Physical Activity Towards Health and Fitness",c:"PATHFIT 1",t:"Professor",p:"Theodore William Carter"},
 {n:"Calculus 1",c:"MATH 101",t:"Professor",p:"Alexander James Villanueva"},
 {n:"Science, Technology and Society",c:"GEED 007",t:"Professor",p:"Elijah Dominic Flores"}
];
const SCHED=[["Mon","7:00–10:00","CMPE 102","Lab 2"],["Mon","1:00–4:00","MATH 101","Rm 304"],["Tue","8:00–11:00","CHEM 015","Chem Lab"],
 ["Wed","9:00–12:00","CMPE 101","Rm 210"],["Thu","10:00–1:00","GEED 104","Rm 118"],["Fri","1:00–3:00","GEED 001","Rm 105"],["Sat","8:00–10:00","PATHFIT 1","Gym"]];
const NAVS=["Home","Schedule","Grade","Enrollment","HDF"];
const SIDE=[["Home","🏠"],["Messages","✉️"],["Attendance","✅"],["Grades","📝"],["Calendar","📅"],["Schedule","🗓️"],["PUP Map","📍"],["Enrollment","📋"],["HDF","💓"],["PUP Handbook","📖"],["Settings","⚙️"]];
const COLORS=["#c0533a","#6b7a8f","#b07d4f","#8a5a44","#7d7d7d","#c28a3a","#a05a2c","#3b6b8f","#6b8f3b"];
const MAP={Grades:"Grade"};

/* ---------- Helpers ---------- */
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];

/* Drawn seal, used only if your logo photo is missing */
const SEAL=`<svg class="seal" viewBox="0 0 200 200" role="img" aria-label="Polytechnic University of the Philippines seal">
<defs><path id="arc" d="M30 100a70 70 0 0 1 140 0"/></defs>
<circle cx="100" cy="100" r="74" fill="#7a0a0a"/>
<polygon points="100,34 114,84 168,84 124,114 140,164 100,134 60,164 76,114 32,84 86,84" fill="#f6e600"/>
<circle cx="100" cy="100" r="30" fill="none" stroke="#fff" stroke-width="2"/><circle cx="100" cy="100" r="20" fill="none" stroke="#fff" stroke-width="2"/><circle cx="100" cy="100" r="10" fill="none" stroke="#fff" stroke-width="2"/>
<text font-family="serif" font-size="13" fill="#fff" letter-spacing="1"><textPath href="#arc" startOffset="2%">POLYTECHNIC UNIVERSITY OF THE PHILIPPINES</textPath></text>
<text x="100" y="188" text-anchor="middle" font-family="serif" font-size="14" fill="#fff">Manila 1904</text></svg>`;

/* Logo image: shows your photo, or the drawn seal if the file isn't found */
function logoFallback(img){img.onerror=null;img.outerHTML=SEAL}
function logoImg(){return `<img class="seal" src="${LOGO_SRC}" alt="PUP logo" onerror="logoFallback(this)">`}

function show(id){$$(".screen").forEach(s=>s.classList.remove("on"));$("#"+id).classList.add("on")}

/* ---------- Intro flow ---------- */
$("#sealBig").innerHTML=logoImg();
$$(".sealSlot").forEach(e=>e.innerHTML=logoImg());
setTimeout(()=>show("title"),2200);
setTimeout(()=>{if($("#title").classList.contains("on"))show("roles")},4200);
$("#title").onclick=()=>show("roles");

let role="Student";
$$("[data-role]").forEach(b=>b.onclick=()=>{role=b.dataset.role;$("#signAs").textContent="You are signing in as "+role;$("#err").textContent="";show("login")});
$("#back").onclick=()=>show("roles");
$("#forgot").onclick=()=>{$("#err").textContent="Password reset: please visit the registrar’s office or contact your administrator."};
$("#signin").onclick=signIn;
$("#pw").addEventListener("keydown",e=>{if(e.key==="Enter")signIn()});
function signIn(){
 const id=$("#idn").value.trim(),pw=$("#pw").value;
 if(!id||!pw){$("#err").textContent="Enter your ID number and password.";return}
 // Demo only: accepts any credentials. Replace with a real server check.
 $("#err").textContent="";startPortal();
}

/* ---------- Portal ---------- */
let page="Home";
function startPortal(){
 $("#side").innerHTML=logoImg()+SIDE.map(([n,i])=>`<button data-p="${n}"><span>${i}</span>${n}</button>`).join("");
 $("#nav").innerHTML=NAVS.map(n=>`<button data-n="${n}">${n}</button>`).join("");
 $("#side").onclick=e=>{const b=e.target.closest("button");if(b)go(MAP[b.dataset.p]||b.dataset.p)};
 $("#nav").onclick=e=>{const b=e.target.closest("button");if(b)go(b.dataset.n)};
 $("#burger").onclick=()=>$("#side").classList.toggle("open");
 $("#avatar").onclick=()=>{if(confirm("Sign out?")){$("#pw").value="";show("roles")}};
 show("portal");go("Home");
}
function go(p){
    page=p;
    $("#portal").classList.toggle("home",p==="Home");
 $$("#nav button").forEach(b=>b.classList.toggle("act",b.dataset.n===p));
 $$("#side button").forEach(b=>b.classList.toggle("act",(MAP[b.dataset.p]||b.dataset.p)===p));
 if(innerWidth<=820)$("#side").classList.remove("open");
 const v=$("#view");
 if(p==="Home"){
  v.innerHTML=`<div class="welcome"><small>Welcome ${role==="Student"?"Sinta":role}</small><h1>Dela Cruz, Juan!</h1></div>
  <div class="grid">${COURSES.map((c,i)=>`<article class="course" tabindex="0" data-i="${i}">
   <div class="hd"><h3>${c.n}</h3><span class="code">${c.c}</span></div>
   <div class="av" style="background:${COLORS[i]}">${c.p.split(" ").map(w=>w[0]).slice(0,2).join("")}</div>
   <div class="ft"><small>${c.t}</small><span>${c.p}</span></div></article>`).join("")}</div>`;
  $$(".course").forEach(el=>{const open=()=>alert(COURSES[el.dataset.i].n+" ("+COURSES[el.dataset.i].c+")\nInstructor: "+COURSES[el.dataset.i].p);
   el.onclick=open;el.onkeydown=e=>{if(e.key==="Enter")open()}});
 }else if(p==="Schedule"){
  v.innerHTML=`<div class="panel"><h2>Class schedule</h2><table><tr><th>Day</th><th>Time</th><th>Subject</th><th>Room</th></tr>${SCHED.map(r=>`<tr>${r.map(x=>`<td>${x}</td>`).join("")}</tr>`).join("")}</table></div>`;
 }else if(p==="Grade"){
  v.innerHTML=`<div class="panel"><h2>Grades</h2><table><tr><th>Code</th><th>Subject</th><th>Grade</th></tr>${COURSES.map(c=>`<tr><td>${c.c}</td><td>${c.n}</td><td>Pending</td></tr>`).join("")}</table></div>`;
 }else if(p==="Enrollment"){
  v.innerHTML=`<div class="panel"><h2>Enrollment</h2><form class="form" id="enr" onsubmit="return false">
  <label>Program<select><option>BS Computer Engineering</option><option>BS Information Technology</option></select></label>
  <label>Year level<select><option>1st year</option><option>2nd year</option><option>3rd year</option><option>4th year</option></select></label>
  <label>Semester<select><option>1st semester</option><option>2nd semester</option></select></label>
  <button class="btn" id="enrBtn">Submit enrollment</button><div class="ok" id="enrOk"></div></form></div>`;
  $("#enrBtn").onclick=()=>$("#enrOk").textContent="Enrollment submitted.";
 }else if(p==="HDF"){
  v.innerHTML=`<div class="panel"><h2>Health declaration form</h2><form class="form" onsubmit="return false">
  <label>Temperature (°C)<input type="number" step="0.1" id="tmp" placeholder="36.5"></label>
  ${["Fever","Cough or colds","Sore throat","Difficulty breathing"].map(s=>`<label style="display:flex;gap:8px;align-items:center"><input type="checkbox"> ${s}</label>`).join("")}
  <button class="btn" id="hdfBtn">Submit declaration</button><div class="ok" id="hdfOk"></div></form></div>`;
  $("#hdfBtn").onclick=()=>$("#hdfOk").textContent="Declaration recorded for "+new Date().toLocaleDateString()+".";
 }else{
  v.innerHTML=`<div class="panel"><h2>${p}</h2><p>This section is ready to be built out. Add its content in the <code>go()</code> function.</p></div>`;
 }
}