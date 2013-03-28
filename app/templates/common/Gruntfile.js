'use strict';

var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
    return connect.static(path.resolve(point));
};

exports = module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-livereload');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-regarde');
    <% if (useStylus) { %>
    grunt.loadNpmTasks('grunt-contrib-stylus');
    <% } else { %>
    grunt.loadNpmTasks('grunt-contrib-compass');
    <% } %>

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: ['Gruntfile.js']
        },

        <% if (useStylus) { %>
        stylus: {
            compile: {
                options: {
                    compress: false,
                    // paths: ['path/to/import', 'another/to/import'],
                    // urlfunc: 'embedurl', // use embedurl('test.png') in our code to trigger Data URI embedding
                    use: [
                        require('<%= baseTheme %>') // use stylus plugin at compile time
                    ]
                },
                files: {
                    'dist/css/app.css': '<%= cssPreprocessorDir %>/<%= _.slugify(appname) %>.styl',
                    'dist/css/normalize.css': '<%= cssPreprocessorDir %>/normalize.styl'
                }
            }
        },
        <% } else { %>
        compass: {
            dist: {
                options: {
                    sassDir: '<%= cssPreprocessorDir %>',
                    cssDir: 'dist/css',
                    outputStyle: 'expanded',
                    require: 'zurb-foundation'
                }
            }
        },
        <% } %>

        clean: {
            build: ['dist']
        },

        connect: {
            server: {
                options: {
                    port: 3000,
                    middleware: function(connect) {
                        return [
                            lrSnippet,
                            folderMount(connect, '<%= publicDir %>'),
                            folderMount(connect, 'dist')
                        ];
                    }
                }
            }
        },

        open: {
            server: {
                path: 'http://localhost:3000'
            }
        },

        regarde: {
            pub: {
                files: ['<%= publicDir %>/**/*', 'dist/**/*'],
                tasks: ['livereload']
            },
            <%
            var _buildTask;
            if (useStylus) { %>
            stylus: {
                files: '<%= cssPreprocessorDir %>/**/*.styl',
                tasks: 'stylus'
            }
            <%
                _buildTask = 'stylus';
            } else { %>
            sass: {
                files: '<%= cssPreprocessorDir %>/**/*.scss',
                tasks: 'compass'
            }
            <%
                _buildTask = 'compass';
            } %>
        },
    });

    // Default task.
    grunt.registerTask('default', ['clean', '<%= _buildTask %>', 'livereload-start', 'connect', 'open', 'regarde']);
};
