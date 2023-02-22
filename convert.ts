function convertXLSFilesToCSV() {
    // "1nZmeys-WvSux7r2w87eTKzmgaZMpMnTq" [excelFiles]
    // "1gPgB58lTcUJNX39_DklgwJBW-zH3KeDl" [csvFiles]

    var oauthToken = ScriptApp.getOAuthToken(),
        sourceFolder = DriveApp.getFolderById("1nZmeys-WvSux7r2w87eTKzmgaZMpMnTq"),
        targetFolder = DriveApp.getFolderById("1gPgB58lTcUJNX39_DklgwJBW-zH3KeDl"),
        mimes = [MimeType.MICROSOFT_EXCEL, MimeType.MICROSOFT_EXCEL_LEGACY];

    /* Written by Amit Agarwal */
    /* email: amit@labnol.org  */
    /* website: www.ctrlq.org */

    for (var m = 0; m < mimes.length; m++) {
        var files = sourceFolder.getFilesByType(mimes[m]);

        while (files.hasNext()) {
            var sourceFile = files.next();

            // Re-upload the XLS file after convert in Google Sheet format
            var googleSheet = JSON.parse(
                UrlFetchApp.fetch('https://www.googleapis.com/upload/drive/v2/files?uploadType=media&convert=true', {
                    method: 'post',
                    contentType: 'application/vnd.ms-excel',
                    payload: sourceFile.getBlob().getBytes(),
                    headers: {
                        Authorization: 'Bearer ' + oauthToken,
                    },
                }).getContentText()
            );

            // The exportLinks object has a link to the converted CSV file
            var targetFile = UrlFetchApp.fetch(googleSheet.exportLinks['text/csv'], {
                method: 'get',
                headers: {
                    Authorization: 'Bearer ' + oauthToken,
                },
            });

            // Save the CSV file in the destination folder
            targetFolder.createFile(targetFile.getBlob()).setName(sourceFile.getName() + '.csv');

            var data = parseCSV(targetFile.getBlob().getDataAsString());

            // Delete the processed file
            // sourceFile.setTrashed(true);
        }
    }
}
function parseCSV(fName, folderID = "1gPgB58lTcUJNX39_DklgwJBW-zH3KeDl") {
    var folder = DriveApp.getFolderById(folderID);
    var files = folder.getFiles();
    var fileIds = [];
    // looking for .csv file
    while (files.hasNext()) {
        var file = files.next();
        var fileName = file.getName();
        var status; // '1' if parse function is successful
        var re = new RegExp(fName, "gi");

        if (fileName.toString().search(re) !== -1) {
            var csvdata = file.getBlob().getDataAsString();
            var data = Utilities.parseCsv(csvdata);
            return data;
        }
    }
}
function importXLS_2() {
    var folderID = "1CZK4YhSS3uiihM-7D-m3sgZWVATWfBK0"; // Added // Please set the folder ID of "FolderB".
    var files = DriveApp.getFolderById(folderID).getFiles();
    while (files.hasNext()) {
        var xFile = files.next();
        var name = xFile.getName();
        if (name.indexOf("xlsx") > -1) {
            var ID = xFile.getId();
            var xBlob = xFile.getBlob();
            var newFile = {
                title: (name + "_converted_" + new Date().toUTCString()).replace(/\.xlsx/g, ""),
                parents: [{ id: folderID }]
            };
            var file = Drive.Files.insert(newFile, xBlob, {
                convert: true
            });
            var fileId = file.id;
            // Drive.Files.remove(ID); // Added // If this line is run, the original XLSX file is removed. So please be careful this.
        }
    }
    var newData = SpreadsheetApp.openById(fileId)
        .getSheetByName("Sheet1")
        .getDataRange()
        .getValues();
    for (var i = 0; i < newData.length; i++) {
        var element = newData[i];
        element.splice(0, 1, element[0].toString());
    }
    var destSheet = SpreadsheetApp.openById("1Pe-unMy1vkj3joBvGru03YB1W3a35zNn_vXw9eF0KKk").getSheetByName("allPupils");
    var destRange = destSheet.getRange(1, 1, newData.length, newData[0].length);
    destSheet.getRange(1, 1, 1000, 50).clearContent();
    SpreadsheetApp.flush();
    destRange.setValues(newData);
    var headersAndFormulas = [
        [
            '=ArrayFormula(iferror(vlookup($M1:$M, teacherCodes!$B$1:$H, 7,false),if(row($M1:$M) = 1, "teachEmail","")))	',
            '=ArrayFormula(iferror(vlookup($M1:$M,{teacherCodes!$B$1:$I34 }, 8,false),if(row($M$1:$M) = 1,"teachName","")))	',
            '=ArrayFormula(if(row($Z$1:$Z) <> 1, if(isBlank($A$1:$A),,if(($M$1:$M = 21) + ($M$1:$M = 100) + ($M$1:$M = 105) + sum($S$1:$S = "X") > 0, 1, 0)),"sdc||rsp"))	',
            '=ArrayFormula(if(row(A1:A)=1,"nmjdob",regexreplace(if(isblank(A1:A),, REGEXREPLACE(C1:C & D1:D, "[ \'-]", "") & right(year(G1:G),2) & days("12/31/"&(year(G1:G)-1), G1:G)),"-","")))',
            '=ArrayFormula(if(isblank(id),, regexreplace(C1:C & "_" & firstName & "_" & A1:A, "[ \'-]", "")))',
            '=ArrayFormula(if(isblank(id),, REGEXREPLACE(C1:C & "_" & firstName & "_dob_" & dob, "[ \'-]", "")))',
            '=ArrayFormula(if(isblank(id),, REGEXREPLACE(C1:C & "_" & firstName, "[ \'-]", "")))',
            '=ArrayFormula(if(isblank(id),, REGEXREPLACE(D1:D & "_" & lastName, "[ \'-]", "")))',
            '=ARRAYFORMULA((H1:H)&", "&(V1:V))',
        ],
    ];
    var formulaRng = destSheet.getRange(1, newData[0].length + 1, 1, headersAndFormulas[0].length);
    formulaRng.setFormulas(headersAndFormulas);
    SpreadsheetApp.openById("1Pe-unMy1vkj3joBvGru03YB1W3a35zNn_vXw9eF0KKk")
        .getSheetByName("frequency distribution")
        .getRange("E14")
        .setValue(new Date());
}

