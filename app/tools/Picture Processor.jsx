#target Photoshop
app.bringToFront();
//written by Paul Riggott
function main(){
var Prefs ={};
try{
  var desc1 = app.getCustomOptions('30082bf0-700a-11df-be2b-0800200c9a66');
  Prefs = eval(desc1.getString(0));
    }catch(e){}
var win = new Window( 'dialog', 'PP' ); 
g = win.graphics;
var myBrush = g.newBrush(g.BrushType.SOLID_COLOR, [0.99, 0.99, 0.99, 1]);
g.backgroundColor = myBrush;
win.alignChildren="row";
win.g10 = win.add('group');
win.g10.orientation = "row";
win.title = win.g10.add('statictext',undefined,'Picture Processor');
win.title.helpTip="Compliments of Paul";
win.title.alignment="bottom";
var g = win.title.graphics;
g.font = ScriptUI.newFont("Georgia","BOLDITALIC",22);
win.p1= win.add("panel", undefined, undefined, {borderStyle:"black"}); 
win.p1.alignChildren="fill";
win.g5 =win.p1.add('group');
win.g5.spacing=10;
win.g5.rb1 = win.g5.add('radiobutton',undefined,'Use Folder');
win.g5.rb3 = win.g5.add('radiobutton',undefined,'Use Bridge Files');
win.g5.rb3.helpTip="Files must be selected in Bridge before running Picture Processor";
win.g5.rb1.value=true;

win.g10 =win.p1.add('group');
win.g10.cb1 = win.g10.add('checkbox',undefined,'Process Sub Folders');
win.g10.cb2 = win.g10.add('checkbox',undefined,'Preserve Sub Folder Structure');
win.g10.cb2.helpTip="Only folders that contain files will be created.";
win.g10.cb2.enabled=false;
win.g10.cb1.onClick= function(){
    if(win.g10.cb1.value){
        win.g10.cb2.value=false;
        win.g10.cb2.enabled=true;
        }else{
            win.g10.cb2.value=false;
            win.g10.cb2.enabled=false;
            }
}
var FileExtensions = "ALL FILES,PSD,PDD,JPEG,JPG,JPE,GIF,BMP,RLE,DIB,TIF,CRW,NEF,RAF,ORF,CIN,DPX,EPS,PS,FLM,PSB,EXR,PCX,PDP," +
"PCD,RAW,PICT,PCT,PIC,PXR,PNG,TGA,VDA,ICB,VST,TIF,TIFF,WBM,DNG,SCT,PBM,CRW,CR2,DC2,DCR,NEF,MRW,X3F";
FileExtensions= FileExtensions.toUpperCase();
FileExtensions = FileExtensions.split(",");
FileExtensions= ReturnUniqueSortedList(FileExtensions);
win.g12 =win.p1.add('group');
win.g12.orientation = 'row';
win.g12.spacing=10;
win.g12.st1 = win.g12.add('statictext',undefined,'Source Folder :-');
win.g12.st1.preferredSize=[160,20];
win.g12.st2 = win.g12.add('statictext',undefined,'File Type');
win.g12.dd1 = win.g12.add('dropdownlist',undefined,FileExtensions);
win.g12.dd1.selection=0;
if(Prefs.FileExts  != undefined){
    win.g12.dd1.selection = Number(Prefs.FileExts);
    }
win.g15 =win.p1.add('group');
win.g15.spacing=10;
win.g15.orientation = 'row';
win.g15.alignment="left";
win.g15.et1 = win.g15.add('edittext',undefined,'');
win.g15.et1.preferredSize=[300,20];
win.g15.et1.enabled=false;
win.g15.bu1 = win.g15.add('button',undefined,'Browse');
win.g15.bu1.helpTip="Select source folder";
win.g15.bu1.onClick = function() {
    try{
        if(Prefs.folder2 != undefined){
        var Folder2 = Folder(Prefs.folder2);
        topLevelFolder = Folder(Prefs.folder2);
        }else{
            var Folder2 ='';
            }
        }catch(e){}
  topLevelFolder = Folder.selectDialog("Please select the source folder",Folder2);	
	if(topLevelFolder !=null){
		win.g15.et1.text =  decodeURI(topLevelFolder.fsName); 
        Prefs.folder2 = decodeURI(topLevelFolder.fsName);
		}
}
if(Prefs.folder2 != undefined){
win.g15.et1.text = Prefs.folder2;
topLevelFolder = Folder(Prefs.folder2);
}
  
win.g5.rb3.onClick = function(){
    win.g5.rb1.onClick();
    }
win.g5.rb1.onClick = function(){
    if(win.g5.rb1.value){
        win.g10.cb1.value=false;
        win.g10.cb1.enabled=true;
        win.g10.cb2.value=false;
        win.g10.cb2.enabled=false;
        win.g15.et1.enabled=false;
        win.g15.bu1.enabled=true;
        win.g12.dd1.enabled=true;
        }else{
        win.g10.cb1.value=false;
        win.g10.cb1.enabled=false;
        win.g10.cb2.value=false;
        win.g10.cb2.enabled=false;
        win.g15.bu1.enabled=false;
        win.g12.dd1.enabled=false;
            }
}

win.g20 =win.p1.add('group');
win.g20.st1 = win.g20.add('statictext',undefined,'Output / Top Level Folder :-');
win.g25 =win.p1.add('group');
win.g25.spacing=10;
win.g25.orientation = 'row';
win.g25.alignment="left";
win.g25.et1 = win.g25.add('edittext',undefined,'');
win.g25.et1.preferredSize=[300,20];
win.g25.et1.enabled=false;
win.g25.bu1 = win.g25.add('button',undefined,'Browse');
win.g25.bu1.helpTip="Select output folder";
win.g25.bu1.onClick = function() {
    try{
        if(Prefs.folder != undefined){
        var Folder1 = Folder(Prefs.folder);
        outputFolder = Folder(Prefs.folder);
        }else{
            var Folder1 ='';
            }
        }catch(e){}
  outputFolder = Folder.selectDialog("Please select the output folder",Folder1);	
	if(outputFolder !=null){
		win.g25.et1.text =  decodeURI(outputFolder.fsName); 
        Prefs.folder = decodeURI(outputFolder.fsName);
		}
}
try{
if(Prefs.folder != undefined){
win.g25.et1.text = Prefs.folder;
outputFolder = Folder(Prefs.folder);
}
    }catch(e){}
win.g27 =win.p1.add('group');
win.g27.spacing=10;
win.g27.orientation = 'row';
win.g27.alignment="left";
win.g27.cb1 = win.g27.add('checkbox',undefined,'Flatten');
win.g27.cb2 = win.g27.add('checkbox',undefined,'Conv. to 8bit');
win.g27.cb3 = win.g27.add('checkbox',undefined,'Rem. Paths');
win.g27.cb4 = win.g27.add('checkbox',undefined,'Rem. Alpha Channels');
win.g27.cb1.value=true;
if(Prefs.Flatten  != undefined)  win.g27.cb1.value = Prefs.Flatten;
if(Prefs.EightBit  != undefined)  win.g27.cb2.value = Prefs.EightBit;
if(Prefs.Paths  != undefined) win.g27.cb3.value = Prefs.Paths;
if(Prefs.Channels  != undefined) win.g27.cb4.value = Prefs.Channels;
win.g28 =win.p1.add('group');
win.g28.spacing=10;
win.g28.orientation = 'row';
win.g28.alignment="left";
win.g28.cb1 = win.g28.add('checkbox',undefined,'Sort');
win.g28.cb2 = win.g28.add('checkbox',undefined,'Alpha Numeric Sort');
win.g28.cb3 = win.g28.add('checkbox',undefined,'Reverse Order');

if(Prefs.sort  != undefined)  win.g28.cb1.value = Prefs.sort;
if(Prefs.sortAlpha != undefined) win.g28.cb2.value = Prefs.sortAlpha;
if(Prefs.reverse != undefined) win.g28.cb3.value = Prefs.reverse;

win.g29 =win.p1.add('group');
win.g29.spacing=0;
win.g29.orientation = 'row';
win.g29.alignment="left";
win.g29.cb1 = win.g29.add('checkbox',undefined,'Resize to fit');
win.g29.cb1.preferredSize=[120,20];
win.g29.st1 = win.g29.add('statictext',undefined,'W: ');
win.g29.et1 = win.g29.add('edittext',undefined,'')
win.g29.et1.preferredSize=[50,20];
win.g29.st2 = win.g29.add('statictext',undefined,'px');
win.g29.st2.preferredSize=[100,20];
win.g29.st3 = win.g29.add('statictext',undefined,'H: ');
win.g29.et2 = win.g29.add('edittext',undefined,'');
win.g29.et2.preferredSize=[50,20];
win.g29.st4 = win.g29.add('statictext',undefined,'px');
win.g29.et1.enabled=false; 
win.g29.et2.enabled=false;
win.g29.cb1.onClick = function(){
    if(win.g29.cb1.value){
        win.g29.et1.enabled=true;
        win.g29.et1.active=true;
        win.g29.et2.enabled=true;    
        }else{
            win.g29.et1.enabled=false;
            win.g29.et2.enabled=false;
            }
}
win.g29.et1.onChanging = function() { 
  if (this.text.match(/[^\-\.\d]/)) { 
    this.text = this.text.replace(/[^\-\.\d]/g, ''); 
  } 
};
win.g29.et2.onChanging = function() { 
  if (this.text.match(/[^\-\.\d]/)) { 
    this.text = this.text.replace(/[^\-\.\d]/g, ''); 
  } 
};

win.g30 =win.p1.add('group');
win.g30.spacing=10;
win.g30.orientation = 'row';
win.g30.alignment="left";
win.g30.cb1 = win.g30.add('checkbox',undefined,'Run Action 1');
win.g30.dd1 = win.g30.add('dropdownlist');
win.g30.dd1.preferredSize=[150,20];
win.g30.dd2 = win.g30.add('dropdownlist');
win.g30.dd2.preferredSize=[150,20];
win.g30.dd1.enabled=false; 
win.g30.dd2.enabled=false;
win.g30.cb1.onClick = function(){
    if(win.g30.cb1.value){
        win.g30.dd1.enabled=true;
        win.g30.dd2.enabled=true;    
        }else{
            win.g30.dd1.enabled=false;
            win.g30.dd2.enabled=false;
            }
}

win.g35 =win.p1.add('group');
win.g35.spacing=10;
win.g35.orientation = 'row';
win.g35.alignment="left";
win.g35.cb1 = win.g35.add('checkbox',undefined,'Run Action 2');
win.g35.dd1 = win.g35.add('dropdownlist');
win.g35.dd1.preferredSize=[150,20];
win.g35.dd2 = win.g35.add('dropdownlist');
win.g35.dd2.preferredSize=[150,20];
win.g35.dd1.enabled=false; 
win.g35.dd2.enabled=false;
win.g35.cb1.onClick = function(){
    if(win.g35.cb1.value){
        win.g35.dd1.enabled=true;
        win.g35.dd2.enabled=true;    
        }else{
            win.g35.dd1.enabled=false;
            win.g35.dd2.enabled=false;
            }
}

win.g50 =win.p1.add('group');
win.g50.spacing=10;
win.g50.orientation = 'row';
win.g50.alignment="left";
win.g50.st1 = win.g50.add('statictext',undefined,"FileName Options");
var options = ["Document Name","Document Name with Prefix","Document Name with Suffix","Document Name with Sequence Number","New Name with Sequence Number"];
win.g50.dd1 = win.g50.add('dropdownlist',undefined,options);
win.g50.dd1.selection=0;

win.g55 =win.p1.add('group');
win.g55.spacing=10;
win.g55.orientation = 'stack';
win.g55.alignment="left";

win.g55a =win.g55.add('group');
win.g55a.spacing=10;
win.g55a.alignment="left";
win.g55a.st1 = win.g55a.add('statictext',undefined,"Prefix");
win.g55a.et1 = win.g55a.add('edittext',undefined,"");
win.g55a.et1.preferredSize=[250,20];
win.g55a.visible=false;

win.g55b =win.g55.add('group');
win.g55b.spacing=10;
win.g55b.alignment="left";
win.g55b.st1 = win.g55b.add('statictext',undefined,"Suffix");
win.g55b.et1 = win.g55b.add('edittext',undefined,"");
win.g55b.et1.preferredSize=[250,20];
win.g55b.visible=false;

var numbers =[2,3,4,5,6,7,8,9,10];
win.g55c =win.g55.add('group');
win.g55c.spacing=10;
win.g55c.alignment="left";
win.g55c.st1 = win.g55c.add('statictext',undefined,"Sequence Number");
win.g55c.et1 = win.g55c.add('edittext',undefined,"");
win.g55c.et1.preferredSize=[50,20];
win.g55c.st2 =win.g55c.add('statictext',undefined,'Len.');
win.g55c.dd1 =win.g55c.add('dropdownlist',undefined,numbers);
win.g55c.dd1.selection=2;
win.g55c.visible=false;
win.g55c.et1.onChanging = function() { 
  if (this.text.match(/[^\-\.\d]/)) { 
    this.text = this.text.replace(/[^\-\.\d]/g, ''); 
  } 
}

win.g55d =win.g55.add('group');
win.g55d.spacing=10;
win.g55d.st1 = win.g55d.add('statictext',undefined,"FileName");
win.g55d.et1 = win.g55d.add('edittext',undefined,"");
win.g55d.et1.preferredSize=[200,20];
//win.g55d.st2 = win.g55d.add('statictext',undefined,"Seq");
win.g55d.et2 = win.g55d.add('edittext',undefined,"");
win.g55d.et2.preferredSize=[50,20];
win.g55d.st2 =win.g55d.add('statictext',undefined,'len.');
win.g55d.dd1 =win.g55d.add('dropdownlist',undefined,numbers);
win.g55d.dd1.selection=2;
win.g55d.visible=false;
win.g55d.et2.onChanging = function() { 
  if (this.text.match(/[^\-\.\d]/)) { 
    this.text = this.text.replace(/[^\-\.\d]/g, ''); 
  } 
}
win.p2= win.p1.add("panel", undefined, undefined, {borderStyle:"black"}); 
win.p2.preferredSize=[400,2];
win.p1.st1 = win.p1.add('statictext',undefined,"Save Options :-");
var z = win.p1.st1.graphics;
z.font = ScriptUI.newFont("Georgia","BOLDITALIC",18);

win.g60 =win.p1.add('group');
win.g60.spacing=10;
win.g60.orientation = 'row';
win.g60.alignment="left";
win.g60.cb1 = win.g60.add('checkbox',undefined,"TIF");
var tiffOptions=["LZW","ZIP","JPG","None"];
win.g60.dd1 = win.g60.add('dropdownlist',undefined,tiffOptions);
win.g60.dd1.selection=0;
win.g60.cb2 = win.g60.add('checkbox',undefined,"PSD");
if(Prefs.TIFcomp  != undefined)  win.g60.dd1.selection = Prefs.TIFcomp;
win.g60.dd1.enabled=false;
win.g60.cb1.onClick = function(){
    if(win.g60.cb1.value){
        win.g60.dd1.enabled=true;
        }else{
            win.g60.dd1.enabled=false;
            }
}
win.g60.cb3 = win.g60.add('checkbox',undefined,"PNG24");
win.g60.dd2 = win.g60.add('dropdownlist')
for(var a = 0;a<101;a++){
    win.g60.dd2.add("item",a);
    }
win.g60.dd2.selection=80;
win.g60.dd2.enabled=false;
win.g60.cb3.onClick = function(){
    if(win.g60.cb3.value){
        win.g60.dd2.enabled=true;
        }else{
            win.g60.dd2.enabled=false;
            }
}
var jpgQuality=[1,2,3,4,5,6,7,8,9,10,11,12];
win.g60.cb4 = win.g60.add('checkbox',undefined,"JPG");
win.g60.dd3 = win.g60.add('dropdownlist',undefined,jpgQuality);
win.g60.dd3.selection=7;
if(Prefs.JPGqual  != undefined)  win.g60.dd3.selection = Prefs.JPGqual;
win.g60.dd3.enabled=false;
win.g60.cb4.onClick = function(){
    if(win.g60.cb4.value){
        win.g60.dd3.enabled=true;
        win.g70.cb1.value=false;
        win.g70.dd1.enabled=false;
        win.g70.dd2.enabled=false;
        win.g70a.cb1.enabled=false;
        win.g70a.cb2.enabled=false;
        win.g70a.cb3.enabled=false;
        }else{
            win.g60.dd3.enabled=false;
            }
}
win.p3= win.p1.add("panel", undefined, undefined, {borderStyle:"etched"});
win.g70 =win.p3.add('group');
win.g70.spacing=10;
win.g70.orientation = 'row';
win.g70.alignment="left";
win.g70.cb1 = win.g70.add('checkbox',undefined,"Save For Web");
win.g70.dd1 = win.g70.add('dropdownlist');
for(var a = 1;a<101;a++){
    win.g70.dd1.add('item', a);
    }
win.g70.dd1.selection=79;
if(Prefs.SFWqual  != undefined)  win.g70.dd1.selection = Prefs.SFWqual;
win.g70.dd2 = win.g70.add('dropdownlist');
var MetaList = [['No Metadata','MDNn'],
						['All Metadata','MDAl'],
						['Copyright','MDCp' ],
						['Copyright and Contact Info','MDCC'],
						['All Except Camera Info','MDAx']];

	for (var i in MetaList) {
	win.g70.dd2.add('item',MetaList[i][0]);
}
win.g70.dd2.selection=0;
if(Prefs.Metadata  != undefined)  win.g70.dd2.selection = Prefs.Metadata;
win.g70.dd2.enabled=false;
win.g70.dd1.enabled=false;
win.g70.cb1.onClick = function(){
    if(win.g70.cb1.value){
        win.g70.dd1.enabled=true;
        win.g70.dd2.enabled=true;
        win.g60.cb4.value=false;
        win.g60.dd2.enabled=false;
        win.g70a.cb1.enabled=true;
        win.g70a.cb2.enabled=true;
        win.g70a.cb3.enabled=true;
        }else{
            win.g70.dd1.enabled=false;
            win.g70.dd2.enabled=false;
            win.g70a.cb1.enabled=false;
            win.g70a.cb2.enabled=false;
            win.g70a.cb3.enabled=false;
            }
}
win.g70a =win.p3.add('group');
win.g70a.spacing=10;
win.g70a.orientation = 'row';
win.g70a.alignment="left";
win.g70a.cb1 = win.g70a.add('checkbox',undefined,"Embed Profile");
win.g70a.cb2 = win.g70a.add('checkbox',undefined,"sRGB");
win.g70a.cb3 = win.g70a.add('checkbox',undefined,"Progressive");
win.g70a.cb2.value=true;
if(Prefs.sRgb  != undefined)  win.g70a.cb2.value = Prefs.sRgb;
if(Prefs.Embed  != undefined)  win.g70a.cb1.value = Prefs.Embed;
if(Prefs.Progressive  != undefined)  win.g70a.cb3.value = Prefs.Progressive;
win.g70a.cb1.enabled=false;
win.g70a.cb2.enabled=false;
win.g70a.cb3.enabled=false;
win.g150 =win.p1.add('group');
win.g150.spacing=10;
win.g150.orientation = 'row';
win.g150.alignment="top";
win.g150.bu1 = win.g150.add('button',undefined,"Process");
win.g150.bu1.preferredSize=[200,20];
win.g150.bu2 = win.g150.add('button',undefined,"Cancel");
win.g150.bu2.preferredSize=[200,20];

if (app.version.match(/\d+/) ==10){
    win.g70.dd2.visible=false;
    win.g70a.cb2.visible=false;
     win.g70a.cb3.visible=false;
    }
win.g50.dd1.onChange = function(){
    switch(this.selection.index){
        case 0 : hideFields();break;
        case 1 : hideFields();
        win.g55a.visible=true;
        break;
        case 2 : hideFields();
        win.g55b.visible=true;
        break;
        case 3 : hideFields();
        win.g55c.visible=true;
        break;
        case 4 : hideFields();
        win.g55d.visible=true;
        break;
        default : break;
        }
}
function hideFields(){
win.g55a.visible=false;
win.g55a.et1.text='';
win.g55b.et1.text='';
win.g55b.visible=false;
win.g55c.visible=false;
win.g55c.et1.text='1';
win.g55d.visible=false;
win.g55d.et1.text='';
win.g55d.et2.text='1';
}

var actionSets = new Array();
actionSets = getActionSets();
for (var i=0,len=actionSets.length;i<len;i++) {
	win.g30.dd1.add ('item', "" + actionSets[i]);  
    win.g35.dd1.add ('item', "" + actionSets[i]);  
}; 
win.g30.dd1.selection=0;
win.g35.dd1.selection=0;
var actions = new Array();	
actions = getActions(actionSets[0]);
for (var i=0,len=actions.length;i<len;i++) {
	win.g30.dd2.add ('item', "" + actions[i]);    
    win.g35.dd2.add ('item', "" + actions[i]);
};
win.g30.dd2.selection=0;
win.g35.dd2.selection=0;
win.g30.dd1.onChange = function() {
win.g30.dd2.removeAll();
actions = getActions(actionSets[parseInt(this.selection)]);
for (var i=0,len=actions.length;i<len;i++) {
	win.g30.dd2.add ('item', "" + actions[i]);  
	}
	win.g30.dd2.selection=0;
};
win.g35.dd1.onChange = function() {
win.g35.dd2.removeAll();
actions = getActions(actionSets[parseInt(this.selection)]);
for (var i=0,len=actions.length;i<len;i++) {
	win.g35.dd2.add ('item', "" + actions[i]);  
	}
	win.g35.dd2.selection=0;
};

win.g150.bu1.onClick = function(){
    if(win.g5.rb3.value){
        if (!BridgeTalk.isRunning("Bridge")) {
    alert("Bridge is not running!");
    return;
    }
        var tmpFiles = GetFilesFromBridge();
        if(!tmpFiles.length ){
            alert("No Bridge Files Have Been Selected!");
            tmpFiles=[];
            return;
            }else{
                tmpFiles=[];
                }
        }
    if(win.g5.rb1.value && win.g15.et1.text == ''){
        alert("No Source Folder Has Been Selected!");
        return;
        }
    if(win.g25.et1.text == '') {
        alert("No Output Folder Has Been Selected!");
        return;
        }
    if(win.g29.cb1.value && win.g29.et1.text == ''){
        alert("No Resize Width Has Been Entered!");
        win.g29.et1.active=true;
        return;
        }
    if(win.g29.cb1.value && win.g29.et2.text == ''){
        alert("No Resize Height Has Been Entered!");
        win.g29.et2.active=true;
        return;
        }
    if(win.g50.dd1.selection.index == 1 && win.g55a.et1.text == ''){
        alert("No Prefix Has Been Entered!");
        win.g55a.et1.active=true;
        return;
        }
    if(win.g50.dd1.selection.index == 2 && win.g55b.et1.text == ''){
        alert("No Suffix Has Been Entered!");
        win.g55b.et1.active=true;
        return;
        }
    if(win.g50.dd1.selection.index == 3 && win.g55c.et1.text == ''){
        alert("No Sequence Number Has Been Entered!");
        win.g55c.et1.active=true;
        return;
        }
    if(win.g50.dd1.selection.index == 4 && win.g55d.et1.text == ''){
        alert("No File Name Has Been Entered!");
        win.g55d.et1.active=true;
        return;
        }
    if(win.g50.dd1.selection.index == 4 && win.g55d.et2.text == ''){
        alert("No Sequence Number Has Been Entered!");
        win.g55d.et2.active=true;
        return;
        }
    if(!win.g60.cb1.value && !win.g60.cb2.value && !win.g60.cb3.value && !win.g60.cb4.value && !win.g70.cb1.value){
        alert("No Save FileType Has Been Selected!");
        return;
        }
    if(win.g29.cb1.value){
	var WIDTH = parseInt(win.g29.et1.text);
	var HEIGHT= parseInt(win.g29.et2.text);
	if((isNaN(WIDTH)) || (WIDTH < 1)){
       alert( "Not a valid entry!\nResize Width MUST be greater than 1.");
       return;
       }
	if((isNaN(HEIGHT)) || (HEIGHT < 1)){
        alert( "Not a valid entry!\nResize Height MUST be greater than 1.");
        return;
	}
}
try{
Prefs.Flatten =  win.g27.cb1.value;
Prefs.EightBit =  win.g27.cb2.value;
Prefs.Channels = win.g27.cb4.value;
Prefs.Paths = win.g27.cb3.value;
Prefs.sort  = win.g28.cb1.value;
Prefs.sortAlpha = win.g28.cb2.value;
Prefs.reverse = win.g28.cb3.value;
Prefs.FileExts = Number(win.g12.dd1.selection.index); 
Prefs.TIFcomp = Number(win.g60.dd1.selection.index);
Prefs.JPGqual = Number(win.g60.dd3.selection.index);
Prefs.SFWqual = Number(win.g70.dd1.selection.index);
Prefs.Metadata = Number(win.g70.dd2.selection.index);
Prefs.sRgb = win.g70a.cb2.value;
Prefs.Embed = win.g70a.cb1.value;
Prefs.Progressive = win.g70a.cb3.value;
var desc2 = new ActionDescriptor();
desc2.putString(0, Prefs.toSource()); 
app.putCustomOptions('30082bf0-700a-11df-be2b-0800200c9a66', desc2, true );
}catch(e){alert (e.line)}
    win.close(1);
    process();
}
win.show();
function process(){
folderList=[];
var saveFileFolder=''
if(win.g10.cb1.value){//Include sub folders
	processFolder(topLevelFolder); 
    folderList.unshift(topLevelFolder);
for(var a in folderList){
if(win.g12.dd1.selection.text == 'ALL FILES'){
var PictureFiles = folderList[a].getFiles(/\.(jpg|jpe|jpeg|gif|eps|dng|bmp|tif|tiff|psd|crw|cr2|rle|dib|cin|dpx|ps|pcd|pict|vda|icb|vst|wbm|sct|pbm|flm|psb|exr|pcx|pdp|nef|dcr|dc2|erf|raf|orf|tga|mrw|mos|srf|pic|pct|pxr|pdd|pef|png|x3f|raw)$/i);
}else{
var str = "\\."+win.g12.dd1.selection.text.toLowerCase()+"$";
var fileMask = new RegExp(str, "i");
var PictureFiles = folderList[a].getFiles(fileMask);
    }
if(PictureFiles.length){
saveFileFolder = createRelativeFolder(outputFolder, folderList[a]);
saveFileFolder = decodeURI(saveFileFolder) + "/";
pictureProcess(PictureFiles,saveFileFolder);
    }
}
allDone();
}

if(win.g5.rb1.value && !win.g10.cb1.value){//Only one folder
folderList.unshift(topLevelFolder);
saveFileFolder = decodeURI(outputFolder +"/");
if(win.g12.dd1.selection.text == 'ALL FILES'){
var PictureFiles = folderList[0].getFiles(/\.(jpg|jpe|jpeg|gif|eps|dng|bmp|tif|tiff|psd|crw|cr2|rle|dib|cin|dpx|ps|pcd|pict|vda|icb|vst|wbm|sct|pbm|flm|psb|exr|pcx|pdp|nef|dcr|dc2|erf|raf|orf|tga|mrw|mos|srf|pic|pct|pxr|pdd|pef|png|x3f|raw)$/i);
}else{
var str = "\\."+win.g12.dd1.selection.text.toLowerCase()+"$";
var fileMask = new RegExp(str, "i");
var PictureFiles = folderList[0].getFiles(fileMask);
    }
pictureProcess(PictureFiles,saveFileFolder);
allDone();
}
if(win.g5.rb3.value){//Bridge files
var PictureFiles = GetFilesFromBridge();
saveFileFolder = decodeURI(outputFolder +"/");
pictureProcess(PictureFiles,saveFileFolder);
allDone();
}
 }
function pictureProcess(PictureFiles,saveFileFolder){
app.displayDialogs = DialogModes.NO; 			 
var strtRulerUnits = app.preferences.rulerUnits;   			 
var strtTypeUnits = app.preferences.typeUnits;   			 
app.preferences.rulerUnits = Units.PIXELS;   			 
app.preferences.typeUnits = TypeUnits.PIXELS;
var fileList=[];
for (var a in PictureFiles){
	fileList.push(decodeURI(PictureFiles[a]));
}

PictureFiles=fileList;
if(win.g28.cb1.value) PictureFiles = PictureFiles.sort();
if(win.g28.cb2.value) PictureFiles = PictureFiles.sort(sortAlphaNum);
if(win.g28.cb3.value) PictureFiles = PictureFiles.reverse();
    for(var a in PictureFiles){
    open(File(PictureFiles[a]));
var doc = activeDocument;
var Name='';
var saveFile ='';
if(win.g27.cb1.value) doc.flatten();
if(win.g27.cb2.value){
if (doc.bitsPerChannel != BitsPerChannelType.EIGHT) doc.bitsPerChannel = BitsPerChannelType.EIGHT;
}
if(win.g27.cb3.value){
   doc.pathItems.removeAll(); 
}
if(win.g27.cb4.value){
RemoveAlphaChannels();
}
Name = decodeURI(activeDocument.name).replace(/\.[^\.]+$/, '');
var Seq1 = zeroPad((Number(a)+Number(win.g55c.et1.text)), (parseInt(win.g55c.dd1.selection.index)+2));
var Seq2 = zeroPad((Number(a)+Number(win.g55d.et2.text)), (parseInt(win.g55d.dd1.selection.index)+2));
var Prefix = win.g55a.et1.text;
var Suffix = win.g55b.et1.text;
var NewName = win.g55d.et1.text;
if(win.g29.cb1.value) FitImage( parseInt(win.g29.et1.text), parseInt(win.g29.et2.text) );
if(win.g30.cb1.value) doAction(win.g30.dd2.selection.text, win.g30.dd1.selection.text);
if(win.g35.cb1.value) doAction(win.g35.dd2.selection.text, win.g35.dd1.selection.text);

switch(Number(win.g50.dd1.selection.index)){
    case 0 : saveFile = saveFileFolder + Name; break;
    case 1 : saveFile = saveFileFolder + Prefix + Name; break;
    case 2 : saveFile = saveFileFolder + Name + Suffix; break;
    case 3 : saveFile = saveFileFolder + Name + Seq1; break;
    case 4 : saveFile = saveFileFolder + NewName + Seq2; break;
    default : break;
    }
if(win.g60.cb1.value) SaveTIFF(saveFile,Number(win.g60.dd1.selection.index));//Save as TIF
if(win.g60.cb2.value) SavePSD(saveFile); //Save as PSD
activeDocument.pathItems.removeAll();
if(win.g60.cb3.value) saveAsPNG24SFW(saveFile);//Save as PNG24
if(win.g60.cb4.value) SaveJPEG(saveFile, (Number(win.g60.dd3.selection.index)+1));//Save as JPG done last so that file must be 8bit
if (app.version.match(/\d+/) == 10 && win.g70.cb1.value){//SFW CS3
    SaveForWebCS3(saveFile,(Number(win.g70.dd1.selection.index)+1),win.g70a.cb1.value);
}
if (app.version.match(/\d+/) > 10 && win.g70.cb1.value){//SFW CS4or5
    var Quality = Number(win.g70.dd1.selection.index)+1;
    var Profile ='';
	if(win.g70a.cb2.value ? Profile = 'CHsR' : Profile = 'CHDc' );
    var MetaData = MetaList[Number(win.g70.dd2.selection.index)][1];
    var Progressive = 1;
    if(win.g70a.cb3.value)  Progressive = 3;
    var Embed = win.g70a.cb1.value;
    CS4orCS5SFW(saveFile,Quality,MetaData,Profile,Progressive,Embed);
}
app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
}
app.preferences.rulerUnits = strtRulerUnits;  
app.preferences.typeUnits = strtTypeUnits;
}


function allDone(){
var bridgeError = new Window( 'dialog', 'Phew!' ); 
bridgeError.alignChildren="column";
b = bridgeError.graphics;
var myBrushb = b.newBrush(b.BrushType.SOLID_COLOR, [1.00, 1.00, 1.00, 1]);
b.backgroundColor = myBrushb;
bridgeError.title = bridgeError.add('statictext',undefined,'Process Completed');
bridgeError.title.alignment="bottom";
var g = bridgeError.title.graphics;
g.font = ScriptUI.newFont("Georgia","BOLDITALIC",30);
bridgeError.add('button',undefined,'Ok');
bridgeError.center();
bridgeError.show();
}
function getActionSets() { 
cTID = function(s) { return app.charIDToTypeID(s); }; 
sTID = function(s) { return app.stringIDToTypeID(s); }; 
  var i = 1; 
  var sets = [];  
  while (true) { 
    var ref = new ActionReference(); 
    ref.putIndex(cTID("ASet"), i); 
    var desc; 
    var lvl = $.level; 
    $.level = 0; 
    try { 
      desc = executeActionGet(ref); 
    } catch (e) { 
      break;    // all done 
    } finally { 
      $.level = lvl; 
    } 
    if (desc.hasKey(cTID("Nm  "))) { 
      var set = {}; 
      set.index = i; 
      set.name = desc.getString(cTID("Nm  ")); 
      set.toString = function() { return this.name; }; 
      set.count = desc.getInteger(cTID("NmbC")); 
      set.actions = []; 
      for (var j = 1; j <= set.count; j++) { 
        var ref = new ActionReference(); 
        ref.putIndex(cTID('Actn'), j); 
        ref.putIndex(cTID('ASet'), set.index); 
        var adesc = executeActionGet(ref); 
        var actName = adesc.getString(cTID('Nm  ')); 
        set.actions.push(actName); 
      } 
      sets.push(set); 
    } 
    i++; 
  } 
  return sets; 
}; 

function getActions(aset) {
cTID = function(s) { return app.charIDToTypeID(s); }; 
sTID = function(s) { return app.stringIDToTypeID(s); };
  var i = 1;
  var names = [];
  if (!aset) {
    throw "Action set must be specified";
  }  
  while (true) {
    var ref = new ActionReference();
    ref.putIndex(cTID("ASet"), i);
    var desc;
    try {
      desc = executeActionGet(ref);
    } catch (e) {
      break;    
    }
    if (desc.hasKey(cTID("Nm  "))) {
      var name = desc.getString(cTID("Nm  "));
      if (name == aset) {
        var count = desc.getInteger(cTID("NmbC"));
        var names = [];
        for (var j = 1; j <= count; j++) {
          var ref = new ActionReference();
          ref.putIndex(cTID('Actn'), j);
          ref.putIndex(cTID('ASet'), i);
          var adesc = executeActionGet(ref);
          var actName = adesc.getString(cTID('Nm  '));
          names.push(actName);
        }
        break;
      }
    }
    i++;
  }
  return names;
};
function GetFilesFromBridge() {
function script(){
var fL = app.document.selections;
var tF=[];
for(var a in fL){
    if(fL[a].type =='file'){
        tF.push(new File(encodeURI(fL[a].spec.fsName)));
        }
    }
return tF.toSource();
}
	var fileList;
		var bt = new BridgeTalk();
		bt.target = "bridge";
        bt.body = "var ftn = " + script.toSource() + "; ftn();";
		bt.onResult = function( inBT ) { fileList = eval( inBT.body ); }
		bt.onError = function( inBT ) { fileList = new Array(); }
		bt.send(8);
		bt.pump();
	if ( undefined == fileList ) fileList = new Array();
	return fileList; 
}
function sortAlphaNum(a, b) {
	var x = a.split("/"); 
	var y = b.split("/");
	x = x[x.length-1].replace(/\\\s/g," ").split(/(\d+)/); 
	y = y[y.length-1].replace(/\\\s/g," ").split(/(\d+)/); 
	for (var i in x) {
		if (x[i] && !y[i] || isFinite(x[i]) && !isFinite(y[i])) {
			return -1;
		} else if (!x[i] && y[i] || !isFinite(y[i]) && isFinite(y[i])) {
			return 1;
		} else if (!isFinite(x[i]) && !isFinite(y[i])) {
			x[i] = x[i].toLowerCase();
			y[i] = y[i].toLowerCase();
			if (x[i] < y[i]) return -1;
			if (x[i] > y[i]) return 1;
		} else {
			x[i] = parseFloat(x[i]);
			y[i] = parseFloat(y[i]);
			if (x[i] < y[i]) return -1;
			if (x[i] > y[i]) return 1;
		}
	}
	return 0;
}
function FitImage( inWidth, inHeight ) {
	var desc = new ActionDescriptor();
	var unitPixels = charIDToTypeID( '#Pxl' );
	desc.putUnitDouble( charIDToTypeID( 'Wdth' ), unitPixels, inWidth );
	desc.putUnitDouble( charIDToTypeID( 'Hght' ), unitPixels, inHeight );
	var runtimeEventID = stringIDToTypeID( "3caa3434-cb67-11d1-bc43-0060b0a13dc4" );	
	executeAction( runtimeEventID, desc, DialogModes.NO );
};
function zeroPad(n, s) { 
n = n.toString(); 
while (n.length < s) n = '0' + n; 
return n; 
};
function SavePSD(saveFile){ 
psdSaveOptions = new PhotoshopSaveOptions(); 
psdSaveOptions.embedColorProfile = true; 
psdSaveOptions.alphaChannels = true;  
activeDocument.saveAs(File(saveFile+".psd"), psdSaveOptions, true, Extension.LOWERCASE); 
}
function SaveTIFF(saveFile,Comp){
tiffSaveOptions = new TiffSaveOptions(); 
tiffSaveOptions.embedColorProfile = true;
tiffSaveOptions.transparency=true;
tiffSaveOptions.interleaveChannels=true;
tiffSaveOptions.alphaChannels = false; 
switch (Number(Comp)){
    case 0 : tiffSaveOptions.imageCompression = TIFFEncoding.TIFFLZW; break;
    case 1 : tiffSaveOptions.imageCompression = TIFFEncoding.TIFFZIP; break;
    case 2 : tiffSaveOptions.imageCompression = TIFFEncoding.JPEG; break;
    case 3 : tiffSaveOptions.imageCompression = TIFFEncoding.NONE; break;
    default : break;
}
activeDocument.saveAs(File(saveFile+".tif"), tiffSaveOptions, true, Extension.LOWERCASE); 
}
function SaveJPEG(saveFile, jpegQuality){
var doc = activeDocument;
RemoveAlphaChannels();
if (doc.bitsPerChannel != BitsPerChannelType.EIGHT) doc.bitsPerChannel = BitsPerChannelType.EIGHT;
jpgSaveOptions = new JPEGSaveOptions();
jpgSaveOptions.embedColorProfile = true;
jpgSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
jpgSaveOptions.matte = MatteType.NONE;
jpgSaveOptions.quality = jpegQuality; 
activeDocument.saveAs(File(saveFile+".jpg"), jpgSaveOptions, true,Extension.LOWERCASE);
}
function SaveForWebCS3(saveFile,jpegQuality,Profile) {
var doc = activeDocument;
RemoveAlphaChannels();
if (doc.bitsPerChannel != BitsPerChannelType.EIGHT) doc.bitsPerChannel = BitsPerChannelType.EIGHT;
if(Profile == undefined) Profile = false;
var sfwOptions = new ExportOptionsSaveForWeb(); 
   sfwOptions.format = SaveDocumentType.JPEG; 
   sfwOptions.includeProfile = Profile; 
   sfwOptions.interlaced = 0; 
   sfwOptions.optimized = true; 
   sfwOptions.quality = jpegQuality;
activeDocument.exportDocument(File(saveFile+".jpg"), ExportType.SAVEFORWEB, sfwOptions);
}
function saveAsPNG24SFW(saveFile) {
var doc = activeDocument;
if (doc.bitsPerChannel != BitsPerChannelType.EIGHT) doc.bitsPerChannel = BitsPerChannelType.EIGHT;
    var desc3 = new ActionDescriptor();
        var desc4 = new ActionDescriptor();
        desc4.putEnumerated( charIDToTypeID('Op  '), charIDToTypeID('SWOp'), charIDToTypeID('OpSa') );
        desc4.putEnumerated( charIDToTypeID('Fmt '), charIDToTypeID('IRFm'), charIDToTypeID('PN24') );
        desc4.putBoolean( charIDToTypeID('Intr'), false );
        desc4.putBoolean( charIDToTypeID('Trns'), true );
        desc4.putBoolean( charIDToTypeID('Mtt '), false );
        desc4.putInteger( charIDToTypeID('MttR'), 255 );
        desc4.putInteger( charIDToTypeID('MttG'), 255 );
        desc4.putInteger( charIDToTypeID('MttB'), 255 );
        desc4.putBoolean( charIDToTypeID('SHTM'), false );
        desc4.putBoolean( charIDToTypeID('SImg'), true );
        desc4.putBoolean( charIDToTypeID('SSSO'), false );
            var list1 = new ActionList();
        desc4.putList( charIDToTypeID('SSLt'), list1 );
        desc4.putBoolean( charIDToTypeID('DIDr'), false );
        desc4.putPath( charIDToTypeID('In  '), new File( saveFile+".png" ) );
    desc3.putObject( charIDToTypeID('Usng'), stringIDToTypeID('SaveForWeb'), desc4 );
    executeAction( charIDToTypeID('Expr'), desc3, DialogModes.NO );
};
function CS4orCS5SFW(FileName,Quality,MetaData,Profile,Progressive,Embed) {
var doc = activeDocument;
RemoveAlphaChannels();
if (doc.bitsPerChannel != BitsPerChannelType.EIGHT) doc.bitsPerChannel = BitsPerChannelType.EIGHT;
    var desc7 = new ActionDescriptor();
        var desc8 = new ActionDescriptor();
        desc8.putEnumerated( charIDToTypeID('Op  '), charIDToTypeID('SWOp'), charIDToTypeID('OpSa') );
        desc8.putEnumerated( charIDToTypeID('Fmt '), charIDToTypeID('IRFm'), charIDToTypeID('JPEG') );
        desc8.putBoolean( charIDToTypeID('Intr'), false );
        desc8.putInteger( charIDToTypeID('Qlty'), Quality );
        desc8.putInteger( charIDToTypeID('QChS'), 0 );
        desc8.putInteger( charIDToTypeID('QCUI'), 0 );
        desc8.putBoolean( charIDToTypeID('QChT'), false );
        desc8.putBoolean( charIDToTypeID('QChV'), false );
        desc8.putBoolean( charIDToTypeID('Optm'), true );
        desc8.putInteger( charIDToTypeID('Pass'), Progressive ); 
        desc8.putDouble( charIDToTypeID('blur'), 0.000000 );
        desc8.putBoolean( charIDToTypeID('EICC'), Embed ); 
        desc8.putBoolean( charIDToTypeID('Mtt '), false );
        desc8.putInteger( charIDToTypeID('MttR'), 255 );
        desc8.putInteger( charIDToTypeID('MttG'), 255 );
        desc8.putInteger( charIDToTypeID('MttB'), 255 );
        desc8.putBoolean( charIDToTypeID('SHTM'), false );
        desc8.putBoolean( charIDToTypeID('SImg'), true );
        desc8.putEnumerated( charIDToTypeID('SWch'), charIDToTypeID('STch'), charIDToTypeID(Profile) );
        desc8.putEnumerated( charIDToTypeID('SWmd'), charIDToTypeID('STmd'), charIDToTypeID(MetaData) );
        desc8.putBoolean( charIDToTypeID('SSSO'), false );
            var list2 = new ActionList();
        desc8.putList( charIDToTypeID('SSLt'), list2 );
        desc8.putBoolean( charIDToTypeID('DIDr'), false );
        desc8.putPath( charIDToTypeID('In  '), new File( FileName+".jpg") );
    desc7.putObject( charIDToTypeID('Usng'), stringIDToTypeID('SaveForWeb'), desc8 );
    executeAction( charIDToTypeID('Expr'), desc7, DialogModes.NO );
};
function createRelativeFolder(newTopLevelFolder, existingFolder){
var PathBits = decodeURI(newTopLevelFolder).toString().split('/');
var TmpArray = decodeURI(existingFolder).toString().split('/');
for(var a = 2;a<TmpArray.length;a++){
    PathBits.push(TmpArray[a]);
    }
for(var a = 2;a<PathBits.length;a++){
 var newFolder = '';
  for( var s = 0;s<a+1;s++){
      newFolder +=  PathBits[s].toString() +'/';
      }
 var toCreate = Folder(newFolder);
    if(!toCreate.exists) toCreate.create();
    }
return toCreate;
}
function processFolder(folder) {
    var fileList = folder.getFiles()
     for (var i = 0; i < fileList.length; i++) {
        var file = fileList[i];
if (file instanceof Folder) {	
	folderList.push(file);  
    processFolder(file);
	   }
   }
}
function RemoveAlphaChannels() {
	var channels = app.activeDocument.channels;
	var channelCount = channels.length - 1;
	while ( channels[channelCount].kind != ChannelType.COMPONENT ) {
		channels[channelCount].remove();
		channelCount--;
	}
}
function ReturnUniqueSortedList(ArrayName){
var unduped = new Object;
for (var i = 0; i < ArrayName.length; i++) {   
unduped[ArrayName[i]] = ArrayName[i];
}
var uniques = new Array;for (var k in unduped) {
   uniques.push(unduped[k]);
   }
uniques.sort();
return uniques;
}
}

if (app.version.match(/\d+/) <10){
    alert("Sorry but this script needs CS3 or better");
    }else{
main();
}