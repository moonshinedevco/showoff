var SHOWOFF = {
   repos: null,
   div: null,
   inited: false,
   init: function() {
      $.ajaxSetup({ cache: true });
      SHOWOFF.setStyles();
      SHOWOFF.inited = true;
   },
   load: function(div, repos) {
      SHOWOFF.div = div;
      SHOWOFF.repos = repos;
      if(!SHOWOFF.inited) SHOWOFF.init();
      $('#' + div).hide();
      for(username in repos)
	 $.getScript("https://api.github.com/users/" + username + "/repos?callback=SHOWOFF.showRepos");
   },
   setStyles: function() {
      var style = ".repo { font-family: Helvetica,arial,freesans,clean,sans-serif; border: 1px solid; " +
	 "display: inline-block; border-color: #ccc #aaa #aaa #ccc; padding: 10px; margin: 5px; width: 350px; }" +
	 ".repo a { text-decoration: none; color: #4183C4; }" +
	 ".repo a.pname { font-size: 20px; font-weight: bold; }" +
	 ".repo a:hover { text-decoration: underline; }" +
	 ".repo div.lang { color: #666; font-size: 11px; font-weight: bold; }" +
	 ".repo div.lastupdate { font-size: 11px; color: #888; }" +
	 ".repo div.description { margin: 5px 0px 5px 0px; height: 36px; }" +
	 ".repo div.pull-right { float: right; }" +
	 ".repo img { float: left; width: 20px; height: 20px; margin-right: 5px; }";
      $("head").append("<style id=\"showoff-styles\">" + style + "</style>");
   },
   showRepos: function(result) {
      var repos = result.data, html = "";
      $.each(repos, function(index, repo) {
		if(repo.owner.login in SHOWOFF.repos && $.inArray(repo.name, SHOWOFF.repos[repo.owner.login]) != -1)
		   html += SHOWOFF.buildHTML(repo);
	     });
      // due to some weird caching by jQuery, this is necessary
      document.getElementById(SHOWOFF.div).innerHTML += html;
      $("span.timeago").timeago();
      $('#' + SHOWOFF.div).fadeIn();
   },
   truncate: function(text, size) {
      return (text.length > size) ? text.substring(0, size-3) + "..." : text;
   },
   buildHTML: function(repo) {
      var stars = repo.watchers + " Star" + (repo.watchers == 1 ? '' : 's'), forks = repo.forks + " Fork" + (repo.forks == 1 ? '' : 's');
      return "<div class=\"repo\"><a href=\"https://github.com/" + repo.owner.login + "\" class=\"avatar\">" + 
	 "<img src=\"" + repo.owner.avatar_url + "\" /></a><div><a class=\"pname\" href=\"" + repo.html_url + "\">" + 
	 repo.name + "</a><div class=\"pull-right lang\">" + repo.language +" &#9679; " +
	 "<a href=\"" + repo.html_url + "/stargazers\">" + stars  + "</a> &#9679; " +
	 "<a href=\"" + repo.html_url + "/network\">" + forks + "</a></div></div>" +
	 "<div class=\"description\">" + SHOWOFF.truncate(repo.description, 97) + "</div><div class=\"lastupdate\">Last updated " +
	 "<span class=\"timeago\" title=\"" + repo.pushed_at + "\">" + repo.pushed_at + "</span></div></div>";
   }
};
