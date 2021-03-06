var LoginView = Backbone.View.extend({
    el: $('.login-container'),
    initialize: function() {
        this.render();
    },
    render: function() {
    	//covering edge case where user forcefully concatenates /#login to a random url
    	$('.bs-sidebar').hide();

        var template = Handlebars.templates['login'];
        this.$el.html(template({}));

        var stateKey = 'spotify_auth_state';
        loginBtn = $('#login-button');

        /**
         * Spotify auth handling
         */
        loginBtn.click(function() {
            var client_id = 'c9ce30f810254abfa32846f44b5533cf'; // Your client id
            var redirect_uri = root+'/'; // Your redirect uri

            var state = generateRandomString(16);

            localStorage.setItem(stateKey, state);
            var scope = 'user-read-private user-read-email user-library-read';

            var url = 'https://accounts.spotify.com/authorize';
            url += '?response_type=code';
            url += '&client_id=' + encodeURIComponent(client_id);
            url += '&scope=' + encodeURIComponent(scope);
            url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
            url += '&state=' + encodeURIComponent(state);

            window.location = url;
        });
    }
});
