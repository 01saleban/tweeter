const countNumber = 140;
function updateCounter() {
  const counter = $("#tweet-text").val().length;
  $('.counter').text(countNumber - counter);
  if ($('.counter').text() < 0) {
    $('.counter').addClass('error');
  } else {
    return $('.counter').removeClass('error');
  }
}

$(document).ready(function () {
  $("#tweet-text").on('input', updateCounter);
});