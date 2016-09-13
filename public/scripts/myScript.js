console.log( 'js' );
$( document ).ready( function(){
  console.log( 'JQ');

  $( '#getter' ).on( 'click', function(){
    // make ajax call to getPeeps route and show results
    // no body needed for get call
    $.ajax({
      url: '/getPeeps',
      type: 'GET',
      success: function( data ){
        // data is returned json array from server
        console.log( 'success in ajax:', data );
      }
    }); //end ajax
  }); // end getter on click

  $( '#sender' ).on( 'click', function(){
    console.log( 'in sender on click' );
    // assemble object to send
    var objectToSend={
      request: 'from client'
    };
    // ajax call to post route
    $.ajax({
      type: 'POST',
      url: '/poster',
      data: objectToSend,
      success: function( data ){
        console.log( 'get this back from server:', data );
      } // end success
    }); // end ajax
  }); // end sender on click
}); // end doc ready
