function SimulacaoListener() {
   this.encacapou = null;
}

SimulacaoListener.prototype = new b2ContactListener();

SimulacaoListener.prototype.BeginContact = function(contato) {
   var objA = contato.GetFixtureA().GetBody().GetUserData();
   var objB = contato.GetFixtureB().GetBody().GetUserData();
   
   var bola1 = (objA instanceof Bola  ?  objA  : null);
   var bola2 = (objB instanceof Bola  ?  objB  : null);
   var bola = (bola1 || bola2);
   
   var cacapa = (objA instanceof Cacapa  ?  objA  :
                 objB instanceof Cacapa  ?  objB  :  null);
   
   if (bola && cacapa && this.encacapou)
      this.encacapou(bola);
   
   if (bola1 && bola2)
      this.colisaoBolas(bola1, bola2);
}
