var csv = require('ya-csv');

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    if(err) throw err;

    var query = { 'name' : 'comments' };
    var sort = [];
    var operator = { '$inc' : { 'counter' : 1 } };
    var options = { 'new' : true };

	var reader = csv.createCsvFileReader('order.csv', {
    'separator': ','
    
});
// var writer = new csv.CsvWriter(process.stdout);
var i =0;
reader.addListener('data', function(data) {
	if(i==0){
		i = i+1;
	}
	else{
		var query = {
			"Row ID" : data[0],
"Order ID" : data[1],
"Order Date" : data[2],
"Order Priority" : data[3],
"Order Quantity" : data[4],
"Sales" : data[5],
"Discount" : data[6],
"Ship Mode" : data[7],
"Profit" : data[8],
"Unit Price" : data[9],
"Shipping Cost" : data[10],
"Customer Name" : data[11],
"Province" : data[12],
"Region" : data[13],
"Customer Segment" : data[14],
"Product Category" : data[15],
"Product Sub-Category" : data[16],
"Product Name" : data[17],
"Product Container" : data[18],
"Product Base Margin" : data[19],
"Ship Date" : data[20]

		};
		i = i+1;
		db.collection('test1').insert(query, function(err, doc) {
        if(err) throw err;

        if (!doc) {
            console.log("No counter found for comments.");
        }
        else {
            console.log("Number of comments: " + i);
        }
		
	});
	}
	if(data == null){
		reader.end();
	}
    //console.log(data[2]);
	
});

  
  /*
    db.collection('counters').findAndModify(query, sort, operator, options, function(err, doc) {
        if(err) throw err;

        if (!doc) {
            console.log("No counter found for comments.");
        }
        else {
            console.log("Number of comments: " + doc.counter);
        }

        return db.close();
    }); */
});
