function Pokemon() {
  'use strict';

  this.type = null;
  this.species = null;
  this.fly = false;

  this.getType = function() {
    return this.type;
  };

  this.getSpecie = function() {
    return this.species;
  };

  this.canFly = function() {
    return this.fly;
  };

  this.getPokemonType = function() {
    return this.constructor.name;
  };
}

function Charmander() {
  Pokemon.call(this);
  this.type = 'Fire';
  this.species = 'Lizard Pokémon';

  this.evolve = function() {
    return new Charmeleon();
  };
}

function Charmeleon() {
  Pokemon.call(this);
  this.type = 'Fire';
  this.species = 'Flame Pokémon';

  this.evolve = function() {
    return new Charizard();
  };
}

function Charizard() {
  'use strict';

  Pokemon.call(this);
  this.type = 'Fire';
  this.species = 'Flame Pokémon';
  this.fly = true;

  this.evolve = function() {
    return this;
  };
}

function Pichu() {
  'use strict';

  Pokemon.call(this);
  this.type = 'Electric';
  this.species = 'Mouse Pokémon';

  this.evolve = function() {
    return new Pikachu();
  };
}

function Pikachu() {
  'use strict';

  Pokemon.call(this);
  this.type = 'Electric';
  this.species = 'Mouse Pokémon';

  this.evolve = function() {
    return new Raichu();
  };
}

function Raichu() {
  'use strict';

  Pokemon.call(this);
  this.type = 'Electric';
  this.species = 'Mouse Pokémon';

  this.evolve = function() {
    return this;
  };
}

function Elekid() {
  'use strict';

  Pokemon.call(this);
  this.type = 'Electric';
  this.species = 'Electric Pokémon';
  this.anger = false;
  this.hasAnger = function() {
    return this.anger;
  };
  this.evolve = function() {
    return new Electabuzz();
  };
}

function Electabuzz() {
  'use strict';

  Pokemon.call(this);
  this.type = 'Electric';
  this.species = 'Electric Pokémon';
  this.anger = true;
  this.hasAnger = function() {
    return this.anger;
  };
  this.evolve = function() {
    return new Electivire();
  };
}

function Electivire() {
  'use strict';

  Pokemon.call(this);
  this.type = 'Electric';
  this.species = 'Electric Pokémon';
  this.anger = true;
  this.hasAnger = function() {
    return this.anger;
  };
  this.evolve = function() {
    return this;
  };
}

const charmander = new Charmander();
const charmeleon = new Charmeleon();
const charizard = new Charizard();

console.log(charmander.getType());
console.log(charmander.getType() === charmeleon.getType());
console.log(charmeleon.getType() === charizard.getType());

console.log(charmander.evolve().constructor === Charmeleon);
console.log(charmeleon.evolve().constructor === Charizard);

console.log(charmander.getSpecie());
console.log(charmeleon.getSpecie());
console.log(charizard.getSpecie() === charmeleon.getSpecie());

console.log(charmander.canFly());
console.log(charmander.canFly() === charmeleon.canFly());
console.log(charizard.canFly());

const pichu = new Pichu();
console.log(pichu.getPokemonType());

const pikachu = pichu.evolve();
console.log(pikachu.getPokemonType());
console.log(pikachu.constructor === Pikachu);
const raichu = pikachu.evolve();
console.log(raichu.getPokemonType());
console.log(raichu.constructor === Raichu);

const raichu2 = raichu.evolve();
console.log(raichu2 === raichu);

const elekid = new Elekid();
const electivire = new Electivire();

const electabuzz = elekid.evolve();
console.log(elekid.getPokemonType());
console.log(electabuzz.constructor === Electabuzz);
console.log(electabuzz.hasAnger());
