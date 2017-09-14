let id = 1;

export class Pokemon{
  constructor(name, weight, types, speed, defense, attack, hp, img) {
    this.name = name;
    this.weight = weight;
    this.types = types;
    this.speed = speed;
    this.defense = defense;
    this.attack = attack;
    this.hp = hp;
    this.img = img;
    this.id = id++;
    this.caught = false;
    this.dead = false;
  }
}
