module.exports = function(grunt) {

  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    'http-server': {
      dev: {
        root: '',
        port: 8000,
        host: '127.0.0.1',
        showDir: true,
        autoIndex: true,
        defaultExt: 'html',
        runInBackground: false
      }
    },
    
    
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'css/style.css': 'css/style.scss'
        }
      }
    },
    
    ngdoc: {
      all: ['js/app.js']
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-http-server');
  grunt.loadNpmTasks('grunt-ngdoc');
  
  grunt.registerTask('default', ['sass', 'http-server:dev']);

};