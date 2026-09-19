const $ = s => document.querySelector(s);

const opening = $("#opening");
const birthday = $("#birthday");
const openBtn = $("#openBtn");
const wishBtn = $("#wishBtn");
const wishMessage = $("#wishMessage");
const giftBtn = $("#giftBtn");
const giftMessage = $("#giftMessage");
const finalBtn = $("#finalBtn");
const finalMessage = $("#finalMessage");
const typedMessage = $("#typedMessage");
const musicBtn = $("#musicBtn");
const music = $("#music");
const egg = $("#egg");

const message = `Selamat ulang tahun, Bani! 🎂

Hari ini bukan cuma tentang bertambahnya usia,
tapi tentang bertambahnya cerita, pengalaman,
dan hal-hal indah yang akan datang.

Semoga di umur yang baru ini,
semakin banyak alasan untuk tersenyum,
semakin dekat dengan semua impian,
dan semakin banyak hal baik yang datang tanpa diduga.

Tetap jadi Bani yang unik,
tetap jadi diri sendiri,
dan jangan lupa bahagia. ❤️

Once again…

Happy Birthday, Bani! 🎉✨`;

const emojis = ["❤️","💖","💕","✨","🌟","🎈","🎉","🎂","🎁","🌸","🦋"];
let eggCount = 0;
let musicOn = false;

function createStars(){
  const layer = $("#stars");
  for(let i=0;i<90;i++){
    const s=document.createElement("i");
    s.className="star";
    s.style.left=Math.random()*100+"vw";
    s.style.top=Math.random()*100+"vh";
    s.style.setProperty("--d",(1+Math.random()*3)+"s");
    layer.appendChild(s);
  }
}
createStars();

function floatingEmoji(x = Math.random()*100){
  const e=document.createElement("div");
  e.className="floating-emoji";
  e.textContent=emojis[Math.floor(Math.random()*emojis.length)];
  e.style.left=x+"vw";
  e.style.setProperty("--x",(Math.random()*180-90)+"px");
  e.style.setProperty("--dur",(4+Math.random()*4)+"s");
  document.body.appendChild(e);
  setTimeout(()=>e.remove(),8500);
}
setInterval(()=>{ if(!birthday.classList.contains("hidden")) floatingEmoji(); },900);

function confetti(count=120){
  const layer=$("#confetti");
  for(let i=0;i<count;i++){
    const c=document.createElement("i");
    c.className="conf";
    c.style.left=Math.random()*100+"vw";
    c.style.setProperty("--x",(Math.random()*260-130)+"px");
    c.style.setProperty("--dur",(2.2+Math.random()*2.7)+"s");
    c.style.transform=`rotate(${Math.random()*360}deg)`;
    layer.appendChild(c);
    setTimeout(()=>c.remove(),5500);
  }
}

function typeText(text){
  typedMessage.textContent="";
  let i=0;
  const timer=setInterval(()=>{
    typedMessage.textContent += text[i++];
    if(i>=text.length) clearInterval(timer);
  },18);
}

openBtn.addEventListener("click",()=>{
  opening.classList.add("hidden");
  birthday.classList.remove("hidden");
  window.scrollTo({top:0,behavior:"smooth"});
  confetti(90);
  typeText(message);
});

wishBtn.addEventListener("click",()=>{
  document.querySelectorAll(".flame").forEach(f=>f.style.display="none");
  wishMessage.classList.remove("hidden");
  wishBtn.textContent="✨ Wish Sent!";
  wishBtn.disabled=true;
  confetti(80);
});

giftBtn.addEventListener("click",()=>{
  giftBtn.textContent="✨";
  giftBtn.style.animation="pop .5s ease";
  giftMessage.classList.remove("hidden");
  confetti(100);
});

finalBtn.addEventListener("click",()=>{
  finalMessage.classList.remove("hidden");
  finalBtn.classList.add("hidden");
  confetti(220);
  window.setTimeout(()=>confetti(120),1200);
});

document.addEventListener("click",(e)=>{
  if(e.target.closest("button")) return;
  for(let i=0;i<2;i++){
    const x=(e.clientX/window.innerWidth)*100;
    const em=document.createElement("div");
    em.className="floating-emoji";
    em.textContent=Math.random()>.5?"❤️":"✨";
    em.style.left=x+"vw";
    em.style.bottom=(window.innerHeight-e.clientY)+"px";
    em.style.setProperty("--x",(Math.random()*100-50)+"px");
    em.style.setProperty("--dur","1.8s");
    document.body.appendChild(em);
    setTimeout(()=>em.remove(),2000);
  }
});

musicBtn.addEventListener("click",()=>{
  if(!music.src){
    musicBtn.textContent="🎵 Add music";
    return;
  }
  if(musicOn){ music.pause(); musicOn=false; musicBtn.textContent="🎵 OFF"; }
  else { music.play().then(()=>{musicOn=true;musicBtn.textContent="🎵 ON"}).catch(()=>{}); }
});

egg.addEventListener("click",()=>{
  eggCount++;
  if(eggCount>=5){
    alert("HAHA! You actually found the secret 😂❤️");
    confetti(70);
    eggCount=0;
  }
});
