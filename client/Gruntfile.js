const sass = require('node-sass');

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src',
          src: '**/*.js',
          dest: 'build'
        }]
      }
    },

    typescript: {
      base: {
        src: ['src/ffxiv-rotations.ts'],
        dest: 'src',
        options: {
          module: 'amd',
          target: 'es5',
          rootDir: 'src',
          sourceMap: true,
          declaration: true
        }
      }
    },

    watch: {
      typescriptWatch: {
        files: 'src/ffxiv-rotations.ts',
        tasks: ['typescript'],
        options: {
          interrupt: true,
        },
      },
      sassWatch: {
        files: 'src/ffxiv-rotations.sass',
        tasks: ['sass'],
        options: {
          interrupt: true,
        },
      },

    },

    sass: {
      options: {
        implementation: sass,
        sourceMap: true
      },
      dist: {
        files: {
          'src/ffxiv-rotations.css': 'src/ffxiv-rotations.sass'
        }
      }
    },

    json_minification: {
      target: {
        files: [{
          expand: true,
          cwd: '../client/src',
          src: ['db.json'],
          dest: 'build'
        }]
      }
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'build/ffxiv-rotations.css': ['src/ffxiv-rotations.css'],
          'build/materialize/css/materialize.min.css': ['src/materialize/css/materialize.min.css']
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'build/index.html': 'src/index.html',
        }
      }
    },

    copy: {
      dist: {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: ['**/icons/*', '**/classIcons/*', '**/materialize/font/**'],
            dest: 'build'
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-json-minification');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['typescript', 'uglify', 'sass', 'json_minification', 'cssmin', 'htmlmin', 'copy']);
};