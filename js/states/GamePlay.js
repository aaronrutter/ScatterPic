var MyGame = MyGame || {};

MyGame.GamePlay = function(){};
/***
 * TODO:
***/
MyGame.GamePlay.prototype = {
  /***
   * pulls settings in from cache and loads play image as sprite sheet
  ***/
  preload: function(){
    this.matrix = this.cache.getText('Matrix');
    this.picture = this.cache.getText('Image');
    this.dimensions = this.cache.getText('Dimensions').dimensions;
    this.currentPlayState = this.cache.getText('Music');
    this.load.spritesheet('scatter', this.picture.url, this.dimensions.x, this.dimensions.y);
  },
  /***
   * Starts physics engine and creates collision group
   * Creates play image group and call to create play image pieces
   * Call to create buttons at top of screen
   * Creates body for mouse and 3 input calls
  ***/
  create: function(){
    this.physics.startSystem(Phaser.Physics.P2JS);
    this.blockCollisionGroup = this.physics.p2.createCollisionGroup();
    this.physics.p2.updateBoundsCollisionGroup();

    this.scatter = this.add.group();
    this.scatter.enableBody = true;
    this.scatter.physicsBodyType = 1;

    this.createPictureFrames();

    this.mouseBody = new p2.Body();
    this.physics.p2.world.addBody(this.mouseBody);

    this.createTopButtons();
    this.createBottomButtons();
    this.createGameTimer();

    this.input.onDown.add(this.click,this);
    this.input.onUp.add(this.release,this);
    this.input.addMoveCallback(this.move,this);
    console.log(this);
  },
  /***
   * Checks which play image pieces were clicked
   * Creates revolute constraint on mouse and clicked play image piece
  ***/
  click: function(pointer){
    var bodies = this.physics.p2.hitTest(pointer.position,
    this.createGetAtArray()
    );

    var physicsPos = [
      this.physics.p2.pxmi(pointer.position.x),
      this.physics.p2.pxmi(pointer.position.y)
    ];

    if (bodies.length)
    {
        var clickedBody = bodies[0];

        var localPointInBody = [0, 0];
        // this function takes physicsPos and coverts it to the body's local coordinate system
        clickedBody.toLocalFrame(localPointInBody, physicsPos);

        // use a revoluteContraint to attach mouseBody to the clicked body
        this.mouseConstraint = this.game.physics.p2.createRevoluteConstraint(
          this.mouseBody,
          [0, 0],
          clickedBody,
          [
            this.physics.p2.mpxi(localPointInBody[0]),
            this.physics.p2.mpxi(localPointInBody[1])
          ]
        );
    }
  },
  release: function(){
    this.physics.p2.removeConstraint(this.mouseConstraint);
    var emty, ei, ctext;
    var ifMoved = this.scatter.filter(function(child, index, children){
      var m = child.moved;
      return m ? true : false;
    });
    if(ifMoved.total > 0){
      var flag = ifMoved.first;
      while(flag){
        var deltaX = Math.abs(flag.startX - flag.x);
        var deltaY = Math.abs(flag.startY - flag.y);
        if(deltaX > 25 || deltaY > 25){
          if(deltaX >= (this.dimensions.x - 25) || deltaY >= (this.dimensions.y - 25)){
            emty = this.e;
            this.doMove(flag.startX, flag.startY, flag.q, flag, emty);
            flag.startX = emty.x;
            flag.startY = emty.y;
            flag.q = emty.q;
          }
        }
        flag.moved = false;
        flag = ifMoved.next;
      }
    }
    this.checkGameOver();
  },
  checkGameOver: function(){
    var endGame = this.scatter.filter(function(child,index,children){
        var sx = child.startX;
        var fx = child.finalX;
        var sy = child.startY;
        var fy = child.finalY;
        return (sx===fx&&sy===fy) ? true: false;
      });
      if(endGame.length >= (this.matrix.value*this.matrix.value - 1) ){
        this.state.start("GameOver");
      }
  },
  doMove: function(x,y,q, flag, emty){
    if(flag.q != emty.q){
      ctext = flag.getChildAt(0);
      ctext.setText("Q"+emty.q+" F"+flag.frame);
      this.updateMoves();
      this.e = {x:x,y:y,q:q};
    }
  },
  move: function(pointer){
    this.mouseBody.position[0] = this.physics.p2.pxmi(pointer.position.x);
    this.mouseBody.position[1] = this.physics.p2.pxmi(pointer.position.y);
    this.checkMove();

  },
  checkMove: function(){
    //calculate positions of item
    var checkPosition = this.scatter.filter(function(child, index, children){
      //var dx = Math.abs(child.finalX - child.x);
      //var dy = Math.abs(child.finalY - child.y);
      var dx = Math.abs(child.deltaX);
      var dy = Math.abs(child.deltaY);
      var m = child.moved;
      return (dx > 1 && dy > 1 && !m) ? true : false;
    });

    if(checkPosition.total > 0){
      var flag = checkPosition.first;
      while(flag){
        flag.moved = true;
        flag = checkPosition.next;
      }
      //console.log(checkPosition);
    }
  },
  createFrameData: function(){
    var xHere = this.dimensions.x/2;
    var yHere = this.dimensions.y/2;
    var fd = 0;
    var data = [];
    for(i=0;i<this.matrix.value;i++){
      for(j=0;j<this.matrix.value;j++){
        var xValue = xHere + this.dimensions.x*j;
        var yValue = yHere + this.dimensions.y*i;
        var toPush = {frame: fd, x: xValue, y: yValue};
        data.push(toPush);
        fd++;
      }
    }
    return data;
  },
  //TODO
  createPictureFrames: function(){
    var frameData = this.createFrameData();
    var xHere = this.dimensions.x/2;
    var yHere = this.dimensions.y/2;
    var fr = 0;
    var item;
    //Loop for Rows in Game
    for(var i=0; i<this.matrix.value;i++){
      //Loop for columns in Game
      for(var j=0; j<this.matrix.value;j++){
        var xValue = xHere + this.dimensions.x*j;
        var yValue = yHere + this.dimensions.y*i;
        //Get random game image piece with final position data
        var pivk = this.game.rnd.pick(frameData);
        //Get the index of that frame data
        var ind = frameData.indexOf(pivk);
        //Remove the frame data
        frameData.splice(ind,1);
        //leave out one piece
        if(fr < this.matrix.value*this.matrix.value-1){
          //Create sprite
          item = this.scatter.create(xValue,yValue,'scatter', pivk.frame);
          //Adds physics and associates with collision group
          item.body.setCollisionGroup(this.blockCollisionGroup);
          item.body.collides([this.blockCollisionGroup]);
          item.moved = false;
          item.startX = xValue;
          item.startY = yValue;
          item.finalX = pivk.x;
          item.finalY = pivk.y;
          item.q = fr;
          //Sets initial position data
          var text = this.add.text(0,0,"Q"+fr+", F"+pivk.frame);
          text.anchor.set(0.5);
          item.addChild(text);
          item.body.onBeginContact.add(this.contact, this);
        } else {
          this.e = {x:xValue,y:yValue,q:fr};
        }
        fr++;
      }
    }
  },
  contact: function(body, shapeA, shapeB, equation){
    console.log("body",body);
    console.log("shape A",shapeA);
    console.log("shape B",shapeB);
  },
  createGetAtArray: function(){
    var data = [];
    for(i=0;i<this.matrix.value*this.matrix.value;i++){
      data.push(this.scatter.getAt(i).body);
    }
    return data;
  },
  /***
   * Gets 1/16 of the game width sets to width
   * Creates a bitmap width by width and Green
   * Creates text "settings" setting fort size to width multiplied by 0.3
   * Sets text anchor to 0.5 and align to center
   * Creates button
  ***/
  createTopButtons: function(){
    var width = this.world.width/16;
    var bmd = this.add.bitmapData(width,width);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0,0,width,width);
    bmd.ctx.fillStyle = '#00ff00';
    bmd.ctx.fill();
    var settingText = this.add.text(0,0,'settings');
    settingText.fontSize = width*0.25;
    settingText.anchor.set(0.5);
    settingText.align = 'center';

    var button = this.add.button(this.world.width - width*1.1, width*0.5,bmd,this.settings,this);
    button.anchor.set(0.5);
    button.addChild(settingText);

    var bmd2 = this.add.bitmapData(width,width);
    bmd2.ctx.beginPath();
    bmd2.ctx.rect(0,0,width,width);
    bmd2.ctx.fillStyle = '#ff0000';
    bmd2.ctx.fill();
    var homeText = this.add.text(0,0,'home');
    homeText.fontSize = width*0.3;
    homeText.anchor.set(0.5);

    var button2 = this.add.button(width*1.1, width*0.5,bmd2,this.menu,this);
    button2.anchor.set(0.5);
    button2.addChild(homeText);

    var bmd3 = this.add.bitmapData(width,width);
    bmd3.ctx.beginPath();
    bmd3.ctx.rect(0,0,width,width);
    bmd3.ctx.fillStyle = '#0000ff';
    bmd3.ctx.fill();
    var restartText = this.add.text(0,0,'reset');
    restartText.fontSize = width*0.3;
    restartText.anchor.set(0.5);

    var button3 = this.add.button(this.world.centerX, width*0.5, bmd3, this.restart, this);
    button3.anchor.set(0.5);
    button3.addChild(restartText);
  },
  /***
   * Changes state to settings
  ***/
  settings: function(){
    this.state.start('Settings');
  },
  /***
   * Changes state to menu
  ***/
  menu: function(){
    this.state.start('MainMenu');
  },
  /***
   * Changes state to GamePlay
  ***/
  restart: function(){
    this.state.start('GamePlay');
  },
  createBottomButtons: function(){
    var width = this.world.width/16;
    var bmd = this.add.bitmapData(width,width);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0,0,width,width);
    bmd.ctx.fillStyle = '#FF0000';
    bmd.ctx.fill();
    var offText = this.add.text(0,0,'off');
    offText.fontSize = width*0.3;
    offText.anchor.set(0.5);
    offText.align = 'center';

    this.offButton = this.add.button(width*1.1, this.world.height - width*0.5,bmd,this.musicOff,this);
    this.offButton.anchor.set(0.5);
    this.offButton.addChild(offText);

    var onText = this.add.text(0,0,'on');
    onText.fontSize = width*0.3;
    onText.anchor.set(0.5);
    onText.align = 'center';

    this.onButton = this.add.button(width*1.1, this.world.height - width*0.5,bmd,this.musicOn,this);
    this.onButton.anchor.set(0.5);
    this.onButton.addChild(onText);

    if(this.currentPlayState.value == 'on'){
      this.offButton.bringToTop();
    }
  },
  musicOff: function(){
    this.sound.pauseAll();
    this.onButton.bringToTop();
    this.cache.addText('Music', null, {value: 'off'});
  },
  musicOn: function(){
    this.sound.resumeAll();
    this.offButton.bringToTop();
    this.cache.addText('Music', null, {value: 'on'});
  },
  /***
   * Adds original text and calls a loop every second to updateTimer
  ***/
  createGameTimer:function(){
    this.gameTime = 0;
    this.timerText = this.add.text(this.world.width / 4, this.world.height * 0.06, "Game Timer: 0");
    this.timerText.align = 'left';
    this.timerText.fill = '#FFFFFF';
    this.timerText.fontSize = this.world.height * 0.06;
    this.moves = 0;
    this.moveText = this.add.text(this.world.width * 0.7, this.world.height * 0.06, "Moves: 0");
    this.moveText.align = 'left';
    this.moveText.fill = '#FFFFFF';
    this.moveText.fontSize = this.world.height * 0.06;
    this.moveText.anchor.set(0.5);
    this.timerText.anchor.set(0.5);
    this.game.time.events.loop(Phaser.Timer.SECOND, this.updateTimer, this);
  },
  /***
   * Resets text to include one more second
  ***/
  updateTimer: function(){
    this.gameTime++;
    this.timerText.setText('Game Timer: ' + this.gameTime);
  },
  updateMoves: function(){
    this.moves++;
    this.add.tween(this.moveText.scale).to({x: 1.5, y:1.5}, 1000, Phaser.Easing.Bounce.Out, true);
    this.moveText.setText('Moves: ' + this.moves);
    this.add.tween(this.moveText.scale).from({x: 1.5, y:1.5}, 1000, Phaser.Easing.Bounce.Out, true);
  }
};