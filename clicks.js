/* ---------- Game 2: Click speed (10 seconds) ---------- */
function clicks(box){
  let st='idle',n=0,t0,iv,lock=0;
  const pad=el('button','pad'),sh=shareBtn(),info=el('p','stats');
  const set=(s,a,b)=>{st=s;pad.className='pad '+s;pad.innerHTML='<b>'+a+'</b><span>'+(b||'')+'</span>'};
  const upd=()=>{const b=store.get('cps',0);info.textContent=b?'Your best: '+b+' clicks per second':''};
  set('idle','Click to start','You get 10 seconds. Click as fast as you can.');upd();
  const end=()=>{
    clearInterval(iv);
    const c=+(n/10).toFixed(1),b=store.get('cps',0);
    if(c>b)store.set('cps',c);
    lock=Date.now()+900;
    set('done',c+' clicks per second',n+' clicks in 10 seconds. Click to try again.');
    sh.show('I clicked '+c+' times per second. Beat that!');upd()
  };
  pad.onpointerdown=()=>{
    if(Date.now()<lock)return;
    if(st==='run'){n++;pad.querySelector('b').textContent=n;return}
    sh.hide();n=1;t0=performance.now();set('run',1,'10.0s left');
    iv=setInterval(()=>{
      const left=10-(performance.now()-t0)/1000;
      if(left<=0)end();else pad.querySelector('span').textContent=left.toFixed(1)+'s left'
    },100)
  };
  box.append(pad,info,sh.b);
  return()=>clearInterval(iv)
}


GAME_MOUNT.clicks=clicks;
