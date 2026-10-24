const tabs=[...document.querySelectorAll('[data-program]')];function activate(id){tabs.forEach(b=>{const selected=b.dataset.program===id;b.setAttribute('aria-selected',String(selected));b.tabIndex=selected?0:-1;document.querySelector('#panel-'+b.dataset.program).hidden=!selected})}tabs.forEach((b,i)=>{b.addEventListener('click',()=>activate(b.dataset.program));b.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const n=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;activate(tabs[n].dataset.program);tabs[n].focus()}})});document.querySelectorAll('[data-select]').forEach(a=>a.addEventListener('click',()=>activate(a.dataset.select)));const dialog=document.querySelector('#lightbox');document.querySelectorAll('[data-photo]').forEach(b=>b.addEventListener('click',()=>{dialog.querySelector('img').src=`space-${b.dataset.photo}.jpg`;dialog.querySelector('img').alt=b.querySelector('img').alt;dialog.showModal()}));dialog.querySelector('.close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
const checks=[...document.querySelectorAll('.check-item')];checks.forEach(b=>b.addEventListener('click',()=>b.setAttribute('aria-pressed',String(b.getAttribute('aria-pressed')!=='true'))));document.querySelector('.check-result').addEventListener('click',()=>{const selected=checks.filter(b=>b.getAttribute('aria-pressed')==='true').map(b=>b.querySelector('strong').textContent);document.querySelector('.check-answer').hidden=false;document.querySelector('.check-booking-actions').hidden=!selected.length;document.querySelector('.booking-hint').hidden=!selected.length;document.querySelector('#check-feedback').textContent=selected.length?'상담 때 “'+selected.join(', ')+'” 고민을 알려주세요. 현재 두피 상태를 함께 살펴보고 관리 방향을 안내해 드립니다.':'불편하게 느끼는 항목을 먼저 선택해 주세요.'});

const slidePhoto=document.querySelector('#program-slide'),slideToggle=document.querySelector('.slide-toggle');const slideIds=['31','58','71','07'];let slideIndex=0,slidePaused=matchMedia('(prefers-reduced-motion: reduce)').matches;function showProgramPhoto(){slidePhoto.src=`space-${slideIds[slideIndex]}.jpg`}slideToggle.textContent=slidePaused?'▷':'Ⅱ';slideToggle.addEventListener('click',()=>{slidePaused=!slidePaused;slideToggle.textContent=slidePaused?'▷':'Ⅱ';slideToggle.setAttribute('aria-label',slidePaused?'프로그램 사진 자동 전환 재생':'프로그램 사진 자동 전환 일시정지')});setInterval(()=>{if(!slidePaused&&!document.hidden&&slidePhoto.getBoundingClientRect().top<innerHeight&&slidePhoto.getBoundingClientRect().bottom>0){slideIndex=(slideIndex+1)%slideIds.length;showProgramPhoto()}},4000);tabs.forEach(b=>b.addEventListener('click',()=>{slideIndex=tabs.indexOf(b);showProgramPhoto()}));

// Track control usage only; never send scalp selections, health details or form content.
document.addEventListener('click',function(event){
 const el=event.target.closest('a,button,summary');
 if(!el||typeof window.fbq!=='function'||el.classList.contains('check-item'))return;
 const href=el.getAttribute('href')||'';
 let name='ButtonClick',label='other';
 if(href.startsWith('tel:')){name='PhoneCallClick';label='phone';}
 else if(href.includes('open.kakao.com')){name='KakaoConsultationClick';label='kakao';}
 else if(href.includes('pcmap.place.naver.com')&&href.includes('booking')){name='NaverBookingClick';label='naver_booking';}
 else if(href.includes('instagram.com')){name='InstagramClick';label='instagram';}
 else if(href.includes('map.naver.com')){name='MapClick';label='naver_map';}
 else if(el.classList.contains('check-result')){name='ConcernSummaryClick';label='concern_summary';}
 else if(el.classList.contains('program-tabs')||el.closest('.program-tabs')){name='ProgramTabClick';label=el.id||'program_tab';}
 else if(el.matches('.video-toggle,.slide-toggle')){name='MediaControlClick';label=el.classList.contains('video-toggle')?'hero_video':'program_slideshow';}
 else if(el.matches('summary')){name='FAQClick';label='faq';}
 else if(el.dataset.photo){name='GalleryClick';label='gallery';}
 else if(href.startsWith('#')){name='SectionLinkClick';label=href.slice(1)||'home';}
 const section=el.closest('section')?.id||(el.closest('.booking-bar')?'fixed_bar':el.closest('header')?'header':el.closest('footer')?'footer':'page');
 window.fbq('trackCustom',name,{button:label,section:section});
});

// Gentle entrance motion; content remains visible without JavaScript.
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
 const targets=document.querySelectorAll('.hero-copy > *, .hero-comment > *, .section-heading, .story-photo, .story-copy > *, .check-item, .principles article, .process-layout li, .program-layout, .gallery button, .faq-card');
 const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-revealed');revealObserver.unobserve(entry.target);}}),{threshold:0.08});
 targets.forEach((el,index)=>{el.classList.add('motion-reveal');el.style.setProperty('--reveal-delay',`${Math.min(index%3,2)*70}ms`);revealObserver.observe(el);});
}

// Fetch the profile video only near the viewport, preserving muted autoplay.
const deferredVideos=document.querySelectorAll('video source[data-src]');
const videoLoader=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){const video=entry.target;video.querySelectorAll('source[data-src]').forEach(source=>{source.src=source.dataset.src;source.removeAttribute('data-src')});video.load();video.play().catch(()=>{});videoLoader.unobserve(video)}}),{rootMargin:'250px'});
deferredVideos.forEach(source=>videoLoader.observe(source.parentElement));
