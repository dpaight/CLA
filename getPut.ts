class StuRec {
    constructor(array, headings) {
        this["seis_id"] = array[headings.indexOf("seis_id")];
        this["last_name"] = array[headings.indexOf("last_name")];
        this["first_name"] = array[headings.indexOf("first_name")];
        this["date_of_birth"] = array[headings.indexOf("date_of_birth")];
        this["case_manager"] = array[headings.indexOf("case_manager")];
        this["gender"] = array[headings.indexOf("gender")];
        this["grade_code"] = array[headings.indexOf("grade_code")];
        this["date_of_last_annual_plan_review"] = array[headings.indexOf("date_of_last_annual_plan_review")];
        this["date_of_next_annual_plan_review"] = array[headings.indexOf("date_of_next_annual_plan_review")];
        this["date_of_last_eligibility_evaluation"] = array[headings.indexOf("date_of_last_eligibility_evaluation")];
        this["date_of_next_eligibility_evaluation"] = array[headings.indexOf("date_of_next_eligibility_evaluation")];
        this["date_of_initial_parent_consent"] = array[headings.indexOf("date_of_initial_parent_consent")];
        this["parent_guardian_1_name"] = array[headings.indexOf("parent_guardian_1_name")];
        this["parent_1_email"] = array[headings.indexOf("parent_1_email")];
        this["parent_1_cell_phone"] = array[headings.indexOf("parent_1_cell_phone")];
        this["parent_1_home_phone"] = array[headings.indexOf("parent_1_home_phone")];
        this["parent_1_work_phone_h1"] = array[headings.indexOf("parent_1_work_phone_h1")];
        this["parent_1_other_phone"] = array[headings.indexOf("parent_1_other_phone")];
        this["parent_1_mail_address"] = array[headings.indexOf("parent_1_mail_address")];
        this["parent_1_mail_city"] = array[headings.indexOf("parent_1_mail_city")];
        this["parent_1_mail_zip"] = array[headings.indexOf("parent_1_mail_zip")];
        this["disability_1_code"] = array[headings.indexOf("disability_1_code")];
        this["disability_2_code"] = array[headings.indexOf("disability_2_code")];
        this["nmjdob"] = array[headings.indexOf("nmjdob")];
        this["student_id"] = array[headings.indexOf("student_id")];
        this["tchr_num"] = array[headings.indexOf("tchr_num")];
        this["teachname"] = array[headings.indexOf("teachname")];
        this["total_minutes___frequency"] = array[headings.indexOf("total_minutes___frequency")];
        this["frequency"] = array[headings.indexOf("frequency")];
        this["location"] = array[headings.indexOf("location")];
        this["firstname_lastname"] = array[headings.indexOf("firstname_lastname")];
        this["langflu"] = array[headings.indexOf("langflu")];
        this["corrlng"] = array[headings.indexOf("corrlng")];
        this["teachemail"] = array[headings.indexOf("teachemail")];
        this["stuemail"] = array[headings.indexOf("stuemail")];
        this["firslinit"] = array[headings.indexOf("firslinit")];
        this["allServices"] = array[headings.indexOf("allServices")];
        this["notes2"] = array[headings.indexOf("notes2")];
        this["mailParTch"] = function () {
            return this.pem + ", " + this.teachEmail;
        }
    }
}

function getRecord(id) {
    Logger.log('id is %s', id);

    /**
     * 
     * @param sheet [obj]
     * @param row [0 index]
     * @returns array (headings), array (record)
     */
    function getRowAndHeadings(sheet, row) {
        Logger.log('row is %s', row);

        var sheet, headings, values, range, lastR, lastC, rangeH, rangeD;
        lastC = sheet.getLastColumn();
        rangeD = sheet.getRange(row + 1, 1, 1, lastC);
        rangeH = sheet.getRange(1, 1, 1, lastC);
        return [rangeH.getValues()[0], rangeD.getValues()[0]];
    }
    function getAllRecords() {
        var [headings, values, sheet, range, lastR, lastC] = myGet('roster', -1, false);
        var allRecords = [];
        var stuRec = {};
        for (let i = 1; i < values.length; i++) {
            const el = values[i];
            for (let j = 0; j < el.length; j++) {
                const col = el[j];
                let key = values[0][j].toString();
                let value = el[j];
                stuRec[key]=value;
            }
            allRecords.push(stuRec);
            stuRec={};
        }
        Logger.log('allRecords is %s', JSON.stringify(allRecords));
        return allRecords;
    }

    // record was not cached; search for it
    if (id == undefined) { throw "no id at getRecord" };
    if (id == 'all') { return getAllRecords() };
    var [headings, values, sheet, range, lastR, lastC] = myGet('roster', 0, true);
    var row = values.indexOf(id);
    var [arrayH, arrayD] = getRowAndHeadings(sheet, row);
    Logger.log('arrayH is %s', JSON.stringify(arrayH));
    Logger.log('arrayD is %s', JSON.stringify(arrayD));


    var record = new StuRec(arrayD, arrayH);
    Logger.log('record is %s', JSON.stringify(record));

    return JSON.stringify(record);
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
        sheet.getRange(1, column + 1, lastR, 1);
    values = flat == true ? range.getDisplayValues().flat() : range.getDisplayValues();
    headings = (column == -1) ?
        values[0] :
        sheet.getRange(1, 1, 1, lastC).getValues();
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
// from 'library.ts'
function rosterGet() {
    var sheetName = 'roster';
    var values = [];
    var [headings, avalues, sheet, range, lastR, lastC] = myGet('roster');
    values.shift();
    return [headings, values, sheet, range, lastR, lastC];
}
function updateContactInfo(seisId, fldNm, fieldVal) {
    var [headings, values, sheet, range, lastR, lastC] = myGet('roster', 0, true);
    headings = headings.flat();
    Logger.log('headings is %s', JSON.stringify(headings));

    var row = values.indexOf(seisId);
    var col = headings.indexOf(fldNm);
    var el_range = sheet.getRange(row + 1, col + 1, 1, 1);
    el_range.setValue(fieldVal);
    return [seisId, fldNm, fieldVal];
}
function updateSessionStorage(array) {
    var [seisId, fldNm, fieldVal] = array;
    var key = sessionStorage.getItem('rec' + seisId);
    var cachedRecord = JSON.parse(sessionStorage.getItem(key));
    cachedRecord[fldNm] = fieldVal;
    sessionStorage.setItem(key, JSON.stringify(cachedRecord));
}
// $("#loc00tb").empty();
// google.script.run
//     .withSuccessHandler(showRosterTable)
//     .getTableData_roster();
// });