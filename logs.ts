var ss = SpreadsheetApp.getActiveSpreadsheet();

// takes Data sent from the client side and saves it on the server side spreadsheet;
// returns id for 'show...' function
/**
 * 
 * @param logObj 
 * @returns 
 */
function saveLogEntryServer(logObj) {
    // var obj = {
    //     "seis_id": id,
    //     "logEntry": entry,
    //     "nmjdob": nmjdob,
    //     "logId"
    // } [timestamp	email	studentMC	log_entry	log_entry_id	SEIS_ID]
    Logger.log('obj received = %s', JSON.stringify(logObj));
    if (logObj == undefined || logObj == null || logObj.length == 0) {
        Logger.log('logObj is null, undefined, or empty');
    } else {
        Logger.log(JSON.stringify(logObj));
    }
    var [headings, logVals, logResp, range, last, lastC] = myGet('logRespMerged');
    logObj.logId = getNextLogEntryId();
    var row = [[dayjs().format('YYYY-MM-DDTHH:mm:ss.SSSZ'), Session.getActiveUser().getEmail(), logObj.nmjdob, logObj.logEntry, logObj.logId, logObj.seis_id]];
    var range = logResp.getRange(last + 1, 1, 1, row[0].length);
    range.setValues(row);
    row = row[0];
    SpreadsheetApp.flush();
    return [JSON.stringify(logObj), JSON.stringify(row)];
}
/**
 * 
 * @param logObjStr
 * {
            "logEntry": str, 
            "logDate": str, 
            "logId": str, 
            "nmjdob": str, 
            "seis_id": str, 
            "remove": boolean
        }
 
 * @returns 
 */
function saveEditedLogEntryServer(logObjStr) {
    Logger.log(logObjStr);
    var [headings, values, sheet, range, lastR, lastC] = myGet('logRespMerged');
    var logObj = JSON.parse(logObjStr);
    var row = [dayjs(logObj.logDate, 'YYYY-MM-DD').format('YYYY-MM-DDTHH:mm:ss.SSSZ'), Session.getActiveUser().getEmail(), logObj.nmjdob, logObj.logEntry, logObj.logId, logObj.seis_id];
    Logger.log('the row is %s', JSON.stringify(row));
    var lid_index = headings.indexOf('log_entry_id');
    for (let i = 0; i < values.length; i++) {
        var el = values[i];
        var entryIDindex = headings.indexOf('logId');
        if (el[lid_index] == logObj.logId) {
            if (logObj.remove == true) {
                values.splice(i, 1);
            } else {
                values.splice(i, 1, row);
            }
            Logger.log('the index to the record was %s', i);
            break;
        }
        // var test = ss.insertSheet('test');
    }
    // var test = ss.getSheetByName('test');
    sheet.clearContents();
    var output = [headings].concat(values);
    range = sheet.getRange(1, 1, output.length, output[0].length);
    range.setValues(output);
    return JSON.stringify(logObj);
}

function getNextLogEntryId() {
    var sheet = ss.getSheetByName('logRespMerged');
    var last = sheet.getRange('A1:A').getValues().filter(String).length;
    var entry_ids = sheet.getRange('E2:E' + last).getValues().flat();
    return Math.max(...entry_ids) + 1;
}
function getLogEntry(logId = '1') {
    var [headings, values, sheet, range, lastR, lastC] = myGet('logRespMerged');
    for (let i = values.length - 1; i > -1; i--) {
        const el = values[i];
        var [timestamp, email, studentMC, log_entry, log_entry_id, SEIS_ID] = el;

        if (el[4] == logId) {
            var obj = {
                "nmjdob": el[2],
                "entry": el[3],
                "logId": el[4],
                "seis_id": el[5]
            };
            Logger.log('log entry is %s', JSON.stringify(obj));
            return JSON.stringify(obj);
        }
    }
}

function getLogEntries(id = '1010101', loc = null, startDate, endDate) {
    var [headings, ids, sheet, range, lastR, lastC] = myGet('roster', 0, true);
    ids.shift(); // file has an extra headings line
    var allRecords = [];
    var [logTableHeadings, values, sheet, range, lastR, lastC] = myGet('logRespMerged');
    values.sort(function (a, b) {
        if (a[0] < b[0]) {
            return -1;
        }
        else if (a[0] > b[0]) {
            return 1;
        }
        else {
            return 0;
        }
    });
    for (let i = 0; i < ids.length; i++) {
        var el = ids[i];
        var entryIDindex = (logTableHeadings.indexOf('SEIS_ID'));
        var stuRecord = [];
        var count = 0;
        for (let j = values.length - 1; j > -1; j--) {
            var log = values[j];
            if (log[entryIDindex] == el) {
                stuRecord.push(log);
                count++;
                // if (count > 10) {
                // break;
                // }
            }
        }
        allRecords.push([el, stuRecord]);
    }
    // Logger.log('allRecords = %s', JSON.stringify(allRecords));
    return JSON.stringify(allRecords, loc);
}