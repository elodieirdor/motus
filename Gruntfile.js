// Gruntfile.js
module.exports = function (grunt) {
    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        less: {
            development: {
                files: {
                    "css/main.css": "less/main.less"
                }
            }
        }
    });
    grunt.registerTask('default', []);
    grunt.registerTask('prod', ['less']);
};