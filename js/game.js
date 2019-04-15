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

    var text = game.add.text(200, 10, "make smaller", { font: "20px Arial", fill: "#0000a0", align: "right" });
    text.anchor.set(0.5);
    text.inputEnabled = true;
    text.events.onInputUp.add(Game.sendSmallerClick, this);

    var text = game.add.text(350, 10, "make bigger", { font: "20px Arial", fill: "#0000a0", align: "right" });
    text.anchor.set(0.5);
    text.inputEnabled = true;
    text.events.onInputUp.add(Game.sendBiggerClick, this);
/*
    var text = game.add.text(250, 1000, "less red", { font: "20px Arial", fill: "#000000", align: "left" });
    text.anchor.set(0.5);
    text.inputEnabled = true;
    text.events.onInputUp.add(Game.sendLessRedClick, this);

    var text = game.add.text(350, 1000, "more red", { font: "20px Arial", fill: "#000000", align: "left" });
    text.anchor.set(0.5);
    text.inputEnabled = true;
    text.events.onInputUp.add(Game.sendMoreRedClick, this);

    var text = game.add.text(250, 1100, "less green", { font: "20px Arial", fill: "#000000", align: "left" });
    text.anchor.set(0.5);
    text.inputEnabled = true;
    text.events.onInputUp.add(Game.sendLessGreenClick, this);

    var text = game.add.text(350, 1100, "more green", { font: "20px Arial", fill: "#000000", align: "left" });
    text.anchor.set(0.5);
    text.inputEnabled = true;
    text.events.onInputUp.add(Game.sendMoreGreenClick, this);

    var text = game.add.text(250, 1200, "less blue", { font: "20px Arial", fill: "#000000", align: "left" });
    text.anchor.set(0.5);
    text.inputEnabled = true;
    text.events.onInputUp.add(Game.sendLessBlueClick, this);

    var text = game.add.text(350, 1200, "more blue", { font: "20px Arial", fill: "#000000", align: "left" });
    text.anchor.set(0.5);
    text.inputEnabled = true;
    text.events.onInputUp.add(Game.sendMoreBlueClick, this);*/

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

Game.sendMoreRedClick = function(pointer) {
    Client.sendMoreRedClick();
}

Game.sendLessRedClick = function(pointer) {
    Client.sendLessRedClick();
}

Game.sendMoreGreenClick = function(pointer) {
    Client.sendMoreGreenClick();
}

Game.sendLessGreenClick = function(pointer) {
    Client.sendLessGreenClick();
}

Game.sendMoreBlueClick = function(pointer) {
    Client.sendMoreBlueClick();
}

Game.sendLessBlueClick = function(pointer) {
    Client.sendLessBlueClick();
}

Game.addNewPlayer = function(id,x,y,z,w,color){    
    Game.playerMap[id] = game.add.graphics();
    Game.playerMap[id].beginFill(color, 1);
    Game.playerMap[id].drawCircle(x, y, w);
};

Game.changePlayer = function(id,x,y,z,w,color){
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