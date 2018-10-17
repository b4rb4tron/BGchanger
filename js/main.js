
/*
 * 
 * bgchanger
 * 
 * */

var imgList = [];
//get img storage location

function onResolveSuccess(dir) {
    dir.listFiles(onsuccess);
}

function onsuccess(files) {
	for(var i =0;i < files.length;i++){
		if(files[i].isFile){
			var deze = files[i].toURI().replace('file://',''); 
			var last = files[i].name.lastIndexOf(".");
			var naam = files[i].name.slice(0, last); 
			console.log(deze);
			imgList.push({
				Name: naam,
				URL: deze,
				source: files[i].toURI()
			});
		}
	}
	console.log(imgList);
}
//get filenames in img storage location
tizen.filesystem.resolve('images', onResolveSuccess, null, 'r');

//display images

//change bg on click

//////////////////////////////////////////////
    document.addEventListener('tizenhwkey', function(e) {
        if(e.keyName == "back")
	try {
	    tizen.application.getCurrentApplication().exit();
	} catch (ignore) {
	}
    });
