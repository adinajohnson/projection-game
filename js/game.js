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
    var map = game.add.sprite(0, 0, 'bg');
    map.inputEnabled = true
    map.events.onInputUp.add(Game.getCoordinates, this);

    var text = game.add.text(50, 1000, "smaller", { font: "20px Arial", fill: "#000000", align: "left" });
    text.anchor.set(0.5);
    text.inputEnabled = true;
    text.events.onInputUp.add(Game.sendSmallerClick, this);

    var text = game.add.text(150, 1000, "bigger", { font: "20px Arial", fill: "#000000", align: "left" });
    text.anchor.set(0.5);
    text.inputEnabled = true;
    text.events.onInputUp.add(Game.sendBiggerClick, this);

    var text = game.add.text(250, 1000, "less red", { font: "20px Arial", fill: "#000000", align: "left" });
    text.anchor.set(0.5);
    text.inputEnabled = true;
    text.events.onInputUp.add(Game.sendLessRedClick, this);

    var text = game.add.text(350, 1000, "more red", { font: "20px Arial", fill: "#000000", align: "left" });
    text.anchor.set(0.5);
    text.inputEnabled = true;
    text.events.onInputUp.add(Game.sendMoreRedClick, this);

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