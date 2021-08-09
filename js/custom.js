// Custom Scripts for Primal Template //

jQuery(function ($) {
    "use strict";


    // get the value of the bottom of the #main element by adding the offset of that element plus its height, set it as a variable
    var mainbottom = $('#main').offset().top;

    // on scroll,
    $(window).on('scroll', function () {

        // we round here to reduce a little workload
        stop = Math.round($(window).scrollTop());
        if (stop > mainbottom) {
            $('.navbar').addClass('past-main');
            $('.navbar').addClass('effect-main')
        } else {
            $('.navbar').removeClass('past-main');
        }

    });


    // Collapse navbar on click

    $(document).on('click.nav', '.navbar-collapse.in', function (e) {
        if ($(e.target).is('a')) {
            $(this).removeClass('in').addClass('collapse');
        }
    });



    /*-----------------------------------
    ----------- Scroll To Top -----------
    ------------------------------------*/

    $(window).scroll(function () {
        if ($(this).scrollTop() > 1000) {
            $('#back-top').fadeIn();
        } else {
            $('#back-top').fadeOut();
        }
    });
    // scroll body to 0px on click
    $('#back-top').on('click', function () {
        $('#back-top').tooltip('hide');
        $('body,html').animate({
            scrollTop: 0
        }, 1500);
        return false;
    });





    /*-------- Owl Carousel ---------- */
    $(".reviews").owlCarousel({

        slideSpeed: 200,
        items: 1,
        singleItem: true,
        autoPlay: true,
        pagination: false
    });


    /* ------ Clients Section Owl Carousel ----- */

    $(".clients").owlCarousel({
        slideSpeed: 200,
        items: 5,
        singleItem: false,
        autoPlay: true,
        pagination: false
    });


    /* ------ jQuery for Easing min -- */

    $(function () {
        $('a.page-scroll').bind('click', function (event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
    });



    /* --------- Wow Init ------ */

    new WOW().init();


    /* ----- Counter Up ----- */

    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });


    /*----- Preloader ----- */

    $(window).load(function () {
        setTimeout(function () {
            $('#loading').fadeOut('slow', function () {
            });
        }, 3000);
    });

    /*------ Read APi -----*/
    $.getJSON("https://raw.githubusercontent.com/ucstoxygeninfo/info/main/oxygen-data.json", function (data) {
        var tplConcentrator = $("#tpl-concentrator").html();
        var tplTank = $("#tpl-tank").html();
        var tplOccupy = $("#tpl-occupied").html();
        $("#LastUpdatedDate").html(data["lastupdateddate"]);

        var total_concentrators = $.grep(data["data"], function (obj) {
            return obj.type === 1;
        });
        var ava_concentrators = $.grep(data["data"], function (obj) {
            return obj.type === 1 & obj.status === 1;
        });
        $("#ava_concentrators").html(ava_concentrators.length + "/" + total_concentrators.length);

        var total_tanks = $.grep(data["data"], function (obj) {
            return obj.type === 2;
        });
        var ava_tanks = $.grep(data["data"], function (obj) {
            return obj.type === 2 & obj.status === 1;
        });
        $("#ava_tanks").html(ava_tanks.length + "/" + total_tanks.length);

        $.each(data["data"], function (key, obj) {
            var tpl = "";
            if (obj.type === 1) {
                tpl = tplConcentrator;
                tpl = tpl.replaceAll("[Name]", obj.name);
                tpl = tpl.replaceAll("[Location]", obj.location);
                tpl = tpl.replaceAll("[ContactPerson]", obj.contactperson);
                tpl = tpl.replaceAll("[ContactNo]", obj.contactno);
                if (obj.status === 1) {
                    tpl = tpl.replaceAll("[Status]", "available");
                }
                else if (obj.status === 0) {
                    tpl = tpl.replaceAll("[Status]", "occupied");
                    tpl = tpl.replaceAll("[OccupiedDate]", obj.occupieddate);
                    tpl = tpl.replaceAll("[OccupiedPerson]", obj.occupiedperson);
                    tpl = tpl.replaceAll("[OccupiedContactNo]", obj.occupiedcontactno);
                    tpl = tpl.replaceAll("[OccupiedLocation]", obj.occupiedlocation);
                }
                else {
                    tpl = tpl.replaceAll("[Status]", "returning");
                }
                $("#panel-concentrator").append(tpl);
            }
            else if (obj.type === 2) {
                tpl = tplTank;
                tpl = tpl.replaceAll("[Name]", obj.name);
                tpl = tpl.replaceAll("[Location]", obj.location);
                tpl = tpl.replaceAll("[ContactPerson]", obj.contactperson);
                tpl = tpl.replaceAll("[ContactNo]", obj.contactno);

                if (obj.status === 1) {
                    tpl = tpl.replaceAll("[Status]", "available");
                }
                else if (obj.status === 0) {
                    tpl = tpl.replaceAll("[Status]", "occupied");
                    tpl = tpl.replaceAll("[OccupiedDate]", obj.occupieddate);
                    tpl = tpl.replaceAll("[OccupiedPerson]", obj.occupiedperson);
                    tpl = tpl.replaceAll("[OccupiedContactNo]", obj.occupiedcontactno);
                    tpl = tpl.replaceAll("[OccupiedLocation]", obj.occupiedlocation);
                }
                else {
                    tpl = tpl.replaceAll("[Status]", "returning");
                }
                $("#panel-tank").append(tpl);
            }
        });

    });

});
