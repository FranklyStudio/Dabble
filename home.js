$('#grid').innerHTML=GAMES.map(g=>
  '<a class="card'+(g.big?' big':'')+'" style="background:'+g.color+'" href="'+g.id+'.html"><span class="ico" aria-hidden="true">'+g.icon+'</span><h3>'+g.title+'</h3><p>'+g.blurb+'</p></a>'
).join('');
