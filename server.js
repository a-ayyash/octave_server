var http = require('http'),
	formidable = require('formidable');
	
const { spawnSync } = require('child_process');

http.createServer((request, response) => {
	if (request.url == '/upload' && request.method.toLowerCase() == 'post') {
		var form = new formidable.IncomingForm();

		form.on('file', function(field, file) {
			response.writeHead(200, {'content-type': 'text/plain'});
			const child = spawnSync('octave', ['-W', file.path]);
			response.end(child.stdout.toString());
		});
		
		form.parse(request);

		return;
	}

    response.writeHead(200, {'content-type':'text/html'});
    response.end(
       '<form action="/upload" enctype="multipart/form-data" method="post">'+
	        '<input type="text" name="title"><br>'+
	        '<input type="file" name="upload" multiple="multiple"><br>'+
	        '<input type="submit" value="Upload">'+
	        '</form>'
    );
}).listen(80);
