# Showoff
This Javascript library shows off specified github repos (name, description, stats).  To use, you'll first need to fetch:

 * [jQuery](http://jquery.com)
 * [timeago](https://github.com/rmm5t/jquery-timeago)

## Usage

First, load jQuery, timeago, and showoff:

```html
<script src="jquery.min.js" type="text/javascript"></script>
<script src="jquery.timeago.js" type="text/javascript"></script>
<script src="showoff.min.js" type="text/javascript"></script>
```

Then, specify the div you want to fill and the repos per username you want to show off.  For instance, let's say I wanted to show off bmuller's sexmachine and bandit projects and LivingSocial's ankusa in the div named "repos":

```html
<script type="text/javascript">
  $(function() {
    SHOWOFF.load('repos', { 'bmuller': [ 'bandit', 'sexmachine' ], 'livingsocial': [ 'ankusa' ] });
  });
</script>
```

This results in:

![Example image](example.png)

## License

[MIT License](http://www.opensource.org/licenses/mit-license.php)