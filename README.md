php-pandora-api
===============

<strong>Unofficial</strong> PHP API Client for Pandora (experimental)
____

The XMLRPC endpoint calls are currently broken. (JSON calls work fine)

Current Dependencies:
- php_openssl
- php_mcrypt
- php_xmlrpc

Thanks to contributors of http://pan-do-ra-api.wikia.com/wiki/Pan-do-ra_API_Wiki for reverse engineering.
____

Example Usage
----

```php
require_once('pandora.class.php');

$p = new \Pandora('android', 'json');

if(!$p->login('username', 'password'))
{
  die(sprintf("Error: %s\nReq: %s\n Resp: %s", $p->last_error, $p->last_request_data, $p->last_response_data));
}

if(!$response = $p->makeRequest('user.getStationList'))
{
  die(sprintf("Error: %s\nReq: %s\n Resp: %s", $p->last_error, $p->last_request_data, $p->last_response_data));
}

print_r($response);
```

| makeRequest() Methods            | Params
| -------------------------------- | ----------------------------------------
| bookmark.addArtistBookmark       | (string)trackToken
| bookmark.addSongBookmark         | (string)trackToken
| music.search                     | (string)searchText
| station.addFeedback              | (string)trackToken, (boolean)isPositive
| station.addMusic                 | (string)musicToken, (string)stationToken
| station.createStation            | (string)musicToken, (string)trackToken, (string)musicType['song'/'artist']
| station.deleteFeedback           | (string)feedbackId
| station.deleteMusic              | (string)seedId
| station.deleteStation            | (string)stationToken
| station.getGenreStations         | -none-
| station.getGenreStationsChecksum | -none-
| station.getPlaylist              | (string)stationToken, (string)additionalAudioUrl['HTTP_*_*','...']
| ...                              |   @see http://pan-do-ra-api.wikia.com/wiki/Json/5/station.getPlaylist
| station.getStation               | (string)stationToken, (boolean)includeExtendedAttributes
| station.shareStation             | (string)stationId, (string)stationToken, (array)emails
| station.renameStation            | (string)stationToken, (string)stationName
| station.transformSharedStation   | (string)stationToken
| track.explainTrack               | (string)trackToken
| user.canSubscribe                | -none-
| user.createUser                  | (string)accountType, (string)countryCode, (string)registeredType['user']
| ...                              |   (string)username, (string)password, (int)birthYear, (string)zipCode
| ...                              |   (string)gender['male'/'female'], (boolean)emailOptIn
| user.getBookmarks                |
| user.getStationList              | (boolean)includeStationArtUrl
| user.getStationListChecksum      | -none-
| user.setQuickMix                 | (array)quickMixStationIds
| user.sleepSong                   | (string)trackToken
