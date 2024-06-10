import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { firestore, auth } from './firebase';

const Game = () => {
  const gameContainer = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 300 },
          debug: false
        }
      },
      scene: {
        preload: preload,
        create: create,
        update: update
      }
    };

    const game = new Phaser.Game(config);

    function preload() {
      this.load.image('platform', 'path/to/platform.png');
      this.load.image('player', 'path/to/player.png');
      this.load.image('coin', 'path/to/coin.png');
    }

    function create() {
      this.platforms = this.physics.add.staticGroup();
      this.platforms.create(400, 568, 'platform').setScale(2).refreshBody();

      this.player = this.physics.add.sprite(100, 450, 'player');
      this.player.setBounce(0.2);
      this.player.setCollideWorldBounds(true);

      this.physics.add.collider(this.player, this.platforms);

      this.coins = this.physics.add.group({
        key: 'coin',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
      });

      this.coins.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      });

      this.physics.add.collider(this.coins, this.platforms);
      this.physics.add.overlap(this.player, this.coins, collectCoin, null, this);

      this.score = 0;
      this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    }

    function update() {
      const cursors = this.input.keyboard.createCursorKeys();

      if (cursors.left.isDown) {
        this.player.setVelocityX(-160);
      } else if (cursors.right.isDown) {
        this.player.setVelocityX(160);
      } else {
        this.player.setVelocityX(0);
      }

      if (cursors.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-330);
      }
    }

    function collectCoin(player, coin) {
      coin.disableBody(true, true);
      this.score += 10;
      this.scoreText.setText('Score: ' + this.score);

      if (auth.currentUser) {
        const userRef = firestore.collection('users').doc(auth.currentUser.uid);
        userRef.get().then(doc => {
          if (doc.exists) {
            userRef.update({ score: this.score });
          } else {
            userRef.set({ score: this.score });
          }
        });
      }
    }

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div ref={gameContainer} />;
};

export default Game;
