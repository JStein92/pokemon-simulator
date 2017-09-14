export class Player {
  constructor(name){
    this.name = name;
    this.myPokemon = [];
    this.selectedPokemon;
  }

  addPokemon(pokemon){
    this.myPokemon.push(pokemon);
  }

  attack(victim) {
    let damages = [];
    damages.push(this.getAttackDamage(victim));
    victim.hp -= damages[0];
    damages.push(this.attackBack(victim));
    this.selectedPokemon.hp -= damages[1];
    return damages;
  }

  attackBack(victim) {
    if (victim.hp > 0) {
      let dmgMultiplier = Math.floor((Math.random() * 20) + 80);
      let attackDmg =  Math.floor((victim.attack * (100/dmgMultiplier)/2) - this.selectedPokemon.defense/6);
      return attackDmg;
    }
    else return 0;
  }

  getAttackDamage(victim){
    let dmgMultiplier = Math.floor((Math.random() * 20) + 80);
    return Math.floor((this.selectedPokemon.attack * (100/dmgMultiplier)/2) - victim.defense/6);
  };
}
