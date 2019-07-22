function Fighter(props) {
  const totalHP = props.hp;
  const max = 100;
  const combatHistory = {
    wins: 0,
    loss: 0
  };

  this.getName = () => props.name;
  this.getDamage = () => props.damage;
  this.getAgility = () => props.agility;
  this.getHealth = () => props.hp;
  this.dealDamage = healthpoint => {
    if (props.hp - healthpoint < 0) {
      props.hp = 0;
    } else {
      props.hp -= healthpoint;
    }
  };
  this.attack = rival => {
    const successRate = Math.floor(Math.random() * max) > rival.getAgility();
    if (successRate) {
      console.log(`${this.getName()} make ${this.getDamage()} damage to ${rival.getName()}`);
      rival.dealDamage(this.getDamage());
    } else {
      console.log(`${this.getName()} attack missed`);
    }
    if (this.getHealth() <= 0) {
      props.hp = 0;
      this.addLoss();
      rival.addWin();
    }
  };
  this.logCombatHistory = () => {
    console.log(`Name: ${this.getName()}, Wins: ${combatHistory.wins} Losses: ${combatHistory.loss}`);
  };
  this.dealDamage = healthpoint => {
    if (props.hp - healthpoint < 0) {
      props.hp = 0;
    } else {
      props.hp -= healthpoint;
    }
  };
  this.heal = healthpoint => {
    if (props.hp + healthpoint > totalHP) {
      props.hp = totalHP;
    } else {
      props.hp += healthpoint;
    }
  };

  this.addWin = () => combatHistory.wins++;
  this.addLoss = () => {
    combatHistory.loss++;
  };
}

function battle(fighter1, fighter2) {
  if (fighter1.getHealth() <= 0) {
    console.log(`${fighter1.getName()} is dead and cant fight.`);
  } else if (fighter2.getHealth() <= 0) {
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
