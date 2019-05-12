This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To run this program you have to install npm on your computer.

## `Install dependencies`

Open the console inside the files directory and run the following command to install all dependencies.
### `npm install`


## `Running the program`

After all dependencies are installed run the following command to start the app.

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.




# `PART 3 ANSWER`

The most critical errors are those that won't even allow the program to compile, followed by the ones with syntax errors:

#### `saveUser function:`

  There's a syntax error in line 13 inside the saveUser function that won't let the program be compiled. After saving the user in the database, we should declare a fulfilled callback function that returns a promise, in this case it's a boolean. We could also declare a rejected callback function after the first one. For example: 
database.store(user_object, overrideIfPresent).then(() => {return true;}, () => {return false;});

#### `Starting the server:`

Typo in line 45. The if condition is missing the opening curly brace ({). This typo won't let the program be compiled.

Typo error in line 39. Using just a single equal symbol (=) it's not a comparison and that if condition will never pass. It must have a double (==) or triple equal symbol (===).

user is declared as const but then it is overwriten in line 41. To overwrite the user variable it should be declared as var or let.

There should be an else condition in line 44. If user is null then it doesn't have a password property and it will throw a TypeError saying that it can't read 'password' of null.

#### `loadUser function:`

The user variable is not declared inside the functions scope. It can be declared as a var, let or const type.

The function receives a single prop and not an object. It doesn't need the curly braces inside the functions props. For example: 
let loadUser = async (userName) => {}


