var Game = (function (helpers) {
  'use strict';

  var MSG_CONNECT = 1
    , MSG_DISCONNECT = 2
    , MSG_NEW_PLAYER = 3
    , MSG_GET_PLAYERS = 4
    , MSG_UPDATE_PLAYER = 5
    , MSG_DEAD_OBSTACLE = 6
    , MSG_UPDATE_OBSTACLES = 7

    , socket = io()
    , stage = new Stage()
    , clientPlayer = null
    , playerCollection = new PlayerCollection()
    , triangleCollection = new TriangleCollection()

    , collidesWithTriangle = helpers.makeCollisionDetector(triangleCollection);

  handleDOMEvents();
  handleSocketEvents();

  // =============================
  // GAME LOOP
  // =============================
  (function loop() {
    requestAnimationFrame(loop);
    if (clientPlayer !== null) {
      stage.render();
      update();
    }
  }());

  function update() {
    playerCollection.update();
    triangleCollection.update();
    collidesWithTriangle(playerCollection.getAll());
  }

  // =============================
  // DOM EVENTS
  // =============================
  function handleDOMEvents() {
    stage.canvas.addEventListener('mousemove', handleMouseMove);
  }

  function handleMouseMove(event) {
    if (clientPlayer !== null) {
      clientPlayer.move(helpers.getPosition(stage.canvas, event));
      socket.emit(MSG_UPDATE_PLAYER, clientPlayer.sendData());  
    }
    
    if (triangleCollection.getDead()) {
      socket.emit(MSG_DEAD_OBSTACLE, triangleCollection.getDead());
    }
  }

  // =============================
  // SOCKET EVENTS
  // =============================
  function handleSocketEvents() {
    socket.on(MSG_CONNECT, onConnect);
    socket.on(MSG_DISCONNECT, onDisonnect);
    socket.on(MSG_NEW_PLAYER, getNewPlayer);
    socket.on(MSG_GET_PLAYERS, onGetPlayers);
    socket.on(MSG_UPDATE_PLAYER, onUpdatePlayer);
    socket.on(MSG_UPDATE_OBSTACLES, onUpdateTriangles);
  }

  function onConnect(data) {
    clientPlayer = playerCollection.addOne(data.player);
    triangleCollection.set(data.triangles);

    stage.setSize(data.area);
    stage.setCollection('players', playerCollection);
    stage.setCollection('triangles', triangleCollection);

    socket.emit(MSG_NEW_PLAYER, clientPlayer.sendData());
  }

  function onDisonnect(id) {
    playerCollection.removeOne(id);
    stage.setCollection('players', playerCollection);
  }

  function getNewPlayer(data) {
    playerCollection.addOne(data);
    stage.setCollection('players', playerCollection);
  }

  function onGetPlayers(data) {
    for (var id in data) {
      getNewPlayer(data[id]);
    }
  }

  function onUpdatePlayer(data) {
    playerCollection.updatePlayer(data);
  }

  function onUpdateTriangles(data) {
    triangleCollection.set(data);
    stage.setCollection('triangles', triangleCollection);
  }

}(Helpers));