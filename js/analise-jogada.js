function AnaliseJogada() {
   this.jogadaLegal = false;
   this.encacapouBranca = false;
   this.encacapou = false;
   this.ganhouJogo = false;
}

AnaliseJogada.prototype = {
   analisar: function(primeiraAtingida, bolaOrdem, encacapadas) {
      // Números (IDs)
      var ids = [];
      
      for (var i in encacapadas)
         ids.push(encacapadas[i].id);
      
      // Jogada foi válida?
      this.encacapouBranca = (ids.indexOf(BOLA_BRANCA) >= 0);
      this.jogadaLegal = (primeiraAtingida && 
                          primeiraAtingida.id == bolaOrdem.id && 
                          !this.encacapouBranca);
      
      // Resultados
      this.encacapou = (this.jogadaLegal && ids.length > 0);
      this.ganhouJogo = (this.jogadaLegal && ids.indexOf(9) >= 0);
   }
}
