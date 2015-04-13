var MyGame = MyGame || {};

MyGame.Preload = function(){};

MyGame.Preload.prototype = {
  preload: function() {
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);
    this.preloadBar.scale.setTo(10);
    this.load.setPreloadSprite(this.preloadBar);

    this.matrix = this.cache.getText('Matrix');
    this.picture = this.cache.getText('Image');
    this.pictures = this.cache.getJSON('Pics').pics;
    this.load.image('fullSize', this.picture.url);
    for(i=0;i<this.pictures.length;i++){
      this.load.image(this.pictures[i].word, this.pictures[i].url);
    }
    this.load.audio('music', "assets/audio/BEAST1.wav");
    
  },
  create: function() {
    
    
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