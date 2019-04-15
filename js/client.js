/**
 * Created by Jerome on 03-03-17.
 */

var Client = {};
Client.socket = io.connect();

Client.sendTest = function(){
    console.log("test sent");
    Client.socket.emit('test');
};

Client.askNewPlayer = function(){
    Client.socket.emit('newplayer');
};

Client.sendMoveClick = function(x,y){
  Client.socket.emit('moveClick',{x:x,y:y});
};

Client.sendBiggerClick = function(){
    Client.socket.emit('biggerClick');
};

Client.sendSmallerClick = function(){
    Client.socket.emit('smallerClick');
};

Client.socket.on('newplayer',function(data){
    Game.addNewPlayer(data.id,data.x,data.y, data.z, data.w, data.color);
});

Client.socket.on('allplayers',function(data){
    for(var i = 0; i < data.length; i++){
        Game.addNewPlayer(data[i].id,data[i].x,data[i].y,data[i].z,data[i].w,data[i].color);
    }

    Client.socket.on('move',function(data){
        Game.movePlayer(data.id,data.x,data.y, data.z, data.w, data.color);
    });

    Client.socket.on('bigger',function(data){
        Game.biggerPlayer(data.id,data.x,data.y, data.z, data.w, data.color);
    });

    Client.socket.on('smaller',function(data){
        Game.smallerPlayer(data.id,data.x,data.y, data.z, data.w, data.color);
    });

    Client.socket.on('remove',function(id){
        Game.removePlayer(id);
    });
});


