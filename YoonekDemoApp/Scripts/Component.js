
$(document).ready(function () {

    M.AutoInit();
    if ($('.tabs')) {

        $('.tabs').tabs();
    }
    $('.modal').modal();
    $('.sidenav').sidenav();
    $('.dropdown-trigger').dropdown();
    $('.dropdown-button').dropdown();
})