function Spritesheet(context, imagem, linhas, colunas) { 
   this.context = context; 
   this.imagem = imagem; 
   this.numLinhas = linhas; 
   this.numColunas = colunas; 
   this.intervalo = 0; 
   this.linha = 0; 
   this.coluna = 0; 
   this.fimDoCilo = null;
} 
Spritesheet.prototype = { 
   proximoQuadro: function() {
      var agora = new Date().getTime(); 

      // Se ainda não tem último tempo medido 
      if (! this.ultimoTempo) this.ultimoTempo = agora; 

      // Já é hora de mudar de coluna? 
      if (agora - this.ultimoTempo < this.intervalo) return;

      if (this.coluna < this.numColunas - 1) {
         this.coluna++; 
      }
      else {
         this.coluna = 0;
         
         // Avisar que acabou um ciclo!
         if (this.fimDoCiclo) this.fimDoCiclo();
      }

      // Guardar hora da última mudança
      this.ultimoTempo = agora;
   },
   desenhar: function(x, y, largDestino, altDestino) {
      var largOrigem = this.imagem.width / this.numColunas; 
      var altOrigem = this.imagem.height / this.numLinhas; 
      
      if (!largDestino) largDestino = largOrigem;
      if (!altDestino) altDestino = altOrigem;

      this.context.drawImage( 
         this.imagem, 
         largOrigem * this.coluna, 
         altOrigem * this.linha, 
         largOrigem, 
         altOrigem, 
         x, 
         y, 
         largDestino, 
         altDestino 
      ); 
   }
}