function getExcelData() {
    var folderId = '1nZmeys-WvSux7r2w87eTKzmgaZMpMnTq';
    var convertedFolderId = '18VFAC0ZfzxPSDk7tBrzCeh0etT7V_yLZ';
    var folder = DriveApp.getFolderById(folderId);
    var files = folder.getFiles();
    var folderIdArray = [convertedFolderId];
    while (files.hasNext()) {
        var file = files.next();
        var fileName = file.getName();
        if (fileName.indexOf('xlsx') != -1) {
            var fileId = file.getId();
            var fileBlob = file.getBlob().setContentTypeFromExtension();
            var converted = convertExcel2Sheets(fileBlob, fileName, folderIdArray);
            var sheet = ss.getSheetByName('allPupils');
            var convId = converted.getId();
            converted = SpreadsheetApp.openById(convId);
        }
    }

    // now put all the sheets files in one sheet and delete the parts
    files = DriveApp.getFolderById(convertedFolderId).getFiles();
    var counter = 0;
    var allValues = [];
    while (files.hasNext()) {
        file = files.next();
        let fileID = file.getId();
        let sheet = SpreadsheetApp.openById(fileID);
        let range = sheet.getDataRange();
        let values = range.getValues();
        if (counter = 0) {
            allValues = values;
        } else {
            values.unshift();
            allValues = allValues.concat(values);
        }
        file.setTrashed(true);
    }
    // var newData = converted.getSheetByName('Sheet1').getDataRange().getValues();
    // for (var i = 0; i < newData.length; i++) {
    //     var element = newData[i];
    //     element.splice(0, 1, element[0].toString());
    // }
    var destSheet = ss.getSheetByName('allPupilsFromAeries');
    var destRange = destSheet.getRange(1, 1, allValues.length, allValues[0].length);
    destSheet.getRange(1, 1, 1000, 50).clearContent();
    SpreadsheetApp.flush();
    destRange.setValues(allValues);
    var headersAndFormulas = [[
        '=ArrayFormula(iferror(vlookup(tchrNum, teacherCodes!$B$1:$H, 5,false),if(row($M1:$M) = 1, "teachEmail","")))	',
        '=ArrayFormula(iferror(vlookup(tchrNum,{teacherCodes!$B$1:$I68 }, 2,false),if(row($M$1:$M) = 1,"teachName","")))	',
        '=ArrayFormula(iferror(vlookup(tchrNum, teacherCodes!$B$1:$H, 6,false),if(row($M1:$M) = 1, "teachMeet","")))	',
        '=ArrayFormula(if(row($Z$1:$Z) <> 1, if(isBlank($A$1:$A),,if(($M$1:$M = 21) + ($M$1:$M = 100) + ($M$1:$M = 105) + sum($S$1:$S = "X") > 0, 1, 0)),"sdc||rsp"))	',
        // '=ArrayFormula(if(row(A1:A)=1,"nmJdob",regexreplace(if(isblank(A1:A),, REGEXREPLACE(C1:C & D1:D, "[ \'-]", "") & right(year(G1:G),2) & days(\"12/31/\"&(year(G1:G)-1), G1:G)),"-","")))',
        '=ArrayFormula(if(row(ID)=1,"nmJdob",regexreplace(if(isblank(ID),, REGEXREPLACE(LASTNAME & FIRSTNAME, "[ \'-]", "") & right(year(dob),2) & days("12/31/"&(year(dob)-1), dob)),"-","")))',
        '=ArrayFormula(if(isblank(ID),, regexreplace(LASTNAME & "_" & FIRSTNAME & "_" & ID, "[ \'-]", "")))',
        '=ArrayFormula(if(isblank(ID),, REGEXREPLACE(LASTNAME & "_" & FIRSTNAME & "_dob_" & dob, "[ \'-]", "")))',
        '=ArrayFormula(if(isblank(ID),, REGEXREPLACE(LASTNAME & "_" & FIRSTNAME, "[ \'-]", "")))',
        '=ArrayFormula(if(isblank(ID),, REGEXREPLACE(FIRSTNAME & "_" & LASTNAME, "[ \'-]", "")))',
        '=ARRAYFORMULA((H1:H)&", "&(V1:V))'
    ]];
    // ss.getRangeByName('grade');
    var formulaRng = destSheet.getRange(1, allValues[0].length + 1, 1, headersAndFormulas[0].length);
    formulaRng.setFormulas(headersAndFormulas);
    // ss.getSheetByName('frequency distribution').getRange("E14").setValue(new Date());

}
function convertExcel2Sheets(excelFile, filename, arrParents) {
    var parents = arrParents || []; // check if optional arrParents argument was provided, default to empty array if not
    //   if ( !parents.isArray ) parents = []; // make sure parents is an array, reset to empty array if not
    // Parameters for Drive API Simple Upload request (see https://developers.google.com/drive/web/manage-uploads#simple)
    var uploadParams = {
        method: 'post',
        contentType: 'application/vnd.ms-excel',
        contentLength: excelFile.getBytes().length,
        headers: { 'Authorization': 'Bearer ' + ScriptApp.getOAuthToken() },
        payload: excelFile.getBytes()
    };
    // Upload file to Drive root folder and convert to Sheets
    // @ts-ignore
    var uploadResponse = UrlFetchApp.fetch('https://www.googleapis.com/upload/drive/v2/files/?uploadType=media&convert=true', uploadParams);
    // Parse upload&convert response data (need this to be able to get id of converted sheet)
    var fileDataResponse = JSON.parse(uploadResponse.getContentText());
    // Create payload (body) data for updating converted file's name and parent folder(s)
    var payloadData = {
        title: filename,
        parents: []
    };
    if (parents.length) { // Add provided parent folder(s) id(s) to payloadData, if any
        for (var i = 0; i < parents.length; i++) {
            try {
                var folder = DriveApp.getFolderById(parents[i]); // check that this folder id exists in drive and user can write to it
                payloadData.parents.push({ id: parents[i] });
            }
            catch (e) { } // fail silently if no such folder id exists in Drive
        }
    }
    // Parameters for Drive API File Update request (see https://developers.google.com/drive/v2/reference/files/update)
    var updateParams = {
        method: 'put',
        headers: { 'Authorization': 'Bearer ' + ScriptApp.getOAuthToken() },
        contentType: 'application/json',
        payload: JSON.stringify(payloadData)
    };
    // Update metadata (filename and parent folder(s)) of converted sheet
    // @ts-ignore
    UrlFetchApp.fetch('https://www.googleapis.com/drive/v2/files/' + fileDataResponse.id, updateParams);
    return SpreadsheetApp.openById(fileDataResponse.id);
}