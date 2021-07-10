const playerContainer = document.querySelector("#playerChar");

//Player class
let askPlayerName = prompt(
  "Hello and welcome to the arena hero, what is your name?"
);

class Player {
  constructor(name) {
    this.name = name;
    this.hp = 20;
    this.totalHp = 20;
    this.hpPot = 3;
    this.lvl = 1;
    this.def = 3;
    this.int = 4;
    this.str = 2;
    this.exp = 0;
    this.expNeeded = 100;
  }

  updatePlayer() {
    return `
        Name: ${this.name} <br>
        Hp: ${this.hp}/${this.totalHp} <br>
        HealthPotion: ${this.hpPot} <br>
        Lvl: ${this.lvl} <br>
        Str: ${this.str} <br>
        Int: ${this.int} <br>
        Def: ${this.def} <br>
        Next lvl: ${this.exp}/${this.expNeeded} <br>
        `;
  }
  slashAttack() {
    const slashAttack = Math.floor(
      Math.random() * (player.str + Math.random() * 5)
    );
    if (newEnemy.hp > 0) {
      newEnemy.hp = newEnemy.hp - slashAttack + (newEnemy.def - 2);
      if (newEnemy.hp < 0) {
        newEnemy.hp = 0;
      }
    }
    updateBoxPlayer.innerHTML = `You slashed enemy ${newEnemy.name} for ${slashAttack} damage!`;
  }

  meditate() {
    player.str = player.str + 1;
    updateBoxPlayer.innerHTML = `You gained 1 Strength`;
  }
  shoot() {
    const shootArrow = Math.floor(Math.random() * player.str + 2);
    if (newEnemy.hp > 0) {
      newEnemy.hp = newEnemy.hp - shootArrow + (newEnemy.def - 2);
      if (newEnemy.hp < 0) {
        newEnemy.hp = 0;
      }
    }
    updateBoxPlayer.innerHTML = `You shot enemy ${newEnemy.name} for ${shootArrow} damage!`;
  }

  heal() {
    if (player.hpPot !== 0) {
      if (player.hp === player.totalHp) {
        updateBoxPlayer.innerHTML = `You are already full health!`;
      } else { 
        player.hp = player.totalHp;
        player.hpPot--;
        updateBoxPlayer.innerHTML = `You healed yourself!`;
      }
    } else {
      updateBoxPlayer.innerHTML = `You have no healing potions left!`;
    }
  }
}

//Creating new player
const newPlayer = () => {
  player = new Player(askPlayerName);
  playerContainer.innerHTML = player.updatePlayer();
};

//Update player stats
const updatePlayer = () => {
  playerContainer.innerHTML = player.updatePlayer();
};

//Add images to monster and player function 
const addHeroImage = () => { 
  let playerImage = document.querySelector(".playerImage");
  let img = document.createElement('img'); 
  img.id = "playerImage";
  img.src = 'hero.png'; 
  playerImage.appendChild(img);
}

//player attack
const slashAttack = document.querySelector(".slashAttack");
const meditate = document.querySelector(".shieldBlock");
const shootArrow = document.querySelector(".shootArrow");
const heal = document.querySelector(".heal");

slashAttack.addEventListener("click", () => {
  player.slashAttack();
  monsterAttack(newEnemy.name);
  updateMonsterStats();
  updatePlayer();
  resetAfterBattle();
});

meditate.addEventListener("click", () => {
  player.meditate();
  monsterAttack(newEnemy.name);
  updateMonsterStats();
  updatePlayer();
  resetAfterBattle();
});

shootArrow.addEventListener("click", () => {
  player.shoot();
  monsterAttack(newEnemy.name);
  updateMonsterStats();
  updatePlayer();
  resetAfterBattle();
});

heal.addEventListener("click", () => {
  player.heal();
  updatePlayer();
  updateMonsterStats();
  resetAfterBattle();
});
