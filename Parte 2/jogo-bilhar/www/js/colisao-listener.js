function ColisaoListener(somBola, somMadeira, somCacapa) {
   this.somBola = somBola;
   this.somMadeira = somMadeira;
   this.somCacapa = somCacapa;
   this.colisaoBolas = null;
}

// ColisaoListener herda os métodos de b2ContactListener
ColisaoListener.prototype = new b2ContactListener();

ColisaoListener.prototype.BeginContact = function(contato) {
   var corpoA = contato.GetFixtureA().GetBody();
   var corpoB = contato.GetFixtureB().GetBody();
   
   var objetoA = corpoA.GetUserData();
   var objetoB = corpoB.GetUserData();
   
   var bola1 = (objetoA instanceof Bola ? objetoA : null);
   var bola2 = (objetoB instanceof Bola ? objetoB : null);
   var bola = bola1 || bola2;
               
   var parede = (objetoA instanceof Parede ? objetoA :
                 objetoB instanceof Parede ? objetoB : null);
                 
   var cacapa = (objetoA instanceof Cacapa ? objetoA :
                 objetoB instanceof Cacapa ? objetoB : null);
   
   if (bola1 && bola2) {
      this.somBola.play();
      this.somBola.seekTo(0);
      if (this.colisaoBolas) this.colisaoBolas(bola1, bola2);
   }
   else if (bola && parede) {
      this.somMadeira.play();
      this.somMadeira.seekTo(0);
   }
   else if (bola && cacapa) {
      this.somCacapa.play();
      this.somCacapa.seekTo(0);
      if (bola.encacapou) bola.encacapou(bola);
  }
}
