const loader=document.getElementById('pageLoader');
window.addEventListener('load',()=>setTimeout(()=>loader.classList.add('done'),280));
const toggle=document.getElementById('menuToggle'),mobileNav=document.getElementById('mobileNav');
function closeMenu(){toggle.setAttribute('aria-expanded','false');mobileNav.classList.remove('open');document.body.classList.remove('menu-open')}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));mobileNav.classList.toggle('open',open);document.body.classList.toggle('menu-open',open)});
mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
const filters=document.querySelectorAll('.filter'),cards=document.querySelectorAll('.project-card');
filters.forEach(button=>button.addEventListener('click',()=>{filters.forEach(b=>b.classList.toggle('active',b===button));const f=button.dataset.filter;cards.forEach(card=>{card.hidden=f!=='all'&&card.dataset.category!==f})}));
const cursor=document.getElementById('cursorDot');
if(matchMedia('(pointer:fine)').matches){document.addEventListener('mousemove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px';cursor.style.opacity='1'});document.querySelectorAll('a,button').forEach(el=>{el.addEventListener('mouseenter',()=>cursor.classList.add('active'));el.addEventListener('mouseleave',()=>cursor.classList.remove('active'))})}
const form=document.getElementById('contactForm'),message=document.getElementById('formMessage');
form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);const subject=encodeURIComponent('Portfolio enquiry — '+data.get('projectType'));const body=encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nCompany: ${data.get('company')||'Not provided'}\nProject type: ${data.get('projectType')}\nBudget: ${data.get('budget')||'To discuss'}\nTimeline: ${data.get('timeline')||'Not specified'}\n\nProject brief:\n${data.get('brief')}`);message.textContent='Your email app will open with the enquiry prepared. This starter form does not save data to a database.';window.location.href=`mailto:sathishkumardb1999@gmail.com?subject=${subject}&body=${body}`});


// Cinematic 3D portrait: subtle mouse-follow tilt on desktop, disabled for touch/reduced motion.
const motionCard=document.querySelector('.hero-visual');
const motionPhoto=document.querySelector('.portrait-frame img');
const motionReduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(motionCard && motionPhoto && matchMedia('(pointer:fine)').matches && !motionReduced){
  motionCard.addEventListener('pointermove',e=>{
    const r=motionCard.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    motionCard.style.transform=`perspective(1100px) rotateY(${x*7}deg) rotateX(${-y*6}deg) translateZ(0)`;
    motionPhoto.style.transform=`translate3d(${x*-10}px,${y*-8}px,28px) scale(1.035)`;
  });
  motionCard.addEventListener('pointerleave',()=>{
    motionCard.style.transform='perspective(1100px) rotateY(0deg) rotateX(0deg)';
    motionPhoto.style.transform='translate3d(0,0,28px) scale(1)';
  });
}
