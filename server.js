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
            z: 0,
            w: 20,
            color: 111111
        };
        socket.emit('allplayers',getAllPlayers());
        socket.broadcast.emit('newplayer',socket.player);

        socket.on('moveClick',function(data){
            //console.log('click to '+data.x+', '+data.y);
            socket.player.x = data.x;
            socket.player.y = data.y;
            io.emit('change',socket.player);
        });

        socket.on('biggerClick',function(){
            //console.log('bigger'+socket.player.w);
            socket.player.w = socket.player.w + 5;
            io.emit('change',socket.player);
        });

        socket.on('smallerClick',function(){
            //console.log('smaller'+socket.player.w);
            socket.player.w = socket.player.w - 5;
            io.emit('change',socket.player);
        });

        socket.on('moreRedClick',function(){
            //console.log('more red'+socket.player.w);
            //rgb = hexToRgb(socket.player.color)
            i = socket.player.color.toString();
            new_color = (hexToR(i)+1).toString(16)+hexToG(i).toString(16)+hexToB(i).toString(16);
            socket.player.color = new_color;
            //console.log(new_color);
            io.emit('change',socket.player);
        });

        socket.on('lessRedClick',function(){
            //console.log('less red'+socket.player.w);
            i = socket.player.color.toString();
            new_color = (hexToR(i)-1).toString(16)+hexToG(i).toString(16)+hexToB(i).toString(16);
            //console.log(new_color);
            socket.player.color = new_color;
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

function hexToR(h) {return parseInt(h.substring(0,2),16)}
function hexToG(h) {return parseInt(h.substring(2,4),16)}
function hexToB(h) {return parseInt(h.substring(4,6),16)}