function updateRoster() {
  // get seis data
  // get seis data
  var count = 0;
  var newRecs = [];
  var deletedRecords = [];
  function reformatHeadings(array) {
    var aryFmt = array.map(function (x, n, arr) {
      return x.replace(/[^A-z^0-9+]/gi, "_").toLowerCase();
    });
    return aryFmt;
  }
  function indexHeadings(array) {
    var i, obj, key, val;
    obj = {};
    for (let i = 0; i < array.length; i++) {
      const el = array[i];
      key = array[i];
      val = i;
      obj[key] = val;
    }
    return obj;
  }
  function getRecNmjdobInd(array, index) {
    var indicesOfMatch = {};
    for (let i = 0; i < array.length; i++) {
      const el = array[i];
      indicesOfMatch[el[index]] = i;
    }
    return indicesOfMatch;
  }

  // seis csv report
  var sVals = parseCSV("roster_seis.csv");
  for (let i = 0; i < sVals.length; i++) {
    const element = sVals[i];
    if (i === 0) {
      element.unshift("nmjdob");
    } else {
      element.unshift(makeMatchVar([element[1], element[2], element[3]]));
    }
  }
  var sHeads = reformatHeadings(sVals.shift());
  // roster -- the current roster sheet
  var [rHeads, rVals, rSheet, rRange, rLastR, rLastC] = myGet("roster");
  rHeads = reformatHeadings(rHeads);

  // allPupils -- data from Aeries
  var pSheet, pLast, pRange, pVals, pHeads, pMatch, sMatch, rMatch, x;
  var ss2 = allPupilsSheet();
  pSheet = ss2.getSheetByName("allPupilsModNames");
  pLast = pSheet.getRange("a1:a").getValues().filter(String).length;
  pRange = pSheet.getRange(1, 1, pLast - 1, pSheet.getLastColumn());
  pVals = pRange.getDisplayValues();
  pHeads = reformatHeadings(pVals[0]);

  // now update existing records and add new records
  //The IND objects havefield names as keys and indexes to those fields as values
  //  fieldName: index within record
  var rInd = indexHeadings(rHeads);
  var pInd = indexHeadings(pHeads);
  var sInd = indexHeadings(sHeads);
  // The  match items are objects with 
  // nmdjob: index,
  rMatch = getRecNmjdobInd(rVals, rInd["nmjdob"]);
  sMatch = getRecNmjdobInd(sVals, sInd["nmjdob"]);
  pMatch = getRecNmjdobInd(pVals, pInd["nmjdob"]);

  // find new records
  // The y loop is going through records imported most recently from the Seis system
  for (let y = 0; y < sVals.length; y++) {
    const sEl = sVals[y];
    if (y === 0) {
      // initialize rIds and newrec
      var rIds = [];
      for (let r = 0; r < rVals.length; r++) {
        const id = rVals[r][rInd['nmjdob']];
        rIds.push(id);
      }
    }
    if (rIds.indexOf(sEl[sInd['nmjdob']]) === -1) {
      let newRec = [];
      for (let r = 0; r < rVals[0].length; r++) {
        newRec.push("");
      }
      newRec.splice(rInd["nmjdob"], 1, sEl[sInd["nmjdob"]]);
      newRecs.push(newRec);
    }
  }

  if (newRecs.length > 0) {
    rVals = rVals.concat(newRecs);
    newRecs = [];
  }
  // The J loop is going through records already in the roster
  for (let j = 1; j < rVals.length; j++) {
    const rEl = rVals[j];
    var r_nmjdob = rEl[rInd["nmjdob"]];
    if (sMatch[r_nmjdob] === undefined) {
      // record is not in the seis file; assume deleted
      deletedRecords.push(rEl);
      rVals.splice(j, 1);
    } else {
      for (let u = 0; u < rEl.length; u++) {
        var nextField = sInd[rHeads[u]];
        if (nextField > -1) {
          let col = sInd[rHeads[u]];
          let row: number = sMatch[r_nmjdob];
          rEl.splice(u, 1, sVals[row][col]);
        } else {
          var nextField = pInd[rHeads[u]];
          if (nextField > -1) {
            let row: number = pMatch[r_nmjdob];
            let col = pInd[rHeads[u]];
            rEl.splice(u, 1, pVals[row][col]);
          }
        }
      }
    }
  }
  var dest = ss.getSheetByName("roster");
  dest.clear();
  var range = dest.getRange(1, 1, rVals.length, rVals[0].length);
  range.setValues(rVals);

  if(deletedRecords.length > 0) {
    var dest = ss.getSheetByName("deleted");
    dest.clear();
    var range = dest.getRange(dest.getLastRow() + 1, 1, deletedRecords.length, deletedRecords[0].length);
    range.setValues(deletedRecords);
  }

  Logger.log("done");
}

