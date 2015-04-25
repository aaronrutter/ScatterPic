var MyGame = MyGame || {};

MyGame.game = new Phaser.Game(1920, 1080, Phaser.AUTO, '');

MyGame.game.state.add('Boot', MyGame.Boot);

MyGame.game.state.add('MainMenu', MyGame.MainMenu);
MyGame.game.state.add('Settings', MyGame.Settings);
MyGame.game.state.add('ImageSelect', MyGame.ImageSelect);
MyGame.game.state.add('Preload', MyGame.Preload);
MyGame.game.state.add('GamePlay', MyGame.GamePlay);
MyGame.game.state.add('GameOver', MyGame.GameOver);

MyGame.game.state.start('Boot');