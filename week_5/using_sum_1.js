use agg
db.posts.aggregate([ 
    {$group:
     {
	 _id: {
	     "author":"$comments.author"
	 },
	 no_of_comments:{$sum:1}
     }
    }
	
	
])

db.zips.aggregate([    {$project:      {	first_char: {$substr : ["$city",0,1]}, pop: "$pop"    }	    }, {$match : {"first_char":{$in:['0','1','2','3','4','5','6','7','8','9']}}},
{$group: {_id:"$_id",  count: {$sum:"$pop"}}},{$group: {_id:"$count",  count1: {$sum:"$count"}}} ])

db.grades.aggregate ([{$unwind: "$scores"}, {$match : {"scores.type":{$in:['homework','exam']} }}, {$group: {_id : {"class_id": "$class_id"}, avg: {$avg:"$scores.score"}}},{$sort:{"avg":-1}}])
 {$pop: {$gt: 25000 }},
 db.zips.aggregate([ {$match: {pop: {$gt: 25000 }}},    {$match:    {	state:{$in:['CT', 'NJ']}  }},   {$group: {_id: {"st":"$state", "cit":"$city"}, avg :{$avg: "$pop"}}},{$group:     {	 _id: "$st",	 population: {$avg:"$avg"}	      }    }])
 db.zips.aggregate([ {$match: {pop: {$gt: 25000 }}},    {$match:    {	$or:[ {state:"CT"}, {	 state:"NJ"     }  ]  }},   {$group: {_id: "$state", avg :{$avg: "$pop"}}}])
db.zips.aggregate([ {$match: {pop: {$gt: 25000 }}},    {$match:    {	$or:[ {state:"CT"}, {	 state:"NJ"     }  ]  }},    {$group:     {	 _id: "$city",	 population: {$avg:"$pop"}	      }    }, {$group: {_id: "$state", avg :{$avg: "$population"}}}])

db.scores.find({$or: [{score: {$lt: 50 }}, {score: {$gt: 90}}]})

db.zips.aggregate([
    {$match:
     {
	 state:"CT"
     },
	 {
	 state:"NJ"
     }
    },
    {$group:
     {
	 _id: "$city",
	 population: {$avg:"$pop"}
	 
     }
    }
])

db.posts.aggregate([  {"$unwind":"$comments"},  {$group:     {	 _id: {	     "author":"$comments.author"	 },	 "no_of_comments":{$sum:1}     }    }, {$sort: {"no_of_comments":-1}}, {"$limit": 10}])


db.posts.aggregate([    {$group:     {	 _id: {	     "author":"$comments.author"	 },	 no_of_comments:{$sum:1}     }    }])

db.posts.aggregate([    {"$unwind":"$comments"},    {"$group":      {"_id":"$comments.author"     },       "count":{$sum:1}	, "min": {$min: "count"}    }])

db.posts.aggregate([
    /* unwind by tags */
    {"$unwind":"$comments"},
    /* now group by tags, counting each tag */
    {"$group": 
     {"_id":"$comments.author"    
	  
     },
	  "count":{$sum:1},
	 "min": {$min: $count}
    },
    /* sort by popularity */
    {"$sort":{"count":-1}},
    /* show me the top 10 */
    {"$limit": 10},
    /* change the name of _id to be tag */
    {"$project":
     {_id:0,
      'tag':'$_id',
      'count' : 1
     }
    }
    ])
	