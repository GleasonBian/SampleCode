/**
 * Tests for the 'html/html.js' file.
 */
// Do not warn if these variables were not defined before.
/* global QUnit */
QUnit.module("html");

QUnit.test("Test array to html function.", function (assert) {
    // 1D array
    var array0 = [0, 1, 2, 3];
    var table0 = dwv.html.toTable(array0);
    var table0_ref = "<table><tbody><tr><td>0</td><td>1</td><td>2</td><td>3</td></tr></tbody></table>";
    assert.equal(table0.outerHTML, table0_ref, "1D array");
   
    // 2D array
    var arrayIn0 = [0, 1];
    var arrayIn1 = [2, 3];
    var array1 = [arrayIn0, arrayIn1];
    var table1 = dwv.html.toTable(array1);
    var table1_ref = "<table><tbody><tr><td>0</td><td>1</td></tr><tr><td>2</td><td>3</td></tr></tbody></table>";
    assert.equal(table1.outerHTML, table1_ref, "2D array");
   
    // array of objects
    var array2 = [{"a":0, "b":1}, {"a":2, "b":3}];
    var table2 = dwv.html.toTable(array2);
    var table2_ref = "<table><thead><tr><th data-priority=\"1\">A</th><th data-priority=\"1\">B</th></tr></thead><tbody><tr><td>0</td><td>1</td></tr><tr><td>2</td><td>3</td></tr></tbody></table>";
    assert.equal(table2.outerHTML, table2_ref, "Array of objects");
    
    // object
    // not testing with null values since they are treated differently in browsers
    var obj = {};
    obj.first = {"a":0, "b":1};
    obj.second = {"a":"hello", "b":undefined};
    var table3 = dwv.html.toTable(obj);
    var table3_ref = "<table><thead><tr><th>Name</th><th data-priority=\"1\">A</th><th data-priority=\"1\">B</th></tr></thead><tbody><tr><td>first</td><td>0</td><td>1</td></tr><tr><td>second</td><td>hello</td><td>undefined</td></tr></tbody></table>";
    assert.equal(table3.outerHTML, table3_ref, "Object");
});

