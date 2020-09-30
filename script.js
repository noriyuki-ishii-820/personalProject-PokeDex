var userInput = "";

function randomValueGenerator() {
  max = 893;
  randomValue = Number(Math.floor(Math.random() * Math.floor(max)));
  console.log(randomValue);
  return;
}

function searchPokemon() {
  var userInput = Number($("#textInput").val().trim());
  var pokeURL = "https://pokeapi.co/api/v2/pokemon/" + userInput + "/";

  console.log(pokeURL);

  $("#pokemonNumber").text(userInput);

  $.ajax({
    url: pokeURL,
    method: "GET",
  }).then(function (response) {
    // display the name

    if (response.forms.length === 1) {
      var rawPokeName = response.forms[0].name;
    } else {
      var rawPokeName = response.name;
    }

    var pokeNameDisplay =
      rawPokeName.charAt(0).toUpperCase() + rawPokeName.slice(1);
    $("#pokemonName").text("Pokemon Name : " + pokeNameDisplay);

    // display the Japanese name

    $("#pokemonNameJa").empty();
    var pokeURLJa =
      "https://pokeapi.co/api/v2/pokemon-species/" + userInput + "/";

    console.log(pokeURLJa);

    $.ajax({
      url: pokeURLJa,
      method: "GET",
    }).then(function (response) {
      var pokemonNameJa = response.names[0].name;

      if (pokemonNameJa) {
        $("#pokemonNameJa").text("Japanese Name : " + pokemonNameJa);
      } else {
        $("#pokemonNameJa").remove();
      }
    });

    // display type(s)
    $("#pokemonType").empty();

    var rawType1 = response.types[0].type.name;
    var typeDisplay = rawType1.charAt(0).toUpperCase() + rawType1.slice(1);

    $("#pokemonType").text("Type : " + typeDisplay);

    if (response.types.length !== 1) {
      var rawType2 = response.types[1].type.name;
      var type2Display = rawType2.charAt(0).toUpperCase() + rawType2.slice(1);
      $("#pokemonType").append(" / " + type2Display);
    }

    //display height and weight

    var pokemonHeight = response.height / 10;
    var pokemonWeight = response.weight / 10;

    $("#pokemonHeight").text("Height : " + pokemonHeight + " m");
    $("#pokemonWeight").text("Weight : " + pokemonWeight + " kg");

    //display images

    var frontImageURL =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
      userInput +
      ".png";

    var shinyImageURL =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/" +
      userInput +
      ".png";

    var officialImageURL =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" +
      userInput +
      ".png";

    var dreamworldImageURL =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/" +
      userInput +
      ".svg";

    var genVIIIimageURL =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/" +
      userInput +
      ".png";

    $(".imageSpace").empty();

    var img5 = $("<img>");
    img5.attr("src", genVIIIimageURL);
    img5.attr("alt", "unavailable");
    img5.addClass("pokeIcon");
    $(".imageSpace").append(img5);

    var img = $("<img>");
    img.attr("src", frontImageURL);
    img.attr("alt", "unavailable");
    img.addClass("pokeIcon");
    $(".imageSpace").append(img);

    var img2 = $("<img>");
    img2.attr("src", shinyImageURL);
    img2.attr("alt", "unavailable");
    img2.addClass("pokeIcon");
    $(".imageSpace").append(img2);

    var img3 = $("<img>");
    img3.attr("src", officialImageURL);
    img3.attr("alt", "unavailable");
    img3.addClass("pokeIcon");

    if (response.sprites.other["official-artwork"].front_default !== null) {
      $(".imageSpace").append(img3);
    }

    var img4 = $("<img>");
    img4.attr("src", dreamworldImageURL);
    img4.attr("alt", "unavailable");
    img4.addClass("pokeIcon");

    if (response.sprites.other.dream_world.front_default !== null) {
      $(".imageSpace").append(img4);
    }

    // // you may also like

    // $(".likeResult").html("<h3>You may also like: </h3>");

    // for (i = 0; i < 3; i++) {
    //   max = 893;
    //   var randomValue = Math.floor(Math.random() * Math.floor(max));
    //   var randomPokeURL =
    //     "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/" +
    //     randomValue +
    //     ".png";

    //   var randomImg = $("<img>");
    //   var img5 = $("<img>");
    //   randomImg.attr("src", randomPokeURL);
    //   randomImg.addClass("pokeIcon");
    //   $(".likeResult").append(randomImg);

    // });
    //}
  });
}

function inputValidation() {
  var userInput = Number($("#textInput").val().trim());

  if (
    parseInt(userInput) > 0 &&
    parseInt(userInput) < 894 &&
    Number.isInteger(userInput)
  ) {
    searchPokemon();
  } else {
    alert(
      "The input is invalid. Please try again! Hint: Input must be a value between 0 and 893 and no decimals!"
    );
    $("#textInput").val("");
    return false;
  }
}

$("#submit").on("click", inputValidation);

$("#random").on("click", function (event) {
  event.preventDefault();
  randomValueGenerator();

  $("#textInput").val(randomValue);

  inputValidation();

  $("#textInput").val("");
});
