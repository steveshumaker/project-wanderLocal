## NOTES

## TODO

- move populate experiences dispatch to the onclick of a succesful login [like it where it is]
- refactor GET route for favorites query into one route that conditionally queries [this would fix the refresh issue] [done; no refresh issue]
- - the way I see it, favorites can either be a new route/saga/store combo, or add a table to experiences and update queries to POST favorite and GET favorites
- basic styling [ok]
- - _more_ styling
- filter-able 'view' page [search page AND/OR list page?] [done!][have some todos below] [done] [notes below]
- I think making 'info' into a non-protected route that lists a collage of experiences by location could be cool [this would be nice] [done - collage and info page]
- image upload [done]
- tooltip for tag entry ('seperate by space, etc') AND tooltip for location (needed for yelp currently) [done] [can probably clean this up]
- alert user after submitting, would smooth out async flow especially when submitting their own pic [done]
- toggle commented - experienceToDisplay - need to figure out how to store the toggle so that it persists [done]
- google maps API - click icon to locate on a map [future]
- NEED TO FIX UP EDIT FUNCTIONALITY [done]
- last thing to figure out before presentations - populating tags [done]
- potentially dockerize and push to ECS
- comments

## Search page [done]

- Any user can navigate to this page
- Once on the page, they can click on tags to display experiences that contain that/those tags

### Search feature notes

add tags to items [done]

- init state array
- entry field
- - handle comma and space as submit
- when each tag is submitted, update the state array with the new tag
- when the item is added, send post to database

add tags to database [done]

- modify post to add an array [need to modify experiences]

display all items

- get all items on page load [done]
- init search bar and search state [done]
- user can search and click on search tag to add
- while the search state is not empty:
- - display the tags at the top
- - filter the experiences for those that include tags
- - display those
- once search bar is empty, display all experiences

### Yelp API notes [done]

1. business name -> business details [no - generic search w correct params]
2. business details.id -> id search - might not need this [we dont]
3. extract stars and review count [done]
4. develop some sort of ranking [or just display stars? - done]

## Image entry [done]

potentially add another field in database to store web versus

- on add, store the image in S3
- then, query yelp
- if no image added:
  - if no image returned: blank
  - else if image returned: image
- else if image added:
  - use that image for the banner

## Info Page [done]

- get every ID
- get every md5 for every ID
- figure out how to store them
- OR potentially don't need to store them - can create array of photo paths
  and display them randomly/display one randomly
- can also apply this to sign on page

# FLOWS

- user navigates to add page
- adds an experience and clicks submit
  -> personal image ? upload to S3 (direct fetch to router), POST route sends back MD5 : POST route sends back null
  -> update the experience with personal photo path
  -> dispatch add experience saga
  -> add experience saga POSTs to experience route
  -> POST returns experience ID
  -> saga PUTs fetch external data saga
  -> fetch external data saga queries yelp API using name and location
  -> calls the update experience saga, which sends a PUT request to the experience router
