var $ideaTitle = $('[name=idea-title]');
var $ideaDescription = $('[name=idea-description');

$('#save-button').click(function(event) {
  var idea = new Idea (Date.now(), $ideaTitle.val(), $ideaDescription.val());

  if (`${$ideaTitle.val()}` == "" || `${$ideaDescription.val()}` == ""){
    return false;
  } else {
   event.preventDefault();
   prependIdea(idea);
   toLocalStorage(idea);
   inputReset();
 }
});

function Idea (id, title, body) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = 'quality: swill';
}

function prependIdea(idea) {
  $('#idea-list').prepend(
    `<article id="${idea.id}">
      <h2>${idea.title}</h2>
      <label for="remove-button">
        <button class="remove button"></button>
      </label>
      <p>${idea.body}</p>
      <label for="quality-up-button">
        <button class="quality-up button" name="quality-up-button"></button>
      </label>
      <label for="quality-down-button">
        <button class="quality-down button" name="quality-down-button"></button>
      </label>
      <h3>${idea.quality}</h3>
    </article>`
  );
};

function inputReset() {
  $ideaTitle.val('');
  $ideaDescription.val('');
  $ideaTitle.focus();
};

function toLocalStorage(idea) {
 var stringifiedIdea = JSON.stringify(idea);
 localStorage.setItem(idea.id, stringifiedIdea);
};

function pageLoad() {
 for (var i = 0; i < localStorage.length; i++) {
   var returnIdea = localStorage.getItem(localStorage.key(i));
   var parseIdea = JSON.parse(returnIdea);
   prependIdea(parseIdea)
   console.log(parseIdea);
 };
};

window.onload = function() {
 pageLoad();
};


$('#idea-list').on('click', '.remove', function(e) {
 $(this).closest('article').fadeOut(function() {
   $(this).remove();
 })
 localStorage.removeItem($(this).closest('article').attr('id'));
});

$('#idea-list').on('click', '.quality-up', function(e) {
  if ($(this).closest('label').siblings('h3').text() === ('quality: swill')) {
    $(this).closest('label').siblings('h3').text('quality: plausible');
  } else if ($(this).closest('label').siblings('h3').text() === ('quality: plausible')) {
   $(this).closest('label').siblings('h3').text('quality: genius');
 } 
});

$('#idea-list').on('click', '.quality-down', function(e) {
  if ($(this).closest('label').siblings('h3').text() === ('quality: genius')) {
    $(this).closest('label').siblings('h3').text('quality: plausible');
  } else if ($(this).closest('label').siblings('h3').text() === ('quality: plausible')) {
   $(this).closest('label').siblings('h3').text('quality: swill');
 } 
});

