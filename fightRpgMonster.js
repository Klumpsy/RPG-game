//Ramom monster options Object - Names/Bosses/stats/Boss stats
const enemy = {
  enemy: ["Goblin", "Giant", "Werewolf"],
  boss: ["Goblin Leader", "Black Dragon"],
  loot: [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 3],
  hp: [12, 13, 14, 15, 16, 17],
  bossHp: [22, 23, 24, 25, 26, 27],
  str: [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 5],
  bossStr: [, 3, 3, 3, 3, 4, 4, 4, 5, 6, 7, 8],
  int: [1, 1, 1, 2, 2, 3, 3, 4, 5],
  bossInt: [3, 3, 3, 3, 4, 4, 4, 5, 5],
  def: [1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 4],
  bossDef: [3, 4, 4, 4, 4, 4, 5, 5, 6, 6, 7],

  getRandomEnemy(type) {
    return this[type][Math.floor(Math.random() * this[type].length)];
  },
};

//Function that Generates a random Monster Object;
const createEnemy = () => {
  newEnemy = {};

  newEnemy["name"] = enemy.getRandomEnemy("enemy");
  newEnemy["hp"] = enemy.getRandomEnemy("hp") + player.lvl;
  newEnemy["str"] = enemy.getRandomEnemy("str");
  newEnemy["int"] = enemy.getRandomEnemy("int");
  newEnemy["def"] = enemy.getRandomEnemy("def");
  newEnemy["loot"] = enemy.getRandomEnemy("loot");
  //Assign exp to newEnemy object
  if (newEnemy.name === "Goblin") {
    newEnemy["exp"] = 25;
  } else if (newEnemy.name === "Giant") {
    newEnemy["exp"] = 50;
  } else if (newEnemy.name === "Werewolf") {
    newEnemy["exp"] = 30;
  }
  return newEnemy;
};

//Function that creates a random Boss enemy Object
const createBoss = () => {
  newEnemy = {};

  newEnemy["name"] = enemy.getRandomEnemy("boss");
  newEnemy["hp"] = enemy.getRandomEnemy("bossHp");
  newEnemy["str"] = enemy.getRandomEnemy("bossStr");
  newEnemy["int"] = enemy.getRandomEnemy("bossInt");
  newEnemy["def"] = enemy.getRandomEnemy("bossDef");
  //Assign exp to newEnemy object
  if (newEnemy.name === "Goblin leader") {
    newEnemy["exp"] = 150;
  } else if (newEnemy.name === "Black Dragon") {
    newEnemy["exp"] = 200;
  }
  return newEnemy;
};

//add and remove monster image from img container DOM
let monsterImage = document.querySelector(".monsterImage");
let img = document.createElement('img');
 
const addMonsterImage = () => {
  img.id = "monsterImage"; 
  if (newEnemy.name === 'Goblin') { 
    img.src = 'goblin.png'; 
  } else if (newEnemy.name === 'Giant') { 
    img.src = 'giant.png'; 
  } else if (newEnemy.name === 'Werewolf') { 
    img.src = 'werewolf.png'; 
  } else if (newEnemy.name === 'Ancient Werewolf') { 
    img.src = 'ancientWerewolf.png'; 
  } else if (newEnemy.name === 'Black Dragon') { 
    img.src = 'blackDragon.png'; 
  }
  monsterImage.appendChild(img);
}

const removeMonsterImage = () => { 
  monsterImage.removeChild(img);
}

//Function that updates the monster stats in the DOM;
const updateMonsterStats = () => {
  const enemyContainer = document.querySelector("#enemyChar");
  const monsterImage = document.querySelector(".monsterImage");

  enemyContainer.innerHTML = `Name: ${newEnemy.name} <br> Hp: ${newEnemy.hp}
  <br> Str: ${newEnemy.str} <br> Int: ${newEnemy.int} <br> Def: ${newEnemy.def}`;

};

