'use strict';

module.exports = function(grunt) {
  var src = 'src'
    , dist = 'build'
    , tmp = '.tmp';

  var config = {
    main: 'server.js',
    src: src,
    dist: dist,
    tmp: tmp,
    shared: 'shared',
    tests: 'test',
    browserify: {
      entry: src + '/js/app.js',
      output: {
        tmp: tmp + '/gaia.js',
        dist: dist + '/gaia.js',
        min: dist + '/gaia.min.js'
      }
    }
  };

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    config: config,
    watch: {
      styles: {
        files: ['<%= config.src %>/css/*.css'],
        tasks: ['cssmin']
      },
      markup: {
        files: ['<%= config.src %>/index.html'],
        tasks: ['copy:dev']
      },
      images: {
        files: ['<%= config.src %>/images/**/*.{jpeg,jpg,png}'],
        tasks: ['copy:dev']
      },
      browserify: {
        files: ['<%= config.src %>/js/**/*.js', 'shared/**/*.js'],
        tasks: ['browserify:dev']
      }
    },

    cssmin: {
      dev: {
        files: {
          '<%= config.tmp %>/css/main.min.css': ['<%= config.src %>/css/*.css']
        }
      },
      dist: {
        files: {
          '<%= config.dist %>/css/main.min.css': ['<%= config.src %>/css/*.css']
        }
      }
    },

    copy: {
      dev: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.src %>',
          dest: '<%= config.tmp %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'images/**/*'
          ]
        }]
      },
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.src %>',
          dest: '<%= config.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'images/**/*'
          ]
        }]
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        '<%= config.src %>/js/**/*.js',
        '<%= config.shared %>/**/*.js',
        '<%= config.main %>',
        'Gruntfile.js'
      ]
    },

    nodeunit: {
      all: ['<%= config.tests %>**/*_test.js'],
      options: {
        reporter: 'junit',
        reporterOptions: {
          output: '<%= config.tests %>/log'
        }
      }
    },

    uglify: {
      dist: {
        files: {
          '<%= config.browserify.output.min %>': 
            ['<%= config.browserify.output.dist %>']
        }
      }
    },

    browserify: {
      dev: {
        files: {
          '<%= config.browserify.output.tmp %>': ['<%= config.browserify.entry %>']
        },
        options: {
          browserifyOptions: {
            debug: true,
            fullPaths: true,
            cache: {},
            packageCache: {}
          }
        }
      },
      dist: {
        files: {
          '<%= config.browserify.output.dist %>': ['<%= config.browserify.entry %>']
        },
        options: {
          browserifyOptions: {
            debug: false,
            fullPaths: true,
            cache: {},
            packageCache: {}
          }
        }
      }
    }
  });

  grunt.registerTask('validate', ['jshint']);

  grunt.registerTask('build', [
    'jshint',
    'nodeunit',
    'browserify:dist',
    'uglify',
    'copy:dist'
  ]);

  grunt.registerTask('dev', [
    // 'jshint',
    'nodeunit',
    'browserify:dev',
    'cssmin:dev',
    'copy:dev'
  ]);

  grunt.registerTask('default', ['dev', 'watch']);

};