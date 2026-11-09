/* ---------- Game 1: Reaction time ---------- */
function reaction(box){
  let st='idle',tm,t0;
  const pad=el('button','pad'),sh=shareBtn(),info=el('p','stats');
  const set=(s,a,b)=>{st=s;pad.className='pad '+s;pad.innerHTML='<b>'+a+'</b><span>'+(b||'')+'</span>'};
  const upd=()=>{const b=store.get('rt',0);info.textContent=b?'Your best: '+b+' ms':''};
  set('idle','Click to start','When the box turns green, click as fast as you can.');upd();
  pad.onpointerdown=()=>{
    if(st==='wait'){clearTimeout(tm);set('early','Too soon!','Click to try again.');return}
    if(st==='go'){
      const ms=Math.round(performance.now()-t0),b=store.get('rt',0);
      if(!b||ms<b)store.set('rt',ms);
      set('done',ms+' ms','Click to try again.');
      sh.show('My reaction time is '+ms+' ms. Think you’re faster?');upd();return
    }
    sh.hide();set('wait','Wait for green…');
    tm=setTimeout(()=>{set('go','Click!');t0=performance.now()},1200+Math.random()*3200)
  };
  box.append(pad,info,sh.b);
  return()=>clearTimeout(tm)
}


GAME_MOUNT.reaction=reaction;
