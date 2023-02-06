## Start the project

I used node v14

###  npm install & expo start

## Things that could be improved:

* Add unit tests
* Change the way that we store favorite elements in AsyncStorage. Right now to keep things simple, i'm just saving the whole array of objects. A lot of information is simply not necessary.
* Add feature to remove favorites
* Add windowing technique, to reduce the number of images that are being rendered. We should only render the elements that are visible to the user, this way we can boost performance.

## Tech stack:

For this project I used expo, react-navigation and redux (redux-toolkit). 

## Project structure

/screens: These components represent a single screen, and they're also stateful, which means that they're the ones connected to redux store, and should contain all business logic.
/components: Reusable components, they should be display information with given props, should contain as less logic as possible if not 0.
/slices: Contains RTK slices and Apis (createApi) check RTK docs for reference. Basically all redux boilerplate is here, way less code is used thanks to RTK.

