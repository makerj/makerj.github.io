var $repoList = $('#repo-list');
var repoList = null;
$.ajax({
    url: 'https://api.github.com/users/makerj/repos',
    method: 'GET'
}).done(function (res) {
    repoList = res;

    $repoList.empty();
    repoList.forEach(function (item) {
        if (item.fork) return;
        if (v(item.description, '').startsWith('_')) return;

        $repoList.append('<li><a href="{}"><h4>{}</h4></a><h5>{}</h5></li>'.format(item.html_url, item.name, item.description || ''));
    });
});
