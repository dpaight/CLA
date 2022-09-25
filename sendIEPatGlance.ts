function sendContentsOfAtAGlanceFolder() {
    var [headings, values, sheet, range, lastR, lastC] = myGet('roster');
    var atGlanceFolder = DriveApp.getFolderById('1-hCr-ZRmRV1wQC-YwOy5l2X9Ae3YkxB6');
    
    var files = atGlanceFolder.getFiles();
    while (files.hasNext()) {
        var file = files.next();
        var stuName = file.getName().replace(/_.*/gi, "");
        var blob = file.getBlob().getAs('application/pdf')
        for (let i = 0; i < values.length; i++) {
            const el = values[i];
            if ((el[2] + " " + el[1]).search(stuName) !== -1) {

                var msg = el[2].toString() + " " + el[1].toString() + " has an IEP. I have attached the 'IEP at a Glance' form, FYI, assuming this code works! (I've tested, but that doesn't mean a bug won't pop up now.) "
                Logger.log(msg);
                GmailApp.createDraft
                    (el[33], el[2].toString() + " " + el[1].toString() + "; sorry if this is a duplicate.", msg, 
                    { "attachments": [blob],
                    "cc": "dpaight@hemetusd.org" }
                    ).send(); // el[33], 

            }
        }
    }
    return "emails have been sent";
}