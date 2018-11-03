$('#go').on('click', function(){
  let params = {
    len: {
      min: $('#min').val(),
      max: $('#max').val()
    },
    numberOfWords: $('#words').val(),
    numberOfSentence: $('#sentence').val()
  }

  let excerpt = new ExcerptJS(params);
  let txt = $('#source').val();

  excerpt.input(txt);
  let result = excerpt.out($('[name="process"]').val()); // arg = symbols | words | sentence

  // out results to console
  console.log(result);
  $('.result').html(result);
  console.log('Length:', result.length);
  console.log('Count words', result.split(' ').length);
  $('#res-numbers').html("Total length: <strong>" + result.length + "</strong>; Number os words: <strong>" + result.split(' ').length + "</strong>;")

});
