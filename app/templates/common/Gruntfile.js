'use strict';

var path = require('path');

exports = module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-regarde');

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: ['Gruntfile.js', 'app/index.js']
        },

        compass: {
            dist: {
                options: {
                    sassDir: '<%= sassDir %>',
                    cssDir: 'dist/css',
                    outputStyle: 'expanded',
                    require: 'zurb-foundation'
                }
            }
        },

        clean: {
            build: ['dist']
        },

        copy: {
            build: {
                files: [{
                    expand: true,
                    cwd: '<%= publicDir %>',
                    src: ['**'],
                    dest: 'dist/'
                }]
            }
        },

        express: {
            server: {
                options: {
                    port: process.env.PORT || 3000,
                    bases: 'dist',
                }
            }
        },

        regarde: {
            pub: {
                files: 'public/**/*',
                tasks: ['copy']
            },
            dist: {
                files: 'dist/**/*',
                tasks: ['livereload']
            },
            sass: {
                files: '<%= sassDir %>/**/*.scss',
                tasks: 'sass'
            }
        },
    });

    // Default task.
    grunt.registerTask('default', ['clean', 'copy', 'compass', 'express', 'regarde']);
};
