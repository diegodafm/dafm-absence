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
	            configFile: 'test/karma.conf.js', 
	            runnerPort: 9876,
	            browsers: ['PhantomJS'],
	            //browsers: [ 'Chrome' ]
	        }
	    },
	    compass: {
			dev: {
				options: {
					sassDir: 'source/styles',
					cssDir: 'source/dist/styles/css'					
				}
			}
		},		
		uglify: {
		    my_target: {
		    	files: {
		        	'source/dist/js/output.min.js': ['source/js/**.js']
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
		html2js: {
			main: {
      			src: ['source/partials/*.html'],
      			dest: 'source/dist/js/templates.js'
    		}
		},
		open: {
			dev: {
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
	grunt.loadNpmTasks('grunt-contrib-jshint'); //keep JavaScript code consistent
	grunt.loadNpmTasks('grunt-contrib-uglify');	//minimify javascript files
	grunt.loadNpmTasks('grunt-contrib-watch'); //run predefined tasks whenever watched file patterns are added, changed or deleted.
	grunt.loadNpmTasks('grunt-html2js'); //converts AngularJS templates to JavaScript
	grunt.loadNpmTasks('grunt-open'); //open urls and files from a grunt task
	grunt.loadNpmTasks('grunt-karma'); //karma test runner	


	// ===========================================================================
  	// REGISTER TASKS ==============================================================
  	// ===========================================================================	  
	grunt.registerTask('test',['karma']);	
	
	grunt.registerTask('default',['compass', 'connect:server', 'open:dev', 'watch']);
};

