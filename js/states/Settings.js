var MyGame = MyGame || {};

MyGame.Settings = function(){};

/***
 * Setting Option for:
 *  Image
 *  Pieces
 *  GamePlay
***/
MyGame.Settings.prototype = {
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
    var thirdH = Math.round(this.world.height/3);
    var thirdW = Math.round(this.world.width/3);

    this.imgDiv(thirdW, thirdH);
    this.imgSelect(thirdW, thirdH);
    this.fluff(thirdW, thirdH);
    this.createTopButtons();
    this.createBottomButtons();

    console.log(this);
  },
  imgDiv: function(w,h){
    var matrix = this.add.text(
      this.world.centerX,
      h*0.1,
      "Image Division"
    );

    matrix.anchor.set(0.5);
    matrix.align = 'center';

    var w10 = this.world.width*0.15;
    var h10 = this.world.height*0.15;
    var bmd2 = this.add.bitmapData(w10,h10);
    bmd2.ctx.beginPath();
    bmd2.ctx.rect(0,0,w10,h10);
    bmd2.ctx.fillStyle = '#FF0000';
    bmd2.ctx.fill();

    this.byThrees = this.add.sprite(
      w-(0.2*w),
      h*0.5,
      bmd2
    );
    this.byThrees.anchor.set(0.5);
    threeText = this.add.text(0,0,"3 x 3");
    threeText.anchor.set(0.5);
    this.byThrees.addChild(threeText);
    this.byThrees.inputEnabled = true;
    this.byThrees.events.onInputDown.add(this.changeMatrix3, this);
    this.byThrees.events.onInputUp.add(this.settings,this);

    this.byFours = this.add.sprite(
      this.world.centerX,
      h*0.5,
      bmd2
    );
    this.byFours.anchor.set(0.5);
    fourText = this.add.text(0,0,"4 x 4");
    fourText.anchor.set(0.5);
    this.byFours.addChild(fourText);
    this.byFours.inputEnabled = true;
    this.byFours.events.onInputDown.add(this.changeMatrix4,this);
    this.byFours.events.onInputUp.add(this.settings,this);

    this.byFives = this.add.sprite(
      w*2+(0.2*w),
      h*0.5,
      bmd2
    );

    this.byFives.anchor.set(0.5);
    fiveText = this.add.text(0,0,"5 x 5");
    fiveText.anchor.set(0.5);
    this.byFives.addChild(fiveText);
    this.byFives.inputEnabled = true;
    this.byFives.events.onInputDown.add(this.changeMatrix5,this);
    this.byFives.events.onInputUp.add(this.settings,this);

    var selected = {stroke:'#FFFFFF', strokeThickness: 6, font: h*0.3+"px Arial", align: "center"};
    var notSelected = {strokeThickness: 0, font: h*0.25+"px Arial", align: "center"};

    switch(this.matrix.value){
      case 3:
        threeText.setStyle(selected);
        fourText.setStyle(notSelected);
        fiveText.setStyle(notSelected);
      break;
      case 4:
        threeText.setStyle(notSelected);
        fourText.setStyle(selected);
        fiveText.setStyle(notSelected);
      break;
      case 5:
        threeText.setStyle(notSelected);
        fourText.setStyle(notSelected);
        fiveText.setStyle(selected);
      break;

    }
  },
  imgSelect: function(w,h){
    var image = this.add.text(this.world.centerX,h,"Select Image");
    image.anchor.set(0.5);
    image.align = 'center';

    var w10 = this.world.width * 0.15 ;
    var w2 = w10 * 0.25;
    var h10 = this.world.height * 0.15;

    var bmd2 = this.add.bitmapData(w10,w10);
    bmd2.ctx.beginPath();
    bmd2.ctx.rect(0,0,w10,w10);
    bmd2.ctx.fillStyle = '#00FF00';
    bmd2.ctx.fill();

    var bmd2a = this.add.bitmapData(w10,w10);
    bmd2a.ctx.beginPath();
    bmd2a.ctx.rect(0,0,w10,w10);
    bmd2a.ctx.fillStyle = '#FF0000';
    bmd2a.ctx.fill();
    var area, currentImg, imgScale;

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
  },
  fluff: function(w,h){
    var fluff = this.add.text(this.world.centerX, h*2.1, "fluff");

    fluff.anchor.set(0.5);
    fluff.align = 'center';
  },
  changeMatrix3: function(){
    this.cache.addText('Matrix', null, {value:3});
  },
  changeMatrix4: function(){
    this.cache.addText('Matrix', null, {value:4});
  },
  changeMatrix5: function(){
    this.cache.addText('Matrix', null, {value:5});
  },
  createTopButtons: function(){
    var width = this.world.width/16;
    var bmd = this.add.bitmapData(width,width);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0,0,width,width);
    bmd.ctx.fillStyle = '#ff0000';
    bmd.ctx.fill();
    var homeText = this.add.text(0,0,'home');
    homeText.fontSize = width*0.3;
    homeText.anchor.set(0.5);

    var button = this.add.button(width*1.1, width*0.5,bmd,this.menu,this);
    button.anchor.set(0.5);
    button.addChild(homeText);

    var bmd2 = this.add.bitmapData(width,width);
    bmd2.ctx.beginPath();
    bmd2.ctx.rect(0,0,width,width);
    bmd2.ctx.fillStyle = '#00ff00';
    bmd2.ctx.fill();
    var creditText = this.add.text(0,0,'credits');
    creditText.fontSize = width*0.3;
    creditText.anchor.set(0.5);
    creditText.align = 'center';

    var button2 = this.add.button(this.world.width - width*1.1, width*0.5,bmd2,this.credits,this);
    button2.anchor.set(0.5);
    button2.addChild(creditText);
  },
  settings: function(){
    this.state.start('Settings');
  },
  menu: function(){
    this.state.start('Preload');
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