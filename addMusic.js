"use strict";

function addMusic(){
  // Get element of Add Music div 
  // let addDiv = document.getElementById("add1");
  // Make addDiv visible by adding "visible" class
  $("#add1").addClass("visible").removeClass("hidden");
  // addDiv.classList.add("visible");
  // Make addDiv visible by removing "hidden" class
  // addDiv.classList.remove("hidden");
  
  // Get element of View List div
  // let viewDiv = document.getElementById("view1");
  // Make viewDiv hidden by adding "hidden" class
  $("#view1").addClass("hidden").removeClass("visible");
  // viewDiv.classList.add("hidden");
  // Make viewDiv hidden by removing "visible" class
  // viewDiv.classList.remove("visible");

  // Get elements of text boxes and Add button
  // var addButton = document.getElementById("addButton");
  let $songNameText = $("#song");
  let $artistNameText = $("#artist");
  let $albumNameText = $("#album");

  // Initialize/empty the textboxes
  $songNameText.val("");
  $artistNameText.val("");
  $albumNameText.val("");

  // Add Event Listener for Click Event to Add Button
  // addButton.addEventListener("click", function(){
  $("#addButton").click(function(){
    // Check if any textboxes are empty
    if (($songNameText.val().length !== 0) && ($artistNameText.val().length !== 0) && ($albumNameText.val().length !== 0)){
      // Put text string together
      let songsListEntry = $songNameText.val() + " - by " + $artistNameText.val() + " on the album " + $albumNameText.val();
      // Add text to end of array
      songs.push(songsListEntry);
      alert("Song information added!");
      // Reset fields for next song
      $songNameText.val("");
      $artistNameText.val("");
      $albumNameText.val("");
    }
  });
}