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
    console.log(this);
  },
  imgSelect: function(){
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
  }
};