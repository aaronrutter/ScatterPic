var MyGame = MyGame || {};

MyGame.Preload = function(){};

MyGame.Preload.prototype = {
  preload: function() {
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);
    this.preloadBar.scale.setTo(10);

    this.matrix = this.cache.getText('Matrix');
    this.picture = this.cache.getText('Image');
    this.pictures = this.cache.getJSON('Pics').pics;
    this.load.image('fullSize', this.picture.url);
    for(i=0;i<this.pictures.length;i++){
      this.load.image(this.pictures[i].word, this.pictures[i].url);
    }
    this.load.audio('music', "assets/audio/BEAST1.wav");
    this.load.setPreloadSprite(this.preloadBar);
  },
  create: function() {
    if(this.cache.checkImageKey('fullSize')){
      var temp = this.cache.getImage('fullSize');
      var image = {h:temp.naturalHeight,w:temp.naturalWidth};
      this.dimensions = {};
      this.dimensions.y = image.h/this.matrix.value;
      this.dimensions.x = image.w/this.matrix.value;
      this.cache.addText('Dimensions', null, {dimensions:this.dimensions});
    }
    
    this.state.start('MainMenu');
  }
};
  /***
   *
   *
   *
   *
   *
   *
   *
   *
   ***/