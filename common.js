/**
 * common.js
 *@author Roger Huang
 *
 */
/*global $, document */
$(document).ready(function () {
    var apps = [
        {
            "id": "mail",
            "title": "Mail",
            "bg": "url('assets/apps.jpg') no-repeat -387px -113px transparent"
        },
        {
            "id": "iTunes",
            "title": "iTunes",
            "bg": "url('assets/apps.jpg') no-repeat -316px -31px transparent"
        },
        {
            "id": "camera",
            "title": "Camera",
            "bg": "url('assets/apps.jpg') no-repeat -230px -31px transparent",
            "apps": [
                {
                    "id": "ipod",
                    "title": "iPod",
                    "bg": "url('assets/apps.jpg') no-repeat -16px -31px transparent",
                    "apps": [
                        {
                            "id": "calendar",
                            "title": "Calendar",
                            "bg": "url('assets/apps.jpg') no-repeat -87px -31px transparent"
                        },
                        {
                            "id": "photos",
                            "title": "Photos",
                            "bg": "url('assets/apps.jpg') no-repeat -158px -31px transparent"
                        },
                        {
                            "id": "compass",
                            "title": "Compass",
                            "bg": "url('assets/apps.jpg') no-repeat -387px -31px transparent"
                        },
                        {
                            "id": "contacts",
                            "title": "Contacts",
                            "bg": "url('assets/apps.jpg') no-repeat -458px -31px transparent"
                        },
                        {
                            "id": "notes",
                            "title": "Notes",
                            "bg": "url('assets/apps.jpg') no-repeat -16px -196px transparent"
                        }
                    ]
                },
                {
                    "id": "youtube",
                    "title": "Youtube",
                    "bg": "url('assets/apps.jpg') no-repeat -87px -196px transparent"
                },
                {
                    "id": "skype",
                    "title": "Skype",
                    "bg": "url('assets/apps.jpg') no-repeat -158px -196px transparent"
                },
                {
                    "id": "tweetdeck",
                    "title": "TweetDeck",
                    "bg": "url('assets/apps.jpg') no-repeat -229px -196px transparent"
                },
                {
                    "id": "google",
                    "title": "Google",
                    "bg": "url('assets/apps.jpg') no-repeat -158px -278px transparent"
                },
                {
                    "id": "freewifi",
                    "title": "Free Wi-Fi",
                    "bg": "url('assets/apps.jpg') no-repeat -686px -113px transparent"
                },
                {
                    "id": "beacon",
                    "title": "Beacon",
                    "bg": "url('assets/apps.jpg') no-repeat -757px -113px transparent"
                },
                {
                    "id": "wordpress",
                    "title": "WordPress",
                    "bg": "url('assets/apps.jpg') no-repeat -529px -278px transparent"
                },
                {
                    "id": "grunts",
                    "title": "Grunts",
                    "bg": "url('assets/apps.jpg') no-repeat -615px -31px transparent"
                }
            ]
        },
        {
            "id": "stocks",
            "title": "Stocks",
            "bg": "url('assets/apps.jpg') no-repeat -529px -31px transparent"
        },
        {
            "id": "maps",
            "title": "Maps",
            "bg": "url('assets/apps.jpg') no-repeat -158px -113px transparent"
        },
        {
            "id": "weather",
            "title": "Weather",
            "bg": "url('assets/apps.jpg') no-repeat -229px -113px transparent"
        }
    ],
        ad = new AppDiscovr("apps", apps);

    ad.enable();
});