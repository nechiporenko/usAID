// Application Scripts:

// Десктоп меню (выпадайки)
// Мобильное меню
// Покажем скрытую форму при клике на ссылку
// Слайдер событий
// Слайдер логотипов партнеров
// Аккордеон в разделе Шаги реализации
// Кнопка скролла страницы
// Если браузер не знает о svg-картинках
// Если браузер не знает о плейсхолдерах в формах

jQuery(document).ready(function ($) {
    //Кэшируем
    var $window = $(window),
        $html=$('html'),
        $body = $('body');

    $body.append('<div id="overlay" class="overlay"></div>');
    var $overlay = $('#overlay');//оверлей

    //
    // Десктоп меню (выпадайки)
    //---------------------------------------------------------------------------------------
    (function () {
        $('.js-menu li').on({
            mouseenter: function () {
                $(this).find('ul:first').stop(true, true).fadeIn('fast');
                $(this).find('a:first').addClass('hover');
            },
            mouseleave: function () {
                $(this).find('ul').stop(true, true).fadeOut('slow');
                $(this).find('a:first').removeClass('hover');
            }
        });
    })();

    //
    // Мобильное меню
    //---------------------------------------------------------------------------------------
    (function () {
        var $btn = $('.js-mtoggle'),
            $menu = $('.js-mmenu'),
            $submenu = $menu.find('.m-submenu'),
            $s_btn,
            method = {};

        method.initSubmenu = function () {
            $menu.find('li').has('ul').addClass('has-menu').append('<button type="button" class="m-menu__btn"><i class="icon-down-open-mini"></i></button>')
            $s_btn = $menu.find('.m-menu__btn'); //заголовки суб-меню
        }

        method.hideSubMenu = function () {
            $s_btn.removeClass('active');
            $submenu.slideUp();
        }

        method.hideMenu = function () {
            $btn.removeClass('active');
            $menu.removeClass('active');
            method.hideSubMenu();
            $html.css('overflow', 'auto');
            $overlay.unbind('click', method.hideMenu).hide();
        }


        method.showMenu = function () {
            $btn.addClass('active');
            $menu.addClass('active');
            $html.css('overflow', 'hidden');
            $overlay.show().bind('click', method.hideMenu);
        }


        method.initSubmenu();

        $('.b-header__top').on('click', '.js-mtoggle', function () {//покажем - спрячем
            if ($(this).hasClass('active')) {
                method.hideMenu();
            } else {
                method.showMenu();
            }
        });

        $menu.on('click', '.m-menu__label', method.hideMenu); //закроем по клику по заголовку

        $menu.on('click', '.m-menu__btn', function () {//покажем - спрячем подменю
            var $el = $(this);

            if ($el.hasClass('active')) {
                method.hideSubMenu();
            } else {
                method.hideSubMenu();
                $el.addClass('active').parent('li').find('ul').slideDown();
            }
        });
    })();

    //
    // Покажем скрытую форму при клике на ссылку
    //---------------------------------------------------------------------------------------
    function showForm() {
        var $link = $('.js-join'),
            target = $link.attr('href');
        $link.one('click', function (e) {
            e.preventDefault();
            $(target).fadeIn();
        });
    }
    if ($('.js-join').length) { showForm(); }

    //
    // Слайдер событий
    //---------------------------------------------------------------------------------------
    function initEventSlider() {
        var $slider = $('.js-event-slider'),
            rtime, //переменные для пересчета ресайза окна с задержкой delta
            timeout = false,
            delta = 200,
            method = {};

        method.getSliderSettings = function () {
            var setting,
                    settings1 = {
                        maxSlides: 1,
                        minSlides: 1,
                        moveSlides: 1,
                    },
                    settings2 = {
                        maxSlides: 2,
                        minSlides: 2,
                        moveSlides: 2,
                    },
                     settings3 = {
                         maxSlides: 3,
                         minSlides: 3,
                         moveSlides: 3,
                     },
                    common = {
                        slideWidth: 180,
                        slideMargin: 65,
                        auto: false,
                        pager: false,
                        mode: 'horizontal',
                        infiniteLoop: false,
                        hideControlOnEnd: true,
                        useCSS: false
                    },
                    winW = $window.width();
            if (winW < 550) {
                setting = $.extend(settings1, common);
            }
            if (winW >= 550 && winW<=1200) {
                setting = $.extend(settings2, common);
            }
            if (winW > 1200) {
                setting = $.extend(settings3, common);
            }
            return setting;
        }

        method.reloadSliderSettings = function () {
            $slider.reloadSlider($.extend(method.getSliderSettings(), { startSlide: $slider.getCurrentSlide() }));
        }


        method.endResize = function () {
            if (new Date() - rtime < delta) {
                setTimeout(method.endResize, delta);
            } else {
                timeout = false;
                //ресайз окончен - пересчитываем
                method.reloadSliderSettings();
            }
        }

        method.startResize = function () {
            rtime = new Date();
            if (timeout === false) {
                timeout = true;
                setTimeout(method.endResize, delta);
            }
        }

        $slider.bxSlider(method.getSliderSettings());//запускаем слайдер

        $window.bind('resize', method.startResize);//пересчитываем кол-во видимых элементов при ресайзе окна с задержкой .2с
    }

    if ($('.js-event-slider').length) { initEventSlider() }

    //
    // Слайдер логотипов партнеров
    //---------------------------------------------------------------------------------------
    function initPartnerSlider() {
        var $slider = $('.js-partners-slider'),
            rtime, //переменные для пересчета ресайза окна с задержкой delta
            timeout = false,
            delta = 200,
            method = {};

        method.getSliderSettings = function () {
            var setting,
                    settings1 = {
                        maxSlides: 2,
                        minSlides: 2,
                    },
                    settings2 = {
                        maxSlides: 3,
                        minSlides: 3,
                    },
                     settings3 = {
                         maxSlides: 4,
                         minSlides: 4,
                         moveSlides: 4,
                     },
                    common = {
                        slideWidth: 280,
                        slideMargin: 0,
                        controls: false,
                        pager: false,
                        ticker: true,
                        speed: 80000
                    },
                    winW = $window.width();
            if (winW < 550) {
                setting = $.extend(settings1, common);
            }
            if (winW >= 550 && winW <= 1000) {
                setting = $.extend(settings2, common);
            }
            if (winW > 1000) {
                setting = $.extend(settings3, common);
            }
            return setting;
        }

        method.reloadSliderSettings = function () {
            $slider.reloadSlider($.extend(method.getSliderSettings(), { startSlide: $slider.getCurrentSlide() }));
        }


        method.endResize = function () {
            if (new Date() - rtime < delta) {
                setTimeout(method.endResize, delta);
            } else {
                timeout = false;
                //ресайз окончен - пересчитываем
                method.reloadSliderSettings();
            }
        }

        method.startResize = function () {
            rtime = new Date();
            if (timeout === false) {
                timeout = true;
                setTimeout(method.endResize, delta);
            }
        }

        $slider.bxSlider(method.getSliderSettings());//запускаем слайдер

        $window.bind('resize', method.startResize);//пересчитываем кол-во видимых элементов при ресайзе окна с задержкой .2с
    }
    if ($('.js-partners-slider').length) { initPartnerSlider() }


    //
    // Аккордеон в разделе Шаги реализации
    //---------------------------------------------------------------------------------------
    function initStepAccordion(el) {
        var method = {};

        method.initScroll = function () {//js-скролл во внутренних вкладках
            $('.js-scroll').each(function () {
                var $scroll = $(this);
                $scroll.perfectScrollbar({
                    wheelPropagation: true,
                    minScrollbarLength: 30,
                    maxScrollbarLength: 180
                });
            });
        }

        method.initTabs = function () {//запустим вкладки аккордеона
            var $tab = $('.step-tabs__content');
            $tab.not(':first').hide();
            $tab.filter(':first').parent('li').addClass('active');
        }

        method.openTabs = function (target) {//раскроем обе вкладки аккордеона по айди родителя
            if (target) {
                $(target).find('.step-tabs__content').each(function () {
                    if (!$(this).parent('li').hasClass('active')) {
                        $(this).slideDown().parent('li').addClass('active');
                    }
                });
            }
        }

        method.showTab = function (link) {//раскроем вкладку аккордеона по клику
            var target = link.attr('href');
            if (target) {
                link.parents('li').addClass('active');
                $(target).slideDown();
            }
        }

        method.hideTab = function (link) {//закроем вкладку аккордеона по клику
            var target = link.attr('href');
            if (target) {
                link.parents('li').removeClass('active');
                $(target).slideUp();
            }
        }

        method.scrollToTab = function (target) {//скролл при клике на описание шага (верхняя часть страницы) к соответств.шагу
            if (target) {
                $('html, body').animate({
                    scrollTop: $(target).offset().top
                }, 800);
            }
        }

        method.initIconTabs = function () {//запустим внутренние вкладки (с иконками)
            $('.js-icontabs').each(function () {
                var $tabs = $(this);
                $tabs.find('.icon-tabs__content').hide();
                var current = $tabs.find('.icon-tabs__item').filter(':first').addClass('current').children('a').attr('href');
                $(current).show();
                $tabs.perfectScrollbar('update');//обновили значение скролла
            });
        }

        method.showIconTab = function (el) {//покажем внутреннюю вкладку при клике на иконку
            var $tabs = el.parents('.js-icontabs'),
                target = el.attr('href');
            $tabs.find('.icon-tabs__item').removeClass('current');
            $tabs.find('.icon-tabs__content').hide();
            el.parent('li').addClass('current');
            $(target).fadeIn();
            $tabs.perfectScrollbar('update');//обновили значение скролла
        }


        method.initScroll();//подключили плагин скролла
        method.initIconTabs();//запустили внутренние вкладки
        method.initTabs();//скрыли все вкладки аккордеона кроме первой

        $('.js-step-acc').on('click', '.step-tabs__title', function (e) {//раскроем-скроем вкладку аккордеона по клику на заголовок
            e.preventDefault();
            var link = $(this);
            if (link.parents('li').hasClass('active')) {
                method.hideTab(link);
            } else {
                method.showTab(link);
            }
        });

        $('.js-step-links').on('click', '.b-change__link', function (e) {//по клику на блок с в разделе Изменения
            e.preventDefault();
            var target = $(this).attr('href');
            method.scrollToTab(target);//промотаем к соответствующему шагу
            method.openTabs(target);//и раскроем в нем блоки аккордеона
        });

        $('.js-icontabs').on('click', '.icon-tabs__link', function (e) {//переключение вкладок-иконок
            e.preventDefault();
            var $el = $(this);
            if ($el.parent('li').hasClass('current')) {
                return false;
            } else {
                method.showIconTab($el);
            }
        });

    }
    if ($('.js-step-acc').length) {
        initStepAccordion();
    }

    //
    // Кнопка скролла страницы
    //---------------------------------------------------------------------------------------
    (function () {
        var $scroller = $('<div class="scroll-up-btn"><i class="icon-up-open"></i></div>');
        $body.append($scroller);
        $window.on('scroll', function () {
            if ($(this).scrollTop() > 300) {
                $scroller.show();
            } else {
                $scroller.hide();
            }
        });
        $scroller.on('click', function () {
            $('html, body').animate({ scrollTop: 0 }, 800);
            return false;
        });
    })();


    //
    // Если браузер не знает о svg-картинках
    //---------------------------------------------------------------------------------------
    if (!Modernizr.svg) {
        $('img[src*="svg"]').attr('src', function () {
            return $(this).attr('src').replace('.svg', '.png');
        });
    };
    
    //
    // Если браузер не знает о плейсхолдерах в формах
    //---------------------------------------------------------------------------------------
    if (!("placeholder" in document.createElement("input"))) {
        $("input[placeholder], textarea[placeholder]").each(function () {
            var val = $(this).attr("placeholder");
            if (this.value == "") {
                this.value = val;
            }
            $(this).focus(function () {
                if (this.value == val) {
                    this.value = "";
                }
            }).blur(function () {
                if ($.trim(this.value) == "") {
                    this.value = val;
                }
            })
        });

        $('form').submit(function () {
            $(this).find("input[placeholder], textarea[placeholder]").each(function () {
                if (this.value == $(this).attr("placeholder")) {
                    this.value = "";
                }
            });
        });
    }
    
});
