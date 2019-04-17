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

Client.sendRedClick = function(){
    Client.socket.emit('redClick');
};

Client.sendOrangeClick = function(){
    Client.socket.emit('orangeClick');
};

Client.sendYellowClick = function(){
    Client.socket.emit('yellowClick');
};

Client.sendGreenClick = function(){
    Client.socket.emit('greenClick');
};

Client.sendBlueClick = function(){
    Client.socket.emit('blueClick');
};

Client.sendPurpleClick = function(){
    Client.socket.emit('purpleClick');
};

Client.sendBlackClick = function(){
    Client.socket.emit('blackClick');
};

Client.sendWhiteClick = function(){
    Client.socket.emit('whiteClick');
};

Client.socket.on('newplayer',function(data){
    Game.addNewPlayer(data.id,data.x,data.y, data.z, data.w, data.color);
});

Client.socket.on('allplayers',function(data){
    for(var i = 0; i < data.length; i++){
        Game.addNewPlayer(data[i].id,data[i].x,data[i].y,data[i].w,data[i].color);
    }

    Client.socket.on('change',function(data){
        Game.changePlayer(data.id,data.x,data.y, data.w, data.color);
    });

    Client.socket.on('remove',function(id){
        Game.removePlayer(id);
    });
});


