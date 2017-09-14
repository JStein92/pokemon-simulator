import { Pokemon } from './../js/pokemon.js';
import { Player } from './../js/player.js';

$(document).ready(function() {
  const newPlayer = new Player();
  let myNewPokemon;
  let thisId;

  $('#throwPokeball').submit(function(event){
    event.preventDefault();
    if (myNewPokemon.hp > 0 && myNewPokemon.caught==false)
    {
      $("#throwPokeball").hide()
      $('#myPokemonWrapper').show();
      newPlayer.addPokemon(myNewPokemon);
      $('.myPokemon').text('');
      for (var i = 0; i < newPlayer.myPokemon.length; i++) {
        $('.myPokemon').append(
        `<div class = 'myNewPokemon' id = '${newPlayer.myPokemon[i].id}'>
        <h3>${newPlayer.myPokemon[i].name}</h3>
        <p><img src ='${newPlayer.myPokemon[i].img}'></p>
        </div>`);

        if (newPlayer.myPokemon[i].dead){
          $('.myPokemon').append()
        }

        $(".myNewPokemon").last().click(function() {
          thisId = $(this).attr('id');

          for (var i = 0; i < newPlayer.myPokemon.length; i++) {
            if (newPlayer.myPokemon[i].id == thisId) {
              newPlayer.selectedPokemon = newPlayer.myPokemon[i];

              if (newPlayer.selectedPokemon.hp > 0){
                  $('#fightButton').show();
                  $(".mySelectedPokemon").text('');
                  $(".mySelectedPokemon").append(`
                    <h1 id = 'selectedPokemonName'>${newPlayer.myPokemon[i].name}</h1>
                    <p><img src ='${newPlayer.myPokemon[i].img}' id = 'selectedPokemonImg'></p>
                    <h3 id="selectedHP">HP: ${newPlayer.myPokemon[i].hp}</h3>
                   <div id = selectedStatBlock>
                   <p>Weight: ${newPlayer.myPokemon[i].weight}</p>
                   <p>Speed: ${newPlayer.myPokemon[i].speed}</p>
                   <p>Defense: ${newPlayer.myPokemon[i].defense}</p>
                   <p>Attack: ${newPlayer.myPokemon[i].attack}</p>
                   </div>
                   `);

                   for (var j = 0; j < newPlayer.myPokemon[i].types.length; j++) {
                     $(".mySelectedPokemon").append(`<p>Type ${j+1}: ${newPlayer.myPokemon[i].types[j].type.name}</p>`);
                   }
                }
              }

          }
          $("#selectedPokemonWrapper").show();
          $("#selectedPokemonWrapper").css("display", "inline-block");
        });
      }
        $(".wildPokemon").text(`You caught ${myNewPokemon.name}!`);
        myNewPokemon.caught = true;
    }
    else {
        $('#battleLog').text("You can't catch that!");
    }
  });

  $("#fight").submit(function(event) {
    event.preventDefault();
    if (myNewPokemon.caught==false){
  $('#battleLog').show();
      let damages = newPlayer.attack(myNewPokemon);

      $("#wildHP").text(`HP: ${myNewPokemon.hp}`);

      if (newPlayer.selectedPokemon.hp <= 0){
        newPlayer.selectedPokemon.dead = true;
        $(".mySelectedPokemon").text("DEAD");
        $('#fightButton').hide();
      }

      $("#selectedHP").text(`HP: ${newPlayer.selectedPokemon.hp}`);
      if(myNewPokemon.hp < 1) {
        $("#throwPokeball").hide()
        $(".wildPokemon").text("DEAD");
      }
      //console.log(newPlayer.getAttackDamage(myNewPokemon));
      $('#battleLog').text('');
      $('#battleLog').append(`<p>${newPlayer.selectedPokemon.name} attacked wild ${myNewPokemon.name} for ${damages[0]} damage!</p>`);
      if (myNewPokemon.hp < 1) {
        $('#battleLog').append(`${myNewPokemon.name} is dead!`);
      } else {
        $('#battleLog').append(`<p>${myNewPokemon.name} attacked your ${newPlayer.selectedPokemon.name} for ${damages[1]} damage!</p>`);
      }

    }
  });



  $('#getRandom').submit(function(event) {
    event.preventDefault();


      $("#throwPokeball").show()
    $("#wildPokemonWrapper").show();
    $("#wildPokemonWrapper").css("display", "inline-block");
    let pokePromise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `http://pokeapi.co/api/v2/pokemon/${Math.floor((Math.random() * 721) + 1)}/`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });

    pokePromise.then(function(response) {
      let body = JSON.parse(response);
      let name = body.name;
      let weight = body.weight;
      let types = body.types;
      let speed = body.stats[0].base_stat;
      let defense = body.stats[3].base_stat;
      let attack = body.stats[4].base_stat;
      let hp = body.stats[5].base_stat;
      let img = body.sprites.front_default;
      myNewPokemon = new Pokemon(name, weight, types, speed, defense, attack, hp, img);
      $('.wildPokemon').text('');
      $(".wildPokemon").append(`
        <h1 id = 'wildPokemonName'>${myNewPokemon.name}</h1>
        <p><img src ='${myNewPokemon.img}' id = 'wildPokemonImg'></p>
        <h3 id="wildHP">HP: ${myNewPokemon.hp}</h3>
       <div id = statBlock>
       <p>Weight: ${myNewPokemon.weight}</p>
       <p>Speed: ${myNewPokemon.speed}</p>
       <p>Defense: ${myNewPokemon.defense}</p>
       <p>Attack: ${myNewPokemon.attack}</p>
       </div>
       `);

      for (var i = 0; i < myNewPokemon.types.length; i++) {
        $(".wildPokemon").append(`<p>Type ${i+1}: ${myNewPokemon.types[i].type.name}</p>`);
      }


    }, function(error) {
      alert(':(');
    });
  });
});
