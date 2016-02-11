var IMG_TACO = new Image();
IMG_TACO.src = 'img/taco.png';

function Taco(context, hammer) {
   this.context = context;
   this.imagem = IMG_TACO;
   this.raio = 0;
   this.x = 0;
   this.y = 0;
   this.rotacao = 0;
   this.forca = 0;
   this.podeDesenhar = true;
   this.brancaX = 0;
   this.brancaY = 0;
   this.raioDistancia = 0;
   
   // Configuração dos gestos para serem reconhecidos juntos
   var pinch = hammer.get('pinch');
   var rotate = hammer.get('rotate');
   hammer.get('pinch').set({ enable: true, threshold: 0 });
   hammer.get('rotate').set({ enable: true, threshold: 0 });
   pinch.recognizeWith(rotate);
   
   // Eventos
   var taco = this;
   hammer.on('rotatestart', function(e) {
      taco.iniciarRotacao(e);
   });
   hammer.on('rotatemove', function(e) {
      taco.rotacionar(e);
   });
   hammer.on('rotateend', function(e) {
      taco.finalizarRotacao(e);
   });
}

Taco.prototype = {
   atualizar: function() {
     // 
   },
   
   desenhar: function() {
      if (!this.podeDesenhar) return;
      var ctx = this.context;
      
      // Área de controle
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.raio, 0, Math.PI*2);
      ctx.stroke();
      
      // Taco
      var radianos = this.rotacao * Math.PI / 180 + Math.PI / 2;
      ctx.save();
      ctx.translate(this.brancaX, this.brancaY);
      ctx.rotate(radianos);
      ctx.drawImage(this.imagem, -7, 
                    this.deslocamento() + this.raioDistancia,
                    this.imagem.width, this.imagem.height);
      ctx.restore();
   },
   
   iniciarRotacao: function(evento) {
      var canvas = this.context.canvas;
   
      var dedo1 = this.converterParaCanvas(
         evento.pointers[0].pageX - canvas.offsetLeft,
         evento.pointers[0].pageY - canvas.offsetTop
      );
      
      var dedo2 = this.converterParaCanvas(
         evento.pointers[1].pageX - canvas.offsetLeft,
         evento.pointers[1].pageY - canvas.offsetTop
      );
      
      if (this.naArea(dedo1.x, dedo1.y) && 
          this.naArea(dedo2.x, dedo2.y)) {
          
         this.rotacionando = true;
         this.rotacaoInicial = this.rotacao;
         this.rotacionar(evento);
      }
   },
   
   converterParaCanvas: function(x, y) {
      var canvas = this.context.canvas;
      
      return {
         x: canvas.width * x / canvas.offsetWidth,
         y: canvas.height * y / canvas.offsetHeight
      }
   },
   
   naArea: function(x, y) {
      var distanciaX = Math.abs(this.x - x);
      var distanciaY = Math.abs(this.y - y);

      // Pitágoras
      if (distanciaX * distanciaX + distanciaY * distanciaY <=
          this.raio * this.raio)
         return true;
      else         
         return false;
   },
   
   rotacionar: function(evento) {
      if (this.rotacionando) {
         var rotacao = this.rotacaoInicial + evento.rotation;
         this.rotacao = rotacao % 360;
      }
   },
   
   finalizarRotacao: function(evento) {
      if (this.rotacionando) {
         this.rotacionar(evento);
         this.rotacionando = false;
      }
   },
   
   darTacada: function(duracao) {
      if (this.tacada) return;
      this.tacada = true;
      this.duracaoTacada = duracao;
      this.inicioTacada = Date.now();
   },
   
   deslocamento: function() {
      // Não foi disparada tacada
      if (! this.tacada) return this.forca;
    
      // Tempo decorrido
      var agora = Date.now();
      var decorrido = agora - this.inicioTacada;

      // Deslocamento acumulado
      var distancia = this.forca / this.duracaoTacada * decorrido; 
      
      // Completou
      if (decorrido >= this.duracaoTacada) {
         distancia = this.forca;
         this.tacada = false;
         
         // Notificar o jogo
         if (this.aposTacada) this.aposTacada();
      }

      return this.forca - distancia;
   }
}
