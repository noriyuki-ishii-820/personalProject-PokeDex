var userInput = "";

function searchPokemon() {
  var userInput = $("#textInput").val().trim();
  var pokeURL = "https://pokeapi.co/api/v2/pokemon/" + userInput + "/";

  $.ajax({
    url: pokeURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
  });
}

$("#submit").on("click", function (event) {
  event.preventDefault();
  var userInput = Number($("#textInput").val().trim());

  console.log(userInput);

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
