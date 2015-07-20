define(['jquery',
	'backbone',
	'underscore',
    'models/os.util',
    'models/project'], function ($,
     Backbone,
     _,
     OSUtil,
     Project) {
	'use strict';

    var master;

	var OSView = Backbone.View.extend({

        osInitialize: function(view) {
            master = this;
            this.erbEvents(view);
        },

        erbEvents: function (view) {
            var self = view;
            $('#fetchGHProject').click(function() {
                self.handleFetchGHProject();
            });
            $('#submitNewProject').click(function() {
                self.handleCreateProject();
            });
            $('#getAllRepos').click(function() {
                self.getAllUserRepos();
            });
            $('#pullFromIdeas').click(function() {
                self.pullFromIdeas();
            });

            var isOpen = false;
            var inputBox = $('#universal-searchbox-input');
            var searchBox = $('.searchbox');
            inputBox.focus(function(){
                if(!isOpen) {
                    self.getUniversalSearchData();
                    searchBox.addClass('searchbox-open');
                    isOpen = true;
                }
            });
            inputBox.blur(function(){
                if(isOpen) {
                    searchBox.removeClass('searchbox-open');
                    isOpen = false;
                }
            });
        },

        events: {},

        getUniversalSearchData: function () {
            var self = this;
            var project = new Project();
            project.getUniversalSearchData({success: self.handleUniversalSearchData});
        },

        handleUniversalSearchData: function (projects) {
            // master
            console.log(projects);
        }

	});

	return OSView;

});
