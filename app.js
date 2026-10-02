import {vocabulary,accepts,shuffle} from './vocabulary.js';
import {drawScene} from './scene.js';
const $=id=>document.getElementById(id);
import {drawAdventure} from './cave.js';
import {stageAt} from './phases.js';
let state=null, audio=null,sound=false,animation=null,wideView=false;
function beep(ok=true){if(!sound)return;try{audio??=new(window.AudioContext||window.webkitAudioContext)();audio.resume();const o=audio.createOscillator(),g=audio.createGain();o.connect(g);g.connect(audio.destination);o.frequency.value=ok?660:180;g.gain.setValueAtTime(.07,audio.currentTime);g.gain.exponentialRampToValueAtTime(.001,audio.currentTime+.2);o.start();o.stop(audio.currentTime+.2);}catch{}}
function show(id){for(const n of ['menu','game','end','arrival','caveMenu'])$(n).hidden=n!==id;window.scrollTo({top:0,behavior:'instant'});}
function stageInfo(){return stageAt(state.phase,state.index);}
function start(mode,phase='road'){
 cancelAnimationFrame(animation);$('screenFade').classList.remove('dark');
 const wrong=phase==='cave'&&state?.phase==='road'?state.wrong:new Map();
 state={mode,phase,lives:mode===3?7:5,index:0,words:shuffle(vocabulary),wrong,locked:false,travel:0,hit:0};
 show('game');$('world').hidden=phase==='cave';$('caveWorld').hidden=phase!=='cave';
 $('routeLabel').textContent=phase==='cave'?'Mağara keşfi · Hazine rotası':'Arazi rotası · Mağaraya yolculuk';
 $('modeLabel').textContent=(phase==='cave'?'MAĞARA · ':'')+(mode===3?'Türkçe → İngilizce · Şıksız':`İngilizce → Türkçe · ${mode===1?'Şıklı':'Şıksız'}`);
 renderQuestion();
}
function renderQuestion(){state.locked=false;const s=stageInfo(),word=state.words[state.index];$('lives').textContent='♥'.repeat(state.lives);$('lives').setAttribute('aria-label',`${state.lives} can`);$('progressText').textContent=`${state.index} / 45 kelime`;$('bar').style.width=`${state.index/45*100}%`;$('obstacleLabel').textContent=`BÖLÜM ${s.number} / 5 · ${s.name}`;$('task').textContent=s.title;$('instruction').textContent=s.task;$('sceneBadge').textContent=`${s.name} · ${s.done} / ${s.count}`;$('word').textContent=state.mode===3?word.tr:word.en;$('speak').hidden=state.mode===3;$('feedback').textContent='';$('feedback').className='';$('next').hidden=true;$('choices').replaceChildren();$('choices').hidden=state.mode!==1;$('answerForm').hidden=state.mode===1;$('answer').value='';$('answer').disabled=false;$('answerForm').querySelector('button').disabled=false;$('answerLabel').textContent=state.mode===3?'İngilizce karşılığını yaz':'Türkçe karşılığını yaz';$('answer').placeholder=state.mode===3?'English word…':'Türkçe anlamı…';
 if(state.mode===1){const options=shuffle([word,...shuffle(vocabulary.filter(w=>w.id!==word.id)).slice(0,2)]);options.forEach((w,i)=>{const b=document.createElement('button');b.textContent=`${'ABC'[i]}  ·  ${w.tr}`;b.onclick=()=>submit(w.id===word.id);$('choices').append(b);});}else $('answer').focus();draw();}
