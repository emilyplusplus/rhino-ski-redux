# Rhino-Ski Redux (Ceros Ski Code Challenge)

Final Game: https://rhino-ski-redux.herokuapp.com/ (or you can clone this repository and run the code locally as well, see below: 'Local Installation / Deployment').

This repository contains the source code as well as detailed notes for how I completed the challenge and what things of import that I changed. You can see the original ReadMe below as a quote as to understand the requirements and original challenge specifications.

As an aside, a big thank you to Ceros for this awesome code challenge, I had a ton of fun refactoring/restructuring the code as well as adding features. :) Throughout this challenge I tried to take "a chance for you to show us how much you give a  
shit (one of Ceros’s core values!) about the position" from the ReadMe to heart!

## Project Notes

 1. The first things I did was to actually fix the bug as outlined in the orignal ReadMe.
	 - This was relatively trivial, I simply added logic to the keyListener that checked if player was crashed and prevented the player direction from becoming an undefined value
 2. The second task I took on was one of seperating the code out into modules/classes (to avoid  a huge monolithic application which has many risks/disadvantages as well as just improve readability) the neatly represented different areas of function regarding the game: Player, Obstacles, AssetManager, InputHandler, Game Loop, Rhino, Scoreboard, etc. and doing some general code best practice tweaks
	- I tried to strike a balance between refactoring for optimal design pattern usage but not re-writing the entire game to be a different architecture.
	- I used a singleton pattern for the AssetManager and a pseudo pub/sub pattern for the keyboard input
	- I also put many of the unchanging game paramaters into constants variables such as WIDTH, HEIGHT, PIXEL_RATIO, etc.
	- I modified keyListeners to use the human readable form of key code as opposed to integers
	- I put the assets to be loaded via manager into a json file in the config directory
	- I used promises in a few places where I felt applicable (and they weren't used before)
	- Using a combination of global game param constants (see note above) and global instances of certain game objects I eleminated the need to pass around objects/references between unrelated objects reducing code complexity and object coupling
	- Refactored a handful of function names and definitions where I felt appropriate
	- Added comments as needed
3. Added new features to make game more fun/unique
	- **Dark Mode**: I added a toggle at upper right corner of screen that toggles game between light/dark mode and tweaks the color scheme of the game/interface.
	- **Help Menu**: I added a help menu to upper left that when you hover over shows you controls and  a few other bits of info. When the game is first loaded this help menu is auto opened and continues displaying until the game starts. On consecutive page loads its hidden by default, assuming that if you have an exisitng high score you have likely played game alreayd and know the controls
	- Player jump (spacebar, including animation)
	- Game score (including high score which is saved to localStorage and persists between page refreshes) and score rendering
	- Rhino end game event: It appears on screen after 2k feet traveled and eats you, animating the whole time
	- Pause (p key)
	- Reset (r key)
	- Gravity: player slowly accelerates from 0 to max speed (15 mph)
4. Started documentation/changelog and setup GitHub/Heroku
5. Wrote unit tests using Ava
	- I wrote a handful of unit tests (not as exhaustive as they could be, but sufficient) to test out core logical functions of each class

## Local Installation / Deployment

To clone and run this repository you'll need  [Git](https://git-scm.com/)  and  [Node.js](https://nodejs.org/en/download/)  (which comes with  [npm](http://npmjs.com/)) installed on your computer. From your command line:

    # Clone this repository
    git clone https://github.com/emilyplusplus/rhino-ski-redux
    # Go into the repository
    cd rhino-ski-redux
    # Install dependencies
    npm install
    # Run the app
    npm start

## Source Code / Change Log
Below is a rough change log for v0.2.0 (current final version as of time of writing this) that I made as I was making changes, more info can also be found in commit history if desired.

#### v0.2.0 Change Log:

- Fix bug when pressing left/right after crash (added else if to input handler check)

- Create player class/file and isolate Player code

- Change input handler to use event.key (makes code more readable)

- Add changelog

- obstacles class

- asset manager class & refactor load logic

- refactor main loop, constants

- fix passing around everything under sun

- add pause (p key)

- add score

- jump (space)

- further refactoring

- reset (r key)

- high schore/personal best record

- add to github and heroku

- setup ava unit testing

- add rhino/end game at 2k

- bug fixes

> # Ceros Ski Code Challenge
> 
>   
> 
> Welcome to the Ceros Code Challenge - Ski Edition!
> 
>   
> 
> For this challenge, we have included some base code for Ceros Ski, our
> version of the classic Windows game SkiFree. If
> 
> you've never heard of SkiFree, Google has plenty of examples. Better
> yet, you can play our version here:
> 
> http://ceros-ski.herokuapp.com/
> 
>   
> 
> We understand that everyone has varying levels of free time, so take a
> look through the requirements below and let us
> 
> know when you will have something for us to look at (we also get to
> see how well you estimate and manage your time!).
> 
> Previous candidates have taken about 8 hours to complete our
> challenge. We feel this gives us a clear indicator of your
> 
> technical ability and a chance for you to show us how much you give a
> shit (one of Ceros's core values!) about the position
> 
> you're applying for. If anything is unclear, don't hesitate to reach
> out.
> 
>   
> 
> Requirements:
> 
> * The base game that we've sent you is not what we would consider production ready code. In fact, it's pretty far from
> 
> it. As part of our development cycle, all code must go through a
> review. We would like you to perform a review
> 
> on the base code and fix/refactor it. Is the codebase maintainable,
> unit-testable, and scalable? What design patterns
> 
> could we use?
> 
> **We will be judging you based upon how you update the code & architecture.**
> 
> * There is a bug in the game. Well, at least one bug that we know of. Use the following bug report to debug the code
> 
> and fix it.
> 
> * Steps to Reproduce:
> 
> 1. Load the game
> 
> 1. Crash into an obstacle
> 
> 1. Press the left arrow key
> 
> * Expected Result: The skier gets up and is facing to the left
> 
> * Actual Result: Giant blizzard occurs causing the screen to turn completely white (or maybe the game just crashes!)
> 
> * The game's a bit boring as it is. Add a new feature to the game to make it more enjoyable. We've included some ideas for
> 
> you below (or you can come up with your own new feature!). You don't
> need to do all of them, just pick something to show
> 
> us you can solve a problem on your own.
> 
> * Implement jumps. The asset file for jumps is already included. All you gotta do is make the guy jump. We even included
> 
> some jump trick assets if you wanted to get really fancy!
> 
> * Add a score. How will you know that you're the best Ceros Skier if there's no score? Maybe store that score
> 
> somewhere so that it is persisted across browser refreshes.
> 
> * Feed the hungry Rhino. In the original Ski Free game, if you skied for too long, a yeti would chase you
> 
> down and eat you. In Ceros Ski, we've provided assets for a Rhino to
> catch the skier.
> 
> * Update thips README file with your comments about your work; what was done, what wasn't, features added & known bugs.
> 
> * Provide a way for us to view the completed code and run it, either locally or through a cloud provider
> 
> * Be original. Don’t copy someone else’s game implementation!
> 
>   
> 
> Bonus:
> 
> * Provide a way to reset the game once the game is over
> 
> * Provide a way to pause and resume the game
> 
> * Skier should get faster as the game progresses
> 
> * Deploy the game to a server so that we can play it without setting something up ourselves. We've included a
> 
> package.json and web.js file that will enable this to run on Heroku.
> Feel free to use those or use your own code to
> 
> deploy to a cloud service if you want.
> 
> * Write unit tests for your code
> 
>   
> 
> And don't think you have to stop there. If you're having fun with this
> and have the time, feel free to add anything else
> 
> you want and show us what you can do!
> 
>   
> 
> We are looking forward to see what you come up with!