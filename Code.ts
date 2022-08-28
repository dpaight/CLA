// Compiled using dan-cl-retry 1.0.0 (TypeScript 4.5.5)
// Compiled using dan-cl-retry 1.0.0 (TypeScript 4.5.4)
// Compiled using dan-cl-retry 1.0.0 (TypeScript 4.5.4)

var ss = SpreadsheetApp.getActiveSpreadsheet();
var roster = ss.getSheetByName( "roster" );
function allPupilsSheet () {
  var ss2 = SpreadsheetApp.openById(
    "1HoulMp8RlpCxvN4qf10TbxW1vzxzTjbA8xKhFjRdZY8"
  );
  return ss2;
}

class Goal {
  constructor( array ) {
    this[ 'id' ] = array[ 0 ];
    this[ 'lvl' ] = array[ 1 ];
    this[ 'area' ] = array[ 2 ];
    this[ 'strand' ] = array[ 3 ];
    this[ 'annual' ] = array[ 4 ];
    this[ 'standard' ] = array[ 5 ];
    this[ 'objective1' ] = array[ 6 ];
    this[ 'objective2' ] = array[ 7 ];
    this[ 'objective3' ] = array[ 8 ];
    this[ 'mod' ] = array[ 9 ];
  }
  list () {
    var item = '<li class="goalList" glId="' +
      // @ts-ignore
      this.id +
      '">' +
      '["' +
      // @ts-ignore
      this.lvl +
      '"' +
      ", " +
      '"' +
      // @ts-ignore
      this.strand +
      '"' +
      ", " +
      '"' +
      // @ts-ignore
      this.annual +
      '"' +
      ", " +
      '"' +
      // @ts-ignore
      this.standard +
      '"' +
      ", " +
      '"' +
      // @ts-ignore
      this.id +
      '"]</li>';

    return ( item );
  }
  snip () {
    var snip = "[" +
      '"area" = "' +
      // @ts-ignore
      this.area +
      '",' +
      '"gl" = "' +
      // @ts-ignore
      this.annual +
      '",' +
      '"strand" = "' +
      // @ts-ignore
      this.strand +
      '",' +
      '"stnd" = "' +
      // @ts-ignore
      this.standard +
      '"' +
      "]";
    return snip;
  };
  checkboxItem () {
    // @ts-ignore
    var me = this.id;
    console.log( 'i am %s', me );
    return "<div class='input-group-prepend'>" +
      "<div  class='input-group-text'>" +
      "<input type='checkbox' class='glChkBx' data-obj=" + me + ">" +
      "<textarea  class='form-control goalList' style='margin-bottom: 2px; width: 700px;' data-obj=" + me + " readonly >" +
      // @ts-ignore
      this.annual +
      "</textarea>"
    "</div>" +
      "</div>"
  }
  saved () {
    // @ts-ignore
    "<li data-saved='" + snip() + "'>" + this.area + "</li>"
  }
}

// from updateRoster.ts

/**
 *
 * @param e
 * @returns
 */
function doGet ( e ) {
  ss.getSheetByName( "roster" ).sort( 2 );
  ss.getSheetByName( "logRespMerged" ).sort( 1 );
  var t = HtmlService.createTemplateFromFile( "caseLog" );
  t.version = "v18";
  var url = ss.getUrl();
  t.url = url;
  return t
    .evaluate()
    .setSandboxMode( HtmlService.SandboxMode.IFRAME )
    .setXFrameOptionsMode( HtmlService.XFrameOptionsMode.ALLOWALL );
}
function trimSS () {
  var sheets, sheet, last;
  sheets = ss.getSheets();
  var longColumn = [ 0, 0 ];
  for ( let i = 0; i < sheets.length; i++ ) {
    const el = sheets[ i ];
    sheet = sheets[ i ];
    for ( let j = 0; j < sheet.getLastColumn(); j++ ) {
      let column = j + 1;
      let theValues = sheet
        .getRange( 1, column, sheet.getLastRow(), 1 )
        .getValues();
      let thisLast =
        theValues.filter( String ).length > 0
          ? theValues.filter( String ).length
          : 1;
      if ( longColumn[ 1 ] < thisLast ) {
        longColumn = [ j, thisLast ];
      }
    }
    let endRow = sheet.getMaxRows();
    Logger.log( "longColumn = %s", JSON.stringify( longColumn ) );
    let rows = endRow - longColumn[ 1 ];
    // sheet.getRange(longColumn[1] + 1, 1, 1, 1).setValue('trim here');
    Logger.log(
      'on sheet named "%s" the long column is % s and the rows are %s; the number of rows to delete is %s',
      sheet.getName(),
      longColumn,
      rows,
      Math.floor( rows * 0.9 )
    );
    sheet.deleteRows( longColumn[ 1 ] + 1, Math.floor( rows * 0.9 ) );
    longColumn = [ 0, 0 ];
  }
}
var fname = "arguments.callee.toString().match(/function ([^(]+)/)[1]";
// @ts-ignore
function getInitialId () {
  return ss.getSheetByName( "roster" ).getRange( "A3" ).getValue().toString();
}
function sndMl () {
  var teachEmail = "dpaight@hemetusd.org";
  var stuName = "Sally Singsong";
  // The code below will send an email with the current date and time.
  var now = new Date();
  MailApp.sendEmail(
    teachEmail,
    stuName + "'s levels of performance",
    "The IEP for " +
    stuName +
    " is coming up, and I need some information, please. " +
    "The link below points to a Levels of Performance questionnaire in a Google form. I'll use the " +
    "information you provide as data for the IEP. Thank you for your time.<br><br>" +
    "NB: This email was sent automatically. If you have already responded, please ignore this request." +
    "<h2><a href=" +
    "levelsUrl" +
    ">Levels of Performance for " +
    stuName +
    "</a></h2>"
  );
}

/**
 *
 * @param mLvlAry
 */
function sendLevelsForm ( mLvlAry ) {
  // var mailLvlsObj = JSON.parse();
  var mailLvlsObj = {
    stuName: mLvlAry[ 0 ],
    seis_id: mLvlAry[ 1 ],
    teachemail: mLvlAry[ 2 ],
    recipients: "",
    subject: "levels of performance for ",
    body: "",
    levelsUrl: "hold",
    getSubject: function () {
      return this.subject + this.stuName;
    },
    mkOpt: function () {
      return (
        "<body><p>We need some information for an approaching IEP. Thank you for your time. " +
        "\n\nNB: there is no need to enter Map scores or other scores (EL testing, report cards, CAASP) " +
        "that I can get from Aeries. I'll get those scores myself.\n\n</p>" +
        '<a style="font-size: large;" href=' +
        this.levelsUrl +
        ">Short Performance Levels Questionnaire</a></body>"
      );
    },
  };
  mailLvlsObj[ "userEmail" ] = Session.getActiveUser().getEmail();

  var formId = "1PdCenM9sTAwTlb-TxmreJAPuMKYYpBgjeXK-7h0wdtg";
  var form = FormApp.openById( formId );
  var respArray = [ mailLvlsObj.stuName, mailLvlsObj.seis_id ];

  Logger.log( "respary is %s", JSON.stringify( respArray ) );

  var formResponse = form.createResponse();
  form.setCollectEmail( true );
  var items = form.getItems();
  for ( var i = 0; i < 2; i++ ) {
    var item = items[ i ];
    item.getType();
    var resp = respArray[ i ];
    var itemResponse = item.asTextItem().createResponse( resp );
    formResponse.withItemResponse( itemResponse );
  }
  var levelsUrl = formResponse.toPrefilledUrl();

  mailLvlsObj.levelsUrl = levelsUrl.toString();
  mailLvlsObj.recipients = "";

  Logger.log( "object is %s", JSON.stringify( mailLvlsObj ) );
  var confirmationMsg =
    form.getConfirmationMessage() + "; " + formResponse.getEditResponseUrl();
  var htmlBody = mailLvlsObj.mkOpt();
  GmailApp.createDraft( mailLvlsObj.teachemail, mailLvlsObj.getSubject(), "", {
    htmlBody: htmlBody,
  } );
}
// function saveLastId(id) {
//     PropertiesService.getScriptProperties()
//         .setProperty('lastId', id.toString());
//     return id;
// }
function getScriptURL () {
  Logger.log( "script url = %s", ScriptApp.getService().getUrl() );
  return ScriptApp.getService().getUrl().toString();
}
function doPost ( e ) {
  var sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName( "roster_seis" );
  //Parsing the request body
  var body = JSON.parse( e.postData.contents );
  //Adding a new row with content from the request body
  sheet.appendRow( [
    body.id,
    body.date_created,
    body.first_name,
    body.shipping.address,
    body.shipping.phone,
    body.billing.phone,
    body.billing.postcode,
  ] );
}
// script and CSS files have to be stored in HTML files for Google app script
function include ( filename ) {
  return HtmlService.createHtmlOutputFromFile( filename ).getContent();
}
/**
 *
 * @param input [id, [students]]
 * @returns [firstName, lastName, matchingVar]
 */
function getStuName_id ( input ) {
  var id = input[ 0 ],
    students = input[ 1 ];
  var found = false;
  var i = 0;
  while ( found == false && i < 50 ) {
    var el = students[ i ];
    if ( el[ 9 ].toString() == id.toString() ) {
      found = true;
      var fn = el[ 11 ];
      var ln = el[ 10 ];
      var match = el[ 0 ];
      return [ fn, ln, match ];
    }
    i++;
  }
}
function openEvent ( eventId ) {
  if ( eventId === void 0 ) {
    eventId = "761bevgjr7802mpj7tds8egajd";
  }
  var user = "dpaight@hemetusd.org";
  var identity = ScriptApp.getOAuthToken(); //getIdentityToken().toString();
  CalendarApp.getCalendarById(
    "hemetusd.k12.ca.us_mu0bm8h5amcsfvcvpmim3v1fag@group.calendar.google.com"
  ).getEventById( eventId );
  var cal = CalendarApp.getCalendarById(
    "hemetusd.k12.ca.us_mu0bm8h5amcsfvcvpmim3v1fag@group.calendar.google.com"
  );
  // CalendarApp
}
/**
 *
 * @param data array: [glEditId, glEditLevel, glEditArea, glEditStnd, glEditGl]
 * glEditId seis_id or -1 for new id
 */
function saveGoalSS ( obj ) {
  Logger.log( "receive = %s", JSON.stringify( obj ) );
  var sheet = ss.getSheetByName( "goals" );
  var last = sheet.getRange( "A1:A" ).getValues().filter( String ).length;
  var range = sheet.getRange( 1, 1, last, sheet.getLastColumn() );
  var values = range.getValues();
  var nextRow = last + 1;
  var headings = values.shift();
  var max = 0;
  Logger.log( "the obj var = %s", JSON.stringify( obj ) );
  var array0 = Object.values( obj );
  var array = [
    obj.glEditId,
    obj.glEditLevel,
    obj.glEditArea,
    obj.glEditStrand,
    obj.glEditAnnual,
    obj.glEditStandard,
    obj.glEditObj1,
    obj.glEditObj2,
    obj.glEditObj3,
    obj.timestamp,
  ];
  Logger.log( "the array var = %s", JSON.stringify( array ) );
  if ( obj.glEditId != -1 ) {
    for ( let i = 0; i < values.length; i++ ) {
      const eli = values[ i ];
      var [
        glId,
        glEditLevel,
        glEditArea,
        glEditStrand,
        glEditAnnual,
        glEditStandard,
        glEditObj1,
        glEditObj2,
        glEditObj3,
        timestamp,
      ] = eli;
      if ( glId == obj.glEditId ) {
        range = sheet.getRange( i + 2, 1, 1, array.length );
        range.setValues( [ array ] );
        return "replaced";
      }
    }
  } else {
    const arrayColumn = ( arr, n ) => arr.map( ( x ) => x[ n ] );
    var idCol = arrayColumn( values, 0 );
    var newId = Math.max( ...idCol ) + 1;
    Logger.log( "idCol = %s; max value +1 = %s", JSON.stringify( idCol ), newId );
    array.splice( 0, 1, newId );
    range = sheet.getRange( nextRow, 1, 1, array.length );
    range.setValues( [ array ] );
    return obj.glEditId;
  }
}
/**
 *
 * @param lvlArea [levels area, goal area, id]
 * @returns [search term in form 'gradeLevel_area', found goals for display in goal picker
 */
function getGoalListItems ( lvlArea = [ 2, "reading", "1010101" ] ) {
  var [ glLvl, glArea, seis_id ] = lvlArea;
  var goals = [];
  var sheet = ss.getSheetByName( "goals" );
  var last = sheet.getRange( "A1:A" ).getValues().filter( String ).length;
  var range = sheet.getRange( 2, 1, last - 1, sheet.getLastColumn() );
  var values = range.getValues();
  var listItems = [];
  var foundGoals = [];
  values.forEach( function ( el, i ) {
    var [ gId, gLvl, gArea, gStrand, gAnl, gStandard, gO1, gO2, gO3 ] = el;
    if (
      ( gLvl.toString() == glLvl.toString() && gArea == glArea ) ||
      ( glLvl == -1 && gArea == glArea )
    ) {
      var foundGoal = new Goal( [
        gId,
        gLvl,
        gArea,
        gStrand,
        gAnl,
        gStandard,
        gO1,
        gO2,
        gO3
      ] );
      listItems.push( foundGoal.list() );
      foundGoals.push( foundGoal );
    }
  } );
  // Logger.log(JSON.stringify(goals));
  return listItems;
}
/**
 *
 * @param gId
 * @returns formatted string for use in a text blaze macro
 */
function getGoal ( gId = 47 ) {
  var sheet = ss.getSheetByName( "goals" );
  var last = sheet.getRange( "A1:A" ).getValues().filter( String ).length;
  var range = sheet.getRange( 2, 1, last - 1, sheet.getLastColumn() );
  var values = range.getValues();
  for ( let i = 0; i < values.length; i++ ) {
    const el = values[ i ];
    if ( el[ 0 ] == gId ) {
      var [
        id,
        grdLvl,
        area,
        strand,
        annual,
        standard,
        objctv1,
        objctv2,
        objctv3,
      ] = el;
      var goal = new Goal( [
        id,
        grdLvl,
        area,
        strand,
        annual,
        standard,
        objctv1,
        objctv2,
        objctv3
      ] );
    }
    // return false;
  }
  Logger.log( "the goal object is %s", JSON.stringify( goal ) );
  return goal;
}
function getOneGoalForEditing ( gId ) {
  var [ headings, values, sheet, range, lastR, lastC ] = myGet( "goals" );
  for ( let i = 0; i < values.length; i++ ) {
    const el = values[ i ];
    if ( el[ 0 ] == gId ) {
      var [
        id,
        grdLvl,
        area,
        strand,
        annual,
        standard,
        objctv1,
        objctv2,
        objctv3,
      ] = el;

      return new Goal( [
        id,
        grdLvl,
        area,
        strand,
        annual,
        standard,
        objctv1,
        objctv2,
        objctv3
      ] );
    }
  }
  return "goal " + gId + " not found";
}
function saveField ( array ) {
  var [ id, field, fieldValue ] = array;
  Logger.log( JSON.stringify( array ) );
  var [ headings, values, sheet, range, lastR, lastC ] = rosterGet();
  headings = headings.flat();
  var fieldIndex = headings.indexOf( field );
  var seisIdIndex = headings.indexOf( "seis_id" );
  for ( let i = 0; i < values.length; i++ ) {
    const el = values[ i ];
    if ( el[ seisIdIndex ] == id ) {
      // the i + 2 accounts for zero indexing plus loss of first row to headings
      var cell = sheet.getRange( i + 2, fieldIndex + 1, 1, 1 );
      cell.setValue( fieldValue );
      break;
    }
  }
  return [ id, fieldIndex, fieldValue ];
}
/**
 *
 * @param data {array} [last, first, dob]
 * @returns constructed "match" variable using lastName, firstName, and dob as julian date
 */
