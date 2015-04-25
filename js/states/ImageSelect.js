var MyGame = MyGame || {};

MyGame.ImageSelect = function(){};

MyGame.ImageSelect.prototype = {
  preload: function(){
    this.matrix = this.cache.getText('Matrix');
    this.picture = this.cache.getText('Image');
    this.currentPlayState = this.cache.getText('Music');
    if(this.cache.checkTextKey('Dimensions')){
      this.dimensions = this.cache.getText('Dimensions').dimensions;
    }
    if(this.cache.checkJSONKey('Pics')){
      this.pictures = this.cache.getJSON('Pics').pics;
    } else {
      console.log("no Pics");
    }
  },
  create: function(){
    this.imgSelect();
    this.createTopButtons();
    this.createBottomButtons();
    console.log(this);
  },
  imgSelect: function(){
    var w10 = this.world.width * 0.15 ;
    var w2 = w10 * 0.25;
    var h10 = this.world.height * 0.15;

    var bmd2 = this.make.bitmapData(w10,w10);
    bmd2.draw('fullSize',0,0,w10,h10);
    bmd2.update();
    this.add.sprite(0,0,bmd2);
    
    var bmd2a = this.add.bitmapData(w10,w10);
    bmd2a.ctx.beginPath();
    bmd2a.ctx.rect(0,0,w10,w10);
    bmd2a.ctx.fillStyle = '#FF0000';
    bmd2a.ctx.fill();
    var area, currentImg, imgScale;

    

    /** 
    for(i=0;i<this.pictures.length;i++){
      if(i===0){
        area = Phaser.Rectangle(0,0,100,100);
        currentImg = this.add.image(0,0,'fullSize');
        currentImg.crop(area);
        imgScale = new Phaser.Point(0.15,0.15);
        currentImg.scale = imgScale;
        currentImg.anchor.set(0.5);
        imgText = this.add.text(0,-w2*1.5,this.picture.word);
        imgText.align = 'center';
        imgText.anchor.set(0.5);
        if (this.pictures[i].word == this.picture.word) {
          imgPick = this.add.sprite(this.world.centerX, this.world.centerY,bmd2a);
        } else {
          imgPick = this.add.sprite(this.world.centerX, this.world.centerY,bmd2);
        }
        imgPick.addChild(imgText);
        imgPick.addChild(currentImg);
      } else if(i==1) {
        currentImg = this.add.image(0,0,this.pictures[i].word);
        imgScale = new Phaser.Point(0.1,0.1);
        currentImg.scale = imgScale;
        currentImg.anchor.set(0.5);
        imgText = this.add.text(0,-w2*1.5,this.pictures[i].word);
        imgText.align = 'center';
        imgText.anchor.set(0.5);
        if (this.pictures[i].word == this.picture.word) {
          imgPick = this.add.sprite(this.world.centerX - (w10 + w2), this.world.centerY,bmd2a);
        } else {
          imgPick = this.add.sprite(this.world.centerX - (w10 + w2), this.world.centerY,bmd2);
        }
        imgPick.addChild(imgText);
        imgPick.addChild(currentImg);
      } else if(i%2 === 0) {
        currentImg = this.add.image(0,0,this.pictures[i].word);
        //currentImg.crop(area);
        imgScale = new Phaser.Point(0.1,0.1);
        currentImg.scale = imgScale;
        currentImg.anchor.set(0.5);
        imgText = this.add.text(0,-w2*1.5,this.pictures[i].word);
        imgText.align = 'center';
        imgText.anchor.set(0.5);
        if (this.pictures[i].word == this.picture.word) {
          imgPick = this.add.sprite(this.world.centerX + (w10*(i*0.5) + w2*(i*0.5)), this.world.centerY,bmd2a);
        } else {
          imgPick = this.add.sprite(this.world.centerX + (w10*(i*0.5) + w2*(i*0.5)), this.world.centerY,bmd2);
        }
        imgPick.addChild(imgText);
        imgPick.addChild(currentImg);
      } else if(i%2 == 1) {
        currentImg = this.add.image(0,0,this.pictures[i].word);
        imgScale = new Phaser.Point(0.1,0.1);
        currentImg.scale = imgScale;
        currentImg.anchor.set(0.5);
        imgText = this.add.text(0,-w2*1.5,this.pictures[i].word);
        imgText.align = 'center';
        imgText.anchor.set(0.5);
        if (this.pictures[i].word == this.picture.word) {
          imgPick = this.add.sprite(this.world.centerX + (w10*(i - 1) + w2*(i - 1)), this.world.centerY,bmd2a);
        } else {
          imgPick = this.add.sprite(this.world.centerX + (w10*(i - 1) + w2*(i - 1)), this.world.centerY,bmd2);
        }
        imgPick.addChild(imgText);
        imgPick.addChild(currentImg);
      }
      imgPick.anchor.set(0.5);
    }
    **/
  },
  createTopButtons: function(){
    var width = this.world.width/16;
    var bmd = this.add.bitmapData(width,width);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0,0,width,width);
    bmd.ctx.fillStyle = '#ff0000';
    bmd.ctx.fill();
    var homeText = this.add.text(0,0,'home');
    homeText.fontSize = width*0.25;
    homeText.anchor.set(0.5);

    var button = this.add.button(width*1.1, width*0.5,bmd,this.menu,this);
    button.anchor.set(0.5);
    button.addChild(homeText);

    var bmd2 = this.add.bitmapData(width,width);
    bmd2.ctx.beginPath();
    bmd2.ctx.rect(0,0,width,width);
    bmd2.ctx.fillStyle = '#00ff00';
    bmd2.ctx.fill();
    var creditText = this.add.text(0,0,'settings');
    creditText.fontSize = width*0.25;
    creditText.anchor.set(0.5);
    creditText.align = 'center';

    var button2 = this.add.button(this.world.width - width*1.1, width*0.5,bmd2,this.settings,this);
    button2.anchor.set(0.5);
    button2.addChild(creditText);
  },
  settings: function(){
    this.state.start('Settings');
  },
  menu: function(){
    this.state.start('MainMenu');
  },
  credits: function(){
    this.state.start('GameOver');
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
  }
};