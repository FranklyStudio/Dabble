(function(){
  const id=document.body.dataset.game;
  const g=GAMES.find(x=>x.id===id);
  GAME_MOUNT[id]($('#stage'));
  $('#more').innerHTML=GAMES.filter(x=>x!==g).map(x=>'<a href="'+x.id+'.html">'+x.icon+' '+x.title+'</a>').join('');
})();
