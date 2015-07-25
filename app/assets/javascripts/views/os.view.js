define(['jquery',
	'backbone',
	'underscore',
    'models/os.util',
    'sifter.min',
    'models/project'], function ($,
     Backbone,
     _,
     OSUtil,
     Sifter,
     Project) {
	'use strict';

    var master;

    var loadedAllProjects = false;

	var OSView = Backbone.View.extend({

        osInitialize: function(view) {
            master = this;
            this.erbEvents(view);
        },

        erbEvents: function () {
            var self = this;
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
            $('#universal-searchbox-input').keyup(function(e){
                master.universalSearch($(e.currentTarget).val());
            });

            var isOpen = false;
            var inputBox = $('#universal-searchbox-input');
            var searchBox = $('.searchbox');
            inputBox.focus(function(){
                if(!isOpen) {
                    master.cacheFeedBeforeSearch();
                    master.getUniversalSearchData();
                    loadedAllProjects = true;
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
            master.allProjects = projects;
            master.universalSearchSifter = new Sifter(projects);
        },

        universalSearch: function (query) {
            if (query) {
                var results = master.universalSearchSifter.search(query, {
                    fields: ['title', 'owner_gh_username'],
                    limit: 100
                });
                if (results.items.length == 0 && query != "") {
                    master.passUniveralSearchResults([]);
                } else {

                    var projectResults = [];
                    _.map(results.items, function(item) {
                        projectResults.push(master.allProjects[item.id]);
                    });

                    var sortedProjectResults = projectResults.sort(function(a, b){
                        if (a.vote_count == b.vote_count){
                            return (a.created_at > b.created_at) ? 1 : ((b.created_at > a.created_at) ? -1 : 0);
                        } else {
                            return (a.vote_count < b.vote_count) ? 1 : ((b.vote_count < a.vote_count) ? -1 : 0);
                        }
                    });

                    master.passUniveralSearchResults(sortedProjectResults);
                }
            } else {
                master.showCachedFeed();
            }
        }
	});

	return OSView;

});
