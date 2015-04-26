var MyGame = MyGame || {};

MyGame.MainMenu = function(){};

MyGame.MainMenu.prototype = {
  preload: function(){
    this.currentPlayState = this.cache.getText('Music');
    this.matrix = this.cache.getText('Matrix');
    if(this.cache.checkImageKey('fullSize')){
      var temp = this.cache.getImage('fullSize');
      var image = {h:temp.naturalHeight,w:temp.naturalWidth};
      this.dimensions = {};
      this.dimensions.y = image.h/this.matrix.value;
      this.dimensions.x = image.w/this.matrix.value;
      this.cache.addText('Dimensions', null, {dimensions:this.dimensions});
    }
  },
  create: function(){
    console.log(this.sound._sounds.length);
    if(!this.sound._sounds.length){
      this.music = this.add.audio('music', 1, true);
      if(this.currentPlayState.value === "on"){
        this.music.play();
      }
    }
    this.createPlayButton();
    this.createTopButtons();
    this.createBottomButtons();
  },
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

    button.inputEnabled = true;
    button.events.onInputDown.add(this.settings,this);
  },
  createPlayButton: function(){
    var w = this.world.width;
    var h = this.world.height;
    this.playButton = this.add.bitmapData(w * 0.47, h * 0.2);
    this.playButton.ctx.beginPath();
    this.playButton.ctx.rect(0,0,w * 0.47, h * 0.2);
    this.playButton.ctx.fillStyle = '#FF0000';
    this.playButton.ctx.fill();

    this.play = this.add.sprite(
      this.world.centerX,
      this.world.centerY,
      this.playButton
    );
    this.play.anchor.set(0.5);
    this.play.alpha = 0.1;
    this.playText = this.add.text(0,0,"Start Game");

    //Center Text
    this.playText.anchor.set(0.5);
    this.playText.align = 'center';

    //Styling
    this.playText.font = 'Arial';
    this.playText.fontWeight ='bold';
    this.playText.fontSize = h * 0.15;

    //Stroke
    this.playText.stroke = '#FFFFFF';
    this.playText.strokeThickness = 12;

    //Gradient
    var grd = this.playText.context.createLinearGradient(0,0,0,this.playText.height);
    grd.addColorStop(0,'#8ED6FF');
    grd.addColorStop(1,'#004CB3');
    this.playText.fill = grd;

    this.play.addChild(this.playText);
    
    this.add.tween(this.play).to({alpha:1}, 500, "Linear", true);
    
    //Input Events
    this.play.inputEnabled = true;
    this.play.events.onInputDown.add(this.playGame,this);
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

    if(this.currentPlayState.value == "on"){
      this.offButton.bringToTop();
    }
    console.log(this);

  },
  musicOff: function(){
    this.sound.pauseAll();
    this.onButton.bringToTop();
    this.cache.removeText('Music');
    this.cache.addText('Music', null, {value: "off"});
  },
  musicOn: function(){
    this.sound.resumeAll();
    this.offButton.bringToTop();
    this.cache.removeText('Music');
    this.cache.addText('Music', null, {value: 'on'});
  },
  playGame: function(){
    this.state.start('GamePlay');
  },
  settings: function(){
    this.state.start('Settings');
  }
};