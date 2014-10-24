var game = new Game(
  Helpers, 
  Makers,
  io(), 
  new Stage(), 
  new PlayerCollection(), 
  new TriangleCollection()
);

game.start();