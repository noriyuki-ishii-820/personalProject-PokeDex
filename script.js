var userInput = "";

function searchPokemon() {
  var userInput = Number($("#textInput").val().trim());
  var pokeURL = "https://pokeapi.co/api/v2/pokemon/" + userInput + "/";

  $("#pokemonNumber").text(userInput);

  $.ajax({
    url: pokeURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    // display the name

    if (response.forms.length === 1) {
      var rawPokeName = response.forms[0].name;
    } else {
      var rawPokeName = response.name;
    }

    console.log(rawPokeName);

    var pokeNameDisplay =
      rawPokeName.charAt(0).toUpperCase() + rawPokeName.slice(1);
    $("#pokemonName").text("Pokemon Name : " + pokeNameDisplay);

    // display the Japanese name

    $("#pokemonNameJa").empty();
    var pokeURLJa =
      "https://pokeapi.co/api/v2/pokemon-species/" + userInput + "/";

    $.ajax({
      url: pokeURLJa,
      method: "GET",
    }).then(function (response) {
      var pokemonNameJa = response.names[0].name;
      console.log(pokeURLJa);
      console.log(pokemonNameJa);

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

    console.log(frontImageURL);

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

    var img = $("<img>");
    img.attr("src", frontImageURL);
    img.attr("alt", "this image is unavailable for this pokemon yet");
    img.addClass("pokeIcon");
    $(".imageSpace").append(img);

    var img2 = $("<img>");
    img2.attr("src", shinyImageURL);
    img2.attr("alt", "this image is unavailable for this pokemon yet");
    img2.addClass("pokeIcon");
    $(".imageSpace").append(img2);

    {
      var img3 = $("<img>");
      img3.attr("src", officialImageURL);
      img3.attr("alt", "this image is unavailable for this pokemon yet");
      img3.addClass("pokeIcon");
      $(".imageSpace").append(img3);
    }

    var img4 = $("<img>");
    img4.attr("src", dreamworldImageURL);
    img4.attr("alt", "this image is unavailable for this pokemon yet");
    img4.addClass("pokeIcon");
    $(".imageSpace").append(img4);

    var img5 = $("<img>");
    img5.attr("src", genVIIIimageURL);
    img5.attr("alt", "this image is unavailable for this pokemon yet");
    img5.addClass("pokeIcon");
    $(".imageSpace").append(img5);
  });
}

$("#submit").on("click", function (event) {
  event.preventDefault();

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
});
