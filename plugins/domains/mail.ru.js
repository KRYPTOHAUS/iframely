var URL = require("url");

module.exports = {

    re: [
        /^https?:\/\/my\.mail\.ru\/(inbox|mail|list|bk|corp)\/[a-zA-Z0-9\._\-]+\/video\/([a-zA-Z0-9_]+)\/([a-zA-Z0-9_]+)\.html/i
    ],

    mixins: [
        "*"
    ],

    getLink: function(og, url) {

        if (og.type !== 'video.other' || !og.image) {
            return;
        }

        var thumbnail = URL.parse(og.image, true);
        var video_url = decodeURIComponent(thumbnail.query.url);

        if (/mail\.ru\/*.\/video\/url\/[a-z0-9]+\/(\d+)/i.test(video_url)) {

            return {
                    href: "https://my.mail.ru/video/embed/" + video_url.match(/mail\.ru\/*.\/video\/url\/[a-z0-9]+\/(\d+)/i)[1],
                    type: CONFIG.T.text_html,
                    rel: [CONFIG.R.player, CONFIG.R.ssl, CONFIG.R.html5],
                    "aspect-ratio": 626 / 367,
                    autoplay: "autoplay=1"
                };
        }
    },

    getData: function(meta, cb) {
        return cb(!meta.og ? {responseStatusCode: 404} : null);
    },

    tests: [
        "http://my.mail.ru/mail/ee.vlz/video/22396/44907.html",
        "http://my.mail.ru/mail/stryukova_lv/video/6177/1029.html",
        "http://my.mail.ru/mail/shiniavskii/video/_myvideo/4.html",
        "https://my.mail.ru/inbox/wwf00/video/11/46.html",
        {
            skipMethods: ['getData']
        }
    ]
};