function draw(){if(!state)return;const params={obstacle:stageInfo().key,cleared:stageInfo().done+(state.locked?1:0),travel:state.travel,wide:wideView,hit:state.hit};if(state.phase==='cave')drawAdventure($('caveWorld'),params);else drawScene($('world'),params);}
function submit(correct){if(state.locked)return;const word=state.words[state.index];beep(correct);if(correct){state.locked=true;document.querySelector('.question').classList.remove('answer-glow');void document.querySelector('.question').offsetWidth;document.querySelector('.question').classList.add('answer-glow');$('feedback').className='good';$('feedback').textContent='Doğru! Yol biraz daha açıldı. ✦';$('next').hidden=false;for(const b of $('choices').children)b.disabled=true;$('answer').disabled=true;$('answerForm').querySelector('button').disabled=true;$('next').focus();draw();}else{state.lives--;state.hit++;draw();state.wrong.set(word.id,word);$('lives').textContent='♥'.repeat(state.lives);$('lives').setAttribute('aria-label',`${state.lives} can`);$('feedback').className='bad';$('feedback').textContent=`Bir can azaldı. Doğru cevap: ${state.mode===3?word.en:word.tr}. Tekrar dene.`;if(!state.lives){state.locked=true;finish(false);}}}
function next(){if(!state.locked)return;$('next').hidden=true;let begun=performance.now();function frame(t){state.travel=Math.min((t-begun)/750,1);draw();if(state.travel<1)animation=requestAnimationFrame(frame);else{state.travel=0;state.index++;if(state.index===45){if(state.phase==='road')enterCave();else finish(true);}else renderQuestion();}}animation=requestAnimationFrame(frame);}
function enterCave(){
 show('arrival');$('arrivalTitle').textContent='Mağarayı buldun!';$('arrivalText').textContent='Maceracı arabadan iniyor…';
 const begun=performance.now();
 function frame(t){const progress=(t-begun)/1000;drawAdventure($('arrivalCanvas'),{arrival:true,progress});
  $('arrivalText').textContent=progress<1.5?'Maceracı arabadan iniyor…':'Araba dışarıda kalıyor. Maceracı mağaraya yürüyor…';
  if(progress>5.6)$('screenFade').classList.add('dark');
  if(progress<6.4)animation=requestAnimationFrame(frame);else{show('caveMenu');$('screenFade').classList.remove('dark');document.querySelector('[data-cave-mode]').focus();}
 }animation=requestAnimationFrame(frame);
}
function finish(won){cancelAnimationFrame(animation);show('end');$('endScene').hidden=!won;$('victory').hidden=true;$('caveVictory').hidden=!won;if(won)drawAdventure($('caveVictory'),{treasure:true,obstacle:'caveRocks',cleared:9});$('endIcon').textContent=won?'🏆':'🧭';$('endTag').textContent=won?'GÖREV TAMAMLANDI':'YENİ BİR DENEME, YENİ BİR MACERA';$('endTitle').textContent=won?'Hazineyi buldun!':'Maceraya kısa bir mola.';$('endText').textContent=won?`Arazi ve mağara macerasını tamamladın, 90 soruyu çözdün! ${state.lives} canla hazineye ulaştın.`:`Canların bitti. ${state.phase==='cave'?'Mağarada':'Arazide'} ${state.index} / 45 kelimeyi çözdün. Öğrendiğin kelimelerle yeniden yola çıkabilirsin.`;$('review').replaceChildren();if(state.wrong.size){const details=document.createElement('details'),summary=document.createElement('summary'),ul=document.createElement('ul');summary.textContent=`Tekrar çalışabileceğin kelimeler (${state.wrong.size})`;for(const w of state.wrong.values()){const li=document.createElement('li');li.textContent=`${w.en} → ${w.tr}`;ul.append(li);}details.append(summary,ul);$('review').append(details);}}
function home(){cancelAnimationFrame(animation);$('screenFade').classList.remove('dark');state=null;show('menu');preview();}
function preview(){drawScene($('preview'),{preview:true,time:0});}
document.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>start(Number(b.dataset.mode)));$('home').onclick=home;$('endHome').onclick=home;$('retry').onclick=()=>start(state.mode,state.phase);$('next').onclick=next;$('answerForm').onsubmit=e=>{e.preventDefault();if($('answer').value.trim())submit(accepts($('answer').value,state.words[state.index],state.mode));};$('sound').onclick=()=>{sound=!sound;$('sound').textContent=sound?'♫ Ses kapat':'♫ Ses aç';$('sound').setAttribute('aria-pressed',String(sound));beep();};$('speak').onclick=()=>{if('speechSynthesis'in window){speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(state.words[state.index].en);utterance.lang='en-GB';utterance.rate=.8;speechSynthesis.speak(utterance);}};window.addEventListener('resize',()=>state?draw():preview());preview();

document.querySelectorAll('[data-cave-mode]').forEach(b=>b.onclick=()=>start(Number(b.dataset.caveMode),'cave'));$('caveHome').onclick=home;

$('cameraToggle').onclick=()=>{wideView=!wideView;$('cameraToggle').textContent=wideView?'Yakın kamera':'Geniş kamera';$('cameraToggle').setAttribute('aria-pressed',String(wideView));draw();};
