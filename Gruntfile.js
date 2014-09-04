module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-sass');
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'css/style.css': 'css/style.scss'
        }
      }
    }
  });

  
  
  grunt.registerTask('default', ['sass']);

};