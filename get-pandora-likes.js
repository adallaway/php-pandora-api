/**
 * Run this in the browser while logged into Pandora to download
 * a CSV file containing all "liked" song data.
 * @author Alex Dallaway <github:adallaway>
 */

function getPandoraLikes()
{
  var base_url = 'http://www.pandora.com/content/tracklikes';
  var next_page_exists = true;
  var current_like_index = 0;
  var current_thumb_index = 0;
  var songs = [];
  var read_like_ids = [];
  
  while(next_page_exists)
  {
    var url  = base_url + '?likeStartIndex=' + current_like_index
                        + '&thumbStartIndex=' + current_thumb_index;
                        
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send(null);
    var temp_element = window.content.document.createElement('div');
	temp_element.innerHTML = xhr.responseText;
	  
	var divs = temp_element.getElementsByTagName('div');
    for(var y = 0; y < divs.length; y++)
    {
      if(like_info = divs[y].id.match(/tracklike_(S\d{1,6})/i))
      {
        var block = divs[y];
        var song_data = [];
        
        song_data.like_id = like_info[1];
        if(read_like_ids.indexOf(song_data.like_id) != -1)
          continue;
        
        var h3 = block.getElementsByTagName('h3')[0];
        song_data.song_title = h3.innerHTML.match(/<a.*?>(.*?)<\/a>/i)[1].replace(/&amp;/g, '&');
        song_data.artist_name = h3.parentNode.innerHTML.match(/by <a.*?>(.*?)<\/a>/i)[1].replace(/&amp;/g, '&');
        
        var station_name_match = h3.parentNode.innerHTML.match(/stationname">(.*?)<\/a>/mi);
        song_data.station_name = (station_name_match) ? station_name_match[1].replace(/&amp;/g, '&') : null;
        
        var amazon_url_match = block.innerHTML.match(/data-amazonurl="(.*?)"/);
        song_data.amazon_url = (amazon_url_match) ? amazon_url_match[1] : null;
        
        var amazon_asin_match = block.innerHTML.match(/data-amazondigitalasin="(.*?)"/);
        song_data.amazon_asin = (amazon_url_match) ? amazon_asin_match[1] : null;
        
        var itunes_url_match = block.innerHTML.match(/data-itunesurl="&RD_PARM1=(.*?)"/mi);
        song_data.itunes_url = (itunes_url_match) ? itunes_url_match[1] : null;
        
        if(window.console) console.log('[' + song_data.like_id + '] ' + song_data.artist_name + ' - ' + song_data.song_title);
        songs.push(song_data);

        read_like_ids.push(song_data.like_id);
      }
    }
    var next_like_index_match = temp_element.innerHTML.match(/nextLikeStartIndex="(.*?)"/i);
    var next_like_index = (next_like_index_match == null) ? null : parseInt(next_like_index_match[1]);
    var next_thumb_index_match = temp_element.innerHTML.match(/nextThumbStartIndex="(.*?)"/im);
    var next_thumb_index = (next_thumb_index_match == null) ? null : parseInt(next_thumb_index_match[1]);
    
    if(isNaN(next_like_index) || isNaN(next_thumb_index))
      next_page_exists = false;
      
    if(next_like_index == null || next_thumb_index == null)
      next_page_exists = false;
    
    else if((next_like_index == current_like_index) && (next_thumb_index == current_thumb_index))
      next_page_exists = false;
    
    else
    {
      current_like_index = next_like_index;
      current_thumb_index = next_thumb_index;
    }
  }
  
  return songs;
}

function downloadJsonCsv(objArray)
{
  var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  var str = '';
  for(var i = 0; i < array.length; i++)
  {
    var line = '';
    for(var index in array[i])
      line += '"' + ((array[i][index] == null) ? null : array[i][index].replace(/"/g, '""')) + '",';
    line.slice(0, line.length - 1); 
    str += line + '\r\n';
  }
  var uri = "data:text/csv;charset=utf-8," + escape(str);
  var a = document.createElement("a");
  a.href = uri;
  a.download = "pandora-likes.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  window.open();
}
    
var songs = getPandoraLikes();
downloadJsonCsv(songs);