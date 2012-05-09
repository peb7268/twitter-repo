$(document).ready(function(){    
	objCount = 0;
	//global object
	var Twitter = {
		//init method that sets the configs
		init: function( config ) {
			this.url = 'http://search.twitter.com/search.json?q=' + config.query + '&rpp=100&callback=?';
			this.template = config.template;
			this.container = config.container;

			this.get_tweets();
			
		},
		
		//Compiles the template and appends the content to the dom
		attachTemplate: function() {
			var template = Handlebars.compile( this.template );
			this.container.append( template( this.tweets ) );
			
			console.log('objCount ' + objCount + ' here');
			if(objCount === 3){
			  	console.log('here');
			  	$('#twee-tainer li:last').after('<div id="trending"></div>');
	  		}	
		 },
		
		//Responsible for triggering the JSON call and then actually calling the 
		//Template function that attatches everything
		get_tweets: function(){
			var self = this;
		    $.getJSON( this.url , function( data ){			
					
					self.tweets = $.map(data.results, function(tweet){
						return {
							author: tweet.from_user,
							tweet_text: tweet.text,
							thumb: tweet.profile_image_url,
							url: 'http://twitter.com/' + tweet.from_user + '/status/' + tweet.id_str
						};
					});
					//Async happening here. Put all methods below
					self.attachTemplate(); 
					
					var container = $('ul#twee-tainer');
						lis = container.find('li');
					lis.hover(function(){
						$(this).css({
							cursor: 'pointer'
						});
					
					$(this).find('img').animate(
						{
							opacity: 1
						}, 200)
					},
					//hover off	 
					function(){
					$(this).find('img').animate(
						{
							opacity: .3
						}, 200)

						$('.hidden:visible').fadeOut(300);
					});
					
					$('ul#twee-tainer li > a').click(function(event){
						event.preventDefault();
						$(this).next().fadeIn();	
					});
			 		
			 		
			 
			  }); //ends getJSON
		  }
	}
		
	  	
	  	function createTwitter( count, current, i, terms ){
	  		
	  		while(current < count){
  			  Twitter.init({
			  template: $('#tweets-template').html(),
			  container: $('#twee-tainer'),
			  query: terms[i]
			  });	
			  i++;
			  current += 100;
			  objCount++;
			  //if (typeof objCount == "number"){ console.log('number') }
			  console.log(objCount);

	  		}
	  	}

	  	//sets some options
		var count = 600;
		var current = 0;
		var i = 0;
	  	var terms = ['marketing', 'the morrison agency', 'social media', 'analytics', 'seo', 'search engine'];
	  	
		createTwitter(count, current, i, terms);

	  	
});