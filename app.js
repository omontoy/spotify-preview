$(document).on('ajaxStart', function() {
  $('#loading').show();
}).on('ajaxStop', function() {
  $('#loading').hide();
});

$('input').on('keypress', function(e) {
   if(e.which === 13 && $('input').val().length > 0){
      var artist = $(this).val();
      $.getJSON("https://api.spotify.com/v1/search?q="+ artist +"&type=track,artist", function(answer){
         var template = Handlebars.compile($('#songs-template').html());
         $('tbody').html(template({ songs: answer.tracks.items }));
      });

      $('input').val("");
   }
});

$('input').on('keypress', function(e) {
   if(e.which === 13 && $('input').val() != ""){
      $('tbody').html("");
   }
});

$('table').on('click','button',function(){
   var modal = $(this).closest('tr').find('#myModal');
   var span = $(this).closest('tr').find(".close");

   $(modal).show();

   $('ul').on('click','li#nombres',function(){

     var getLiName = $(this)[0];
     var getLiArtist = $(getLiName).next()[0]
     var id = $(getLiArtist).text()

     $.getJSON("https://api.spotify.com/v1/artists/"+ id +" ", function(answer) {
       var url = answer.images[0].url;      
       $(getLiName).closest('#nombres').find('img').attr('src' , url)
     });

   });

   function duration(millis) {
     var minutes = Math.floor(millis / 60000);
     var seconds = ((millis % 60000) / 1000).toFixed(0);
     return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
   }

   getPdurationMS = $(modal).find('#durationMS')[0];
   str = $(getPdurationMS).text();
   number = parseInt(str);

   getPduration = $(modal).find('#duration')[0];
   $(getPduration).text(duration(number));

   $(span).click(function() {
     $(modal).hide();
   });

   $('a#clickear').click(function(e) {
    e.preventDefault();
     var showImage = $(this).parent().next()[0].lastChild
     $(showImage).css("display","block");
   });

   $(function() {
      $(modal).modal('toggle')
   });

});