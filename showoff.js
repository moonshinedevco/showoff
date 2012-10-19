var SHOWOFF = {
   repos: null,
   div: null,
   load: function(div, repos) {
      SHOWOFF.div = "#" + div;
      SHOWOFF.repos = repos;
      $.ajaxSetup({ cache: true });
      if($('#showoff-styles').length == 0) SHOWOFF.setStyles();
      $(div).hide();
      for(username in repos)
	 $.getScript("https://api.github.com/users/" + username + "/repos?callback=SHOWOFF.showRepos")
   },
   setStyles: function() {
      var style = ".repo { font-family: Helvetica,arial,freesans,clean,sans-serif; border: 1px solid; " +
	 "border-color: #eee #ccc #ccc #eee; padding: 15px; margin: 10px; float: left; width: 400px; }" +
	 ".repo a { text-decoration: none; color: #4183C4; }" +
	 ".repo a.pname { font-size: 20px; font-weight: bold; }" +
	 ".repo a:hover { text-decoration: underline; }" +
	 ".repo div.lang { color: #666; font-size: 11px; font-weight: bold; }" +
	 ".repo div.lastupdate { font-size: 11px; color: #888; }" +
	 ".repo div.description { margin: 5px 0px 5px 0px; }" +
	 ".repo div.pull-right { float: right; }" +
	 ".repo img { float: left; width: 20px; height: 20px; margin-right: 5px; }";
      $("head").append("<style id=\"showoff-styles\">" + style + "</style>");
   },
   showRepos: function(result) {
      var repos = result.data;
      $.each(repos, function(index, repo) {
		if(repo.owner.login in SHOWOFF.repos && $.inArray(repo.name, SHOWOFF.repos[repo.owner.login]) != -1)
		   $(SHOWOFF.div).html($(SHOWOFF.div).html() + SHOWOFF.buildHTML(repo));
	     });
      $("span.timeago").timeago();
      $(SHOWOFF.div).fadeIn();
   },
   buildHTML: function(repo) {
      var stars = repo.watchers + " Star" + (repo.watchers == 1 ? '' : 's'), forks = repo.forks + " Fork" + (repo.forks == 1 ? '' : 's');
      return "<div class=\"repo\"><a href=\"https://github.com/" + repo.owner.login + "\" class=\"avatar\">" + 
	 "<img src=\"" + repo.owner.avatar_url + "\" /></a><div><a class=\"pname\" href=\"" + repo.html_url + "\">" + 
	 repo.name + "</a><div class=\"pull-right lang\">" + repo.language +" &#9679; " +
	 "<a href=\"" + repo.html_url + "/stargazers\">" + stars  + "</a> &#9679; " +
	 "<a href=\"" + repo.html_url + "/network\">" + forks + "</a></div></div>" +
	 "<div class=\"description\">" + repo.description + "</div><div class=\"lastupdate\">Last updated " +
	 "<span class=\"timeago\" title=\"" + repo.pushed_at + "\">" + repo.pushed_at + "</span></div></div>";
   }
};
