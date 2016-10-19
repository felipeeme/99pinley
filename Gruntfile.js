/*
  Taskrunner for Pinley App
*/

//global module: false
module.exports = function(grunt) {

  // Project config

  grunt.initConfig({

    // Metadata
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

    // Task config
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {}
      },

      gruntfile: {
        src: 'Gruntfile.js'
      },

      global: {
        src: 'shared/js/*.js'
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    sass: {
		dist: {
			options: {                      
	           style: 'nested',
             trace: true
	         },
			files: {
        'shared/css/styles.css' : 'shared/sass/styles.scss'
			}
		}

	},
    watch: {
    	css: {
  	   files: '**/*.scss',
  	   tasks: ['sass']
  		},
  		js: {
  			files: '**/*.js',
  			tasks: ['jshint:global']
  		}
    }
  });

  // Dependencies

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

  // Task profiles
    grunt.registerTask('default', ['jshint:global', 'watch']);
    grunt.registerTask('deploy', ['jshint', 'sass', 'concat', 'uglify']);

};