function makeMatchVar ( data ) {
  if ( data === void 0 ) {
    data = [ "Paight", "Daniel", "1/21/2013" ];
  }

  function daysIntoYear ( date ) {
    return (
      ( Date.UTC( date.getFullYear(), date.getMonth(), date.getDate() ) -
        Date.UTC( date.getFullYear(), 0, 0 ) ) /
      24 /
      60 /
      60 /
      1000
    );
  }

  var y2 = new Date( data[ 2 ] ).getFullYear().toString().slice( 2 );
  var doy = daysIntoYear( new Date( data[ 2 ] ) );
  return ( data[ 0 ] + data[ 1 ] + y2 + doy ).toString().replace( /[^A-z0-9]/g, "" );
}
/**
 *
 * @param nmjdob {string}
 * @param array {array} allPupils sheet in current school students spreadsheet
 * @param matchIndex {number} the index of the lastNameFirstNameDOBasJulianDate
 * @param targetIndex {number} the index of the field in current school students that is to be looked up
 * @returns data field specified in parameters for the record having the "match" variable specified
 */
function getFieldFromnmjdob ( nmjdob, array, matchIndex, targetIndex ) {
  for ( var i = 0; i < array.length; i++ ) {
    var el = array[ i ];
    if ( el[ matchIndex ] == nmjdob ) {
      return el[ targetIndex ];
    }
  }
}
/**
 *
 * @param key
 * @param keyIndex
 * @param array
 * @returns array of contact log entries for the given student specified by id (key)
 */
function doFilter ( key, keyIndex, array ) {
  var iObj = getIndicesByHeading( array );
  var output = [];
  for ( var i = 0; i < array.length; i++ ) {
    var el = array[ i ];
    if ( el[ keyIndex ] == key ) {
      output.push( el );
    }
  }
  return output;
}
/**
 *
 * @param array
 * @returns object with key = heading and value = index of key in table row
 */
function getIndicesByHeading ( array ) {
  var headingsObj = {};
  array.forEach( function ( el, i, array ) {
    let elConv = el.toString().toLowerCase().replace( /[ /]/g, "_" );
    headingsObj[ elConv ] = i;
  } );
  // MailApp.sendEmail("dpaight@hemetusd.org","log", JSON.stringify(headingsObj));
  return headingsObj;
}
function createDrftEM () {
  GmailApp.createDraft( "dpaight@hemetusd.org", "this", "text" );
}

function createDraftEmail ( [ array ] ) {
  var [ recipients, subject, body ] = array;
  var msg = GmailApp.createDraft( recipients, subject, "", { htmlBody: body } );
}
/**
 * Retrieve and log events from the given calendar that have been modified
 * since the last sync. If the sync token is missing or invalid, log all
 * events from up to a month ago (a full sync).
 *
 * @param {string} calendarId The ID of the calender to retrieve events from.
 * @param {boolean} fullSync If true, throw out any existing sync token and
 *        perform a full sync; if false, use the existing sync token if possible.
 */
// Compiled using ts2gas 3.6.1 (TypeScript 3.8.3)
/**
 * Retrieve and log events from the given calendar that have been modified
 * since the last sync. If the sync token is missing or invalid, log all
 * events from up to a month ago (a full sync).
 *
 * @param {string} calendarId The ID of the calender to retrieve events from.
 * @param {boolean} fullSync If true, throw out any existing sync token and
 *        perform a full sync; if false, use the existing sync token if possible.
 */
function getSyncedEvents ( calendarId = "dpaight@hemetusd.org" ) {
  var myEvents = [];
  // google code
  var calendarId = "primary";
  var now = new Date();
  var events = Calendar.Events.list( calendarId, {
    timeMin: now.toISOString(),
    singleEvents: true,
    orderBy: "startTime",
    maxResults: 10,
  } );
  Logger.log( JSON.stringify( Calendar.Events.list( calendarId ) ) );
  if ( events.items && events.items.length > 0 ) {
    for ( var i = 0; i < events.items.length; i++ ) {
      var event = events.items[ i ];
      if ( event.start.date ) {
        // All-day event.
        var start = new Date( event.start.date );
        Logger.log( "%s (%s)", event.summary, start.toLocaleDateString() );
        myEvents.push( [ event.summary, start.toLocaleDateString() ] );
      } else {
        var start = new Date( event.start.dateTime );
        Logger.log( "%s (%s)", event.summary, start.toLocaleString() );
        Logger.log( "%s (%s)", event.summary, start.toLocaleString() );
        myEvents.push( [ event.summary, start.toLocaleDateString() ] );
      }
    }
  } else {
    Logger.log( "No events found." );
  }
}
// google code end
/**
 *
 * @param input
 * @returns  email addresses without the @ sign or anything following the @ sign
 */
function condenseAttendees ( input ) {
  var a = "";
  for ( var i = 0; i < input.length; i++ ) {
    var el = input[ i ];
    if ( el.email.indexOf( "k12" ) == -1 ) {
      if ( el.organizer == true ) {
        a += el.email.replace( /@[A-z0-9]+.[A-z]{3}/g, "" ) + "(CC)" + ", ";
      } else {
        a += el.email.replace( /@[A-z0-9]+.[A-z]{3}/g, "" ) + ", ";
      }
      a += el.email + ", ";
    }
  }
  return a.replace( /@[A-z0-9]+.[A-z]{3}/g, "" );
}
/**
 *
 * @param array
 * @returns nothing, but does filter calendar entries that are mine and records them to 'meetings'
 */
function addMyEventsToList ( array ) {
  // var _a = array[0], idh = _a[0], summaryh = _a[1], starth = _a[2], endh = _a[3], descriptionh = _a[4], htmlLinkh = _a[5];
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName( "meetings" );
  var values,
    newEvents = [];
  var last = sheet.getRange( "a1:a20" ).getValues().filter( String ).length;
  if ( last < 2 ) {
    values = array;
  } else {
    var range = sheet.getRange( 1, 1, last, sheet.getLastColumn() );
    values = range.getDisplayValues();
    var oldIds = [];
    values.forEach( function ( el, i ) {
      oldIds.push( el[ 0 ] );
    } );
    array.forEach( function ( el ) {
      // each item in the meetings table will be 1) deleted, 2) updated, or 3) left as is
      var id = el[ 0 ],
        summary = el[ 1 ],
        start = el[ 2 ],
        end = el[ 3 ],
        desc = el[ 4 ],
        link = el[ 5 ];
      if ( oldIds.indexOf( id ) === -1 ) {
        // new event -- push
        values.push( el );
      } else {
        // on both lists -- update
        values.splice( oldIds.indexOf( id ), 1, el );
      }
    } );
  }
  var destRange = sheet.getRange( 1, 1, values.length, values[ 0 ].length );
  destRange.setValues( values );
}
function deleteCanceledEvent ( eventId ) {
  var sheet = ss.getSheetByName( "meetings" );
  var last = ss
    .getSheetByName( "meetings" )
    .getRange( "A1:A" )
    .getValues()
    .filter( String ).length;
  if ( last > 1 ) {
    var mtngsRng = sheet.getRange( 1, 1, last, sheet.getLastColumn() );
    var mtngsVals = mtngsRng.getValues();
    mtngsRng.clearContent();
    mtngsVals.shift();
    for ( var i = 0; i < mtngsVals.length; i++ ) {
      var row = mtngsVals[ i ];
      if ( row[ 0 ] == eventId ) {
        mtngsVals.splice( i, 1 );
      }
    }
    mtngsRng = sheet.getRange( 2, 1, mtngsVals.length, mtngsVals[ 0 ].length );
    mtngsRng.setValues( mtngsVals );
  }
}
/**
 * Helper function to get a new Date object relative to the current date.
 * @param {number} daysOffset The number of days in the future for the new date.
 * @param {number} hour The hour of the day for the new date, in the time zone
 *     of the script.
 * @return {Date} The new date.
 */
function getRelativeDate ( daysOffset, hour ) {
  var date = new Date();
  date.setDate( date.getDate() + daysOffset );
  date.setHours( hour );
  date.setMinutes( 0 );
  date.setSeconds( 0 );
  date.setMilliseconds( 0 );
  return date;
}
function removeOldMeetings () {
  var sheet, range, values, last;
  var sc = CacheService.getScriptCache();
  sheet = ss.getSheetByName( "meetings" );
  last = ss
    .getSheetByName( "meetings" )
    .getRange( "a1:a" )
    .getValues()
    .filter( String ).length;
  if ( last > 1 ) {
    range = sheet.getRange( 1, 1, last, sheet.getLastColumn() );
    values = range.getValues();
    var headings = values.shift();
    var ids = [ 0 ];
    for ( var i = values.length - 1; i > 0; i-- ) {
      var el = values[ i ];
      if ( ids.indexOf( el[ 1 ] ) == -1 ) {
        ids.push( el[ 1 ] );
      } else {
        sc.remove( "_" + el[ 1 ] );
        values.splice( i, 1 );
      }
    }
    sheet.clear();
    headings = [ "id", "summary", "start", "end", "desc", "link" ];
    values = headings.concat( values );
    var destR = sheet.getRange( 2, 1, values.length, values[ 0 ].length );
    destR.setValues( values );
  }
}
//# sourceMappingURL=module.jsx.map
function printSelectedLogEntries ( stuName, sDate, eDate, array ) {
  array = JSON.parse( array );
  var items = [ [ "Timestamp", "Entries for " + stuName ] ];
  for ( let i = 0; i < array.length; i++ ) {
    const el = array[ i ];
    items.push( [ el[ 0 ], el[ 3 ] ] );
  }
  var destFile = SpreadsheetApp.openById(
    "1sEkijMXT3j9uIJWPqExmREZ2M8U8pO1olxLo-WgsTtI"
  );
  var destSheet = destFile.getSheets()[ 0 ];
  destSheet.clearContents();
  var destRange = destSheet.getRange( 1, 1, items.length, 2 );
  destRange.setValues( items );
  SpreadsheetApp.flush();
  var ssFile = DriveApp.getFileById(
    "1sEkijMXT3j9uIJWPqExmREZ2M8U8pO1olxLo-WgsTtI"
  );
  var file = DriveApp.createFile(
    ssFile
      .getBlob()
      .setName( "log entries from " + sDate + " to " + eDate + " for " + stuName )
  );
  var url = file.getUrl();
  try {
    var folder = DriveApp.getFolderById( "1S7TEP1ixTjhHwZ0APcasGj0fqAaZhvqC" );
    folder.createFile( file );
    // var fileUrl = file
  } catch ( error ) {
    Logger.log( error );
    return "failed " + error;
  }
  return {
    msg: "Contact logs saved to: ",
    filename: file.getName(),
    url: url,
  };
}
// this returns table data to the success Handler on the client side
function getTableData_roster () {
  var [ headings, values, sheet, range, lastR, lastC ] = myGet( "roster" );
  values.shift();
  return JSON.stringify( values );
}
/**
 * @returns [[data from meetings sheet]]
 */
