var MyGame = MyGame || {};

MyGame.GameOver = function(){};

/***
 *
***/
MyGame.GameOver.prototype = {
  preload: function(){
    this.matrix = this.cache.getText('Matrix');
    this.picture = this.cache.getText('Image');
    this.currentPlayState = this.cache.getText('Music');
    //this.dimensions = this.cache.getText('Dimensions').dimensions;
    if(!this.cache.checkImageKey('fullSize')){
      this.load.image('fullSize', this.picture.url);
    }
  },
  create: function(){
    this.add.image(0,0,'fullSize');
    this.createTopButtons();
    this.createBottomButtons();
  },
  settings: function(){
    this.state.start('Settings');
  },
  menu: function(){
    this.state.start('MainMenu');
  },
  restart: function(){
    this.state.start('GamePlay');
  },
  createTopButtons: function(){
    var width = this.world.width/16;
    var bmd = this.add.bitmapData(width,width);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0,0,width,width);
    bmd.ctx.fillStyle = '#00ff00';
    bmd.ctx.fill();
    var settingText = this.add.text(0,0,'settings');
    settingText.fontSize = width*0.3;
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

    var bmd3 = this.add.bitmapData(width*1.618,width);
    bmd3.ctx.beginPath();
    bmd3.ctx.rect(0,0,width*1.618,width);
    bmd3.ctx.fillStyle = '#0000ff';
    bmd3.ctx.fill();
    var restartText = this.add.text(0,0,'Play Again');
    restartText.fontSize = width*0.3;
    restartText.anchor.set(0.5);

    var button3 = this.add.button(this.world.centerX, width*0.5, bmd3, this.restart, this);
    button3.anchor.set(0.5);
    button3.addChild(restartText);
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
    this.cache.addText('Music', null, {value: 'on'});
  },
  musicOn: function(){
    this.sound.resumeAll();
    this.offButton.bringToTop();
    this.cache.addText('Music', null, {value: 'off'});
  }
};