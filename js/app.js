(function() {
  'use strict';
  var secret = "c574e44dc392b1ae91bba13815f59b3f";
  var app = angular.module('terminator', ['ngResource']);
  app.controller('MoviesController', function($scope, $resource) { 
    var self = this;
    
    self.selectMovie = function(movie) {
      self.selectedMovie = movie;
      self.selectActor(movie.stars[0]);
    };
    
    self.selectActor = function(actor) {
      self.selectedActor = actor;
    }
    
    var movieCollection = $resource(
      'https://api.themoviedb.org/3/collection/:collection_id',
      //default parameters go here
      { api_key: secret },
      //define custom resource methods here
      {}
    );
    
    var movieDetail = $resource(
      'https://api.themoviedb.org/3/movie/:movie_id',
      { api_key: secret }
    );
    
    var movieCredit = $resource(
      'https://api.themoviedb.org/3/movie/:movie_id/credits',
      { api_key: secret }
    );
    
    movieCollection.get(
      { collection_id: 528 },
      function(value, responseHeaders) {
        self.terminatorMovies = value.parts;
        self.terminatorMovies.forEach( function(movie, index) {
          
          movieDetail.get( 
            { movie_id: movie.id },
            function(value, responseHeaders) {
              movie.details = value;
          });
          
          movieCredit.get(
            { movie_id: movie.id },
            function(value, responseHeaders) {
              movie.credits = value;
              movie.stars = value.cast.filter(function(member) {
                return member.order < 4;
              });
              self.selectedActor = movie.stars[0];
              self.selectMovie(self.terminatorMovies[0]);
              movie.writers = value.crew.filter(function(member) {
                return member.job === "Writer";
              });
              movie.director = value.crew.filter(function(member) {
                return member.job === "Director";
              })[0];
          });
        });
      });
  });
})();