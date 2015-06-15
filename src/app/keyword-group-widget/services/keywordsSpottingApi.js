(function () {
  'use strict';

  var keywordsSpottingApi = function ($q) {

    var url = 'https://apis.voicebase.com/v2-beta';

    var postMedia = function (token, file, groups) {
      var deferred = $q.defer();

      var data = new FormData();
      data.append('media', file);

      if(groups.length > 0) {
        var groupsData = {
          configuration:{
            keywords: {
              groups:groups
            }
          }
        };
        data.append('configuration', JSON.stringify(groupsData));
      }

      jQuery.ajax({
        url: url + '/media',
        type: 'POST',
        contentType: false,
        processData: false,
        data: data,
        headers: {
          'Authorization': 'Bearer ' + token
        },
        success: function (mediaStatus) {
          deferred.resolve(mediaStatus);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(errorThrown + ': Error ' + jqXHR.status);
          deferred.reject('Something goes wrong!');
        }
      });

      return deferred.promise;
    };

    var checkMediaFinish = function (token, mediaId) {
      var deferred = $q.defer();

      jQuery.ajax({
        type: 'GET',
        url: url + '/media/' + mediaId,
        headers: {
          'Authorization': 'Bearer ' + token
        },
        success: function (data) {
          deferred.resolve(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(errorThrown + ': Error ' + jqXHR.status);
          deferred.reject('Something goes wrong!');
        }
      });

      return deferred.promise;
    };


    return {
      postMedia: postMedia,
      checkMediaFinish: checkMediaFinish
    };
  };

  angular.module('vbsKeywordGroupWidget')
    .service('keywordsSpottingApi', keywordsSpottingApi);

})();
