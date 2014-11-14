module.exports = function( grunt ) { 
	grunt.initConfig({
	  	pkg: grunt.file.readJSON('package.json'),

		connect: { //task
			server:{ //target
				options: { //target option
					port: 8001, 
					hostname: '127.0.0.1', // Change this to '0.0.0.0' to access the server from outside.
					keepalive: true,
					open: true
				}
			}
		},
		karma: { 
	        unit: { 
	            configFile: 'karma.conf.js'	            
	        }
	    },
	    compass: {
			build: {
				options: {
					sassDir: 'source/styles',
					cssDir: 'source/dist/styles/css'					
				}
			}
		},		
		uglify: {
		    app: {
		    	files: {
		        	'source/dist/js/output.min.js': ['source/dist/js/temp/Annotated.js']
		      	}
		    }
  		},
  		jshint: {
			all: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: [
					'source/js/**/*.js',
				  	'test/**/*.js',
				  	'!node_modules/**/*.js'
				]
			}
		},
		clean: {
			dist: 'source/dist',
			temp: 'source/dist/js/temp'
		},
		html2js: {
			options: {
				module: 'app.modules',
				singleModule: true,
				useStrict: true,
				htmlmin: {
					collapseBooleanAttributes: true,
					collapseWhitespace: true,
					removeAttributeQuotes: true,
					removeComments: true,
					removeEmptyAttributes: true,
					removeRedundantAttributes: true,
					removeScriptTypeAttributes: true,
					removeStyleLinkTypeAttributes: true
    			}
			},
			main: {
      			src: ['source/partials/*.html'],
      			dest: 'source/dist/js/templates_cache.js'
    		}
		},
		ngAnnotate: {
	        options: {
	            singleQuotes: true
	        },
	        app: {
	            files: {
	            	'source/dist/js/temp/Annotated.js' : ['source/js/**/*.js']	            	
	            }
	        }
    	},
		open: {
			build: {
				path: 'http://127.0.0.1:8001',
      			app: 'Google Chrome'
			}
		},
		watch: {
			js: {
		        files: 'source/js/**/*.js',
		        tasks: ['uglify']
     		 },
      		css: {
		        files: ['source/styles/*.scss'],
		        tasks: ['compass']		        
      		}

		}
  	});

  	// ===========================================================================
  	// LOAD GRUNT PLUGINS ========================================================
    // =========================================================================== 
	grunt.loadNpmTasks('grunt-contrib-compass'); //compile SASS to CSS - must install compass through gem - gem install compass
	grunt.loadNpmTasks('grunt-contrib-connect'); //connect a webservice
	grunt.loadNpmTasks('grunt-contrib-clean'); //
	grunt.loadNpmTasks('grunt-contrib-jshint'); //keep JavaScript code consistent
	grunt.loadNpmTasks('grunt-contrib-uglify');	//minimify javascript files
	grunt.loadNpmTasks('grunt-contrib-watch'); //run predefined tasks whenever watched file patterns are added, changed or deleted.
	grunt.loadNpmTasks('grunt-html2js'); //converts AngularJS templates to JavaScript
	grunt.loadNpmTasks('grunt-ng-annotate'); //adds and removes AngularJS dependency injection using annotations
	grunt.loadNpmTasks('grunt-open'); //open urls and files from a grunt task
	grunt.loadNpmTasks('grunt-karma'); //karma test runner	


	// ===========================================================================
  	// REGISTER TASKS ==============================================================
  	// ===========================================================================	  
	grunt.registerTask('test',['karma']);	
	
	grunt.registerTask('default',['clean:dist', 'compass', 'html2js', 'connect:server', 'open:build', 'watch', 'clean:temp']);

	grunt.registerTask('build',['clean:dist', 'compass', 'html2js', 'jshint', 'ngAnnotate', 'uglify', 'connect:server', 'open:build', 'watch', 'clean:temp']);
};

