var DIRECAO_NENHUMA = 0;
var DIRECAO_N = 1;
var DIRECAO_S = 2;
var DIRECAO_L = 3;
var DIRECAO_O = 4;
var DIRECAO_NE = 5;
var DIRECAO_NO = 6;
var DIRECAO_SE = 7;
var DIRECAO_SO = 8;

function Direcional(imagem) {
   this.imagem = imagem;
   this.direcao = DIRECAO_NENHUMA;
   
   var direcional = this;
   var funcaoToque = function(e) {
      for (var i in e.changedTouches) {
         direcional.direcaoPonto(
            e.changedTouches[i].pageX - imagem.offsetLeft,
            e.changedTouches[i].pageY - imagem.offsetTop
         );
      }
   }
   var funcaoCancela = function() {
      direcional.direcao = DIRECAO_NENHUMA;
   }
   
   imagem.addEventListener('touchstart', function(e) {
      funcaoToque(e);
      if( navigator.userAgent.match(/Android/i) )
         e.preventDefault();
   });
   imagem.addEventListener('touchmove', funcaoToque);
   imagem.addEventListener('touchend', funcaoCancela);
   imagem.addEventListener('touchleave', funcaoCancela);
   imagem.addEventListener('touchenter', funcaoToque);
   imagem.addEventListener('touchcancel', funcaoCancela);
}

Direcional.prototype = {
   direcaoPonto: function(x, y) {
      var larguraCelula = this.imagem.width / 3;
      var alturaCelula = this.imagem.height / 3;
      
      // 1ª coluna
      if (x < larguraCelula) {
         // Verifica qual linha
         if (y < alturaCelula)
            this.direcao = DIRECAO_NO;
         else if (y < alturaCelula * 2)
            this.direcao = DIRECAO_O;
         else if (y < alturaCelula * 3)
            this.direcao = DIRECAO_SO;
      }
      
      // 2ª coluna
      else if (x < larguraCelula * 2) {
         if (y < alturaCelula)
            this.direcao = DIRECAO_N;
         else if (y < alturaCelula * 2)
            this.direcao = DIRECAO_NENHUMA;  // Centro do direcional
         else if (y < alturaCelula * 3)
            this.direcao = DIRECAO_S;
      }
      
      // 3ª coluna
      else if (x < larguraCelula * 3) {
         if (y < alturaCelula)
            this.direcao = DIRECAO_NE;
         else if (y < alturaCelula * 2)
            this.direcao = DIRECAO_L;
         else if (y < alturaCelula * 3)
            this.direcao = DIRECAO_SE;
      }
   }
}
