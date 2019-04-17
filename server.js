var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use('/css',express.static(__dirname + '/css'));
app.use('/js',express.static(__dirname + '/js'));
app.use('/assets',express.static(__dirname + '/assets'));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

server.lastPlayderID = 0;

server.listen(process.env.PORT || 8081,function(){
    console.log('Listening on '+server.address().port);
});

io.on('connection',function(socket){

    socket.on('newplayer',function(){
        socket.player = {
            id: server.lastPlayderID++,
            x: 0,
            y: 0,
            w: 20,
            color: 000000
        };
        socket.emit('allplayers',getAllPlayers());
        socket.broadcast.emit('newplayer',socket.player);

        socket.on('moveClick',function(data){
            socket.player.x = data.x;
            socket.player.y = data.y;
            io.emit('change',socket.player);
        });

        socket.on('biggerClick',function(){
            socket.player.w = socket.player.w + 5;
            io.emit('change',socket.player);
        });

        socket.on('smallerClick',function(){
            socket.player.w = socket.player.w - 5;
            io.emit('change',socket.player);
        });

        socket.on('redClick',function(){
            socket.player.color = 0xff0000;
            io.emit('change',socket.player);
        });

        socket.on('orangeClick',function(){
            socket.player.color = 0xf47418;
            io.emit('change',socket.player);
        });

        socket.on('yellowClick',function(){
            socket.player.color = 0xfffa00;
            io.emit('change',socket.player);
        });

        socket.on('greenClick',function(){
            socket.player.color = 0x00ff00;
            io.emit('change',socket.player);
        });

        socket.on('blueClick',function(){
            socket.player.color = 0x0000ff;
            io.emit('change',socket.player);
        });

        socket.on('purpleClick',function(){
            socket.player.color = 0xa500ff;
            io.emit('change',socket.player);
        });

        socket.on('blackClick',function(){
            socket.player.color = 0x000000;
            io.emit('change',socket.player);
        });

        socket.on('whiteClick',function(){
            socket.player.color = 0xffffff;
            io.emit('change',socket.player);
        });

        socket.on('disconnect',function(){
            io.emit('remove',socket.player.id);
        });
    });

    socket.on('test',function(){
        console.log('test received');
    });
});

function getAllPlayers(){
    var players = [];
    Object.keys(io.sockets.connected).forEach(function(socketID){
        var player = io.sockets.connected[socketID].player;
        if(player) players.push(player);
    });
    return players;
}
