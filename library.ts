// Compiled using dan-cl-retry 1.0.0 (TypeScript 4.5.5)
// Compiled using dan-cl-retry 1.0.0 (TypeScript 4.5.4)
// Compiled using dan-cl-retry 1.0.0 (TypeScript 4.5.4)
// Compiled using undefined undefined (TypeScript 4.5.2)
// Compiled using ts2gas 3.6.4 (TypeScript 4.2.4)
// Compiled using ts2gas 3.6.4 (TypeScript 4.2.4)
// Compiled using ts2gas 3.6.4 (TypeScript 4.2.4)
// Compiled using ts2gas 3.6.4 (TypeScript 4.2.4)
var ss = SpreadsheetApp.getActiveSpreadsheet();

function rosterGet() {
    var sheetName = 'roster';
    var values = [];
    var [headings, avalues, sheet, range, lastR, lastC] = myGet('roster');

    var [nhead, nval, nsht, nrang, nlr, nlc] = myGet('notes');
    var [nfhead, nfval, nfsht, nfrang, nfr, nflc] = myGet('notes', 1, true);
    nfval.shift();
    for (let i = 0; i < avalues.length; i++) {
        var el = avalues[i];
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
function getDisp(sheetName, column = -1, flat = false) {
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
        range.getDisplayValues() :
        range.getDisplayValues().flat();
    headings = values.shift();
    return [headings, values, sheet, range, lastR, lastC];
}
/**
 *
 * @param sheet: String (name of sheet)
 * @param column : the column number to check
 * @returns number (last row with data)
 */
function findLastRow(sheet, column) {
    var theSheet = ss.getSheetByName(sheet);
    var theValues = theSheet.getRange(1, column, theSheet.getLastRow(), 1)
        .getValues();
    var last = (theValues.filter(String).length > 0) ?
        theValues.filter(String).length :
        1;
    return last;
}
function findLastRowById(fileId, sheet, column) {
    var ss = SpreadsheetApp.openById(fileId);
    var theSheet = ss.getSheetByName(sheet);
    var theValues = theSheet.getRange(1, column, theSheet.getLastRow(), 1)
        .getValues();
    var last = (theValues.filter(String).length > 0) ?
        theValues.filter(String).length :
        1;
    return last;
}
//# sourceMappingURL=module.jsx.map
//# sourceMappingURL=module.jsx.map
//# sourceMappingURL=module.jsx.map
//# sourceMappingURL=module.jsx.map
//# sourceMappingURL=module.jsx.map
//# sourceMappingURL=module.jsx.map
//# sourceMappingURL=module.jsx.map
//# sourceMappingURL=module.jsx.map