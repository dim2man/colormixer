$(function(){

  var optionsHtml = COLORS.map(function(color) {
    return '<option value="'+color.hex+'">'+color.rus+'</option>';
  }).join('');

  $('.chooser')
  .html(optionsHtml)
  .on('change', function(e) {
    var color = e.currentTarget.value;
    var box = e.currentTarget.dataset.sample;
    updateColor(box, color);
    updateResult();
  });

  function hex2rgb(hex) {
    var r = hex.substr(0,2);
    var g = hex.substr(2,2);
    var b = hex.substr(4,2);
    return [parseInt(r,16),parseInt(g,16),parseInt(b,16)];
  }

  function rgb2hex(rgb) {
    return rgb
    .map(function(c) {
      return Number(c).toString(16);
    })
    .map(function(s) {
      return s.length < 2 ? '0'+s : s;
    })
    .join('')
    .toUpperCase();
  }

  function mix(hex1, hex2) {
    var rgb1 = hex2rgb(hex1);
    var rgb2 = hex2rgb(hex2);
    var rgb  = [];
    var max = 0;
    for(var i=0; i<rgb1.length && i<rgb2.length; i++) {
      rgb[i] = rgb1[i] + rgb2[i];
      if (rgb[i] > max) max = rgb[i];
    }
    if (max > 255) {
      for(i=0; i<rgb.length; i++) {
        rgb[i] = Math.round(rgb[i]*255/max);
      }
    }
    return rgb2hex(rgb);
  }

  function updateColor(cls, color) {
    $('.'+cls)
    .css('background-color', '#'+color)
    .attr('data-color', color);
  }

  function updateResult() {
    var hex1 = $('.sample1').attr('data-color');
    var hex2 = $('.sample2').attr('data-color');
    var hex  = mix(hex1, hex2);
    console.log(hex1 + ' ' + hex2 + ' ' + hex);
    updateColor('result', hex);
  }

  updateColor('sample1', $('[data-sample="sample1"]').val());
  updateColor('sample2', $('[data-sample="sample2"]').val());
  updateResult();
});