function getCalData_events () {
  var [ headings, values, sheet, range, lastR, lastC ] = getDisp( "meetings" );
  return JSON.stringify( values );
}
function makeLevelsShortcut ( id ) {
  // if (id === void 0) {
  //     id = getLastId();
  // }
  var sheet, range, values, last;
  sheet = ss.getSheetByName( "levels" );
  last = sheet.getRange( "A1:A" ).getValues().filter( String ).length;
  range = sheet.getRange( 2, 1, last - 1, sheet.getlastColumn() );
  values = range.getValues();
  var Timestamp = values[ 0 ],
    email = values[ 1 ],
    name = values[ 2 ],
    idLvls = values[ 3 ],
    prefs = values[ 4 ],
    oral = values[ 5 ],
    oral1 = values[ 6 ],
    reading = values[ 7 ],
    reading1 = values[ 8 ],
    reading2 = values[ 9 ],
    reading3 = values[ 10 ],
    reading4 = values[ 11 ],
    writing = values[ 12 ],
    writing1 = values[ 13 ],
    writing2 = values[ 14 ],
    writing3 = values[ 15 ],
    math = values[ 16 ],
    math1 = values[ 17 ],
    math2 = values[ 18 ],
    math3 = values[ 19 ],
    workHabits = values[ 20 ],
    workHabits1 = values[ 21 ],
    motor = values[ 22 ],
    health = values[ 23 ],
    attendance = values[ 24 ],
    playground = values[ 25 ];
  var levels = {
    Timestamp: Timestamp,
    email: email,
    name: name,
    id: id,
    prefs: prefs,
    oral: oral,
    oral1: oral1,
    reading: reading,
    reading1: reading1,
    reading2: reading2,
    reading3: reading3,
    reading4: reading4,
    writing: writing,
    writing1: writing1,
    writing2: writing2,
    writing3: writing3,
    math: math,
    math1: math1,
    math2: math2,
    math3: math3,
    workHabits: workHabits,
    workHabits1: workHabits1,
    motor: motor,
    health: health,
    attendance: attendance,
    playground: playground,
  };
  var c = ""; // clipboard
  var bt = '","'; // between (items)
  var fQ = "From general ed teacher's responses to a questionnaire: "; //from questionnaire
  // build clipboard contents
  c += "";
  // {={clipboard}["reading"]}
  // {key: tab}{click}{={clipboard}["writing"]}
  // {key: tab}{click}{={clipboard}["math"]}
  // {key: tab}{click}{={clipboard}["lang"]}
  // {key: tab}{={clipboard}["motor"]}
  // {key:tab}{click}{={clipboard}["bhvr"]}; {key: tab}{={clipboard}["health"]}
  // {key:tab}{click}{={clipboard}["wrkHbts"]}{key: tab}{click}
  // {={clipboard}["adptvBhvr"]}
  // "prefs" = "art, PE", "lang" = "language skills are delayed:; Xavier tries hard and never gives up in class. He is respectful and gets along with peers. Xavier is far below basic in reading, language arts. His map scores have remained far below grade level since kindergarten. His guided reading level is D and he is in a daily reading group with three other students before the national emergency to stay home. He has difficulty completing seat work in language arts when compared to peers his same age. He cannot keep up in class with subject matter. He tries to copy a little bit of words to make a sentence but needs a great deal of extra time. He attended Mrs. Paight's ELL group 5 days a week for 30 minutes and worked on activities at their individual level. Where they practice listening, speaking, copying, writing complete sentences and sharing ideas. Xavier has difficulty writing his own complete sentences. They also practiced writing together sentences and then copied them. Wen asked a question, Xavier will answer in one or two words. ", "reading" = "student reads substantially below grade level; segmenting words into their component phonemes, blending sounds into words when presented aurally, consonant digraphs (e.g., ch, th, ng), vowel digraphs (e.g., ai, oa, ay), reading silent e words, reading words with consonant clusters (e.g., st, pr, bl, etc.), syllabication; He can read the high frequency words at kindergarten level and a few of 1st grade. ; approx. grade level for reading comprehension: He has a low and is not progressing from kindergarten level at the same rate when compared to peers his same age. He needs extra time to answer questions in whole group and usually only gives one word answers.; When he is reading is seems like it takes a little while for the visual to catch up with his use of language and speech. He is given more time to respond and I use lower level questions so he can have success in whole group and small group instruction. I was sending home level D books from reading group and Xavier seemed to enjoy the books as he read with me.", "writing" = "written expression skills are substantially below grade level; ending punctuation, use of standard spelling, use of invented spelling (e.g., leaves out important phonetic elements 'par' for 'paper'); writing includes minimal content, ideas are poorly organized; has difficulty writing a coherent paragraph, thoughts are incomplete at the sentence level (not due simply to poor punctuation), He can copy short sentences we have written together. ; I noticed his copying was progressing with Mr. Paight smaller group instruction and he was drawing wonder pictures to go with his writing. But he doesn't create coherent sentences or a paragraph on is own yet.", "math" = "student's math skills are substantially below grade level; Xavier tries hard to understand what we are learning in class. He can add a few numbers when adding and subtracting two digit numbers. However, timed tests he doesn't seem to be able to get more than 5- 10 correct out of 100 problems for 5 minutes. He has difficulty with math fluency. He is far below grade level in math. He likes to use the manipulatives and use drawing with his math problems. His map testing went up 3 points since kindergarten. He cannot comprehend regrouping math 3 digit numbers being added or subtracted complete second grade math. He needs a space to learn where there are a smaller amount of students in the room.; Xavier loves to use drawing in math. I think draw can help him but he still is a lot of difficulty. He needs a lot of support with word problems and cannot complete them by himself. I think comprehension and language limits his ability in word problems. I had him seated by a bilingual student that could help him with math and reading. I also had him in the front row for learning in whole group instruction. I would have him come to the round table for small group instruction in math with his math lessons after instruction.  However he has difficulty still completing math at the second grade level by himself. ; Xavier needs material at a lower level in math to differentiate math lessons. I put him at a lower level for Eureka math with Zearn to help him with gaps. ", "wrkHbts" = "Xavier tries hard. He needs a few reminders to take out his work or begin working. He is a nice young boy and is a pleasure to work with in class.  I miss working with Xavier.", "bhvr" = "He is respectful and tries to listen to instruction. I find him playing with manipulative or drawing on his page. I redirect him back to the problem or page. He doesn't bother anyone else when that happens. ; He has great behavior out of class on the playground.  ", "adptvBhvr" = "Adaptive behaviors (everyday living skills such as walking, talking, getting dressed, going to school, preparing a snack, picking up around the house) are age-appropriate (similar to those of other children at this age)., He needs a little more time to assimilate what is communicated and help with comprehension skills.", "health" = "no chronic health issues are documented in school records", "motor" = "gross-motor skills are age-appropriate (participates in recess games and PE on par with peers), fine-motor skills appear to be delayed (judging from performance on printing/coloring/cutting activities)"
}
function levData ( id = "1010101" ) {
  var sheet = ss.getSheetByName( "lop_mirror2" );
  var last = sheet.getRange( "A1:A" ).getDisplayValues().filter( String ).length;
  var values = sheet.getRange( 1, 1, last, sheet.getLastColumn() ).getValues();
  var headings = values.shift();
  for ( let i = values.length - 1; i > -1; i-- ) {
    const el = values[ i ];
    if ( el[ 3 ].toString() == id.toString() ) {
      return el;
    }
  }
  return '["baseln"="for baseline data, refer to the appropriate section on the Levels of Performance page"]';
}
function getPresentLevelsAsTextBlazeListItem (
  seisId = "1010101",
  areas = [
    "reading",
    "writing",
    "math",
    "lang",
    "motor",
    "bhvr",
    "health",
    "wrkHbts",
    "prefs",
  ]
) {
  var lvlsRecord = levData( seisId );
  if ( lvlsRecord.toString().search( /baseln/ ) != -1 ) {
    return lvlsRecord;
  } else {
    var list = new LevelsPerformance( lvlsRecord );
    var wholeSnip = list.getSnip( areas );
    // Logger.log(wholeSnip);
    return wholeSnip;
  }
}

