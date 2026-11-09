/* ---------- Game 3: Number memory ---------- */
function memory(box){
  let lvl=1,num='',tm;
  const w=el('div','mem'),sh=shareBtn(),info=el('p','stats');
  const upd=()=>{const b=store.get('mem',0);info.textContent=b?'Your best: '+b+' digits':''};
  const intro=()=>{
    w.innerHTML='<b>Remember the number</b><span>A number flashes on screen. Memorize it, then type it back. It gets one digit longer each round.</span><button class="btn">Start</button>';
    w.querySelector('button').onclick=()=>{lvl=1;sh.hide();round()}
  };
  const round=()=>{
    num=String(1+Math.floor(Math.random()*9));
    for(let i=1;i<lvl;i++)num+=Math.floor(Math.random()*10);
    const ms=1200+lvl*600;
    w.innerHTML='<span>Level '+lvl+'</span><div class="big">'+num+'</div><div class="bar"><i style="transition-duration:'+ms+'ms"></i></div>';
    const i=w.querySelector('i');
    requestAnimationFrame(()=>requestAnimationFrame(()=>i.style.width='0'));
    tm=setTimeout(ask,ms)
  };
  const ask=()=>{
    w.innerHTML='<span>What was the number?</span><input inputmode="numeric" autocomplete="off" aria-label="Your answer"><button class="btn">Submit</button>';
    const inp=w.querySelector('input');
    const go=()=>{const a=inp.value.replace(/\D/g,'');a===num?(lvl++,round()):over(a)};
    w.querySelector('button').onclick=go;
    inp.onkeydown=e=>{if(e.key==='Enter')go()};
    inp.focus()
  };
  const over=a=>{
    const s=lvl-1,b=store.get('mem',0);
    if(s>b)store.set('mem',s);upd();
    w.innerHTML='<b>'+s+' digit'+(s===1?'':'s')+'</b><span>The number was '+num+(a?'. You typed '+a:'')+'.</span><button class="btn">Try again</button>';
    w.querySelector('button').onclick=()=>{lvl=1;sh.hide();round()};
    sh.show('I remembered a '+s+'-digit number. How many can you?')
  };
  intro();upd();box.append(w,info,sh.b);
  return()=>clearTimeout(tm)
}


GAME_MOUNT.memory=memory;
