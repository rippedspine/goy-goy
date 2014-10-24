var game = new Gaia.Game(
  Gaia.Helpers, 
  io(),
  new Gaia.Stage(), 
  new Gaia.PlayerCollection(), 
  new Gaia.TriangleCollection()
);

game.start();
