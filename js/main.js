/*
 * 
 * bgchanger
 * 
 * */

//init

var imgList = [];
var total = 0;
var startPos = 0;
var screenD = document.getElementById("textbox");
var naam, forDisplay, forSet;

//get img storage location

function onResolveSuccess(dir) {
	dir.listFiles(onsuccess);
}

//get filenames in img storage location	

function onsuccess(files) {
	total = files.length;
	for (var i = 0; i < total; i++) {
		if (files[i].isFile) {
			var deze = files[i].toURI().replace('file://', '');
			var last = files[i].name.lastIndexOf(".");
			var naam = files[i].name.slice(0, last);
			//console.log(deze);
			imgList.push({
				Name: naam,
				URL: deze,
				source: files[i].toURI()
			});
		}
	}
	displayAndSet();
	afterLoad();
}

//display images

function successSet(){
	screenD.innerHTML = "set and \n ready";
	setTimeout(function(){
		tizen.application.getCurrentApplication().exit();
	}, 2000);
}

function errorSet(){
	screenD.innerHTML = "didn't \n compute";
}

function displayAndSet(){
	
	naam = imgList[startPos].Name;
	forSet = imgList[startPos].URL;
	forDisplay = imgList[startPos].source;

	screenD.innerHTML = '<img alt="" src="' + forDisplay + ' " >';
	screenD.onclick = function(){
		tizen.systemsetting.setProperty('HOME_SCREEN', forSet, successSet, errorSet);
	};
}

function cwCcw(lr){
	if (total === 0){
		document.getElementById("textbox").innerHTML = "no imgs..";
		return;
	}
	if(lr.detail.direction === "CW"){
		if((startPos +1) === total){
			startPos = 0;
		} else{
			startPos = startPos +1;
		}
	} else{
		if(startPos === 0){
			startPos = total -1;
		}else{
			startPos = startPos -1;
		}
	}
	displayAndSet();
}

function afterLoad(){
	document.addEventListener('rotarydetent', cwCcw);
}

//change bg on click

////////////////// close app /////////////////

document.addEventListener('tizenhwkey', function (e) {
	if (e.keyName === "back")
		{try {
			tizen.application.getCurrentApplication().exit();
		} catch (ignore) {}}
});

// access filesystem

tizen.filesystem.resolve('images', onResolveSuccess, null, 'r');
//tizen.filesystem.resolve('downloads', onResolveSuccess, null, 'r');
