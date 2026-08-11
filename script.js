/* ========================================
   Nico Sebastian Musa — Theme & Mobile Nav
   Externes Script (kein Inline-JS) —
   erlaubt strenge Content-Security-Policy.
   ======================================== */
(function() {
    'use strict';

    var THEME_KEY = 'theme-preference';
    var html = document.documentElement;

    // ---- Theme so früh wie möglich setzen (kein Flash; Default: light) ----
    var saved = localStorage.getItem(THEME_KEY);
    html.setAttribute('data-theme', saved === 'dark' ? 'dark' : 'light');

    function init() {
        // ---- Theme Toggle ----
        var btn = document.getElementById('themeToggle');

        function setTheme(mode) {
            html.setAttribute('data-theme', mode);
            localStorage.setItem(THEME_KEY, mode);
            if (btn) {
                var iconMap = { 'light': 'light_mode', 'dark': 'dark_mode' };
                var labelMap = { 'light': 'Hell', 'dark': 'Dunkel' };
                var icon = btn.querySelector('.material-symbols-outlined');
                if (icon) {
                    icon.textContent = iconMap[mode] || 'light_mode';
                }
                btn.setAttribute('aria-label', 'Farbschema: ' + (labelMap[mode] || 'Hell') + ' – zum Wechseln klicken');
                btn.setAttribute('title', 'Farbschema: ' + (labelMap[mode] || 'Hell'));
            }
        }

        var modes = ['light', 'dark'];
        function nextMode(current) {
            var idx = modes.indexOf(current);
            return modes[(idx + 1) % modes.length];
        }

        setTheme(localStorage.getItem(THEME_KEY) || 'light');

        if (btn) {
            btn.addEventListener('click', function() {
                var current = localStorage.getItem(THEME_KEY) || 'light';
                setTheme(nextMode(current));
            });
        }

        // ---- Mobile Nav Toggle ----
        var menuBtn = document.getElementById('mobileMenuBtn');
        var mobileNav = document.getElementById('mobileNav');
        if (menuBtn && mobileNav) {
            var menuIcon = menuBtn.querySelector('.menu-icon');
            var menuText = menuBtn.querySelector('.menu-text');
            menuBtn.addEventListener('click', function(e) {
                e.preventDefault();
                var isOpen = mobileNav.classList.toggle('is-open');
                menuBtn.setAttribute('aria-expanded', isOpen);
                if (menuIcon) menuIcon.textContent = isOpen ? 'close' : 'menu';
                if (menuText) menuText.textContent = isOpen ? 'Schließen' : 'Menü';
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