QUnit.test("Test get URI param.", function (assert) {
    // simple test URI
    
    var params;
    
    // test 00
    var root00 = "http://test.com?input=";
    var uri00 = "result";
    var full00 = root00 + encodeURIComponent(uri00);
    params = dwv.html.getUriParam(full00);
    var res00 = dwv.html.decodeKeyValueUri( params.input, params.dwvReplaceMode );
    var theo00 = [uri00];
    assert.equal(res00.toString(), theo00.toString(), "Http uri");
    // test 01
    var root01 = "file:///test.html?input=";
    var uri01 = "result";
    var full01 = root01 + encodeURIComponent(uri01);
    params = dwv.html.getUriParam(full01);
    var res01 = dwv.html.decodeKeyValueUri( params.input, params.dwvReplaceMode );
    var theo01 = [uri01];
    assert.equal(res01.toString(), theo01.toString(), "File uri");
    // test 02
    var root02 = "file:///test.html?input=";
    var uri02 = "result?a=0&b=1";
    var full02 = root02 + encodeURIComponent(uri02);
    params = dwv.html.getUriParam(full02);
    var res02 = dwv.html.decodeKeyValueUri( params.input, params.dwvReplaceMode );
    var theo02 = [uri02];
    assert.equal(res02.toString(), theo02.toString(), "File uri with args");

    // test 03
    var root03 = "file:///test.html";
    var full03 = root03 + encodeURIComponent(root03);
    var res03 = dwv.html.getUriParam(full03);
    assert.equal(res03, null, "File uri with no args");

    // real world URI
    
    // wado (called 'anonymised')
    var root10 = "http://ivmartel.github.io/dwv/demo/static/index.html?input=";
    var uri10 = "http://dicom.vital-it.ch:8089/wado?requestType=WADO&contentType=application/dicom&studyUID=1.3.6.1.4.1.19291.2.1.1.2675258517533100002&seriesUID=1.2.392.200036.9116.2.6.1.48.1215564802.1245749034.88493&objectUID=1.2.392.200036.9116.2.6.1.48.1215564802.1245749034.96207";
    var full10 = root10 + encodeURIComponent(uri10);
    params = dwv.html.getUriParam(full10);
    var res10 = dwv.html.decodeKeyValueUri( params.input, params.dwvReplaceMode );
    var theo10 = [uri10];
    assert.equal(res10.toString(), theo10.toString(), "Wado url");
    
    // babymri
    var root11 = "http://ivmartel.github.io/dwv/demo/static/index.html?input=";
    var uri11 = "http://x.babymri.org/?53320924&.dcm";
    var full11 = root11 + encodeURIComponent(uri11);
    params = dwv.html.getUriParam(full11);
    var res11 = dwv.html.decodeKeyValueUri( params.input, params.dwvReplaceMode );
    var theo11 = [uri11];
    assert.equal(res11.toString(), theo11.toString(), "Babymri uri");
    
    // github
    var root12 = "http://ivmartel.github.io/dwv/demo/static/index.html?input=";
    var uri12 = "https://github.com/ivmartel/dwv/blob/master/data/cta0.dcm?raw=true";
    var full12 = root12 + encodeURIComponent(uri12);
    params = dwv.html.getUriParam(full12);
    var res12 = dwv.html.decodeKeyValueUri( params.input, params.dwvReplaceMode );
    var theo12 = [uri12];
    assert.equal(res12.toString(), theo12.toString(), "Github uri");
    
    // multiple URI
    
    // simple test: one argument
    var root20 = "file:///test.html?input=";
    var uri20 = "result?a=0";
    var full20 = root20 + encodeURIComponent(uri20);
    params = dwv.html.getUriParam(full20);
    var res20 = dwv.html.decodeKeyValueUri( params.input, params.dwvReplaceMode );
    var theo20 = ["result?a=0"];
    assert.equal(res20.toString(), theo20.toString(), "Multiple key uri with one arg");
    
    // simple test: two arguments
    var root21 = "file:///test.html?input=";
    var uri21 = "result?a=0&a=1";
    var full21 = root21 + encodeURIComponent(uri21);
    params = dwv.html.getUriParam(full21);
    var res21 = dwv.html.decodeKeyValueUri( params.input, params.dwvReplaceMode );
    var theo21 = ["result?a=0", "result?a=1"];
    assert.equal(res21.toString(), theo21.toString(), "Multiple key uri with two args");

    // simple test: three arguments
    var root22 = "file:///test.html?input=";
    var uri22 = "result?a=0&a=1&a=2";
    var full22 = root22 + encodeURIComponent(uri22);
    params = dwv.html.getUriParam(full22);
    var res22 = dwv.html.decodeKeyValueUri( params.input, params.dwvReplaceMode );
    var theo22 = ["result?a=0", "result?a=1", "result?a=2"];
    assert.equal(res22.toString(), theo22.toString(), "Multiple key uri with three args");
    
    // simple test: plenty arguments
    var root23 = "file:///test.html?input=";
    var uri23 = "result?a=0&a=1&a=2&b=3&c=4";
    var full23 = root23 + encodeURIComponent(uri23);
    params = dwv.html.getUriParam(full23);
    var res23 = dwv.html.decodeKeyValueUri( params.input, params.dwvReplaceMode );
    var theo23 = ["result?b=3&c=4&a=0", "result?b=3&c=4&a=1", "result?b=3&c=4&a=2"];
    assert.equal(res23.toString(), theo23.toString(), "Multiple key uri with plenty args");

    // real world multiple URI

    // wado (called 'anonymised')
    var root30 = "http://ivmartel.github.io/dwv/demo/static/index.html?input=";
    var uri30 = "http://dicom.vital-it.ch:8089/wado?requestType=WADO&contentType=application/dicom&studyUID=1.3.6.1.4.1.19291.2.1.1.2675258517533100002&seriesUID=1.2.392.200036.9116.2.6.1.48.1215564802.1245749034.88493&objectUID=1.2.392.200036.9116.2.6.1.48.1215564802.1245749034.96207&objectUID=1.2.392.200036.9116.2.6.1.48.1215564802.1245749216.165708";
    var full30 = root30 + encodeURIComponent(uri30);
    params = dwv.html.getUriParam(full30);
    var res30 = dwv.html.decodeKeyValueUri( params.input, params.dwvReplaceMode );
    var theo30 = ["http://dicom.vital-it.ch:8089/wado?requestType=WADO&contentType=application/dicom&studyUID=1.3.6.1.4.1.19291.2.1.1.2675258517533100002&seriesUID=1.2.392.200036.9116.2.6.1.48.1215564802.1245749034.88493&objectUID=1.2.392.200036.9116.2.6.1.48.1215564802.1245749034.96207", 
                  "http://dicom.vital-it.ch:8089/wado?requestType=WADO&contentType=application/dicom&studyUID=1.3.6.1.4.1.19291.2.1.1.2675258517533100002&seriesUID=1.2.392.200036.9116.2.6.1.48.1215564802.1245749034.88493&objectUID=1.2.392.200036.9116.2.6.1.48.1215564802.1245749216.165708"];
    assert.equal(res30.toString(), theo30.toString(), "Multiple Wado url");
    
    // babymri: test for replaceMode
    var root31 = "http://ivmartel.github.io/dwv/demo/static/index.html?input=";
    var uri31 = "http://x.babymri.org/?key=53320924&key=53320925&key=53320926";
    var full31 = root31 + encodeURIComponent(uri31) + "&dwvReplaceMode=void";
    params = dwv.html.getUriParam(full31);
    var res31 = dwv.html.decodeKeyValueUri( params.input, params.dwvReplaceMode );
    var theo31 = ["http://x.babymri.org/?53320924", "http://x.babymri.org/?53320925", "http://x.babymri.org/?53320926"];
    assert.equal(res31.toString(), theo31.toString(), "Multiple baby mri (replaceMode)");
    
    // github: not supported
    
    // simple links (no query)
    
    // simple test: plenty arguments
    var root40 = "file:///test.html?input=";
    var uri40 = "web/path/to/file/?file=0.dcm&file=1.dcm&file=2.dcm";
    var full40 = root40 + encodeURIComponent(uri40) + "&dwvReplaceMode=void";
    params = dwv.html.getUriParam(full40);
    var res40 = dwv.html.decodeKeyValueUri( params.input, params.dwvReplaceMode );
    var theo40 = ["web/path/to/file/0.dcm", "web/path/to/file/1.dcm", "web/path/to/file/2.dcm"];
    assert.equal(res40.toString(), theo40.toString(), "Multiple file-like uri");

});

