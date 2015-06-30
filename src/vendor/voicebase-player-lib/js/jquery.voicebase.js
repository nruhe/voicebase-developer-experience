/**
 * jQuery VoiceBase Plugin v3
 */
var voiceBase = (function($) {
    "use strict";

    var VB = {
        instances: [],
        init: function(playerId) {
            var c = VB.instances.length;
            VB.instances.push(new VB.create_instance(c, playerId));
            c++;
            this.current_instance = c - 1;
        },
        create_instance: function(c, playerId) {
            this.instance_index = c;
            this.player = new VB.Player(this, playerId);
        }
    };

    /*** Start Voicebase Plugin Settings ***/
    VB.default_settings = {
        apiUrl: 'https://api.voicebase.com/services',
        apiKey: null,
        externalId: null,
        apiVersion: "1.1",
        mediaId: null,
        password: null,
        token: null,
        tokenTimeOut: 10,
        example: !1,
        exampleTokenUrl: 'http://demo.voicsebasejwplayer.dev4.sibers.com/extoken.php',
        helpUrl: 'http://www.voicebase.com/developers/',
        stream: false,
        mediaTypeOverride: null, // audio || video
        vbsButtons: {
            share: !0,
            comment: !0,
            downloadMedia: !0,
            downloadTranscript: !0,
            remove: !0,
            favorite: !0,
            help: !0,
            evernote: !0,
            edit: !1,
            print: !0,
            orderTranscript: !0,
            prev: !0,
            next: !0,
            fullscreen: !0,
            readermode: !0,
            pwrdb: !0,
            unquotes: !0
        },
        webHooks: {},
        addThisButtons: ['gmail', 'facebook', 'twitter', 'google_plusone_share', 'compact'],
        mediumResponsiveWithSpeakers: 600,
        mediumResponsive: 450,
        minResponsive: 400,
        voicebaseShare: !1,
        shareTitle: "Checkout this!",
        showMore: !1,
        shareParams: {},
        shareUrl: !1,
        trackEvents: !1,
        mediaBlock: 'vbs-media',
        mediaWidth: !1,
        controlsBlock: 'vbs-controls',
        controlsWidth: !1,
        searchBarOuter: !0,
        searchBarBlock: 'vbs-searchbar-block',
        searchBarBlockWidth: !1,
        tabView: !1,
        tabViewForMobile: !0,
        keywordsBlock: 'vbs-keywords',
        keywordsHeight: 170,
        keywordsWidth: !1,
        keywordsResizable: !1,
        keywordsGroups: !0,
        keywordsCounter: !0,
        editKeywords: !1,
        transcriptBlock: 'vbs-transcript',
        transcriptHeight: 148,
        transcriptWidth: !1,
        transcriptResizable: !1,
        transcriptHighlight: 10,
        transcriptCheckTimer: 10,
        turnTimes: !0,
        lineBreak: !1,
        commentsBlock: 'vbs-comments',
        humanOnly: !1,
        animation: !0,
        localApp: !1,
        localSearch: !1,
        localSearchHelperUrl: 'js/workers/',
        colors: ['#78c361', '#9932cc', '#ff69b4', '#6495ed', '#ffd700', '#f6a7a1', '#7fb397', '#009999'],
        filterSpeaker: 'all',
        playerType: 'youtube',
        playerId: 'ytplayer',
        keywordsColumns: !1,
        topicHover: !0,
        zeroclipboard: 'ZeroClipboard.swf',
        commentsUsername: !1,
        commentsUserhandle: !1,
        contextMenu: !0,
        debug: !0,
        toggleBlocks: !0,
        toggleMediaBlock: !0,
        toggleKeywordsBlock: !0,
        toggleTranscriptBlock: !0,
        toggleCommentBlock: !0,
        hasMediaBlockHeader: !0,
        hasKeywordsBlockHeader: !0,
        hasTranscriptBlockHeader: !0,
        hasCommentsBlockHeader: !0,
        showControlsBlock: !0,
        showKeywordsBlock: !0,
        showTranscriptBlock: !0,
        showCommentsBlock: !0,
        expandMediaBlock: !0,
        expandKeywordsBlock: !0,
        expandTranscriptBlock: !0,
        expandCommentsBlock: !1,
        expandNewsBlock: !1,
        newsUrl: 'https://stage.voicebase.com/bing/search?query=',
        newsBlock: 'vbs-news',
        newsWidth: !1,
        showNewsBlock: !1,
        toggleNewsBlock: !0,
        hasNewsBlockHeader: !0,
        markersInNativeTimeline: !1,
        cssPathForPlayerFrame: 'css/vbs-kaltura-iframe.css',
        modalErrors: !1,
        modalSave: !1,
        nativePlaylist: !0
    };
    VB.settings = {};
    /*** End Voicebase Plugin Settings ***/

    VB.reSettings = function(cs) {
        VB.settings = jQuery.extend(true, {}, VB.default_settings);
        VB.data = jQuery.extend(true, {}, VB.default_data);
        var s = VB.common.keysToLowerCase(cs);

        // Main
        setProperty(s, 'apiUrl');
        setProperty(s, 'apiKey');
        setProperty(s, 'externalId');
        setProperty(s, 'apiVersion');
        setProperty(s, 'mediaId');
        setProperty(s, 'password');
        setProperty(s, 'token');
        setProperty(s, 'tokenTimeOut');
        setProperty(s, 'example');
        setProperty(s, 'exampleTokenUrl');
        setProperty(s, 'stream');
        setProperty(s, 'debug');
        setProperty(s, 'toggleBlocks');
        setProperty(s, 'showControlsBlock');
        setProperty(s, 'showKeywordsBlock');
        setProperty(s, 'showTranscriptBlock');
        setProperty(s, 'showCommentsBlock');
        setProperty(s, 'showNewsBlock');
        setProperty(s, 'newsUrl');
        setProperty(s, 'modalErrors');
        setProperty(s, 'mediaTypeOverride');

        if(!VB.settings.toggleBlocks){
            VB.settings.toggleMediaBlock = false;
            VB.settings.toggleKeywordsBlock = false;
            VB.settings.toggleTranscriptBlock = false;
            VB.settings.toggleCommentBlock = false;
            VB.settings.toggleNewsBlock = false;

            VB.settings.expandMediaBlock = true;
            VB.settings.expandKeywordsBlock = true;
            VB.settings.expandTranscriptBlock = true;
            VB.settings.expandCommentsBlock = true;
            VB.settings.expandNewsBlock = true;
        }
        else{
            setProperty(s, 'toggleMediaBlock');
            setProperty(s, 'toggleKeywordsBlock');
            setProperty(s, 'toggleTranscriptBlock');
            setProperty(s, 'toggleCommentBlock');
            setProperty(s, 'toggleNewsBlock');

            setProperty(s, 'expandMediaBlock');
            setProperty(s, 'expandKeywordsBlock');
            setProperty(s, 'expandTranscriptBlock');
            setProperty(s, 'expandCommentsBlock');
            setProperty(s, 'expandNewsBlock');
        }

        if(!VB.settings.toggleMediaBlock) {
            VB.settings.expandMediaBlock = true;
        }
        if(!VB.settings.toggleKeywordsBlock) {
            VB.settings.expandKeywordsBlock = true;
        }
        if(!VB.settings.toggleTranscriptBlock) {
            VB.settings.expandTranscriptBlock = true;
        }
        if(!VB.settings.toggleCommentBlock) {
            VB.settings.expandCommentsBlock = true;
        }
        if(!VB.settings.toggleNewsBlock) {
            VB.settings.expandNewsBlock = true;
        }

        setProperty(s, 'hasMediaBlockHeader');
        if(!VB.settings.hasMediaBlockHeader){
            VB.settings.toggleMediaBlock = false;
        }

        setProperty(s, 'hasKeywordsBlockHeader');
        if(!VB.settings.hasKeywordsBlockHeader){
            VB.settings.toggleKeywordsBlock = false;
        }

        setProperty(s, 'hasTranscriptBlockHeader');
        if(!VB.settings.hasTranscriptBlockHeader){
            VB.settings.toggleTranscriptBlock = false;
        }

        setProperty(s, 'hasCommentsBlockHeader');
        if(!VB.settings.hasCommentsBlockHeader){
            VB.settings.toggleCommentBlock = false;
        }

        setProperty(s, 'hasNewsBlockHeader');
        if(!VB.settings.hasNewsBlockHeader){
            VB.settings.toggleNewsBlock = false;
        }

        if (typeof s.actionflag !== 'undefined') {
            for (var i in s.actionflag) {
                VB.settings.vbsButtons[i] = s.actionflag[i];
            }
        }
        setProperty(s, 'webHooks');
        setProperty(s, 'helpUrl');
        if(!VB.settings.helpUrl && !VB.settings.webHooks.help) {
            VB.settings.vbsButtons.help = false;
        }

        setProperty(s, 'mediumResponsiveWithSpeakers');
        setProperty(s, 'mediumResponsive');
        setProperty(s, 'minResponsive');
        setProperty(s, 'showMore');
        setProperty(s, 'animation');
        setProperty(s, 'playerType');
        setProperty(s, 'playerId');
        setProperty(s, 'contextMenu');
        setProperty(s, 'trackEvents');

        // Share
        setProperty(s, 'shareParams');
        setProperty(s, 'shareUrl');
        setProperty(s, 'shareTitle');
        setProperty(s, 'addThisButtons');
        setProperty(s, 'voicebaseShare');
        setProperty(s, 'zeroclipboard');

        // Media
        setProperty(s, 'mediaBlock');
        setBlockWidth(s, 'mediaWidth');
        setProperty(s, 'controlsBlock');
        setBlockWidth(s, 'controlsWidth');

        setProperty(s, 'tabView');
        setProperty(s, 'tabViewForMobile');
        if(VB.helper.isMobile() && VB.settings.tabViewForMobile) {
            VB.settings.tabView = true;
        }
        if(!VB.settings.tabView){
            // Keywords
            setProperty(s, 'searchBarOuter');
            setProperty(s, 'keywordsBlock');
            setProperty(s, 'keywordsHeight');
            setBlockWidth(s, 'keywordsWidth');
        }
        else{
            VB.settings.searchBarOuter = true;
            $('#' + s.keywordsblock).empty();
        }
        if(VB.settings.searchBarOuter) {
            setProperty(s, 'searchBarBlock');
            setBlockWidth(s, 'searchBarBlockWidth');
        }

        setProperty(s, 'keywordsColumns');
        setProperty(s, 'keywordsResizable');
        setProperty(s, 'editKeywords');
        setProperty(s, 'localApp');
        setProperty(s, 'localSearch');
        if(VB.settings.localApp && typeof Fuse != 'undefined'){
            VB.settings.localSearch = true;
            VB.settings.showCommentsBlock = false;
            VB.settings.vbsButtons.edit = false;
            VB.settings.vbsButtons.downloadMedia = false;
            VB.settings.vbsButtons.downloadTranscript = false;
            VB.settings.vbsButtons.favorite = false;
            VB.settings.vbsButtons.remove = false;
            VB.settings.vbsButtons.share = false;
            VB.settings.vbsButtons.orderTranscript = false;
        }
        if(typeof Fuse == 'undefined'){
            VB.settings.localSearch = false;
        }
        if(VB.settings.localSearch && typeof localSearchHelper === 'undefined') {
            setProperty(s, 'localSearchHelperUrl');
            jQuery.ajax({
                url: VB.settings.localSearchHelperUrl + 'localSearchHelper.js',
                dataType: 'script',
                async: true
            });
        }

        setProperty(s, 'topicHover');
        setProperty(s, 'keywordsGroups');
        setProperty(s, 'keywordsCounter');

        // Transcript
        if(!VB.settings.tabView){
            setProperty(s, 'transcriptBlock');
            setProperty(s, 'transcriptHeight');
            setBlockWidth(s, 'transcriptWidth');
        }
        else {
            $('#' + s.transcriptblock).empty();
        }
        setProperty(s, 'transcriptResizable');
        setProperty(s, 'transcriptHighlight');
        setProperty(s, 'turnTimes');
        setProperty(s, 'lineBreak');
        setProperty(s, 'humanOnly');

        // Comments
        if(!VB.settings.tabView){
            setProperty(s, 'commentsBlock');
            setBlockWidth(s, 'commentsWidth');
        }
        else {
            $('#' + s.commentsblock).empty();
        }

        setProperty(s, 'commentsUsername');
        setProperty(s, 'commentsUserhandle');

        if(VB.settings.playerType == 'jwplayer'){
            var playlist = jwplayer(VB.settings.playerId).config.playlist;
            VB.settings.hasPlaylist = !!(playlist && playlist.length > 1 && !VB.settings.mediaId);
        }

        if(!VB.settings.tabView){
            setProperty(s, 'newsBlock');
            setBlockWidth(s, 'newsWidth');
        }
        else {
            $('#' + s.newsblock).empty();
        }

        setProperty(s, 'markersInNativeTimeline');
        if(VB.settings.markersInNativeTimeline) {
            VB.settings.showControlsBlock = false;
        }
        setProperty(s, 'cssPathForPlayerFrame');
        setProperty(s, 'modalSave');
        setProperty(s, 'nativePlaylist');
    };

    var setProperty = function(lowerProps, propertyName){
        var lowerPropertyName = propertyName.toLowerCase();
        VB.settings[propertyName] = (typeof lowerProps[lowerPropertyName]!== 'undefined') ? lowerProps[lowerPropertyName] : VB.settings[propertyName];
    };

    var setBlockWidth = function(keys_lower, prop){
        var low_prop = prop.toLowerCase();
        if(VB.helper.isMobile()) {
//            keys_lower[low_prop] = VB.helper.getMobileWidth();
        }
        VB.settings[prop] = typeof keys_lower[low_prop] !== 'undefined' ? (keys_lower[low_prop] < 220 ? 220 : keys_lower[low_prop]) : VB.settings[prop];
    };

    VB.default_data = {
        customMarkers: {},
        speakers: {},
        allSpeakers: [],
        vbsSpeakers: {},
        keywords: {},
        duration: null,
        vclass: null,
        sclass: null,
        position: 0,
        commentsThreads: null,
        startParams: [],
        played: 0,
        playerDom: null,
        playerHeight: null,
        movelistner: !1,
        dragging: !1,
        draggingVol: !1,
        kf: false,
        tf: false,
        lspeaker: null,
        clicker: false,
        waiterSave: false,
        metadataWaiter: false,
        isSaving: false,
        searcht: null,
        searchHits: null,
        localData: {},
        isMobile: false,
        keywordClickEvent: null,
        playlist_meta: null
    };
    VB.data = {};


    $.fn.voicebase = function(method) {

        if (VB.methods[method]) {
            return VB.methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return VB.methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.vbplugin');
        }

    };

    return VB;
})(jQuery);
/*
* VB.api
* Interaction with the server
* */
voiceBase = (function(VB, $) {
    "use strict";

    VB.api = {
        inited: !1,
        init: function() {
            this.inited = !0;
            this.parameters = jQuery.extend(true, {}, this.default_parameters);
            if (VB.settings.mediaId) {
                this.parameters.mediaid = VB.settings.mediaId;
                delete this.parameters.externalid;
            } else {
                this.parameters.externalid = VB.settings.externalId;
                delete this.parameters.mediaid;
            }
            if (VB.settings.token || VB.settings.example) {
                this.parameters.token = VB.settings.token;
                delete this.parameters.apikey;
                delete this.parameters.password;
            } else {
                delete this.parameters.token;
                this.parameters.apikey = VB.settings.apiKey;
                this.parameters.password = VB.settings.password;
            }

            VB.api.response = {
                metadata: null,
                keywords: null,
                transcript: null,
                comments: null
            };
            VB.api.data = {
                keywords: {},
                comments: {},
                tmp: {}
            };
            VB.api.ready =  {
                metadata: !1,
                keywords: !1,
                transcript: !1,
                comments: !1
            };
            VB.api.errors =  {
                processing: 0,
                failure: 0
            };
            this.showProcessingMsg = false;
            this.endSearch = false;
        },
        default_parameters: {
            'version': VB.default_settings.apiVersion,
            'ModPagespeed': 'off'
        },
        parameters: {},
        getToken: function(timeout) {
            if(VB.helper.isApi2_0()) {
                VB.api2_0.getToken();
            }
            else {
                var _parameters = {};
                jQuery.extend(_parameters, this.parameters);
                _parameters.action = 'getToken';
                _parameters.timeout = timeout;
                delete _parameters.mediaid; // so we can send requests for many mediaIds with one token
                delete _parameters.externalid;
                VB.api.call(_parameters, VB.api.setToken);
            }
        },
        setToken: function(data) {
            if (data.requestStatus == 'SUCCESS') {
                VB.settings.token = data.token;
                VB.view.initWithToken();
            } else {
                alert(data.statusMessage);
            }
        },
        getExampleToken: function() {
            var _parameters = {};
            VB.api.callCustom(VB.settings.exampleTokenUrl, _parameters, VB.api.setExampleToken);
        },
        setExampleToken: function(data) {
            if (data.success === true) {
                VB.settings.token = data.token;
                VB.api.parameters.token = data.token;
                VB.view.initWithToken();
            } else {
                alert(data.message);
            }
        },
        getMetaData: function() {
            VB.data.metadataWaiter = setInterval(function() {
                if(VB.data.metadataWaiter) {
                    if(VB.PlayerApi.isPlayerReady()) {
                        clearInterval(VB.data.metadataWaiter);
                        VB.data.metadataWaiter = null;
                        if(VB.settings.hasPlaylist && VB.settings.stream) {
                            var playlist = VB.PlayerApi.getPlaylist();
                            if(!VB.data.playlist_meta) {
                                VB.api.getMetaDataForPlaylist(playlist);
                            }
                            else {
                                var item = VB.PlayerApi.getCurrentPlaylistItem();
                                var vbs_id = VB.PlayerApi.getPlaylistItemId(item);
                                VB.api.setMetaData(VB.data.playlist_meta.metadata[vbs_id.id]);
                            }
                        }
                        else if(VB.helper.isApi2_0()) {
                            VB.api2_0.getMetaData();
                        }
                        else {
                            var _parameters = {};
                            jQuery.extend(_parameters, VB.api.parameters);
                            _parameters.action = 'getFileMetaData';
                            _parameters.confidence = '0.0';
                            VB.api.call(_parameters, VB.api.setMetaData);
                        }
                    }
                }
            }, 10);
        },
        setMetaData: function(data) {
            var $media_block = VB.helper.find('.vbs-media-block');
            if(data.requestStatus != 'SUCCESS') {
                data = VB.api.createMetaData();
            }
            if (data.requestStatus == 'SUCCESS' && data.response.fileStatus != 'PROCESSING') {
                if(data.self_made) {
                    $media_block.find('.vbs-download-audio-btn').addClass('vbs-disable-button');
                    $media_block.find('.vbs-del-btn').addClass('vbs-disable-button');
                    $media_block.find('.vbs-star-btn').addClass('vbs-disable-button');
                }

                VB.api.response.metadata = data;
                if(data.response.lengthMs) {
                    VB.data.duration = data.response.lengthMs / 1000;
                    VB.view.renderTimeInMediaTitle();
                }
                else {
                    $('.vbs-time').hide();
                }

                VB.helper.find('.voicebase_record_times').show();
                VB.helper.find('.vplayer').show();
                var $player = $('#' + VB.settings.playerId);
                if (VB.settings.playerType == 'jwplayer') {
                    VB.data.playerDom = (VB.PlayerApi.getRenderingMode() === 'flash') ? $player.parent() : $player;
                    VB.data.playerDom.addClass('vbs-player-wrapper vbs-' + VB.helper.randId());
                }
                else if(VB.settings.playerType == 'kaltura'){
                    VB.data.playerDom = $('#' + VB.settings.playerId);
                    VB.data.playerDom.addClass('vbs-player-wrapper vbs-' + VB.helper.randId());
                }
                else if(VB.settings.playerType == 'sublime'){
                    VB.data.playerDom = $player.parent(); // sbulime player should be in container
                    VB.data.playerDom.addClass('vbs-player-wrapper vbs-' + VB.helper.randId());
                    var $controlsBlock =  $("#" + VB.settings.controlsBlock);
                    $controlsBlock.find('.vbs-record-player').addClass('vbs-1-right-btns').find('.vbs-volume-toolbar').remove();
                }
                else if(VB.settings.playerType == 'jplayer'){
                    var jplayer_interface = VB.instances[VB.current_instance].player.interface;
                    if(jplayer_interface){
                        VB.data.playerDom = jplayer_interface.getGui();
                        VB.data.playerDom.addClass('vbs-player-wrapper vbs-' + VB.helper.randId());
                    }
                }
                else {
                    if($('.vbs-player-wrapper').length === 0){
                        VB.data.playerDom = $('#' + VB.settings.playerId);
                        VB.data.playerDom.before('<div class="vbs-player-wrapper vbs-' + VB.helper.randId() + '"></div>');
                    }
                }
                if (!VB.helper.isMediaTypeEqualVideo()) {
                    VB.PlayerApi.hidePlayer();
                } else {
                    $media_block.addClass('vbs-video');
                    $('.vbs-video .vbs-section-title').attr('data-title', 'Hide Video');
                    VB.helper.find('.vbs-record-player').addClass('vbs-video');
                    var cont = VB.helper.findc('.vbs-player-wrapper');
                    var playerWidth = $('#' + VB.settings.playerId).width();
                    $("#" + VB.settings.mediaBlock).insertBefore(cont).css('width', playerWidth);
                    if (playerWidth < VB.settings.mediumResponsive && playerWidth >= VB.settings.minResponsive) {
                        $media_block.addClass('less-600px');
                    } else if (playerWidth < VB.settings.minResponsive) {
                        $media_block.addClass('less-600px').addClass('less-460px');
                    }
                    if (VB.settings.vbsButtons.fullscreen) {
                        $media_block.find(".vbs-section-btns ul").append('<li><a href="#" class="vbs-expand-btn" data-title="Expand Video"></a></li>');
                    }
                    if(!VB.settings.expandMediaBlock) {
                        VB.helper.find(".vbs-media-block .vbs-section-title").click();
                    }
                }
                VB.helper.adjustMediaTime();

                if (data.response.isFavorite) {
                    VB.helper.find(".vbs-star-btn").addClass('vbs-active').attr('data-title', 'Remove to Favorites');
                } else {
                    VB.helper.find(".vbs-star-btn").attr('data-title', 'Add from Favorites');
                }
                VB.helper.checkAutoStart();
            } else {
                $media_block.append(VB.templates.get('disabler'));
                VB.helper.find('.vbs-record-player').append(VB.templates.get('disabler'));
                VB.api.setErrors(data);
            }
            VB.api.ready.metadata = true;
        },
        getMetaDataForPlaylist: function(playlist) {
            VB.data.playlist_meta = {};
            VB.data.playlist_meta.promises = [];
            VB.data.playlist_meta.metadata = {};

            for (var i = 0; i < playlist.length; i++) {
                var item = playlist[i];
                VB.api.setMetaDataPromise(item);
            }

            $.when.apply(this, VB.data.playlist_meta.promises).then(function(){
                VB.api.resolveMetaDataPromise(playlist);
            });
        },
        setMetaDataPromise: function(item){
            var _parameters = {};
            jQuery.extend(_parameters, this.parameters);
            _parameters.action = 'getFileMetaData';
            _parameters.confidence = '0.0';

            delete _parameters.mediaid;
            delete _parameters.externalid;

            var id;
            if(item.vbs_mediaid) {
                _parameters.mediaid = id = item.vbs_mediaid;
            }
            else if(item.vbs_externalid) {
                _parameters.externalid = id = item.vbs_externalid;
            }

            var _request = $.getJSON(VB.settings.apiUrl, _parameters).done(function(json) {
                VB.data.playlist_meta.metadata[id] = json;
            }).fail(function(jqxhr, textStatus, error) {
                console.log(jqxhr);
            });
            VB.data.playlist_meta.promises.push(_request);
        },
        resolveMetaDataPromise: function(playlist){
            var _list = [];
            for (var i = 0; i < playlist.length; i++) {
                var item = playlist[i];
                var isMediaId = false;
                var vbs_id_data = VB.PlayerApi.getPlaylistItemId(item);
                var vbs_id = vbs_id_data.id;

                if(VB.data.playlist_meta.metadata[vbs_id]) {
                    var meta_response = VB.data.playlist_meta.metadata[vbs_id].response;
                    var streamUrl;
                    if(meta_response) {
                        streamUrl = VB.PlayerApi.getStreamUrl(meta_response);
                    }
                    else {
                        streamUrl = item.file;
                        VB.data.playlist_meta.metadata[vbs_id] = VB.api.createMetaData();
                    }

                    var res = {
                        file: streamUrl,
                        title: item.title
                    };
                    if(vbs_id_data.isMediaid) {
                        res.vbs_mediaid = vbs_id;
                    }
                    else {
                        res.vbs_externalid = vbs_id;
                    }
                    _list.push(res);

                    if(i === 0) {
                        VB.api.setMetaData(VB.data.playlist_meta.metadata[vbs_id]);
                    }
                }
            }
            VB.PlayerApi.loadFile(_list);
        },
        setLocalMetaData: function(){
            VB.data.localData['metadata'] = VB.api.createMetaData();
            VB.api.setMetaData(VB.data.localData['metadata']);
        },
        createMetaData: function(){
            var duration = VB.PlayerApi.getDuration() * 1000;
            var lengthMs = (duration > 0) ? duration : 0;
            return  {
                requestStatus: "SUCCESS",
                self_made: true,
                response: {
                    lengthMs: lengthMs,
                    hasVideo: true,
                    isFavorite: false
                }
            };
        },
        getKeywords: function() {
            var _parameters = {};
            jQuery.extend(_parameters, this.parameters);
            _parameters.action = 'getFileAnalyticsSnippets';
            _parameters.returnCategories = '1';
            _parameters.includeStartTimes = true;
            if (VB.settings.keywordsGroups) {
                _parameters.returnGroups = true;
            }
            VB.api.call(_parameters, VB.api.setKeywords);
        },
        setKeywords: function(data) {
            var $keywords_block = VB.helper.find('.vbs-keywords-block');
            if (data.requestStatus == 'SUCCESS') {
                VB.api.response.keywords = data;

                var keywords = [];
                var catArray = [];
                var speakersArray = [];
                var speakersName = [];
                for (var key in data.categories) {
                    catArray.push(data.categories[key]);
                }
                if (VB.settings.keywordsGroups) {
                    for (key in data.groups) {
                        catArray.push(data.groups[key]);
                    }
                }
                keywords = data.keywords;
                var categories = jQuery.map(catArray, function(item) {
                    var parsedSpeakers = VB.speakers.parseSpeakersInCategory(item, speakersName, speakersArray);
                    speakersName = parsedSpeakers.speakersName;
                    speakersArray = parsedSpeakers.speakersArray;
                    return {
                        "name": item.name,
                        "score": item.score,
                        "subcategories": item.subcategories,
                        "similarCategories": item.similarCategories,
                        "speakers": parsedSpeakers.isps,
                        "type": item.type
                    };
                });
                categories.sort((function(first, second) {
                    return first.score - second.score;
                }));
                categories.reverse();

                var allTopicItem = {
                    'name': 'ALL TOPICS',
                    'keywords': keywords,
                    'subcategories': {},
                    'similarCategories': {},
                    'speakers': speakersArray.join()
                };
                categories.unshift(allTopicItem);

                var ka = [];
                for (var ki in data.keywords) {
                    ka.push(data.keywords[ki].name);
                }

                VB.data.keywords = ka;

                catArray.push(allTopicItem);

                var catUl = '<ul class="vbs-topics-list">';
                var li = "";
                var k = 0;
                for (var i in categories) {
                    if (typeof categories[i] == 'undefined') {
                        continue;
                    }
                    var subCats = '';
                    if (typeof categories[i].subcategories != 'undefined' && categories[i].subcategories.length) {
                        //sort by score
                        for (var n in categories[i].subcategories) {
                            subCats += categories[i].subcategories[n].name + '<br/>';
                        }
                    }
                    var typeClass = categories[i].type == 'group' ? 'group': '';

                    li += " " + VB.templates.parse('categoriesLiTemplate', {
                        'title': categories[i].name,
                        'subcategories': subCats,
                        'speakers': categories[i].speakers,
                        'liclass': categories[i].name == 'ALL TOPICS' ? 'vbs-all-topics vbs-active' : typeClass
                    });
                    k++;
                }

                catUl += li + "</ul>";
                catArray.sort((function(first, second) {
                    return second.keywords.length - first.keywords.length;
                }));

                /// keywords
                var allSpeakersAr = [];
                var ull = $();
                for (var j in catArray) {
                    var typeGroupClass = catArray[j]['type'] == 'group' ? 'class="group"': '';

                    var fc = catArray[j]['name'] == 'ALL TOPICS' ? 'class="vbs-active"' : typeGroupClass;
                    var $innerUl = $('<ul tid="' + catArray[j]['name'] + '" ' + fc + '></ul>');
                    var tk = catArray[j]['keywords'];

                    for (key in tk) {
                        var sptimes = "";
                        var spkeys = [];
                        var times = [];
                        var item = tk[key];
                        for (var spt in tk[key].t) {
                            if (tk[key].t !== '' && tk[key].t[spt]) {
                                var timses = tk[key].t[spt];
                                for (var timse in timses) {
                                    times.push(timses[timse]);
                                }
                            }
                            var speaker_name = VB.helper.replaceAndTrim(spt);
                            var speaker_key = VB.speakers.getSpeakerKeyByName(speaker_name);
                            sptimes += 'data-spt-' + speaker_key + '="' + (tk[key].t !== '' && tk[key].t[spt] ? tk[key].t[spt].join() : '') + '" ';
                            spkeys.push(speaker_key);
                            if (allSpeakersAr.indexOf(speaker_name) == '-1') {
                                allSpeakersAr.push(speaker_name);
                            }
                        }

                        var keyclass = tk[key].t ? 'class="key"' : '';
                        var internalName = typeof tk[key].internalName == 'undefined' ? tk[key].name : tk[key].internalName.join();
                        var keycounter = VB.settings.keywordsCounter ? ' <span>(' + times.length + ')</span>' : '';
                        // create string is more faster than VB.templates.parse('keywordsTemplate', {...})
                        var keywordsTemplate = '<li ' + keyclass + '>' +
                            '   <a href="#" t="' + times.join() + '" speakers="' + spkeys + '" ' + sptimes + '>' + tk[key].name + '</a>' + keycounter +
                            '</li>';
                        var $innerLi = $(keywordsTemplate);
                        $innerLi.find('a').data('keywordInternalName', internalName);
                        $innerUl.append($innerLi);
                    }
                    ull = ull.add($innerUl);
                }

                if (VB.settings.keywordsColumns && VB.settings.keywordsColumns != 'auto') {
                    VB.helper.find('.vbs-keywords-list-wrapper').addClass(VB.helper.getColumnClassByNumber(VB.settings.keywordsColumns));
                }

                $keywords_block.find('.vbs-topics').html(catUl);
                $keywords_block.find('.vbs-keywords-list-tab').html(ull);
                if(!VB.settings.expandKeywordsBlock) {
                    $keywords_block.show();
                    $keywords_block.find(".vbs-section-title").attr('data-title', 'Show Keywords');
                    $keywords_block.find('.vbs-section-body').hide();
                    $keywords_block.find('.vbs-search-form').hide();
                }
                else {
                    $keywords_block.slideDown('fast', function() {
                        if (VB.settings.keywordsColumns && VB.settings.keywordsColumns == 'auto') {
                            VB.helper.keywordsAutoColumns();
                        } else if (VB.settings.keywordsColumns && VB.settings.keywordsColumns == 'topics') {
                            VB.helper.keywordsAutoTopicsColumns();
                        }
                    });
                }
            } else {
                $keywords_block.append(VB.templates.get('disabler'));
                if(!VB.settings.tabView) {
                    $keywords_block.show();
                    $keywords_block.find('.vbs-search-form').hide();
                    $keywords_block.find('.vbs-section-body').hide();
                }

                if(VB.settings.searchBarOuter) {
                    $('#vbs-voice_search_txt').prop('disabled', 'disabled');
                    $('#vbs-searchbar-block').find('.vbs-search-form').addClass('vbs-form-disabled');
                }
                VB.api.setErrors(data);
            }
            VB.api.ready.keywords = true;
        },
        getTranscript: function() {
            var _parameters = {};
            jQuery.extend(_parameters, this.parameters);
            _parameters.action = 'getKeywords';
            _parameters.confidence = '0.0';
            VB.api.call(_parameters, VB.api.setTranscript);
        },
        setTranscript: function(data) {
            VB.api.response.transcript = data;
            var $transcript_block = VB.helper.find('.vbs-transcript-block');
            if (data.requestStatus == 'FAILURE' || (data.fileStatus != "MACHINECOMPLETE" && data.fileStatus != "HUMANCOMPLETE")) {
                VB.api.ready.transcript = true;
                VB.api.setErrors(data);
                if(data.requestStatus === 'FAILURE' && (!data.transcript || (data.transcript && data.transcript.length === 0))){
                    $transcript_block.addClass('vbs-ho').append(VB.templates.get('disabler')).show();
                    return false;
                }
            }
            if (data.transcriptType == 'human') {
                $transcript_block.addClass('vbs-human').find('.vbs-section-title').attr('data-title', 'Hide Transcript');
            } else {
                if (VB.settings.vbsButtons.orderTranscript) {
                    $transcript_block.addClass('vbs-with-order-btn');
                }
            }

            if (VB.settings.humanOnly && data.transcriptType == 'machine') {
                return false;
            }
            var transcript = [],
                transpart = '',
                lt = 0,
                dt = data.transcript,
                last = 0,
                spturn = 0,
                spf = false;
            var dt_length = dt.length;
            for (var i = 0; i < dt_length; i++) {
                var val = dt[i];
                if (i === 0) {
                    transpart += '<span t="' + 0 + '">';
                }
                for (var k = 2; k <= 10; k++) {
                    if (Math.floor(val.s / 1000) >= (last + VB.settings.transcriptHighlight * k)) {
                        last += VB.settings.transcriptHighlight * k;
                        transpart += '<span t="' + last + '"></span>';
                    }
                }
                if (Math.floor(val.s / 1000) >= (last + VB.settings.transcriptHighlight)) {
                    last += VB.settings.transcriptHighlight;
                    transpart += '</span><span t="' + last + '">';
                }
                lt += val.s;

                var isTurn = VB.helper.isTurn(val.m);
                var sptag = VB.speakers.createSpeakerAttr(val);

                spturn = (isTurn) ? spturn + 1 : spturn;
                var br = (isTurn && i > 2) ? '<br/><br/>' : '';
                var br2 = (VB.settings.lineBreak && typeof dt[i - 1] !== "undefined" && dt[i].s - dt[i - 1].e > VB.settings.lineBreak * 1000) ? '<br/><br/>' : '';
                var fw = '';
                if (i === 0 && typeof val.m === "undefined") {
                    fw = 'data-f=true';
                    spf = true;
                }
                var word = VB.helper.replaceN(val.w);
                transpart += val.w.match(/\w+/g) ? br + br2 + '<span class="w" t="' + val.s + '" ' + sptag + ' ' + fw + '> ' + word + '</span>' : '<span t="' + val.s + '" ' + sptag + '>' + word + '</span>';
            }

            transpart += '</span>';
            $transcript_block.find('.vbs-transcript-wrapper').html(transpart);
            if (spturn && spf) {
                $transcript_block.find('.vbs-transcript-wrapper span[data-f=true]').before('<span class="w" t="0" m=">> "><br><br>&gt;&gt; </span>');
            }
            if ($transcript_block.not('.vbs-human').length && (!VB.settings.expandTranscriptBlock)) {
                $transcript_block.find('.vbs-section-body').hide();
                $transcript_block.find('.vbs-section-title').addClass('vbs-hidden').attr('data-title', 'Show Transcript');
            }
            $transcript_block.find(".vbs-transcript-prewrapper").css('height', VB.settings.transcriptHeight + "px");
            $transcript_block.slideDown('fast');
            var orderTranscriptURL = VB.settings.apiUrl.replace('services', 'orderTranscript');
            var mediaid = VB.settings.mediaId ? VB.settings.mediaId : VB.settings.externalId;
            var order_transcript_url = orderTranscriptURL + '/' + mediaid + '?token=' + VB.settings.token + '&cancel=close';
            VB.helper.find('.vbs-order-human-trans a').attr('href', order_transcript_url);

            $.map(data.transcript, function(val) {
                transcript.push(val.w);
            });
            VB.api.ready.transcript = true;

            if (VB.settings.transcriptResizable && $.isFunction($.fn.resizable)) {
                var $transcriptWrap = $('#' + VB.settings.transcriptBlock);
                var $transcriptBody = $transcriptWrap.find('.vbs-section-body');
                var transMinWidth = $transcriptWrap.width();
                var transcript_offset = $transcriptWrap.offset();
                var transMaxWidth = (transcript_offset && transcript_offset.left) ?  $(document).width() - Math.round(transcript_offset.left) - 10 : $transcriptWrap.width();
                VB.helper.find('.vbs-resizable').resizable({
                    minWidth: transMinWidth,
                    maxWidth: transMaxWidth,
                    resize: function() {
                        var transWidth = ($(this).width());
                        $transcriptBody.width(transWidth);
                        $transcriptBody.siblings('.vbs-section-header').width(transWidth);
                        VB.helper.checkScrollForResize($transcriptBody);
                    }
                });
                VB.helper.checkScrollForResize($transcriptBody);
            }

            if(data.fileStatus == 'REPROCESSING' && !VB.settings.modalSave) {
                VB.helper.setIsSaving(true);
                VB.api.triggerTranscriptStatus();
            }
        },
        searchInfo: function () {
            var me = this;
            me.showProcessingMsg = false;
            me.endSearch = false;
            setTimeout(function() {
                me.showProcessingMsg = true;
                if(!me.endSearch) {
                    VB.helper.showMessage('Processing your search...', 'info');
                }
            }, 500);

            setTimeout(function() {
                if(!me.endSearch && me.showProcessingMsg) {
                    VB.helper.clearMessage();
                    var endMessage = VB.templates.get('endSearchMessage');
                    VB.helper.appendMessage(endMessage);
                }
            }, 2000);
        },
        getSearch: function(terms, start) {
            var me = this;
            VB.data.clicker = true;
            if(!VB.data.keywordClickEvent) {
                VB.helper.collapseNewsBlock();
            }
            start = !(typeof start !== 'undefined' && start === false);
//            VB.api.getNews();
            if(VB.settings.localSearch){
                VB.api.getLocalSearch(terms, start);
            }
            else {
                var terms_string = terms.join(' ').toLowerCase();
                var _parameters = {};
                jQuery.extend(_parameters, this.parameters);
                _parameters.action = 'searchFile';
                _parameters.terms = terms_string;

                VB.api.searchInfo();
                VB.api.call(_parameters, function (json, args) {
                    me.endSearch = true;
                    if(json.numberOfHits > 1000) {
                        VB.helper.showMessage('Displaying your search results...', 'info');
                    }

                    VB.api.setSearch(json, args);
                }, {start: start, terms: terms});
            }
        },
        getLocalSearch: function(terms, start) {
            var me = this;
            var results;
            if (!!window.Worker && typeof localSearchHelper !== 'undefined') {
                VB.api.searchInfo();
                VB.data.searchWorker = new Worker(VB.settings.localSearchHelperUrl + 'localSearchWorker.js');

                VB.data.searchWorker.onerror = function(e){
                    VB.helper.showMessage('Search error!', 'error');
                    console.log(['ERROR: Line ', e.lineno, ' in ', e.filename, ': ', e.message].join(''));
                };

                VB.data.searchWorker.onmessage = function(e) {
                    clearInterval(VB.events.time);
                    VB.events.time = null;
                    me.endSearch = true;
                    results = e.data.results;
                    var resultsLength = 0;
                    results.hits.hits.forEach(function(hits) {
                        resultsLength += hits.hits.length;
                    });
                    if(resultsLength > 1000) {
                        VB.helper.showMessage('Displaying your search results...', 'info');
                    }

                    var renderTimer = setInterval(function() {
                        if(renderTimer) {
                            if($('.vbs-markers').find('.vbs-marker').length === resultsLength) {
                                clearInterval(renderTimer);
                                renderTimer = null;
                                VB.helper.clearMessage();
                                VB.helper.setOnTimeInterval();
                            }
                        }
                    }, 100);

                    setTimeout(function() {
                        VB.api.setSearch(results, {start: start, terms: terms});
                    }, 10);
                };

                VB.data.searchWorker.postMessage({
                    transcript: VB.api.response.transcript.transcript,
                    terms: terms
                });
            }
            else {
                results = localSearchHelper.localTranscriptSearch(VB.api.response.transcript.transcript, terms);
                VB.api.setSearch(results, {start: start, terms: terms});
            }
        },
        setSearch: function(data, args) {
            console.time('setSearch');
            var start = args.start;
            var terms = args.terms;
            VB.data.clicker = false;
            var wrapper = VB.helper.find('.vbs-record-timeline-wrap');

            VB.data.markersStyles = {
                markersWrapper: wrapper,
                markersContainer: wrapper.find('.vbs-markers'),
                markersWrapperWidth: wrapper.width()
            };

            var colors = {};
            VB.helper.find('.vbs-widget .vbs-word').each(function(key, marker) {
                var $marker = $(marker);
                var word = $marker.find('.vbs-search_word').text().replace(/"/g, '').trim().toLowerCase();
                colors[word] = $marker.find('.vbs-marker').css('border-bottom-color');
            });
            if (data.requestStatus == "SUCCESS") {
                var allTimes = [];
                if (data.hits.length) {
                    var cit = 0;
                    var markers_string = '';
                    data.hits.hits.map(function(item, i) {

                        var times = [];
                        var phrases = [];
                        item.hits.map(function(hit) {
                            if (VB.speakers.filterResultForSpeaker(hit.time)) {
                                times = times.concat(hit.time);
                                var phrase = (hit.phrase) ? hit.phrase : VB.helper.getPhraseByTime(hit.time, hit.end, item.term);
                                phrases = phrases.concat(phrase);
                            }
                        });
                        markers_string += VB.view.markerWidget(times, phrases, colors[item.term]);
                        allTimes = allTimes.concat(times);
                        cit++;
                    });
                    setTimeout(function() {
                        if (markers_string.length) {
                            VB.helper.find(".vbs-next-action-btn").removeClass('vbs-next-notactive');
                        }
                        VB.data.markersStyles.markersContainer.append(markers_string);
                    }, 0);
                    if (VB.settings.editKeywords && data.hits.hits.length > 0) {
                        VB.data.searcht = allTimes;
                        VB.data.searchHits = data.hits.hits;
                        VB.helper.checkKeyword(terms, allTimes, data.hits.hits);
                    } else {
                        VB.data.searcht = null;
                        VB.data.searchHits = null;
                    }
                }
                allTimes.sort(function(a, b) {
                    return a - b;
                });
                if (start) {
                    VB.PlayerApi.seek(allTimes[0]);
                }
                //VB.helper.startScroll();
            } else if (data.requestStatus == "FAILURE") {
                VB.helper.hideLoader();
            }
            VB.helper.clearMessage();
            console.timeEnd('setSearch');
        },
        downloadAudio: function() {
            var _parameters = {};
            jQuery.extend(_parameters, this.parameters);
            _parameters.action = 'getFileMetadata';
            VB.api.call(_parameters, VB.api.setDownloadAudio);
        },
        setDownloadAudio: function(data) {
            if (data.requestStatus == 'SUCCESS') {
                window.location = data.response.downloadMediaUrl;
            } else {
                alert(data.statusMessage);
            }
        },
        favorite: function(param) {
            var _parameters = {};
            jQuery.extend(_parameters, this.parameters);
            param = typeof param !== "undefined" ? param : true;
            _parameters.action = 'updateMediaFile';
            _parameters.favorite = param ? 'add' : 'remove';
            VB.view.favorite(param);
            VB.api.call(_parameters, VB.api.sendFavorite);
        },
        sendFavorite: function(data) {
            if (data.requestStatus != 'SUCCESS') {
                VB.view.favoriteToggle();
                alert(data.statusMessage);
            }
        },
        getAutoNotesHtmlURL: function() {
            var _parameters = {};
            jQuery.extend(_parameters, this.parameters);
            _parameters.action = 'getAutoNotesHtml';
            _parameters.content = true;
            return VB.settings.apiUrl + '?' + VB.common.getStringFromObject(_parameters);
        },
        editKeyword: function(mode, keyword_name, category_name, elem) {
            var _parameters = {};
            jQuery.extend(_parameters, this.parameters);
            _parameters.keywordname = keyword_name;
            _parameters.action = "moveKeyword";
            if (category_name != 'ALL TOPICS') {
                _parameters.categoryname = category_name;
            } else {
                _parameters.categoryname = '';
            }
            _parameters.mode = mode;
            var li = $(elem).parent();

            VB.api.call(_parameters, VB.api.responseEditKeywords, {mode: mode, li: li});
        },
        responseEditKeywords: function(data, args) {
            if (data.requestStatus == 'SUCCESS') {
                if (args.mode == 'up') {
                    args.li.insertBefore(args.li.prev());
                } else if (args.mode == 'down') {
                    args.li.insertAfter(args.li.next());
                } else if (args.mode == 'first') {
                    args.li.insertBefore(args.li.siblings(':eq(0)'));
                }
                if (args.mode == 'delete') {
                    args.li.remove();
                }
            } else {
                alert(data.statusMessage);
            }
        },
        removeKeyword: function(keyword_name, category_name, elem) {
            if(keyword_name) {
                var _parameters = {};
                jQuery.extend(_parameters, this.parameters);
                _parameters.action = "deleteKeyword";
                _parameters.keywordname = keyword_name;
                if (category_name != 'ALL TOPICS') {
                    _parameters.categoryname = category_name;
                } else {
                    _parameters.categoryname = '';
                }
                var li = $(elem).parent();
                VB.api.call(_parameters, VB.api.responseRemoveKeyword, {category_name: category_name, keyword_name: keyword_name, li: li});
            }
        },
        responseRemoveKeyword: function(data, args) {
            if (data.requestStatus == 'SUCCESS') {
                if (args.category_name == 'ALL TOPICS') {
                    VB.data.keywords.splice(VB.data.keywords.indexOf(args.keyword_name));
                }
                args.li.remove();
            } else {
                alert(data.statusMessage);
            }
        },
        removeTopic: function(cat) {
            var _parameters = {};
            jQuery.extend(_parameters, this.parameters);
            _parameters.categoryname = cat;
            _parameters.action = "deleteKeywordCategory";
            VB.api.call(_parameters, VB.api.responseRemoveTopic);
        },
        responseRemoveTopic: function(data) {
            if (data.requestStatus == 'SUCCESS') {
                var $topics_list = VB.helper.find(".vbs-topics-list");
                $topics_list.find("li.vbs-active").remove();
                var li = $topics_list.find('li.vbs-all-topics');
                li.parent().find('.vbs-active').removeClass('vbs-active');
                li.addClass('vbs-active');
                var catName = li.find('a').text().trim();
                var $keywords_list_tab = VB.helper.find(".vbs-keywords-list-tab");
                $keywords_list_tab.find("ul").removeClass('vbs-active');
                $keywords_list_tab.find('ul[tid="' + catName + '"]').addClass('vbs-active');
                $('.vbs-topic-delete-popup').remove();
                if (VB.settings.keywordsColumns == 'topics') {
                    VB.helper.keywordsAutoTopicsColumns();
                }
            } else {
                alert(data.statusMessage);
            }
        },
        addKeywords: function(keywords, times) {
            var _parameters = {};
            jQuery.extend(_parameters, this.parameters);
            _parameters.keyword = keywords;
            _parameters.action = "addKeyword";
            VB.api.call(_parameters, VB.api.responseAddKeywords, {keywords:keywords, times:times});
        },
        responseAddKeywords: function(data, args) {
            if (data.requestStatus == 'SUCCESS') {
                var li = VB.helper.find('.vbs-topics-list li.vbs-all-topics');

                li.parent().find('.vbs-active').removeClass('vbs-active');
                li.addClass('vbs-active');
                var catName = li.find('a').text().trim();

                var $keywords_list_tab = VB.helper.find(".vbs-keywords-list-tab");
                $keywords_list_tab.find("ul").removeClass('vbs-active');
                $keywords_list_tab.find('ul[tid="' + catName + '"]').addClass('vbs-active');
                var kwarr = args.keywords.replace(/"/g, '');
                VB.data.keywords.push(kwarr);
                var keycounter = VB.settings.keywordsCounter ? ' <span>(' + args.times.split(",").length + ')</span>' : '';
                var link = $('<li class="key"><a href="#" t="' + args.times + '" speakers="">' + kwarr + '</a>' + keycounter + '</li>'); // in="' + kwarr + '"
                link.find('a').data('keywordInternalName', kwarr);
                $keywords_list_tab.find('ul.vbs-active').prepend(link);
                VB.helper.find('.vbs-add-search-word').each(function() {
                    if($(this).data('data-kwa').replace(/"/g, '') === kwarr) {
                        $(this).remove();
                    }
                });
                if(VB.settings.keywordsColumns == 'topics'){
                    VB.helper.keywordsAutoTopicsColumns();
                }
            } else {
                alert(data.statusMessage);
            }
        },
        saveTrancript: function(content) {
            var _parameters = {};
            jQuery.extend(_parameters, this.parameters);
            _parameters.content = content;
            _parameters.action = "updateTranscript";
            VB.helper.setIsSaving(true);
            VB.api.callPost(_parameters, VB.api.responseSaveTrancript, content);
        },
        responseSaveTrancript: function(data, args) {
            if (data.requestStatus == 'SUCCESS') {
                setTimeout(function() {
                    VB.api.triggerTranscriptStatus();
                }, VB.settings.transcriptCheckTimer * 1000);
            } else {
                VB.helper.saveTranscriptError(data.statusMessage);
            }
        },
        triggerTranscriptStatus: function() {
            var _parameters = {};
            jQuery.extend(_parameters, this.parameters);
            _parameters.action = "getFileStatus";
            VB.api.call(_parameters, VB.api.responseTriggerTranscriptStatus);
        },
        responseTriggerTranscriptStatus: function(data) {
            if (data.requestStatus == 'SUCCESS' && (data.fileStatus == 'PROCESSING' || data.fileStatus == 'REPROCESSING')) {
                setTimeout(function() {
                    VB.api.triggerTranscriptStatus();
                }, VB.settings.transcriptCheckTimer * 1000);
            }
            else if (data.requestStatus == 'SUCCESS' && data.fileStatus == 'ERROR') {
                VB.helper.saveTranscriptError(data.response);
            }
            else if (data.requestStatus == 'SUCCESS') {
                VB.helper.saveTranscriptComplete();
            }
            else if(data.requestStatus == 'FAILURE'){
                VB.helper.saveTranscriptError(data.statusMessage);
            }
            else {
                alert(data.statusMessage);
            }
        },
        getNews: function(){
            var terms = VB.helper.getSearchWordsArray();
            if(terms.length === 0){
                VB.api.addEmptyMessageForNews('empty');
                return false;
            }
            if($("#" + VB.settings.newsBlock).find('.vbs-section-title').hasClass('vbs-hidden')) { // block is collapse
                return false;
            }
            if(VB.settings.showNewsBlock){
                var $newsBlock = VB.helper.find('.vbs-news-block');
                var words = terms;
                if($.isArray(words)){
                    words = words.join(' ');
                }
                if(VB.data.prevNewsRequest === words){
                    return false;
                }
                VB.data.prevNewsRequest = words;

                $newsBlock.find('.vbs-news-wrapper').html('<div class="vbs-loader"></div>');
                var bing_url = encodeURI(VB.settings.newsUrl + words);
                $.ajax({
                    type: 'GET',
                    url: bing_url,
                    success: function(data){
                        data = JSON.parse(data);
                        VB.api.setNews(data, terms);
                    },
                    error: function(jqXHR, textStatus, errorThrown){
                        console.log(errorThrown + ': Error ' + jqXHR.status);
                    }
                });
                return true;
            }
        },
        setNews: function(data, terms){
            var all_news = (data && data.d) ? data.d.results : [];
            if(all_news.length > 0){
                if($.isArray(terms)){
                    terms = terms.join(', ');
                }
                var $newsBlock = VB.helper.find('.vbs-news-block');
                $newsBlock.find('.vbs-news-words').html(terms);
                var sem = '';
                for (var i = 0; i < all_news.length; i++) {
                    var news = all_news[i];
                    var title = news.Title || '';
                    var source = news.Source || '';
                    var time = news['Date'];
                    var news_url = news.Url;

                    sem += VB.templates.parse('vbs-news-elem', {
                        title: title,
                        source: source,
                        time: time,
                        url: news_url
                    });
                }
                $newsBlock.find('.vbs-news-wrapper').html(sem);
                $newsBlock.find('.vbs-news-elem:odd').addClass('vbs-news-elem-odd').after('<div class="clear-block"></div>');
                if(!VB.settings.hasNewsBlockHeader) {
                    $newsBlock.addClass('vbs-no-header');
                }
            }
            else {
                VB.api.addEmptyMessageForNews('not_found');
            }
            console.log('news:\n', data);
        },
        addEmptyMessageForNews: function(mode){
            var message = '';
            if(mode === 'not_found') {
                message = 'News are not founded';
            }
            else if(mode === 'empty') {
                message = 'Please select a keyword';
            }
            var empty_message = VB.templates.parse('vbs-empty-news', {
                message: message
            });
            VB.helper.find('.vbs-news-block').find('.vbs-news-wrapper').html(empty_message);
        },
        call: function(parameters, callback, args) {
            args = typeof args != 'undefined' ? args : false;
            if (!this.inited)
                this.init();

            var ie9 = (VB.helper.isIe() === 9);

            jQuery.ajax({
                url: VB.settings.apiUrl,
                type: 'GET',
                data: parameters,
                dataType: (ie9) ? "jsonp" : "json"
            }).done(function( json ) {
                callback(json, args);
            }).fail(function(jqxhr, textStatus, error) {
                console.log(jqxhr);
            });

        },
        callPost: function(parameters, callback, args) {
            args = typeof args != 'undefined' ? args : false;

            var ie9 = (VB.helper.isIe() === 9);

            jQuery.ajax({
                url: VB.settings.apiUrl,
                type: 'POST',
                data: parameters,
                dataType: (ie9) ? "jsonp" : "json"
            }).done(function( json ) {
                callback(json, args);
            }).fail(function(jqxhr, textStatus, error) {
                console.log(jqxhr);
            });
        },
        callCustom: function(url, parameters, callback, args) {
            args = typeof args != 'undefined' ? args : false;

            var ie9 = (VB.helper.isIe() === 9);

            jQuery.ajax({
                url: url,
                type: 'POST',
                data: parameters,
                dataType: (ie9) ? "jsonp" : "json"
            }).done(function( json ) {
                callback(json, args);
            }).fail(function(jqxhr, textStatus, error) {
                console.log(jqxhr);
            });
        },
        setErrors: function(data){
            if(data.requestStatus == 'FAILURE'){
                VB.api.errors.failure++;
            }
            else if(data.response && data.response.fileStatus == 'PROCESSING'){
                VB.api.errors.processing++;
            }
            else if(data.fileStatus == 'PROCESSING'){
                VB.api.errors.processing++;
            }
        }
    };

    return VB;
})(voiceBase, jQuery);
/*
 * VB.api 2.0
 * Interaction with the server REST API
 * */
voiceBase = (function(VB, $) {
    "use strict";

    VB.api2_0 = {
        getToken: function(parameters) {
            var username = VB.settings.apiKey;
            var password = VB.settings.password;

            var url = VB.settings.apiUrl + 'access/users/+' + username.toLowerCase() + '/tokens';

            $.ajax({
                type: 'GET',
                url: url,
                headers: {
                    'Authorization': 'Basic ' + btoa(username + ':' + password)
                },
                success: function(data){
                    if(data.tokens && data.tokens.length > 0) {
                        VB.api.setToken({
                            token: data.tokens[0].token,
                            requestStatus: "SUCCESS"
                        });
                    }
                },
                error: function(jqXHR, textStatus, errorThrown){
                    console.log(errorThrown + ': Error ' + jqXHR.status);
                }
            });
        },

        getMetaData: function() {
            var url = VB.settings.apiUrl + 'media/' + VB.settings.mediaId;

            $.ajax({
                type: 'GET',
                url: url,
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + VB.settings.token);
                },
                success: function(data) {
                    var media = data.media;

                    var metadata = {
                        requestStatus: "PLUGIN"
                    };
                    if(media && media.metadata && !$.isEmptyObject(media.metadata)) {
                        metadata = {
                            requestStatus: "SUCCESS",
                            response: {
                                lengthMs: media.metadata.length.milliseconds
                            }
                        };
                    }
                    VB.api.setMetaData(metadata);

                    if(media) {
                        if(media.keywords && media.keywords.latest) {
                            var keywords = media.keywords.latest;
                            var keywordsData = {
                                requestStatus: "SUCCESS",
                                keywords: keywords.words || [],
                                categories: keywords.categories || {},
                                groups: keywords.groups || []
                            };
                            VB.api.setKeywords(keywordsData);
                        }
                        if(media.transcripts && media.transcripts.latest) {
                            var transcript = media.transcripts.latest;
                            var transcriptsData = {
                                requestStatus: "SUCCESS",
                                transcriptType: transcript.type,
                                transcript: transcript.words
                            };
                            VB.api.setTranscript(transcriptsData);
                        }
                        VB.api.ready.comments = true; // TODO comments in api 2.0
                    }
                },
                error: function(jqXHR, textStatus, errorThrown){
                    console.log(errorThrown + ': Error ' + jqXHR.status);
                }
            });
        }

    };

    return VB;
})(voiceBase, jQuery);
voiceBase = (function(VB, $) {
    "use strict";

    VB.comments = {

        getComments: function(hide, rebuild) {
            var _parameters = {};
            jQuery.extend(_parameters, VB.api.parameters);
            VB.api.data.tmp.hide = (typeof hide != 'undefined') ? hide : (VB.settings.expandCommentsBlock) ? false : true;
            VB.api.data.tmp.rebuild = typeof rebuild != 'undefined' ? rebuild : false;
            _parameters.action = 'getComments';
            if (VB.settings.commentsUsername && VB.settings.commentsUsername !== '') {
                _parameters.username = VB.settings.commentsUsername;
            }
            VB.api.call(_parameters, VB.comments.setComments);
        },

        setComments: function(data) {
            if (data.requestStatus == 'SUCCESS') {
                var comments_html = '',
                    comments_count_string = '';

                if (data.response.threads !== undefined) {
                    var comments_count = 0;
                    var iiissd = 0;

                    VB.data.commentsThreads = data.response.threads;
                    for (var thread_key in data.response.threads) {
                        // Get thread
                        var thread = data.response.threads[thread_key];

                        for (var comment_key in thread.comments) {
                            // Get comment
                            var comment = thread.comments[comment_key];

                            // Get comment level
                            var comment_level = comment.level;
                            if (comment.level > '5') {
                                comment_level = '5';
                            }

                            // Get "commented at"
                            var commented_at = VB.helper.parseTime(thread.timeStamp);

                            comments_html += '<div class="vbs-comment-row vbs-answer' + comment_level + '">\n\
                                                              <div class="vbs-comment-title">\n\
                                                                  <span class="vbs-comment-author">' + comment.userName + '</span> ';
                            if (comment_level == 1) {
                                comments_html += '<span>commented at</span>\n\
                                                                  <a href="javascript:void(0)" class="vbs-comment-time" data-vbct="' + thread.timeStamp + '">' + commented_at + '</a>';
                            } else {
                                comments_html += '<span>replied</span>';
                            }
                            var vbsweb = comment.canEdit ? 'vbs-with-edition-btns' : '';
                            comments_html += '</div>\n\
                                                              <div class="vbs-comment-content ' + vbsweb + '">\n\
                                                                  <div class="vbs-arrow"></div>\n\
                                                                  <div class="vbs-comment-message">\n\
                                                                      <p>' + comment.content + '</p>\n\
                                                                  </div>';
                            if (comment.canEdit) {
                                comments_html +=
                                    '<div class="vbs-comment-edit-wrapper">\n\
                                            <div class="vbs-comment-edit-btn-wrapper">\n\
                                                <a href="#" c_id="' + comment.id + '" c_tm="' + thread.timeStamp + '" class="vbs-comment-edit vbs-popup-btn">Edit</a>\n\
                                                </div>\n\
                                                <div class="vbs-comment-delete-btn-wrapper">\n\
                                                    <a href="#" c_id="' + comment.id + '" class="vbs-comment-delete vbs-popup-btn">Delete</a>\n\
                                                </div>\n\
                                            </div>';
                            } else {
                                comments_html +=
                                    '<div class="vbs-comment-reply-wrapper">\n\
                                            <a href="#"  c_id="' + comment.id + '" class="vbs-comment-reply vbs-popup-btn">Reply</a>\n\
                                            </div>';
                            }
                            comments_html += '</div>\n\
                                                          </div>\n\
                                                      </div>';
                            iiissd++;
                            comments_count++;
                        }
                    }

                    comments_count_string += comments_count + ' Comment(s)';
                } else {
                    comments_count_string += 'No Comments';
                    comments_html += '<div class="vbs-comment-row"><div class="vbs-comment-title">No Comments</div></div>';
                }

                $('.vbs-comments-block .vbs-section-name').attr('style', 'width: 200px;').text(comments_count_string);
                VB.comments.commentsWidget(comments_html, VB.api.data.tmp.hide);
                if (VB.api.data.tmp.rebuild) {
                    VB.comments.commentsTWidget();
                }
            } else {
                var $commentsBlock = VB.helper.find('.vbs-comments-block');
                $commentsBlock.append(VB.templates.get('disabler'));
                if(!VB.settings.tabView) {
                    $commentsBlock.show();
                    $commentsBlock.find('.vbs-section-body').hide();
                    $commentsBlock.find('.vbs-section-title .vbs-section-name').text('Comments');
                }

                VB.api.setErrors(data);
            }
            VB.api.ready.comments = true;
        },

        addComment: function(comment_data) {
            var _parameters = {};
            jQuery.extend(_parameters, VB.api.parameters);
            _parameters.action = 'addComment';
            _parameters.comment = comment_data.comment;
            if (comment_data.comment_timestamp !== false) {
                _parameters.timeStamp = comment_data.comment_timestamp;
            }
            if (comment_data.parent_comment_id !== false) {
                _parameters.commentId = comment_data.parent_comment_id;
            }
            if (VB.settings.commentsUsername && VB.settings.commentsUsername !== '') {
                _parameters.username = VB.settings.commentsUsername;
            }
            if (VB.settings.commentsUserhandle && VB.settings.commentsUserhandle !== '') {
                _parameters.userhandle = VB.settings.commentsUserhandle;
            }
            VB.api.call(_parameters, VB.comments.sendComment);
        },

        sendComment: function(data) {
            if (data.requestStatus == 'SUCCESS') {
                VB.comments.getComments(VB.helper.find('.vbs-comments-block .vbs-section-title').hasClass('vbs-hidden'), true);
            } else {
                alert(data.statusMessage);
            }
        },

        editComment: function(comment_data) {
            var _parameters = {};
            jQuery.extend(_parameters, VB.api.parameters);
            _parameters.action = 'editComment';
            _parameters.comment = comment_data.comment;
            _parameters.commentId = comment_data.comment_id;

            if (VB.settings.commentsUsername && VB.settings.commentsUsername !== '') {
                _parameters.username = VB.settings.commentsUsername;
            }
            VB.api.call(_parameters, VB.comments.sendEditComment);
        },

        sendEditComment: function(data) {
            var parent_div = VB.api.data.tmp.commentParent;
            var comment_data = VB.api.data.tmp.commentData;
            if (data.requestStatus == 'SUCCESS') {
                parent_div.parents('.vbs-comment-content').find('.vbs-comment-message p').text(comment_data.comment);
                parent_div.remove();
                var commentId = comment_data.comment_id;
                var threads = VB.data.commentsThreads;
                for (var key in  threads) {
                    if(threads.hasOwnProperty(key)) {
                        var comments = threads[key].comments;
                        comments.forEach(function(comment){
                            if(comment.id == commentId) {
                                comment.content = comment_data.comment;
                            }
                        });
                    }
                }
                VB.comments.commentsTWidget();
            } else {
                parent_div.find("textarea").attr('disabled', false);
                alert(data.statusMessage);
            }
        },

        deleteComment: function(comment_id) {
            var _parameters = {};
            jQuery.extend(_parameters, VB.api.parameters);
            _parameters.action = 'deleteComment';
            _parameters.commentId = comment_id;
            if (VB.settings.commentsUsername && VB.settings.commentsUsername !== '') {
                _parameters.username = VB.settings.commentsUsername;
            }
            VB.api.call(_parameters, VB.comments.sendComment);
        },

        commentsWidget: function(data, hide) {
            var $comments_block = VB.helper.find('.vbs-comments-block');
            $comments_block.find('.vbs-section-body').html(data);
            if (hide) {
                $comments_block.find('.vbs-section-body').hide();
                $comments_block.find('.vbs-section-title').addClass('vbs-hidden');
            }
            $comments_block.slideDown('fast');
        },

        commentsTWidget: function() {
            var wrapper = VB.helper.find('.vbs-record-timeline-wrap');
            var cmhtml = '';
            for (var thread_key in VB.data.commentsThreads) {
                var stime = VB.data.commentsThreads[thread_key].timeStamp;
                var position = (stime * wrapper.width()) / VB.data.duration;
                var rightClass = stime > VB.data.duration / 2 ? 'vbs-from-right' : '';
                var commentText = VB.data.commentsThreads[thread_key].comments[0].content;
                cmhtml += VB.templates.parse('vbsCommentsTimeline', {
                    position: position,
                    rightClass: rightClass,
                    stime: stime,
                    commentText: commentText
                });
            }
            VB.helper.find('.vbs-comments-wrapper-block').html(cmhtml);
            if(VB.settings.markersInNativeTimeline && VB.settings.cssPathForPlayerFrame) {
                VB.comments.commentsWidgetForNativeTimeline();
            }
        },

        resizeCommentsTWidget: function() {
            var wrapperWidth = VB.helper.find('.vbs-record-timeline-wrap').width();
            var duration = VB.data.duration;

            VB.helper.find('.vbs-comments-wrapper-block div.vbs-comments-wrapper ').each(function() {
                var $commentWrapper = $(this);
                var commentTime = $commentWrapper.attr('stime');
                var position = (commentTime * wrapperWidth) / duration;
                $commentWrapper.css('left', position);
            });

        },

        /*
         * Integrate comments markers to native kaltura timelime
         * */
        commentsWidgetForNativeTimeline: function() {
            var origComments = $('.vbs-comments-wrapper-block').find('.vbs-comments-wrapper');
            var $playerIframe = VB.PlayerApi.getPlayerIframe();
            var scrubberHandleContainer = $playerIframe.find('.scrubber');
            if(scrubberHandleContainer.find('.vbs-comments-wrapper-block').length === 0) {
                scrubberHandleContainer.append('<div class="vbs-comments-wrapper-block"></div>');
            }
            var $scrubberComments = scrubberHandleContainer.find('.vbs-comments-wrapper-block');
            $scrubberComments.empty();
            $.each(origComments, function (k, origComment) {
                VB.comments.createScruberComment(origComment, $scrubberComments);
            });
        },
        createScruberComment: function(origComment, $container) {
            var duration = VB.data.duration;
            var commentTime = $(origComment).attr('stime');
            var left = (commentTime / duration) * 100;
            var rightClass = commentTime > VB.data.duration / 2 ? 'vbs-from-right' : '';
            var commentText = $(origComment).find('a').text();

            var $comment = $(VB.templates.parse('vbsCommentsTimeline', {
                position: '0',
                rightClass: rightClass,
                stime: commentTime,
                commentText: commentText
            }));
            $comment.css({
                top: '-15px',
                left: left + '%'
            });
            $comment.find('.vbs-comment-preview').css({
                'z-index': 99999999991
            });
            if(!rightClass) {
                $comment.find('.vbs-comment-preview').css({
                    'padding-left': '10px'
                });
            }
            $container.append($comment);
        },

        // handlers from event.js
        toggleBlockHandler: function($block) {
            $block.toggleClass('vbs-hidden');
            var $section_body = $block.parents('.vbs-comments-block').find('.vbs-section-body');
            if ($block.hasClass('vbs-hidden')) {
                $block.attr('data-title', 'Show Comments');
                $section_body.slideUp();
            } else {
                $block.attr('data-title', 'Hide Comments');
                $section_body.slideDown();
                VB.helper.collapseNewsBlock();
            }
        },

        clickAddCommentHandler: function($addButton) {
            var newparam = {};
            var ltime = VB.data.position;
            newparam['vbt'] = Math.round(ltime);
            var vbspTime = VB.helper.parseTime(Math.round(ltime));
            var html = VB.templates.parse('commentPopup', {
                "vbt": newparam['vbt'],
                "vbspTime": vbspTime
            });

            var $comments_popup = VB.helper.find('.vbs-comments-popup');
            var $section_btns = VB.helper.find('.vbs-comments-block .vbs-section-btns');
            if($addButton.hasClass('vbs-active')){ // button is pressed
                $comments_popup.fadeOut('fast', function() { // remove popup
                    $section_btns.find('.vbs-comments-btn').removeClass('vbs-active');
                    $comments_popup.remove();
                });
            }
            else{ // activate popup
                VB.helper.find('.vbs-comments-popup').each(function(){ // remove all comments popups
                    $(this).remove();
                });

                $section_btns.find('.vbs-clearfix li').append(html);
                $section_btns.find('.vbs-comments-btn').addClass('vbs-active');
                VB.helper.find('.vbs-comments-popup').show();
                $('#vbs-comment-text').focus();
            }
            VB.helper.collapseNewsBlock();
        },

        confirmAddCommentHandler: function($confirmButton) {
            VB.helper.collapseNewsBlock();

            var parent_div = $confirmButton.parent(".vbs-comment-footer").parent(".vbs-comments-popup"),
                comment_data = {},
                comment_text = parent_div.find("#vbs-comment-text").val(),
                comment_timestamp = parent_div.find("#vbs-comment-timeline").attr("vbct");

            if (comment_text === "") {
                alert("Text of comment is required.");
                return false;
            } else {
                VB.helper.find('.vbs-comments-popup').fadeOut('fast', function() {
                    VB.helper.find('.vbs-comments-block .vbs-section-btns .vbs-comments-btn').removeClass('vbs-active');
                    VB.helper.find('.vbs-comments-popup').addClass('vbs-hidden');
                });
            }

            comment_data['comment'] = comment_text;
            comment_data['comment_timestamp'] = comment_timestamp;
            comment_data['parent_comment_id'] = false;

            VB.comments.addComment(comment_data);
        },

        playCommentHandler: function($playButton) {
            var vbspPlayForComments = setTimeout(function() {
                clearTimeout(vbspPlayForComments);
                VB.PlayerApi.seek($playButton.parent('.vbs-comment-popup-row').find('#vbs-comment-timeline').attr('vbct'));
            }, 250);
        },

        replyHandler: function($replyBtn) {
            var html = VB.templates.parse('commentReplyPopup', {
                "c_id": $replyBtn.attr('c_id')
            });

            var parent_div = $replyBtn.parent('.vbs-comment-reply-wrapper');

            if (parent_div.find('.vbs-comments-popup').length === 0) {
                VB.helper.find('.vbs-comments-popup').addClass('old_reply_popup');
                parent_div.append(html);
                parent_div.find('.vbs-comments-popup').show();
            }
            else {
                parent_div.find('.vbs-comments-popup').remove();
            }
            VB.helper.find('.vbs-comments-popup.old_reply_popup').remove();
            VB.helper.find('.vbs-comments-block .vbs-section-btns .vbs-comments-btn').removeClass('vbs-active');
        },

        replyConfirmHandler: function($confirmButton) {
            var parent_div = $confirmButton.parents(".vbs-comment-footer").parents(".vbs-comments-popup"),
                comment_data = {},
                comment_text = parent_div.find("#vbs-comment-reply-text").val(),
                parent_comment_id = $confirmButton.attr("c_id");
            if (comment_text === "") {
                alert("Text of comment is required.");
                return false;
            }
            else {
                parent_div.parents('.vbs-comment-reply-wrapper').find('.vbs-comments-popup').remove();
            }
            comment_data['comment'] = comment_text;
            comment_data['comment_timestamp'] = false;
            comment_data['parent_comment_id'] = parent_comment_id;
            VB.comments.addComment(comment_data);
        },

        editHandler: function($editBtn) {
            var ctm = $editBtn.attr('c_tm');
            var vbspTime = VB.helper.parseTime(Math.round(ctm));
            var commentBlock = $editBtn.parents('.vbs-comment-row');
            var commentText = commentBlock.find('.vbs-comment-message p').text();
            var templateObj = {
                c_id: $editBtn.attr('c_id'),
                vbt: ctm,
                vbspTime: vbspTime,
                commentText: commentText
            };
            var html = commentBlock.hasClass('vbs-answer1') ? VB.templates.parse('commentEditFirstPopup', templateObj) : VB.templates.parse('commentEditPopup', templateObj);
            var parent_div = $editBtn.parent('.vbs-comment-edit-btn-wrapper');
            if (parent_div.find('.vbs-comments-popup').length === 0) {
                VB.helper.find('.vbs-comments-popup').addClass('old_reply_popup');
                parent_div.append(html);
                parent_div.find('.vbs-comments-popup').show();
                parent_div.find('textarea').focus();
            } else {
                parent_div.find('.vbs-comments-popup').remove();
            }
            VB.helper.find('.vbs-comments-popup.old_reply_popup').remove();
            VB.helper.find('.vbs-comments-block .vbs-section-btns .vbs-comments-btn').removeClass('vbs-active');
        },

        editConfirmHandler: function($confirmButton) {
            var parent_div = $confirmButton.parents(".vbs-comments-popup"),
                comment_data = {},
                comment_text = parent_div.find("textarea").val(),
                comment_id = $confirmButton.attr("c_id");
            if (comment_text === "") {
                alert("Text of comment is required.");
                return false;
            }
            comment_data['comment'] = comment_text;
            comment_data['comment_timestamp'] = false;
            comment_data['comment_id'] = comment_id;
            parent_div.find("textarea").attr('disabled', true);
            VB.api.data.tmp.commentParent = parent_div;
            VB.api.data.tmp.commentData = comment_data;
            VB.comments.editComment(comment_data);
        },

        deleteHandler: function($deleteButton) {
            var html = VB.templates.parse('commentDeletePopup', {c_id: $deleteButton.attr('c_id')});
            var parent_div = $deleteButton.parent('.vbs-comment-delete-btn-wrapper');

            if (parent_div.find('.vbs-comments-popup').length === 0) {
                VB.helper.find('.vbs-comments-popup').addClass('old_reply_popup');
                parent_div.append(html);
                parent_div.find('.vbs-comments-popup').show();
            }
            else {
                parent_div.find('.vbs-comments-popup').remove();
            }
            VB.helper.find('.vbs-comments-popup.old_reply_popup').remove();
            VB.helper.find('.vbs-comments-block .vbs-section-btns .vbs-comments-btn').removeClass('vbs-active');
        },

        deleteConfirmHandler: function($confirmButton) {
            var comment_id = $confirmButton.attr("c_id");
            VB.comments.deleteComment(comment_id);
            $confirmButton.parents('.vbs-comment-edit-wrapper').remove();
        },

        cancelHandler: function($button) {
            var $popup = $button.parents('.vbs-comments-popup');
            $popup.fadeOut('fast', function() {
                VB.helper.find('.vbs-comments-block .vbs-section-btns .vbs-comments-btn').removeClass('vbs-active');
                $popup.addClass('vbs-hidden').remove();
            });
        },

        commentTimeHandler: function($time) {
            var comment_time = $time.attr('data-vbct');
            if(comment_time){
                VB.PlayerApi.seek(comment_time);
            }
        },

        updateTimeInPopup: function(position) {
            var time = (position) ? position : VB.data.played;
            VB.helper.find('.vbs-comments-add-popup #vbs-comment-timeline')
                .html(VB.helper.parseTime(time))
                .attr('vbct', time);
        }

    };

    return VB;
})(voiceBase, jQuery);
/*
* Module with common functions from all modules
* */
voiceBase = (function(VB, $) {
    "use strict";

    if (!Object.keys) {
        Object.keys = (function() {
            var hasOwnProperty = Object.prototype.hasOwnProperty,
                hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
                dontEnums = [
                    'toString',
                    'toLocaleString',
                    'valueOf',
                    'hasOwnProperty',
                    'isPrototypeOf',
                    'propertyIsEnumerable',
                    'constructor'
                ],
                dontEnumsLength = dontEnums.length;

            return function(obj) {
                if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
                    throw new TypeError('Object.keys called on non-object');
                }

                var result = [], prop, i;

                for (prop in obj) {
                    if (hasOwnProperty.call(obj, prop)) {
                        result.push(prop);
                    }
                }

                if (hasDontEnumBug) {
                    for (i = 0; i < dontEnumsLength; i++) {
                        if (hasOwnProperty.call(obj, dontEnums[i])) {
                            result.push(dontEnums[i]);
                        }
                    }
                }
                return result;
            };
        }());
    }

    String.prototype.padLeft = function(total) {
        return new Array(total - this.length + 1).join('0') + this;
    };

    // Extends
    jQuery.extend(jQuery.expr[':'], {
        "wordtime": function(element, i, match, elements) {
            var value = parseFloat($(element).attr('t'));
            var minMaxValues = match[3].split(/\s?,\s?/);
            var minValue = parseFloat(minMaxValues[0]);
            var maxValue = parseFloat(minMaxValues[1]);
            return !isNaN(value) && !isNaN(minValue) && !isNaN(maxValue) && value <= maxValue && value >= minValue;
        }
    });

    VB.common = {
        getStringFromObject: function (obj) {
            return Object.keys(obj).map(function (key) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
            }).join('&');
        },

        inArrayV: function(sarray, needle) {
            for (var iss in sarray) {
                if (sarray[iss] == needle)
                    return true;
            }
            return false;
        },

        findTermInArray: function (words, term) {
            var isFind = false;
            for (var i = 0; i < words.length; i++) {
                var word = words[i];
                word = VB.helper.replaceTrimAndLower(word);
                if(word === term) {
                    isFind = true;
                    break;
                }
            }
            return isFind;
        },

        keysToLowerCase: function(obj) {
            var keys = Object.keys(obj);
            var n = keys.length;
            while (n--) {
                var key = keys[n]; // "cache" it, for less lookups to the array
                if (key !== key.toLowerCase()) { // might already be in its lower case version
                    obj[key.toLowerCase()] = obj[key]; // swap the value to a new lower case key
                    delete obj[key]; // delete the old key
                }
            }
            return (obj);
        },

        vbmenus: function(event, type, elem) {
            var copy = typeof $.fn.zclip !== 'undefined';
            var share = typeof addthis !== 'undefined';
            if (copy === false && share === false && VB.settings.editKeywords === false || VB.settings.contextMenu === false && type !== 'keyword') {
                return false;
            }

            event.preventDefault();
            var newparam = {};
            var kwGroup = $(elem).parents('ul').hasClass('group');

            if (type === 'timeline') {
                var played;
                if (event.target.localName == 'ins') {
                    played = $(event.target).parent().attr('stime');
                } else {
                    var x = (event.offsetX || event.clientX - $(event.target).offset().left);
                    played = Math.round(VB.data.duration * (x + event.target.offsetLeft) / VB.helper.find(".vbs-record-timeline-wrap").width());
                }
                newparam['vbt'] = played;
                var $voice_search_txt = $('#vbs-voice_search_txt');
                if ($voice_search_txt.val().length) {
                    newparam['vbs'] = encodeURI($voice_search_txt.val());
                }
            } else if (type == 'keyword') {
                var keyword = $(elem).data("keywordInternalName");
                if (keyword.match(/\s+/g)) {
                    keyword = '"' + keyword + '"';
                }
                newparam['vbs'] = encodeURI(keyword);
            } else if (type == 'transcript') {
                var transcript = $(elem).text();
                transcript = encodeURI(transcript);
                newparam['vbs'] = transcript;
            }

            $("ul.vbs-vbcmenu").remove();
            var url = VB.helper.getNewUrl(newparam);

            var menu = $("<ul class='vbs-vbcmenu'></ul>");
            if (copy && VB.settings.contextMenu) {
                menu.append('<li id="vbc_url"><a href="#">Copy URL</a></li>');
            }
            if (share && VB.settings.contextMenu) {
                menu.append('<li id="vbc_share"><a class="addthis_button_expanded addthis_default_style" addthis:url="' + url + '" addthis:title="Check out">Share</a></li>');
            }
            if (type == 'keyword' && VB.settings.editKeywords && !kwGroup) {
                var $elem = $(elem);
                var editmenu = '<span class="vbs-keyword_controls">';
                if ($elem.parent().prev().length) {
                    editmenu += '<span class="vbs-vbe vbs-voicebase_first" title="Move to Top">Move to Top</span>' +
                        '<span class="vbs-vbe vbs-voicebase_up" title="Move up">Move up</span>';
                }
                if ($elem.parent().next().length) {
                    editmenu += '<span class="vbs-vbe vbs-voicebase_down" title="Move down">Move down</span>';
                }
                editmenu += '<span class="vbs-vbe vbs-voicebase_remove" title="Remove">Remove</span>' +
                    '</span>';
                var $editmenu = $(editmenu);
                $editmenu.data('keywordInternalName', $elem.data("keywordInternalName"));
                var $li = $('<li id="vbc_move"></li>');
                $li.append($editmenu);
                menu.append($li);
            }

            menu.appendTo("body");

            var $menu = $('.vbs-vbcmenu');
            var pos = VB.view.getPositionElementForTooltip($(elem));
            if($menu.height() + event.pageY < document.body.clientHeight){
                $menu.css({
                    top: pos.top + $(elem).height() + "px",
                    left: pos.left + pos.width / 2 + "px"
                });
            }
            else{
                $menu.css({
                    top: (pos.top - $(elem).height() - $menu.height()) + "px",
                    left: pos.left + pos.width / 2 + "px"
                });
            }

            if (copy) {
                $("#vbc_url").find('a').zclip({
                    path: VB.settings.zeroclipboard,
                    copy: url
                });
            }
            if (share) {
                addthis.toolbox("#vbc_share");
            }
        },

        vbEditMenu: function(event, elem) {
            var $this = $(elem);
            var $editWrapper = $('.vbs-edit-mode-wrapper');

            $("ul.vbs-vbcmenu").remove();
            $editWrapper.find('.vbs-menu-target').removeClass('vbs-menu-target');
            $this.addClass('vbs-menu-target');

            var stime = $this.attr('t') / 1000;
            var stimep = stime > 1 ? stime - 1 : stime;
            var menu = '';
            menu += '<li><a href="#" class="vbsc-edit-play" data-time="'+ stimep  +'">Play</a></li>';
            if(!$this.hasClass('vbs-edit-speaker') && !$this.prev().hasClass('vbs-edit-speaker')){
                menu += '<li><a href="#" class="vbsc-edit-speaker" data-time="'+ stime * 1000 +'">Insert Speaker</a></li>';
            }
            if($this.hasClass('vbs-edit-speaker')){
                var speakerKey = $this.attr('m') || '';
                menu += '<li><a href="#" class="vbsc-rename-speaker" data-speaker-key="'+ speakerKey +'">Rename Speaker</a></li>';
            }

            $editWrapper.append("<ul class='vbs-vbcmenu'>" + menu + "</ul>");
            var $menu = $('.vbs-vbcmenu');
            var coordY = event.clientY + $editWrapper.scrollTop();

            if($menu.height() + event.clientY < document.body.clientHeight){
                $menu.css({
                    top: coordY + "px",
                    left: event.pageX + "px"
                });
            }
            else{
                if($(elem).find('br').length > 0) {
                    coordY += 15 * $(elem).find('br').length;
                }
                $menu.css({
                    top: (coordY - $menu.height() - $this.height()) + "px",
                    left: event.pageX + "px"
                });
            }
        },

        uniqueArray: function(array){
            array = array ? array : [];
            var unique_array = {};
            for (var i = 0; i < array.length; i++) {
                unique_array[array[i]] = true;
            }
            array = Object.keys(unique_array);
            return array;
        },

        hidePopup: function($popup){
            $popup.fadeOut('fast', function(){
                $(this).remove();
            });
        },

        unEscapeHtml: function(phrase) {
            return phrase
                .replace(/&gt;/g,'>')
                .replace(/&lt;/g,'<')
                .replace(/&quot;/g,'"')
                .replace(/&amp;lt;/g, "&lt;")
                .replace(/&amp;gt;/g, "&gt;");
        }
    };

    return VB;
})(voiceBase, jQuery);
/*
* VB.events. Register events
* */
voiceBase = (function(VB, $) {
    "use strict";

    VB.events = {
        time: null,
        onTime: function() {
            if(VB.instances[VB.current_instance].player && VB.instances[VB.current_instance].player.interface){
                if (Math.round(VB.data.position) != Math.round(VB.PlayerApi.getPosition())) {
                    if (!VB.data.clicker) {
                        VB.helper.hideLoader();
                    }
                    if (VB.settings.transcriptHighlight !== false) {
                        VB.helper.highlight(VB.PlayerApi.getPosition());
                    }
                    VB.data.movelistner = false;
                }
                if(VB.data.position === VB.data.duration) { // end of file
                    VB.helper.hideLoader();
                }
                var position = VB.data.position = VB.PlayerApi.getPosition();

                if(VB.PlayerApi.getStatus() === 'PLAYING' && VB.PlayerApi.getDuration() !== -1) {
                    if(VB.data.duration !== VB.PlayerApi.getDuration()) {
                        VB.data.duration = VB.PlayerApi.getDuration();
                        VB.view.renderTimeInMediaTitle();
                    }
                }
                var duration = VB.data.duration;

                if (VB.data.dragging === false && VB.data.movelistner === false && typeof position !== 'undefined' && duration) {
                    VB.helper.find(".vbs-player-slider").css("left", position * 100 / duration + "%");
                    VB.helper.find(".vbs-record-progress").css("width", position * 100 / duration + "%");
                    var parsedTime = VB.helper.parseTime(position);
                    VB.helper.find(".vbs-ctime").html(parsedTime);
                    VB.comments.updateTimeInPopup(position);
                    VB.helper.find('.vbs-share-popup').find('.vbsp-time').attr('vbct', position).html(parsedTime); // time in share popup
                }
                if (!VB.data.clicker) {
                    if (VB.PlayerApi.getStatus() == "PAUSED") {
                        VB.helper.find(".vbs-player-control .vbs-play-btn").removeClass('vbs-playing').attr('data-title', "Play");

                    } else if (VB.PlayerApi.getStatus() == "PLAYING") {
                        VB.helper.find(".vbs-player-control .vbs-play-btn").addClass('vbs-playing').attr('data-title', "Pause");

                    }
                }
                if (VB.PlayerApi.getBuffer()) {
                    VB.helper.find(".vbs-record_buffer").css("width", VB.PlayerApi.getBuffer() + "%");
                }
                VB.speakers.speakerIsSpeaking();
            }
        },
        registerEvents: function() {
            // Media Events
            if(VB.settings.toggleBlocks && VB.settings.toggleMediaBlock){
                VB.helper.find(".vbs-media-block .vbs-section-title").off('touchstart click').on('click touchstart', function(e) {
                    e.preventDefault();
                    var $this = $(this);
                    $this.toggleClass('vbs-hidden');
                    if ($this.hasClass('vbs-hidden')) {
                        VB.data.playerHeight = VB.data.playerDom.height();
                        if(VB.settings.playerType == 'sublime' || VB.settings.playerType == 'video_js' || VB.settings.playerType == 'jplayer' || (VB.settings.playerType == 'jwplayer' && VB.PlayerApi.getRenderingMode() === 'html5')){
                            VB.data.playerDom.hide();
                        }
                        else{
                            VB.data.playerDom.css({height: '0px'});
                        }
                        VB.helper.find('.vbs-expand-btn').hide();
                        VB.helper.findc('.vbs-player-wrapper .vbs-time').hide();
                        if($this.parents('.vbs-media-block').hasClass('vbs-video')){
                            $('.vbs-tooltip').text('Show Video');
                        }
                        $this.attr('data-title', 'Show Video');
                    } else {
                        if(VB.settings.playerType == 'sublime' || VB.settings.playerType == 'video_js' || VB.settings.playerType == 'jplayer' || (VB.settings.playerType == 'jwplayer' && VB.PlayerApi.getRenderingMode() === 'html5')){
                            VB.data.playerDom.show();
                        }
                        else{
                            VB.data.playerDom.css({height: VB.data.playerHeight + 'px'});
                        }
                        VB.helper.find('.vbs-expand-btn').show();
                        VB.helper.findc('.vbs-player-wrapper .vbs-time').show();
                        if($this.parents('.vbs-media-block').hasClass('vbs-video')){
                            $('.vbs-tooltip').text('Hide Video');
                        }
                        $this.attr('data-title', 'Hide Video');
                    }
                });
            }

            // Timeline Events
            if (VB.settings.markersInNativeTimeline) {
                $(document).off("DOMSubtreeModified", ".vbs-markers").on("DOMSubtreeModified", ".vbs-markers", function (e) {
                    if (e.target.innerHTML.length > 0) {
                        VB.view.markerWidgetForNativeTimeline();
                    } else {
                        VB.view.clearScrubberOfMarks();
                    }
                });
            }

            VB.helper.find('.vbs-markers,.vbs-custom-markers').on('touchstart click', 'a.vbs-marker', function(e) {
                e.preventDefault();
                var stime = $(this).attr('stime');
                VB.PlayerApi.seek(stime);
                return false;
            });

            VB.helper.find('.vbs-comments-wrapper-block').on('touchstart click', '.vbs-comment-preview a', function(e) {
                e.preventDefault();
                VB.helper.collapseNewsBlock();
                var stime = $(this).attr('stime');
                VB.PlayerApi.seek(stime);
                return false;
            });

            // Play
            $("." + VB.data.vclass + " .vbs-player-control, ." + VB.data.vclass +" .vbs-edit-mode-prewrapper").on('touchstart click', ".vbs-play-btn", function(e) {
                e.preventDefault();
                var $this = $(this);
                var $vbs_tooltip = $('.vbs-tooltip');
                if (!$this.hasClass("vbs-playing")) {
                    VB.helper.track('play');
                    $this.addClass('vbs-playing').attr("data-title", "Pause");
                    $vbs_tooltip.text("Pause");
                    VB.helper.showLoader();
                    VB.PlayerApi.play();
                } else {
                    $this.removeClass('vbs-playing').attr("data-title", "Play");
                    VB.helper.track('pause');
                    $vbs_tooltip.text("Play");
                    VB.helper.hideLoader();
                    VB.PlayerApi.pause();
                }
                return false;
            });

            // Prev
            $(document).off('touchstart click', ".vbs-prev-btn").on('touchstart click', ".vbs-prev-btn", function(e) {
                e.preventDefault();
                var btime = VB.PlayerApi.getPosition() - 15;
                btime = btime < 0 ? 0.001 : btime;
                VB.PlayerApi.seek(btime);
                return false;
            });

            // Next Marker Btn
            VB.helper.find('.vbs-next-action-btn').on('touchstart click', function(event) {
                event.preventDefault();
                if(!$(this).hasClass('vbs-next-notactive')){
                    var $markersContainer = VB.helper.find('.vbs-record-timeline-wrap .vbs-markers');
                    VB.helper.moveToNextMarker($markersContainer);
                }
            });

            $(window).off('resize.vbs_resize').on('resize.vbs_resize', function() {
                VB.view.resizeTimelineElements();
                if(VB.helper.isMobile()) {
                    var mobile_sizes = VB.PlayerApi.getMobilePlayerSize();
                    VB.PlayerApi.setSizePlayer(mobile_sizes.mobile_width, mobile_sizes.mobile_height);
                    $("#" + VB.settings.mediaBlock).css('width', VB.helper.getMobileWidth());
                }
                VB.view.checkResponsive();
            });

            //// DRAG
            $(document).off("mousedown", ".vbs-record-timeline-wrap .vbs-dragger").on("mousedown", ".vbs-record-timeline-wrap .vbs-dragger", function(e) {
                e.preventDefault();
                var $this = $(this).parents('.vbs-record-timeline-wrap');
                if (e.button === 0) {
                    var tlw = 100 * (e.pageX - $this.offset().left) / $this.width();
                    VB.helper.find(".vbs-player-slider").css("left", tlw + "%");
                    VB.helper.find(".vbs-record-progress").css("width", tlw + "%");
                    VB.data.movelistner = true;
                    VB.data.dragging = true;
                }
            }).off("mousemove", ".vbs-record-timeline-wrap .vbs-dragger").on("mousemove", ".vbs-record-timeline-wrap .vbs-dragger", function(e) {
                e.preventDefault();
                var $this = $(this).parents('.vbs-record-timeline-wrap');
                var tlw = 100 * (e.pageX - $this.offset().left) / $this.width();
                if (tlw > 100) {
                    tlw = 100;
                } else
                if (tlw < 0) {
                    tlw = 0;
                }
                VB.data.played = Math.round(VB.data.duration * tlw / 100);
                if (VB.data.dragging) {
                    VB.helper.find(".vbs-player-slider").css("left", tlw + "%");
                    VB.helper.find(".vbs-record-progress").css("width", tlw + "%");
                    VB.helper.find(".vbs-ctime").html(VB.helper.parseTime(VB.data.played));
                    VB.helper.find('.vbs-share-popup .vbsp-time').html(VB.helper.parseTime(VB.data.played)).attr('vbct', VB.data.played);
                    VB.comments.updateTimeInPopup(null);
                }
            }).off('mouseup.vbs_mouseup').on('mouseup.vbs_mouseup', function() {
                if (VB.data.dragging) {
                    VB.PlayerApi.seek(VB.data.played);
                    VB.helper.track('seek', VB.data.played);
                    VB.helper.find('.vbs-share-popup .vbsp-time').html(VB.helper.parseTime(VB.data.played)).attr('vbct', VB.data.played);
                    VB.comments.updateTimeInPopup(null);
                    if (VB.helper.find('#vbs-share-position').is(':checked')) {
                        var newparam = {};
                        newparam['vbt'] = VB.data.played;
                        var url = VB.helper.getNewUrl(newparam);
                        $('#vbsp-url').val(url);
                        if (typeof addthis !== 'undefined') {
                            addthis.update('share', 'url', url);
                        }
                    }
                }
                VB.data.dragging = false;
//            VB.data.movelistner = false;
            });

            // Hover on markers
            VB.helper.find(".vbs-markers,.vbs-custom-markers").on({
                mouseover: function(e) {
                    VB.helper.find('[ctime="' + $(e.target).parent().attr('stime') + '"]').fadeIn(75);
                },
                mouseout: function(e) {
                    VB.helper.find('[ctime="' + $(e.target).parent().attr('stime') + '"]').fadeOut(100);
                }
            });

            // Click on utterance markers
            VB.helper.find(".vbs-utterance-markers").on('touchstart click', '.vbs-utter-marker', function(e){
                e.preventDefault();
                var stime = $(this).attr('data-stime');
                VB.PlayerApi.seek(stime);
                return false;
            });

            // Show/hide utterance marker
            $(document).off('change', '.vbs-utterance-block input[type=checkbox]').on('change', '.vbs-utterance-block input[type=checkbox]', function(){
                var utterance_num = $(this).attr('data-row');
                VB.helper.find(".vbs-utterance-markers").find('.vbs-utter-row' + utterance_num).toggle();
            });

            VB.helper.find('.vbs-volume-toolbar, .' + VB.data.vclass + ' .vbs-edit-mode-prewrapper').on('touchstart click', '.vbs-volume-btn', function(event) {
                event.preventDefault();
                var $this = $(this);
                var $volume_toolbar = VB.helper.find('.vbs-volume-toolbar-block');
                if ($this.hasClass('show')) {
                    $volume_toolbar.fadeOut('fast');
                    $this.removeClass('show');
                } else {
                    var vol = VB.PlayerApi.getVolume();
                    VB.PlayerApi.setUiVolume(vol);
                    $volume_toolbar.fadeIn(100);
                    $this.addClass('show');
                }
            });

            $(document).off("mousedown", ".vbs-volume-toolbar-block").on("mousedown", ".vbs-volume-toolbar-block", function(e) {
                var $this = $(this);
                if (e.button === 0) {
                    var vol = 100 - 100 * (e.pageY - $this.find('.vbs-volume-slider').offset().top) / $(this).height();
                    if (vol > 100) {
                        vol = 100;
                    } else
                    if (vol < 0) {
                        vol = 0;
                    }
                    VB.PlayerApi.setUiVolume(vol);
                    VB.PlayerApi.setVolume(vol);
                    VB.data.draggingVol = true;
                }
            }).off("mousemove", ".vbs-volume-toolbar-block").on("mousemove", ".vbs-volume-toolbar-block", function(e) {
                e.preventDefault();
                var $this = $(this);
                if (VB.data.draggingVol) {
                    var vol = 100 - 100 * (e.pageY - $this.find('.vbs-volume-slider').offset().top) / $(this).height();
                    if (vol > 100) {
                        vol = 100;
                    } else
                    if (vol < 0) {
                        vol = 0;
                    }
                    VB.PlayerApi.setUiVolume(vol);
                    VB.PlayerApi.setVolume(vol);
                }
            }).on('mouseup mouseleave', function() {
                VB.data.draggingVol = false;
            });

            //* Keywords Events *//
            VB.helper.find('.vbs-keywords-block').on('click touchstart', '.vbs-keywords-list-tab li a', function(e) {
                e.preventDefault();
                VB.data.keywordClickEvent = true;
                if(VB.PlayerApi.getStatus() == 'PLAYING'){
                    VB.PlayerApi.pause();
                }
                VB.helper.showLoader();
                var $this = $(this);
                VB.helper.find('.vbs-markers').html('');
                VB.helper.find(".vbs-next-action-btn:not([class='vbs-next-notactive'])").addClass('vbs-next-notactive');
                VB.helper.removeBold();

                var termstring = $this.data("keywordInternalName");
                var term = VB.helper.termFor(termstring, 'url');
                var markerterms = VB.helper.termFor(termstring, 'marker');

                VB.helper.find('#vbs-voice_search_txt').val(term).change();
                $this.addClass('bold');
                if (markerterms.length) {
                    VB.view.searchWordWidget(markerterms);
                }
                var $voice_search_txt = VB.helper.find('#vbs-voice_search_txt');
                $voice_search_txt.data('data-val', $voice_search_txt.val());
                VB.helper.track('keyword', termstring);
                VB.api.getSearch(markerterms);
/*
                if(VB.settings.localSearch) {
                    VB.api.getSearch(markerterms); // search with fuse.js
                }
                else {
                    VB.helper.localSearch($this, markerterms); // search by times which comes from server from getFileAnalyticsSnippets query
                }
*/

                VB.api.getNews();
                VB.data.keywordClickEvent = false;
                return false;
            });

            if(VB.settings.toggleBlocks && VB.settings.toggleKeywordsBlock){
                VB.helper.find(".vbs-keywords-block .vbs-section-title").on('touchstart click', function(e) {
                    e.preventDefault();
                    var $this = $(this);
                    $this.toggleClass('vbs-hidden');
                    var $parents_keywords = $this.parents('.vbs-keywords-block');
                    if ($this.hasClass('vbs-hidden')) {
                        $this.attr('data-title', 'Show Keywords');
                        $parents_keywords.find('.vbs-section-body').slideUp();
                        $parents_keywords.find('.vbs-search-form').hide();
                    } else {
                        $this.attr('data-title', 'Hide Keywords');
                        $parents_keywords.find('.vbs-section-body').slideDown();
                        $parents_keywords.find('.vbs-search-form').show();
                    }
                });
            }

            // Show/hide more keywords
            VB.helper.find(".vbs-keywords-block .vbs-more-btn a").on('touchstart click', function(e) {
                e.preventDefault();
                if (VB.settings.keywordsHeight > VB.helper.getMaxKeywordHeight()) {
                    VB.settings.keywordsHeight = VB.helper.getKeywordHeight();
                }
                var maxKH = '100%';
                VB.helper.find('.vbs-keywords-list-wrapper').css({height: maxKH});
                var $this = $(this);

                if (VB.data.kf) {
                    VB.data.kf = false;
                    $this.text('Show More...');
                    VB.helper.find(".vbs-keywords-wrapper").animate({height: VB.settings.keywordsHeight + "px"}, 700);
                } else {
                    VB.helper.find(".vbs-keywords-wrapper").animate({height: VB.helper.getMaxKeywordHeight() + "px"}, 700);
                    $this.text('Hide More...');
                    VB.data.kf = true;
                }
                return false;
            });

            $(document).off('touchstart click', '.vbs-widget em').on('touchstart click', '.vbs-widget em', function(e) {
                e.preventDefault();
                var _this = $(this);
                var vb_words = _this.find('.vbs_word');
                var searchInput = $('#vbs-voice_search_txt');
                var words = [];

                if (vb_words.length) {
                    $.each(vb_words, function(key, value) {
                        words.push($(value).find('.search_word').text());
                        $(value).remove();
                    });
                    searchInput.val(words.join(' '));
                }
                VB.helper.find('.vbs-widget-wrap').addClass('focused');
                searchInput.css("opacity", "1");
                VB.helper.find('#vbs-search-string').hide();
                searchInput.focus();
            });

            // Clear Searchbar
            VB.helper.find('#vbs-clear-string').on('touchstart click', function(e) {
                e.preventDefault();
                if ($(this).parents('.vbs-search-form').hasClass('vbs-filled')) {
                    VB.helper.collapseNewsBlock();
                    VB.PlayerApi.pause();
                    VB.helper.find('.vbs-markers, .vbs-search-word-widget').html('');
                    VB.helper.find(".vbs-next-action-btn:not([class='vbs-next-notactive'])").addClass('vbs-next-notactive');
                    VB.helper.find('#vbs-voice_search_txt').val('').change();
                    VB.helper.find('.vbs-kwe-add').remove();
                    VB.helper.find("#vbs-search-string .vbs-marquee .vbs-search-word-widget").stop(true).css("left", 0);
                }
                return false;
            });

            // KeyUp Searchbar
            VB.helper.find('#vbs-voice_search_txt').on('keyup', function(e) {
                var words = VB.helper.getSearchWordsArray();
                if (words.length) {
                    VB.helper.find('.vbs-powered-by-label').addClass('vbs-hidden-p');
                } else {
                    VB.helper.find('.vbs-powered-by-label').removeClass('vbs-hidden-p');
                }
            });

            // Blur Searchbar
            VB.helper.find('#vbs-voice_search_txt').on('blur', function(e) {
                var words = VB.helper.getSearchWordsArray();
                if (words.length) {
                    VB.view.searchWordWidget(words);
                    VB.helper.find('.vbs-powered-by-label').addClass('vbs-hidden-p');
                } else {
                    VB.helper.find('.vbs-markers, .vbs-search-word-widget').html('');
                    VB.helper.find(".vbs-next-action-btn:not([class='vbs-next-notactive'])").addClass('vbs-next-notactive');
                    VB.helper.find('.vbs-powered-by-label').removeClass('vbs-hidden-p');
                }
                var $this = $(this);
                $this.data('data-val', $this.val());
                VB.helper.find('.vbs-widget-wrap').removeClass('focused');
                VB.helper.find('#vbs-search-string').show();
            });

            // Change Searchbar
            VB.helper.find('#vbs-voice_search_txt').on('change', function() {
                var $this = $(this);
                VB.helper.removeBold();
                var $search_string = VB.helper.find('#vbs-search-string');
                if ($this.val().length > 0) {
                    VB.helper.find(".vbs-search-form").addClass('vbs-filled');
                } else {
                    VB.helper.find(".vbs-search-form").removeClass('vbs-filled');
                    $this.css("opacity", "1");
                    $search_string.hide();
                    VB.helper.find('#vbs-voice_search_txt').focus();
                }
                if ($('#vbs-share-search').is(':checked')) {
                    var newparam = {};
                    newparam['vbs'] = encodeURI($this.val());
                    var url = VB.helper.getNewUrl(newparam);
                    VB.helper.find('#vbsp-url').val(url);
                    if (typeof addthis !== 'undefined') {
                        addthis.update('share', 'url', url);
                    }
                }
                VB.helper.find('.vbs-kwe-add').remove();
                VB.helper.updateQuotesVisibility();
                $search_string.show();
            });

            VB.helper.find('#vbs-search-btn').on('touchstart click', function(event) {
                event.preventDefault();
                VB.helper.find('#vbs-search-form').submit();
            });

            VB.helper.find('#vbs-search-form').on('submit', function() {
                if($('#vbs-searchbar-block').find('.vbs-search-form').hasClass('vbs-form-disabled')) {
                    return false;
                }
                if(VB.PlayerApi.getStatus() == 'PLAYING'){
                    VB.PlayerApi.pause();
                }
                VB.helper.find("#vbs-voice_search_txt").blur();
                VB.helper.find('.vbs-markers').html('');
                VB.helper.find(".vbs-next-action-btn:not([class='vbs-next-notactive'])").addClass('vbs-next-notactive');
                VB.helper.find('.vbs-kwe-add').remove();
                var words = VB.helper.getSearchWordsArray();

                if (words.length > 0) {
                    VB.helper.showLoader();
                    VB.view.searchWordWidget(words);
                    VB.api.getSearch(words);
                }
                else {
                    VB.helper.updateQuotesVisibility();
                }
                return false;
            });

            $(document).off('touchstart click', ".vbs-unquote-btn").on('touchstart click', ".vbs-unquote-btn", function(e) {
                e.preventDefault();
                VB.helper.removeQuotes();
            });

            VB.helper.find('#vbs-search-string').on('touchstart click', function(e) {
                e.preventDefault();
                if ($(e.target).hasClass("vbs-search-word-widget") || VB.helper.find('#vbs-voice_search_txt').val().length === 0) {
                    $(this).hide();
                    VB.helper.find('#vbs-voice_search_txt').css("opacity", "1").focus();
                }
            });

            VB.helper.find(".vbs-topics").on('touchstart click', '.vbs-topics-list li[class="vbs-active"]', function(event) {
                event.preventDefault();
            });

            VB.helper.find(".vbs-topics").on('touchstart click', '.vbs-topics-list li[class!="vbs-active"]', function(event) {
                //event.preventDefault();
                var li = $(this);
                if (li.hasClass('vbs-active') || li.hasClass('vbs-disabled')) {
                    return false;
                }
                li.parent().find('.vbs-active').removeClass('vbs-active');
                li.addClass('vbs-active');
                var href = li.find('a');
                var catName = href.text().trim();
                VB.helper.find(".vbs-keywords-list-tab ul").removeClass('vbs-active');
                VB.helper.find('.vbs-keywords-list-tab ul[tid="' + catName + '"]').addClass('vbs-active');
                if (VB.settings.keywordsColumns == 'topics') {
                    VB.helper.keywordsAutoTopicsColumns();
                }
                if (VB.settings.editKeywords) {
                    $('.vbs-topic-delete-popup').fadeOut('fast', function() {
                        $(this).remove();
                    });
                }
                VB.speakers.filterSpeakersList(href.attr('speakers').split(','));
            });

            VB.helper.find(".vbs-keywords-list-tab").on('mouseenter touchstart', 'li.key a', function(e) {
                var target = $(e.target).is('span') ? $(e.target).parent() : $(e.target) ;
                var times = target.attr('t');
                VB.view.keywordHover(times);
            });

            VB.helper.find(".vbs-keywords-list-tab").on('mouseleave touchend', 'li.key a', function(e) {
                VB.view.removeKeywordHover();
            });

            if (VB.settings.topicHover === true) {
                VB.helper.find(".vbs-keywords-block").on({
                    mouseover: function(e) {
                        var catName = $(this).text().trim();
                        var timesArray = [];
                        VB.helper.find('.vbs-keywords-list-tab ul[tid="' + catName + '"]').find('li.key a').each(function() {
                            timesArray.push($(this).attr('t'));
                        });

                        var uniqueNames = [];
                        $.each(timesArray.join().split(','), function(i, el) {
                            if ($.inArray(el, uniqueNames) === -1)
                                uniqueNames.push(el);
                        });
                        VB.view.keywordHover(uniqueNames.join());
                    },
                    mouseout: function(e) {
                        VB.view.removeKeywordHover();
                    }
                }, '.vbs-topics-list li a');
            }

            VB.helper.find('.vbs-select-language').on('touchstart click', function(event) {
                event.preventDefault();
                toggleDropdown($(this));
            });

            VB.helper.find('.vbs-select-language-wrapper .vbs-select-dropdown').on('touchstart click', 'li', function(e) {
                e.preventDefault();
                var $this = $(this);
                if($this.hasClass('vbs-disabled')){
                    return false;
                }
                $this.parents('.vbs-select-dropdown').fadeOut('fast');
                VB.view.selectLanguage({
                    lang_code: $this.attr("data-lang-code"),
                    lang_name: $this.text()
                });
            });

            VB.helper.find('.vbs-select-speaker').on('touchstart click', function(event) {
                event.preventDefault();
                toggleDropdown($(this));
            });

            var toggleDropdown = function($elem){
                if ($elem.hasClass('vbs-s-show')) {
                    VB.helper.find('.vbs-select-dropdown').fadeOut('fast');
                    $elem.removeClass('vbs-s-show');
                } else {
                    VB.helper.find('.vbs-select-dropdown').fadeIn(100);
                    $elem.addClass('vbs-s-show');
                }

            };

            /*adjusting width of speaker select*/
            var $selectSpeaker = VB.helper.find('.vbs-select-speaker');
            var $searchBtn = VB.helper.find('.vbs-search-btn');
            var $widgetWrap = VB.helper.find('.vbs-widget-wrap');
            var widgetWrapPaddings = parseInt($widgetWrap.css('paddingLeft')) + parseInt($widgetWrap.css('paddingRight'));
            var searchBtnWidth = $searchBtn.width() + parseInt($searchBtn.css('borderLeft'));

            var selSpeakPaddings =  parseInt($selectSpeaker.css('paddingLeft')) + parseInt($selectSpeaker.css('paddingRight'));
            var selSpeakBorders =  parseInt($selectSpeaker.css('borderLeftWidth')) + parseInt($selectSpeaker.css('borderRightWidth'));

            var searchMinWidth = parseInt($widgetWrap.css('minWidth'));

            if($('#vbs-keywords').width() <= 437){
                $selectSpeaker.addClass('vbs-fixed-width');
                $widgetWrap.addClass('vbs-without-min-width');
            }
            if($('#vbs-keywords').width() <= 360){
                VB.helper.find('.vbs-search-form').addClass('less-360px');
            }

            VB.helper.find('.vbs-select-speaker-wrapper .vbs-select-dropdown').on('touchstart click', 'li', function(e) {
                e.preventDefault();
                $selectSpeaker.css('width', 'auto');
                var $this = $(this);
                if($this.hasClass('vbs-disabled')){
                    return false;
                }
                VB.helper.find('.vbs-select-dropdown').fadeOut('fast');
                var speaker_key = $this.attr("data-speaker");
                var label = speaker_key == 'all' ? 'Select speaker...' : $this.text();
                VB.helper.find('.vbs-select-speaker').removeClass('vbs-s-show').html(label);
                VB.helper.filterKeywords(speaker_key);

                if(!VB.settings.searchBarOuter){
                    /* adjusting positions of searching and search btn*/
                    var parents_keywords = $this.parents('#vbs-keywords');
                    var selSpeakWidth;
                    var keywordsWidth;
                    var fixedWidthSelSpeaker;
                    if(parents_keywords.hasClass('less-600px')){
                        if(parents_keywords.width() <= 437){
                            return false;
                        }else{
                            selSpeakWidth = $selectSpeaker.width() + selSpeakPaddings + selSpeakBorders;
                            var searchMarginRight = 12;
                            $searchBtn.css('right', selSpeakWidth + searchMarginRight);
                            $widgetWrap.css('marginRight', selSpeakWidth + searchBtnWidth + searchMarginRight);

                            if($widgetWrap.width() <= searchMinWidth){
                                keywordsWidth = VB.helper.find('.vbs-keywords-block').width();
                                var $widget_wrap = VB.helper.find('.vbs-widget-wrap');
                                var searchBorders = parseInt($widget_wrap.css('borderLeftWidth')) + parseInt($widget_wrap.css('borderRightWidth'));

                                fixedWidthSelSpeaker = keywordsWidth - (searchMinWidth + searchBorders + searchBtnWidth + searchMarginRight + selSpeakBorders + selSpeakPaddings + widgetWrapPaddings);

                                $selectSpeaker.css('width', fixedWidthSelSpeaker);
                                $searchBtn.css('right', fixedWidthSelSpeaker + selSpeakPaddings + selSpeakBorders + searchMarginRight);
                                $widgetWrap.css('marginRight', fixedWidthSelSpeaker + selSpeakPaddings + selSpeakBorders + searchBtnWidth + searchMarginRight);
                            }
                        }
                    }else{
                        selSpeakWidth = $selectSpeaker.width() + selSpeakPaddings + selSpeakBorders;

                        $searchBtn.css('right', selSpeakWidth);
                        $widgetWrap.css('marginRight', selSpeakWidth + searchBtnWidth);

                        if($widgetWrap.width() <= searchMinWidth){
                            keywordsWidth = VB.helper.find('.vbs-keywords-block').width() - parseInt(VB.helper.find('.vbs-keywords-block .vbs-section-header').css('borderLeftWidth')) - parseInt(VB.helper.find('.vbs-keywords-block .vbs-section-header').css('borderRightWidth'));

                            var keywordsTitleWidth = VB.helper.find('.vbs-keywords-block .vbs-section-title').width() + parseInt(VB.helper.find('.vbs-keywords-block .vbs-search-form').css('borderLeftWidth'));

                            fixedWidthSelSpeaker = keywordsWidth - (keywordsTitleWidth + searchBtnWidth + searchMinWidth + selSpeakBorders + selSpeakPaddings + widgetWrapPaddings + 1);

                            $selectSpeaker.css('width', fixedWidthSelSpeaker);
                            $searchBtn.css('right', fixedWidthSelSpeaker + selSpeakPaddings + selSpeakBorders);
                            $widgetWrap.css('marginRight', fixedWidthSelSpeaker + selSpeakPaddings + selSpeakBorders + searchBtnWidth);
                        }
                    }
                }
            });

            if (VB.settings.editKeywords) {
                $(document).off('touchstart click', ".vbs-voicebase_up").on('touchstart click', ".vbs-voicebase_up", function(e) {
                    e.preventDefault();
                    if (typeof VB.settings.webHooks.keywordUp != 'undefined') {
                        VB.settings.webHooks.keywordUp();
                        return false;
                    }
                    var $this = $(this);
                    var txt = $this.parent().data("keywordInternalName");
                    var elem = getLinkByKeywordName(txt);
                    var ecat;
                    if (VB.helper.find('.vbs-topics')) {
                        ecat = VB.helper.find(".vbs-topics-list li.vbs-active").text();
                    }
                    var ekey = $(elem).text();
                    VB.api.editKeyword('up', ekey, ecat, elem);
                });

                $(document).off('touchstart click', ".vbs-voicebase_down").on('touchstart click', ".vbs-voicebase_down", function(e) {
                    e.preventDefault();
                    if (typeof VB.settings.webHooks.keywordDown != 'undefined') {
                        VB.settings.webHooks.keywordDown();
                        return false;
                    }
                    var $this = $(this);
                    var txt = $this.parent().data("keywordInternalName");
                    var elem = getLinkByKeywordName(txt);
                    var ecat;
                    if (VB.helper.find('.vbs-topics')) {
                        ecat = VB.helper.find(".vbs-topics-list li.vbs-active").text();
                    }
                    var ekey = $(elem).text();
                    VB.api.editKeyword('down', ekey, ecat, elem);
                });

                $(document).off('touchstart click', ".vbs-voicebase_first").on('touchstart click', ".vbs-voicebase_first", function(e) {
                    e.preventDefault();
                    if (typeof VB.settings.webHooks.keywordFirst != 'undefined') {
                        VB.settings.webHooks.keywordFirst();
                        return false;
                    }
                    var $this = $(this);
                    var txt = $this.parent().data("keywordInternalName");
                    var elem = getLinkByKeywordName(txt);
                    var ecat;
                    if (VB.helper.find('.vbs-topics')) {
                        ecat = VB.helper.find(".vbs-topics-list li.vbs-active").text();
                    }
                    var ekey = $(elem).text();
                    VB.api.editKeyword('first', ekey, ecat, elem);
                });

                $(document).off('touchstart click', ".vbs-voicebase_remove").on('touchstart click', ".vbs-voicebase_remove", function(event) {
                    event.preventDefault();
                    if (typeof VB.settings.webHooks.removeKeyword != 'undefined') {
                        VB.settings.webHooks.removeKeyword();
                        return false;
                    }
                    var $this = $(this);
                    var txt = $this.parent().data("keywordInternalName");
                    var elem = getLinkByKeywordName(txt);
                    var ecat;
                    if (VB.helper.find('.vbs-topics')) {
                        ecat = VB.helper.find(".vbs-topics-list li.vbs-active").text();
                    }
                    var ekey = $(elem).text();
                    VB.api.removeKeyword(ekey, ecat, elem);
                });

                var getLinkByKeywordName = function(keywordName) {
                    var elem;
                    VB.helper.find('.vbs-keywords-list-tab ul.vbs-active').find('a').each(function() {
                        if($(this).data("keywordInternalName") == keywordName) {
                            elem = $(this);
                            return true;
                        }
                    });
                    return elem;
                };

                $(document).off('touchstart click', ".vbs-topic-del-btn-wrap .vbs-cross-btn").on('touchstart click', ".vbs-topic-del-btn-wrap .vbs-cross-btn", function(event) {
                    event.preventDefault();
                    var $rmblock = $('.vbs-topic-delete-popup');
                    var $this = $(this);

                    if ($rmblock.length) {
                        $rmblock.fadeOut('fast', function() {
                            $rmblock.remove();
                        });
                    } else {
                        var $vbs_popup = $(document).find('.vbs-popup');
                        $vbs_popup.hide().siblings('a').removeClass('vbs-active');
                        /*appending del popup in the <body>*/
                        $(VB.templates.parse('deleteTopicPopup', {topicname: $this.parents('li').find('a').text()})).appendTo('body');
                        /*position of popup*/
                        var delBtnTopPos = $(this).offset().top;
                        var delBtnLeftPos = $(this).offset().left;
                        var $topic_delete_popup = $('.vbs-topic-delete-popup');
                        $topic_delete_popup.css({
                            'top': delBtnTopPos + 'px',
                            'left': delBtnLeftPos + 'px'
                        });
                        /*hiding popup if scroll happens*/
                        VB.helper.find('.vbs-edit-topics').scroll(function() {
                            $topic_delete_popup.fadeOut('fast', function() {
                                $(this).remove();
                            });
                        });
                    }
                });

                $(document).off('touchstart click', ".vbs-add-search-word").on('touchstart click', ".vbs-add-search-word", function(event) {
                    event.preventDefault();
                    VB.api.addKeywords($(this).data('data-kwa'), $(this).data('data-kwt'));
                });
            }

            $(document).off('touchstart click', ".vbs-topic-delete-popup .vbs-confirm-btn").on('touchstart click', ".vbs-topic-delete-popup .vbs-confirm-btn", function(event) {
                event.preventDefault();
                $('.vbs-topic-delete-popup').fadeOut('fast', function() {
                    $(this).remove();
                });
            });

            $(document).off('touchstart click', ".vbs-topic-delete-popup .vbs-cancel-btn").on('touchstart click', ".vbs-topic-delete-popup .vbs-cancel-btn", function(event) {
                event.preventDefault();
                if (typeof VB.settings.webHooks.removeTopic != 'undefined') {
                    VB.settings.webHooks.removeTopic();
                    return false;
                }
                var $this = $(this);
                var cat = $this.parents('.vbs-topic-delete-popup').attr('data-topic');
                VB.api.removeTopic(cat);
            });

            //* Transcript events *//
            VB.helper.find('.vbs-transcript-block .vbs-transcript-wrapper').on('touchstart click', 'span.w', function(e) {
                e.preventDefault();
                if(VB.PlayerApi.getStatus() == 'PLAYING'){
                    VB.PlayerApi.pause();
                }
                VB.helper.showLoader();
                VB.helper.find('.vbs-markers').html('');
                VB.helper.find(".vbs-next-action-btn:not([class='vbs-next-notactive'])").addClass('vbs-next-notactive');
                var $this = $(this);
                var stime = $this.attr('t') / 1000;

                stime = stime > 1 ? stime - 1 : stime;
                VB.helper.find(".vbs-player-slider").css("left", stime / VB.data.duration * 100 + "%");
                VB.helper.find(".vbs-record-progress").css("width", stime / VB.data.duration * 100 + "%");

                VB.PlayerApi.seek(stime);
                var word = $this.text().trim();
                VB.helper.track('transcript', word);
                if (word.match(/\s+/g)) {
                    word = '"' + word + '"';
                }
                var $voice_search_txt = VB.helper.find('#vbs-voice_search_txt');
                $voice_search_txt.val(word).change();
                if (word.length) {
                    VB.view.searchWordWidget([word]);
                }
                $voice_search_txt.data('data-val', $voice_search_txt.val());
                VB.api.getSearch([word], false);
                return false;
            });

            if(VB.settings.toggleBlocks && VB.settings.toggleTranscriptBlock){
                VB.helper.find(".vbs-transcript-block .vbs-section-title").on('touchstart click', function(e) {
                    e.preventDefault();
                    var $this = $(this);
                    $this.toggleClass('vbs-hidden');
                    if ($this.hasClass('vbs-hidden')) {
                        $this.attr('data-title', 'Show Transcript');
                        $this.parents('.vbs-transcript-block').find('.vbs-section-body').slideUp();
                    } else {
                        $this.attr('data-title', 'Hide Transcript');
                        $this.parents('.vbs-transcript-block').find('.vbs-section-body').slideDown();
                    }
                });
            }

            VB.helper.find(".vbs-transcript-block .vbs-more-btn a").on('touchstart click', function(event) {
                event.preventDefault();
                var maxTH = VB.helper.find('.vbs-transcript-wrapper').height();
                var $this = $(this);
                if (VB.data.tf) {
                    VB.data.tf = false;
                    $this.text('Show More...');
                    $(".vbs-transcript-prewrapper").animate({height: VB.settings.transcriptHeight + "px"}, 700);
                } else {
                    $(".vbs-transcript-prewrapper").animate({height: maxTH + 20 + "px"}, 700, "linear", function() {
                        $(this).css({height: "auto"});
                    });
                    $this.text('Hide More...');
                    VB.data.tf = true;
                }
            });

            VB.helper.find(".vbs-transcript-block .vbs-transcript-prewrapper").on({
                mouseover: function(e) {
                    $(this).addClass('vbs-t-hover');
                },
                mouseout: function(e) {
                    $(this).removeClass('vbs-t-hover');
                }
            });

            //* Buttons Events *//
            VB.helper.find('.vbs-section-btns').on('touchstart click', '.vbs-cloud-btn', function(event) {
                event.preventDefault();
                if (typeof VB.settings.webHooks.downloadMedia != 'undefined') {
                    VB.settings.webHooks.downloadMedia();
                    return false;
                }
                var $this = $(this);
                if ($this.hasClass('vbs-active')) {
                    $this.removeClass('vbs-active');
                    $this.parent().find('.vbs-download-popup').fadeOut('fast');
                } else {
                    $this.addClass('vbs-active');
                    $this.parent().find('.vbs-download-popup').fadeIn('fast');
                }
            });

            // Dowload transcript
            VB.helper.find('.vbs-download-popup').on('touchstart click', '.vbs-donwload-pdf, .vbs-donwload-rtf, .vbs-donwload-srt', function(event) {
                event.preventDefault();
                VB.helper.find('.vbs-cloud-btn').removeClass('vbs-active');
                VB.helper.find('.vbs-download-popup').fadeOut('fast');
                var format = $(this).attr('format');
                VB.helper.downloadFile(format);
            });

            // Donwload Audio
            VB.helper.find('.vbs-media-block').on('touchstart click', '.vbs-download-audio-btn', function(event) {
                event.preventDefault();
                if($(this).hasClass('vbs-disable-button')){
                    return false;
                }
                if (typeof VB.settings.webHooks.downloadTranscript != 'undefined') {
                    VB.settings.webHooks.downloadTranscript();
                    return false;
                }
                VB.api.downloadAudio();
            });

            // Share
            VB.helper.find('.vbs-share-btn-wrapper').on('touchstart click', '.vbs-share-btn', function(event) {
                event.preventDefault();
                if (typeof VB.settings.webHooks.socialShare != 'undefined') {
                    VB.settings.webHooks.socialShare();
                    return false;
                }
                var newparam = {};
                var ltime = VB.PlayerApi.getPosition();
                newparam['vbt'] = Math.round(ltime);
                var url = VB.helper.getNewUrl(newparam);
                var vbspTime = VB.helper.parseTime(Math.round(ltime));
                var zclipBox = typeof $.fn.zclip !== 'undefined' ? '' : 'vbs-no-zclip';
                var shareButtonsString = '';
                for (var atb in VB.settings.addThisButtons) {
                    shareButtonsString += '<a class="addthis_button_' + VB.settings.addThisButtons[atb] + '"></a>';
                }

                var addthisBox = typeof addthis !== 'undefined' ? '<div class="vbs-share-social-row vbs-clearfix">\n\
                        <span>Choose one:</span>\n\
                        <div class="vbs-social-wrapper">\n\
                            <div class="vbs-addthis-toolbox addthis_toolbox addthis_default_style">' +
                    shareButtonsString +
                    '<a class="addthis_counter addthis_bubble_style"></a>\n\
                            </div>\n\
                        </div>\n\
                    </div>' : '';
                var vbShareButton = VB.settings.voicebaseShare ? '<span>or</span><a href="#" class="vbs-voicebase-share-btn">Share with E-mail</a>' : '';
                var html = VB.templates.parse('sharePopup', {"vbt": newparam['vbt'], "vbspTime": vbspTime, "zclip": zclipBox, "addthis": addthisBox, "url": url, "vbShareButton": vbShareButton});

                var $share_popup = VB.helper.find('.vbs-share-popup');
                if ($share_popup.length === 0 || $share_popup.hasClass('vbs-hidden')) {
                    VB.helper.find('.vbs-share-popup.vbs-hidden').remove();
                    VB.helper.find('.vbs-share-btn-wrapper').append(html);
                    if (typeof $.fn.zclip !== 'undefined') {
                        VB.helper.find(".vbs-copy-btn").zclip({
                            path: VB.settings.zeroclipboard,
                            copy: function() {
                                return VB.helper.find('#vbsp-url').val();
                            }
                        });
                    }
                    if (typeof addthis !== 'undefined') {
                        addthis.toolbox('.vbs-addthis-toolbox', {}, {'url': url, 'title': VB.settings.shareTitle});
                    }
                } else {
                    $share_popup.fadeOut('fast', function() {
                        $share_popup.addClass('vbs-hidden').show();
                    });
                }
            });

            $(document).off('touchstart click', '#vbs-share-position').on('touchstart click', '#vbs-share-position', function(e) {
                var ltime = VB.PlayerApi.getPosition();
                var vbspTime = VB.helper.parseTime(Math.round(ltime));
                var newparam = {
                    vbt: Math.round(ltime)
                };
                shareActions(newparam, this);
                VB.helper.find('.vbsp-time').html(vbspTime).attr('vbct', vbspTime);
            });
            $(document).off('touchstart click', '#vbs-share-search').on('touchstart click', '#vbs-share-search', function(e) {
                var newparam = {
                    vbs: encodeURI($('#vbs-voice_search_txt').val())
                };
                shareActions(newparam, this);
            });
            $(document).off('touchstart click', '#vbs-share-file').on('touchstart click', '#vbs-share-file', function(e) {
                var newparam = {
                    vbt: 0
                };
                shareActions(newparam, this);
            });

            var shareActions = function name(newparam, context){
                VB.helper.find(".vbs-share-popup .vbs-share-radio-row").removeClass('vbs-checked');
                $(context).parents('.vbs-share-radio-row').addClass('vbs-checked');
                var url = VB.helper.getNewUrl(newparam);
                VB.helper.find('#vbsp-url').val(url);
                if (typeof addthis !== 'undefined') {
                    addthis.update('share', 'url', url);
                }
            };

            VB.helper.find('.vbs-share-btn-wrapper').on('touchstart click', '.vbs-cancel-btn', function(event) {
                event.preventDefault();
                fadeOutSharePopup();
            });

            VB.helper.find('.vbs-share-btn-wrapper').on('touchstart click', '.vbs-addthis-toolbox a', function(e) {
                e.preventDefault();
                fadeOutSharePopup();
            });

            VB.helper.find('.vbs-share-btn-wrapper').on('touchstart click', '.vbsp-url', function(event) {
                event.preventDefault();
                $(this).select();
            });

            // Share play
            var vbspPlay;
            VB.helper.find('.vbs-share-btn-wrapper').on('touchstart click', '.vbs-play-btn', function(event) {
                event.preventDefault();
                clearTimeout(vbspPlay);
                vbspPlay = setTimeout(function() {
                    VB.PlayerApi.seek($('.vbsp-time').attr('vbct'));
                }, 250);
            });

            // Share VoiceBase
            VB.helper.find('.vbs-share-btn-wrapper').on('touchstart click', '.vbs-voicebase-share-btn', function(event) {
                event.preventDefault();
                if (typeof VB.settings.webHooks.vbShare != 'undefined') {
                    VB.settings.webHooks.vbShare();
                    if (typeof VB.settings.webHooks.vbShareClose === 'undefined' || (typeof VB.settings.webHooks.vbShareClose !== 'undefined' && VB.settings.webHooks.vbShareClose === true)) {
                        fadeOutSharePopup();
                    }
                    return false;
                }
                alert('Default Voicebase Share action');
            });

            var fadeOutSharePopup = function(){
                var $share_popup = VB.helper.find('.vbs-share-popup');
                $share_popup.fadeOut('fast', function() {
                    $share_popup.addClass('vbs-hidden').show();
                });
            };

            // Delete media popup
            VB.helper.find('.vbs-section-btns').on('touchstart click', '.vbs-del-btn', function(event) {
                event.preventDefault();
                var $this = $(this);
                if($this.hasClass('vbs-disable-button')){
                    return false;
                }
                var $download_popup = $this.parent().find('.vbs-download-popup');
                if ($this.hasClass('vbs-active')) {
                    $this.removeClass('vbs-active');
                    $download_popup.fadeOut('fast');
                } else {
                    $this.addClass('vbs-active');
                    $download_popup.fadeIn('fast');
                }
            });

            // Delete media action
            VB.helper.find('.vbs-section-btns').on('touchstart click', '.vbs-red-btn', function(event) {
                event.preventDefault();
                VB.helper.find('.vbs-section-btns .vbs-del-btn').removeClass('vbs-active');
                $(this).parents('.vbs-popup').fadeOut('fast');
                if (typeof VB.settings.webHooks.remove != 'undefined') {
                    VB.settings.webHooks.remove();
                    return false;
                }
                alert('Default delete action');
            });

            // Delete media cancel
            VB.helper.find('.vbs-section-btns').on('touchstart click', '.vbs-blue-btn', function(event) {
                event.preventDefault();
                VB.helper.find('.vbs-section-btns .vbs-del-btn').removeClass('vbs-active');
                $(this).parents('.vbs-popup').fadeOut('fast');
            });

            // Favorite
            VB.helper.find('.vbs-section-btns').on('touchstart click', '.vbs-star-btn', function(event) {
                event.preventDefault();
                var $this = $(this);
                if($this.hasClass('vbs-disable-button')) {
                    return false;
                }
                if ($this.hasClass('vbs-active')) {
                    if (typeof VB.settings.webHooks.favoriteTrue != 'undefined') {
                        VB.settings.webHooks.favoriteTrue();
                        return false;
                    }
                    VB.api.favorite(false);
                } else {
                    if (typeof VB.settings.webHooks.favoriteFalse != 'undefined') {
                        VB.settings.webHooks.favoriteFalse();
                        return false;
                    }
                    VB.api.favorite(true);
                }
            });

            // Help
            VB.helper.find('.vbs-section-btns').on('touchstart click', '.vbs-help-btn', function(event) {
                event.preventDefault();
                if (typeof VB.settings.webHooks.help != 'undefined') {
                    VB.settings.webHooks.help();
                    return false;
                }
                window.open(VB.settings.helpUrl, '_blank');
            });

            // Fullscreen btn
            VB.helper.find('.vbs-section-btns').on('touchstart click', '.vbs-expand-btn', function(event) {
                event.preventDefault();
                if (typeof VB.settings.webHooks.fullscreen != 'undefined') {
                    VB.settings.webHooks.fullscreen();
                    return false;
                }
                $('body').addClass('vbs-fullscreen');
                if(VB.settings.playerType == 'sublime' || VB.settings.playerType == 'jplayer'){
                    var playerWrap = VB.helper.findc('.vbs-player-wrapper');
                    VB.PlayerApi.setSizePlayer(playerWrap.width(), playerWrap.height());
                }
                var controlsBlock = $('#' + VB.settings.controlsBlock);
                if(!VB.settings.markersInNativeTimeline) {
                    searcBarToFullScreen('full');
                }
                else {
                    kalturaFullScreenVideo('full');
                }

                controlsBlock.append('<a href="#" class="vbs-fullscreen-exit">Exit</a>').wrap('<div class="vbs-controls-wrapper"></div>').addClass('vbs-controls-box');
                if(VB.settings.markersInNativeTimeline) {
                    kalturaResizeSearchbar('full');
                }
                VB.view.resizeTimelineElements();
                VB.helper.collapseNewsBlock();
                return false;
            });

            // Fullscreen exit
            $(document).off('touchstart click', '.vbs-fullscreen-exit').on('touchstart click', '.vbs-fullscreen-exit', function(event) {
                event.preventDefault();
                if (typeof VB.settings.webHooks.fullscreenExit != 'undefined') {
                    VB.settings.webHooks.fullscreenExit();
                    return false;
                }
                $('body').removeClass('vbs-fullscreen');
                if(VB.settings.playerType == 'sublime' || VB.settings.playerType == 'jplayer'){
                    VB.PlayerApi.setDefaultSizePlayer();
                }

                $(this).remove();
                var controlsBlock = $('#' + VB.settings.controlsBlock);
                controlsBlock.unwrap().removeClass('vbs-controls-box');
                if(!VB.settings.markersInNativeTimeline) {
                    searcBarToFullScreen('exit_full');
                }
                else {
                    kalturaFullScreenVideo('exit_full');
                    kalturaResizeSearchbar('exit_full');
                }

                VB.view.resizeTimelineElements();
            });

            var kalturaFullScreenVideo = function (mode) {
                var controlsBlock = $('#' + VB.settings.controlsBlock);
                var $searchBar = $('#vbs-searchbar-block');
                if(mode == 'full'){
                    controlsBlock.addClass('vbs-native-markers');
                    if(VB.settings.searchBarOuter){
                        controlsBlock.append($searchBar);
                    }
                    else{
                        var sem = '<div id="vbs-searchbar-block" class="vbs-controls-after-searchbar vbs-searchbar-outer"></div>';
                        controlsBlock.append(sem);
                        $searchBar = $('#vbs-searchbar-block');
                        $searchBar.append($('.vbs-search-form'));
                        $searchBar.append($('.vbs-after-controls-wrapper'));
                    }
                }
                else if(mode == 'exit_full'){
                    controlsBlock.removeClass('vbs-native-markers');
                    if(!VB.settings.searchBarOuter){
                        $('.vbs-keywords-block .vbs-section-title').after($('.vbs-search-form'));
                        $('.vbs-keywords-block').find('.vbs-controls-after-searchbar').empty().append($('.vbs-after-controls-wrapper'));
                        $('#vbs-searchbar-block').remove();
                    }
                    else{
                        controlsBlock.after($searchBar);
                    }
                }
            };

            var kalturaResizeSearchbar = function (mode) {
                var $searchBar = $('#vbs-searchbar-block');
                if(mode == 'full') {
                    var calcWidth = $searchBar.width() - $('.vbs-fullscreen-exit').width() - $('.vbs-after-controls-wrapper').width() - 20;
                    $searchBar.find('.vbs-search-form').width(calcWidth);
                    $('.vbs-controls-wrapper').height('85px');
                }
                else if(mode == 'exit_full'){
                    if(VB.settings.searchBarOuter){
                        $searchBar.find('.vbs-search-form').width($searchBar.width() - $('.vbs-controls-after-searchbar .vbs-after-controls-wrapper').width()  - 2);
                    }
                    else {
                        $('.vbs-search-form').width('inherit');
                    }
                }
            };

            /*reader mode*/
            VB.helper.find('.vbs-section-btns').on('touchstart click', '.vbs-readermode-btn', function(event) {
                event.preventDefault();
                if (typeof VB.settings.webHooks.readermode != 'undefined') {
                    VB.settings.webHooks.readermode();
                    return false;
                }
                VB.view.hideTooltips();

                $('body').addClass('vbs-readermode');
                var controlsBlock = $('#' + VB.settings.controlsBlock);
                searcBarToFullScreen('full');
                controlsBlock.append('<a href="#" class="vbs-reader-exit">Exit</a>').wrap('<div id="vbs-controls-placement"><div class="vbs-controls-wrapper"></div></div>').addClass('vbs-controls-box');
                VB.view.resizeTimelineElements();
                var classes = VB.data.vclass;
                if(VB.settings.localApp) {
                    classes += ' vbs-local-app';
                }
                $('body').append('<div id="vbs-reader-wrap" class="' + classes + '"></div>');
                $('.vbs-controls-wrapper').appendTo('#vbs-reader-wrap');
                $('.vbs-transcript-block').appendTo('#vbs-reader-wrap');
                VB.helper.collapseNewsBlock();
            });
            $(document).off('touchstart click', '.vbs-reader-exit').on('touchstart click', '.vbs-reader-exit', function(event) {
                event.preventDefault();
                if (typeof VB.settings.webHooks.readermodeExit != 'undefined') {
                    VB.settings.webHooks.readermodeExit();
                    return false;
                }
                $('body').removeClass('vbs-readermode');
                $(this).remove();

                $('.vbs-controls-wrapper').appendTo('#vbs-controls-placement').unwrap();
                $('.vbs-transcript-block').appendTo('#' + VB.settings.transcriptBlock);
                $('#vbs-reader-wrap').remove();

                var controlsBlock = $('#' + VB.settings.controlsBlock);
                controlsBlock.unwrap().removeClass('vbs-controls-box');
                searcBarToFullScreen('exit_full');
                VB.view.resizeTimelineElements();
            });

            var searcBarToFullScreen = function(mode){
                var controlsBlock = $('#' + VB.settings.controlsBlock);
                var $searchBar = $('#vbs-searchbar-block');
                if(mode == 'full'){
                    if(!VB.settings.searchBarOuter){
                        controlsBlock.append($('.vbs-search-form'));
                    }
                    else{
                        $searchBar.css('height', 0);
                        controlsBlock.append($searchBar);
                    }
                    if (controlsBlock.hasClass('less-600px') && !VB.helper.isMobile()) {
                        controlsBlock.removeClass('less-600px').addClass('less-600px-backup');
                    }
                    if(VB.settings.markersInNativeTimeline) {
                        VB.view.resetControlsPlace();
                    }
                }
                else if(mode == 'exit_full'){
                    if(!VB.settings.searchBarOuter){
                        $('.vbs-keywords-block .vbs-section-title').after($('.vbs-search-form'));
                    }
                    else{
                        $searchBar.css('height', '32px');
                        controlsBlock.after($searchBar);
                    }
                    if (controlsBlock.hasClass('less-600px-backup') && !VB.helper.isMobile()) {
                        controlsBlock.removeClass('less-600px-backup').addClass('less-600px');
                    }
                    if(VB.settings.markersInNativeTimeline) {
                        VB.view.renderControlsAfterSearchBar();
                    }
                }
            };

            //* Comments events *//
            if(VB.settings.toggleBlocks && VB.settings.toggleCommentBlock){
                VB.helper.find(".vbs-comments-block .vbs-section-title").on('touchstart click', function(e) {
                    e.preventDefault();
                    VB.comments.toggleBlockHandler($(this));
                });
            }

            VB.helper.find('.vbs-comments-block .vbs-section-btns').on('touchstart click', '.vbs-comments-btn', function(event) {
                event.preventDefault();
                if (typeof VB.settings.webHooks.comment != 'undefined') {
                    VB.settings.webHooks.comment();
                    return false;
                }
                VB.comments.clickAddCommentHandler($(this));
            });

            VB.helper.find('.vbs-comments-block').on('touchstart click', '.vbs-section-header .vbs-confirm-btn', function(event) {
                event.preventDefault();
                VB.comments.confirmAddCommentHandler($(this));
            });

            VB.helper.find('.vbs-comments-block').on('touchstart click', '.vbs-play-btn', function(event) {
                event.preventDefault();
                VB.helper.collapseNewsBlock();
                VB.comments.playCommentHandler($(this));
            });

            VB.helper.find('.vbs-comments-block').on('touchstart click', '.vbs-comment-time', function(event) {
                event.preventDefault();
                VB.comments.commentTimeHandler($(this));
                VB.helper.collapseNewsBlock();
            });

            VB.helper.find('.vbs-comments-block').on('touchstart click', '.vbs-comment-reply', function(event) {
                event.preventDefault();
                VB.helper.collapseNewsBlock();
                if (typeof VB.settings.webHooks.comment != 'undefined') {
                    VB.settings.webHooks.comment();
                    return false;
                }
                VB.comments.replyHandler($(this));
            });

            // EDIT COMMENT BTN
            VB.helper.find('.vbs-comments-block').on('touchstart click', '.vbs-comment-edit', function(event) {
                event.preventDefault();
                VB.helper.collapseNewsBlock();
                if (typeof VB.settings.webHooks.commentEdit != 'undefined') {
                    VB.settings.webHooks.commentEdit();
                    return false;
                }
                VB.comments.editHandler($(this));
            });

            // CANCEL BTN
            VB.helper.find('.vbs-comments-block').on('touchstart click', '.vbs-section-header .vbs-cancel-btn, .vbs-comment-reply-wrapper .vbs-cancel-btn, .vbs-comment-edit-btn-wrapper .vbs-cancel-btn, .vbs-comment-delete-btn-wrapper .vbs-confirm-btn', function(event) {
                event.preventDefault();
                VB.helper.collapseNewsBlock();
                VB.comments.cancelHandler($(this));
            });

            // REPLY BTN
            VB.helper.find('.vbs-comments-block').on('touchstart click', '.vbs-comment-reply-wrapper .vbs-confirm-btn', function(event) {
                event.preventDefault();
                VB.helper.collapseNewsBlock();
                VB.comments.replyConfirmHandler($(this));
            });

            // EDIT COMMENT
            VB.helper.find('.vbs-comments-block').on('touchstart click', '.vbs-comment-edit-btn-wrapper .vbs-confirm-btn', function(event) {
                event.preventDefault();
                VB.helper.collapseNewsBlock();
                VB.comments.editConfirmHandler($(this));
            });

            // DELETE COMMENT BTN
            VB.helper.find('.vbs-comments-block').on('touchstart click', '.vbs-comment-delete', function(event) {
                event.preventDefault();
                VB.helper.collapseNewsBlock();
                VB.comments.deleteHandler($(this));
            });

            // DELETE CONFIRM
            VB.helper.find('.vbs-comments-block').on('touchstart click', '.vbs-comment-delete-btn-wrapper .vbs-cancel-btn', function(event) {
                event.preventDefault();
                if (typeof VB.settings.webHooks.commentDelete != 'undefined') {
                    VB.settings.webHooks.commentDelete();
                    return false;
                }
                VB.comments.deleteConfirmHandler($(this));
            });

            // Evernote
            VB.helper.find('.vbs-section-btns').on('touchstart click', '.vbs-evernote-btn', function(event) {
                event.preventDefault();
                if (typeof VB.settings.webHooks.evernote != 'undefined') {
                    VB.settings.webHooks.evernote();
                    return false;
                }
                if (typeof filepicker !== 'undefined') {
                    var evtitle = VB.api.response.metadata !== null && VB.api.response.metadata.response.title !== '' ? VB.api.response.metadata.response.title : 'VoiceBase';
                    filepicker.exportFile(VB.api.getAutoNotesHtmlURL(), {service: 'EVERNOTE', suggestedFilename: evtitle});
                }
            });

            // Edit transcript
            VB.helper.find('.vbs-section-btns').on('touchstart click', '.vbs-edit-btn', function(event) {
                event.preventDefault();
                if(VB.helper.getIsSaving()) {
                    return false;
                }
                if (typeof VB.settings.webHooks.editTranscript != 'undefined') {
                    VB.settings.webHooks.editTranscript();
                    return false;
                }
                VB.view.hideTooltips();
                VB.data.savingSpeakers = $.extend({}, VB.data.speakers);
                VB.helper.find('.vbs-edit-mode-prewrapper').html(VB.templates.parse('vbs-edit-trans-mode', {ourtranscript: VB.helper.editTranscriptText()}));
                $('body').addClass('vbs-no-scroll');

                var $transcriptBlock = $('#' + VB.settings.transcriptBlock);
                $transcriptBlock.wrap('<div id="transcript_placement"></div>');
                $('body').append('<div id="vbs-edit-wrap"  class="' + VB.data.vclass + '"></div>');
                $transcriptBlock.appendTo('#vbs-edit-wrap');

                VB.helper.collapseNewsBlock();
            });

            // Edit transcript exit
            VB.helper.find('.vbs-transcript-block').on('touchstart click', '.vbs-edit-mode-exit', function(event) {
                event.preventDefault();
                if (typeof VB.settings.webHooks.editTranscriptExit != 'undefined') {
                    VB.settings.webHooks.editTranscriptExit();
                    return false;
                }
                VB.data.speakers = VB.data.savingSpeakers;

                $('#' + VB.settings.transcriptBlock).appendTo('#transcript_placement').unwrap();
                $('#vbs-edit-wrap').remove();

                VB.helper.find('.vbs-edit-mode-prewrapper').html("");
                $('body').removeClass('vbs-no-scroll');
            });

            // Edit transcript Save popup
            VB.helper.find('.vbs-transcript-block').on('touchstart click', '.vbs-save-edition-popup-trigger', function(event) {
                event.preventDefault();
                VB.helper.showSaveQuestion();
            });

            // Edit transcript Cancel
            VB.helper.find('.vbs-transcript-block').on('touchstart click', '.vbs-cancel-edition-btn', function(event) {
                event.preventDefault();
                VB.helper.find('.vbs-save-popup-wrapper').fadeOut('fast');
            });

            // Edit transcript Discard Changes
            VB.helper.find('.vbs-transcript-block').on('touchstart click', '.vbs-discard-edition-btn', function(event) {
                event.preventDefault();
                VB.helper.find('.vbs-edit-mode-prewrapper').html(VB.templates.parse('vbs-edit-trans-mode', {ourtranscript: VB.helper.editTranscriptText()}));
            });

            // Edit transcript Save Changes
            VB.helper.find('.vbs-transcript-block').on('touchstart click', '.vbs-save-edition-btn', function(event) {
                event.preventDefault();
                VB.helper.saveTranscript();
            });

            // Print
            $('.vbs-section-btns').on('touchstart click', '.vbs-print-btn', function(event) {
                event.preventDefault();
                if (typeof VB.settings.webHooks.print != 'undefined') {
                    VB.settings.webHooks.print();
                    return false;
                }

                var w = window.open('', '', 'height=' + screen.availHeight + ',width=' + screen.availWidth + ',left=0,top=0');
                w.document.write('<html><head><title></title>');
                w.document.write('</head><body >');

                var $transcript = $('.vbs-transcript-wrapper').clone();
                $transcript.find('.vbs-trans-info').remove();
                w.document.write($transcript.html());
                w.document.write('</body></html>');

                w.document.close();
                w.focus();
                w.print();
                w.close();
            });

            // Order
            $('.vbs-transcript-block').on('touchstart click', '.vbs-order-human-trans a', function(event) {
                if (typeof VB.settings.webHooks.orderTranscript != 'undefined') {
                    var mediaLength = VB.data.duration / 60;
                    VB.settings.webHooks.orderTranscript({
                        apiUrl: VB.settings.apiUrl,
                        version: VB.settings.version,
                        apiKey: VB.settings.apiKey,
                        password: VB.settings.password,
                        mediaId: VB.settings.mediaId,
                        recordName: VB.api.response.metadata.response.title,
                        mediaLengthInMinutes: mediaLength
                    });
                    return false;
                }
            });

            //* News events *//
            if(VB.settings.toggleBlocks && VB.settings.toggleNewsBlock){
                VB.helper.find(".vbs-news-block .vbs-section-title").on('touchstart click', function(e) {
                    e.preventDefault();
                    var $this = $(this);
                    $this.toggleClass('vbs-hidden');
                    var $section_body = $this.parents('.vbs-news-block').find('.vbs-section-body');
                    if ($this.hasClass('vbs-hidden')) {
                        VB.helper.collapseNewsBlock();
                    } else {
                        VB.helper.expandNewsBlock();
                        VB.api.getNews();
                    }
                });
            }


            //* Other Events *//
            $(document).off('touchstart click', '.vbs-reload-overlay,.vbs-white-popup-overlay').on('touchstart click', '.vbs-reload-overlay,.vbs-white-popup-overlay', function(e) {
                e.preventDefault();
                var $this = $(this);
                if($this.hasClass('vbs-white-popup-overlay') && VB.settings.tabView) {
                    return false;
                }
                $this.fadeOut('fast', function() {
                    $this.remove();
                });
                var $target = $(e.target);
                if($target.hasClass('vbs-reload-btn')) {
                    location.reload();
                }
            });

            // Context menu

            if (VB.settings.contextMenu || VB.settings.editKeywords) {
                VB.helper.find(".vbs-record-timeline-wrap").on("contextmenu taphold", function(event) {
                    VB.common.vbmenus(event, 'timeline', this);
                });
                VB.helper.find('.vbs-keywords-wrapper').on("contextmenu taphold", ".vbs-keywords-list-wrapper li a", function(event) {
                    VB.common.vbmenus(event, 'keyword', this);
                });
                VB.helper.find('.vbs-transcript-prewrapper').on("contextmenu taphold", ".vbs-transcript-wrapper span.w", function(event) {
                    VB.common.vbmenus(event, 'transcript', this);
                });
                $(document).off('click.vbs_vbcmenu').on("click.vbs_vbcmenu", function(e) {
                    if(e.which === 1) {
                        $("ul.vbs-vbcmenu").css({'top': '-5000px'});
                    }
                });
            }

            // Edit Events
            VB.helper.find(".vbs-transcript-block").on("contextmenu taphold", '.vbs-edition-block span.vbs-wd', function(event) {
                event.preventDefault();
                VB.common.vbEditMenu(event, this);
            });

            $(document).off('keydown', '.vbs-edition-block').on('keydown', '.vbs-edition-block', function(event) {
                if (event.keyCode == 13) {
                    document.execCommand('insertHTML', false, '<br>');
                }
            });

            $(document).off('touchstart click', '.vbsc-edit-play').on('touchstart click', '.vbsc-edit-play', function(event) {
                event.preventDefault();
                var stime = $(this).attr('data-time');
                VB.PlayerApi.seek(stime);
            });

            $(document).off('touchstart click', '.vbsc-edit-speaker').on('touchstart click', '.vbsc-edit-speaker', function(event) {
                event.preventDefault();
                VB.speakers.createInsertSpeakerDialog($(this));
            });

            $(document).off('touchstart click', '.vbs-select-insert-speaker').on('touchstart click', '.vbs-select-insert-speaker', function(e) {
                e.preventDefault();
                toggleDropdown($(this));
            });

            $(document).off('touchstart click', '.vbs-select-insert-speaker-wrapper .vbs-select-dropdown li').on('touchstart click', '.vbs-select-insert-speaker-wrapper .vbs-select-dropdown li', function(e) {
                e.preventDefault();
                VB.speakers.selectSpeakerInInsertDialog($(this));
            });

            $(document).off('touchstart click', '.vbs-insert-speaker-popup .vbs-cancel-btn').on('touchstart click', '.vbs-insert-speaker-popup .vbs-cancel-btn', function(e) {
                e.preventDefault();
                VB.common.hidePopup($('.vbs-insert-speaker-popup'));
            });

            $(document).off('touchstart click', '.vbs-insert-speaker-popup .vbs-confirm-btn').on('touchstart click', '.vbs-insert-speaker-popup .vbs-confirm-btn', function(e) {
                e.preventDefault();
                var $insertPopup = $('.vbs-insert-speaker-popup');
                var isValid = VB.validator.validate($insertPopup);
                if(isValid) {
                    VB.speakers.insertSpeakerToEditor();
                    VB.common.hidePopup($insertPopup);
                }
            });

            $(document).off('touchstart click', '.vbsc-rename-speaker').on('touchstart click', '.vbsc-rename-speaker', function(event) {
                event.preventDefault();
                VB.speakers.createRenameSpeakerDialog($(this));
            });

            $(document).off('touchstart click', '.vbs-rename-speaker-popup .vbs-cancel-btn').on('touchstart click', '.vbs-rename-speaker-popup .vbs-cancel-btn', function(e) {
                e.preventDefault();
                VB.speakers.enableRenameAllSpeakersInEditor();
                VB.common.hidePopup($('.vbs-rename-speaker-popup'));
            });

            $(document).off('touchstart click', '.vbs-rename-speaker-popup .vbs-confirm-btn').on('touchstart click', '.vbs-rename-speaker-popup .vbs-confirm-btn', function(e) {
                e.preventDefault();
                var $renamePopup = $('.vbs-rename-speaker-popup');
                var isValid = VB.validator.validate($renamePopup);
                if(isValid) {
                    VB.speakers.renameSpeaker();
                    VB.common.hidePopup($renamePopup);
                }
            });

            /*
            * Edit speaker from editor (contenteditable)
            * */
            $(document).off('blur keyup paste', '.vbs-edition-block').on('blur keyup paste', '.vbs-edition-block', function(e) {
                var selection = (window.getSelection) ? window.getSelection() : document.selection;
                if(selection.focusNode && selection.focusNode.parentElement) {
                    var $element = $(selection.focusNode.parentElement);
                    if($element.hasClass('vbs-edit-speaker')) {
                        VB.speakers.renameSpeakerFromEditor($element);
                    }
                }
            });

            if (VB.settings.debug) {
                $(document).off('keydown.vbs_keydown').on('keydown.vbs_keydown', function(e) {
                    var key = e.which || e.keyCode;
                    if (key === 71 && (e.metaKey || e.ctrlKey) && e.altKey) { // ctrl+alt+g
                        VB.helper.debug();
                    }
                });
            }

            // tab events
            if(VB.settings.tabView){
                $(document).off('click touchstart', '.vbs-tabs-links a').on('click touchstart', '.vbs-tabs-links a', function(e){
                    e.preventDefault();
                    var $this = $(this);
                    var linkTarget = $this.attr('data-href');

                    if(!$this.hasClass('vbs-active')){
                        $this.siblings().removeClass('vbs-active');
                        $this.addClass('vbs-active');
                    }

                    $('.vbs-tab').each(function(){
                        $(this).removeClass('vbs-tab-visible');
                    });

                    $(linkTarget).addClass('vbs-tab-visible');
                    return false;
                });
            }

            $(document).off('touchstart click', '.vbs-selected-playlist-item').on('touchstart click', '.vbs-selected-playlist-item', function(e) {
                e.preventDefault();
                var $playlist = $(this).parents('.vbs-playlist');
                $playlist.toggleClass('collapsed');
                if(!$playlist.hasClass('collapsed')) {
                    var index = VB.PlayerApi.getPlaylistItemIndex();
                    var $playlistItem = $playlist.find('[data-playlist-item-index='+ index +']');
                    $playlist.animate({scrollTop: $playlistItem.offset().top - $playlistItem.parent().offset().top});
                }
            });

            $(document).off('touchstart click', '.vbs-playlist-item').on('touchstart click', '.vbs-playlist-item', function(e) {
                e.preventDefault();
                var index = $(this).attr('data-playlist-item-index');
                var playlist = $(this).parents('.vbs-playlist');
                playlist.addClass('collapsed');
                VB.PlayerApi.setPlaylistItem(index);
            });

            $(document).off('touchstart click', '.vbs-cancel-search').on('touchstart click', '.vbs-cancel-search', function(e) {
                e.preventDefault();
                if(VB.data.searchWorker) {
                    VB.data.searchWorker.terminate();
                }
                VB.helper.clearMessage();
                VB.helper.hideLoader();
                VB.data.clicker = false;
                VB.PlayerApi.play();
            });

        }

    };

    return VB;
})(voiceBase, jQuery);
/*
* VB.helper
* */
voiceBase = (function(VB, $) {
    "use strict";

    VB.helper = {
        isRand: !1,
        randConstant: null,
        css: '',
        randId: function() {
            if (!this.isRand && !this.randConstant) {
                this.isRand = !0;
                this.randConstant = this.rand();
            }
            return this.randConstant;
        },
        rand: function() {
            return Math.ceil(Math.random() * 1e9);
        },
        loadCss: function(filename) {
            if (this.css.indexOf("[" + filename + "]") == -1) {
                this.css += "[" + filename + "]";
                var fileref = document.createElement("link");
                fileref.setAttribute("rel", "stylesheet");
                fileref.setAttribute("type", "text/css");
                fileref.setAttribute("href", filename);
                if (typeof fileref != "undefined") {
                    document.getElementsByTagName("head")[0].appendChild(fileref);
                }
            }
        },
        find: function(param) {
            return $('.' + VB.data.vclass + ' ' + param);
        },
        findc: function(param) {
            return $('.' + VB.data.vclass + '' + param);
        },
        showLoader: function() {
            var $timeline_wrap = VB.helper.find('.vbs-record-timeline-wrap');
            if (VB.settings.animation && $timeline_wrap.has('.vbs-loader')) {
                $timeline_wrap.prepend('<div class="vbs-loader"></div>');
            }
        },
        hideLoader: function() {
            VB.helper.find('.vbs-record-timeline-wrap .vbs-loader').fadeOut('fast', function() {
                $(this).remove();
            });
        },
        removeBold: function() {
            VB.helper.find('.vbs-keywords-list-wrapper .vbs-keywords-list-tab li a.bold').removeClass('bold');
        },
        termFor: function(string, type) {
            var ar = string.split(',');
            var nar = [];
            for (var i in ar) {
                if (ar[i].match(/\s+/g)) {
                    nar.push('"' + ar[i] + '"');
                } else {
                    nar.push(ar[i]);
                }
            }
            if (typeof type !== 'undefined' && type == 'url') {
                return nar.join(' ');
            }
            return nar;
        },
        parseTime: function(seconds) {
            var hours = Math.floor(seconds / 3600) + "";
            var minutes = Math.floor(seconds % 3600 / 60) + "";
            var _seconds = Math.floor(seconds % 3600 % 60) + "";
            return (hours.padLeft(2) + ":" + minutes.padLeft(2) + ":" + _seconds.padLeft(2));
        },
        getSearchWordsArray: function() {
            var words = VB.helper.find('#vbs-voice_search_txt').val().trim();
            words = VB.helper.matchWords(words);
            words = (words) ? words : [];
            return words;
        },
        matchWords: function(text){
            text = VB.helper.checkQuotes(text);
            text = text.replace(/""/g, '"');
            return text.match(/("[^"]+")+|[\S]+/ig); // 0-9_.,'-
        },
        checkQuotes: function(text){
            // search redundant quotes
            var quotes_pos = [];
            var search_end = false;
            var pos = -1;
            while(!search_end) {
                pos = text.indexOf('"', pos + 1);
                if(pos !== -1) {
                    quotes_pos.push(pos);
                }
                else {
                    search_end = true;
                }
            }

            if(quotes_pos.length % 2 !== 0) {
                // we have a redundant quote.
                if(quotes_pos.length === 1) {
                    text += '"';
                }
                else if(quotes_pos.length >= 3) {
                    // We must add a quote after the second last quote
                    var second_last_quote_pos = quotes_pos[quotes_pos.length - 2];
                    var text_before_second_last_quote =  text.substring(0, second_last_quote_pos + 1);
                    var text_after_second_last_quote =  text.substring(second_last_quote_pos + 1);
                    text = text_before_second_last_quote + ' "' + text_after_second_last_quote;
                }
            }
            return text;
        },
        keywordsAutoTopicsColumns: function(col) {
            col = typeof col !== 'undefined' ? col : 5;
            var $kw = VB.helper.find('.vbs-keywords-list-wrapper');
            var _this = this;
            if (col === 0)
                return false;
            $kw.removeClass(_this.getColumnClassByNumber(col + 1)).addClass(_this.getColumnClassByNumber(col));
            $kw.find('ul.vbs-active li').each(function() {
                if ($(this).height() > 18) {
                    _this.keywordsAutoTopicsColumns(col - 1);
                    return false;
                }
            });
        },
        keywordsAutoColumns: function(col) {
            col = typeof col !== 'undefined' ? col : 5;
            var $kw = VB.helper.find('.vbs-keywords-list-wrapper');
            var _this = this;
            if (col === 0) {
                $kw.removeClass('vbs-auto-columns');
                return false;
            } else {
                $kw.addClass('vbs-auto-columns');
            }
            $kw.removeClass(this.getColumnClassByNumber(col + 1)).
                addClass(this.getColumnClassByNumber(col));
            $kw.find('ul li').each(function() {
                if ($(this).height() > 18) {
                    _this.keywordsAutoColumns(col - 1);
                    return false;
                }
            });
            $kw.removeClass('vbs-auto-columns');
        },
        getColumnClassByNumber: function(number) {
            switch (number) {
                case 1:
                    return 'vbs-one-col';
                case 2:
                    return 'vbs-two-col';
                case 3:
                    return 'vbs-three-col';
                case 4:
                    return 'vbs-four-col';
                case 5:
                    return 'vbs-five-col';
                default:
                    return '';
            }
        },
        filterKeywords: function(speaker_key) {
            VB.settings.filterSpeaker = speaker_key;
            var $list_li = VB.helper.find('.vbs-topics .vbs-topics-list li');
            $list_li.removeClass('vbs-disabled');
            $list_li.find('a').each(function() {
                var $thistopic = $(this);
                if (speaker_key == 'all') {
//                    $thistopic.parent().show();
                } else {
                    if ($thistopic.is('[speakers*="' + speaker_key + '"]')) {
//                        $thistopic.parent().show();
                    } else {
                        $thistopic.parent().addClass('vbs-disabled');
                    }
                    $thistopic.attr('t', $thistopic.attr('data-spt-' + speaker_key));
                }
            });

            VB.helper.find('.vbs-keywords-list-wrapper .vbs-keywords-list-tab li a').each(function() {
                var $this = $(this);
                $this.parent().removeClass('key');
                if (speaker_key == 'all') {
                    $this.parent().addClass('key').show();
                    var st = [];
                    for (var sp in VB.data.speakers) {
                        if (typeof $this.attr('data-spt-' + sp) != 'undefined') {
                            st.push($this.attr('data-spt-' + sp));
                        }
                    }
                    $this.attr('t', st.join());
                } else {
                    if ($this.is('[speakers*="' + speaker_key + '"]')) {
                        $this.parent().addClass('key').show();
                    } else {
                        $this.parent().hide();
                    }
                    $this.attr('t', $this.attr('data-spt-' + speaker_key));
                }
            });
            var active = VB.helper.find('.vbs-topics .vbs-topics-list li.vbs-active');
            if(active.is(':hidden')) {
                var li = VB.helper.find('.vbs-topics-list li.vbs-all-topics');
                li.parent().find('.vbs-active').removeClass('vbs-active');
                li.addClass('vbs-active');
                var catName = li.find('a').text().trim();
                VB.helper.find(".vbs-keywords-list-tab ul").removeClass('vbs-active');
                VB.helper.find('.vbs-keywords-list-tab ul[tid="' + catName + '"]').addClass('vbs-active');
            }

            if (VB.helper.find('#vbs-voice_search_txt').val().trim().length > 0) {
                VB.helper.find('.vbs-markers').html('');
                VB.helper.find(".vbs-next-action-btn:not([class='vbs-next-notactive'])").addClass('vbs-next-notactive');
                VB.api.getSearch([VB.helper.find('#vbs-voice_search_txt').val().trim()], false);
            }
            if(VB.settings.keywordsCounter) {
                VB.helper.find('.vbs-keywords-list-tab li a').each(function() {
                    var $this = $(this);
                    var t = $this.attr('t');
                    $this.parent().find('span').html('(' + t.split(",").length + ')');
                });
            }
        },
        setUtterance: function(utterances){
            var marker_sem = '';
            var checkbox_sem = '';
            var utterances_length = utterances.length;
            for (var i = 0; i < utterances_length; i++) {
                var utt = utterances[i];
                var segments = utt.segments;
                var seg_length = segments.length;
                for (var j = 0; j < seg_length; j++) {
                    var segment = segments[j];
                    var startPosition = VB.PlayerApi.getOffset(segment.s);
                    var endPosition = VB.PlayerApi.getOffset(segment.e);
                    var segment_width = endPosition - startPosition;
                    var timeLabel = VB.helper.parseTime(segment.s) + ' to ' + VB.helper.parseTime(segment.e);

                    var tooltip_chars_max_length = 65;
                    var title = segment.u.substr(0, tooltip_chars_max_length-3) + "..."; // multiline ellipsis

                    marker_sem += VB.templates.parse('utteranceMarker', {
                        startTime: segment.s,
                        rownum: i + 1,
                        width: segment_width,
                        position: startPosition,
                        title: title,
                        time: timeLabel
                    });
                }

                checkbox_sem += VB.templates.parse('utteranceCheckBox', {
                    rownum: i + 1,
                    title: utt.name,
                    segmentsCount: segments.length
                });
            }
            VB.helper.find('.vbs-utterance-markers').empty().append(marker_sem);
            if(checkbox_sem){
                var utteranceBlock = VB.templates.get('utteranceBlock');
                $("#" + VB.settings.controlsBlock).after($(utteranceBlock));
                $('.vbs-utterance-block').addClass(VB.data.vclass).find('ul').append(checkbox_sem);
            }
        },
        downloadFile: function(type) {
            var params = VB.api.parameters;
            params.action = 'getTranscript';
            params.content = true;
            params.format = type;
            var url = VB.settings.apiUrl + '?' + VB.common.getStringFromObject(params);
            window.location = url;
        },
        getNewUrl: function(urlparams) {
            var query = window.location.search.substring(1),
                vars = query.split('&'),
                opt = {},
                np = [];
            if (query.length > 0) {
                var vars_length = vars.length;
                for (var i = 0; i < vars_length; i++) {
                    var pair = vars[i].split('=');
                    if (pair[0] != 'vbt' && pair[0] != 'vbs') {
                        opt[pair[0]] = pair[1];
                        for (var params in urlparams) {
                            if (decodeURIComponent(pair[0]) == params) {
                                opt[pair[0]] = urlparams[params];
                            }
                        }
                    }
                }
            }
            for (var sh in VB.settings.shareParams) {
                if (typeof opt[sh] == 'undefined') {
                    opt[sh] = VB.settings.shareParams[sh];
                }
            }
            for (var key in urlparams) {
                if (typeof opt[key] == 'undefined') {
                    opt[key] = urlparams[key];
                }
            }
            for (var p in opt) {
                np.push(p + "=" + opt[p]);
            }
            return VB.settings.shareUrl ? VB.settings.shareUrl + '?' + np.join('&') : window.location.origin + window.location.pathname + '?' + np.join('&');
        },
        checkAutoStart: function() {
            var query = window.location.search.substring(1);
            var urlparams = ["vbt", "vbs"];
            var vars = query.split('&');
            var rt = {};
            var vars_length = vars.length;
            for (var i = 0; i < vars_length; i++) {
                var pair = vars[i].split('=');
                for (var params in urlparams) {
                    if (decodeURIComponent(pair[0]) == urlparams[params]) {
                        rt[urlparams[params]] = pair[1];
                    }
                }
            }
            VB.data.startParams = rt;
            return false;
        },
        waitReady: function() {
            if (VB.api.ready.keywords && VB.api.ready.metadata && VB.api.ready.transcript && VB.api.ready.comments) {

                clearInterval(VB.data.waiter);
                VB.data.waiter = null;
                VB.helper.checkErrors();
                VB.speakers.speakersWidget();
                if (Object.keys(VB.data.speakers).length > 1) {
                    VB.speakers.speakerFilterWidget(VB.data.speakers, 'all');
                }

                VB.comments.commentsTWidget();
                if (VB.settings.editKeywords) {
                    $(".vbs-keywords-block .vbs-topics").addClass('vbs-edit-topics');
                }
                if (!$('.vbs-media-block').hasClass('.less-600px')) {
                    $('.vbs-record-player .vbs-time-name-wrapper-narrow').css({'opacity': 0});
                }
                if(VB.settings.playerType === 'jwplayer' && VB.api.response.metadata !== null && !VB.settings.hasPlaylist) {
                    if(VB.helper.isApi2_0() && VB.settings.stream) {
                        var streamUrl = VB.settings.apiUrl + VB.settings.mediaId + '/streams/original?' + VB.settings.token;
                        VB.PlayerApi.loadFile(streamUrl);
                    }
                    else {
                        if (VB.PlayerApi.getRenderingMode() != "html5" && VB.settings.stream == 'rtmp') {
                            var rtmp = VB.api.response.metadata.response.rtmpUrl + "" + VB.api.response.metadata.response.rtmpFile;
                            VB.PlayerApi.loadFile(rtmp);
                        } else
                        if (VB.settings.stream === 'http' || VB.settings.stream === true) {
                            VB.PlayerApi.loadFile(VB.api.response.metadata.response.streamUrl);
                        }
                    }
                }
                if (VB.data.startParams !== false) {
                    this.autoStart(VB.data.startParams);
                }
                if(VB.api.response.keywords && VB.api.response.keywords.utterances){
                    VB.helper.setUtterance(VB.api.response.keywords.utterances);
                }

                VB.view.checkEmptyHeadersForTabs();
                VB.view.tooltips();
            }
            return false;
        },
        waitReadyAfterSave: function() {
            if (VB.api.ready.keywords && VB.api.ready.metadata && VB.api.ready.transcript && VB.api.ready.comments) {
                clearTimeout(VB.data.waiterSave);
                VB.data.waiterSave = null;
                if(VB.settings.modalSave) {
                    var $popup_wrap = VB.helper.find('.vbs-save-popup-wrapper');
                    $popup_wrap.find('.vbs-save-loading-popup').fadeOut('fast');
                    $popup_wrap.find('.vbs-save-done-popup').fadeIn('fast');
                }
                else {
                    VB.helper.clearSavingMessages();
                    $('#' + VB.settings.controlsBlock).after(VB.templates.get('successSavingMessage'));
                    setTimeout(function() {
                        VB.helper.clearSavingMessages();
                    }, 3000);
                }

                setTimeout(function(){
                    if(VB.settings.modalSave) {
                        VB.helper.exitEditFullscreen();
                    }
                    VB.helper.checkErrors();
                    VB.speakers.speakersWidget();
                    VB.comments.commentsTWidget();
                    VB.view.tooltips();
                }, 800);
            }
            return false;
        },
        exitEditFullscreen: function() {
            $('#' + VB.settings.transcriptBlock).appendTo('#transcript_placement').unwrap();
            VB.helper.find('.vbs-edit-mode-prewrapper').html("");
            $('body').removeClass('vbs-no-scroll');
        },
        autoStart: function(params) {
            var played;
            if (typeof params['vbs'] != 'undefined') {
                VB.helper.find('.vbs-markers').html('');
                VB.helper.find(".vbs-next-action-btn:not([class='vbs-next-notactive'])").addClass('vbs-next-notactive');
                var words = decodeURI(params['vbs']).trim();
                words = VB.helper.matchWords(words);
                words = words ? words : [];
                var stringWords = words.join(' ');
                VB.helper.find('#vbs-voice_search_txt').val(stringWords).data('data-val', stringWords).change();
                if (words.length) {
                    VB.view.searchWordWidget(words);
                }
                var autoStart = true;
                if (typeof params['vbt'] != 'undefined') {
                    autoStart = false;
                    played = params['vbt'];
                    VB.PlayerApi.seek(played);
                }
                VB.api.getSearch(words, autoStart);
                return false;
            }
            else if (typeof params['vbt'] != 'undefined') {
                played = params['vbt'];
                VB.PlayerApi.seek(played);
            }
        },
        moveToNextMarker: function (markersContainer) {
            var lastmarker = true;
            var timesAr = [];
            var $links = markersContainer.find('a');
            $links.each(function() {
                timesAr.push(parseFloat($(this).attr('stime')));
            });
            timesAr.sort(function(a, b) {
                return parseInt(a, 10) - parseInt(b, 10);
            });
            for (var eltm in timesAr) {
                if (timesAr[eltm] > VB.PlayerApi.getPosition() + 1) {
                    VB.PlayerApi.seek(timesAr[eltm]);
                    lastmarker = false;
                    return false;
                }
            }
            // Loop markers
            if (lastmarker && $links.length) {
                VB.PlayerApi.seek(timesAr[0]);
            }
        },
        moveToPrevMarker: function (markersContainer) {
            var lastmarker = true;
            var timesAr = [];
            var $links = markersContainer.find('a');
            $links.each(function() {
                timesAr.push(parseFloat($(this).attr('stime')));
            });
            timesAr.sort(function(a, b) {
                return parseInt(b, 10) - parseInt(a, 10);
            });
            for (var eltm in timesAr) {
                if (timesAr[eltm] < VB.PlayerApi.getPosition() - 1) {
                    VB.PlayerApi.seek(timesAr[eltm]);
                    lastmarker = false;
                    return false;
                }
            }
            // Loop markers
            if (lastmarker && $links.length) {
                VB.PlayerApi.seek(timesAr[0]);
            }
        },
        startScroll: function() {
            var $marquee = VB.helper.find("#vbs-search-string .vbs-marquee");
            if($marquee.is(':visible')) {
                var $search_word_widget = $marquee.find(".vbs-search-word-widget");
                $search_word_widget.stop(true).css("left", 0);
                var words_width = 0;
                VB.helper.find(".vbs-word").width(function(i, w) {
                    words_width += w;
                });
                if (words_width > $marquee.width()) {
                    $search_word_widget.width(words_width);
                    VB.helper.scrollStringLeft();
                }
                else{
                    $search_word_widget.width($('#vbs-search-string').width());
                }
            }
        },
        scrollStringLeft: function() {
            var words_count = VB.helper.find(".vbs-word").length,
                words_animate_duration = words_count * 1200;
            var $marquee = VB.helper.find("#vbs-search-string .vbs-marquee");
            var $search_word_widget = $marquee.find(".vbs-search-word-widget");
            $search_word_widget.animate({"left": ($marquee.width()) - ($search_word_widget.width())}, {
                    duration: words_animate_duration,
                    complete: function() {
                        VB.helper.scrollStringRight();
                    }
                }
            );
        },
        scrollStringRight: function() {
            var words_count = VB.helper.find(".vbs-word").length,
                words_animate_duration = words_count * 1200;
            VB.helper.find("#vbs-search-string .vbs-marquee .vbs-search-word-widget").animate({"left": "1"}, {
                    duration: words_animate_duration,
                    complete: function() {
                        VB.helper.scrollStringLeft();
                    }
                }
            );
        },
        getMaxKeywordHeight: function() {
            var vTopics = VB.helper.find('.vbs-topics-list').height();
            var vKeywords = VB.helper.find('.vbs-keywords-list-tab ul.vbs-active').height() + 10;
            return vTopics > vKeywords ? vTopics : vKeywords;
        },
        getKeywordHeight: function() {
            var vTopics = $('.vbs-topics').height();
            var vKeywords = $('.vbs-keywords-list-tab').height() + 10;
            return vTopics > vKeywords ? vTopics : vKeywords;
        },
        checkKeyword: function(terms, times, hits) {
            var foradd = [];
            VB.helper.find('#vbs-search-string .vbs-search-word-widget .vbs-word a.vbs-add-search-word').remove();
            terms = VB.common.uniqueArray(terms);
            for (var ti in terms) {
                var term = VB.helper.replaceTrimAndLower(terms[ti]);
                if (!VB.common.findTermInArray(VB.data.keywords, term)) {
                    var ntTimes = [];
                    for (var hit in hits) {
                        if(hits[hit].term == term){
                            hits[hit].hits.map(function(hit) {
                                ntTimes = ntTimes.concat(hit.time);
                            });
                        }
                    }
                    if(ntTimes.length > 0) {
                        var plus = $('<a href="#add" class="vbs-add-search-word" title="Add to all topics"></a>');
                        plus.data('data-kwa', terms[ti]);
                        plus.data('data-kwt', ntTimes.join(','));
                        VB.helper.find('#vbs-search-string .vbs-search-word-widget .vbs-word').each(function(){
                            var word = $(this).find('.vbs-search_word').text();
                            if(word === terms[ti]) {
                                $(this).append(plus);
                            }
                        });
                    }
                }
            }
        },
        localSearch: function(elem, terms) {
            if(terms.length > 1) {
                VB.api.getSearch(terms);
                return false;
            }
            var allTimes = [];
            var colors = [];
            VB.helper.find('.vbs-widget .vbs-word').each(function(key, marker) {
                var $marker = $(marker);
                var word = $marker.find('.vbs-search_word').text().replace(/"/g, '').toLowerCase();
                colors[word] = $marker.find('.vbs-marker').css('border-bottom-color');
            });

            var times = [];
            var timesArray = elem.attr('t').split(",");
            var phrases = [];

            timesArray.map(function(time) {
                if (VB.speakers.filterResultForSpeaker(time)) {
                    times = times.concat(time);
                    phrases = phrases.concat(VB.helper.getPhraseByTime(time-1000, time + 1500, terms));
                }
            });
            var wrapper = VB.helper.find('.vbs-record-timeline-wrap');

            VB.data.markersStyles = {
                markersWrapper: wrapper,
                markersContainer: wrapper.find('.vbs-markers'),
                markersWrapperWidth: wrapper.width()
            };

            var markers_string = VB.view.markerWidget(times, phrases, colors[terms]);
            VB.data.markersStyles.markersContainer.append(markers_string);

            allTimes = allTimes.concat(times);
            allTimes.sort(function(a, b) {
                return a - b;
            });
            VB.PlayerApi.seek(allTimes[0]);
        },
        getPhraseByTime: function(startTime, endTime, term) {
            var phrase = '';
            var $words = VB.helper.find('.vbs-transcript-wrapper > span > span:wordtime(' + (startTime * 1000) + ',' + (endTime * 1000) + ')');
            phrase = VB.helper.getTextFromElems($words);
            if(typeof Fuse != 'undefined') {
                var wordsArray = phrase.split(' ');
                var termLength = term.split(' ').length;
                var wordCollocationsArray = [];
                if(termLength > 1) {
                    for (var i = 0; i < wordsArray.length; i++) {
                        var _w = '';
                        for (var j = 0; j < termLength; j++) {
                            if(wordsArray[i + j]) {
                                _w += wordsArray[i + j] + ' ';
                            }
                        }
                        wordCollocationsArray.push(_w.trim());
                    }
                }
                else {
                    wordCollocationsArray = wordsArray;
                }
                var fuseModel = new Fuse(wordCollocationsArray, {threshold: 0.4});
                var fuse_result = fuseModel.search(term);
                var result = (fuse_result.length > 0) ? fuse_result[0] : null;
                if(result !== null) {
                    phrase = '';
                    for (var k = 0; k < wordCollocationsArray.length; k++) {
                        var w = wordCollocationsArray[k];
                        w = w.split(' ')[0];
                        if(k >= result && k <= result + termLength - 1) {
                            w = '<b>' + w + '</b>';
                        }
                        phrase += w + ' ';
                    }
                }
            }
            return phrase;
        },
        getTextFromElems: function($elems) {
            var text = '';
            $elems.each(function() {
                if(!$(this).attr('m')) { // if no speaker elem
                    var thistext = $(this).text();
                    thistext = VB.helper.replaceAndTrim(thistext);
                    if (thistext !== '' && !thistext.match(/\w+/g)) {
                        text += thistext;
                    }
                    else if(thistext !== '' ) {
                        text += (text === '') ? thistext : ' ' + thistext;
                    }
                }
            });
            return text;
        },
        highlight: function(position) {
            var curtime = Math.round(position);
            if (curtime == 1) {
                curtime = 0;
            }
            var nc = Math.floor(curtime / VB.settings.transcriptHighlight);
            curtime = nc * VB.settings.transcriptHighlight;
            var $transcript_block = VB.helper.find('.vbs-transcript-block');
            var $transcript_wrapper = $transcript_block.find('.vbs-transcript-wrapper');
            var $transcript_prewrapper = $transcript_block.find('.vbs-transcript-prewrapper');

            $transcript_wrapper.children('span').removeClass('vbs-hl');
            $transcript_wrapper.children('span:wordtime(' + curtime + ',' + (curtime + VB.settings.transcriptHighlight - 1) + ')').addClass('vbs-hl');
            var spanhl = $transcript_wrapper.children('span.vbs-hl').length ? $transcript_wrapper.children('span.vbs-hl') : false;
            var transcripttext = $transcript_prewrapper.length ? $transcript_prewrapper : false;
            if (spanhl && transcripttext) {
                $transcript_prewrapper.not('.vbs-t-hover').stop(true, true).animate({
                    scrollTop: spanhl.offset().top - transcripttext.offset().top + transcripttext.scrollTop() - (transcripttext.height() - 20) / 2
                }, 500);
            }
            if ($('body').hasClass('vbs-readermode') && $transcript_prewrapper.not('.vbs-t-hover').length) {
                transcripttext = $transcript_block.length ? $transcript_block : false;
                if (spanhl && transcripttext) {
                    $transcript_block.stop(true, true).animate({
                        scrollTop: spanhl.offset().top - transcripttext.offset().top + transcripttext.scrollTop() - (transcripttext.height() - 20) / 2
                    }, 500);
                }
            }
        },
        track: function(event, args){
            args = typeof args != 'undefined' ? args : false;
            if (typeof ga !== 'undefined' && VB.settings.trackEvents) {
                switch (event) {
                    case ('play'):
                        ga('send', 'event', VB.settings.mediaId, 'Play', VB.PlayerApi.getPosition());
                        return true;
                    case ('pause'):
                        ga('send', 'event', VB.settings.mediaId, 'Pause', VB.PlayerApi.getPosition());
                        return true;
                    case ('seek'):
                        ga('send', 'event', VB.settings.mediaId, 'Seek', args);
                        return true;
                    case ('keyword'):
                        ga('send', 'event', VB.settings.mediaId, 'Keyword', args);
                        return true;
                    case ('transcript'):
                        ga('send', 'event', VB.settings.mediaId, 'Transcript', args);
                        return true;
                    default:
                        return false;
                }
            }
            return false;
        },
        editTranscriptText: function(){
            var dt = VB.api.response.transcript.transcript,
                transpart = '',
                lt = 0,
                last = 0;
            var dt_length = dt.length;
            for (var i = 0; i < dt_length; i++) {
                var val = dt[i];
                if (i === 0) {
                    transpart += '<span t="' + 0 + '">';
                }
                for (var k = 2; k <= 10; k++) {
                    if (Math.floor(val.s / 1000) >= (last + VB.settings.transcriptHighlight * k)) {
                        last += VB.settings.transcriptHighlight * k;
                        transpart += '<span t="' + last + '"></span>';
                    }
                }
                if (Math.floor(val.s / 1000) >= (last + VB.settings.transcriptHighlight)) {
                    last += VB.settings.transcriptHighlight;
                    transpart += '</span><span t="' + last + '">';
                }
                lt += val.s;

                var sptag = VB.speakers.createSpeakerAttr(val);

                var word = VB.helper.replaceN(val.w);
                transpart += val.w.match(/\w+/g) ? '<span class="w vbs-wd ' + (sptag.length ? 'vbs-edit-speaker':'') + '" t="' + val.s + '" ' + sptag + '> ' + word + '</span>' : '<span class="vbs-wd" t="' + val.s + '" ' + sptag + '>' + word + '</span>';
            }
            transpart += '</span>';
            return transpart;
        },
        isTurn: function(turnProperty){
            return typeof turnProperty !== "undefined" && turnProperty == "turn";
        },
        getClearWordFromTranscript: function(word){
            return VB.helper.replaceAndTrim(word).replace(/:$/, "");
        },
        showSaveQuestion: function() {
            var countSpeakersWords = $('.vbs-edit-speaker').length;
            var countEditWords = VB.helper.find('.vbs-edition-block').find('.w:not(".vbs-edit-speaker")').length;
            var countWords = $('.vbs-transcript-prewrapper').find('.w').length - countSpeakersWords;
            var $popup = $('.vbs-save-popup');
            $popup.removeClass('vbs-long-edit vbs-short-edit');
            if(countEditWords > countWords && countEditWords > countWords / 5) {
                $popup.addClass('vbs-long-edit');
            }
            else if(countWords > countEditWords && countWords / 5 > countEditWords) {
                $popup.addClass('vbs-short-edit');
            }
            VB.helper.find('.vbs-save-popup-wrapper').fadeIn('fast');
        },
        saveTranscript: function() {
            var html = VB.helper.find('.vbs-edition-block').html();
            html = html.replace(/<br\s*[\/]?>/gi, "\n");
            html = html.replace(/\\n/, "\n");
            var div = document.createElement("div");
            div.innerHTML = html;
            var content = div.textContent || div.innerText || "";
            VB.api.saveTrancript(content.trim());

            var $save_popup_wrapper = VB.helper.find('.vbs-save-popup-wrapper');
            if(VB.settings.modalSave) {
                $save_popup_wrapper.find('.vbs-save-popup').fadeOut('fast');
                $save_popup_wrapper.find('.vbs-save-loading-popup').fadeIn('fast');
            }
            else {
                $save_popup_wrapper.fadeOut('fast');
                VB.helper.exitEditFullscreen();
            }
        },
        saveTranscriptComplete: function() {
            VB.helper.setIsSaving(false);
            VB.view.initAfterSaveTranscript();
            VB.data.waiterSave = setInterval(function() {
                if(VB.data.waiterSave) {
                    VB.helper.waitReadyAfterSave();
                }
            }, 100);
        },
        saveTranscriptError: function(message) {
            VB.helper.setIsSaving(false);
            if(VB.settings.modalSave) {
                var $popup_wrap = VB.helper.find('.vbs-save-popup-wrapper');
                $popup_wrap.find('.vbs-save-popup').show();
                $popup_wrap.find('.vbs-save-loading-popup').fadeOut('fast');
                $popup_wrap.fadeOut('fast');
                var errorTemplate = VB.templates.parse('abstractErrorPopup', {
                    errorTitle: 'Could not save transcript',
                    errorText: message
                });
                $('.vbsp-' + VB.helper.randId() + '.vbs-content').append(errorTemplate);
            }
            else {
                VB.helper.clearSavingMessages();
                var $errorMessage = VB.templates.parse('textErrorMessage', {
                    errorText: message
                });
                $('#' + VB.settings.controlsBlock).after($errorMessage);
            }
        },
        setIsSaving: function(val) {
            VB.data.isSaving = val;
            if(!VB.settings.modalSave) {
                if(val) {
                    $('.vbs-edit-btn').addClass('vbs-disable-button');
                    VB.helper.clearSavingMessages();
                    $('#' + VB.settings.controlsBlock).after(VB.templates.get('savingMessage'));
                }
                else {
                    $('.vbs-edit-btn').removeClass('vbs-disable-button');
                }
            }
        },
        clearSavingMessages: function() {
            $('.vbs-saving').remove();
            $('.vbs-success-saving').remove();
            $('.vbs-text-error-message').remove();
        },
        getIsSaving: function() {
            return VB.data.isSaving;
        },
        adjustMediaTime: function(){
            var $media_block = VB.helper.find('.vbs-media-block');
            var mediaTitle = $media_block.find('.vbs-section-title');
            var mediaBtns = $media_block.find('.vbs-section-btns');
            var mediaTitleRightCoord = mediaTitle.offset().left + mediaTitle.width();
            var mediaBtnsLeftCoord = mediaBtns.offset().left;

            if(mediaTitleRightCoord >= mediaBtnsLeftCoord){
                mediaTitle.find('.vbs-voice-name').hide();
                mediaTitle = $media_block.find('.vbs-section-title');
                mediaBtns = $media_block.find('.vbs-section-btns');
                mediaTitleRightCoord = mediaTitle.offset().left + mediaTitle.width();
                mediaBtnsLeftCoord = mediaBtns.offset().left;

                if(mediaTitleRightCoord >= mediaBtnsLeftCoord){
                    mediaTitle.find('.vbs-time').hide();
                    if ($media_block.hasClass('vbs-video')){
                        var time = VB.helper.parseTime(VB.data.duration);
                        VB.helper.findc('.vbs-player-wrapper').append('<span class="vbs-time vbs-time-in-player"><span class="vbs-ctime">00:00:00</span> / <span class="vbs-ftime">' + time + '</span></span>');
                    }
                }
            }
        },
        checkErrors: function(){
            if(!VB.settings.modalErrors) {
                if (VB.api.errors.processing || VB.api.errors.failure) {
                    var errorText = 'File not indexed. Search, Keywords & Transcript are unavailable for this recording.';
                    if(VB.api.errors.processing) {
                        errorText = 'Could not load recording data, indexing file may not be complete. If reload does not solve problem contact support for assistance';
                    }
                    var $errorMessage = VB.templates.parse('textErrorMessage', {
                        errorText: errorText
                    });
                    $('#' + VB.settings.controlsBlock).after($errorMessage);
                }
            }
            else {
                var $content_block = $('.vbsp-' + VB.helper.randId() + '.vbs-content');
                if (VB.api.errors.processing) {
                    $content_block.append(VB.templates.get('reloadOverlayCredentials'));
                }
                else if(VB.api.errors.failure){
                    if(!VB.settings.tabView) {
                        $content_block.append(VB.templates.get('errorPopup'));
                    }
                    else {
                        $content_block.append(VB.templates.parse('abstractAlertPopup', {
                            errorTitle: 'File has not finishing processing yet',
                            errorText: 'Search, keywords, and transcript for this file are not available. If reloading does not solve the problem, please contact support for assistance.'
                        }));
                    }
                    var $bigErrorPopup = $content_block.find('.vbs-big-error-popup');
                    var bigErrorPopupHeight = parseInt($bigErrorPopup.css('height'));
                    $bigErrorPopup.css('marginTop', -bigErrorPopupHeight / 2);
                }
            }
        },
        debug: function() {
            var pstreamUrl = 'inited';
            if (VB.settings.stream == "rtmp") {
                pstreamUrl = VB.api.response.metadata.response.rtmpUrl + VB.api.response.metadata.response.rtmpFile;
            } else if (VB.settings.stream == "http" || VB.settings.stream === true) {
                pstreamUrl = VB.api.response.metadata.response.streamUrl;
            }

            var response = {
                type: VB.settings.playerType,
                mode: VB.PlayerApi.getRenderingMode(),
                inited: VB.instances.length,
                isStream: VB.settings.stream,
                streamUrl: pstreamUrl,
                mediaID: VB.settings.mediaId ? VB.settings.mediaId : VB.settings.externalId,
                statusMetaData: VB.api.response.metadata && VB.api.response.metadata.requestStatus ? VB.api.response.metadata.requestStatus : false,
                statusKeyword: VB.api.response.keywords && VB.api.response.keywords.requestStatus ? VB.api.response.keywords.requestStatus : false,
                statusTranscript: VB.api.response.transcript && VB.api.response.transcript.requestStatus ? VB.api.response.transcript.requestStatus : false,
                statusTranscriptFileStatus: VB.api.response.transcript && VB.api.response.transcript.fileStatus ? VB.api.response.transcript.fileStatus : false,
                statusComments: VB.api.response.comments && VB.api.response.comments.requestStatus ? VB.api.response.comments.requestStatus : false,
                browserAppVersion: navigator.appVersion,
                browserUserAgent: navigator.userAgent,
                browserPlatform: navigator.platform,
                browserUserLanguage: navigator.userLanguage,
                url: window.location.href
            };

            // send logs to loggly.com
            if(typeof _LTracker != 'undefined'){
                _LTracker.push(response);
            }

            var $logger = VB.helper.find('.vbs-logger');
            if($logger.length > 0){
                $logger.remove();
            }
            else{
                VB.helper.find('.vbs-record-player').after(VB.templates.parse('loggerBlock', {response: JSON.stringify(response)}));
                var $textarea = VB.helper.find('.vbs-logger textarea');
                $textarea.bind('focus', function() {
                    this.select();
                });
            }
            console.log(response);
        },
        replaceAndTrim: function(word){
            return word.replace(/<br\s*[\/]?>/gi, "").replace(/\n/gi, "").trim();
        },
        replaceN: function(word) {
            return word.replace(/\\n/g, "<br>").replace(/\n/g, "<br>");
        },
        replaceTrimAndLower: function (word) {
            return word.replace(/"/g, '').toLowerCase().trim();
        },
        collapseNewsBlock: function(){
            var $newsBlock = $("#" + VB.settings.newsBlock);
            if ($newsBlock.length > 0 && VB.settings.toggleBlocks && VB.settings.toggleNewsBlock) {
                var $sectionBody = $newsBlock.find('.vbs-section-body');
                $newsBlock.find('.vbs-section-title').addClass('vbs-hidden').attr('data-title', 'Show News');
                $newsBlock.find('.vbs-news-words-wrapper').hide();
                $sectionBody.slideUp();
            }
        },
        expandNewsBlock: function(){
            var $newsBlock = $("#" + VB.settings.newsBlock);
            if ($newsBlock.length > 0 && VB.settings.toggleBlocks && VB.settings.toggleNewsBlock) {
                var $sectionBody = $newsBlock.find('.vbs-section-body');
                $newsBlock.find('.vbs-section-title').removeClass('vbs-hidden').attr('data-title', 'Hide News');
                $newsBlock.find('.vbs-news-words-wrapper').show();
                $sectionBody.slideDown();
            }
        },
        updateQuotesVisibility: function(){
            if(VB.settings.vbsButtons.unquotes) {
                var $search_form = VB.helper.find(".vbs-search-form");
                var terms = VB.helper.getSearchWordsArray();
                var quotedTerms = terms.filter(function(_term){
                    return (_term.indexOf('"') === 0 && _term.lastIndexOf('"') === (_term.length - 1)); // if "many words"
                });
                if(quotedTerms.length > 0) {
                    $search_form.addClass('vbs-quoted');
                }
                else {
                    $search_form.removeClass('vbs-quoted');
                }
            }
        },
        removeQuotes: function(){
            var terms = VB.helper.getSearchWordsArray();
            var words = [];
            terms.forEach(function(_term){
                if(_term.indexOf('"') === 0 && _term.lastIndexOf('"') === (_term.length - 1)) { // if "many words"
                    _term = _term.replace(/"/g, "");
                    var inner_words = _term.split(' ');
                    inner_words.forEach(function(w){
                        words.push(w);
                    });
                }
                else {
                    words.push(_term);
                }
            });

            var stringWords = words.join(' ');
            VB.helper.find('#vbs-voice_search_txt').val(stringWords).data('data-val', stringWords);
            $('#vbs-search-form').submit();
        },
        clearIntervals: function(){
            clearInterval(VB.data.waiterSave);
            VB.data.waiterSave = null;
            if(VB.instances.length > 0 && VB.instances[VB.current_instance] && VB.instances[VB.current_instance].player) {
                clearInterval(VB.instances[VB.current_instance].player.find_player_interval);
                VB.instances[VB.current_instance].player.find_player_interval = null;
            }
            clearInterval(VB.events.time);
            VB.events.time = null;
            clearInterval(VB.data.waiter);
            VB.data.waiter = null;
            clearInterval(VB.data.metadataWaiter);
            VB.data.metadataWaiter = null;
        },
        isIe: function(){
            var myNav = navigator.userAgent.toLowerCase();
            return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
        },
        isRetina: function(){
            var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
            (min--moz-device-pixel-ratio: 1.5),\
            (-o-min-device-pixel-ratio: 3/2),\
            (min-resolution: 1.5dppx)";
            if (window.devicePixelRatio > 1){
                return true;
            }
            if (window.matchMedia && window.matchMedia(mediaQuery).matches) {
                return true;
            }
            return false;
        },
        isMobile: function(){
            if(VB.data.isMobile) {
                return VB.data.isMobile;
            }
            var check = false;
            (function(a,b){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true;})(navigator.userAgent||navigator.vendor||window.opera);
            VB.data.isMobile = check;
            return check;
        },
        is_iDevice: function(){
            var check = false;
            (function (a, b) {
                if (/ip(hone|od|ad)/i.test(a)) check = true;
            })(navigator.userAgent || navigator.vendor || window.opera);
            return check;
        },
        renderMobile: function(){
            $('body').addClass('vbs-mobile');

            if(VB.helper.isRetina()) {
                $('body').addClass('vbs-retina');
            }
        },
        getMobileWidth: function(){
            var w = $('.vbs-content').width();
            return w;
            //return (VB.helper.is_iDevice()) ? window.innerWidth - 20 : screen.availWidth - 20;
        },
        setOnTimeInterval: function() {
            VB.events.time = setInterval(function() {
                if(VB.events.time) {
                    VB.events.onTime();
                }
            }, 250);
        },
        isMediaTypeEqualVideo: function() {
            var mediaOverride = VB.settings.mediaTypeOverride;
            if (mediaOverride) {
                return (mediaOverride === 'video');
            }
            if(VB.api.response) {
                var meta_response = VB.api.response.metadata;
                return !(meta_response && meta_response.response && meta_response.response.hasVideo === false);
            }
            else {
                return true;
            }
        },

        isApi2_0: function() {
            return VB.settings.apiVersion === '2.0';
        },

        clearMessage: function() {
            if(VB.settings.localSearch) {
                $('.vbs-message').remove();
                $('.vbs-text-error-message').remove();
            }
            else {
                $('.vbs-message').fadeOut();
                $('.vbs-text-error-message').fadeOut();
            }
        },

        showMessage: function(text, mode) {
            VB.helper.clearMessage();
            var errorMessage = VB.templates.parse('infoMessage', {
                errorText: text,
                mode: mode
            });
            VB.helper.appendMessage(errorMessage);
        },

        appendMessage: function(msg) {
            if(VB.settings.searchBarOuter) {
                $('#' + VB.settings.searchBarBlock).before(msg);
            }
            else {
                $('#' + VB.settings.keywordsBlock).before(msg);
            }
        },

        checkScrollForResize: function($transcriptBody) {
            var $transcriptContent = $transcriptBody.find('.vbs-transcript-wrapper');
            if($transcriptBody.height() > $transcriptContent.height()) {
                $transcriptBody.find('.ui-resizable-se,.ui-resizable-e').addClass('vbs-no-scroll');
            }
            else {
                $transcriptBody.find('.ui-resizable-se,.ui-resizable-e').removeClass('vbs-no-scroll');
            }
        }

    };

    return VB;
})(voiceBase, jQuery);
/*
* VB.methods. Public plugin methods
* */
voiceBase = (function(VB, $) {
    "use strict";

    VB.methods = {
        init: function(options) {
            VB.reSettings(options);
            VB.init(VB.settings.playerId);
            VB.view.init(this);
        },
        favorite: function(opt) {
            if (opt)
                VB.helper.find(".vbs-star-btn").addClass('vbs-active').attr('data-tile', 'Remove from Favorites');
            else
                VB.helper.find(".vbs-star-btn").removeClass('vbs-active').attr('data-tile', 'Add from Favorites');
            return opt;
        },
        favoriteToggle: function() {
            var $star = VB.helper.find(".vbs-star-btn");
            $star.toggleClass('vbs-active');
            return $star.hasClass('vbs-active');
        },
        isFavorite: function() {
            return VB.helper.find(".vbs-star-btn").hasClass('vbs-active');
        },
        getPosition: function() {
            return Math.round(VB.PlayerApi.getPosition());
        },
        getSearchString: function() {
            return VB.helper.find('#vbs-voice_search_txt').val();
        },
        getSharePositionUrl: function() {
            var newparam = {};
            newparam['vbt'] = Math.round(VB.PlayerApi.getPosition());
            return VB.helper.getNewUrl(newparam);
        },
        getShareSearchStringUrl: function() {
            var newparam = {};
            newparam['vbs'] = encodeURI(VB.helper.find('#vbs-voice_search_txt').val());
            return VB.helper.getNewUrl(newparam);
        },
        getShareFlag: function() {
            return VB.helper.find('.vbs-share-radio-row input[name="share-opt"]:checked').val();
        },
        search: function(text) {
            VB.helper.find("#vbs-voice_search_txt").val(text);
            VB.helper.find('#vbs-search-form').submit();
            return text;
        },
        position: function(time) {
            VB.PlayerApi.seek(time);
            return time;
        },
        destroy: function(){
            VB.helper.clearIntervals();
            $(this).remove();
            $('.vbs-content').remove();
        },

        addCustomMarkers: function (markers) {
            VB.data.customMarkers = markers;
        },

        showCustomMarkers: function () {
            VB.view.showCustomMarkers();
        },

        hideCustomMarkers: function () {
            VB.view.hideCustomMarkers();
        },

        nextCustomMarkers: function () {
            var $markersContainer = VB.helper.find('.vbs-custom-markers');
            VB.helper.moveToNextMarker($markersContainer);
        },

        prevCustomMarkers: function () {
            var $markersContainer = VB.helper.find('.vbs-custom-markers');
            VB.helper.moveToPrevMarker($markersContainer);
        }
    };

    return VB;
})(voiceBase, jQuery);
/*
* VB.Player and VB.interface.
* Work with players
* */
voiceBase = (function(VB, $) {
    "use strict";

    VB.Player = function(a, playerId) {
        var me = this;
        me.instance = a;
        var playerType = VB.settings.playerType;
        playerType = playerType.toLowerCase().replace(/^\s+|\s+$/, "");
        me.player_type = playerType;
        me.instance.player_ready = false;
        me.find_player_interval = setInterval(function() {
            if(me.find_player_interval) {
                try {
                    me.interface = new VB.interface[playerType](playerId, me.instance);
                    clearInterval(me.find_player_interval);
                    me.find_player_interval = null;
                    VB.helper.setOnTimeInterval();
                } catch (f) {
                    console.log(f);
                }
            }
        }, 250);
    };

    VB.interface = {
        youtube: function(a, b) {
            var me = this;
            me.instance = b;
            if (document.getElementById(a) && document.getElementById(a).tagName.toLowerCase() == "iframe") {
                if (typeof YT == "undefined" || typeof YT.Player == "undefined"){
                    throw "not_ready";
                }
                if (!YT.loaded){
                    throw "not_ready";
                }
                if (me.instance.ytplayerloaded){
                    return !1;
                }
                me.youtube_player = new YT.Player(a);
                me.instance.ytplayerloaded = !0;
            }
            else {
                me.youtube_player = window.document[a];
            }

            me.play = function() {
                me.youtube_player.playVideo();
            };

            me.pause = function() {
                me.youtube_player.pauseVideo();
            };

            me.play_state = function() {
                try {
                    var a = me.youtube_player.getPlayerState();
                    return parseInt(a) == 1 || parseInt(a) == 5 ? "PLAYING" : "PAUSED";
                } catch (b) {
                    return "PAUSED";
                }
            };

            me.position = function() {
                try {
                    return me.youtube_player.getCurrentTime() + 0.07;
                } catch (b) {
                    return 0;
                }
            };

            me.duration = function() {
                return me.youtube_player ? parseInt(me.youtube_player.getDuration() + 0.5) : !1;
            };

            me.seek = function(position) {
                position = parseInt(position, 10);
                me.youtube_player.seekTo(position);
                me.play();
            };

            me.get_volume = function() {
                return me.youtube_player ? me.youtube_player.getVolume() : !1;
            };

            me.set_volume = function(a) {
                me.youtube_player.setVolume(a);
            };

            me.get_buffer = function() {
                return (me.youtube_player && me.youtube_player.getVideoBytesLoaded) ? ( me.youtube_player.getVideoBytesLoaded() * 100 / me.youtube_player.getVideoBytesTotal() ) : !1;
            };

            window.onYouTubePlayerReady = function(playerId){
                if(!me.instance.player_ready){
                    me.instance.player_ready = true;
                    if(VB.settings.localApp) {
                        YSP.api.init('ytplayer');
                        YSP.api.getLanguages(function(data){
                            VB.data.localData.languages = data.languages;
                            VB.view.initApi();
                        });
                    }
                }
            };
        },
        jwplayer: function(playerId, b) {
            var me = this;
            me.instance = b;
            if (typeof jwplayer != "undefined" && jwplayer(playerId) && jwplayer(playerId).play){
                me.jw_player = jwplayer(playerId);
                me.jw_player.onReady(function(){
                    readyPlayer();
                });

                me.jw_player.onError(function(e) {
                    $('.vbs-text-error-message').remove();
                    var errorText = e.message;
                    if(errorText === 'Error loading media: File could not be played' && VB.helper.is_iDevice()) {
                        errorText = 'This media file cannot be played on your current device and operating system. Please try on a different device or upgrade to a supported version of iOS 8.';
                    }
                    var errorMessage = VB.templates.parse('textErrorMessage', {
                        errorText: errorText
                    });
                    $('#' + VB.settings.controlsBlock).after(errorMessage);
                });

                var initJwMethods = function(){
                    me.play = function() {
                        me.jw_player.play();
                    };
                    me.pause = function() {
                        me.jw_player.pause();
                    };
                    me.play_state = function() {
                        return me.jw_player.getState() == "PLAYING" ? "PLAYING" : "PAUSED";
                    };
                    me.position = function() {
                        return me.jw_player.getPosition();
                    };
                    me.duration = function() {
                        return me.jw_player.getDuration();
                    };
                    me.seek = function(t) {
                        me.jw_player.seek(t);
                    };
                    me.get_volume = function() {
                        return me.jw_player.getVolume();
                    };
                    me.set_volume = function(a) {
                        return me.jw_player.setVolume(a);
                    };
                    me.get_buffer = function() {
                        return me.jw_player.getBuffer();
                    };
                    me.get_rendering_mode = function() {
                        return me.jw_player.getRenderingMode();
                    };
                    me.load_file = function(f) {
                        if(VB.settings.hasPlaylist){
                            me.jw_player.load(f);
                        }
                        else {
                            me.jw_player.load([{file: f}]);
                        }
                    };
                    me.getWidth = function(){
                        var width = me.jw_player.getWidth();
                        if(width === '100%'){
                            var container = me.jw_player.getContainer();
                            width = $(container).width();
                        }
                        return width;
                    };
                    me.getHeight = function(){
                        var height = me.jw_player.getHeight();
                        if(height === '100%'){
                            var container = me.jw_player.getContainer();
                            height = $(container).height();
                        }
                        return height;
                    };
                    me.setSize =  function(width, height){
                        if(width === null || typeof width === 'undefined') {
                            width = me.jw_player.getWidth();
                        }
                        if(height === null || typeof height === 'undefined') {
                            height = me.jw_player.getHeight();
                        }
                        me.jw_player.resize(width, height);
                    };
                    var prev_item_id = null;
                    me.initPluginFromPlaylistItem = function(){
                        var item = me.getCurrentPlaylistItem();
                        var vbs_id = VB.PlayerApi.getPlaylistItemId(item);
                        if(vbs_id.id !== prev_item_id) {
                            prev_item_id = vbs_id.id;
                            delete VB.settings.mediaId;
                            delete VB.settings.externalId;
                            VB.helper.clearIntervals();
                            if(vbs_id.isMediaid) {
                                VB.settings.mediaId = item.vbs_mediaid;
                            }
                            else {
                                VB.settings.externalId = item.vbs_externalid;
                            }

                            VB.helper.setOnTimeInterval();
                            VB.view.initApi();

                            var index = me.jw_player.getPlaylistIndex();
                            $('.vbs-playlist-item').removeClass('active');
                            $('.vbs-selected-playlist-item').find('.vbs-item-name').text(item.title);
                            var $playlistItem = $('[data-playlist-item-index='+ index +']');
                            $playlistItem.addClass('active');
                            $playlistItem[0].scrollIntoView();
                        }
                    };
                    me.setPlaylistItem = function(index) { // for changing playlist item
                        index = parseInt(index);
                        me.jw_player.playlistItem(index);
                    };
                    me.getPlaylistItemIndex = function() { // for changing playlist item
                        return me.jw_player.getPlaylistIndex();
                    };
                    me.onChangePlayListItem = function(){
                        me.jw_player.onPlaylistItem(function(){
                            me.initPluginFromPlaylistItem();
                        });
                    };
                    me.getCurrentPlaylistItem = function(){
                        return me.jw_player.getPlaylistItem();
                    };
                    me.getPlaylist = function(){
                        return me.jw_player.getPlaylist();
                    };
                    me.renderPlaylist = function() {
                        var playlist = me.getPlaylist();
                        $('#' + VB.settings.controlsBlock).before(VB.templates.get('playlist'));
                        var itemsTmpl = '';
                        playlist.forEach(function(_item, index) {
                            itemsTmpl += VB.templates.parse('playlist-item', {
                                title: _item.title,
                                index: index
                            });
                        });
                        $('.vbs-playlist-dropdown').append(itemsTmpl);

                    };
                };

                var readyPlayer = function() {
                    me.instance.player_ready = true;
                    initJwMethods();

                    if(VB.helper.isMobile()) {
                        var mobile_sizes = VB.PlayerApi.getMobilePlayerSize();
                        me.setSize(mobile_sizes.mobile_width, mobile_sizes.mobile_height);
                        $("#" + VB.settings.mediaBlock).css('width', mobile_sizes.mobile_width);
                    }

                    if(VB.settings.hasPlaylist){
                        if(!VB.settings.nativePlaylist) {
                            me.renderPlaylist();
                        }
                        me.onChangePlayListItem();
                    }
                };

                initJwMethods();
                me.instance.player_ready = true;
            }
            else {
                throw "not_ready";
            }
        },
        kaltura: function(t, e) {
            var me = this;
            me.instance = e;
            me.kaltura_player = $("#" + t).get(0);
            me.kaltura_states = {
                buffered: 0,
                bytes_total: 0,
                player_state: false,
                playhead_time: 0,
                volume: 1,
                ready: false
            };

            window.bytesTotalChangeHandler = function(data){
                me.kaltura_states.bytes_total = data;
            };

            window.html5_kaltura_play_handler = function(data){
                console.log('Kaltura is PLAYING!');
                me.kaltura_states.player_state = true;
            };

            window.html5_kaltura_pause_handler = function(){
                console.log('Kaltura is PAUSED!');
                me.kaltura_states.player_state = false;
            };

            window.html5_kaltura_update_playhead = function(t){
                me.kaltura_states.playhead_time = parseFloat(t);
            };

            window.volumeChangedHandler = function(volumeValue){
                me.kaltura_states.volume = volumeValue.newVolume;
            };

            window.bytesDownloadedChangeHandler = function(data, id){
                me.kaltura_states.buffered = data.newValue;
            };

            window.playerSeekEndHandler = function(){
                me.play();
            };

            me.player_state = !1;
            me.playhead_time = 0;
            me.player_id = t;

            me.play = function () {
                me.kaltura_player.sendNotification("doPlay");
            };
            me.pause = function () {
                me.kaltura_player.sendNotification("doPause");
            };
            me.play_state = function () {
                return (me.kaltura_states.player_state) ? 'PLAYING' : 'PAUSED';
            };
            me.position = function () {
                return me.kaltura_states.playhead_time;
            };
            me.duration = function () {
                return me.kaltura_player.evaluate("{mediaProxy.entry.msDuration}") / 1000;
            };
            me.video_id = function () {
                return me.kaltura_player.evaluate("{mediaProxy.entry.id}");
            };
            me.seek = function (t) {
                me.kaltura_player.sendNotification("doPlay");

                setTimeout(function(){
                    me.kaltura_player.sendNotification("doSeek", parseFloat(parseInt(t)));
                }, 0);
            };
            me.play_file = function (t) {
                if (t.video_id != this.video_id()) {
                    var e = t.m || 0;
                    me.kaltura_player.sendNotification("changeMedia", {
                        entryId: t.video_id, seekFromStart: e.toString()
                    });
                    me.timer = setInterval(function () {
                        return "PLAYING" == me.play_state() && me.video_id() == t.video_id ? (clearInterval(me.timer), !0) : void me.play();
                    }, 200);
                } else
                    this.seek(t.m);
            };
            me.get_buffer = function(t) {
                if(me.kaltura_states.bytes_total && me.kaltura_states.buffered){
                    return me.kaltura_states.buffered * 100 / me.kaltura_states.bytes_total;
                }
                return 0;
            };
            me.get_volume = function() {
                return me.kaltura_states.volume * 100;
            };
            me.set_volume = function(a) {
                me.kaltura_player.sendNotification('changeVolume', a/100);
            };

            me.getPlayerIframe = function(){
                return $('#' + me.player_id + '_ifp').contents();
            };

            window.kdpReady = function(){
                me.kaltura_states.ready = true;
                me.instance.player_ready = true;
                console.log('Kaltura is ready!');

                me.kaltura_player.addJsListener("volumeChanged", "volumeChangedHandler");

                me.kaltura_player.addJsListener("playerPlayed", 'html5_kaltura_play_handler');
                me.kaltura_player.addJsListener("playerPaused", 'html5_kaltura_pause_handler');
                me.kaltura_player.addJsListener("playerPlayEnd", 'html5_kaltura_pause_handler');
                me.kaltura_player.addJsListener("playerUpdatePlayhead", 'html5_kaltura_update_playhead');
                me.kaltura_player.addJsListener("bytesTotalChange", "bytesTotalChangeHandler");
                me.kaltura_player.addJsListener("bytesDownloadedChange", "bytesDownloadedChangeHandler");
                me.kaltura_player.addJsListener("playerSeekEnd", "playerSeekEndHandler");
                if(me.kaltura_player.tagName == 'OBJECT'){ // flash player
                    me.play();
                }
                if(VB.settings.markersInNativeTimeline && VB.settings.cssPathForPlayerFrame) {
                    var cssLink = document.createElement("link");
                    cssLink.href = VB.settings.cssPathForPlayerFrame;
                    cssLink .rel = "stylesheet";
                    cssLink .type = "text/css";
                    var $playerIframe = me.getPlayerIframe();
                    $playerIframe[0].body.appendChild(cssLink);
                }
            };

            window.jsCallbackReady = function(player_id) {
                //me.kaltura_player.addJsListener("kdpReady", "kdpReady");
            };

            if (!me.kaltura_player || !me.kaltura_player.addJsListener) {
                throw "not_ready";
            }
            else {
                window.kdpReady();
            }

        },
        flowplayer: function(player_id, e) {
            var me = this;
            me.instance = e;
            if (typeof flowplayer === "undefined" ){
                throw "not_ready";
            }
            me.flow_player = $('#' + player_id);
            var api = flowplayer(me.flow_player);

            me.play = function() {
                api.play();
            };
            me.pause = function() {
                return api.pause();
            };
            me.play_state = function() {
                var status = api.paused;
                return (status) ? "PAUSED" : "PLAYING";
            };
            me.position = function() {
                return (api.video) ? api.video.time : 0;
            };
            me.duration = function() {
                return (api.video) ? api.video.duration : 0; // 1e3 ??
            };
            me.seek = function(position) {
                api.seek(position); // in seconds
                me.play();
            };
            me.get_buffer = function(t) {
                if(api.video){ // in percent
                    return api.video.buffer * 100 / me.duration();
                }
                return 0;
            };
            me.flow_player.bind("volume", function() {
                var vol = me.get_volume();
                VB.PlayerApi.setUiVolume(vol);
            });
            me.get_volume = function() {
                return api.volumeLevel*100;
            };
            me.set_volume = function(volume) {
                api.volume(volume/100);
            };
        },
        sublime: function(player_id, e) {
            var me = this;
            me.instance = e;
            if(typeof sublime == "undefined" || typeof sublime.player == "undefined"){
                throw "not_ready";
            }
            else if(typeof sublime.player(player_id) == "undefined"){
                throw "not_ready";
            }
            me.player_id = player_id;
            me.default_size = {
                width: $('#' + me.player_id).width(),
                height: $('#' + me.player_id).height()
            };
            me.player_state = !1;
            var api = sublime.player(me.player_id);
            api.on({
                start: function() {
                    me.player_state = "PLAYING";
                },
                end: function() {
                    me.player_state = "PAUSED";
                },
                stop: function() {
                    me.player_state = "PAUSED";
                },
                pause: function() {
                    me.player_state = "PAUSED";
                },
                play: function() {
                    me.player_state = "PLAYING";
                }
            });
            me.play = function() {
                api.play();
            };
            me.pause = function() {
                api.pause();
            };
            me.play_state = function() {
                return me.player_state;
            };
            me.position = function() {
                return api.playbackTime();
            };
            me.duration = function() {
                return api.duration();
            };
            me.get_buffer = function(t) {
                return 0;
            };
            me.seek = function(position) {
                api.seekTo(position);
                me.play();
            };
            me.setSize = function(width, height){
                api.setSize(width, height);
            };
            me.setDefaultSize = function(){
                api.setSize(me.default_size.width, me.default_size.height);
            };
        },
        video_js: function(t, e) {
            var me = this;
            me.instance = e;
            me.player_id = t;
            if (typeof _V_ === "undefined")
                throw "not_ready";
            var api = _V_(t);
            me.instance.player_ready = true;
            me.play = function() {
                api.play();
            };
            me.pause = function() {
                api.pause();
            };
            me.play_state = function() {
                return api.paused() ? "PAUSED" : "PLAYING";
            };
            me.position = function() {
                return api.currentTime();
            };
            me.duration = function() {
                return api.duration();
            };
            me.seek = function(position) {
                api.currentTime(position);
                me.play();
            };
            me.get_buffer = function(t) {
                return api.bufferedPercent() * 100 || 0;
            };
            api.on("volumechange", function() {
                var vol = me.get_volume();
                VB.PlayerApi.setUiVolume(vol);
            });
            me.get_volume = function() {
                return api.volume() * 100;
            };
            me.set_volume = function(volume) {
                api.volume(volume / 100);
            };
        },
        jplayer: function(player_id, instance){
            var me = this;
            me.instance = instance;
            me.player_id = player_id;
            var $player = $('#' + me.player_id);

            me.default_size = {
                width: $('#' + me.player_id).width(),
                height: $('#' + me.player_id).height()
            };

            me.play = function(){
                $player.jPlayer("play");
            };
            me.pause = function(){
                $player.jPlayer("pause");
            };
            me.play_state = function() {
                return $player.data('jPlayer').status.paused ? "PAUSED" : "PLAYING";
            };
            me.position = function() {
                return $player.data('jPlayer').status.currentTime || 0;
            };
            me.duration = function() {
                return $player.data('jPlayer').status.duration || 0;
            };
            me.seek = function(position) { // in seconds
                position = parseInt(position);
                $player.jPlayer("play", position);
            };
            me.get_buffer = function(t) {
                return 0;
            };
            me.get_volume = function() {
                return ($player.data("jPlayer").options.volume * 100) || 0;
            };
            me.set_volume = function(volume) {
                $('#jplayer').jPlayer("volume", volume / 100);
            };
            me.isVideo = function(){
                return $player.data('jPlayer').status.video;
            };
            me.getGui = function(){
                return $($player.data('jPlayer').ancestorJq);
            };
            me.initEvents = function(){
                $player.bind($.jPlayer.event.volumechange, function(){
                    var vol = me.get_volume();
                    VB.PlayerApi.setUiVolume(vol);
                });
            };
            me.setSize = function(width, height){
                $player.jPlayer({
                    size:  {
                        width: width,
                        height: height
                    }
                });
            };
            me.setDefaultSize = function(){
                me.setSize(me.default_size.width, me.default_size.height);
            };

            var init = function(){
                var $gui = me.getGui();
                if(!me.isVideo()){
                    $gui.hide();
                }
                me.initEvents();
            };
            init();

        }
    };

    VB.PlayerApi = {
        startPlayer: function(start_time) {
            VB.helper.showLoader();
            window.setTimeout(function() {
                VB.PlayerApi.cseek(start_time);
            }, 200);

            window.setTimeout(function() {
                VB.data.movelistner = false;
                VB.data.dragging = false;
            }, 300);
        },
        cseek: function(time) {
            VB.instances[VB.current_instance].player.interface.seek(time);
        },
        seek: function(time) {
            VB.PlayerApi.startPlayer(time);
        },
        play: function() {
            VB.instances[VB.current_instance].player.interface.play();
        },
        pause: function() {
            VB.instances[VB.current_instance].player.interface.pause();
        },
        getOffset: function(startTime){
            var wrapper = VB.helper.find('.vbs-record-timeline-wrap');
            return (startTime * wrapper.width()) / VB.data.duration;
        },
        getDuration: function() {
            return VB.instances[VB.current_instance].player.interface.duration();
        },
        getPosition: function() {
            return VB.instances[VB.current_instance].player.interface.position();
        },
        getStatus: function() {
            return VB.instances[VB.current_instance].player.interface.play_state();
        },
        getVolume: function() {
            return VB.instances[VB.current_instance].player.interface.get_volume();
        },
        setVolume: function(vol) { // set player volume
            return VB.instances[VB.current_instance].player.interface.set_volume(vol);
        },
        setUiVolume: function(vol){
            VB.helper.find(".vbs-volume-slider-full").css("height", vol + "%");
            VB.helper.find(".vbs-volume-slider-handler").css("bottom", vol + "%");
        },
        getBuffer: function() {
            return VB.instances[VB.current_instance].player.interface.get_buffer();
        },
        getRenderingMode: function() {
            return VB.instances[VB.current_instance].player.interface.get_rendering_mode();
        },
        loadFile: function(f) {
            return VB.instances[VB.current_instance].player.interface.load_file(f);
        },
        isPlayerReady: function(){
            return VB.instances[VB.current_instance].player_ready;
        },
        getMobilePlayerSize: function(){
            var player_width = VB.PlayerApi.getPlayerWidth();
            var player_height = VB.PlayerApi.getPlayerHeight();
            var ratio = (player_width && player_height) ? player_width / player_height : 0;
            var mobile_width = VB.helper.getMobileWidth();
            var mobile_height = mobile_width / ratio;
            mobile_height = (mobile_height > screen.availHeight) ? screen.availHeight : mobile_height;
            return {
                mobile_width: mobile_width,
                mobile_height: mobile_height
            };
        },
        getPlayerWidth: function(){
            return VB.instances[VB.current_instance].player.interface.getWidth();
        },
        getPlayerHeight: function(){
            return VB.instances[VB.current_instance].player.interface.getHeight();
        },
        setSizePlayer: function(width, height) {
            var _interface = VB.instances[VB.current_instance].player.interface;
            if(_interface && _interface.setSize) {
                return _interface.setSize(width, height);
            }
            return null;
        },
        setDefaultSizePlayer: function() {
            return VB.instances[VB.current_instance].player.interface.setDefaultSize();
        },
        hidePlayer: function(){
            if(VB.settings.playerType != 'kaltura'){
                var waitinstance = setInterval(function() {
                    if (VB.instances.length) {
                        clearTimeout(waitinstance);
                        VB.helper.findc('.vbs-player-wrapper').css({"height": 0});
                        if(VB.settings.playerType === 'jwplayer') {
                            VB.PlayerApi.setSizePlayer(0, 0);
                            $('#' + VB.settings.playerId).css({"opacity": 0});
                        }
                    }
                }, 100);
            }
        },
        setPlaylistItem: function(index){
            return VB.instances[VB.current_instance].player.interface.setPlaylistItem(index);
        },
        getPlaylistItemIndex: function(){
            return VB.instances[VB.current_instance].player.interface.getPlaylistItemIndex();
        },
        getPlaylist: function(){
            return VB.instances[VB.current_instance].player.interface.getPlaylist();
        },
        getCurrentPlaylistItem: function(){
            return VB.instances[VB.current_instance].player.interface.getCurrentPlaylistItem();
        },
        getPlaylistItemId: function(item){
            var id;
            var isMediaid = false;
            if(item.vbs_mediaid) {
                id = item.vbs_mediaid;
                isMediaid = true;
            }
            else if(item.vbs_externalid) {
                id = item.vbs_externalid;
            }
            return {
                id: id,
                isMediaid: isMediaid
            };
        },
        getStreamUrl: function(response){
            var stream_url = '';
            if (VB.PlayerApi.getRenderingMode() != "html5" && VB.settings.stream == 'rtmp') {
                stream_url = response.rtmpUrl + "" + response.rtmpFile;
            }
            else if (VB.settings.stream == 'http' || VB.settings.stream === true) {
                stream_url = response.streamUrl;
            }
            return stream_url;

        },
        getPlayerIframe: function(){
            return VB.instances[VB.current_instance].player.interface.getPlayerIframe();
        }
    };

    return VB;
})(voiceBase, jQuery);
/*
 * Module for speaker functionality
 * */
voiceBase = (function(VB, $) {
    "use strict";

    jQuery.extend(jQuery.expr[':'], {
        "speakertime": function(element, i, match, elements) {
            var s = parseFloat($(element).attr('s'));
            var e = parseFloat($(element).attr('e'));
            var minMaxValues = match[3].split(/\s?,\s?/);
            var value = parseFloat(minMaxValues[0]);
            return !isNaN(s) && !isNaN(e) && !isNaN(value) && value <= e && value >= s;
        }
    });

    VB.speakers = {
        inSpeakers: function (needleName) {
            for (var iss in VB.data.speakers) {
                if (VB.data.speakers[iss].toLowerCase() == needleName.toLowerCase())
                    return true;
            }
            return false;
        },

        getSpeakerNameByKey: function(key) {
            return typeof VB.data.speakers[key] != 'undefined' ? VB.data.speakers[key] : '';
        },

        getSpeakerKeyByName: function(name) {
            for (var iss in VB.data.speakers) {
                if (VB.data.speakers[iss].toLowerCase() == name.toLowerCase())
                    return iss;
            }
            return '';
        },

        setSpeakerName: function(speakerKey, newSpeakerName){
            for (var iss in VB.data.speakers) {
                if (iss === speakerKey){
                    VB.data.speakers[iss] = newSpeakerName;
                    return true;
                }
            }
            return false;
        },

        addSpeakerKey: function(speaker_name){
            if (speaker_name && !VB.speakers.inSpeakers(speaker_name) && speaker_name != '>>') {
                var num = Object.keys(VB.data.speakers).length + 1;
                VB.data.speakers['vbs-sp' + num + 'o'] = speaker_name;
            }
        },

        filterResultForSpeaker: function(time) {
            if (typeof VB.settings.filterSpeaker == 'undefined' || VB.settings.filterSpeaker == 'all') {
                return true;
            }
            for (var sp in VB.data.allSpeakers) {
                if (time * 1000 > parseFloat(VB.data.allSpeakers[sp].t) &&
                    ((typeof VB.data.allSpeakers[parseInt(sp) + 1] != 'undefined' && time * 1000 <= parseFloat(VB.data.allSpeakers[parseInt(sp) + 1].t)) ||
                    (typeof VB.data.allSpeakers[parseInt(sp) + 1] == 'undefined' && time * 1000 <= VB.data.duration * 1000)) &&
                    VB.speakers.getSpeakerKeyByName(VB.data.allSpeakers[parseInt(sp)].s) == VB.settings.filterSpeaker
                ) {
                    return true;
                }
            }
            return false;
        },

        filterSpeakersList: function(speakers) {
            VB.helper.find('.vbs-select-dropdown li').removeClass('vbs-disabled').each(function(){
                var $this = $(this);
                var sp = $this.attr('data-speaker');
                if(speakers.indexOf(sp) < 0 && sp != 'all') {
                    $this.addClass('vbs-disabled');
                }
            });
        },

        parseSpeakersInCategory: function(category, speakersName, speakersArray){
            for (var si in category.speakers) {
                var speaker_name = VB.helper.replaceAndTrim(category.speakers[si]);
                VB.speakers.addSpeakerKey(speaker_name);
                if (!VB.common.inArrayV(speakersName, speaker_name)) {
                    var num = Object.keys(speakersArray).length + 1;
                    speakersName.push(speaker_name);
                    speakersArray.push('vbs-sp' + num + 'o');
                }
            }

            var isps = [];
            if (typeof category.speakers != "undefined" && category.speakers.length) {
                for (var isp in category.speakers) {
                    isps.push(VB.speakers.getSpeakerKeyByName(VB.helper.replaceAndTrim(category.speakers[isp])));
                }
            }
            isps.join();

            return {
                isps: isps,
                speakersName: speakersName,
                speakersArray: speakersArray
            };

        },

        createSpeakerAttr: function(transcriptWord){
            var isTurn = VB.helper.isTurn(transcriptWord.m);
            var clearWord = VB.helper.getClearWordFromTranscript(transcriptWord.w);
            var speakerName = (isTurn) ? clearWord : false;
            var sptag = '';
            if(speakerName) {
                VB.speakers.addSpeakerKey(speakerName);
                var speakerKey = VB.speakers.getSpeakerKeyByName(speakerName);
                sptag ='m="' + speakerKey + '"';
            }
            return sptag;
        },

        /*
         * show "{{Speaker}} is speaking" in player heading
         * */
        speakerIsSpeaking: function() {
            var ct = VB.data.position * 1000;
            var curspeaker = $('.vbs-speakers > div:speakertime(' + ct + ')');
            if (curspeaker.length) {
                var speakerKey = curspeaker.attr('cnum');
                var speakerName = VB.speakers.getSpeakerNameByKey(speakerKey);
                if (typeof speakerName != 'undefined' && (VB.data.lspeaker != speakerName && speakerName.trim() != '>>')) {
                    VB.data.lspeaker = speakerName;
                    var spblock = '<span class="' + speakerKey + '">' + speakerName + '</span> is speaking';
                    VB.helper.find('.vbs-voice-name').html(spblock);
                    VB.helper.adjustMediaTime();
                }
            } else {
                VB.helper.find('.vbs-voice-name').html('');
            }
        },

        speakersWidget: function() {
            var speakers = [];
            var snn = 1;
            var $transcript_wrapper = VB.helper.find('.vbs-transcript-block .vbs-transcript-wrapper');
            $transcript_wrapper.find('span.w[m]').each(function(index) {
                var $this = $(this);
                var spitem = {};
                spitem.s = VB.speakers.getSpeakerNameByKey($this.attr('m'));
                spitem.t = $this.attr('t');
                speakers.push(spitem);
                var br = "", spclass;
                if (VB.settings.turnTimes) {
                    if (spitem.s.trim() == '>>') {
                        spclass = snn % 2 ? 'vbs-sp1' : 'vbs-sp2';
                        snn++;
                    } else {
                        spclass = VB.speakers.getSpeakerKeyByName(spitem.s);
                    }
                    br += '<span class="vbs-clearfix"></span><span class="vbs-trans-info"><span class="vbs-human-trans-name ' + spclass + '" title="'+spitem.s+'">' + spitem.s + '</span><span class="vbs-human-trans-time">' + VB.helper.parseTime($this.attr('t') / 1000) + '</span></span>';
                }
                jQuery(br).insertBefore(this);
            });
            if (snn > 1) {
                $transcript_wrapper.addClass('vbs-machine');
            }
            snn = 1;
            VB.data.allSpeakers = speakers;
            if (speakers.length) {
                VB.speakers.renderSpeakersInTimeline();
                if (snn > 1) {
                    $speakers.addClass('vbs-machine');
                    VB.helper.find('.vbs-media-block .vbs-section-title, .vbs-time-name-wrapper-narrow').addClass('vbs-machine');
                }
            }
        },

        renderSpeakersInTimeline: function() {
            var $transcript_wrapper = VB.helper.find('.vbs-transcript-block .vbs-transcript-wrapper');
            var speakers = VB.data.allSpeakers;
            if (speakers.length) {
                if (VB.settings.turnTimes) {
                    $transcript_wrapper.addClass('vbs-turntimes');
                }
                var wrapperWidth = VB.helper.find('.vbs-record-timeline-wrap').width() - 1;
                var speakers_string = '';
                for (var i in speakers) {
                    speakers[i].s = VB.helper.replaceAndTrim(speakers[i].s);
                    var position = ((speakers[i].t) / 1000 * wrapperWidth) / VB.data.duration;
                    var width;
                    if (typeof speakers[parseFloat(i) + 1] !== "undefined") {
                        width = ((speakers[parseFloat(i) + 1].t - speakers[parseFloat(i)].t) / 1000 * wrapperWidth) / VB.data.duration;
                    } else {
                        width = ((VB.data.duration - (speakers[parseFloat(i)].t) / 1000) * wrapperWidth) / VB.data.duration;
                    }
                    var end;
                    if (typeof speakers[parseFloat(i) + 1] !== "undefined") {
                        end = parseFloat(speakers[parseFloat(i) + 1].t);
                    } else {
                        end = VB.data.duration * 1000;
                    }
                    var colorclass;
                    if (speakers[i].s.trim() == '>>') {
                        colorclass = snn % 2 ? 'vbs-sp1' : 'vbs-sp2';
                        snn++;
                    } else {
                        colorclass = VB.speakers.getSpeakerKeyByName(speakers[i].s);
                    }
                    speakers_string += " " + VB.templates.parse('speakersTemplate', {
                        'position': position,
                        'width': width,
                        's': parseFloat(speakers[parseFloat(i)].t),
                        'e': end,
                        'speaker': speakers[i].s,
                        'colorclass': colorclass
                    });
                }

                var $speakers = VB.helper.find('.vbs-speakers');
                $speakers.html(speakers_string);
            }
        },

        speakerFilterWidget: function(speakers) {
            var speakers_string = '<li data-speaker="all">All Speakers</li>';
            for (var sp in speakers) {
                speakers_string += '<li data-speaker="' + sp + '">' + speakers[sp] + '</li>';
            }
            VB.helper.find('.vbs-search-form').removeClass('vbs-no-speaker');
            if(!VB.settings.searchBarOuter){
                var $keywordsBlock = VB.helper.findc("#" + VB.settings.keywordsBlock);
                var $keywords_wrapper = VB.helper.find('.vbs-keywords-wrapper');
                if ($keywordsBlock.width() < VB.settings.mediumResponsiveWithSpeakers && $keywordsBlock.width() >= VB.settings.minResponsive) {
                    $keywordsBlock.addClass('less-600px');
                    $keywords_wrapper.height($keywords_wrapper.height() - 55);
                }
            }
            VB.helper.find('.vbs-select-speaker-wrapper .vbs-select-dropdown').html(speakers_string);
        },

        resizeSpeakers: function(){
            VB.speakers.renderSpeakersInTimeline();
        },

        /*
        * Insert speaker in editor
        * */
        createInsertSpeakerDialog: function($insertMenuItem) {
            $('.vbs-insert-speaker-popup').remove();

            var $menu = $insertMenuItem.parents('.vbs-vbcmenu');
            var $editWrapper = $('.vbs-edit-mode-wrapper');
            $editWrapper.append(VB.templates.parse('insertSpeakerPopup'));

            var $selectSpeaker = $('.vbs-select-insert-speaker-wrapper');
            var $dropdown = $selectSpeaker.find('.vbs-select-dropdown');

            var speakers_keys = VB.speakers.getSpeakersFromEditor();

            var sem = '<li class="vbs-insert-new-speaker">Insert new speaker</li>';
            for (var i = 0; i < speakers_keys.length; i++) {
                var speaker_key = speakers_keys[i];
                var speaker_name = VB.speakers.getSpeakerNameByKey(speaker_key);
                sem += VB.templates.parse('speakerItem', {
                    speaker_name: speaker_name,
                    speaker_key: speaker_key
                });
            }
            $dropdown.html(sem);

            $('.vbs-insert-speaker-popup').css({
                top: $menu.offset().top + $editWrapper.scrollTop(),
                left: $menu.offset().left
            }).fadeIn(function(){
                $('.vbs-insert-speaker-input').focus();
            });
        },

        selectSpeakerInInsertDialog: function($speakerItem){
            $speakerItem.parents('.vbs-select-dropdown').fadeOut('fast');
            var $speakerTitle = $('.vbs-select-insert-speaker');

            var $resultSimple = $speakerTitle.find('.vbs-speaker-selected');
            var $inputNewSpeakerWrapper = $('.vbs-speaker-input-wrapper');
            var speakerKey = $speakerItem.attr('data-speaker-key');
            if(!speakerKey) {
                var $input = $inputNewSpeakerWrapper.find('.vbs-insert-speaker-input');
                $inputNewSpeakerWrapper.show();
                $speakerTitle.addClass('vbs-new-speaker');
                $resultSimple.html('Insert new speaker');
                setTimeout(function(){
                    $input.focus();
                }, 0);
            }
            else {
                var name = VB.speakers.getSpeakerNameByKey(speakerKey);
                $speakerTitle.removeClass('vbs-new-speaker').attr('data-speaker-key', speakerKey);
                $inputNewSpeakerWrapper.hide();
                $resultSimple.html(name);
            }
            $speakerTitle.removeClass('vbs-s-show');
        },

        insertSpeakerToEditor: function(){
            var selected = $('.vbs-edit-mode-wrapper').find('.vbs-menu-target');
            var stime = $(selected).attr('t');

            var $speakerTitle = $('.vbs-select-insert-speaker');

            var speakerName, speakerKey;
            if($speakerTitle.hasClass('vbs-new-speaker')) {
                speakerName = $('.vbs-insert-speaker-input').val();
                VB.speakers.addSpeakerKey(speakerName);
                speakerKey = VB.speakers.getSpeakerKeyByName(speakerName);
            }
            else {
                speakerKey = $speakerTitle.attr('data-speaker-key');
                speakerName = VB.speakers.getSpeakerNameByKey(speakerKey);
            }
            if(!selected.prev().hasClass('vbs-edit-speaker') && speakerKey){
                var insertText = '<span class="w vbs-wd vbs-edit-speaker" m="' + speakerKey + '" t="' + stime + '"><br><br>' + speakerName + ':</span> ';
                selected.first().before(insertText);
            }
        },


        getSpeakersFromEditor: function(){
            var unique_speakers = [];
            var speakersElements = $('.vbs-edit-speaker');
            speakersElements.each(function(){
                var key = $(this).attr('m');
                var findingSpeaker = unique_speakers.filter(function(_key){
                    return _key === key;
                });
                if(!findingSpeaker.length) {
                    unique_speakers.push(key);
                }
            });
            return unique_speakers;
        },

        findSpeakerElementsInEditor: function(speakerKey){
            var $editWrapper = $('.vbs-edit-mode-wrapper');
            var speakersElements = [];
            $editWrapper.find('.vbs-edit-speaker').each(function(){
                var key = $(this).attr('m');
                if(speakerKey === key) {
                    speakersElements.push($(this));
                }
            });
            return speakersElements;
        },

        /*
         * Rename speaker in editor
         * */

        createRenameSpeakerDialog: function($renameMenuItem){
            $('.vbs-rename-speaker-popup').remove();
            VB.speakers.enableRenameAllSpeakersInEditor();

            var $menu = $renameMenuItem.parents('.vbs-vbcmenu');
            var currentSpeakerKey = $renameMenuItem.attr('data-speaker-key');
            var currentSpeakerName = VB.speakers.getSpeakerNameByKey(currentSpeakerKey);
            var $editWrapper = $('.vbs-edit-mode-wrapper');
            $editWrapper.append(VB.templates.parse('renameSpeakerPopup', {
                current_speaker_key: currentSpeakerKey,
                current_speaker_name: currentSpeakerName
            }));

            VB.speakers.disableRenameSpeakersInEditor(currentSpeakerKey);

            setTimeout(function(){
                $('#vbs-rename_speaker_input').focus();
            }, 0);

            $('.vbs-rename-speaker-popup').css({
                top: $menu.offset().top + $editWrapper.scrollTop(),
                left: $menu.offset().left
            }).fadeIn();
        },

        /* Rename speaker from dialog */
        renameSpeaker: function(){
            var $editWrapper = $('.vbs-edit-mode-wrapper');
            var new_name = $('#vbs-rename_speaker_input').val();
            var old_key = $('#vbs-rename_speaker_input').attr('data-old-speaker-key');

            if(!VB.speakers.inSpeakers(new_name)) {
                VB.speakers.addSpeakerKey(new_name);
            }
            var new_key = VB.speakers.getSpeakerKeyByName(new_name);

            var $speakerElements = VB.speakers.findSpeakerElementsInEditor(old_key);
            $speakerElements.forEach(function($elem){
                $elem.text(new_name + ':').prepend('<br><br>').attr('m', new_key);
            });

            VB.speakers.clearEditorSpeakers();
            VB.speakers.enableRenameAllSpeakersInEditor(old_key);
        },

        renameSpeakerFromEditor: function($element) {
            var speakerKey = $element.attr('m');
            var speakerName = VB.helper.getClearWordFromTranscript($element.text());

            if(speakerName.lastIndexOf(':') != -1) { // some char after ":".
                speakerName = speakerName.substring(0, speakerName.lastIndexOf(':'));
            }

            if(!VB.speakers.inSpeakers(speakerName)) {
                VB.speakers.addSpeakerKey(speakerName);
            }

            speakerKey = VB.speakers.getSpeakerKeyByName(speakerName);
            $element.attr('m', speakerKey);

            VB.speakers.clearEditorSpeakers();
        },

        clearEditorSpeakers: function() {
            var $editWrapper = $('.vbs-edit-mode-wrapper');
            var keys = Object.keys(voiceBase.data.speakers);
            for (var i = 0; i < keys.length; i++) {
                var speakerElements = $editWrapper.find('span.w[m="' + keys[i] + '"]');
                if(speakerElements.length === 0) {
                    VB.data.speakers[keys[i]] = '';
                }
            }
        },

        disableRenameSpeakersInEditor: function(speakerkey){
            var $speakerElements = VB.speakers.findSpeakerElementsInEditor(speakerkey);
            $speakerElements.forEach(function($elem){
                $elem.attr('contenteditable', 'false');
            });
        },

        enableRenameAllSpeakersInEditor: function(){
            var $speakerElements =  $('.vbs-edit-speaker');
            $speakerElements.each(function(){
                $(this).attr('contenteditable', 'true');
            });
        }

    };

    return VB;
})(voiceBase, jQuery);
/*
* VB.templates
* */
voiceBase = (function(VB, $) {
    "use strict";

    var addTabClasses = function(){
        var tab_classes = '';
        if(VB.settings.tabView){
            tab_classes += ' vbs-tab ';
        }
        return tab_classes;
    };

    VB.templates = {
        parse: function(id, vars) {
            var template = this.get(id);
            for (var i in vars) {
                var rex = new RegExp("{{\\s*" + i + "\\s*}}", "gi");
                template = template.replace(rex, vars[i]);
            }
            return template;
        },
        get: function(id) {
            var tmpl = '';
            switch (id) {
                case('vbs-media'):
                    tmpl = '<div class="vbs-media-block">\n\
                <div class="vbs-section-header">\n\
                    <div class="vbs-section-title">\n\
                        <span class="vbs-section-name vbs-sna">audio</span>\n\
                        <span class="vbs-section-name vbs-snv"></span>\n\
                        <span class="vbs-time"><span class="vbs-ctime">00:00:00</span> / <span class="vbs-ftime">00:00:00</span></span>\n\
                        <span class="vbs-voice-name"></span>\n\
                    </div>\n\
                    <div class="vbs-section-btns"><ul class="vbs-clearfix">';
                    tmpl += VB.settings.vbsButtons.downloadMedia ? '<li><a href="#" class="vbs-download-audio-btn" format="pdf" data-title="Download Recording"></a></li>' : '';
                    tmpl += VB.settings.vbsButtons.remove ? '<li><a href="#" class="vbs-del-btn" data-title="Delete Recording"></a><div class="vbs-download-popup vbs-delete-popup vbs-popup"><div class="vbs-arrow"></div><h3>Are you sure you want to delete this recording?</h3><a href="#" class="vbs-red-btn">Delete</a><a href="#" class="vbs-blue-btn">Cancel</a></div></li>' : '';
                    tmpl += VB.settings.vbsButtons.favorite ? '<li><a href="#" class="vbs-star-btn"></a></li>' : '';
                    tmpl += VB.settings.vbsButtons.help ? '<li><a href="#" class="vbs-help-btn" data-title="Help"></a></li>' : '';
                    tmpl += '</ul></div>\n\
                    <div class="clear-block"></div>\n\
                </div>\n\
                <div class="vbs-section-body"></div>\n\
            </div>';
                    return tmpl;
                case('vbs-controls'):
                    var vrpbc = VB.settings.vbsButtons.prev && VB.settings.vbsButtons.next ? ' vbs-3-left-btns' : VB.settings.vbsButtons.prev || VB.settings.vbsButtons.next ? ' vbs-2-left-btns' : ' vbs-1-left-btns';
                    tmpl = '<div class="vbs-record-player' + vrpbc + '">\n\
                <div class="vbs-player-control">\n\
                    <a href="#" class="vbs-play-btn" data-title="Play"></a>';
                    tmpl += VB.settings.vbsButtons.prev ? '<a href="#" class="vbs-prev-btn" data-title="Back 15 Seconds"></a>' : '';
                    tmpl += VB.settings.vbsButtons.next ? '<a href="#" class="vbs-next-action-btn vbs-next-notactive" data-title="Next Keyword Marker"></a>' : '';
                    tmpl += '</div>\n\
                <div class="vbs-time-name-wrapper-narrow">\n\
                    <span class="vbs-time"><span class="vbs-ctime">00:00:00</span> / <span class="vbs-ftime">00:00:00</span></span> <br>\n\
                    <span class="vbs-voice-name"></span>\n\
                </div>\n\
                <div class="vbs-timeline">\n\
                    <div class="vbs-record-preview">\n\
                        <div class="vbs-record-timeline-wrap">\n\
                            <div class="">\n\
                                <div class="vbs-dragger"></div>\n\
                                <div class="vbs-record-timeline"></div>\n\
                                <div class="vbs-record-progress"></div>\n\
                                <div class="vbs-speakers"></div>\n\
                                <div class="vbs-player-slider"></div>\n\
                                <div class="vbs-record_buffer"></div>\n\
                                <div class="vbs-utterance-markers"></div>\n\
                            </div>\n\
                            <!--markers-->\n\
                            <div class="vbs-markers"></div>\n\
                            <div class="vbs-custom-markers"></div>\n\
                            <!-- / markers-->\n\
                            <div class="vbs-markers-hovers"></div>\n\
                            <div class="vbs-comments-wrapper-block"></div>\n\
                            <div class="vbs-record-disabler" style="width: 0%;"></div>\n\
                        </div>\n\
                    </div>\n\
                </div>';
                    tmpl += VB.settings.vbsButtons.share ? '<div class="vbs-share-btn-wrapper"><a href="#" class="vbs-share-btn vbs-popup-btn" data-title="Share"></a></div>' : '';
                    tmpl += '<div class="vbs-volume-toolbar">\n\
                    <a href="#" class="vbs-volume-btn" data-title="Volume"></a>\n\
                    <div class="vbs-volume-toolbar-block" style="display: none;">\n\
                        <div class="vbs-volume-slider">\n\
                            <div class="vbs-volume-slider-bg"></div>\n\
                            <div class="vbs-volume-slider-full"></div>\n\
                            <div class="vbs-volume-slider-handler"></div>\n\
                        </div>\n\
                    </div>\n\
                </div>\n\
            </div>';
                    return tmpl;
                case('vbs-searchbar-outer'):
                    tmpl = '' +
                        '<div id="vbs-searchbar-block">' +
                        '<div class="vbs-search-form vbs-no-speaker">' +
                        '<form action="#" id="vbs-search-form">' +
                        '<div class="vbs-widget-wrap">' +
                        '<div class="vbs-widget">' +
                        '<input name="get_voice_search" value="" size="20" id="vbs-voice_search_txt" class="vbs-formfields" type="text" placeholder="Search Keywords..." autocomplete=off>' +
                        '<div id="vbs-search-string">' +
                        '<div class="vbs-marquee">' +
                        '<div class="vbs-search-word-widget"></div>' +
                        '</div>' +
                        '</div>';
                    tmpl += VB.settings.vbsButtons.pwrdb ? '<span class="vbs-powered-by-label">Powered by VoiceBase</span>' : '';
                    tmpl += '</div>' +
                        '<a href="#" id="vbs-clear-string" title="Clear String"></a>' +
                        '</div>';
                    if(VB.settings.vbsButtons.unquotes) {
                        tmpl +='<a href="javascript:void(0)" class="vbs-unquote-btn">Unquoted</a>';
                    }
                        tmpl +='<div class="vbs-search-btn" data-title="Search">' +
                        '   <button type="submit"></button>' +
                        '</div>' +
                        '</form>' +
                        '</div>' +
                        '</div>';
                    return tmpl;
                case('vbs-keywords'):
                    tmpl = '<div class="vbs-keywords-block ' + addTabClasses() + '">\n\
                <div class="vbs-section-header">\n\
                    <div class="vbs-section-title" data-title="Hide Keywords">\n\
                        <span class="vbs-section-name">Keywords</span>\n\
                    </div>\n\
\n\
                    <div class="vbs-search-form vbs-no-speaker ';
                    tmpl += VB.settings.vbsButtons.evernote && typeof filepicker !== 'undefined' ? 'vbs-one-btn' : 'vbs-no-btns';
                    tmpl += '">';
                    if(!VB.settings.searchBarOuter){
                        tmpl += '<form action="#" id="vbs-search-form">\n\
                            <div class="vbs-widget-wrap">\n\
                                <div class="vbs-widget">\n\
                                    <input name="get_voice_search" value="" size="20" id="vbs-voice_search_txt" class="vbs-formfields" type="text" placeholder="Search Keywords..." autocomplete=off>\n\
                                    <div id="vbs-search-string">\n\
                                        <div class="vbs-marquee">\n\
                                            <div class="vbs-search-word-widget"></div>\n\
                                        </div>\n\
                                    </div>';
                        tmpl += VB.settings.vbsButtons.pwrdb ? '<span class="vbs-powered-by-label">Powered by VoiceBase</span>' : '';
                        tmpl += '</div>\n\
                             <a href="#" id="vbs-clear-string" title="Clear String"></a>\n\
                            </div>';
                    if(VB.settings.vbsButtons.unquotes) {
                        tmpl +='<a href="javascript:void(0)" class="vbs-unquote-btn">Unquoted</a>';
                    }
                    tmpl +='<div class="vbs-search-btn" data-title="Search">\n\
                                    <button type="submit"></button>\n\
                            </div>';
                        tmpl += '</form>';
                    }
                    tmpl += '<div class="vbs-select-speaker-wrapper">\n\
                        <div class="vbs-select-speaker">Select speaker...</div>\n\
                        <ul class="vbs-select-dropdown"></ul>\n\
                    </div>';
                    tmpl += '</div>';
                    // keywords buttons
                    var buttons_li = '';
                    if(VB.settings.vbsButtons.evernote && typeof filepicker !== 'undefined'){
                        buttons_li += '<li><a href="#" class="vbs-evernote-btn" data-title="Send to Evernote"></a></li>';
                    }
                    if(buttons_li){
                        tmpl += '<div class="vbs-section-btns"><ul>';
                        tmpl += buttons_li;
                        tmpl += '</ul></div>';
                    }
                    tmpl += '<div class="clear-block"></div>\n\
                </div>\n\
                <!-- / section header-->\n\
\n\
                <div class="vbs-section-body">\n\
                    <div class="vbs-keywords-wrapper vbs-scroll" style="{{ styles }}">\n\
                        <div class="vbs-topics"></div>\n\
                        <div class="vbs-keywords-list-wrapper">\n\
                            <div class="vbs-keywords-list-tab"></div>\n\
                        </div>\n\
                        <div class="clear-block"></div>\n\
                    </div>';
                    tmpl += VB.settings.showMore ? '<div class="vbs-more-btn"><a href="#">Show More...</a></div>' : '';
                    tmpl += '\n\
                </div>\n\
            </div>';
                    return tmpl;
                case('vbs-edit-trans-mode'):
                    var html = '<div class="vbs-edit-mode-wrapper">\n\
                <div class="vbs-controls-wrapper">\n\
                    <div id="vbs-controls" class="vbs-controls-box">\n\
                        <div class="vbs-edition-btns vbs-clearfix">';
/*
                            html += '<a href="#" class="vbs-edition-btn" id="vbs-edit-revert-btn">Revert</a>\n\
                            <a href="#" class="vbs-edition-btn" id="vbs-edit-upload-btn">Upload</a>\n\
                            <div class="vbs-edit-two-btns">\n\
                                <a href="#" class="vbs-edition-btn" id="vbs-edit-skip-note-btn">Skip to Next Note</a>\n\
                                <a href="#" class="vbs-edition-btn" id="vbs-edit-next-note-btn">Add/Edit Note</a>\n\
                            </div>\n\
                            <div class="vbs-edit-two-btns">\n\
                                <a href="#" class="vbs-edition-btn" id="vbs-edit-undo-btn">Undo</a>\n\
                                <a href="#" class="vbs-edition-btn" id="vbs-edit-redo-btn">Redo</a>\n\
                            </div>';
*/
                    html += '<div class="vbs-save-exit-btns">\n\
                                <a href="#" class="vbs-save-btn vbs-save-edition-popup-trigger" id="vbs-save-edition-popup-trigger">Save & Re-sync</a>\n\
                                <a href="#" class="vbs-exit-btn vbs-edit-mode-exit">Exit</a>\n\
                            </div>\n\
                        </div>\n\
                        <div class="vbs-record-player vbs-3-left-btns">\n\
                            <div class="vbs-player-control">\n\
                                <a href="#" class="vbs-play-btn" data-title="Play"></a>\n\
                                <a href="#" class="vbs-prev-btn" data-title="Back 15 Seconds"></a>\n\
                                <a href="#" class="vbs-next-action-btn vbs-next-notactive" data-title="Next Keyword Marker"></a>\n\
                            </div>\n\
                            <div class="vbs-time-name-wrapper-narrow" style="opacity: 0;">\n\
                                <span class="vbs-time">\n\
                                    <span class="vbs-ctime">00:00:00</span> / <span class="vbs-ftime">00:04:03</span>\n\
                                </span> <br>\n\
                                <span class="vbs-voice-name"></span>\n\
                            </div>\n\
                                <div class="vbs-timeline">\n\
                                    <div class="vbs-record-preview">\n\
                                        <div class="vbs-record-timeline-wrap">\n\
                                            <div class="">\n\
                                                <div class="vbs-dragger"></div>\n\
                                                <div class="vbs-record-timeline"></div>\n\
                                                <div class="vbs-record-progress" style="width: 0%;"></div>\n\
                                                <div class="vbs-speakers"></div>\n\
                                                <div class="vbs-player-slider" style="left: 0%;"></div>\n\
                                                <div class="vbs-record_buffer"></div>\n\
                                            </div>\n\
                                            <!--markers-->  \n\
                                            <div class="vbs-markers"></div>\n\
                                            <!-- / markers-->\n\
                                            <div class="vbs-markers-hovers"></div>\n\
                                            <div class="vbs-comments-wrapper-block"></div>\n\
                                            <div class="vbs-record-disabler" style="width: 0%;"></div>\n\
                                        </div>\n\
                                    </div>\n\
                                </div>\n\
                                <div class="vbs-volume-toolbar">\n\
                                    <a href="#" class="vbs-volume-btn" data-title="Volume"></a>\n\
                                    <div class="vbs-volume-toolbar-block" style="display: none;">\n\
                                        <div class="vbs-volume-slider">\n\
                                            <div class="vbs-volume-slider-bg"></div>\n\
                                            <div class="vbs-volume-slider-full"></div>\n\
                                            <div class="vbs-volume-slider-handler"></div>\n\
                                        </div>\n\
                                    </div>\n\
                                </div>\n\
                            </div>\n\
                        </div>\n\
                    </div>\n\
                    <div class="vbs-edit-instr vbs-clearfix">\n\
                    <div class="vbs-mouse-btns-desc">\n\
                        <span><b>Left click</b> on text to <em>Edit</em></span>\n\
                        <span><b>Right click</b> on text to <em>Menu</em></span>\n\
                    </div>\n\
                    </div>\n\
                <div class="vbs-edition-block" contenteditable="true">\n\
                    {{ ourtranscript }}\n\
                </div>\n\
                <div class="vbs-popup-overlay vbs-save-popup-wrapper">\n\
                    <div class="vbs-save-popup">\n\
                        <h2>Unsaved Changes</h2>\n\
                        <p class="vbs-normal-save-message">You have unsaved changes that will be lost unless you save them.</p>\n\
                        <p class="vbs-save-message-short-editing">Edited transcript is too short relative to the original and may be rejected by the system. Attempt to save?</p>\n\
                        <p class="vbs-save-message-long-editing">Edited transcript is too long relative to the original and may be rejected by the system. Attempt to save?</p>\n\
                        <a href="#" class="vbs-save-btn vbs-save-edition-btn">Save Changes</a>\n\
                        <a href="#" class="vbs-exit-btn vbs-discard-edition-btn" >Discard Changes</a>\n\
                        <a href="#" class="vbs-exit-btn vbs-cancel-edition-btn">Cancel</a>\n\
                    </div>\n\
                    <div class="vbs-save-done-popup">\n\
                        <div class="vbs-save-done-img"></div>\
                        <h3>Done!</h3>\n\
                    </div>\n\
                    <div class="vbs-save-loading-popup">\n\
                        <div class="vbs-ajax-loader"></div>\n\
                        <h3>Saving & Re-syncing!</h3>\n\
                        <p>This may take a little time, especially if you’re editing a longer transcript.</p>\n\
                    </div>\n\
                </div>\n\
                </div>';
                    return html;
                case('vbs-transcript'):
                    var resizing_style = !VB.settings.showMore ? 'vbs-no-showmore-btn' : '';
                    tmpl = '<div class="vbs-transcript-block ' + resizing_style + addTabClasses() + '">\n\
                    <div class="vbs-edit-mode-prewrapper"></div>\n\
        <div class="vbs-section-header">\n\
            <div class="vbs-section-title">\n\
                <span class="vbs-section-name vbs-snh">human transcript</span>\n\
                <span class="vbs-section-name vbs-snm">machine transcript</span>\n\
            </div>';
                    tmpl += VB.settings.vbsButtons.orderTranscript ? '<div class="vbs-order-human-trans" data-title="See Transcript Price & Options"><a href="#" target="_blank">Order Human Transcript</a></div>' : '';
                    tmpl += '<div class="vbs-section-btns">\n\
                <ul class="vbs-clearfix">';
                    tmpl += VB.settings.vbsButtons.downloadTranscript ? '<li><a href="#" class="vbs-cloud-btn vbs-popup-btn" data-title="Download Transcript"></a>\n\
                <div class="vbs-download-popup vbs-popup">\n\
                    <div class="vbs-arrow"></div>\n\
                    <h3>Download transcript</h3>\n\
                    <a href="#pdf" class="vbs-donwload-pdf" format="pdf">PDF</a>\n\
                    <a href="#rtf" class="vbs-donwload-rtf" format="rtf">RTF</a>\n\
                    <a href="#srt" class="vbs-donwload-srt" format="srt">SRT</a>\n\
                </div>\n\
                </li>' : '';
                    tmpl += VB.settings.vbsButtons.edit ? '<li><a href="#" class="vbs-edit-btn" data-title="Edit Transcript"></a></li>' : '';
                    tmpl += VB.settings.vbsButtons.print ? '<li><a href="#" class="vbs-print-btn" data-title="Print Transcript"></a></li>' : '';
                    tmpl += VB.settings.vbsButtons.readermode ? '<li><a href="#" class="vbs-readermode-btn" data-title="Reader Mode"></a></li>' : '';
                    tmpl += '</ul>\n\
            </div>\n\
        </div>\n\
        <div class="vbs-section-body">\n\
           <!-- transcript-->\n\
            <div class="vbs-transcript-prewrapper vbs-resizable"><div class="vbs-transcript-wrapper"></div></div>\n\
            <!-- / transcript-->\n\
            ';

                    tmpl += VB.settings.showMore ? '<div class="vbs-more-btn"><a href="#">Show More...</a></div>' : '';

                    tmpl += '\n\
        </div>\n\
    </div>';

                    return tmpl;

                case('vbs-comments'):
                    tmpl = '\n\
                <div class="vbs-comments-block ' + addTabClasses() + '">\n\
                    <div class="vbs-section-header">\n\
                        <div class="vbs-section-title" data-title="Show Comments">\n\
                            <span class="vbs-section-name"></span>\n\
                        </div>\n\
                        <div class="vbs-section-btns">\n\
                            <ul class="vbs-clearfix">\n\
                                <li>';
                    if(VB.settings.tabView){
                        tmpl += '<a href="#" class="vbs-comments-btn vbs-popup-btn" data-title="Add a Comment">' +
                            '<div class="vbs-comments-btn-icon"></div>' +
                            '<span>Add New Comment</span>' +
                        '</a>';
                    }
                    else{
                        tmpl += '<a href="#" class="vbs-comments-btn vbs-popup-btn" data-title="Add a Comment"></a>';
                    }
                                tmpl += '</li>\n\
                            </ul>\n\
                        </div>\n\
                    </div>\n\
                    <!--wrapper for comments content-->\n\
                    <div class="vbs-section-body"></div>\n\
                </div>';
                    return tmpl;
                case('vbs-news'):
                    tmpl = '\n\
                <div class="vbs-news-block ' + addTabClasses() + '">\n\
                    <div class="vbs-section-header">\n\
                        <div class="vbs-section-title" data-title="Show News">\n\
                            <span class="vbs-section-name">\
                                <span>News stories</span>\
                                <span class="vbs-news-words-wrapper">\
                                    <span class="vbs-small-text"> related to </span>\
                                    <span class="vbs-news-words"></span>\
                                </span>\
                            </span>\n\
                        </div>\n\
                    </div>\n\
                    <!--wrapper for news content-->\n\
                    <div class="vbs-section-body">\n\
                        <div class="vbs-news-wrapper vbs-scroll">\n\
                        </div>\n\
                    </div>\n\
                </div>';
                    return tmpl;
                case('vbs-news-elem'):
                    tmpl = '';
                    tmpl += '<a href="{{ url }}" target="_blank" class="vbs-news-elem">' +
                        '<div class="vbs-news-elem-title">{{ title }}</div>' +
                        '<div class="vbs-news-elem-body">' +
                        '   <span class="vbs-news-elem-source">{{ source }}</span>' +
                        '   <span>&nbsp;-&nbsp;</span>' +
                        '   <span class="vbs-news-elem-time">{{ time }}</span>' +
                        '</div>' +
                    '</a>';
                    return tmpl;

                case('vbs-empty-news'):
                    tmpl = '<div class="empty_news_message">{{ message }}</div>';
                    return tmpl;

                case("disabler"):
                    return '<div class="vbs-disabler"></div>';

                case("reloadOverlay"):
                    tmpl =  '<div class="vbs-reload-overlay">\n\
                    <div class="vbs-reload-message-wrapper vbs-clearfix">\n\
                    <div class="vbs-reload-message"><a href="javascript:void(0)" class="overlay_dismiss">&times;</a><span>Some details were not load</span></div>\n\
                        <a href="javascript:location.reload();" class="vbs-reload-btn"></a>\n\
                    </div>\n\
                    </div>';
                    return tmpl;

                case("reloadOverlayCredentials"):
                    tmpl =  '<div class="vbs-reload-overlay">\n\
                    <div class="vbs-reload-message-wrapper vbs-large-error-text vbs-clearfix">\n\
                    <div class="vbs-reload-message">\n\
                        <a href="javascript:void(0)" class="overlay_dismiss">&times;</a>\n\
                        <span>Could not load recording data, indexing file may not be complete. If reload does not solve problem contact support for assistance</span></div>\n\
                        <a href="javascript:location.reload();" class="vbs-reload-btn"></a>\n\
                    </div>\n\
                    </div>';
                    return tmpl;

                case("sharePopup"):
                    tmpl = '<div class="vbs-share-popup vbs-popup" style="display: block;">\n\
                        <div class="vbs-arrow"></div>\n\
\n\
                        <div class="vbs-share-radio-row vbs-clearfix vbs-checked">\n\
                            <input type="radio" name="share-opt" value="share-position" id="vbs-share-position" checked="checked">\n\
                            <label for="vbs-share-position">\n\
                                Share position <span class="vbsp-time" vbct="{{ vbt }}">{{ vbspTime }}</span> <br>\n\
                                <span class="vbs-explanation">Drag the timeline to change</span>\n\
                            </label>\n\
                            <a href="#" class="vbs-play-btn"></a>\n\
                        </div>\n\
\n\
                        <div class="vbs-share-radio-row vbs-clearfix">\n\
                            <input type="radio" name="share-opt" value="share-search" id="vbs-share-search">\n\
                            <label for="vbs-share-search">\n\
                                Share search  <br>\n\
                                <span class="vbs-explanation">The current search or keyword  selected</span>\n\
                            </label>\n\
                        </div>\n\
\n\
                        <div class="vbs-share-radio-row vbs-clearfix">\n\
                            <input type="radio" name="share-opt" value="share-file" id="vbs-share-file">\n\
                            <label for="vbs-share-file">Share file from start</label>\n\
                        </div>\n\
\n\
                        <div class="vbs-link-row vbs-clearfix {{ zclip }}">\n\
                            <input type="text" id="vbsp-url" class="vbsp-url" value="{{ url }}" >\n\
                            <a href="#" class="vbs-copy-btn">Copy</a>\n\
                        </div>\n\
\n\
                        {{ addthis }}\n\
\n\
                        <div class="vbs-share-footer">\n\
                            {{ vbShareButton }}<a href="#" class="vbs-cancel-btn">Cancel</a>\n\
                        </div>\n\
                    </div>';
                    return tmpl;

                case("commentPopup"):
                    tmpl = '\n\
                    <div class="vbs-comments-popup vbs-comments-add-popup vbs-popup">\n\
                        <div class="vbs-arrow"></div>\n\
                        <div class="vbs-comment-popup-row vbs-clearfix">\n\
                            <label>\n\
                                Comment position: <span class="vbs-time" id="vbs-comment-timeline" vbct="{{ vbt }}">{{ vbspTime }}</span> <br>\n\
                                <span class="vbs-explanation">Drag the timeline to change</span>\n\
                            </label>\n\
                            <a href="#" class="vbs-play-btn"></a>\n\
                        </div>\n\
                        <div class="vbs-enter-comment-row">\n\
                            <textarea id="vbs-comment-text" placeholder="Enter your comment..."></textarea>\n\
                        </div>\n\
                        <div class="vbs-comment-footer">\n\
                            <a href="#" class="vbs-cancel-btn">Cancel</a>\n\
                            <a href="#" class="vbs-confirm-btn">Add comment</a>\n\
                        </div>\n\
                    </div>';
                return tmpl;

                case("commentDeletePopup"):
                    tmpl = '<div class="vbs-comments-popup vbs-popup vbs-comment-delete-popup">\n\
                                <div class="vbs-arrow"></div>\n\
                                <span>Delete This Comment?</span>\n\
                                <div class="vbs-comment-footer">\n\
                                    <a href="#" class="vbs-cancel-btn" c_id="{{ c_id }}">Yes, Delete</a>\n\
                                    <a href="#" class="vbs-confirm-btn">No, Cancel</a>\n\
                                </div>\n\
                            </div>';
                    return tmpl;

                case("commentReplyPopup"):
                    tmpl = '\n\
                    <div class="vbs-comments-popup vbs-popup">\n\
                        <div class="vbs-arrow"></div>\n\
                        <div class="vbs-enter-comment-row">\n\
                            <textarea id="vbs-comment-reply-text" placeholder="Enter your comment..."></textarea>\n\
                        </div>\n\
                        <div class="vbs-comment-footer">\n\
                            <a href="#" class="vbs-cancel-btn">Cancel</a>\n\
                            <a href="#" c_id={{ c_id }} class="vbs-confirm-btn">Add comment</a>\n\
                        </div>\n\
                    </div>';
                    return tmpl;

                case("commentEditFirstPopup"):
                    tmpl = '\n\
                    <div class="vbs-comments-popup vbs-popup">\n\
                        <div class="vbs-arrow"></div>\n\
                        <div class="vbs-comment-popup-row vbs-clearfix">\n\
                            <label>\n\
                                Comment position: <span class="vbs-time" id="vbs-comment-timeline" vbct="{{ vbt }}">{{ vbspTime }}</span> <br>\n\
                                <span class="vbs-explanation">Drag the timeline to change</span>\n\
                            </label>\n\
                            <a href="#" class="vbs-play-btn"></a>\n\
                        </div>\n\
                        <div class="vbs-enter-comment-row">\n\
                            <textarea id="vbs-comment-text" placeholder="Enter your comment...">{{ commentText }}</textarea>\n\
                        </div>\n\
                        <div class="vbs-comment-footer">\n\
                            <a href="#" class="vbs-cancel-btn">Cancel</a>\n\
                            <a href="#" class="vbs-confirm-btn" c_id="{{ c_id }}">Save Changes</a>\n\
                        </div>\n\
                    </div>';
                    return tmpl;

                case("commentEditPopup"):
                    tmpl = '\n\
                    <div class="vbs-comments-popup vbs-popup vbs-edit-wr">\n\
                        <div class="vbs-arrow"></div>\n\
                        <div class="vbs-enter-comment-row">\n\
                            <textarea id="vbs-comment-text" placeholder="Enter your comment...">{{ commentText }}</textarea>\n\
                        </div>\n\
                        <div class="vbs-comment-footer">\n\
                            <a href="#" class="vbs-cancel-btn">Cancel</a>\n\
                            <a href="#" class="vbs-confirm-btn" c_id="{{ c_id }}">Save Changes</a>\n\
                        </div>\n\
                    </div>';
                    return tmpl;

                case("renameSpeakerPopup"):
                    tmpl = '\n\
                    <div class="vbs-rename-speaker-popup vbs-common-popup">\n\
                        <div class="vbs-arrow"></div>\n\
                        <div class="vbs-common-popup-header vbs-clearfix">\n\
                            <div class="rename_speaker_label">Rename speaker</div>\
                            <div class="vbs-old-speaker-name">{{ current_speaker_name }}</div>\
                            <div class="rename_speaker_label">to:</div>\
                        </div>\n\
                        <div class="vbs-common-popup-body">\n\
                            <input type="text" id="vbs-rename_speaker_input" data-vbs-validate="required" data-old-speaker-key="{{ current_speaker_key }}" placeholder="Enter new speaker name"/>\
                        </div>\n\
                        <div class="vbs-common-popup-footer">\n\
                            <a href="#" class="vbs-cancel-btn">Cancel</a>\n\
                            <a href="#" class="vbs-confirm-btn">Rename</a>\n\
                        </div>\n\
                    </div>\n';
                    return tmpl;

                case("insertSpeakerPopup"):
                    tmpl = '\n\
                    <div class="vbs-insert-speaker-popup vbs-common-popup">\n\
                        <div class="vbs-arrow"></div>\n\
                        <div class="vbs-common-popup-header vbs-clearfix">\n\
                            <div class="rename_speaker_label">Insert speaker</div>\
                        </div>\n\
                        <div class="vbs-common-popup-body">\n\
                            <div class="vbs-select-wrapper vbs-select-insert-speaker-wrapper">\n\
                                <div class="vbs-select-title vbs-select-insert-speaker vbs-new-speaker">\
                                    <div class="vbs-speaker-selected">Insert new speaker</div>\
                                </div>\n\
                                <ul class="vbs-select-dropdown"></ul>\n\
                            </div>\n\
                            <div class="vbs-speaker-input-wrapper">\
                                <input type="text" data-vbs-validate="required,ignore[invisible]" class="vbs-insert-speaker-input" value="" placeholder="Enter speaker name"/>\
                            </div>\
                        </div>\n\
                        <div class="vbs-common-popup-footer">\n\
                            <a href="#" class="vbs-cancel-btn">Cancel</a>\n\
                            <a href="#" class="vbs-confirm-btn">Insert</a>\n\
                        </div>\n\
                    </div>\n';
                    return tmpl;

                case("categoriesLiTemplate"):
                    return '<li class="{{liclass}}"><a href="javascript:void(0);" speakers="{{ speakers }}">{{ title }}</a><div class="vbs-topic-del-btn-wrap"><i class="vbs-cross-btn vbs-popup-btn"></i></div></li>';

                case("newCategoriesLiTemplate"):
                    return '<li {{ keyclass }}><a href="javascript:void(0);" t="{{ times }}" in="{{ internalName }}" speakers="{{ speakers }}" {{ sptimes }}>{{ title }}</a></li>';

                case("categoriesKeywords"):
                    return '<div class="category">' +
                        '<h3>{{ cattitle }} (<span class="ccount">{{ count }}</span>)</h3>' +
                        '<div class="new-topics">' +
                        '<ul>{{ lis }}</ul>' +
                        '<div class="clearblock"></div>' +
                        '</div>' +
                        '</div>';

                case("keywordsTemplate"):
                    return '<li {{ keyclass }}>' +
                        '<a href="#" t="{{ times }}" speakers="{{ speakers }}" {{ sptimes }}>{{ name }}</a>{{ keycounter }}' +
                        '</li>';

                case("markerTemplate"):
                    return '<a href="#" class="vbs-marker" style="border-bottom-color:{{ stcolor }}; z-index:91; left:{{ position }}px;" stime="{{ time }}"><ins></ins></a>' +
                        '<span ctime="{{ time }}" class="vbs-comment">{{ phrase }}</span>';

                case("customMarkerTemplate"):
                    return '<a href="#" class="vbs-marker vbs-custom-marker" style="z-index:91; left:{{ position }}px;" stime="{{ time }}"><ins></ins></a>' +
                        '<span ctime="{{ time }}" class="vbs-comment">{{ phrase }}</span>';

                case("markerKeyTemplate"):
                    return '<a href="#" class="vbs-marker key" style="z-index:91; left:{{ position }}px;" stime="{{ time }}"><ins></ins></a>';

                case("searchWordTemplate"):
                    return '' +
                        '<span class="vbs-word">' +
                        '   <em>' +
                        '       <dfn style="border-bottom-color: {{ color }};" class="vbs-marker"><ins></ins></dfn>' +
                        '       {{ clean_word }}' +
                        '       <span class="vbs-search_word" style="display:none">{{ word }}</span>' +
                        '   </em>' +
                        '</span>';

                case("mainDiv"):
                    tmpl = '<!--media-->\n\
<div id="vbs-media"></div>\n\
<!--controls-->\n\
<div id="vbs-controls"></div>';
                    if(!VB.settings.tabView){
                        tmpl += '<!--keywords-->\n\
                        <div id="vbs-keywords"></div>';
                        if(VB.settings.showNewsBlock){
                            tmpl += '<!--news-->\n\
                            <div id="vbs-news"></div>';
                        }
                        tmpl += '<!-- transcript -->\n\
                        <div id="vbs-transcript"></div>\n\
                        <!-- comments -->\n\
                        <div id="vbs-comments"></div>';
                    }
                    else{
                        tmpl += '<!-- tabs-->\n<div class="vbs-not-media-sections vbs-tabs-view">\n' +
                            '    <div class="vbs-tabs-links vbs-clearfix">\n';
                        if(VB.settings.showKeywordsBlock){
                            tmpl += '        <a href="#" data-href=".vbs-keywords-block" class="vbs-active">Keywords</a>\n';
                        }
                        if(VB.settings.showTranscriptBlock){
                            tmpl += '        <a href="#" data-href=".vbs-transcript-block">Transcript</a>\n';
                        }
                        if(VB.settings.showCommentsBlock){
                            tmpl += '        <a href="#" data-href=".vbs-comments-block">Comments</a>\n';
                        }
                        tmpl += '</div>\n' +
                            '    <!--keywords-->\n' +
                            '    <div id="vbs-keywords"></div>\n' +
                            '    <!-- transcript -->\n' +
                            '    <div id="vbs-transcript"></div>\n' +
                            '    <!-- comments -->\n' +
                            '    <div id="vbs-comments"></div>\n' +
                            '</div>\n';
                    }
                    return tmpl;

                case("speakersTemplate"):
                    return '<div class="vbs-speaker {{ colorclass }}" rel="tooltip" data-plcement="top" style="width: {{ width }}px; left: {{ position }}px;" s="{{ s }}" e="{{ e }}" cnum="{{ colorclass }}"></div>';

                case("speakersAllFilter"):
                    return '<div id="speakers-block" speakerlist="{{ speakerlist }}" style="{{ style }}"><div class="current-speaker"><h3 data-speaker="all">All speakers</h3></div><div class="speakers-list">Click to drill down into what {{ speakers_links }} talked about, or see keywords for <a href="#all" data-speaker="all">All Speakers</a></div><div style="clear: both;"></div></div>';

                case("speakersFilter"):
                    return '<div id="speakers-block" speakerlist="{{ speakerlist }}" style="{{ style }}"><div class="current-speaker"><h3 data-speaker="{{ curspeaker }}">{{ curspeaker }}</h3></div><div class="speakers-list">Click to drill down into what {{ speakers_links }} talked about, or see keywords for <a href="#all" data-speaker="all">All Speakers</a></div><div style="clear: both;"></div></div>';

                case("deleteTopicPopup"):
                    tmpl = '<div class="vbs-comments-popup vbs-popup vbs-topic-delete-popup" data-topic="{{ topicname }}">\n\
                            <div class="vbs-arrow"></div>\n\
                            <span>Delete Topic?</span>\n\
                            <div class="vbs-comment-footer">\n\
                                <a href="#" class="vbs-cancel-btn">Yes</a>\n\
                                <a href="#" class="vbs-confirm-btn">No</a>\n\
                            </div>\n\
                        </div>';
                    return tmpl;

                case("vbsCommentsTimeline"):
                    tmpl = '<div class="vbs-comments-wrapper {{ rightClass }}" style="left:{{ position }}px;" stime="{{ stime }}">\n\
                            <div class="vbs-comment-small"></div>\n\
                            <div class="vbs-comment-preview"><a href="#" stime="{{ stime }}">{{ commentText }}</a></div>\n\
                        </div>';
                    return tmpl;

                case("alertPopup"):
                    tmpl = '<div class="vbs-alert_popup" data-action="{{ action }}"><div class="modalDialog_transparentDivs" style="left: 0px; top: 0px; display: block; width: 1925px; height: 662px;"></div>\n\
                <div class="modalDialog_contentDiv" id="DHTMLSuite_modalBox_contentDiv" style="display: block; width: 433px; left: 744px; top: 267px;"><div class="popup"><!--[if lt IE 7]><iframe></iframe><![endif]--><div class="inpopup"><a href="#" class="modal_close" alt="Close" title="Close"></a><h4>Delete Confirmation</h4><p>Do you really want to remove this topic with keywords?</p><div class="voicebase_buttons"><span><a href="#" class="modal_confirm">Confirm Delete</a></span><ins><a href="#" class="modal_cancel">Cancel Delete</a></ins></div><div class="fixer">&nbsp;</div></div></div></div></div>';
                    return tmpl;

                case("errorPopup"):
                    return '' +
                        '<div class="vbs-white-popup-overlay">' +
                        '   <div class="vbs-big-error-popup">' +
                        '       <a href="javascript:void(0)" class="overlay_dismiss">&times;</a>'+
                        '       <h2>Could not load recording data</h2>' +
                        '       <p>Indexing file may not be complete. If reloading does not solve the problem, please contact support for assistance.</p>' +
                        '       <a href="javascript:location.reload();" class="vbs-reload-btn"></a>' +
                        '       <a href="http://www.voicebase.com/contact-us/" target="_blank" class="vbs-contact-support-btn"></a>' +
                        '   </div>' +
                        '</div>';

                case("abstractErrorPopup"):
                    return '' +
                        '<div class="vbs-white-popup-overlay">' +
                            '<div class="vbs-big-error-popup">' +
                                '<a href="javascript:void(0)" class="overlay_dismiss">&times;</a>'+
                                '<h2>{{ errorTitle }}</h2>' +
                                '<p>{{ errorText }}</p>' +
                                '<a href="javascript:location.reload();" class="vbs-reload-btn"></a>' +
                                '<a href="http://www.voicebase.com/contact-us/" target="_blank" class="vbs-contact-support-btn"></a>' +
                            '</div>' +
                        '</div>';

                case("abstractAlertPopup"):
                    return '' +
                        '<div class="vbs-white-popup-overlay">' +
                            '<div class="vbs-big-error-popup">' +
                                '<h2>{{ errorTitle }}</h2>' +
                                '<p>{{ errorText }}</p>' +
                            '</div>' +
                        '</div>';

                case("textErrorMessage"):
                    return '' +
                        '<div class="vbs-text-error-message">' +
                            '<p>{{ errorText }}</p>' +
                        '</div>';

                case("infoMessage"):
                    return '' +
                        '<div class="vbs-message vbs-message-{{ mode }}">' +
                            '<p>{{ errorText }}</p>' +
                        '</div>';

                case("endSearchMessage"):
                    return '' +
                        '<div class="vbs-message vbs-message-info">' +
                            '<p>Your search is taking a long time...</p>' +
                            '<p>Please wait or click to ' +
                                '<a href="javascript:void(0)" class="vbs-cancel-search">Cancel</a>' +
                            '</p>' +
                        '</div>';

                case("utteranceBlock"):
                    return '<div class="vbs-utterance-block vbs-clearfix">'+
                        '<div class="vbs-utterance-title">'+
                        '<p>utterance detection</p>'+
                        '</div>'+
                        '<div class="vbs-utterance-list">'+
                        '<ul class="vbs-clearfix">'+
                        '</ul>'+
                        '</div>'+
                        '</div>';

                case("utteranceCheckBox"):
                    return '<li>'+
                        '<label class="vbs-utter-{{ rownum }}">'+
                        '<input type="checkbox" checked data-row="{{ rownum }}"/>{{ title }}'+
                        '<span class="vbs-utter-num">({{ segmentsCount }})</span>'+
                        '</label>'+
                        '</li>';

                case("utteranceMarker"):
                    return ''+
                        '<div class="vbs-utter-marker vbs-utter-{{ rownum }} vbs-utter-row{{ rownum }}" data-stime="{{ startTime }}" style="width:{{ width }}px; left:{{ position }}px;">' +
                        '<div class="vbs-utter-tooltip">' +
                        '<p class="vbs-utter-title">{{ title }}</p>' +
                        '<p class="vbs-utter-time">{{ time }}</p>' +
                        '</div>' +
                        '</div>';

                case("loggerBlock"):
                    return ''+
                        '<div class="vbs-logger">' +
                        '<textarea>' +
                        '{{ response }}'+
                        '</textarea>' +
                        '</div>';

                case("languageSelect"):
                    tmpl = '' +
                        '<div class="vbs-select-wrapper vbs-select-language-wrapper">\n\
                            <div class="vbs-select-title vbs-select-language">Select language...</div>\n\
                            <ul class="vbs-select-dropdown"></ul>\n\
                        </div>';
                    return tmpl;

                case("languageItem"):
                    tmpl = '' +
                        '<li data-lang-code="{{ lang_code }}">{{ lang_name }}</li>';
                    return tmpl;

                case("speakerItem"):
                    tmpl = '' +
                        '<li data-speaker-key="{{ speaker_key }}">{{ speaker_name }}</li>';
                    return tmpl;

                case("savingMessage"):
                    tmpl = '' +
                    '<div class="vbs-saving">' +
                    '   <div class="vbs-saving-inner">' +
                    '       <div class="vbs-saving-loader"></div>' +
                    '       <div class="vbs-saving-message">Saving & Re-syncing...</div>' +
                    '   </div>' +
                    '</div>';
                    return tmpl;

                case("successSavingMessage"):
                    tmpl = '' +
                    '<div class="vbs-success-saving">' +
                    '   <div class="vbs-saving-inner">' +
                    '       <div class="vbs-saving-loader"></div>' +
                    '       <div class="vbs-saving-message">Transcript Saved</div>' +
                    '   </div>' +
                    '</div>';
                    return tmpl;

                case("playlist"):
                    tmpl =  '\
                    <div class="vbs-playlist collapsed">\n\
                        <div class="vbs-selected-playlist-item">\
                            <div class="vbs-item-name"></div>\n\
                            <i></i>\n\
                        </div>\n\
                        <div class="vbs-clearfix"></div>\n\
                        <ul class="vbs-playlist-dropdown">\n\
                        </ul>\n\
                    </div>';
                    return tmpl;

                case("playlist-item"):
                    tmpl =  '\
                    <li class="vbs-playlist-item" data-playlist-item-index="{{ index }}">\n\
                        <span class="vbs-playlist-item-title">{{ title }}</span>\
                    </li>';
                    return tmpl;

                case("controlsContainer"):
                    tmpl =  '\
                    <div class="vbs-after-controls-wrapper">\
                        <div class="vbs-player-control"></div>\n\
                        <div class="vbs-share-control"></div>\n\
                    </div>';
                    return tmpl;

                default:
                    return '';
            }
        }
    };

    return VB;
})(voiceBase, jQuery);
/*
* module for form validation.
* add attribute data-vbs-validate to form field.
* Format: data-vbs-validate="sentence1,sentence2[param1,param2],ignore[sentense]"
* Example: data-vbs-validate="required,ignore[invisible]"
* You can calling validator: VB.validator.validate($form) // $form is jQuery object
* */
voiceBase = (function(VB, $) {
    "use strict";

    VB.validator = {

        validate: function($form) {
            var fields = $form.find('[data-vbs-validate]');
            var errors = [];
            fields.each(function() {
                var $field = $(this);
                var resultRules = VB.validator.getRules($field);
                var rules = resultRules.rules;
                var isIgnore = false;
                if(resultRules.ignoreRule) {
                    isIgnore = VB.validator.conditions.ignore($field, resultRules.ignoreRule.params[0]);
                }
                if(!isIgnore && rules) {
                    rules.forEach(function(rule, i) {
                        var result = VB.validator.conditions[rule.name]($field, rule.params);
                        if(!result){
                            var msg = VB.validator.getMessage(rule.name, rule.params);
                            errors.push({
                                field: $field,
                                rule: rule.name,
                                message: msg
                            });
                        }
                    });
                }
            });

            if(errors.length > 0) {
                VB.validator.clearMessages($form);
                VB.validator.showMessages(errors);
                return false;
            }

            return true;
        },

        clearMessages: function($form) {
            $form.find('.vbs-msg').remove();
        },

        showMessages: function(errors) {
            errors.forEach(function(error) {
                var $field = error.field;
                var msg = VB.validator.createMessage(error.message);
                $field.after(msg);
            });
        },

        createMessage: function(message) {
            var msg = '<div class="vbs-msg vbs-msg-alert">' + message + '</div>';
            return msg;
        },

        getRules: function($field) {
            var attr = $field.attr('data-vbs-validate');
            var result = {};
            if(attr) {
                var rules = [];
                var _rules = attr.split(',');
                _rules.forEach(function(ruleAttr) {
                    var ruleParams = ruleAttr.trim().split(/\[|,|\]/);

                    for (var i = 0; i < ruleParams.length; i++) {
                        ruleParams[i] = ruleParams[i].replace(" ", "");
                        // Remove any parsing errors
                        if (ruleParams[i] === '') {
                            ruleParams.splice(i, 1);
                        }
                    }
                    if(ruleParams.length > 0) {
                        var rule = {};
                        rule.name = ruleParams[0];
                        ruleParams.splice(0, 1);
                        rule.params = ruleParams;

                        if(VB.validator.conditions[rule.name]) {
                            if(rule.name === 'ignore') {
                                result.ignoreRule = rule;
                            }
                            else {
                                rules.push(rule);
                            }
                        }
                    }
                });
                result.rules = rules;
                return (result.rules.length > 0) ? result : null;
            }

            return null;
        },

        getValue: function($elem) {
            var value;
            switch ($elem.prop("type")) {
                case "radio":
                case "checkbox":
                    value = $elem.is(':checked');
                    break;
                default:
                    value = $elem.val();
            }
            return value;
        },

        getMessage: function(rule, params) {
            var message = (VB.validator.messages[rule]) ? VB.validator.messages[rule] : '';
            for (var i = 0; i < params.length; i++) {
                var rex = new RegExp("{{\\s*" + "param" + (i + 1) + "\\s*}}", "gi");
                message = message.replace(rex, params[i]);
            }
            if(message) {
                message = '* ' + message;
            }
            return message;
        },

        conditions: {
            required: function($elem) {
                var value = VB.validator.getValue($elem);
                return !!(value !== null && value !== '');
            },

            minSize: function($elem, params) {
                var size = parseInt(params[0]);
                var value = VB.validator.getValue($elem);
                var length = value.length || 0;
                return (length >= size);
            },

            maxSize: function($elem, params) {
                var size = parseInt(params[0]);
                var value = VB.validator.getValue($elem);
                var length = value.length || 0;
                return (length <= size);
            },

            visible: function($elem) {
                return $elem.is(':visible');
            },

            ignore: function($elem, type) {
                if(type === 'invisible') {
                    var isElemVisible = VB.validator.conditions.visible($elem);
                    return !isElemVisible;
                }
            }
        },

        messages: {
            required: 'This field is required',
            minSize: '{{ param1 }} characters required',
            maxSize: '{{ param1 }} characters allowed'
        }

    };

    return VB;
})(voiceBase, jQuery);
/*
* VB.view
* */
voiceBase = (function(VB, $) {
    "use strict";

    VB.view = {
        main: null,
        pluginDiv: null,
        init: function(elem) {
            this.initMainElem(elem);
            if(!VB.settings.hasPlaylist && !VB.settings.localApp){ // else initializing after player ready event
                this.initApi();
            }
            if(VB.helper.isMobile()) {
                VB.helper.renderMobile();
            }
        },
        initMainElem: function(elem){
            this.main = (elem[0].tagName === 'OBJECT' && VB.settings.playerType == 'jwplayer') ? $(elem).parent() : elem;
            var divnode = document.createElement('div');
            divnode.className = 'vbsp-' + VB.helper.randId() + ' vbs-content';
            divnode.innerHTML = VB.templates.get('mainDiv');
            this.pluginDiv = $(divnode);
            $(this.main).after(this.pluginDiv);
        },
        initApi: function(){
            VB.api.init();
            if (!VB.settings.token && !VB.settings.example && !VB.settings.localApp) {
                VB.api.getToken(VB.settings.tokenTimeOut);
            } else if (VB.settings.example && !VB.settings.localApp) {
                VB.api.getExampleToken();
            } else {
                VB.view.initWithToken();
            }
        },
        initWithToken: function() {
            VB.data.vclass = 'vbs-' + VB.helper.randId();
            $('.vbs-white-popup-overlay').remove();
            $('.vbs-text-error-message').remove();
            VB.view.renderMediaBlock();
            if(!VB.settings.localApp){
                VB.api.getMetaData();
            }
            else {
                VB.api.setLocalMetaData();
            }

            VB.view.renderControlsBlock();

            if(VB.settings.showKeywordsBlock){
                VB.view.renderKeywordsBlock();
                if(!VB.settings.localApp && !VB.helper.isApi2_0()) {
                    VB.api.getKeywords();
                }
            }
            else{
                VB.api.ready.keywords = true;
            }

            if(VB.settings.showTranscriptBlock){
                VB.view.renderTranscriptBlock();
                if(!VB.settings.localApp && !VB.helper.isApi2_0()) {
                    VB.api.getTranscript();
                }
            }
            else{
                VB.api.ready.transcript = true;
            }

            if(VB.settings.showCommentsBlock){
                VB.view.renderCommentsBlock();
                if(!VB.helper.isApi2_0()) {
                    VB.comments.getComments();
                }
            }
            else{
                VB.api.ready.comments = true;
            }

            if(VB.settings.localApp) {
                VB.view.renderLanguageBlock();
            }

            if(VB.settings.showNewsBlock){
                VB.view.renderNewsBlock();
            }

            if(VB.settings.tabView){
                VB.view.renderTabs();
            }

            checkToggleBlocks();
            checkHeaderVisibility();

            VB.data.waiter = setInterval(function() {
                if(VB.data.waiter) {
                    VB.helper.waitReady();
                }
            }, 100);
            VB.events.registerEvents();
        },
        initLocalData: function(){
            var lang_code = VB.data.localData.selected_language;

            var $keywordsBlock = $("#" + VB.settings.keywordsBlock);
            var $transcriptBlock = $("#" + VB.settings.transcriptBlock);
            if(!VB.data.localData.keywords) {
                YSP.api.getKeywords(function(data){
                    VB.data.localData.keywords = data.keywords;
                    $keywordsBlock.removeClass('vbs-loading');
                    VB.api.setKeywords(VB.data.localData.keywords[VB.data.localData.selected_language]);
                });
            }
            else{
                VB.api.setKeywords(VB.data.localData.keywords[lang_code]);
            }

            if(!VB.data.localData.transcripts) {
                YSP.api.getTranscript(function(data){
                    VB.data.localData.transcripts = data.transcripts;
                    $transcriptBlock.removeClass('vbs-loading');
                    VB.api.setTranscript(VB.data.localData.transcripts[VB.data.localData.selected_language]);
                });
            }
            else{
                VB.api.setTranscript(VB.data.localData.transcripts[lang_code]);
            }
        },
        renderControlsBlock: function(){
            var $controlsBlock = $("#" + VB.settings.controlsBlock);
            $controlsBlock.empty().html(VB.templates.get('vbs-controls')).addClass(VB.data.vclass + ' vbs-controls').css({width: VB.settings.controlsWidth});
            VB.view.setResponsiveClass($controlsBlock);
            if(!VB.settings.showControlsBlock) {
                $controlsBlock.addClass('vbs-hide-controls');
            }
        },
        renderMediaBlock: function(){
            var $mediaBlock = $("#" + VB.settings.mediaBlock);
            $mediaBlock.empty().html(VB.templates.parse('vbs-media')).addClass(VB.data.vclass).css({width: VB.settings.mediaWidth});
            VB.view.setResponsiveClass($mediaBlock);
        },
        renderTimeInMediaTitle: function(){
            var $mediaBlock = $("#" + VB.settings.mediaBlock);

            var timestring = VB.helper.parseTime(VB.data.duration); // in seconds
            VB.helper.find('.vbs-ftime').text(timestring);
            if($mediaBlock.hasClass('less-600px') || !VB.settings.hasMediaBlockHeader) {
                $('.vbs-time-in-player').find('.vbs-time').show();
            }
            else {
                $mediaBlock.find('.vbs-section-header').find('.vbs-time').show();
            }

        },
        renderKeywordsBlock: function(){
            var $keywordsBlock = $("#" + VB.settings.keywordsBlock);
            var $controlsBlock = $("#" + VB.settings.controlsBlock);

            if(!VB.settings.searchBarOuter){ // search bar in keywords block
                $keywordsBlock.empty().html(VB.templates.parse('vbs-keywords', {styles: 'height: ' + VB.settings.keywordsHeight + 'px;'})).addClass(VB.data.vclass).css({width: VB.settings.keywordsWidth});
                VB.view.setResponsiveClass($keywordsBlock);
            }
            else{
                $('#vbs-searchbar-block').remove();
                var searchBar_container = $("#" + VB.settings.searchBarBlock);
                if(searchBar_container.length > 0) {
                    searchBar_container.empty().append(VB.templates.parse('vbs-searchbar-outer'));
                }
                else {
                    $controlsBlock.after(VB.templates.parse('vbs-searchbar-outer'));
                }
                var searchBarBlock = $('#vbs-searchbar-block');
                searchBarBlock.addClass(VB.data.vclass).css({width: VB.settings.searchBarBlockWidth});
                $keywordsBlock.empty().html(VB.templates.parse('vbs-keywords', {styles: 'height: ' + VB.settings.keywordsHeight + 'px;'})).addClass(VB.data.vclass).css({width: VB.settings.keywordsWidth});
                $keywordsBlock.find('.vbs-search-form').addClass('no_border');
            }
            if(VB.settings.markersInNativeTimeline) {
                VB.view.renderControlsAfterSearchBar();
            }
            if(VB.settings.localApp) {
                $keywordsBlock.addClass('vbs-local-app vbs-loading');
                $keywordsBlock.find('.vbs-section-title').attr('data-title', 'Loading keywords');
            }
        },
        renderControlsAfterSearchBar: function() {
            if(VB.settings.searchBarOuter) {
                var searchBarBlock = $('#vbs-searchbar-block');
                searchBarBlock.addClass('vbs-controls-after-searchbar vbs-searchbar-outer');
                $('.vbs-after-controls-wrapper').remove();
                searchBarBlock.find('.vbs-search-form').after(VB.templates.get('controlsContainer'));
                $('.vbs-prev-btn,.vbs-next-action-btn').appendTo('.vbs-controls-after-searchbar .vbs-player-control');
                $('.vbs-share-btn-wrapper').appendTo('.vbs-controls-after-searchbar .vbs-share-control');
                searchBarBlock.find('.vbs-search-form').width(searchBarBlock.width() - $('.vbs-controls-after-searchbar .vbs-after-controls-wrapper').width()  - 2);
            }
            else {
                var $keywordsBlock = $('.vbs-keywords-block ');
                var $searchForm = $('.vbs-search-form');
                if($keywordsBlock.find('.vbs-section-btns').length === 0) {
                    $searchForm.after('<div class="vbs-section-btns"><ul></ul></div>');
                }
                var $sectionBtns = $keywordsBlock.find('.vbs-section-btns');
                $sectionBtns.find('.vbs-controls-after-searchbar').remove();
                $sectionBtns.addClass('vbs-controls-after-searchbar-wrapper').find('ul').append('<li class="vbs-controls-after-searchbar vbs-searchbar-inner"></li>');
                $sectionBtns.find('.vbs-controls-after-searchbar').append(VB.templates.get('controlsContainer'));
                $('.vbs-prev-btn,.vbs-next-action-btn').appendTo('.vbs-controls-after-searchbar-wrapper .vbs-player-control');
                $('.vbs-share-btn-wrapper').appendTo('.vbs-controls-after-searchbar-wrapper .vbs-share-control');
                $searchForm.removeClass('vbs-one-btn vbs-no-btns');
                if(VB.settings.vbsButtons.evernote && typeof filepicker !== 'undefined') {
                    $searchForm.addClass('vbs-four-btns');
                }
                else {
                    $searchForm.addClass('vbs-three-btns');
                }
            }
        },
        resetControlsPlace: function() {
            $('.vbs-controls-after-searchbar').find('.vbs-prev-btn').appendTo('.vbs-record-player .vbs-player-control');
            $('.vbs-controls-after-searchbar').find('.vbs-next-action-btn').appendTo('.vbs-record-player .vbs-player-control');
            $('.vbs-search-form').removeClass('vbs-four-btns vbs-three-btns');
            $('.vbs-volume-toolbar').after($('.vbs-controls-after-searchbar').find('.vbs-share-btn-wrapper'));
            if(VB.settings.searchBarOuter) {
                $('.vbs-search-form').width(295);
            }
        },
        renderTabs: function(){
            var $keywordsBlock = $("#" + VB.settings.keywordsBlock);
            var $tabs = $('.vbs-tabs-view');
            VB.view.setResponsiveClass($tabs);
            if(!$tabs.hasClass('less-600px') && !$tabs.hasClass('less-480px')) {
                $tabs.addClass('vbs-normal-width');
            }

            var $tabs_links = $('.vbs-tabs-links');
            $tabs_links.find('a').removeClass('vbs-active');
            $tabs_links.find('[data-href=".vbs-keywords-block"]').addClass('vbs-active');
            $keywordsBlock.find('.vbs-keywords-block').addClass('vbs-tab-visible');
        },
        checkEmptyHeadersForTabs: function(){
            var $tabs = $('.vbs-tabs-view');
            if(!$tabs.hasClass('vbs-normal-width')) {
                $('.vbs-tab').each(function(){
                    var $header = $(this).find('.vbs-section-header');
                    var has_speaker = ($(this).hasClass('vbs-keywords-block') && $header.find('.vbs-no-speaker').length === 0) ? true : false;
                    if(!has_speaker && $header.find('.vbs-section-btns').length === 0) {
                        $(this).addClass('vbs-tab-empty-header');
                    }
                });
            }
        },
        renderTranscriptBlock: function(){
            var $transcriptBlock = $("#" + VB.settings.transcriptBlock);
            $transcriptBlock.addClass(VB.data.vclass).empty().html(VB.templates.get('vbs-transcript')).css({width: VB.settings.transcriptWidth});
            VB.view.setResponsiveClass($transcriptBlock);
            if(VB.settings.localApp) {
                $transcriptBlock.addClass('vbs-local-app vbs-loading');
                $transcriptBlock.find('.vbs-section-title').attr('data-title', 'Loading transcript');
            }
        },
        renderCommentsBlock: function(){
            var $commentsBlock = $("#" + VB.settings.commentsBlock);
            $commentsBlock.addClass(VB.data.vclass).empty().html(VB.templates.get('vbs-comments')).css({width: VB.settings.commentsWidth});
            VB.view.setResponsiveClass($commentsBlock);
        },
        renderNewsBlock: function(){
            var $newsBlock = $("#" + VB.settings.newsBlock);
            $newsBlock.addClass(VB.data.vclass).empty().html(VB.templates.get('vbs-news')).css({width: VB.settings.newsWidth});
            VB.view.setResponsiveClass($newsBlock);
            if(VB.settings.expandNewsBlock) {
                VB.helper.expandNewsBlock();
            }
            else {
                VB.helper.collapseNewsBlock();
            }
        },
        renderLanguageBlock: function(){
            if(VB.data.localData.languages && VB.data.localData.languages.length > 0){
                var $mediaBlock = $("#" + VB.settings.mediaBlock);
                var $controls = $mediaBlock.find('.vbs-section-header .vbs-section-btns');
                $controls.after(VB.templates.get('languageSelect'));
                var $languageSelect = $mediaBlock.find('.vbs-select-language-wrapper');

                var english = [];
                var sem = '';
                for (var i = 0; i < VB.data.localData.languages.length; i++) {
                    var lang = VB.data.localData.languages[i];
                    var lang_code = Object.keys(lang)[0];
                    var lang_name = lang[lang_code];
                    var lang_obj = {
                        lang_code: lang_code,
                        lang_name: lang_name
                    };
                    sem += VB.templates.parse('languageItem', lang_obj);
                    if(lang_code.indexOf('en') === 0){
                        english.push(lang_obj);
                    }
                }
                $languageSelect.find('.vbs-select-dropdown').html(sem);
                if(english.length > 0){
                    VB.view.selectLanguage(english[0]);
                }
                else {
                    VB.view.selectLanguage(VB.data.localData.languages[0]);
                }
            }
        },
        selectLanguage: function(lang_obj){
            var $langTitle = $('.vbs-select-language-wrapper').find('.vbs-select-language');
            var lang_code = lang_obj.lang_code;
            $langTitle.removeClass('vbs-s-show').html(lang_obj.lang_name).attr(lang_code);
            VB.data.localData.selected_language = lang_code;
            VB.view.initLocalData();
        },
        checkResponsive: function(){
            var blocks = [
                $("#" + VB.settings.controlsBlock),
                $("#" + VB.settings.mediaBlock),
                $("#" + VB.settings.keywordsBlock),
                $("#" + VB.settings.transcriptBlock),
                $("#" + VB.settings.commentsBlock),
                $("#" + VB.settings.newsBlock)
            ];
            blocks.forEach(function($block){
                VB.view.setResponsiveClass($block);
            });
        },
        setResponsiveClass: function($block){
            if ($block.width() < VB.settings.mediumResponsive && $block.width() >= VB.settings.minResponsive) {
                $block.addClass('less-600px');
            } else if ($block.width() < VB.settings.minResponsive) {
                $block.addClass('less-600px').addClass('less-460px');
            }
        },
        initAfterSaveTranscript: function() {
            // Keyword clear
            VB.api.ready.keywords = false;
            VB.helper.find('.vbs-keywords-block .vbs-topics').html('');
            VB.helper.find('.vbs-keywords-block .vbs-keywords-list-tab').html('');
            VB.helper.find('.vbs-select-speaker-wrapper .vbs-select-dropdown').html('');
            VB.helper.find('.vbs-search-form').addClass('vbs-no-speaker');
            VB.data.speakers = {};
            // Transcript clear
            VB.api.ready.transcript = false;
            VB.helper.find('.vbs-transcript-block').removeClass('vbs-human').removeClass('vbs-with-order-btn');
            VB.helper.find('.vbs-transcript-block .vbs-transcript-wrapper').html('').removeClass('vbs-turntimes');
            VB.helper.find('.vbs-speakers').html('').removeClass('vbs-machine');
            VB.helper.find('.vbs-media-block .vbs-section-title, .vbs-time-name-wrapper-narrow').removeClass('vbs-machine');
            // ReInit
            VB.api.getKeywords();
            VB.api.getTranscript();
        },
        searchWordWidget: function(words) {
            if(words.length > 0) {
                var wrapper = VB.helper.find('.vbs-search-word-widget');
                var $voice_search_txt = VB.helper.find('#vbs-voice_search_txt');
                $voice_search_txt.css("opacity", "0");
                VB.helper.find('#vbs-search-string').show();
                var markers_string = "";
                for (var i in words) {
                    var tmpcolor = '';
                    if (i > 7) {
                        tmpcolor = '#' + ('000000' + (Math.random() * 0xFFFFFF << 0).toString(16)).slice(-6);
                    } else {
                        tmpcolor = VB.settings.colors[i];
                    }
                    markers_string += " " + VB.templates.parse('searchWordTemplate', {
                        'word': words[i],
                        'clean_word': words[i].replace(/"/g, ''),
                        'color': tmpcolor
                    }, 'span');
                }
                wrapper.html(markers_string);
                if (VB.data.searcht && VB.settings.editKeywords && $voice_search_txt.data('data-val') == $voice_search_txt.val()) {
                    VB.helper.checkKeyword(words, VB.data.searcht, VB.data.searchHits);
                }
                if($voice_search_txt.data('data-val') != $voice_search_txt.val()) {
                    VB.data.searcht = null;
                    VB.data.searchHits = null;
                }
                VB.helper.updateQuotesVisibility();
                VB.helper.startScroll();
            }
        },
        markerWidget: function(times, phrases, color) {
            var wrapper = VB.data.markersStyles.markersWrapper;
            var markers_div = VB.data.markersStyles.markersContainer;
            var wrapperWidth = VB.data.markersStyles.markersWrapperWidth;
            var markers_string = "";
            if (typeof (color) === 'undefined' || color === null) {
                color = VB.settings.colors[0];
            }
            if (typeof (phrases) === 'undefined' || phrases === null) {
                phrases = null;
            }
            for (var i in times) {
                var position = (times[i] * wrapperWidth) / VB.data.duration;
                var phrase = typeof (phrases[i]) == 'undefined' ? '' : phrases[i];
                phrase = VB.common.unEscapeHtml(phrases[i]);
                markers_string += " " + VB.templates.parse('markerTemplate', {
                    'position': position,
                    'time': times[i],
                    'stcolor': color,
                    'phrase': phrase
                });
            }
            return markers_string;
        },

        showCustomMarkers: function () {
            var wrapper = VB.helper.find('.vbs-record-timeline-wrap');
            var markers_div = $('.vbs-custom-markers');

            if(markers_div.find('.vbs-custom-marker').length === 0) {
                var wrapperWidth = wrapper.width();
                var markers = VB.data.customMarkers;
                var customMarkers = "";

                for (var time in markers) {
                    var position = (time * wrapperWidth) / VB.data.duration;
                    var phrase = markers[time];
                    phrase = VB.common.unEscapeHtml(phrase);
                    customMarkers += " " + VB.templates.parse('customMarkerTemplate', {
                        'position': position,
                        'time': time,
                        'stcolor': '#aaa',
                        'phrase': phrase
                    });
                }

                markers_div.append(customMarkers);
            }
            markers_div.show();
        },

        hideCustomMarkers: function () {
            var markers_div = $('.vbs-custom-markers');
            markers_div.hide();
        },

        /*
        * Methods from Panda OS. Integrate keywords markers to native kaltura timelime
        * */
        markerWidgetForNativeTimeline: function(){
            var duration = VB.data.duration;
            var origMarkers = $('.vbs-markers').find('.vbs-marker');
            var $playerIframe = VB.PlayerApi.getPlayerIframe();
            VB.view.clearScrubberOfMarks();

            $.each(origMarkers, function (k, origMarker){
                var markerTime = $(origMarker).attr('stime');
                var markerColor = $(origMarker).css('border-bottom-color');
                var leftPx = $(origMarker).css('left');
                var left = (markerTime / duration) * 100;
                VB.view.createScruberMark('vb_scrubber_mark' + k , markerColor, left, 10, 'keyword-marks keyword-mark-' + k);

                var origPhraseBar = $('span[ctime="' +  markerTime + '"]');
                if (typeof origMarker != 'undefined'){
                    VB.view.createPhraseBar('vb_scrubber_mark' + k , origPhraseBar.text());
                } else {
                    console.log('Keyword phrase-bar not found for ' + markerTime);
                }
            });
        },
        clearScrubberOfMarks: function(){
            var $playerIframe = VB.PlayerApi.getPlayerIframe();
            $playerIframe.find('.keyword-marks').remove();
            $playerIframe.find('.vb-keyphrase').remove();

        },
        createScruberMark: function(elemId, color, left, width, classes){
            var $playerIframe = VB.PlayerApi.getPlayerIframe();

            var $currentTimeMarkElem = $playerIframe.find('.playHead');
            var $markerElem = $playerIframe.find('#' + elemId);
            if($markerElem.length > 0) {
                $markerElem.css('left', left + '%');
            }
            else {
                width = (typeof width !== 'undefined') ? width : 10;
                color = (typeof color !== 'undefined') ? color : '#dddddd';

                var $scrubberElm = $playerIframe.find('.scrubber');
                var height = $scrubberElm.height();
                $markerElem = jQuery('<a class="scrubber-marker ' + classes + '"></a>');
                VB.view.setMarkerCss($markerElem, height, left, color, elemId, width);
                $currentTimeMarkElem.after($markerElem);
            }
        },
        createPhraseBar: function(markerElemId, content){
            var $playerIframe = VB.PlayerApi.getPlayerIframe();

            var phraseElem = $('<span class="vb-keyphrase" style="display: none;">' + content + '</span>');
            phraseElem.css({
                'position': 'absolute',
                'text-align': 'center',
                'width': '100%',
                'height': '17px',
                'padding-top': '3px',
                'margin-top': '-20px',
                'background-color': '#EDF0F8',
                'border-radius': '2px',
                'color': '#333',
                'font-family': 'Helvetica, Arial, sans-serif',
                'font-size': '13px',
                'z-index': 99
            }).attr('sourcemarker', markerElemId);

            $playerIframe.find('.controlBarContainer').prepend(phraseElem);

            $playerIframe.find('#' + markerElemId).mouseenter(function(){
                $playerIframe.find('span[sourcemarker=' + this.id + ']').show();
            });

            $playerIframe.find('#' + markerElemId).mouseleave(function(){
                $playerIframe.find('span[sourcemarker=' + this.id + ']').hide();
            });

        },
        setMarkerCss: function($markerElem, height, left, color, elemId, width){
            $markerElem.css({
                'border-top-width': height,
                'border-top-style': 'solid',
                'border-top-color': color,
                'left': left + '%',
                'position': 'absolute',
                'border-left-width': width / 2,
                'border-left-style': 'solid',
                'border-left-color': 'transparent',
                'border-right-width': width / 2,
                'border-right-style': 'solid',
                'border-right-color': 'transparent',
                'z-index': 99
            }).attr('id', elemId);
        },
        /*
        * END of Panda OS methods
        * */


        keywordHover: function(times) {
            if(times === '') {
                return false;
            }
            var wrapper = VB.helper.find('.vbs-record-timeline-wrap');
            var markers_string = '';
            times = times.split(",");
            for (var i in times) {
                var position = ((parseFloat(times[i])) * wrapper.width()) / VB.data.duration;
                markers_string += " " + VB.templates.parse('markerKeyTemplate', {
                    'position': position,
                    'time': parseFloat(times[i])
                });
            }
            VB.helper.find('.vbs-markers-hovers').html(markers_string);
        },
        removeKeywordHover: function() {
            VB.helper.find('.vbs-markers-hovers').html("");
        },
        favorite: function(opt) {
            if (opt)
                VB.helper.find(".vbs-star-btn").addClass('vbs-active').attr('data-tile', 'Remove from Favorites');
            else
                VB.helper.find(".vbs-star-btn").removeClass('vbs-active').attr('data-tile', 'Add from Favorites');
            return opt;
        },
        favoriteToggle: function() {
            VB.helper.find(".vbs-star-btn").toggleClass('vbs-active');
            return true;
        },
        resizeTimelineElements: function() {
            // Markers
            var wrapperWidth = VB.helper.find('.vbs-record-timeline-wrap').width();
            var duration = VB.data.duration;
            VB.helper.find('.vbs-markers a').each(function() {
                var $this = $(this);
                var markerTime = $this.attr('stime');
                var position = (markerTime * wrapperWidth) / duration;
                $this.css('left', position);
            });
            VB.speakers.resizeSpeakers();
            VB.comments.resizeCommentsTWidget();

            VB.helper.startScroll();
        },
        tooltips: function() {
            /* tooltips*/
            $('.vbs-tooltip').remove();
            $('body').append('<span class="vbs-tooltip"></span>');
            $('[data-title]').each(function() {
                var $this = $(this);
                var $vbsTooltip = $('.vbs-tooltip');
                $this.hover(
                    function() {
                        $vbsTooltip.stop(true, true).hide();
                        var title = $this.attr('data-title');
                        $vbsTooltip.text(title);

                        var pos = VB.view.getPositionElementForTooltip($this);
                        var tooltipWidth = parseInt($vbsTooltip.css('width')) + 20;
                        var tooltipHeight = 34; // height of tooltip

                        var calculatedOffset = {
                            top: (pos.top > tooltipHeight) ? pos.top - tooltipHeight : pos.top + pos.height + 8, // 8 - height of arrow
                            left: pos.left + pos.width / 2 - tooltipWidth / 2
                        };

                        $vbsTooltip.css({
                            "top": calculatedOffset.top + "px",
                            "left": calculatedOffset.left + "px"
                        });

                        if(pos.top > tooltipHeight) {
                            $vbsTooltip.removeClass('vbs-arrow-on-top');
                        } else {
                            $vbsTooltip.addClass('vbs-arrow-on-top');
                        }

                        $vbsTooltip.stop(true, true).fadeIn(100);
                    }, function() {
                        $vbsTooltip.stop(true, true).fadeOut(100);
                    }
                );
            });
        },
        getPositionElementForTooltip: function($element){
            var elRect = $element[0].getBoundingClientRect();
            var elOffset  = $element.offset();
            var scroll = { scroll: $element.scrollTop() };

            var $body = $('body');
            var bodyOffset = {
                top: 0,
                left: 0
            };
            if($body.css('position') === 'absolute' || $body.css('position') === 'relative' || $body.css('position') === 'fixed'){
                bodyOffset = $body.offset();
            }
            var pos = $.extend({}, elRect, scroll, elOffset);
            pos.top -= bodyOffset.top;
            pos.left -= bodyOffset.left;

            return pos;
        },
        hideTooltips: function() {
            $('.vbs-tooltip').hide();
        }
    };

    function hideToggleArrows($block){
        $block.find('.vbs-section-title').addClass('vbs-no-toggle');
    }

    function checkToggleBlocks(){
        if(!VB.settings.toggleBlocks) {
            $('.vbs-section-title').addClass('vbs-no-toggle');
        }
        else {
            if(!VB.settings.toggleMediaBlock){
                hideToggleArrows($("#" + VB.settings.mediaBlock));
            }
            if(!VB.settings.toggleKeywordsBlock){
                hideToggleArrows($("#" + VB.settings.keywordsBlock));
            }
            if(!VB.settings.toggleTranscriptBlock){
                hideToggleArrows($("#" + VB.settings.transcriptBlock));
            }
            if(!VB.settings.toggleCommentBlock){
                hideToggleArrows($("#" + VB.settings.commentsBlock));
            }
            if(!VB.settings.toggleNewsBlock){
                hideToggleArrows($("#" + VB.settings.newsBlock));
            }
        }
    }

    function checkHeaderVisibility(){
        var $mediaBlock = $("#" + VB.settings.mediaBlock);
        var $keywordsBlock = $("#" + VB.settings.keywordsBlock);
        var $transcriptBlock = $("#" + VB.settings.transcriptBlock);
        var $commentsBlock = $("#" + VB.settings.commentsBlock);

        if(!VB.settings.hasMediaBlockHeader){
            $mediaBlock.hide();
        }
        if(!VB.settings.hasKeywordsBlockHeader){
            $keywordsBlock.find('.vbs-keywords-block').addClass('vbs-no-header');
        }
        if(!VB.settings.hasTranscriptBlockHeader){
            $transcriptBlock.find('.vbs-transcript-block').addClass('vbs-no-header');
        }
        if(!VB.settings.hasCommentsBlockHeader){
            $commentsBlock.find('.vbs-comments-block').addClass('vbs-no-header');
        }
    }

    return VB;
})(voiceBase, jQuery);