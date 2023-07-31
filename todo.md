## NOTES
- commented experience.saga.js and experienceToDisplay to reduce being rate limited by yelp and because we don't have the image URL
- - need to test that the image shows up
- - need to test location param added to the yelp query


## TODO


- move populate experiences dispatch to the onclick of a succesful login
- refactor GET route for favorites query into one route that conditionally queries
- - the way I see it, favorites can either be a new route/saga/store combo, or add a table to experiences and update queries to POST favorite and GET favorites

1. business name -> business details [no - generic search w correct params]
2. business details.id -> id search - might not need this [we dont]
3. extract stars and review count [done]
4. develop some sort of ranking [or just display stars? - done]


