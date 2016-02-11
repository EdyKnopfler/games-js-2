function Tacada(branca, coloridas) {
   this.branca = branca;
   this.coloridas = coloridas;
   this.rodando = false;
   this.aposTacada = null;
   this.porRelogio = true;
   this.tempoAvanco = 0;
}

Tacada.prototype = {
   disparar: function(angulo, forca) {
      var radianos = angulo * Math.PI / 180;
      var forcaX = forca * Math.cos(radianos);
      var forcaY = forca * Math.sin(radianos);
      
      var forca = new b2Vec2(forcaX, forcaY);
      var centro = this.branca.corpo.GetWorldCenter();
      this.branca.corpo.ApplyImpulse(forca, centro);
      
      this.rodando = true;
      this.inicio = Date.now();
      this.quadro = 0;
   },
   
   processar: function() {
      if (!this.rodando) return;
      this.quadro++;
      
      // Quantos segundos já se passaram
      var sete, cinco, tres;
      if (this.porRelogio) {
         var decorrido = Date.now() - this.inicio;
         sete = (decorrido >= 7000);
         cinco = (decorrido >= 5000);
         tres = (decorrido >= 3000);
      }
      else {
         var segundos = this.quadro * this.tempoAvanco;
         sete = (segundos >= 7);
         cinco = (segundos >= 5);
         tres = (segundos >= 3);
      }
      
      var mexendo = false;
      var bolas = this.coloridas.concat([this.branca]);
      
      for (var i in bolas) {
         var b = bolas[i];
         
         // Monitorar o movimento
         if (!b.foraDeJogo && b.corpo.IsAwake()) {
            mexendo = true;
            
            // Frear a bola
            if (sete)
               b.frear(5.0);
            else if (cinco)
               b.frear(1.0);
            else if (tres)
               b.frear(0.7);
         }
      }
      
      if ( ! mexendo ) {
         // Reverter a desaceleração
         for (var i in bolas)
            if (!bolas[i].foraDeJogo) bolas[i].frear(0);
      
         if (this.aposTacada) this.aposTacada();
         this.rodando = false;
         console.log('tacada finalizada');
      }
   }
}
