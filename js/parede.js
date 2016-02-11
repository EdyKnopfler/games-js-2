var IMG_PAREDE = new Image();
IMG_PAREDE.src = 'img/madeira.png';

function Parede(context, x, y, largura, altura, mundo) {
   // Corpo físico
   var corpoDef = new b2BodyDef();
   corpoDef.type = b2Body.b2_staticBody;
   corpoDef.userData = this;  // Sprite associado

   var fixtureDef = new b2FixtureDef();
   fixtureDef.density = 1;
   fixtureDef.friction = 0.5;
   fixtureDef.restitution = 0.5;
         
   var meiaLargura = largura / 2;
   var meiaAltura = altura / 2;
   var centroX = x + meiaLargura;
   var centroY = y + meiaAltura;
   
   // Usando a escala
   corpoDef.position.Set(centroX/mundo.escala, 
                         centroY/mundo.escala);
   
   var retangulo = new b2PolygonShape();
   retangulo.SetAsBox(meiaLargura/mundo.escala, 
                      meiaAltura/mundo.escala);
   
   fixtureDef.shape = retangulo;
   
   var parede = mundo.CreateBody(corpoDef);
   parede.CreateFixture(fixtureDef);
   
   // Dados do sprite
   this.context = context;
   this.x = x;
   this.y = y;
   this.largura = largura;
   this.altura = altura;
}

Parede.prototype = {
   atualizar: function() {
      //
   },
   
   desenhar: function() {
     var ctx = this.context;
     ctx.save();
     ctx.fillStyle = ctx.createPattern(IMG_PAREDE, 'repeat');
     ctx.fillRect(this.x, this.y, this.largura, this.altura);
     ctx.restore();
   }
}
