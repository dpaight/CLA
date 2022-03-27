function getRecord(id) {
    // record was not cached; search for it
    if (id == undefined) { throw "no id at getRecord" };
    var [headings, values, sheet, range, lastR, lastC] = rosterGet();

    // values.shift();
    for (var i = 0; i < values.length; i++) {
        var el = values[i];
        // sp.put('rec' + el[0], JSON.stringify(el));
        // cache all records along the way
        var indOfID = headings.indexOf('seis_id');
        Logger.log('headings from getRecord: %s', JSON.stringify(headings));
        if (id == el[indOfID] && el[indOfID] != 'seis_id') {
            Logger.log('found it %s', JSON.stringify(el));
            Logger.log('notes = %s', JSON.stringify(values[i]));
            return JSON.stringify(values[i]);
        }
    }
}
function getNotes(data) {
    var [id, value] = data;
    Logger.log('params %s, %s', id, value);
    var sheet = ss.getSheetByName('notes');
    var array = sheet.getRange('A1:B30').getDisplayValues();
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (id.toString() == element[0])
            if (value == undefined || value == null) {
                return element[1];
            }
            else {
                var cell = sheet.getRange(i + 1, 2, 1, 1);
                cell.setValue(value);
                return value;
            }
    }
}
// 

// from 'library.ts'
function rosterGet() {
    var sheetName = 'roster';
    var values = [];
    var [headings, avalues, sheet, range, lastR, lastC] = myGet('roster');

    var [nhead, nval, nsht, nrang, nlr, nlc] = myGet('notes');
    var [nfhead, nfval, nfsht, nfrang, nfr, nflc] = myGet('notes', 1, true);
    nfval.shift();
    for (let i = 0; i < avalues.length; i++) {
        var el = avalues[i];
        Logger.log('object is %s', JSON.stringify(el));

        var index = nfval.indexOf(el[0]);
        if (index == -1) {
            var note = "no notes";
            el.push(note);
        } else {
            note = nval[index][1];
            el.push(note);
        }
        values.push(el);
        headings.push('notes2');
        lastC = lastC++;

    }

    return [headings, values, sheet, range, lastR, lastC];
}

/**
 *
 * @param sheetName : string
 * @param column : number
 * @param flat :boolean
 * @returns : [headings, values, sheet, range, lastR, lastC]
 */
function myGet(sheetName, column = -1, flat = false) {
    if (!sheetName) {
        Logger.log('missing value');
    }
    else {
        Logger.log(sheetName);
    }
    ;
    var sheet, headings, values, range, lastR, lastC;
    sheet = ss.getSheetByName(sheetName);
    lastR = findLastRow(sheetName, 1);
    lastC = sheet.getLastColumn();
    range = (column == -1) ?
        sheet.getRange(1, 1, lastR, lastC) :
        sheet.getRange(1, column, lastR, 1);
    values = (flat == undefined || flat == false) ?
        range.getValues() :
        range.getValues().flat();
    headings = (column == -1) ?
        values.shift() :
        null;
    return [headings, values, sheet, range, lastR, lastC];
}


function getById(fileId, sheetName, column = -1, flat = false) {
    var ss = SpreadsheetApp.openById(fileId);
    if (!sheetName) {
        Logger.log('missing value');
    }
    else {
        Logger.log(sheetName);
    }
    var sheet, headings, values, range, lastR, lastC;
    sheet = ss.getSheetByName(sheetName);
    lastR = findLastRowById(fileId, sheetName, 1);
    lastC = sheet.getLastColumn();
    range = (column == -1) ?
        sheet.getRange(1, 1, lastR, lastC) :
        sheet.getRange(1, column, lastR, 1);
    values = (flat == undefined || flat == false) ?
        range.getValues() :
        range.getValues().flat();
    headings = values.shift();
    return [headings, values, sheet, range, lastR, lastC];
}