function LevelsPerformance ( el ) {
  this[ "lvls" ] = {};
  this[ "lvls" ].bhvr1play =
    el[ 25 ].length > 0
      ? "teacher observation: " + el[ 25 ].toString().replace( /"/g, "'" )
      : "";
  this[ "lvls" ].heal11th = el[ 23 ].toString().replace( /"/g, "'" );
  this[ "lvls" ].heal2thattendance = el[ 24 ].toString().replace( /"/g, "'" );
  this[ "lvls" ].langOverall =
    el[ 5 ].length > 0
      ? "teacher observation: " + el[ 5 ].toString().replace( /"/g, "'" )
      : "";
  this[ "lvls" ].langOther = el[ 6 ].toString().replace( /"/g, "'" );
  this[ "lvls" ].math1Overall =
    el[ 16 ].length > 0
      ? "teacher observation: " + el[ 16 ].toString().replace( /"/g, "'" )
      : "";
  this[ "lvls" ].math2Facts = el[ 17 ].toString().replace( /"/g, "'" );
  this[ "lvls" ].math3Calc = el[ 18 ].toString().replace( /"/g, "'" );
  this[ "lvls" ].math4Reasoning = el[ 19 ].toString().replace( /"/g, "'" );
  this[ "lvls" ].math5Other = el[ 26 ].toString().replace( /"/g, "'" );
  this[ "lvls" ].moto1rM =
    el[ 22 ].length > 0
      ? "teacher observation: " + el[ 22 ].toString().replace( /"/g, "'" )
      : "";
  this[ "lvls" ].name = el[ 2 ].toString().replace( /"/g, "'" );
  this[ "lvls" ].prefs = el[ 4 ].toString().replace( /"/g, "'" );
  this[ "lvls" ].read1Overall =
    el[ 7 ].length > 0
      ? "teacher observation: " + el[ 7 ].toString().replace( /"/g, "'" )
      : "";
  this[ "lvls" ].read2Found = el[ 8 ].toString().replace( /"/g, "'" );
  if ( el[ 9 ].toString().length > 0 ) {
    this[ "lvls" ].read3HighFreq = el[ 9 ].toString().replace( /"/g, "'" );
  } else {
    this[ "lvls" ].read3HighFreq = "";
  }
  if ( el[ 10 ].toString().length > 0 ) {
    this[ "lvls" ].read4Comp =
      el[ 10 ].length > 0
        ? "comprehension level (GE) = " + el[ 10 ].toString().replace( /"/g, "'" )
        : "";
  }
  this[ "lvls" ].read5Other = el[ 11 ].toString().replace( /"/g, "'" );
  this[ "lvls" ].stuId = el[ 3 ].toString().replace( /"/g, "'" );
  this[ "lvls" ].timestamp = el[ 0 ].toString().replace( /"/g, "'" );
  this[ "lvls" ].wrkH1bts = el[ 20 ].toString().replace( /"/g, "'" );
  this[ "lvls" ].wrkH2bts =
    el[ 21 ].length > 0
      ? "able to attend to a classwork task at instructional level for " +
      el[ 21 ].toString().replace( /"/g, "'" ) +
      " minutes"
      : "";
  this[ "lvls" ].writ1eOverall =
    el[ 12 ].length > 0
      ? "teacher observation: " + el[ 12 ].toString().replace( /"/g, "'" )
      : "";
  this[ "lvls" ].writ2eMech = el[ 13 ].toString().replace( /"/g, "'" );
  this[ "lvls" ].writ3eContent = el[ 14 ].toString().replace( /"/g, "'" );
  this[ "lvls" ].writ4eOther = el[ 15 ].toString().replace( /"/g, "'" );
  this.getSnip = function ( snipAreas ) {
    // initialize the string vars for making snip lists
    // snipAreas are those collections of questionnaire answers, collections that Tblaze uses to fill forms
    // convert object to an array object named 'ary'
    this[ "lvlsAry" ] = [];
    for ( const key in this.lvls ) {
      if ( Object.prototype.hasOwnProperty.call( this.lvls, key ) ) {
        const el = [ key, this.lvls[ key ] ];
        this.lvlsAry.push( el );
      }
    }
    // Logger.log('this.lvlsAry is %s', JSON.stringify(this.lvlsAry));
    // Logger.log('the length of this.lvlsAry is ' + this.lvlsAry.length);
    var wholeSnip = "";
    // wholeSnip is a set of snipAreas:  {["snipArea"="content of snip", "snipArea"="content of snip"]}
    var partSnip = "";
    // a partSnip is a single snipArea
    // iterate through list of areas on which to make items in a snip list
    for ( let i = 0; i < snipAreas.length; i++ ) {
      const element = snipAreas[ i ];
      var partialSnipArea = element.toString().slice( 0, 4 );
      if ( i > 0 ) {
        partSnip += ", ";
      }
      partSnip += '"' + element + '"=' + '"'; // opening " for value
      for ( let j = 0; j < this.lvlsAry.length; j++ ) {
        const kyval = this.lvlsAry[ j ];
        var partialKey = kyval[ 0 ].toString().slice( 0, 4 );
        if ( partialSnipArea == partialKey && kyval[ 1 ].toString().length > 0 ) {
          partSnip += kyval[ 1 ] + "; "; // ; separator for items within area
        }
      }
      partSnip += '"'; // closing " for value
      if ( partSnip.length > 2 ) {
        wholeSnip += partSnip;
      } else {
        wholeSnip += '"' + snipAreas[ i ] + '"=""';
      }
      partSnip = "";
    }
    wholeSnip = "[" + wholeSnip + "]";
    return wholeSnip;
  };
  this.getSnip_old = function ( snipAreas ) {
    // initialize the string vars for making snip lists
    // snipAreas are those collections of questionnaire answers, collections that Tblaze uses to fill forms
    // convert object to an array object named 'ary'
    this[ "lvlsAry" ] = [];
    for ( const key in this.lvls ) {
      if ( Object.prototype.hasOwnProperty.call( this.lvls, key ) ) {
        const el = [ key, this.lvls[ key ] ];
        this.lvlsAry.push( el );
      }
    }
    // Logger.log('this.lvlsAry is %s', JSON.stringify(this.lvlsAry));
    // Logger.log('the length of this.lvlsAry is ' + this.lvlsAry.length);
    var wholeSnip = "[";
    // wholeSnip is a set of snipAreas:  {["snipArea"="content of snip", "snipArea"="content of snip"]}
    var partSnip = "";
    // a partSnip is a single snipArea
    // iterate through list of areas on which to make items in a snip list
    for ( let i = 0; i < snipAreas.length; i++ ) {
      const element = snipAreas[ i ];
      var partialSnipArea = element.toString().slice( 0, 4 );
      var counter = 0;
      for ( const key in this.lvls ) {
        if ( Object.prototype.hasOwnProperty.call( this.lvls, key ) ) {
          const el = this.lvls[ key ];
          counter++;
          // areas ('math', 'read', 'writ', etc) are contained in first 4 characters of the key and 'snipArea'
          // this should gather all the parts that match the category
          var partialKey = key.toString().slice( 0, 4 );
          if ( partialSnipArea == partialKey ) {
            partSnip += el + "; ";
          }
          if ( counter >= 26 ) {
            partSnip = partSnip.toString().replace( /"/, "'" );
            partSnip = '"' + element + '"="' + partSnip + '"';
            // now we have "area"="value of area"
            wholeSnip =
              wholeSnip == "["
                ? // if this is the firs addition to wholeSnip, omit the comma
                wholeSnip + partSnip
                : wholeSnip + "," + partSnip;
            partSnip = "";
          }
        }
      }
    }
    if ( wholeSnip ) {
      wholeSnip = wholeSnip.toString().replace( /,$/, "" );
      wholeSnip += "]";
      wholeSnip = wholeSnip.toString().replace( /[; ]+/g, "; " );
    }
    // Logger.log('wholeSnip = %s; snipAreas = %s', wholeSnip, JSON.stringify(snipAreas));
    // Logger.log('partSnip = %s; wholeSnip = %s; i = %s; snipArea = %s', partSnip, wholeSnip, i, snipAreas[i]);
    return wholeSnip;
  };
  this.getSnipGoal = function ( snipAreas ) {
    // initialize the string vars for making snip lists
    // snipAreas are those collections of questionnaire answers, collections that Tblaze uses to fill forms
    // wholeSnip is a set of snipAreas:  {["snipArea"="content of snip", "snipArea"="content of snip"]}
    var partSnip = this.getSnip( snipAreas );
    partSnip = partSnip.toString().replace( /"snipAreas[0]="/, '"baseln"=' );
    partSnip = partSnip.toString().replace( /\]/, "" );
    // a partSnip is a single snipArea
    // iterate through list of areas on which to make items in a snip list
    var wholeSnip = partSnip + "]";
    // now we have "baseln"="value of area"
    if ( wholeSnip ) {
      wholeSnip = wholeSnip.toString().replace( /,$/, "" );
      wholeSnip.toString().replace( /[; ]+/g, "; " );
    }
    // Logger.log('wholeSnip = %s; snipAreas = %s', wholeSnip, JSON.stringify(snipAreas));
    // Logger.log('partSnip = %s; wholeSnip = %s; i = %s; snipArea = %s', partSnip, wholeSnip, i, snipAreas[i]);
    return wholeSnip;
  };
}
function addStudentByIdFromRESstudentsServer ( obj ) {
  obj = {
    first: "",
    last: "",
    StudentID: "135262",
    lastAnnual: "",
    lastEval: "",
    seisID: "135262",
  };
  var ss2 = allPupilsSheet();
  var sheet = ss2.getSheetByName( "allPupils" );
  var last = sheet.getRange( "A1:A" ).getValues().filter( String ).length;
  var lastCol = sheet.getLastColumn();
  var range = sheet.getRange( 1, 1, last, lastCol );
  var values = range.getValues();
  var headings = values.shift();
  var iObj = getIndicesByHeading( headings );
  var stuId = obj.StudentID;
  var lastAnnual = obj.lastAnnual;
  var lastEval = obj.lastEval;
  var seisID = obj.seisID;
  for ( let i = 0; i < values.length; i++ ) {
    const el = values[ i ];
    if ( stuId == el[ 0 ] ) {
      var stuToAdd = el;
      break;
    }
  }
  var rHeads = ss
    .getSheetByName( "roster" )
    .getRange( 1, 1, 1, 29 )
    .getValues()
    .flat();
  var newRosterRecord = [ [] ];
  for ( let i = 0; i < rHeads.length; i++ ) {
    const el = rHeads[ i ].toString().toLowerCase();
    var index = parseInt( iObj[ el ] );
    newRosterRecord[ 0 ].push( stuToAdd[ index ] );
  }
  Logger.log( JSON.stringify( newRosterRecord ) );
  var roster = ss.getSheetByName( "roster" );
  var last = roster.getRange( "A1:A" ).getValues().filter( String ).length;
  var destRange = roster.getRange( last + 1, 1, 1, newRosterRecord.length );
  destRange.setValues( [ newRosterRecord ] );
  return seisID;
}
function getRecordIndex ( nmjdob, allPupilsArray, allPupilsHeadings ) {
  var index = allPupilsHeadings.indexOf( "nmjdob" );
  for ( let p = 0; p < allPupilsArray.length; p++ ) {
    const pel = allPupilsArray[ p ];
    if ( nmjdob.toLowerCase() == pel[ index ].toLowerCase() ) {
      return p;
    }
  }
  return -1;
}
function matchRosterFieldsToSeisAndAllPupils ( rosH, seisH, alpH ) {
  var fieldMatches = {};
  for ( let i = 0; i < rosH.length; i++ ) {
    var thisFieldName = rosH[ i ];
    var thisFieldIndexes = ( fieldMatches[ thisFieldName ] = [] );
    thisFieldIndexes.push( i );
    thisFieldIndexes.push( seisH.indexOf( thisFieldName ) );
    thisFieldIndexes.push( alpH.indexOf( thisFieldName ) );
  }
  Logger.log( "fieldMatches = %s", JSON.stringify( fieldMatches ) );
  return fieldMatches;
}
function daysIntoYear ( date ) {
  return (
    ( Date.UTC( date.getFullYear(), date.getMonth(), date.getDate() ) -
      Date.UTC( date.getFullYear(), 0, 0 ) ) /
    24 /
    60 /
    60 /
    1000
  );
}
/**
 *
 * @param data {array} [last, first, dob]
 * @returns constructed "match" variable using lastName, firstName, and dob as julian date
 */
function addMatchVarColOne ( array ) {
  var headings = array.shift();
  var searchItems = { birth: -1, first: -1, last: -1 };
  for ( let i = 0; i < headings.length; i++ ) {
    const el = headings[ i ];
    for ( const key in searchItems ) {
      if ( Object.prototype.hasOwnProperty.call( searchItems, key ) ) {
        const element = searchItems[ key ];
        if (
          element == -1 &&
          el.toString().toLowerCase().search( /(key)/ ) != -1
        ) {
          searchItems[ key ] = i;
        }
      }
    }
  }
  if (
    searchItems.birth == -1 ||
    searchItems.first == -1 ||
    searchItems.last == -1
  ) {
    throw "couldn't find all search items in headings of seis data";
  }

  var seisDataMod = [];
  for ( let i = 0; i < array.length; i++ ) {
    const row = array[ i ];
    var y2 = row[ searchItems.birth ];
    var doy = daysIntoYear( row[ searchItems.birth ] );
    var nmjdob =
      row[ searchItems.last ].toString().replace( /[- ']/g, "" ) +
      row[ searchItems.first ].toString().replace( /[- ']/g, "" ) +
      y2.toString() +
      doy.toString();
    row.unshift( nmjdob );
    seisDataMod.push( row );
  }
  headings.unshift( "nmjdob" );
  // console.log(JSON.stringify(array));
  return [ headings ].concat( seisDataMod );
}
function foldersFromNames () {
  var filing = DriveApp.getFolderById( "0B3J9971qOaVIUUlCWXRCbTNjcUE" );
  var sheet = ss.getSheetByName( "roster" );
  var last = findLastRow( "roster", 1 );
  var range = sheet.getRange( "A2:A22" );
  var entries = range.getValues().flat();
  for ( let i = 0; i < entries.length; i++ ) {
    const element = entries[ i ];
    filing.createFolder( element );
  }
}
function fileInFolders () {
  var sheet = ss.getSheetByName( "roster" );
  var last = findLastRow( "roster", 1 );
  var range = sheet.getRange( "K2:K" + last );
  // these are last names -- something that will be in both the file name and its destination folder name
  var entries = range.getValues().flat();
  // this is the parent folder of the folders and files
  var filing = DriveApp.getFolderById( "0B3J9971qOaVIUUlCWXRCbTNjcUE" );
  // these are the folders into which docs will be filed
  var folders = filing.getFolders();
  // these are the files
  while ( folders.hasNext() ) {
    var folder = folders.next();
    var folderName = folder.getName();
    var files = filing.getFiles();
    for ( let i = 0; i < entries.length; i++ ) {
      var elLn = new RegExp( entries[ i ], "gi" );
      if ( folderName.search( elLn ) != -1 ) {
        files = filing.getFiles();
        while ( files.hasNext() ) {
          var file = files.next();
          var fileName = file.getName();
          if ( fileName.search( elLn ) != -1 ) {
            folder.addFile( file );
            filing.removeFile( file );
          }
        }
      }
    }
  }
}
/**
 * Sets the completed status of a given task.
 * @param {String} taskListId The ID of the task list.
 * @param {String} taskId The ID of the task.
 * @param {Boolean} completed True if the task should be marked as complete, false otherwise.
 */
function setCompleted ( taskListId, taskId, completed ) {
  var task = Tasks.newTask();
  if ( completed ) {
    //@ts-ignore
    task.setStatus( "completed" );
  } else {
    //@ts-ignore
    task.setStatus( "needsAction" );
    //@ts-ignore
    task.setCompleted( null );
  }
  Tasks.Tasks.patch( task, taskListId, taskId );
}
/**
 * Adds a new task to the task list.
 * @param {String} taskListId The ID of the task list.
 * @param {String} title The title of the new task.
 */
function getTasksB ( taskListId ) {
  taskListId = "MDU5NzU5MzE5MTQxNzk5NDEzODU6MDow";
  //@ts-ignore
  var tasks = Tasks.Tasks.list( taskListId ).getItems();
  if ( !tasks ) {
    return [];
  }
  Logger.log( JSON.stringify( tasks ) );
  Logger.log( JSON.stringify( tasks ) );
}
function addTask0 ( taskListId ) {
  taskListId = "MDU5NzU5MzE5MTQxNzk5NDEzODU6MDow";
  var task = {
    title: "Pick up dry cleaning",
    notes: "Remember to get this done!",
  };
}
function getFirstPointer () {
  var [ headings, values, sheet, range, lastR, lastC ] = myGet( "roster", 0, true );
  values.shift();
  //     console.log('getting first pointer; the values array is: %s', JSON.stringify(values));
  Logger.log( values[ 0 ] );
  return values[ 0 ].toString();
}

function deleteEntry ( entryId ) {
  Logger.log( entryId );
  return entryId;
}

function updateLogForm () {
  var [ allheadings, allvalues, allsheet, allrange, alllastR, alllastC ] =
    rosterGet();
  var [ headings, values, sheet, range, lastR, lastC ] = myGet(
    "roster",
    allheadings.indexOf( "nmjdob" ) + 1,
    true
  );
  values.shift();
  Logger.log( "nmjdob array = %s", JSON.stringify( values ) );
  var form = FormApp.openById( "1t9mAS03Kq5C8PkHiCoD47fVGc9c5E_5gnwk4NENJGl4" );
  var items = form.getItems();
  items[ 0 ].asListItem().setChoiceValues( values );
  return ScriptApp.getService().getUrl();
}
/**
 *
 * @param e
 * adds log entry from Forms to regular sheet for log entries
 */
function appendNewLogEntry ( e ) {
  var v = e.namedValues;
  Logger.log( "the object for the form submit event is %s", JSON.stringify( v ) );
  // the object for the form submit event is {"log_entry":["Here is a log entry for the person whose name is first in the alphabet"],"Student":["ArredondoHunter1555"],"Timestamp":["12/24/2021 17:16:51"],"Email Address":["dpaight@hemetusd.org"],"":[""]}
  // updateLogForm();
  getNextLogEntryId();
  var [ Rheadings, Rvalues, Rsheet, Rrange, RlastR, RlastC ] = rosterGet();
  var [ headings, values, sheet, range, lastR, lastC ] = myGet( "logRespMerged" );
  for ( let i = 0; i < Rvalues.length; i++ ) {
    const el = Rvalues[ i ];
    if ( el[ Rheadings.indexOf( "nmjdob" ) ] == v.Student ) {
      var nextId = getNextLogEntryId();
      var record = [
        [
          v.Timestamp,
          v[ "Email Address" ],
          v.Student,
          v.log_entry,
          nextId,
          el[ Rheadings.indexOf( "seis_id" ) ],
        ],
      ];
      var dest_range = sheet.getRange( lastR + 1, 1, 1, record[ 0 ].length );
      dest_range.setValues( record );
    }
  }
  // updateLogForm();
  SpreadsheetApp.flush();
  cacheLogEntry( JSON.stringify( record[ 0 ] ) );
}
function cacheLogEntry ( recordJSN ) {
  var sp = PropertiesService.getScriptProperties();
  if ( sp.getProperty( "newRecord" ) == null ) {
    sp.setProperty( "newRecord", JSON.stringify( [] ) );
  }
  var entries = JSON.parse( sp.getProperty( "newRecord" ) );
  entries.unshift( JSON.parse( recordJSN ) );
  sp.setProperty( "newRecord", JSON.stringify( entries ) );
  //     console.log('newRecord is %s: ', sp.getProperty("newRecord"));
}
function checkForNewLogEntryRecordInCache () {
  var sp = PropertiesService.getScriptProperties();
  var record = sp.getProperty( "newRecord" );
  if ( record == null ) {
    return -1;
  } else {
    sp.deleteProperty( "newRecord" );
    return record;
  }
}
function getCachedLogs () {
  var sp = PropertiesService.getScriptProperties();
  var records = [];
  for ( let i = 0; i < 20; i++ ) {
    if ( sp.getProperty( "le" + i ) != null ) {
      records.push( JSON.parse( sp.getProperty( "le" + i ) ) );
      // sp.remove("le" + i);
    }
  }
  if ( records.length > 0 ) {
    return records;
  } else {
    return -1;
  }
}
function deleteRecord_old ( id = "1010101" ) {
  var [ headings, values, sheet, range, lastR, lastC ] = rosterGet();
  var [ headings_del, values_del, sheet_del, range_del, lastR_del, lastC_del ] =
    myGet( "deleted" );
  var logsToRemove = [];
  var id_index = headings.indexOf( "seis_id" );
  for ( let i = 0; i < values.length; i++ ) {
    const el = values[ i ];
    var thisId = el[ id_index ];
    if ( thisId.toString() == id.toString() ) {
      var deleteMe = values.splice( i, 1 );
      var remainingValues = headings_del.concat( values_del.concat( deleteMe ) );
      var delDestRange = sheet_del.getRange(
        lastR_del + 1,
        1,
        1,
        deleteMe[ 0 ].length
      );
      delDestRange.setValues( deleteMe );
      if ( id.toString() != "1010101" ) {
        var remainingRosterRange = sheet.getRange(
          2,
          1,
          values.length,
          values[ 0 ].length
        );
        sheet.getRange( 2, 1, lastR, lastC ).clear();
        remainingRosterRange.setValues( values );
      }
      extractLogEntries( id );
      return id;
    }
  }
  throw "the id was not found, which is really odd";
}
function deleteRecord ( id ) {
  var [ headings, values, sheet, range, lastR, lastC ] = myGet( "roster" );
  for ( let i = 0; i < values.length; i++ ) {
    const el = values[ i ];
    var thisId = el[ 0 ];
    if ( thisId.toString() == id.toString() ) {
      values.splice( i, 1 );
      range = sheet.getRange( 2, 1, lastR, lastC );
      range.clearContent();

      range = sheet.getRange( 2, 1, values.length, values[ 0 ].length );
      range.setValues( values );
    }
  }
  throw "the id was not found, which is really odd";
}
function extractLogEntries ( id = "1010101" ) {
  var [ headings, values, sheet, range, lastR, lastC ] = myGet( "logRespMerged" );
  var logsToRemove = [];
  for ( let j = 0; j < values.length; j++ ) {
    const elEntry = values[ j ];
    if ( elEntry[ 5 ].toString() == id.toString() ) {
      logsToRemove.push( elEntry );
      values.splice( j, 1 );
      j--;
    }
  }
  var [ headings_rm, values_rm, sheet_rm, range_rm, lastR_rm, lastC_rm ] =
    myGet( "removedLogEntries" );
  var rmRng = sheet_rm.getRange(
    lastR_rm + 1,
    1,
    logsToRemove.length,
    logsToRemove[ 0 ].length
  );
  rmRng.setValues( logsToRemove );
  if ( values.length > 0 ) {
    values = [ headings ].concat( values );
    range.clear();
    SpreadsheetApp.flush();
    var keepersRng = sheet.getRange( 1, 1, values.length, values[ 0 ].length );
    keepersRng.setValues( values );
  } else {
    throw "we have a problem";
  }
}
function findIndexOfStringInArray ( stringItem, array ) {
  // stringItem = "abc";
  // array = ["efg", "ABR", "ABC", "xyz"];
  for ( let k = 0; k < array.length; k++ ) {
    const element = array[ k ];
    if ( stringItem.toLowerCase() == element.toLowerCase() ) {
      Logger.log( k );
      return k;
    }
  }
}
function importXLS_2 () {
  var folderID = "1CZK4YhSS3uiihM-7D-m3sgZWVATWfBK0"; // Added // Please set the folder ID of "FolderB".
  var files = DriveApp.getFolderById( folderID ).getFiles();
  while ( files.hasNext() ) {
    var xFile = files.next();
    var name = xFile.getName();
    if ( name.indexOf( "xlsx" ) > -1 ) {
      var ID = xFile.getId();
      var xBlob = xFile.getBlob();
      var newFile = {
        title: ( name + "_converted_" + new Date().toUTCString() ).replace(
          /\.xlsx/g,
          ""
        ),
        parents: [ { id: folderID } ], //  Added
      };
      var file = Drive.Files.insert( newFile, xBlob, {
        convert: true,
      } );
      var fileId = file.id;
      // Drive.Files.remove(ID); // Added // If this line is run, the original XLSX file is removed. So please be careful this.
    }
  }
  var newData = SpreadsheetApp.openById( fileId )
    .getSheetByName( "Sheet1" )
    .getDataRange()
    .getValues();
  for ( var i = 0; i < newData.length; i++ ) {
    var element = newData[ i ];
    element.splice( 0, 1, element[ 0 ].toString() );
  }
  var destSheet = SpreadsheetApp.openById(
    "1Pe-unMy1vkj3joBvGru03YB1W3a35zNn_vXw9eF0KKk"
  ).getSheetByName( "allPupils" );
  var destRange = destSheet.getRange( 1, 1, newData.length, newData[ 0 ].length );
  destSheet.getRange( 1, 1, 1000, 50 ).clearContent();
  SpreadsheetApp.flush();
  destRange.setValues( newData );
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
  var formulaRng = destSheet.getRange(
    1,
    newData[ 0 ].length + 1,
    1,
    headersAndFormulas[ 0 ].length
  );
  formulaRng.setFormulas( headersAndFormulas );
  SpreadsheetApp.openById( "1Pe-unMy1vkj3joBvGru03YB1W3a35zNn_vXw9eF0KKk" )
    .getSheetByName( "frequency distribution" )
    .getRange( "E14" )
    .setValue( new Date() );
}
function parseClassListReport () {
  // parses the Aeries report entitled 'class list by section'
  // creates a table from which the lookForTeachers function builds a list of
  // teacher email addresses (useful for calendar invites)
  // var file = SpreadsheetApp.openById('1F52KzT7GyHnOzj8Nf2rb44rvdb-orx7bjm_61FUqaQc');
  // var sheet = file.getSheetByName('Sheet1');
  // var range = sheet.getRange('A1:Z');
  var values = parseCSV( "aeries class list by section.csv" );
  var row = [];
  var parsed = [ [ "teachName", "teachEmail", "Student ID", "studentName" ] ];
  var [ theadings, tvalues, tsheet, trange, lastR, lastC ] = myGet(
    "teacherCodes",
    2,
    true
  );
  var [ alltheadings, alltvalues, alltsheet, alltrange, alllastR, alllastC ] =
    myGet( "teacherCodes" );
  var teachers = tvalues.map( function ( x ) {
    return x.toString().replace( /^Teacher: ([A-z]*)/g, "$1" );
  } );
  for ( let i = 0; i < values.length; i++ ) {
    const el = values[ i ];
    if ( el[ 0 ].toString().indexOf( "Teacher" ) == 0 ) {
      try {
        var thisTeacher = el[ 0 ].toString().replace( /^Teacher: ([A-z]*)/g, "$1" );
        var tIndx = teachers.indexOf( thisTeacher ) - 1;
        var thisTeacherEmail = alltvalues[ tIndx ][ 4 ];
      } catch ( error ) {
        Logger.log( "error: %s, %s, %s", error, thisTeacher, thisTeacherEmail );
      }
      var counter = i + 2;
      while ( values[ counter ][ 0 ].toString().search( /\d{6}/ ) !== -1 ) {
        const student = values[ counter ];
        row.push( thisTeacher, thisTeacherEmail, student[ 0 ], student[ 1 ] );
        parsed.push( row );
        row = [];
        counter++;
      }
      row = [];
      i = counter + 1;
    }
  }
  var dest = ss.getSheetByName( "coursesTeachers" );
  var drange = dest.getRange( 1, 1, parsed.length, parsed[ 0 ].length );
  drange.setValues( parsed );
}
function getStuFolder ( fname = "Jeremiah", lname = "Harrison" ) {
  fname = fname.toLowerCase();
  lname = lname.toLowerCase();
  var parentFolder = DriveApp.getFolderById( "0B3J9971qOaVIUUlCWXRCbTNjcUE" );
  var folders = parentFolder.getFolders();
  while ( folders.hasNext() ) {
    var folder = folders.next();
    var folderName = folder.getName().toLowerCase();
    if ( folderName.search( fname ) > -1 && folderName.search( lname ) > -1 ) {
      var url = folder.getUrl();
      // check for presence of instructional notes
      var iepRelFiles = folder.getFiles();
      var instrntsPresent = 0;
      while ( iepRelFiles.hasNext() ) {
        var iepFile = iepRelFiles.next();
        var iepFileName = iepFile.getName().toLocaleLowerCase();
        if ( iepFileName.search( "instrnotes" ) > -1 ) {
          instrntsPresent = 1;
          break;
        }
        instrntsPresent = 0;
      }
      if ( instrntsPresent == 0 ) {
        var instrNotes = DriveApp.getFolderById(
          "13cZ2z5gmxNfTU_N2ko14XYQ9vPD_Ju0d"
        );
        var instrNotesFiles = instrNotes.getFiles();
        while ( instrNotesFiles.hasNext() ) {
          var instrNotesFile = instrNotesFiles.next();
          var instrNotesFileName = instrNotesFile.getName().toLowerCase();
          if (
            instrNotesFileName.search( fname ) > -1 &&
            instrNotesFileName.search( lname ) > -1
          ) {
            var instrNotesFileID = instrNotesFile.getId();
            var shortcut = DriveApp.createShortcut( instrNotesFileID );
            folder.addFile( shortcut );
            break;
          }
        }
      }
      return url;
    }
  }
  var newFolder = parentFolder.createFolder( fname + " " + lname );
  return newFolder.getUrl();
}
function makeInstructionalNotesFiles () {
  var [ headings, values, sheet, range, lastR, lastC ] = rosterGet();
  for ( let i = 0; i < values.length; i++ ) {
    const el = values[ i ];
    var instrntsPresent = 0;
    var fname = el[ 2 ].toLowerCase();
    var lname = el[ 1 ].toLowerCase();
    var instrNotes = DriveApp.getFolderById(
      "13cZ2z5gmxNfTU_N2ko14XYQ9vPD_Ju0d"
    );
    var instrNotesFiles = instrNotes.getFiles();
    while ( instrNotesFiles.hasNext() ) {
      var instrNotesFile = instrNotesFiles.next();
      var instrNotesFileName = instrNotesFile.getName().toLowerCase();
      if (
        instrNotesFileName.search( fname ) > -1 &&
        instrNotesFileName.search( lname ) > -1
      ) {
        // file found;
        instrntsPresent = 1;
        break;
      }
    }
    if ( instrntsPresent == 0 ) {
      var newDoc = DocumentApp.create( fname + " " + lname + " " + "instrnotes" );
      var newDocID = newDoc.getId();
      var newDocFile = DriveApp.getFileById( newDocID );
      newDocFile.moveTo( instrNotes );
    }
  }
}

//  from "logTimers.ts"
/**
 * @param fname (arguments.callee.toString().match(/function ([^\(]+)/)[1])
 *
 */
function lt_logLogTimeStart ( funcName ) {
  var d1 = new Date();
}
function lt_logLogTimeEnd ( funcName ) {
  var d2 = new Date();
}

function getDisp ( sheetName, column = -1, flat = false ) {
  if ( !sheetName ) {
    Logger.log( "missing value" );
  } else {
    Logger.log( sheetName );
  }
  var sheet, headings, values, range, lastR, lastC;
  sheet = ss.getSheetByName( sheetName );
  lastR = findLastRow( sheetName, 1 );
  lastC = sheet.getLastColumn();
  range =
    column == -1
      ? sheet.getRange( 1, 1, lastR, lastC )
      : sheet.getRange( 1, column, lastR, 1 );
  values =
    flat == undefined || flat == false
      ? range.getDisplayValues()
      : range.getDisplayValues().flat();
  headings = values.shift();
  return [ headings, values, sheet, range, lastR, lastC ];
}
/**
 *
 * @param sheet: String (name of sheet)
 * @param column : the column number to check
 * @returns number (last row with data)
 */
function findLastRow ( sheet, column = 1 ) {
  var theSheet = ss.getSheetByName( sheet );
  if ( theSheet.getLastRow() === 0 ) {
    var rows = 1;
  } else {
    rows = theSheet.getLastRow();
  }
  Logger.log( 'sheet, column, theSheet.getLastRow()', sheet, column, theSheet.getLastRow() );

  var theValues = theSheet
    .getRange( 1, column, rows, 1 )
    .getValues();
  var last =
    theValues.filter( String ).length > 0 ? theValues.filter( String ).length : 1;
  return last;
}
function findLastRowById ( fileId, sheet, column ) {
  var ss = SpreadsheetApp.openById( fileId );
  var theSheet = ss.getSheetByName( sheet );
  var theValues = theSheet
    .getRange( 1, column, theSheet.getLastRow(), 1 )
    .getValues();
  var last =
    theValues.filter( String ).length > 0 ? theValues.filter( String ).length : 1;
  return last;
}
function parseCSV ( fName ) {
  var folderId = "1DLxHwR7QlDloES0RCAkuN2bBawdAaAp9";
  var folder = DriveApp.getFolderById( folderId );
  var files = folder.getFiles();
  var fileIds = [];
  // looking for .csv file
  var found = false;
  while ( files.hasNext() && found === false ) {
    var file = files.next();
    var fileName = file.getName();
    var status; // '1' if parse function is successful
    var re = /(fName)/;
    if ( fileName.toString() === fName.toString() ) {
      found = true;
      var csvFile = file.getBlob().getDataAsString();
      fileIds.push( file.getId() );
      var data = Utilities.parseCsv( csvFile );
      // var iObj = getIndicesByHeading(data[0]);
      return data;
    }
  }
}
function matchRosterFieldsToSeis ( rosH, seisH ) {
  var fieldMatches = {};
  for ( let i = 0; i < rosH.length; i++ ) {
    var thisFieldName = rosH[ i ];
    var thisFieldIndexes = ( fieldMatches[ thisFieldName ] = [] );
    thisFieldIndexes.push( i );
    thisFieldIndexes.push( seisH.indexOf( thisFieldName ) );
  }
  Logger.log( "fieldMatches = %s", JSON.stringify( fieldMatches ) );
  return fieldMatches;
}


// from 'lookForTeachers.ts
function lookForTeachers ( id, refresh ) {
  if ( refresh ) {
    parseClassListReport();
  }
  var [ c_headings, c_values, sheet, range, lastR, lastC ] =
    myGet( "coursesTeachers" );
  var [ r_heads, r_vals, rost_sheet, rost_range, rost_lastR, rost_lastC ] =
    myGet( "roster" );
  var ctStuIdIdx = c_headings.indexOf( "Student ID" );
  var seisIdIdx = r_heads.indexOf( "seis_id" );
  var husdIdIdx = r_heads.indexOf( "student_id" );
  var foundCodes = [];
  var teachersInfo = "Current teachers: ";
  // "teachName", "teachEmail", "Student ID", "studentName"
  var tnIdx = c_headings.indexOf( "teachName" );
  for ( let i = 0; i < r_vals.length; i++ ) {
    const el = r_vals[ i ];
    if ( el[ seisIdIdx ] == id ) {
      var husd_id = el[ husdIdIdx ];
      for ( let j = 0; j < c_values.length; j++ ) {
        const celement = c_values[ j ];
        if ( celement[ ctStuIdIdx ] == husd_id ) {
          if ( foundCodes.indexOf( celement[ 0 ] ) == -1 ) {
            foundCodes.push( celement[ 0 ] );
            var ti = celement[ 1 ];
            teachersInfo += ti + ", ";
          }
        }
      }
    }
  }
  // Logger.log('the gathered codes: %s', teachersInfo);
  // var newEntry = putTeachersSetCell([id, teachersInfo]);
  foundCodes = [];
  return teachersInfo;
}
function getTeacherInfo ( tn ) {
  var [ headings, values, sheet, range, lastR, lastC ] = myGet( "teacherCodes" );
  for ( let i = 0; i < values.length; i++ ) {
    const el = values[ i ];
    if ( tn == el[ 0 ] ) {
      return el[ 4 ];
    }
  }
}
function putTeachersSetCell ( array ) {
  var [ id, teachersInfo ] = array;
  var [ headings, values, sheet, range, lastR, lastC ] = myGet( "notes" );
  for ( let i = 0; i < values.length; i++ ) {
    const el = values[ i ];
    if ( id == el[ 0 ] ) {
      sheet = ss.getSheetByName( "notes" );
      range = sheet.getRange( i + 2, 2, 1, 1 );
      var existing = range.getValue();
      if ( existing.toString().indexOf( "<< " ) == -1 ) {
        var newEntry = existing.toString() + "<< " + teachersInfo + " >>";
      } else {
        newEntry = existing
          .toString()
          .replace( /<< .* >>/g, "<< " + teachersInfo + " >>" );
      }
      range.setValue( newEntry );
    }
  }
  return newEntry;
}
// from 'seis_aeries_merge.ts
function runUpdateForTest () {
  updateRoster();
}
function getFromAeriesData ( newDataWithHeadings ) {
  var merged = [
    [
      "seis_id",
      "last_name",
      "first_name",
      "date_of_birth",
      "case_manager",
      "gender",
      "grade_code",
      "date_of_last_annual_plan_review",
      "date_of_next_annual_plan_review",
      "date_of_last_eligibility_evaluation",
      "date_of_next_eligibility_evaluation",
      "date_of_initial_parent_consent",
      "parent_guardian_1_name",
      "parent_1_email",
      "parent_1_cell_phone",
      "parent_1_home_phone",
      "parent_1_work_phone_h1",
      "parent_1_other_phone",
      "parent_1_mail_address",
      "parent_1_mail_city",
      "parent_1_mail_zip",
      "disability_1_code",
      "disability_2_code",
      "nmjdob",
      "student_id",
      "tchr_num",
      "teachname",
      "total_minutes___frequency",
      "frequency",
      "location",
      "firstname_lastname",
      "langflu",
      "corrlng",
      "teachemail",
      "stuemail",
      "firslinit",
      "allServices",
    ],
  ];
  var [ aerHeadings_1, aerValues, aerSheet, aerRange, aerLastR, aerLastC ] =
    myGet( "allPupilsFromAeries" );
  var [ noteheadings, notevalues, notesheet, noterange, notelastR, notelastC ] =
    myGet( "notes" );
  var aerHeadings = aerHeadings_1.map( function ( x, n, arr ) {
    return x.replace( /[^A-z^0-9+]/gi, "_" ).toLowerCase();
  } );
  var servicesValues = importCsv( "services.csv" );
  var servicesHeadings = servicesValues.shift();

  var count = newDataWithHeadings[ 0 ].length + 1;
  for ( let i = 1; i < newDataWithHeadings.length; i++ ) {
    var el = newDataWithHeadings[ i ];
    var [
      seis_id,
      last_name,
      first_name,
      date_of_birth,
      case_manager,
      gender,
      grade_code,
      date_of_last_annual_plan_review,
      date_of_next_annual_plan_review,
      date_of_last_eligibility_evaluation,
      date_of_next_eligibility_evaluation,
      date_of_initial_parent_consent,
      parent_guardian_1_name,
      parent_1_email,
      parent_1_cell_phone,
      parent_1_home_phone,
      parent_1_work_phone_h1,
      parent_1_other_phone,
      parent_1_mail_address,
      parent_1_mail_city,
      parent_1_mail_zip,
      disability_1_code,
      disability_2_code,
      nmjdob,
      student_id,
      tchr_num,
      teachname,
      total_minutes___frequency,
      frequency,
      location,
      firstname_lastname,
      langflu,
      corrlng,
      teachemail,
      stuemail,
      firslinit,
      allServices,
    ] = el;
    // fill unused fields as needed
    // for (let j = 0; j < notUsedCount; j++) {
    //     el.push("");
    // }
    // these are the fields to create for each record
    var nmjdob,
      student_id,
      tchr_num,
      teachname,
      total_minutes___frequency,
      frequency,
      location,
      firstname_lastname,
      langflu,
      corrlng,
      teachemail,
      stuemail,
      firslinit,
      allServices;
    nmjdob = makenmjdob( first_name, last_name, date_of_birth );
    el.push( nmjdob );
    function aerLookup ( nmjdob, fieldIndex ) {
      for ( let i = 0; i < aerValues.length; i++ ) {
        const aerEl = aerValues[ i ];
        if ( nmjdob == aerEl[ aerHeadings.indexOf( "nmjdob" ) ] ) {
          return aerEl[ fieldIndex ];
        }
      }
    }
    function servicesLookup ( seis_id, fieldIndex ) {
      // services fields:
      // ["seis_id","last_name","first_name","serviceid","code","service","marked_dnr","status","start_date","end_date","provider","npa","delivery","session_based","minutes___session","sessions___frequency","total_minutes___frequency","frequency","location","initial_start_date","comments","date_of_birth","date_of_last_annual_plan_review","gender","grade_code","date_of_next_annual_plan_review","parent_1_work_phone_h1","date_of_last_eligibility_evaluation","date_of_next_eligibility_evaluation","date_of_initial_parent_consent","parent_1_cell_phone","parent_1_home_phone","parent_1_other_phone","parent_1_email","parent_guardian_1_name","parent_1_mail_address","parent_1_mail_city","parent_1_mail_zip"]
      for ( let i = 0; i < servicesValues.length; i++ ) {
        const servicesEl = servicesValues[ i ];
        if ( seis_id == servicesEl[ servicesHeadings.indexOf( "seis_id" ) ] ) {
          return servicesEl[ fieldIndex ];
        }
      }
    }
    function gatherAllServices ( seis_id ) {
      var allServ = "\n<< \n";
      for ( let i = 0; i < servicesValues.length; i++ ) {
        const servicesEl = servicesValues[ i ];
        if (
          servicesEl[ 6 ] == "No" &&
          seis_id == servicesEl[ servicesHeadings.indexOf( "seis_id" ) ]
        ) {
          allServ += servicesEl[ 4 ] + ", ";
          if ( servicesEl[ 4 ].toString() == "330" ) {
            allServ += case_manager;
          } else if ( servicesEl[ 4 ].toString() == "415" ) {
            const speech_1 = servicesHeadings.indexOf(
              "Licensed_Speech".toLocaleLowerCase()
            );
            const speech_2 = servicesHeadings.indexOf(
              "Speech-Language Pathologist with Valid Credential".toLowerCase()
            );
            allServ += (
              servicesEl[ speech_1 ].toString() + servicesEl[ speech_2 ]
            ).toString();
          }
          allServ += servicesEl[ 5 ] + "\n";
        }
      }
      allServ += ">>\n";
      for ( let n = 0; n < notevalues.length; n++ ) {
        const nel = notevalues[ n ];
        if ( nel[ 0 ].toString() == seis_id.toString() ) {
          if ( nel[ 1 ].toString().indexOf( "<<" ) == -1 ) {
            var newNote = nel[ 1 ].toString() + allServ;
          } else {
            newNote = nel[ 1 ]
              .toString()
              .replace( /(<<.*\n*.*\n>>)/gm, allServ )
              .replace( /\n+/gm, "\n" )
              .replace( /^\n+/gm, "" );
            notevalues[ n ].splice( 1, 1, newNote );
          }
        }
      }
      return allServ;
    }
    student_id = aerLookup( nmjdob, aerHeadings.indexOf( "student_id" ) );
    el.push( student_id );
    tchr_num = aerLookup( nmjdob, aerHeadings.indexOf( "tchr_num" ) );
    el.push( tchr_num );
    teachname = aerLookup( nmjdob, aerHeadings.indexOf( "teachname" ) );
    el.push( teachname );
    total_minutes___frequency = servicesLookup(
      seis_id,
      servicesHeadings.indexOf( "total_minutes___frequency" )
    );
    el.push( total_minutes___frequency );
    frequency = servicesLookup( seis_id, servicesHeadings.indexOf( "frequency" ) );
    el.push( frequency );
    location = servicesLookup( seis_id, servicesHeadings.indexOf( "location" ) );
    el.push( location );
    firstname_lastname =
      el[ newDataWithHeadings[ 0 ].indexOf( "first_name" ) ] +
      " " +
      el[ newDataWithHeadings[ 0 ].indexOf( "last_name" ) ];
    el.push( firstname_lastname );
    langflu = aerLookup( nmjdob, aerHeadings.indexOf( "langflu" ) );
    el.push( langflu );
    corrlng = aerLookup( nmjdob, aerHeadings.indexOf( "corrlng" ) );
    el.push( corrlng );
    teachemail = aerLookup( nmjdob, aerHeadings.indexOf( "teachemail" ) );
    el.push( teachemail );
    stuemail = aerLookup( nmjdob, aerHeadings.indexOf( "stuemail" ) );
    el.push( stuemail );
    firslinit =
      el[ newDataWithHeadings[ 0 ].indexOf( "first_name" ) ] +
      " " +
      el[ newDataWithHeadings[ 0 ].indexOf( "last_name" ) ][ 0 ] +
      ".";
    el.push( firslinit );

    allServices = getServices( seis_id );
    el.push( allServices );
    merged.push( el );
  }
  // notevalues = noteheadings.concat(notevalues);
  var notesDest = ss.getSheetByName( "notes" );
  var notesRange = notesDest.getRange(
    2,
    1,
    notevalues.length,
    notevalues[ 0 ].length
  );
  notesRange.setValues( notevalues );
  // var testingDest = ss.getSheetByName('testingDest').getRange(1, 1, merged.length, merged
  // [0].length);
  // testingDest.clearContent();
  // SpreadsheetApp.flush();
  // testingDest.setValues(merged);
  return merged;
}
//
// from 'makeDocsForNotes.ts
function makeNewNotesDocs () {
  var [ headings, values, sheet, range, lastR, lastC ] = myGet( "roster" );
  var doc, fn, ln, folder, files, file, fileName, folderId;
  values.shift();
  var root = DriveApp.getRootFolder();
  folderId = "13cZ2z5gmxNfTU_N2ko14XYQ9vPD_Ju0d";
  folder = DriveApp.getFolderById( folderId );
  files = folder.getFiles();
  var fileNamesArr = [];
  while ( files.hasNext() ) {
    file = files.next();
    fileName = file.getName();
    fileNamesArr.push( fileName );
  }
  for ( let i = 0; i < values.length; i++ ) {
    const el = values[ i ];
    const fullName = el[ 2 ].toString() + " " + el[ 1 ].toString();
    if ( fileNamesArr.indexOf( fullName ) == -1 ) {
      try {
        doc = DocumentApp.create( fullName );
        const thisFile = DriveApp.getRootFolder()
          .getFilesByName( fullName )
          .next();
        folder.addFile( thisFile );
        root.removeFile( thisFile );
      } catch ( error ) {
        Logger.log( "there was an error: %s", error.toString() );
      }
    }
  }
  var savedData = sheet.getRange( 3, 1, values.length, values[ 0 ].length );
}
function getLinks () {
  var folder, files, file, url, name;
  var list = [];
  var folderUrl =
    "https://drive.google.com/drive/folders/1FQmYYsp5Rd1JVxW4039F0_oWQpLzEwO8?usp=sharing";
  folder = DriveApp.getFolderById( "1FQmYYsp5Rd1JVxW4039F0_oWQpLzEwO8" );
  files = folder.getFiles();
  while ( files.hasNext() ) {
    file = files.next();
    let fileName = file.getName();
    let name = fileName.replace( /(\d*_)(\w+)(\.pdf)/g, "$2" );
    url = file.getUrl();
    list.push( [ name, url ] );
  }
  var sheet = ss.insertSheet( "urls_of_files" );
  var range = sheet.getRange( 1, 1, list.length, list[ 0 ].length );
  range.setValues( list );
}
function cleanOldLogEntries () {
  var [ headings, logids, sheetLogs, range, lastR, lastC ] =
    myGet( "logRespMerged" );
  var [ rheads, rostids, sheet, range, lastR, lastC ] = myGet( "roster", 1, true );
  var keepers = logids;
  var toss = [];
  var found = [];
  logids.shift();
  rostids.shift();
  for ( let i = 0; i < logids.length; i++ ) {
    var ell = logids[ i ][ 5 ].toString();
    if ( rostids.indexOf( ell ) == -1 ) {
      ell = "-" + logids[ i ][ 5 ].toString();
      logids[ i ][ 5 ] = ell;
    }
  }
  sheetLogs.clearContents();
  var values = [ headings ].concat( logids );
  var destRange = sheetLogs.getRange( 2, 1, values.length, values[ 0 ].length );
  destRange.clearContent();
  destRange.setValues( values );
}
/**
 *
 * @param rosterRow
 */
function FILLMLIST ( rosterRow ) {
  var sheet, range, values, row, columns;
  columns = [ 0, 1, 2, 3, 4, 5, 6, 12, 13, 14, 15, 25, 26 ];
  // columns are adjusted to be zero indexed
  sheet = ss.getSheetByName( "roster" );
  range = sheet.getRange( rosterRow, 1, 1, 30 );
  values = range.getValues();
  row = [];
  for ( let i = 0; i < values[ 0 ].length; i++ ) {
    const element = values[ i ];
    if ( columns.indexOf( i ) !== -1 ) {
      row.push( element );
    }
  }
  row = [ row ];
  var sheetM, rangeM;
  sheetM = ss.getSheetByName( "mailingList" );
  var mlRow = ss.getActiveCell().getRow();
  var mlRng = ss.getActiveSheet().getRange( mlRow, 1, 1, 13 );
  mlRng.setValue( row );
}
function importCsv ( fName = "services.csv" ) {
  var data = parseCSV( fName );
  var oldHeadings = data.shift();

  var newHeadings = oldHeadings.map( function ( x, i, ary ) {
    return x
      .toString()
      .replace( /[ -\/]{1,4}/g, "_" )
      .toLowerCase();
  } );
  for ( let i = 0; i < newHeadings.length; i++ ) {
    // newHeadings.splice(i, 1, el.replace(/[- ]/g, "_").toLowerCase().replace(/provider[_]+/g, ""));
    var el = newHeadings[ i ];
    if ( el.search( "adapt" ) != -1 ) {
      newHeadings.splice( i, 1, "pvdr_425_" + el );
    } else if ( el.search( "patho" ) != -1 ) {
      newHeadings.splice( i, 1, "pvdr_415_" + el );
    } else if ( el.search( "occup" ) != -1 ) {
      newHeadings.splice( i, 1, "pvdr_450_" + el );
    } else if ( el.search( /[glp]ist/ ) != -1 ) {
      newHeadings.splice( i, 1, "pvdr_oth_" + el );
    }
  }
  data = [ newHeadings ].concat( data );
  var sheet = ss.getSheetByName( fName.replace( /\.csv$/g, "" ) );
  sheet.clear();
  sheet.getRange( 1, 1, data.length, data[ 0 ].length ).setValues( data );

  return data;
}
function getServices ( seis_id = 1272325 ) {
  var [ headings, values, sheet, range, lastR, lastC ] = myGet( "services" );
  var services = [];

  var indices = {};
  var index_seis_id = headings.indexOf( "seis_id" );
  var theSrvcs = {
    s1: "-1",
    p1: [],
    s2: "-1",
    p2: [],
    s3: "-1",
    p3: [],
    s4: "-1",
    p4: [],
    s5: "-1",
    p5: [],
    s6: "-1",
    p6: [],
    txt: "",
  };
  function findPvdr ( ary ) {
    var [ headings, row ] = ary;
    var p = [];
    for ( let i = 0; i < row.length; i++ ) {
      const element = row[ i ];
      if (
        row[ i ].toString().length > 3 &&
        headings[ i ].toString().search( /pvdr_/ ) !== -1
      ) {
        p.push( row[ i ].toString() );
      }
    }
    return p;
  }
  var n = 0;
  for ( let i = 0; i < values.length; i++ ) {
    if ( values[ i ][ 0 ].toString() == seis_id.toString() ) {
      n++;
      theSrvcs[ "s" + n ] = values[ i ][ 4 ];
      theSrvcs[ "p" + n ] = findPvdr( [ headings, values[ i ] ] );
      theSrvcs[ "txt" ] += theSrvcs[ "s" + n ] + ": " + theSrvcs[ "p" + n ] + "\n";
    }
  }
  Logger.log( "object is %s", theSrvcs[ "txt" ].toString() );

  return theSrvcs[ "txt" ].toString();
}
function tester () {
  var x = new Date().getFullYear().toString().slice( 2 );
  Logger.log( x.toString() );
}
function makenmjdob ( fn, ln, dob ) {
  var y2 = new Date( dob ).getFullYear().toString().slice( -0, -2 );
  var doy = daysIntoYear( dob );
  var nmjdob =
    ln.replace( /[- ']/g, "" ) +
    fn.replace( /[- ']/g, "" ) +
    y2.toString() +
    doy.toString();
  return nmjdob;
}
class StuRec {
  constructor( array, headings ) {
    this[ "seis_id" ] = array[ headings.indexOf( "seis_id" ) ];
    this[ "last_name" ] = array[ headings.indexOf( "last_name" ) ];
    this[ "first_name" ] = array[ headings.indexOf( "first_name" ) ];
    this[ "date_of_birth" ] = array[ headings.indexOf( "date_of_birth" ) ];
    this[ "case_manager" ] = array[ headings.indexOf( "case_manager" ) ];
    this[ "gender" ] = array[ headings.indexOf( "gender" ) ];
    this[ "grade_code" ] = array[ headings.indexOf( "grade_code" ) ];
    this[ "date_of_last_annual_plan_review" ] = array[ headings.indexOf( "date_of_last_annual_plan_review" ) ];
    this[ "date_of_next_annual_plan_review" ] = array[ headings.indexOf( "date_of_next_annual_plan_review" ) ];
    this[ "date_of_last_eligibility_evaluation" ] = array[ headings.indexOf( "date_of_last_eligibility_evaluation" ) ];
    this[ "date_of_next_eligibility_evaluation" ] = array[ headings.indexOf( "date_of_next_eligibility_evaluation" ) ];
    this[ "date_of_initial_parent_consent" ] = array[ headings.indexOf( "date_of_initial_parent_consent" ) ];
    this[ "parent_guardian_1_name" ] = array[ headings.indexOf( "parent_guardian_1_name" ) ];
    this[ "parent_1_email" ] = array[ headings.indexOf( "parent_1_email" ) ];
    this[ "parent_1_cell_phone" ] = array[ headings.indexOf( "parent_1_cell_phone" ) ];
    this[ "parent_1_home_phone" ] = array[ headings.indexOf( "parent_1_home_phone" ) ];
    this[ "parent_1_work_phone_h1" ] = array[ headings.indexOf( "parent_1_work_phone_h1" ) ];
    this[ "parent_1_other_phone" ] = array[ headings.indexOf( "parent_1_other_phone" ) ];
    this[ "parent_1_mail_address" ] = array[ headings.indexOf( "parent_1_mail_address" ) ];
    this[ "parent_1_mail_city" ] = array[ headings.indexOf( "parent_1_mail_city" ) ];
    this[ "parent_1_mail_zip" ] = array[ headings.indexOf( "parent_1_mail_zip" ) ];
    this[ "disability_1_code" ] = array[ headings.indexOf( "disability_1_code" ) ];
    this[ "disability_2_code" ] = array[ headings.indexOf( "disability_2_code" ) ];
    this[ "nmjdob" ] = array[ headings.indexOf( "nmjdob" ) ];
    this[ "student_id" ] = array[ headings.indexOf( "student_id" ) ];
    this[ "tchr_num" ] = array[ headings.indexOf( "tchr_num" ) ];
    this[ "teachname" ] = array[ headings.indexOf( "teachname" ) ];
    this[ "total_minutes___frequency" ] = array[ headings.indexOf( "total_minutes___frequency" ) ];
    this[ "frequency" ] = array[ headings.indexOf( "frequency" ) ];
    this[ "location" ] = array[ headings.indexOf( "location" ) ];
    this[ "firstname_lastname" ] = array[ headings.indexOf( "firstname_lastname" ) ];
    this[ "langflu" ] = array[ headings.indexOf( "langflu" ) ];
    this[ "corrlng" ] = array[ headings.indexOf( "corrlng" ) ];
    this[ "teachemail" ] = array[ headings.indexOf( "teachemail" ) ];
    this[ "stuemail" ] = array[ headings.indexOf( "stuemail" ) ];
    this[ "firslinit" ] = array[ headings.indexOf( "firslinit" ) ];
    this[ "allServices" ] = array[ headings.indexOf( "allServices" ) ];
    this[ "notes2" ] = array[ headings.indexOf( "notes2" ) ];
    this[ "mailParTch" ] = function () {
      return this.pem + ", " + this.teachEmail;
    }
  }
}

function getRecord ( id ) {
  Logger.log( 'id is %s', id );

  /**
   * 
   * @param sheet [obj]
   * @param row [0 index]
   * @returns array (headings), array (record)
   */
  function getRowAndHeadings ( sheet, row ) {
    Logger.log( 'row is %s', row );

    var sheet, headings, values, range, lastR, lastC, rangeH, rangeD;
    lastC = sheet.getLastColumn();
    rangeD = sheet.getRange( row + 1, 1, 1, lastC );
    rangeH = sheet.getRange( 1, 1, 1, lastC );
    return [ rangeH.getValues()[ 0 ], rangeD.getValues()[ 0 ] ];
  }
  function getAllRecords () {
    var [ headings, values, sheet, range, lastR, lastC ] = myGet( 'roster', -1, false );
    var allRecords = [];
    var stuRec = {};
    for ( let i = 1; i < values.length; i++ ) {
      const el = values[ i ];
      for ( let j = 0; j < el.length; j++ ) {
        const col = el[ j ];
        let key = values[ 0 ][ j ].toString();
        let value = el[ j ];
        stuRec[ key ] = value;
      }
      allRecords.push( stuRec );
      stuRec = {};
    }
    Logger.log( 'allRecords is %s', JSON.stringify( allRecords ) );
    return allRecords;
  }

  // record was not cached; search for it
  if ( id == undefined ) { throw "no id at getRecord" };
  if ( id == 'all' ) { return getAllRecords() };
  var [ headings, values, sheet, range, lastR, lastC ] = myGet( 'roster', 0, true );
  var row = values.indexOf( id );
  var [ arrayH, arrayD ] = getRowAndHeadings( sheet, row );
  Logger.log( 'arrayH is %s', JSON.stringify( arrayH ) );
  Logger.log( 'arrayD is %s', JSON.stringify( arrayD ) );

  var record = new StuRec( arrayD, arrayH );
  Logger.log( 'record is %s', JSON.stringify( record ) );

  return JSON.stringify( record );
}
function getNotes ( data ) {
  var [ id, value ] = data;
  Logger.log( 'params %s, %s', id, value );
  var sheet = ss.getSheetByName( 'notes' );
  var array = sheet.getRange( 'A1:B30' ).getDisplayValues();
  for ( let i = 0; i < array.length; i++ ) {
    const element = array[ i ];
    if ( id.toString() == element[ 0 ] )
      if ( value == undefined || value == null ) {
        return element[ 1 ];
      }
      else {
        var cell = sheet.getRange( i + 1, 2, 1, 1 );
        cell.setValue( value );
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
function myGet ( sheetName, column = -1, flat = false ) {
  if ( !sheetName ) {
    Logger.log( 'missing value' );
  }
  else {
    Logger.log( sheetName );
  }
  ;
  var sheet, headings, values, range, lastR, lastC;
  sheet = ss.getSheetByName( sheetName );
  lastR = findLastRow( sheetName, 1 );
  lastC = sheet.getLastColumn() > 0 ? sheet.getLastColumn() : 1;
  range = ( column == -1 ) ?
    sheet.getRange( 1, 1, lastR, lastC ) :
    sheet.getRange( 1, column + 1, lastR, 1 );
  values = flat == true ? range.getDisplayValues().flat() : range.getDisplayValues();
  headings = ( column == -1 ) ?
    values[ 0 ] :
    sheet.getRange( 1, 1, 1, lastC ).getValues();
  return [ headings, values, sheet, range, lastR, lastC ];
}
function getById ( fileId, sheetName, column = -1, flat = false ) {
  var ss = SpreadsheetApp.openById( fileId );
  if ( !sheetName ) {
    Logger.log( 'missing value' );
  }
  else {
    Logger.log( sheetName );
  }
  var sheet, headings, values, range, lastR, lastC;
  sheet = ss.getSheetByName( sheetName );
  lastR = findLastRowById( fileId, sheetName, 1 );
  lastC = sheet.getLastColumn();
  range = ( column == -1 ) ?
    sheet.getRange( 1, 1, lastR, lastC ) :
    sheet.getRange( 1, column, lastR, 1 );
  values = ( flat == undefined || flat == false ) ?
    range.getValues() :
    range.getValues().flat();
  headings = values.shift();
  return [ headings, values, sheet, range, lastR, lastC ];
}
function goalsGet () {
  var sheet = ss.getSheetByName( 'goals' );
  var lastR = findLastRow( sheet.getName(), 1 );
  var lastC = sheet.getLastColumn();
  var range = sheet.getRange( 1, 1, lastR, lastC );
  var values = range.getValues();
  return values;

}
// from 'library.ts'
function rosterGet () {
  var sheetName = 'roster';
  var values = [];
  var [ headings, avalues, sheet, range, lastR, lastC ] = myGet( 'roster' );
  values.shift();
  return [ headings, values, sheet, range, lastR, lastC ];
}
function updateContactInfo ( seisId, fldNm, fieldVal ) {
  var [ headings, values, sheet, range, lastR, lastC ] = myGet( 'roster', 0, true );
  headings = headings.flat();
  Logger.log( 'headings is %s', JSON.stringify( headings ) );

  var row = values.indexOf( seisId );
  var col = headings.indexOf( fldNm );
  var el_range = sheet.getRange( row + 1, col + 1, 1, 1 );
  el_range.setValue( fieldVal );
  return [ seisId, fldNm, fieldVal ];
}



function updateRoster_old () {
  // 
  // get seis data
  // get seis data
  var count = 0;
  var newRecs = [];
  var deletedRecords = [];
  function reformatHeadings ( array ) {
    var aryFmt = array.map( function ( x, n, arr ) {
      return x.replace( /[^A-z^0-9+]/gi, "_" ).toLowerCase();
    } );
    return aryFmt;
  }
  function indexHeadings ( array ) {
    var i, obj, key, val;
    obj = {};
    for ( let i = 0; i < array.length; i++ ) {
      const el = array[ i ];
      key = array[ i ];
      val = i;
      obj[ key ] = val;
    }
    return obj;
  }
  function getRecNmjdobInd ( array, index ) {
    var indicesOfMatch = {};
    for ( let i = 0; i < array.length; i++ ) {
      const el = array[ i ];
      indicesOfMatch[ el[ index ] ] = i;
    }
    return indicesOfMatch;
  }

  // seis csv report
  var sVals = parseCSV( "roster_seis.csv" );
  for ( let i = 0; i < sVals.length; i++ ) {
    const element = sVals[ i ];
    if ( i === 0 ) {
      element.unshift( "nmjdob" );
    } else {
      element.unshift( makeMatchVar( [ element[ 1 ], element[ 2 ], element[ 3 ] ] ) );
    }
  }
  var sHeads = reformatHeadings( sVals.shift() );
  // roster -- the current roster sheet
  var [ rHeads, rVals, rSheet, rRange, rLastR, rLastC ] = myGet( "roster" );
  rHeads = reformatHeadings( rHeads );

  // allPupils -- data from Aeries
  var pSheet, pLast, pRange, pVals, pHeads, pMatch, sMatch, rMatch, x;
  var ss2 = allPupilsSheet();
  pSheet = ss2.getSheetByName( "allPupilsModNames" );
  pLast = pSheet.getRange( "a1:a" ).getValues().filter( String ).length;
  pRange = pSheet.getRange( 1, 1, pLast - 1, pSheet.getLastColumn() );
  pVals = pRange.getDisplayValues();
  pHeads = reformatHeadings( pVals[ 0 ] );

  // now update existing records and add new records
  //The IND objects havefield names as keys and indexes to those fields as values
  //  fieldName: index within record
  var rInd = indexHeadings( rHeads );
  var pInd = indexHeadings( pHeads );
  var sInd = indexHeadings( sHeads );
  // The  match items are objects with 
  // nmdjob: index,
  rMatch = getRecNmjdobInd( rVals, rInd[ "nmjdob" ] );
  sMatch = getRecNmjdobInd( sVals, sInd[ "nmjdob" ] );
  pMatch = getRecNmjdobInd( pVals, pInd[ "nmjdob" ] );

  // find new records
  // The y loop is going through records imported most recently from the Seis system
  for ( let y = 0; y < sVals.length; y++ ) {
    const sEl = sVals[ y ];
    if ( y === 0 ) {
      // initialize rIds and newrec
      var rIds = [];
      for ( let r = 0; r < rVals.length; r++ ) {
        const id = rVals[ r ][ rInd[ 'nmjdob' ] ];
        rIds.push( id );
      }
    }
    if ( rIds.indexOf( sEl[ sInd[ 'nmjdob' ] ] ) === -1 ) {
      let newRec = [];
      for ( let r = 0; r < rVals[ 0 ].length; r++ ) {
        newRec.push( "" );
      }
      newRec.splice( rInd[ "nmjdob" ], 1, sEl[ sInd[ "nmjdob" ] ] );
      newRecs.push( newRec );
    }
  }

  if ( newRecs.length > 0 ) {
    rVals = rVals.concat( newRecs );
    newRecs = [];
  }
  // The J loop is going through records already in the roster
  for ( let j = 1; j < rVals.length; j++ ) {
    const rEl = rVals[ j ];
    var r_nmjdob = rEl[ rInd[ "nmjdob" ] ];
    if ( sMatch[ r_nmjdob ] === undefined ) {
      // record is not in the seis file; assume deleted
      deletedRecords.push( rEl );
      rVals.splice( j, 1 );
    } else {
      for ( let u = 0; u < rEl.length; u++ ) {
        var nextField = sInd[ rHeads[ u ] ];
        if ( nextField > -1 ) {
          let col = sInd[ rHeads[ u ] ];
          let row = sMatch[ r_nmjdob ];
          rEl.splice( u, 1, sVals[ row ][ col ] );
        } else {
          var nextField = pInd[ rHeads[ u ] ];
          if ( nextField > -1 ) {
            try {
              let row = pMatch[ r_nmjdob ];
              let col = pInd[ rHeads[ u ] ];
              rEl.splice( u, 1, pVals[ row ][ col ] );

            } catch ( error ) {
              // do nothing              
            }
          }
        }
      }
    }
  }
  var dest = ss.getSheetByName( "roster" );
  dest.clear();
  var range = dest.getRange( 1, 1, rVals.length, rVals[ 0 ].length );
  range.setValues( rVals );

  if ( deletedRecords.length > 0 ) {
    var dest = ss.getSheetByName( "deleted" );
    dest.clear();
    var range = dest.getRange( dest.getLastRow() + 1, 1, deletedRecords.length, deletedRecords[ 0 ].length );
    range.setValues( deletedRecords );
  }

  Logger.log( "done" );
}
var ss = SpreadsheetApp.getActiveSpreadsheet();

// takes Data sent from the client side and saves it on the server side spreadsheet;
// returns id for 'show...' function
/**
 * 
 * @param logObj 
 * @returns 
 */
function saveNewLogEntryServer ( logObj ) {
  // var obj = {
  //     "seis_id": id,
  //     "logEntry": entry,
  //     "nmjdob": nmjdob,
  //     "logId"
  // } [timestamp	email	studentMC	log_entry	log_entry_id	SEIS_ID]
  Logger.log( 'obj received = %s', JSON.stringify( logObj ) );
  if ( logObj == undefined || logObj == null || logObj.length == 0 ) {
    Logger.log( 'logObj is null, undefined, or empty' );
  } else {
    Logger.log( JSON.stringify( logObj ) );
  }
  var [ headings, logVals, logResp, range, last, lastC ] = myGet( 'logRespMerged' );
  logObj.logId = getNextLogEntryId();
  var row = [ [ new Date(), Session.getActiveUser().getEmail(), logObj.nmjdob, logObj.logEntry, logObj.logId, logObj.seis_id ] ];
  var range = logResp.getRange( last + 1, 1, 1, row[ 0 ].length );
  range.setValues( row );
  row = row[ 0 ];
  SpreadsheetApp.flush();
  return [ JSON.stringify( logObj ), JSON.stringify( row ) ];
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
function saveEditedLogEntryServer_hold ( logObjStr ) {
  Logger.log( logObjStr );
  var [ headings, values, sheet, range, lastR, lastC ] = myGet( 'logRespMerged' );
  headings.shift();
  var logObj = JSON.parse( logObjStr );
  var row = [ logObj.logDate, Session.getActiveUser().getEmail(), logObj.nmjdob, logObj.logEntry, logObj.logId, logObj.seis_id ];
  Logger.log( 'the row is %s', JSON.stringify( row ) );
  var lid_index = headings.indexOf( 'log_entry_id' );
  for ( let i = 0; i < values.length; i++ ) {
    var el = values[ i ];
    // var entryIDindex = headings.indexOf( 'logId' );
    if ( el[ lid_index ] == logObj.logId ) {
      if ( logObj.remove == true ) {
        values.splice( i, 1 );
      } else {
        values.splice( i, 1, row );
      }
      Logger.log( 'the index to the record was %s', i );
      break;
    }
    // var test = ss.insertSheet('test');
  }
  // var test = ss.getSheetByName('test');
  sheet.clearContents();
  var output = [ headings ].concat( values );
  range = sheet.getRange( 1, 1, output.length, output[ 0 ].length );
  range.setValues( output );
  return JSON.stringify( logObj );
}
function saveEditedLogEntryServer ( logObjStr ) {
  Logger.log( logObjStr );
  var [ headings, values, sheet, range, lastR, lastC ] = myGet( 'logRespMerged' );
<<<<<<< HEAD
  // headings.shift();
  console.log( 'the headings are %s', JSON.stringify( headings ) );

=======
>>>>>>> 960fcd9d3c282e3d5bed0df99ed3c3891c0b6261
  var logObj = JSON.parse( logObjStr );
  var row = [ logObj.logDate, Session.getActiveUser().getEmail(), logObj.nmjdob, logObj.logEntry, logObj.logId, logObj.seis_id ];
  Logger.log( 'the row is %s', JSON.stringify( row ) );
  if ( !row ) { throw "the 'row' is null or undefined" };
  var lid_index = headings.indexOf( 'log_entry_id' );
<<<<<<< HEAD
  for ( let i = 0; i < values.length; i++ ) {
    var el = values[ i ];
    // var entryIDindex = headings.indexOf( 'logId' );
    console.log( 'the item is %s; %s; %s', JSON.stringify( lid_index ), JSON.stringify( logObj.logId ), JSON.stringify( el ) );

    if ( el[ lid_index ] == logObj.logId ) {
      Logger.log( "was found" );
      range = sheet.getRange( ( i + 1 ), 1, 1, row.length );
      var checkRow = range.getValues();
      if ( checkRow[ lid_index ] === row[ lid_index ] ) {
        Logger.log( 'verified' );

      }
      if ( logObj.remove === true ) {
        sheet.deleteRows( i + 2 );
      } else {
        range.setValues( [ row ] );
        console.log( 'the row values are %s', JSON.stringify( row ) );

        Logger.log( 'values were set' );
      }
      Logger.log( 'the index to the record was %s; the row value in the range is %s', i, ( i + 1 ) );

=======
  Logger.log( 'lid_index is %s', lid_index );
  for ( let i = 0; i < values.length; i++ ) {
    var el = values[ i ];
    // var entryIDindex = headings.indexOf( 'logId' );
    if ( el[ lid_index ] == logObj.logId ) {
      range = sheet.getRange( i + 1, 1, 1, el.length );

      var checkRow = range.getValues();
      checkRow = checkRow[ 0 ];
      Logger.log( 'i: %s, checkRow: %s, row: %s', i, JSON.stringify( checkRow ), JSON.stringify( row ) );
      if ( checkRow[ 4 ] === row[ 4 ] ) {
        if ( logObj.remove == true ) {
          sheet.deleteRows( i + 1 );
        } else {
          range.setValues( [ row ] );
        }
      } else {
        Logger.log( 'checkRow[4] and row[4]: %s, %s', checkRow[ 4 ].toString(), row[ 4 ].toString() )
      }
      Logger.log( 'the index to the record was %s', i );
>>>>>>> 960fcd9d3c282e3d5bed0df99ed3c3891c0b6261
      break;
    }
    // var test = ss.insertSheet('test');
  }
  // var test = ss.getSheetByName('test');
  // sheet.clearContents();
  // var output = [ headings ].concat( values );
  // range = sheet.getRange( 1, 1, output.length, output[ 0 ].length );
  // range.setValues( output );
  return JSON.stringify( logObj );
}

function getNextLogEntryId () {
  var sheet = ss.getSheetByName( 'logRespMerged' );
  var last = sheet.getRange( 'A1:A' ).getValues().filter( String ).length;
  var entry_ids = sheet.getRange( 'E2:E' + last ).getValues().flat();
  return Math.max( ...entry_ids ) + 1;
}
function getLogEntry ( logId = '1' ) {
  var [ headings, values, sheet, range, lastR, lastC ] = myGet( 'logRespMerged' );
  for ( let i = values.length - 1; i > -1; i-- ) {
    const el = values[ i ];
    var [ timestamp, email, studentMC, log_entry, log_entry_id, SEIS_ID ] = el;

    if ( el[ 4 ] == logId ) {
      var obj = {
        "nmjdob": el[ 2 ],
        "entry": el[ 3 ],
        "logId": el[ 4 ],
        "seis_id": el[ 5 ]
      };
      Logger.log( 'log entry is %s', JSON.stringify( obj ) );
      return JSON.stringify( obj );
    }
  }
}

function getLogEntries ( id = '1010101', loc = null, startDate, endDate ) {
  var [ headings, ids, sheet, range, lastR, lastC ] = myGet( 'roster', 0, true );
  ids.shift(); // file has an extra headings line
  var allRecords = [];
  var [ logTableHeadings, values, sheet, range, lastR, lastC ] = myGet( 'logRespMerged' );
  values.sort( function ( a, b ) {
    if ( a[ 0 ] < b[ 0 ] ) {
      return -1;
    }
    else if ( a[ 0 ] > b[ 0 ] ) {
      return 1;
    }
    else {
      return 0;
    }
  } );
  for ( let i = 0; i < ids.length; i++ ) {
    var el = ids[ i ];
    var entryIDindex = ( logTableHeadings.indexOf( 'SEIS_ID' ) );
    var stuRecord = [];
    var count = 0;
    for ( let j = values.length - 1; j > -1; j-- ) {
      var log = values[ j ];
      if ( log[ entryIDindex ] == el ) {
        stuRecord.push( log );
        count++;
        // if (count > 10) {
        // break;
        // }
      }
    }
    allRecords.push( [ el, stuRecord ] );
  }
  // Logger.log('allRecords = %s', JSON.stringify(allRecords));
  return JSON.stringify( allRecords, loc );
}
function getSelGoals_server () {
  var [ headings, values, sheet, range, lastR, lastC ] = myGet( "glObjs" );
  if ( values.length > 1 ) {
    values.shift();
  }
  return values;
}
function putSelGoals_server ( checkedGoals ) {
  Logger.log( 'checkedGoals is %s', JSON.stringify( checkedGoals ) );

  var [ headings, values, sheet, range, lastR, lastC ] = myGet( "glObjs" );
  if ( values.length !== 0 ) {

    for ( let i = 0; i < values.length; i++ ) {
      var oldRec = values[ i ];
      for ( let j = 0; j < checkedGoals.length; j++ ) {
        var nwRec = checkedGoals[ j ];
        Logger.log( ' are they equal: %s, %s', nwRec[ 0 ], oldRec[ 0 ] );

        if ( nwRec[ 0 ].toString() === oldRec[ 0 ].toString() ) {
          values.splice( i, 1, nwRec );
          checkedGoals.splice( j, 1 );
        }
      }
    }
  }
  try {
    if ( checkedGoals.length > 0 ) {
      values = values.concat( checkedGoals );
    }
    Logger.log( 'the data to write is %s', JSON.stringify( values ) );

    sheet.clear();
    var destRange = sheet.getRange( 1, 1, values.length, 2 );
    destRange.setValues( values );
  } catch ( error ) {

    return error;
  }
  return 'success';
}
function getCellCounts () {
  var rows, columns, cells, sheetName, dataRows;
  var sheets = ss.getSheets();
  dataRows = [ [ 'name', 'rows', 'columns', 'cells' ] ];

  for ( let i = 0; i < sheets.length; i++ ) {
    const el = sheets[ i ];
    let name = el.getName();
    if ( name === 'counts' ) {
      el.activate();
      ss.deleteActiveSheet();
      sheets.splice( i, 1 );
    }
    let rows = el.getMaxRows();
    let columns = el.getMaxColumns();
    let cells = rows * columns;
    dataRows.push( [ name, rows, columns, cells ] );
  }
  sheets[ 0 ].activate();
  var destSheet = ss.insertSheet( 'counts' );
  var range = destSheet.getRange( 1, 1, dataRows.length, dataRows[ 0 ].length );
  range.setValues( dataRows );
  destSheet.setFrozenRows( 1 );
<<<<<<< HEAD
}

function updateRoster_old2 () {
  // 
  // get seis data
  // get seis data
  var count = 0;
  var newRecs = [];
  var deletedRecords = [];
  function reformatHeadings ( array ) {
    var aryFmt = array.map( function ( x, n, arr ) {
      return x.replace( /[^A-z^0-9+]/gi, "_" ).toLowerCase();
    } );
    return aryFmt;
  }
  function indexHeadings ( array ) {
    var i, obj, key, val;
    obj = {};
    for ( let i = 0; i < array.length; i++ ) {
      const el = array[ i ];
      key = array[ i ];
      val = i;
      obj[ key ] = val;
    }
    return obj;
  }
  function getRecNmjdobInd ( array, index ) {
    var indicesOfMatch = {};
    for ( let i = 0; i < array.length; i++ ) {
      const el = array[ i ];
      indicesOfMatch[ el[ index ] ] = i;
    }
    return indicesOfMatch;
  }

  // seis csv report
  var sVals = parseCSV( "roster_seis.csv" );
  for ( let i = 0; i < sVals.length; i++ ) {
    const element = sVals[ i ];
    if ( i === 0 ) {
      element.unshift( "nmjdob" );
    } else {
      element.unshift( makeMatchVar( [ element[ 1 ], element[ 2 ], element[ 3 ] ] ) );
    }
  }
  var sHeads = reformatHeadings( sVals.shift() );
  // roster -- the current roster sheet
  var [ rHeads, rVals, rSheet, rRange, rLastR, rLastC ] = myGet( "roster" );
  rHeads = reformatHeadings( rHeads );

  // allPupils -- data from Aeries
  var pSheet, pLast, pRange, pVals, pHeads, pMatch, sMatch, rMatch, x;
  var ss2 = allPupilsSheet();
  pSheet = ss2.getSheetByName( "allPupilsModNames" );
  pLast = pSheet.getRange( "a1:a" ).getValues().filter( String ).length;
  pRange = pSheet.getRange( 1, 1, pLast - 1, pSheet.getLastColumn() );
  pVals = pRange.getDisplayValues();
  pHeads = reformatHeadings( pVals[ 0 ] );

  // now update existing records and add new records
  //The IND objects havefield names as keys and indexes to those fields as values
  //  fieldName: index within record
  var rInd = indexHeadings( rHeads );
  var pInd = indexHeadings( pHeads );
  var sInd = indexHeadings( sHeads );
  // The  match items are objects with 
  // nmdjob: index,
  rMatch = getRecNmjdobInd( rVals, rInd[ "nmjdob" ] );
  sMatch = getRecNmjdobInd( sVals, sInd[ "nmjdob" ] );
  pMatch = getRecNmjdobInd( pVals, pInd[ "nmjdob" ] );

  // find new records
  // The y loop is going through records imported most recently from the Seis system
  for ( let y = 0; y < sVals.length; y++ ) {
    const sEl = sVals[ y ];
    if ( y === 0 ) {
      // initialize rIds and newrec
      var rIds = [];
      for ( let r = 0; r < rVals.length; r++ ) {
        const id = rVals[ r ][ rInd[ 'nmjdob' ] ];
        rIds.push( id );
      }
    }
    if ( rIds.indexOf( sEl[ sInd[ 'nmjdob' ] ] ) === -1 ) {
      let newRec = [];
      for ( let r = 0; r < rVals[ 0 ].length; r++ ) {
        newRec.push( "" );
      }
      newRec.splice( rInd[ "nmjdob" ], 1, sEl[ sInd[ "nmjdob" ] ] );
      newRecs.push( newRec );
    }
  }

  if ( newRecs.length > 0 ) {
    rVals = rVals.concat( newRecs );
    newRecs = [];
  }
  // The J loop is going through records already in the roster
  for ( let j = 1; j < rVals.length; j++ ) {
    const rEl = rVals[ j ];
    var r_nmjdob = rEl[ rInd[ "nmjdob" ] ];
    if ( sMatch[ r_nmjdob ] === undefined ) {
      // record is not in the seis file; assume deleted
      deletedRecords.push( rEl );
      rVals.splice( j, 1 );
    } else {
      for ( let u = 0; u < rEl.length; u++ ) {
        var nextField = sInd[ rHeads[ u ] ];
        if ( nextField > -1 ) {
          let col = sInd[ rHeads[ u ] ];
          let row = sMatch[ r_nmjdob ];
          rEl.splice( u, 1, sVals[ row ][ col ] );
        } else {
          var nextField = pInd[ rHeads[ u ] ];
          if ( nextField > -1 ) {
            try {
              let row = pMatch[ r_nmjdob ];
              let col = pInd[ rHeads[ u ] ];
              rEl.splice( u, 1, pVals[ row ][ col ] );

            } catch ( error ) {
              // do nothing              
            }
          }
        }
      }
    }
  }
  var dest = ss.getSheetByName( "roster" );
  dest.clear();
  var range = dest.getRange( 1, 1, rVals.length, rVals[ 0 ].length );
  range.setValues( rVals );

  if ( deletedRecords.length > 0 ) {
    var dest = ss.getSheetByName( "deleted" );
    dest.clear();
    var range = dest.getRange( dest.getLastRow() + 1, 1, deletedRecords.length, deletedRecords[ 0 ].length );
    range.setValues( deletedRecords );
  }

  Logger.log( "done" );
=======
>>>>>>> 960fcd9d3c282e3d5bed0df99ed3c3891c0b6261
}