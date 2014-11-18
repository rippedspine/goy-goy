(function() {
  'use strict';

  function joinRoom(socket, room) {
    socket.room = room;
    socket.leave(socket.id);
    socket.join(socket.room);
    delete socket.adapter.rooms[socket.id];
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

  module.exports = {
    count: count,
    getRooms: getRooms,
    getRoomInRooms: getRoomInRooms,
    joinRoom: joinRoom,
    createRoom: createRoom
  };

})(this);