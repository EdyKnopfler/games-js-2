var SENSOR = 1;  // Meia largura/altura

var SPRITE_CACAPA = new Image();
SPRITE_CACAPA.src = 'img/cacapa-spritesheet.png';

function Cacapa(context, imgX, imgY, sensorX, sensorY, mundo) {
   // Corpo do Box2dWeb (sensor)
   var corpoDef = new b2BodyDef();
   corpoDef.position.Set(sensorX/mundo.escala, 
                         sensorY/mundo.escala);
   corpoDef.type = b2Body.b2_staticBody;
   corpoDef.userData = this;
   
   var quadrado = new b2PolygonShape();
   quadrado.SetAsBox(SENSOR/mundo.escala, SENSOR/mundo.escala);
   
   var fixtureDef = new b2FixtureDef();
   fixtureDef.shape = quadrado;
   fixtureDef.isSensor = true;  // Sensor!
   
   this.corpo = mundo.CreateBody(corpoDef);
   this.corpo.CreateFixture(fixtureDef);
   
   // Atributos do sprite
   this.context = context;
   this.mundo = mundo;
   this.imgX = imgX;
   this.imgY = imgY;
   this.sensorX = sensorX;
   this.sensorY = sensorY;
   this.spritesheet = new Spritesheet(context, SPRITE_CACAPA, 1, 6);
}

Cacapa.prototype = {
   atualizar: function() {
      //
   },
   desenhar: function() {
      this.spritesheet.desenhar(this.imgX, this.imgY);
   }
}
