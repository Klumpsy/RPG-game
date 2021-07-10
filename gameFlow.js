const updateBoxPlayer = document.querySelector(".updateBoxPlayer");
const updateBoxMonster = document.querySelector(".updateBoxMonster");
const updateBoxLoot = document.querySelector(".lootDrop");

//Start with new player and new Enemy
newPlayer();
addHeroImage();
createEnemy();
updateMonsterStats();
addMonsterImage()

//Check if defeat function
const checkForDefeatMonster = () => {
  if (newEnemy.hp === 0) {
      updateBoxPlayer.innerHTML = `You defeated ${newEnemy.name}!`;
      return true;  
    };
  };

const checkForDefeatMonsterAndPlayer = () => { 
  if (newEnemy.hp === 0 && player.hp ===0) { 
      updateBoxPlayer.innerHTML = `You defeated ${newEnemy.name}! But you died trying..`;
      return true;
  }
}

const checkForDefeatPlayer = () => {
  if (player.hp === 0 || player.hp < 0) {
    player.hp = 0;
    updateBoxMonster.innerHTML = `Oh no! ${newEnemy.name} defeated you!`;
    return true;
  }
};

//Creating new monster or boss depending on how many kills you have in the arena.
let defeatedMonsters = 0;

//stop everything once monster or player health hits 0
const resetAfterBattle = () => {
//Check if monster and player are both dead
  if (checkForDefeatMonsterAndPlayer()) {
    alert(
      `You defeated ${newEnemy.name} but died trying.. In total you defeated ${defeatedMonsters} monster(s) this round.. Try again!`
    );
    location.reload();

//Check if monster is defeated
  } else if (checkForDefeatMonster()) {
    let confirmNextEnemy = confirm(
      "Good job, you are victorious! Are you ready for the next battle?"
    );
    if (confirmNextEnemy === true) {
      defeatedMonsters++;
      player.exp = player.exp + newEnemy.exp;
      if (newEnemy.loot > 0) {
        player.hpPot = player.hpPot + newEnemy.loot;
        updateBoxLoot.innerHTML = `The killed ${newEnemy.name} dropped ${newEnemy.loot} Health Potion(s)!`;
      }
      updatePlayer();

      //Create new enemy or boss if old enemy is defeated and reset DOM info
      if (defeatedMonsters % 10 === 0 && defeatedMonsters !== 0) {
        createBoss();
        removeMonsterImage();
        updateMonsterStats();
        addMonsterImage();
      } else {
        createEnemy();
        removeMonsterImage();
        updateMonsterStats();
        addMonsterImage();
      }
      updateBoxPlayer.innerHTML = "";
      updateBoxMonster.innerHTML = "";

      //increase xp and level if needed
      if (player.exp >= player.expNeeded) {
        alert("You went lvl up!");
        player.exp = 0;
        player.lvl++;
        player.str++;
        player.totalHp = player.totalHp + 2;
        player.hp = player.totalHp;
        player.str = 3; 
        updatePlayer();
      }
    }
  //Check if player is defeated
  } else if (checkForDefeatPlayer()) {
    alert(
      `Sorry you lost, you defeated ${defeatedMonsters} monster(s) this round.. Try again!`
    );
    location.reload();
  }
};
