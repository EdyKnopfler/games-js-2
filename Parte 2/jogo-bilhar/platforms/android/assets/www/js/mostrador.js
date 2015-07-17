function Mostrador(context) {
   this.context = context;
   this.bolaOrdem = null;
   this.sheet = new Spritesheet(context, BOLA_SPRITE, 10, 19);
}

Mostrador.prototype = {
   atualizar: function() {
      //
   },
   desenhar: function() {
      var ctx = this.context;
      ctx.save();
      
      ctx.fillStyle = 'white';
      ctx.font = '10px';
      ctx.fillText('Próxima:', 380, 370);
      
      this.sheet.linha = this.bolaOrdem.id;
      this.sheet.desenhar(430, 362, 10, 10);
      
      ctx.restore();
   }
}
