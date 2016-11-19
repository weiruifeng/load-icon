/**
 * Created by ruifengwei on 2016/11/11.
 */
(function (window, factory) {
    'use strict';
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(window);
    } else if (typeof define === 'function' && define.amd) {
        define(function() {
            return factory(window);
        });
    } else {
        // browser global
        window.LoadStyle = factory(window);
    }
})(window, function (window) {
    'use strict';

    // 当前版本号
    var VERSION = '1.0.0';

    function LoadStyle (option) {
        this.initOption = {
            dom: $('#load'),
            width:  '20px',
            height: '20px',
            scale: 1,
            background: '#535353',
            color: '',
            long: 0,
            position: 'relative'
        };
        this.option = $.extend(this.initOption,option);
    }
    LoadStyle.prototype = {
        init: function() {
            var that = this;
            var option = that.option;
            var regNotNum = new RegExp(/[^0-9.]/,'g'),regNum = new RegExp(/[0-9.]/,'g');
            var fontSize = Math.min(option.width.replace(regNotNum,''),option.height.replace(regNotNum,'')) * Number(option.scale) + option.width.replace(regNum,'');
            var $dom = option.dom;
            var htmlString = '<div class="load-box"><i></i><i></i><i></i><i></i><i></i><i></i></div>';

            $dom.append(htmlString);

            $dom.css({
                position: option.position,
                width: option.width,
                height: option.height,
                background: option.background
            });

            $dom.find('.load-box').css({
                fontSize: fontSize
            });

            $dom.find('.circle-shade').css({
                background: option.background
            });

            var styleText = '';
            // var styleText = '.load-box i:before,:after{background: ' + option.color + ' !important}';

            if (option.color) {
                styleText += 'background: ' + option.color + ' !important;';

            }
            if (option.long) {
                styleText += 'height: ' + option.long / 2 + 'em !important;';
            }
            if (styleText) {
                var id = $dom.attr('id') ? ('#' + $dom.attr('id')) : '';
                styleText = id + ' .load-box i:before,'+ id + ' .load-box i:after{' + styleText + '}';
                that.insertCss(styleText);
            }
        },
        insertCss: function(styleText) {
            var style = document.createElement('style');
            style.innerText = styleText;
            document.body.appendChild(style);
        }
    };
    return LoadStyle;
});