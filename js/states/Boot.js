var MyGame = MyGame || {};

MyGame.Boot = function(){};

MyGame.Boot.prototype = {
  preload: function(){
    this.load.json('Pics', 'assets/data/pictures.json');
    this.load.image('preloadbar', 'assets/images/preloader-bar.png');
  },
  create: function(){
    this.game.stage.backgroundColor = '#28cdff';

    //scaling options
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    //have the game centered horizontally
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    //screen size will be set automatically
    this.scale.setScreenSize(true);

    this.cache.addText('Matrix', null, {value: 3});
    this.cache.addText('Music', null, {value: 'on'});
    this.cache.addText('Image', null, {word: "Elvira", url:'assets/images/ElviraCrop.JPG'});


    //start next state either preload or menu..
    this.state.start('Preload');
  }
};