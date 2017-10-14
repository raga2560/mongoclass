var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/school', function(err, db) {
    if(err) throw err;

    var grades = db.collection('students');

    var cursor = grades.find({});
    /*cursor.skip(1);
    cursor.limit(4);
    cursor.sort('grade', 1); */
    //cursor.sort([['grade', 1], ['student', -1]]);

    //var options = { 'skip' : 1,
    //                'limit' : 4,
    //                'sort' : [['grade', 1], ['student', -1]] };
    //var cursor = grades.find({}, {}, options);

    cursor.each(function(err, doc) {
		
        if(err) throw err;
        if(doc == null) {
            return db.close();
        }
//		console.log(doc.scores[3]);
var scoretoremove;
  var scores = doc.scores.slice();
  //console.log(scores[3].score );
  //console.log("before:");
  //console.log(scores);
       if(scores[2].score > scores[3].score)
	   {
		   scoretoremove = scores[3];
		   scores.splice(3, 1);
	   }
	   else 
	   {
		  scoretoremove = scores[2];
		  scores.splice(2,1);
	   }
	   
	//   console.log("after:");
	//   console.log(scores);
	 var query = {};
	   
	   query['_id'] = doc['_id'];
        doc['scores'] = scores;

		db.collection('students').update(query, doc, function(err, updated) {
	   
        if(err) {
		console.log(err.message)	;
		}

        console.dir("Successfully updated " + updated + " documents!");

    //    return db.close();
		});
	
        //console.dir(doc);
    });
});
