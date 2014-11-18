(function() {
  'use strict';

  function joinRoom(socket, room) {
    socket.room = room;
    socket.leave(socket.id);
    socket.join(socket.room);
  }

  function getOngoingGame(io, id) {
    setTimeout(function() {
      return io.nsps['/'].connected[id].game;
    }, 10); 
  }

  function createRoom(socket, room) {
    socket.room = room;
    socket.join(socket.room);
  }

  function count(object) {
    return Object.keys(object).length;
  }

  function getRooms(socket) {
    return socket.adapter.rooms;
  }

  function getRoomInRooms(rooms, max) {
    for (var room in rooms) {
      if (rooms.hasOwnProperty(room)) {
        if (count(rooms[room]) < max) {return room;}
      }
    }
  }

  function getConnected(io, id) {
    if (typeof id !== 'undefined') {
      return io.nsps['/'].connected[id];  
    }
    return io.nsps['/'].connected;
  }

  function getPlayersConnectedToRoom(io, room) {
    var clients = getConnected(io)
      , players = [];
    for (var c in clients) {
      if (clients[c].room === room) {
        players.push(clients[c].player);
      }
    }
    return players;
  }

  module.exports = {
    count: count,
    getOngoingGame: getOngoingGame,
    getConnected: getConnected,
    getRooms: getRooms,
    getRoomInRooms: getRoomInRooms,
    getPlayersConnectedToRoom: getPlayersConnectedToRoom,
    joinRoom: joinRoom,
    createRoom: createRoom
  };

})(this);