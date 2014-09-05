function Animacao(context, mundo) {
   this.context = context;
   this.mundo = mundo;
   this.sprites = [];
   this.ligado = false;
   this.processamentos = [];
   this.spritesExcluir = [];
   this.processamentosExcluir = [];
   this.ultimoCiclo = 0;
   this.decorrido = 0;
}
Animacao.prototype = {
   novoSprite: function(sprite) {
      this.sprites.push(sprite);
      sprite.animacao = this;
   },
   ligar: function() {
      this.ultimoCiclo = 0;
      this.ligado = true;
      this.proximoFrame();
   },
   desligar: function() {
      this.ligado = false;
   },
   proximoFrame: function() {
      if ( ! this.ligado ) return;
      
      // Fundo verde
      var ctx = this.context;
      ctx.save();
      ctx.fillStyle = '#050';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.restore();
      
      var agora = Date.now();
      if (this.ultimoCiclo == 0) this.ultimoCiclo = agora;
      this.decorrido = agora - this.ultimoCiclo;
      
      // Mundo físico
      this.mundo.Step(1/60, 10, 5);
      //this.mundo.DrawDebugData();

      for (var i in this.sprites)
         this.sprites[i].atualizar();
      
      for (var i in this.sprites)
         this.sprites[i].desenhar();
         
      for (var i in this.processamentos)
         this.processamentos[i].processar();
         
      this.processarExclusoes();
      this.ultimoCiclo = agora;

      // Próximo ciclo com setTimeout
      var animacao = this;
      setTimeout(function() {
         animacao.proximoFrame();
      }, 1000/60);
      /*
      requestAnimationFrame(function() {
         animacao.proximoFrame();
      });
      */
   },
   novoProcessamento: function(processamento) {
      this.processamentos.push(processamento);
      processamento.animacao = this;
   },
   excluirSprite: function(sprite) {
      this.spritesExcluir.push(sprite);
   },
   excluirProcessamento: function(processamento) {
      this.processamentosExcluir.push(processamento);
   },
   processarExclusoes: function() {
      // Criar novos arrays
      var novoSprites = [];
      var novoProcessamentos = [];
      
      // Adicionar somente se não constar no array de excluídos
      for (var i in this.sprites) {
         if (this.spritesExcluir.indexOf(this.sprites[i]) == -1)
            novoSprites.push(this.sprites[i]);
      }
      
      for (var i in this.processamentos) {
         if (this.processamentosExcluir.indexOf(this.processamentos[i])
             == -1)
            novoProcessamentos.push(this.processamentos[i]);
      }
      
      // Limpar os arrays de exclusões
      this.spritesExcluir = [];
      this.processamentosExcluir = [];
      
      // Substituir os arrays velhos pelos novos
      this.sprites = novoSprites;
      this.processamentos = novoProcessamentos;
   }
}
