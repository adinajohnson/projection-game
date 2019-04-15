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

Client.sendMoreRedClick = function(){
    Client.socket.emit('moreRedClick');
};

Client.sendLessRedClick = function(){
    Client.socket.emit('lessRedClick');
};

Client.sendMoreGreenClick = function(){
    Client.socket.emit('moreGreenClick');
};

Client.sendLessGreenClick = function(){
    Client.socket.emit('lessGreenClick');
};

Client.sendMoreBlueClick = function(){
    Client.socket.emit('moreBlueClick');
};

Client.sendLessBlueClick = function(){
    Client.socket.emit('lessBlueClick');
};

Client.socket.on('newplayer',function(data){
    Game.addNewPlayer(data.id,data.x,data.y, data.z, data.w, data.color);
});

Client.socket.on('allplayers',function(data){
    for(var i = 0; i < data.length; i++){
        Game.addNewPlayer(data[i].id,data[i].x,data[i].y,data[i].z,data[i].w,data[i].color);
    }

    Client.socket.on('change',function(data){
        Game.changePlayer(data.id,data.x,data.y, data.z, data.w, data.color);
    });

    Client.socket.on('remove',function(id){
        Game.removePlayer(id);
    });
});