QUnit.test("Test decode Manifest.", function (assert) {
    // test values
    var wadoUrl = "http://my.pacs.org:8089/wado";
    var studyInstanceUID = "1.2.840.113619.2.134.1762680288.2032.1122564926.252";
    var seriesInstanceUID0 = "1.2.840.113619.2.134.1762680288.2032.1122564926.253";
    var sOPInstanceUID00 = "1.2.840.113619.2.134.1762680288.2032.1122564926.254";
    var sOPInstanceUID01 = "1.2.840.113619.2.134.1762680288.2032.1122564926.255";
    var seriesInstanceUID1 = "1.2.840.113619.2.134.1762680288.2032.1122564926.275";
    var sOPInstanceUID10 = "1.2.840.113619.2.134.1762680288.2032.1122564926.276";
    var sOPInstanceUID11 = "1.2.840.113619.2.134.1762680288.2032.1122564926.277";
    var sOPInstanceUID12 = "1.2.840.113619.2.134.1762680288.2032.1122564926.275";
    
    // create a test manifest
    var doc = document.implementation.createDocument(null, "wado_query", null);
    doc.documentElement.setAttribute("wadoURL", wadoUrl);
    // series 0
    var instance00 = doc.createElement("Instance");
    instance00.setAttribute("SOPInstanceUID", sOPInstanceUID00);
    var instance01 = doc.createElement("Instance");
    instance01.setAttribute("SOPInstanceUID", sOPInstanceUID01);
    var series0 = doc.createElement("Series");
    series0.setAttribute("SeriesInstanceUID", seriesInstanceUID0);
    series0.appendChild(instance00);
    series0.appendChild(instance01);
    // series 1
    var instance10 = doc.createElement("Instance");
    instance10.setAttribute("SOPInstanceUID", sOPInstanceUID10);
    var instance11 = doc.createElement("Instance");
    instance11.setAttribute("SOPInstanceUID", sOPInstanceUID11);
    var instance12 = doc.createElement("Instance");
    instance12.setAttribute("SOPInstanceUID", sOPInstanceUID12);
    var series1 = doc.createElement("Series");
    series1.setAttribute("SeriesInstanceUID", seriesInstanceUID1);
    series1.appendChild(instance10);
    series1.appendChild(instance11);
    series1.appendChild(instance12);
    // study
    var study = doc.createElement("Study");
    study.setAttribute("StudyInstanceUID", studyInstanceUID);
    study.appendChild(series0);
    study.appendChild(series1);
    // patient
    var patient = doc.createElement("Patient");
    patient.appendChild(study);
    // main
    doc.documentElement.appendChild(patient);
    
    // decode (only reads first series)
    var res = dwv.html.decodeManifest(doc, 2);
    // theoretical test decode result
    var middle = "?requestType=WADO&contentType=application/dicom&";
    var theoLinkRoot = wadoUrl + middle + "&studyUID=" + studyInstanceUID + 
        "&seriesUID=" + seriesInstanceUID0;
    var theoLink = [ theoLinkRoot + "&objectUID=" + sOPInstanceUID00,
                     theoLinkRoot + "&objectUID=" + sOPInstanceUID01];
    
    assert.equal(res[0], theoLink[0], "Read regular manifest link0");
    assert.equal(res[1], theoLink[1], "Read regular manifest link1");
});

