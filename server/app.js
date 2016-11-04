var express=require( 'express' );
var app=express();
var path = require( 'path' );
var bodyParser = require( 'body-parser' );
var urlencodedParser = bodyParser.urlencoded( { extended: false } );
var pg = require( 'pg' );
// connection string last "word" should be db name ('sqlTest' below)
var connectionString = 'postgress://localhost:5432/sqlTest';
var port = process.env.PORT || 8080;

// static public folder
app.use( express.static( 'public' ) );

// spin up server
app.listen( port, function(){
  console.log( 'server up on', port );
}); // end app listen

// base
app.get( '/', function( req, res ){
  console.log( 'base URL hit' );
  res.sendFile( 'index.html' );
}); // end base url

// get peeps
app.get( '/getPeeps', function( req, res ){
  console.log( 'getPeeps route hit' );
  // connect to db
  pg.connect( connectionString, function( err, client, done ){
    //if err
    if( err ){
      console.log( err );
    } // if error connecting
    else{
      console.log( 'connected to db' );
      // array to hold our results
      var resultArray=[];
      // query call to db table
      var queryResults = client.query( 'SELECT * FROM peeps' );
      queryResults.on( 'row', function( row ){
        // runs for each row in the query result
        resultArray.push( row );
      }); // end query on row
      queryResults.on( 'end', function(){
        // we're done
        done();
        // return result as a json version of array
        return res.json( resultArray );
      }); // end query on end
    } // end no error
  }); // end connect
}); // end get route

// post template
app.post( '/poster', urlencodedParser, function( req, res ){
  console.log( 'in post template', req.body );
  // assemble objectToSend
  var objectToSend={
    response: 'from server'
  };
  // send object back to client
  res.send( objectToSend );
}); // end post template
