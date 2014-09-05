function TacadaAutomatica(mundo, branca, coloridas, colisor) {
   this.mundo = mundo;
   this.branca = branca;
   this.coloridas = coloridas;
   
   var tacadaAuto = this;
   colisor.encacapou = function(bola) {
      tacadaAuto.aoEncacapar(bola);
   }
   colisor.colisaoBolas = function (bola1, bola2) {
      if (tacadaAuto.primeiraAtingida) return;
      
      if (bola1.id == BOLA_BRANCA)
         tacadaAuto.primeiraAtingida = bola2;
      else if (bola2.id == BOLA_BRANCA)
         tacadaAuto.primeiraAtingida = bola1;
   }
}

TacadaAutomatica.prototype = {
   realizarTestes: function(bolaOrdem) {
      var estadoJogo = new Snapshot(this.mundo);
      estadoJogo.salvar();
      
      var resultados = [];
      
      for (var i = 0; i <= 360; i += 5) {
         var tacada = this.executar(i, 75);
         resultados.push(tacada);
         estadoJogo.reverter();
         
         var analise = new AnaliseJogada();
         analise.analisar(this.primeiraAtingida, bolaOrdem, 
                          tacada.encacapadas);
         tacada.analise = analise;
         
         // Por ordem de prioridade
         if (analise.ganhouJogo)
            return tacada;
         else if (analise.encacapou)
            return tacada;
      }
      
      // Encontrar a primeira tacada válida
      for (var i in resultados) {
         if (resultados[i].analise.jogadaLegal)
            return resultados[i];
      }
      
      return resultados[0];
   },
   
   executar: function(angulo, forca) {
      var tacada = new Tacada(this.branca, this.coloridas);
      tacada.porRelogio = false;
      tacada.tempoAvanco = 1/60;
            
      var continua = true;
      tacada.aposTacada = function() {
         continua = false;
      }
      
      tacada.disparar(angulo, forca);
      
      this.encacapadas = [];
      this.primeiraAtingida = null;
      
      while (continua) {
         this.mundo.Step(1/60, 10, 5);
         tacada.processar();
         this.deslocarEncacapadas();
      }
      
      return { 
         rotacao: angulo, 
         forca: forca, 
         encacapadas: this.encacapadas 
      };
   },
   
   // Chamado dentro do Step pelo tratador de colisão
   aoEncacapar: function(bola) {
      this.encacapadas.push(bola);
   },
   
   deslocarEncacapadas: function() {
      var arr = this.encacapadas;
      
      for (var i in arr) {
         arr[i].corpo.SetLinearVelocity(new b2Vec2(0, 0));
         arr[i].corpo.SetPosition(new b2Vec2(-1000, -1000));
      }
   }
}
