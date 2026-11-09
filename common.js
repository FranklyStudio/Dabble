window.GAME_MOUNT={};
const $=s=>document.querySelector(s);
const el=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e};
const store={
  get(k,d){try{const v=localStorage.getItem('dabble:'+k);return v===null?d:JSON.parse(v)}catch(e){return d}},
  set(k,v){try{localStorage.setItem('dabble:'+k,JSON.stringify(v))}catch(e){}}
};
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('on'),2200)}
function share(text){
  const msg=text+' '+location.href.split('#')[0];
  if(navigator.share){navigator.share({text:msg}).catch(()=>{})}
  else if(navigator.clipboard){navigator.clipboard.writeText(msg).then(()=>toast('Copied. Paste it anywhere.'),()=>toast(msg))}
  else toast(msg)
}
function shareBtn(){
  const b=el('button','btn alt','Share my score');b.hidden=true;let t='';
  b.onclick=()=>share(t);
  return{b,show(x){t=x;b.hidden=false},hide(){b.hidden=true}}
}
