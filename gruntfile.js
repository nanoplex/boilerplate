module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
        options: {
            livereload: true,
        },
        scss: {
          files: ['site/css/scss/*scss'],
          tasks: ['sass']
        },
        css: {
            files: ['site/css/*css'],
            tasks: ['autoprefixer','cssmin']
        },
        js: {
          files: ['site/js/*.js'],
          tasks: ['uglify']
        },
        img: {
          files: ['site/img/*'],
          tasks: ['imagemin']
        }
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'site/css/scss',
          src: ['*.scss'],
          dest: 'site/css/',
          ext: '.css'
        }]
      }
    },
    autoprefixer: {
        multiple_files: {
            expand: true,
            flatten: true,
            src: 'site/css/*.css',
            dest: 'site/css/prefix/'
        },
    },
    cssmin: {
        combine: {
            files: {
                'site/css/min/styles.css': ['site/css/prefix/*.css']
            }
        }
    },
    uglify: {
      options: {
        compress: {
          global_defs: {
            "DEBUG": false
          },
          dead_code: true
        }
      },
      my_target: {
        files: {
          'site/js/min/javascript.js': ['site/js/javascript.js']
        }
      }
    },
    imagemin: { 
      dynamic: {                         // Another target
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'site/img/',                   // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'site/img/min/'                  // Destination path prefix
        }]
      }
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-contrib-imagemin');
  

  // Default task(s).
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('compile',['sass']);
  grunt.registerTask('css', ['autoprefixer', 'cssmin']);
  grunt.registerTask('js', ['uglify']);
  grunt.registerTask('img',['imagemin']);

};