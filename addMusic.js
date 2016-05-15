"use strict";

function addMusic(){
  
  // Make addDiv visible by adding "visible" class and removing "hidden" class
  $("#add1").addClass("visible").removeClass("hidden");
  // Make viewDiv hidden by adding "hidden" class and removing "visible" class
  $("#view1").addClass("hidden").removeClass("visible");
  
  // Get elements of text boxes and Add button
  let $songNameText = $("#song");
  let $artistNameText = $("#artist");
  let $albumNameText = $("#album");

  // Initialize/empty the textboxes
  $songNameText.val("");
  $artistNameText.val("");
  $albumNameText.val("");

  // Add click function for Click Event to Add Button
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