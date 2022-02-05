$(document).ready(function() {
  $("#tweet-text").on('keyup', function() {
  let tweetCount = $(this).val().length;
  $("output").text(140-tweetCount);
  let $tc = $(this).closest('.input-box').siblings('.bottomline').find('.counter').text(140 - tweetCount);
if (tweetCount <= 140) {
  $tc.removeClass('error');
} else {
  $tc.addClass('error');
}
});
}); 