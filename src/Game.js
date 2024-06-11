// src/components/Game.js
import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';
import { auth, firestore } from './firebaseConfig';

const Game = () => {
  const [points, setPoints] = useState(0);

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
      this.load.image('sky', 'assets/sky.png');
      this.load.image('ground', 'assets/platform.png');
      this.load.image('coin', 'assets/coin.png');
      this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    function create() {
      this.add.image(400, 300, 'sky');
      const platforms = this.physics.add.staticGroup();
      platforms.create(400, 568, 'ground').setScale(2).refreshBody();
      platforms.create(600, 400, 'ground');
      platforms.create(50, 250, 'ground');
      platforms.create(750, 220, 'ground');
      
      const player = this.physics.add.sprite(100, 450, 'dude');
      player.setBounce(0.2);
      player.setCollideWorldBounds(true);
      this.physics.add.collider(player, platforms);

      const coins = this.physics.add.group({
        key: 'coin',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
      });

      coins.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      });

      this.physics.add.collider(coins, platforms);
      this.physics.add.overlap(player, coins, collectCoin, null, this);
      
      function collectCoin(player, coin) {
        coin.disableBody(true, true);
        // Update points in Firestore
        setPoints((prevPoints) => {
          const newPoints = prevPoints + 10;
          const user = auth.currentUser;
          if (user) {
            firestore.collection('users').doc(user.uid).update({
              points: newPoints,
            });
          }
          return newPoints;
        });
      }

      this.cursors = this.input.keyboard.createCursorKeys();
    }

    function update() {
      const cursors = this.cursors;
      const player = this.player;

      if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
      } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
      } else {
        player.setVelocityX(0);
        player.anims.play('turn');
      }

      if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
      }
    }
  }, []);

  return (
    <div id="game-container">
      <h2>Points: {points}</h2>
      <div id="phaser-game"></div>
    </div>
  );
};

export default Game;
