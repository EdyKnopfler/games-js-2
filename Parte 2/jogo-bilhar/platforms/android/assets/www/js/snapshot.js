function Snapshot(mundo) {
   this.mundo = mundo;
   this.posicoes = [];
}
Snapshot.prototype = {
   salvar: function() {
      var arrPosicoes = [];
      var corpo = this.mundo.GetBodyList();
      
      while (corpo) {
         var pos = corpo.GetPosition();
         var obj = { corpo: corpo, x: pos.x, y: pos.y };
         arrPosicoes.push(obj);
         corpo = corpo.GetNext();
      }
      
      this.posicoes = arrPosicoes;
   },
   reverter: function() {
      for (var i in this.posicoes) {
         var pos = this.posicoes[i];
         pos.corpo.SetPosition(new b2Vec2(pos.x, pos.y));
      }
   }
}
