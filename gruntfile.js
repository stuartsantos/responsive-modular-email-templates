module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    compass: {
      dist: {
        options: {
          config: 'config.rb',
          sourcemap: true
        }
      }
    },
    emailBuilder: {
      test :{
        files : [{
          expand: true,
          cwd: 'src/html',
          src: ['**/*.html'],
          dest: 'build/html'
        }]
      }
    },
    watch: {
      css: {
        files: ['src/sass/*.scss', 'src/sass/**/*.scss', 'config.rb'],
        tasks: ['compass']
      },
      inline: {
        files: ['src/html/*.html', 'src/html/**/*.html', 'src/css/**/*.css'],
        tasks: ['newer:emailBuilder']
      }
    },
    browserSync: {
      bsFiles: {
        src : [
          'build/*.html',
          'build/**/*.html',
          'build/js/*.js',
          'build/css/**/*.css'
        ]
      },
      options: {
          watchTask: true,
          server: '.'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-email-builder');
  grunt.loadNpmTasks('grunt-newer');


  // Default task(s).
  grunt.registerTask('default', ['browserSync', 'watch']);
  grunt.registerTask('inline', ['emailBuilder']);
};
