# php_pandora_api

*Unofficial* PHP API Client for Pandora (experimental)

Current Dependencies:

* php_openssl
* php_mcrypt

Thanks to contributors of http://pan-do-ra-api.wikia.com/wiki/Pan-do-ra_API_Wiki for reverse engineering.

## Example Usage

```php
require_once 'src/php_pandora_api/Pandora.php';

use php_pandora_api\Pandora;

$p = new Pandora('android', 'json');

if( !$p->login('username', 'password')) {
    die(sprintf("Error: %s\nReq: %s\n Resp: %s", $p->last_error, $p->last_request_data, $p->last_response_data));
}

if( !$response = $p->makeRequest('user.getStationList')) {
    die(sprintf("Error: %s\nReq: %s\n Resp: %s", $p->last_error, $p->last_request_data, $p->last_response_data));
}

echo '<pre>';
print_r($response);
echo '</pre>';
```

## API Method Reference

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

For a full, up-to-date listing see http://pan-do-ra-api.wikia.com/wiki/Pan-do-ra_API_Wiki.
