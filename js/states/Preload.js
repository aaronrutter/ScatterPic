var MyGame = MyGame || {};

MyGame.Preload = function(){};

MyGame.Preload.prototype = {
  preload: function() {
    //this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    //this.preloadBar.scale.setTo(10);
    var bmd = this.add.bitmapData(700,150);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0,0,700,150);
    bmd.ctx.fillStyle = '#00ff00';
    bmd.ctx.fill();
    this.preloadBar = this.add.sprite(this.world.centerX - 350, this.world.centerY - 75,bmd);
    //this.preloadBar.anchor.setTo(0.5);
    this.load.setPreloadSprite(this.preloadBar);

    this.loadText = this.add.text(this.world.centerX,this.world.centerY,"0%");
    this.loadText.anchor.set(0.5);
    this.loadText.align = 'center';
    this.loadText.font = 'Arial';
    this.loadText.fontWeight = 'bold';
    this.loadText.fontSize = this.world.height * 0.1;
    this.loadText.fill = "#FFFFFF";

    //Stroke
    this.loadText.stroke = '#000000';
    this.loadText.strokeThickness = 6;

    this.matrix = this.cache.getText('Matrix');
    this.picture = this.cache.getText('Image');
    this.pictures = this.cache.getJSON('Pics').pics;
    this.load.image('fullSize', this.picture.url);
    this.load.audio('music', "assets/audio/BEAST1.wav");
    for(i=0;i<this.pictures.length;i++){
      this.load.image(this.pictures[i].word, this.pictures[i].url);
    }
    this.load.onLoadStart.add(this.loadStart, this);
    this.load.onFileComplete.add(this.fileComplete, this);
    this.load.onLoadComplete.add(this.loadComplete, this);
  },
  create: function() {
    console.log("In create");
    this.time.events.add(Phaser.Timer.SECOND,this.menu,this);
  },
  menu: function(){
    
    this.state.start('MainMenu');
  },
  loadStart: function(){
   this.loadText.setText("1%"); 
  },
  fileComplete: function(progress, key, success, loaded, files){
    this.loadText.setText(progress+"%");
  },
  loadComplete: function(){
    this.loadText.setText("100%");
  }
};