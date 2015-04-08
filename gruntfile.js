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
    autoprefixer: {
      options: {
        map: true
      },
      your_target: {
        src: 'build/css/partials/*.css'
      },
    },
    copy: {
      main: {
        expand: true,
        cwd: 'src/',
        src: ['html/*.html', 'html/**/*.html'],
        dest: 'build/'
      }
    },
    watch: {
      js: {
        files: ['src/js/*.js'],
        tasks: ['uglify']
      },
      css: {
        files: ['src/sass/*.scss', 'src/sass/**/*.scss', 'config.rb'],
        tasks: ['compass', 'autoprefixer']
      },
      html: {
        files: ['src/html/*.html', 'src/html/**/*.html'],
        tasks: ['copy']
      },
      img: {
        files: ['src/img/**'],
        tasks: ['copy']
      }
    },
    browserSync: {
      bsFiles: {
        src : [
          'build/*.html',
          'build/**/*.html',
          'build/js/*.js',
          'build/css/partials/*.css'
        ]
      },
      options: {
          watchTask: true,
          server: './build'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['browserSync', 'watch']);

};
