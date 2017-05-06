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