const Polyglot = require('./polyglot.min');

let polyInst = null;
let i18n = window.i18n;
if (!i18n) {
    window.i18n = i18n = {
        languages: {},
        curLang: ''
    };
}

module.exports = {
    /**
     * This method allow you to switch language during runtime, language argument should be the same as your data file name
     * such as when language is 'zh', it will load your 'zh.js' data source.
     * @method init
     * @param language - the language specific data file name, such as 'zh' to load 'zh.js'
     */
    init (language) {
        (language === void 0) && (language = 'zh_CN');
        if (language === i18n.curLang) {
            return;
        }
        i18n.curLang = language;
        polyInst = null;
    },
    /**
     * this method takes a text key as input, and return the localized string
     * Please read https://github.com/airbnb/polyglot.js for details
     * @method t
     * @return {String} localized string
     * @example
     *
     * var myText = i18n.t('MY_TEXT_KEY');
     *
     * // if your data source is defined as
     * // {"hello_name": "Hello, %{name}"}
     * // you can use the following to interpolate the text
     * var greetingText = i18n.t('hello_name', {name: 'nantas'}); // Hello, nantas
     */
    t (key, opt) {
        if (!polyInst) {
            if (!i18n.curLang) {
                this.init();
            }
            let data = i18n.languages[i18n.curLang];
            if (data) {
                polyInst = new Polyglot({
                    phrases: data,
                    allowMissing: true
                });
            }
        }
        if (polyInst) {
            return polyInst.t(key, opt);
        }
    },

    updateSceneRenderers () { // very costly iterations
        let rootNodes = cc.director.getScene().children;
        // walk all nodes with localize label and update
        let allLocalizedLabels = [];
        for (let i = 0; i < rootNodes.length; ++i) {
            let labels = rootNodes[i].getComponentsInChildren('LocalizedLabel');
            Array.prototype.push.apply(allLocalizedLabels, labels);
        }
        for (let i = 0; i < allLocalizedLabels.length; ++i) {
            let label = allLocalizedLabels[i];
            label.updateLabel();
        }
        // walk all nodes with localize sprite and update
        let allLocalizedSprites = [];
        for (let i = 0; i < rootNodes.length; ++i) {
            let sprites = rootNodes[i].getComponentsInChildren('LocalizedSprite');
            Array.prototype.push.apply(allLocalizedSprites, sprites);
        }
        for (let i = 0; i < allLocalizedSprites.length; ++i) {
            let sprite = allLocalizedSprites[i];
            sprite.updateSprite(i18n.curLang);
        }
    }
};