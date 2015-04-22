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
    copy: {
      main: {
        expand: true,
        cwd: 'src/',
        src: ['html/*.html', 'html/**/*.html', 'img/*', 'img/**/*'],
        dest: 'build/'
      }
    },
    emailBuilder: {
      test :{
        files : [{
          expand: true,
          src: ['build/**/*.html'],
          dest: '.'
        }]
      }
    },
    watch: {
      css: {
        files: ['src/sass/*.scss', 'src/sass/**/*.scss', 'config.rb'],
        tasks: ['compass']
      },
      html: {
        files: ['src/html/*.html', 'src/html/**/*.html'],
        tasks: ['newer:copy']
      },
      img: {
        files: ['src/img/**'],
        tasks: ['newer:copy']
      },
      inline: {
        files: ['src/html/*.html', 'src/html/**/*.html', 'build/css/**/*.css'],
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
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-email-builder');
  grunt.loadNpmTasks('grunt-newer');

  // Default task(s).
  grunt.registerTask('default', ['browserSync', 'watch']);

};
