/*
 * Author: Jerome Renaux
 * E-mail: jerome.renaux@gmail.com
 */

var Game = {};

Game.init = function(){
    game.stage.disableVisibilityChange = true;
    game.stage.backgroundColor = "#fff";
};

Game.preload = function() {
    game.load.image('bg','assets/map/white-bg.png');
};

Game.create = function(){
    Game.playerMap = {};
    var map = game.add.sprite(0, 50, 'bg');
    map.inputEnabled = true
    map.events.onInputUp.add(Game.getCoordinates, this);

    var text = game.add.text(0, 0, "click to move", { font: "20px Arial", fill: "#000000", align: "right" });

    var text = game.add.text(200, 15, "smaller", { font: "35px Arial", fill: "#0000a0", align: "right" });
    text.anchor.set(0.5);
    text.inputEnabled = true;
    text.events.onInputUp.add(Game.sendSmallerClick, this);

    var text = game.add.text(325, 15, "bigger", { font: "45px Arial", fill: "#0000a0", align: "right" });
    text.anchor.set(0.5);
    text.inputEnabled = true;
    text.events.onInputUp.add(Game.sendBiggerClick, this);

    var text = game.add.text(30, 50, "red", { font: "40px Arial", fill: "#ff0000", align: "left" });
    text.anchor.set(0.5);
    text.inputEnabled = true;
    text.events.onInputUp.add(Game.sendRedClick, this);

    var text = game.add.text(125, 50, "orange", { font: "40px Arial", fill: "#f47418", align: "left" });
    text.anchor.set(0.5);
    text.inputEnabled = true;
    text.events.onInputUp.add(Game.sendOrangeClick, this);

    var text = game.add.text(250, 50, "yellow", { font: "40px Arial", fill: "#fffa00", align: "left" });
    text.anchor.set(0.5);
    text.inputEnabled = true;
    text.events.onInputUp.add(Game.sendYellowClick, this);

    var text = game.add.text(365, 50, "green", { font: "40px Arial", fill: "#00ff00", align: "left" });
    text.anchor.set(0.5);
    text.inputEnabled = true;
    text.events.onInputUp.add(Game.sendGreenClick, this);

    var text = game.add.text(460, 50, "blue", { font: "40px Arial", fill: "#0000ff", align: "left" });
    text.anchor.set(0.5);
    text.inputEnabled = true;
    text.events.onInputUp.add(Game.sendBlueClick, this);

    var text = game.add.text(560, 50, "purple", { font: "40px Arial", fill: "#a500ff", align: "left" });
    text.anchor.set(0.5);
    text.inputEnabled = true;
    text.events.onInputUp.add(Game.sendPurpleClick, this);

    var text = game.add.text(675, 50, "black", { font: "40px Arial", fill: "#000000", align: "left" });
    text.anchor.set(0.5);
    text.inputEnabled = true;
    text.events.onInputUp.add(Game.sendBlackClick, this);

    var text = game.add.text(775, 50, "white", { font: "40px Arial", fill: "#ffffff", backgroundColor:"#000000", align: "left" });
    text.anchor.set(0.5);
    text.inputEnabled = true;
    text.events.onInputUp.add(Game.sendWhiteClick, this);

    Client.askNewPlayer();
};


Game.getCoordinates = function(layer,pointer){
    Client.sendMoveClick(pointer.worldX,pointer.worldY);
};

Game.sendBiggerClick = function(pointer) {
    Client.sendBiggerClick();
}

Game.sendSmallerClick = function(pointer) {
    Client.sendSmallerClick();
}

Game.sendRedClick = function(pointer) {
    Client.sendRedClick();
}

Game.sendOrangeClick = function(pointer) {
    Client.sendOrangeClick();
}

Game.sendYellowClick = function(pointer) {
    Client.sendYellowClick();
}

Game.sendGreenClick = function(pointer) {
    Client.sendGreenClick();
}

Game.sendBlueClick = function(pointer) {
    Client.sendBlueClick();
}

Game.sendPurpleClick = function(pointer) {
    Client.sendPurpleClick();
}

Game.sendBlackClick = function(pointer) {
    Client.sendBlackClick();
}

Game.sendWhiteClick = function(pointer) {
    Client.sendWhiteClick();
}

Game.addNewPlayer = function(id,x,y,w,color){    
    Game.playerMap[id] = game.add.graphics();
    Game.playerMap[id].beginFill(color, 1);
    Game.playerMap[id].drawCircle(x, y, w);
};

Game.changePlayer = function(id,x,y,w,color){
    Game.playerMap[id].destroy()
    Game.playerMap[id] = game.add.graphics();
    player = Game.playerMap[id]
    player.beginFill(color, 1);
    player.drawCircle(x, y, w);
};

Game.removePlayer = function(id){
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
};