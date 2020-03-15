
onmessage = (e) => {
  let {items, seen, rootSearch, search, page, show, showSeen, typeField} = e.data;
    let feed = {};
  let response = {};
  let more = false;
  let cleaned = cleanMap(items);
  let entries = Object.entries(cleaned);
  entries.sort(sort)
  let clean = 0
  let total = entries.length


  for (let entry of entries) {
    let key = entry[0];
    let item = entry[1];


    if (!item || item.VOID) { continue }

    if (seen && seen[key] && !showSeen) {
      continue
    }

    if ((show.banned && !item.banned) ||(!show.banned && item.banned)) {
      continue
    }

    if (rootSearch && !item[typeField].toLowerCase().includes(rootSearch.toLowerCase())) {
      continue
    }

    if (search && !item[typeField].toLowerCase().includes(search.toLowerCase())) {
      continue
    }

    if (page) {
      clean++;
      if (clean<page.start) {
        continue
      }
      if (total>page.end) {
        more=true;
        break
      } else {
        more=false;
        page.end=page.total
      }
    }

    feed[key]=item
  }

  postMessage({
    feed,
    total,
    more,
  })
}

function sort (a,b)  {
    let aTitle = a[1].title.toLowerCase();
    let bTitle = b[1].title.toLowerCase();
    if ( aTitle > bTitle ) {
      return 1;
    }
    if (aTitle < bTitle) {
      return -1;
    }
    if (aTitle==bTitle) {
      let aDesc = a[1].description.toLowerCase();
      let bDesc = b[1].description.toLowerCase();
      if ( aDesc > bDesc ) {
        return 1;
      }
      if (aDesc < bDesc) {
        return -1;
      }
    }
    return 0;
};

function cleanMap (obj)  {
      return Object.entries(obj).reduce((a,[k,v]) => (v === null ? a : {...a, [k]:v}), {})
}
