var ExcerptJS = function(params){
  var self = this;
  // settings
  this.len = {
    min: 0,
    max: 0
  };
  this.numberOfWords = 0;
  this.numberOfSentence = 0;
  // source
  this.txt = '';
  // out text
  this.output = '';

  this.init = function(params){
    this.len.min = params.len.min;
    this.len.max = params.len.max;
    this.numberOfWords = params.numberOfWords;
    this.numberOfSentence = params.numberOfSentence;
  }

  this.input = function(txt){
    this.txt = txt;
  }

  this.process_symbols = function(){
    let words = this.txt.split(' ');
    let res = [];
    let totalLength = 0;
    for(let word of words){
      if(totalLength > this.len.max){
        res.pop();
        break;
      }
      if(totalLength > this.len.min){
        break;
      }
      res.push(word);
      totalLength += word.length + 1;
    }
    this.output = res.join(' ');
  }

  this.process_words = function(){
    let words = this.txt.split(' ');
    let res = [];
    let totalLength = 0;
    let item = 1;
    for(let word of words){
      if(totalLength > this.len.max){
        res.pop();
        break;
      }
      if(item > this.numberOfWords){
        break;
      }
      res.push(word);
      totalLength += word.length + 1;
      item++;
    }
    this.output = res.join(' ');
  }

  this.process_sentence = function(){
    let sentences = this.txt.split('.');
    let item = 1;
    let res = [];
    let totalLength = 0;
    for(let sentence of sentences){
      if(totalLength > this.len.max){
        res.pop();
        break;
      }

      if(item > this.numberOfSentence){
        break;
      }

      res.push(sentence);

      totalLength += sentence.length + 1;
      item++;
    }

    this.output = res.join('.') + '.';
    this.output = this.output == '.' ? '' : this.output;
  }

  this.out = function(opt){
    this['process_' + opt]();
    return this.output;
  }

  this.init(params);
}