//Monster attack function depending on the monster name
const monsterAttack = (name) => {
  //Is the name of the monster Goblin? Then a random attack will be triggered from the attackArray

  if (name === "Goblin") {
    const goblinAttack = ["swipe", "punch"];
    const randomGoblinAttack =
      goblinAttack[Math.floor(Math.random() * goblinAttack.length)];

    //Attack one for Goblin: Swipe
    if (randomGoblinAttack === "swipe") {
      const swipeDamage = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 4];
      const swipeAmount = [1, 2, 3, 4];
      let swipeTimes = 0;
      let totalDamage = [];
      do {
        let swipeAttack =
          swipeDamage[Math.floor(Math.random() * swipeDamage.length)];
        player.hp = player.hp - swipeAttack;
        totalDamage.push(swipeAttack);
        swipeTimes++;
      } while (
        swipeTimes < swipeAmount[Math.floor(Math.random() * swipeAmount.length)]
      );
      updateBoxMonster.innerHTML = `${name} used ${randomGoblinAttack} on you! It hit ${totalDamage.length} time(s): ${totalDamage}`;
      //Attack two for Goblin: Punch
    } else if (randomGoblinAttack === "punch") {
      const punchDamage = [0, 0, 0, 0, 1, 1, 1, 2, 2, 3, 3, 4, 4, 7, 8];
      const punchAttack =
        punchDamage[Math.floor(Math.random() * punchDamage.length)];
      if (punchAttack > 4) {
        player.hp = player.hp - punchAttack;
        updateBoxMonster.innerHTML = `${name} used '${randomGoblinAttack}' on you! CRITICAL HIT! It hit for '${punchAttack}' damage.`;
      } else {
        player.hp = player.hp - Math.floor((punchAttack * 2) - newEnemy.str);
        updateBoxMonster.innerHTML = `${name} used '${randomGoblinAttack}' on you! It hit for '${punchAttack}' damage.`;
      }
    }
    //Is the name of the monster Giant? Then a random attack will be triggered from the AttackArray
  } else if (name === "Giant") {
    const giantAttack = ["stomp", "stomp", "stomp", "CRUSH"];
    const randomGiantAttack =
      giantAttack[Math.floor(Math.random() * giantAttack.length)];

    //Attack one for Giant: stomp
    if (randomGiantAttack === "stomp") {
      const stompDamage = [0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4];
      const stompAttack =
        stompDamage[Math.floor(Math.random() * stompDamage.length)];
      player.hp = player.hp - stompAttack;
      if (stompAttack > 4) {
        updateBoxMonster.innerHTML = `${name} used '${randomGiantAttack}' on you! CRITICAL HIT! It hit for '${stompAttack}' damage.`;
      } else {
        updateBoxMonster.innerHTML = `${name} used '${randomGiantAttack}' on you! It hit for '${stompAttack}' damage.`;
      }
      //Attack two for Giant: CRUSH
    } else if (randomGiantAttack === "CRUSH") {
      const crushDamage = [5, 6, 7];
      const crushAttack =
        crushDamage[Math.floor(Math.random() * crushDamage.length)];
      player.hp = player.hp - crushAttack;
      updateBoxMonster.innerHTML = `${name} used '${randomGiantAttack}' on you! It hit for '${crushAttack}' damage.`;
    }
    //Is the name of the monster Werewolf? Then a random attack will be triggered from the attackArray
  } else if (name === "Werewolf" || name === "Ancient Werewolf") {
    const wereWolfAttack = ["rake", "bite", "bite", "drink blood", "transform"];
    const randomWerewolfAttack =
      wereWolfAttack[Math.floor(Math.random() * wereWolfAttack.length)];

    //Attack one for wereWolf: rake
    if (randomWerewolfAttack === "rake") {
      const rakeDamage = [0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 6];
      const rakeAttack =
        rakeDamage[Math.floor(Math.random() * rakeDamage.length)];
        if(newEnemy.name === 'Ancient Werewolf') { 
          player.hp = player.hp - (rakeAttack + 3);
        } else {
      player.hp = player.hp - rakeAttack 
        }
      if (rakeAttack > 5) {
        updateBoxMonster.innerHTML = `${name} used '${randomWerewolfAttack}' on you! CRITICAL HIT! It hit for '${rakeAttack}' damage.`;
      } else {
        updateBoxMonster.innerHTML = `${name} used '${randomWerewolfAttack}' on you! It hit for '${rakeAttack}' damage.`;
      }
      //Attack two for wereWolf: bite
    } else if (randomWerewolfAttack === "bite") {
      const biteDamage = [0, 0, 0, 5, 6, 6, 7];
      const biteAttack =
        biteDamage[Math.floor(Math.random() * biteDamage.length)];
        if (newEnemy.name === 'Ancient Werewolf') { 
          player.hp = player.hp - (biteAttack + 2);
        } else {
      player.hp = player.hp - biteAttack
        }
      updateBoxMonster.innerHTML = `${name} used '${randomWerewolfAttack}' on you! It hit for '${biteAttack}' damage.`;

      //Attack Three for wereWolf: drink Blood
    } else if (randomWerewolfAttack === "drink blood") {
      const bloodHeal = [3, 3, 4, 5, 8];
      const bloodHealAmount =
        bloodHeal[Math.floor(Math.random() * bloodHeal.length)];
      newEnemy.hp = newEnemy.hp + bloodHealAmount;
      updateBoxMonster.innerHTML = `${name} used '${randomWerewolfAttack}' It healed for '${bloodHealAmount}' health`;
       //Attack Four for wereWolf: Transform
    } else if (randomWerewolfAttack === "transform") {
      if (newEnemy.name !== 'Ancient Werewolf') {
      newEnemy.name = 'Ancient Werewolf';
      removeMonsterImage();
      addMonsterImage();
      updateBoxMonster.innerHTML = `After looking at the moon the Werewolf tranformed into an '${newEnemy.name}'!`;
      } else { 
      newEnemy.name = 'Werewolf'; 
      removeMonsterImage();
      addMonsterImage();
      updateBoxMonster.innerHTML = `The ${newEnemy.name} calmed down and transformed back.. but what was that thing?`;  
      }
    }
  }
  checkForDefeatPlayer();
};