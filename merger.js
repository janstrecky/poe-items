var jsdom = require('jsdom');

//JSON structure
//[
//  [
//    category: '',
//    name: '',
//    level: '',
//    dmgMin: '',
//    dmgMax: '',
//    aps: '',
//    dps: '',
//    armor: '',
//    er: '',
//    es: '',
//    str: '',
//    dex: '',
//    int: ''
//  ]
//]

function getWeapons($, itemType, $itemTable) {
  var items = [];
  
  $('tr:nth-child(1)', $itemTable).remove();
  $('tr:nth-child(1)', $itemTable).remove();
  
  $('tr:even', $itemTable).each(function(i) {
    var item = [];
    item.push(itemType);
    item.push($('td:nth-child(2)', $(this)).text());
    item.push($('td:nth-child(3)', $(this)).text());
    item.push($('td:nth-child(4)', $(this)).text().split(' to ')[0]);
    item.push($('td:nth-child(4)', $(this)).text().split(' to ')[1]);
    item.push($('td:nth-child(5)', $(this)).text());
    item.push($('td:nth-child(6)', $(this)).text());
    item.push('0');
    item.push('0');
    item.push('0');
    item.push($('td:nth-child(7)', $(this)).text());
    item.push($('td:nth-child(8)', $(this)).text());
    item.push($('td:nth-child(9)', $(this)).text());
    items.push(item);
  });
  return items;
}

function getArmorItems($, itemType, $itemTable) {
  var items = [];
  
  $('tr:nth-child(1)', $itemTable).remove();
  $('tr:nth-child(1)', $itemTable).remove();
  
  $('tr:even', $itemTable).each(function(i) {
    var item = [];
    item.push(itemType);
    item.push($('td:nth-child(2)', $(this)).text());
    item.push($('td:nth-child(3)', $(this)).text());
    item.push('0');
    item.push( '0');
    item.push('0');
    item.push('0');
    item.push($('td:nth-child(4)', $(this)).text());
    item.push($('td:nth-child(5)', $(this)).text());
    item.push($('td:nth-child(6)', $(this)).text());
    item.push($('td:nth-child(7)', $(this)).text());
    item.push($('td:nth-child(8)', $(this)).text());
    item.push($('td:nth-child(9)', $(this)).text());
    items.push(item);
  });
  return items;
}

exports.mergeAxesAndSwords = function(weaponPage, callback) {
  jsdom.env({
    html: weaponPage,
    scripts: [ 'http://code.jquery.com/jquery-1.8.3.min.js' ]
  },
  function (err, window) {
    var $ = window.jQuery,
        itemses = [];
    $('.layoutBox1.layoutBoxFull.defaultTheme').each(function(i) {
      var itemType = $('.layoutBoxTitle', $(this)).text(),
          $itemTable = $('.itemDataTable', $(this)),
          weapons = getWeapons($, itemType, $itemTable);
      for(var i = 0, len = weapons.length; i < len; i++) {
        itemses.push(weapons[i]);
      }
    });
    callback(itemses);
  });
};

exports.mergeAxesSwordsWithArmour = function(itemses, armourPage, callback) {
  jsdom.env({
    html: armourPage,
    scripts: [ 'http://code.jquery.com/jquery-1.8.3.min.js' ]
  },
  function (err, window) {
    var $ = window.jQuery;
    $('.layoutBox1.layoutBoxFull.defaultTheme').each(function(i) {
      var itemType = $('.layoutBoxTitle', $(this)).text(),
          $itemTable = $('.itemDataTable', $(this)),
          armorItems = getArmorItems($, itemType, $itemTable);
      for(var i = 0, len = armorItems.length; i < len; i++) {
        itemses.push(armorItems[i]);
      }
    });
    callback(itemses);
  });
};
