function Fighter(props) {
  const combatHistory = {
    wins: 0,
    loss: 0
  };
  const max = 100;
  let fighterFeature = props;
  const { name: fighterName, damage: fighterDamage, agility: fighterAgility } = fighterFeature;
  const { hp: totalHP } = props;
  let fighterHealt = totalHP;

  function getName() {
    return fighterName;
  }

  function getDamage() {
    return fighterDamage;
  }

  function getAgility() {
    return fighterAgility;
  }

  function getHealth() {
    return fighterHealt;
  }

  function attack(rivalFeature) {
    const { name: rivalName, damage: rivalDamage } = rivalFeature.fighterFeature;
    const successRate = Math.floor(Math.random() * max) > fighterAgility;

    if (successRate) {
      console.log(`${rivalName} make ${rivalDamage} damage to ${fighterName}`);
      fighterHealt -= rivalDamage;
    } else {
      console.log(`${rivalName} attack missed`);
    }
    if (fighterHealt <= 0) {
      fighterHealt = 0;
      addLoss();
      rivalFeature.addWin();
    }
  }

  function logCombatHistory() {
    return `Name: ${fighterName}, Wins: ${combatHistory.wins} Losses: ${combatHistory.loss}`;
  }

  function dealDamage(healthpoint) {
    fighterHealt = 0;
    if (fighterHealt - healthpoint < 0) {
      return fighterHealt;
    } else {
      fighterHealt -= healthpoint;
      return fighterHealt;
    }
  }

  function heal(healthpoint) {
    if (fighterHealt + healthpoint > totalHP) {
      return totalHP;
    } else {
      fighterHealt += healthpoint;
      return fighterHealt;
    }
  }

  function addWin() {
    return combatHistory.wins++;
  }

  function addLoss() {
    if (fighterHealt <= 0) {
      return combatHistory.loss++;
    }
  }

  return {
    getName,
    getDamage,
    getAgility,
    getHealth,
    attack,
    heal,
    fighterHealt,
    fighterFeature,
    logCombatHistory,
    addWin,
    addLoss,
    combatHistory,
    dealDamage
  };
}

function battle(fighter1, fighter2) {
  if (fighter1.getHealth() < 0) {
    console.log(`${fighter1.getName()} is dead and cant fight.`);
  } else if (fighter2.getHealth() < 0) {
    console.log(`${fighter2.getName()} is dead and cant fight.`);
  } else {
    while (fighter1.getHealth() > 0 && fighter2.getHealth() > 0) {
      fighter1.attack(fighter2);
      fighter2.attack(fighter1);
    }
  }
}

const fighter1 = new Fighter({ name: 'John', damage: 20, agility: 25, hp: 100 });
const fighter2 = new Fighter({ name: 'Jim', damage: 10, agility: 40, hp: 120 });

battle(fighter1, fighter2);
