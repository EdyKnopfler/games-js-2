var BOLA_BRANCA = 0;

var BOLA_SPRITE = new Image();
BOLA_SPRITE.src = 'img/bola-spritesheet.png';

function Bola(context, x, y, raio, mundo) {
   // Corpo do Box2dWeb
   var corpoDef = new b2BodyDef();
   corpoDef.position.Set(x/mundo.escala, y/mundo.escala);
   corpoDef.type = b2Body.b2_dynamicBody;
   corpoDef.bullet = true;
   corpoDef.userData = this;
   
   var fixtureDef = new b2FixtureDef();
   fixtureDef.shape = new b2CircleShape(raio/mundo.escala);
   fixtureDef.density = 1;
   fixtureDef.friction = 0.5;
   fixtureDef.restitution = 0.7;
   
   this.corpo = mundo.CreateBody(corpoDef);
   this.corpo.CreateFixture(fixtureDef);   
   
   // Atributos da bola
   this.id = 0;
   this.context = context;
   this.raio = raio;
   this.mundo = mundo;
   this.encacapou = null;
   this.foraDeJogo = false;
   
   // Spritesheet
   var sheet = new Spritesheet(context, BOLA_SPRITE, 10, 19);
   this.spritesheet = sheet;
}

Bola.prototype = {
   atualizar: function() {
      
   },
   
   desenhar: function() {
      // Ângulo da trajetória
      var velocidade = this.corpo.GetLinearVelocity();
      var vX = velocidade.x;
      var vY = velocidade.y;
      var angulo = Math.atan2(vY, vX);  // y, x

      // Velocidade da animação
      var velMax = Math.max( Math.abs(vX), Math.abs(vY) );
      var intervalo = ( velMax == 0  ?  null  :  1 / velMax * 50 );

      // Posição
      var posicao = this.corpo.GetPosition();
      var x = posicao.x * this.mundo.escala;
      var y = posicao.y * this.mundo.escala;
      
      // DESENHAR ROTACIONADA
      var ctx = this.context;
      
      ctx.save();
      
      // Ponto de desenho
      ctx.translate(x, y);
      
      // Rotaciona
      ctx.rotate(angulo);
      
      // Desenha
      var sheet = this.spritesheet;
      sheet.linha = this.id;
      
      if (intervalo) {
         sheet.intervalo = intervalo;
         sheet.proximoQuadro();
      }
      
      sheet.desenhar(-this.raio, -this.raio, this.raio * 2, this.raio * 2);
      
      ctx.restore();
      
   },
   
   frear: function(desaceleracao) {
      this.corpo.SetLinearDamping(desaceleracao);
      this.corpo.SetAngularDamping(desaceleracao);
   },
   
   tirarDoJogo: function() {
      this.mundo.DestroyBody(this.corpo);
      this.animacao.excluirSprite(this);
      this.foraDeJogo = true;
   }
}
