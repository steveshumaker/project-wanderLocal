## NOTES


## TODO


- move populate experiences dispatch to the onclick of a succesful login
- refactor GET route for favorites query into one route that conditionally queries
- - the way I see it, favorites can either be a new route/saga/store combo, or add a table to experiences and update queries to POST favorite and GET favorites
- basic styling [ok]
- filter-able 'view' page
- I think making 'info' into a non-protected route that lists a collage of experiences by location could be cool [priority]
- remove unneeded components


1. business name -> business details [no - generic search w correct params]
2. business details.id -> id search - might not need this [we dont]
3. extract stars and review count [done]
4. develop some sort of ranking [or just display stars? - done]

redux logger

add tags to items
- init state array
- entry field
- - handle comma and space as submit
- when each tag is submitted, update the state array with the new tag
- when the item is added, send post to database

add tags to database
- modify post to add an array [need to modify experiences]

display all items
- get all items on page load
- init search bar and search state
- user can add a search tag [future - click on search tag to add]
- - commans and spaces rule applies
- while the search state is not empty:
- - display the tags at the top
- - filter the experiences for those that include tags
- - display those
- once search bar is empty, display all experiences

