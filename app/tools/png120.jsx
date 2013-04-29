#target "photoshop"
 
var outputWidth = 120;
var inputFolder = Folder.selectDialog("Input folder");
var outputFolder = Folder.selectDialog("Output folder");
 
if (inputFolder != null && outputFolder != null) {
    var files = inputFolder.getFiles("*.*");
 
    for (var i = 0; i < files.length; i++) {
 
        var file = files[i];
        var doc = app.open(file);
 
        if (doc.width > outputWidth) {
            var height = (doc.height / doc.width) * outputWidth;
            doc.resizeImage(outputWidth + "px", height + "px");
        }
 
        var options = new ExportOptionsSaveForWeb();
        options.format = SaveDocumentType.PNG;
        options.PNG8 = false;
 
        doc.exportDocument(outputFolder, ExportType.SAVEFORWEB, options);
        doc.close(SaveOptions.DONOTSAVECHANGES);
        $.writeln('File');
    }
}