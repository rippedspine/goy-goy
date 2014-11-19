'use strict';

module.exports = function(grunt) {
  var src     = 'src'
    , dist    = 'build'
    , tmp     = '.tmp'
    , appFile = 'goygoy.js';

  var config = {
    main   : 'server.js',
    src    : src,
    dist   : dist,
    tmp    : tmp,
    shared : 'shared',
    tests  : 'test',
    browserify: {
      entry  : src + '/js/app.js',
      output : {
        tmp  : tmp + '/' + appFile,
        dist : dist + '/' + appFile,
        min  : dist + '/' + appFile
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
        tasks: ['cssmin', 'autoprefixer:dev']
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
      },
      scripts: {
        files: [
          '<%= config.src %>/js/**/*.js',
          'server/**/*.js',
          '<%= config.shared %>/**/*.js',
          '<%= config.main %>',
          'Gruntfile.js'
        ],
        tasks: ['jshint']
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

    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 8', 'ie 9']
      },
      dev: {
        src: '<%= config.tmp %>/css/main.min.css'
      },
      dist: {
        src: '<%= config.dist %>/css/main.min.css'
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
            'Audiolet.js',
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
            'Audiolet.js',
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
        'server/**/*.js',
        'Gruntfile.js'
      ]
    },

    replace: {
      dist: {
        src  : ['server.js'],
        dest : 'server.js',
        replacements: [{
          from : '/.tmp',
          to   : '/build'
        }]
      },
      dev: {
        src  : ['server.js'],
        dest : 'server.js',
        replacements: [{
          from : '/build',
          to   : '/.tmp'
        }]
      },
    },

    uglify: {
      dist: {
        files: {
          '<%= config.browserify.output.min %>': '<%= config.browserify.output.dist %>',
          'build/Audiolet.js': 'build/Audiolet.js'
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
            debug        : true,
            fullPaths    : true,
            cache        : {},
            packageCache : {}
          }
        }
      },
      dist: {
        files: {
          '<%= config.browserify.output.dist %>': ['<%= config.browserify.entry %>']
        },
        options: {
          browserifyOptions: {
            debug        : false,
            fullPaths    : true,
            cache        : {},
            packageCache : {}
          }
        }
      }
    }
  });

  grunt.registerTask('heroku', ['build']);

  grunt.registerTask('validate', ['jshint']);

  grunt.registerTask('build', [
    'jshint',
    'browserify:dist',
    'cssmin:dist',
    'autoprefixer:dist',
    'copy:dist',
    'uglify',
    'replace:dist',
  ]);

  grunt.registerTask('dev', [
    'jshint',
    'browserify:dev',
    'cssmin:dev',
    'autoprefixer:dev',
    'copy:dev',
    'replace:dev'
  ]);

  grunt.registerTask('default', ['dev', 'watch']);
};