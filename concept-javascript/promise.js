/* //-----------------
// Producteur Code

const setTiTop = ( users, callback) => {
  
  const time = 5000 * (3 * Math.random());

  setTimeout( ()=> {
    users.map(user => {
        user.mood = "tiptop";
        user.pauseTime = time;
        return user;
      });
      callback(users);
  }, time)
  return // ????
};

//-----------------
// Consomateur Code

const users = [
  { name: "Caroline", mood: "moyen" },
  { name: "Yquem", mood: "tiptop" },
  { name: "Grégory", mood: "motus" }
];

const getUsersState = result => console.log(result)

setTiTop(users,getUsersState)
 */

/* const setTiTop = users => {
  const time = 5000 * (3 * Math.random());

  const restUser = (resolve, reject) => {
    if (time < 6000) reject("Pause not long enough");

    setTimeout(() => {
      users.map(user => {
        user.mood = "tiptop";
        user.pauseTime = time;
        return user;
      });
      resolve(users);
    }, time);
  };

  return new Promise(restUser);
}; */

//-----------------
// Consomateur Code

const users = [
  { name: "Caroline", mood: "moyen" },
  { name: "Yquem", mood: "tiptop" },
  { name: "Grégory", mood: "motus" }
];

const getUsersState = result => {
  return result.map(user => Object.assign(user, { time: Date.now() }));
};

const setHappy = result => {
  return result.map(user => Object.assign(user, { happy: true }));
};

/* setTiTop(users)
  .then(getUsersState)
  .then(setHappy)
  .then(console.log)
  .catch(console.log);
 */
/* async function pause(){
    const restedUsers = await setTiTop(users).catch(console.log);
    const state = getUsersState(restedUsers);
    console.log(state)
}
pause();
console.log('I am Groot !');
 */

 const {promisify} = require('util');

const setTiTopCallback = (users, callback) => {
  const time = 5000 * (3 * Math.random());

  setTimeout(() => {
    users.map(user => {
      user.mood = "tiptop";
      user.pauseTime = time;
      return user;
    });
    callback(users);
  }, time);

};

const setTiTopPromise = promisify(setTiTopCallback)

setTiTopPromise(users).then(console.log).catch(console.log)
