function addFromAeriesID(stuID) {
    // stuID = "159026";
    const dataSheet = ss.getSheetByName("allPupilsFromAeries");
    const dataRange = dataSheet.getDataRange();
    var data = dataRange.getValues();
    var rosterFields = ss.getSheetByName('roster').getRange('A1:1').getValues();
    var selectedFields = [
        "corrlng",
        "parent_1_mail_city",
        "parent_1_mail_zip",
        "last_name",
        "first_name",
        "date_of_birth",
        "gender",
        "grade_code",
        "parent_guardian_1_name",
        "parent_1_home_phone",
        "parent_1_mail_address",
        "nmjdob",
        "student_id",
        "tchr_num",
        "teachname",
        "langflu"
    ];
    var headings = data[0];
    var rosterFieldMap = {
        "corrlng": [rosterFields[0].indexOf("corrlng"), headings.indexOf("CorrLng")],
        "last_name": [rosterFields[0].indexOf("last_name"), headings.indexOf("Last Name")],
        "first_name": [rosterFields[0].indexOf("first_name"), headings.indexOf("First Name")],
        "date_of_birth": [rosterFields[0].indexOf("date_of_birth"), headings.indexOf("Birthdate")],
        "gender": [rosterFields[0].indexOf("gender"), headings.indexOf("Sex")],
        "grade_code": [rosterFields[0].indexOf("grade_code"), headings.indexOf("Grade")],
        "parent_guardian_1_name": [rosterFields[0].indexOf("parent_guardian_1_name"), headings.indexOf("Parent/guardian")],
        "parent_1_home_phone": [rosterFields[0].indexOf("parent_1_home_phone"), headings.indexOf("Primary Phone")],
        "parent_1_mail_address": [rosterFields[0].indexOf("parent_1_mail_address"), headings.indexOf("Mailing Address")],
        "parent_1_mail_city": [rosterFields[0].indexOf("parent_1_mail_city"), headings.indexOf("City")],
        "parent_1_mail_zip": [rosterFields[0].indexOf("parent_1_mail_zip"), headings.indexOf("Zip code")],
        "nmjdob": [rosterFields[0].indexOf("nmjdob"), headings.indexOf("nmjdob")],
        "student_id": [rosterFields[0].indexOf("student_id"), headings.indexOf("Student ID")],
        "tchr_num": [rosterFields[0].indexOf("tchr_num"), headings.indexOf("Tchr Num")],
        "teachname": [rosterFields[0].indexOf("teachname"), headings.indexOf("teachName")],
        "langflu": [rosterFields[0].indexOf("langflu"), headings.indexOf("LangFlu")]
    };
    var c = data[0].indexOf("Student ID");
    for (let i = 0; i < data.length; i++) {
        var el = data[i];
        if (el[c].toString() === stuID) {
            var newRec = [];
            var aRec = data[i];
            for (let a = 0; a < 41; a++) {
                newRec.push("");
            }

            for (let r = 0; r < selectedFields.length; r++) {
                const el = selectedFields[r].toString();
                let rIndex = rosterFieldMap[el][0];
                let pIndex = rosterFieldMap[el][1];
                newRec.splice(rIndex, 1, aRec[pIndex]);
            }
            var ms = new Date().getMilliseconds();
            // .slice(-0, -6);

            newRec.splice(0, 1, "u_00" + ms.toString());
            var nextRosterRow = ss.getSheetByName('roster').getRange('A1:A').getValues().filter(String).length;
            var rosterSht = ss.getSheetByName('roster');
            var newRecRange = rosterSht.getRange(nextRosterRow + 1, 1, 1, newRec.length);
            newRecRange.setValues([newRec]);
            rosterSht.sort(2);
            return "id found";
        }
    }
    return "id not found";
}