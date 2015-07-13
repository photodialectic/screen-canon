module.exports = function(grunt) {

  grunt.initConfig({
    sass: {
      dist: {
        files: {
          'public/css/main.css': 'scss/base.scss',
        }
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'public/css',
          src: ['*.css', '!*.min.css'],
          dest: 'public/css',
          ext: '.min.css'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['sass']);
  grunt.registerTask('cssmin', ['cssmin']);
};
