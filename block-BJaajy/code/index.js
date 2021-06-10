// Create four promises that resolve after 1, 2, 3 and 4 seconds with a random value. Using `Promise.all` log the value of each promise that it resolved with.

let promiseOne = new Promise((res) => setTimeout(() => res('One'), 1000));
let promiseTwo = new Promise((res) => setTimeout(() => res('Two'), 2000));
let promiseThree = new Promise((res) => setTimeout(() => res('Three'), 3000));
let promiseFour = new Promise((res) => setTimeout(() => res('Four'), 4000));

Promise.all([promiseOne, promiseTwo, promiseThree, promiseFour]).then((resp) =>
  console.log('Value of all promises: ', resp)
);

// Create a list of 5 Github usernames in an array and using `Promise.all` get access to the data of each user from GitHub API. Log the number of followers of each user.

let userNames = ['iliakan', 'remy', 'jeresig', 'gaearon', 'getify'];

let data = Promise.all(
  userNames.map((user) =>
    fetch(`https://api.github.com/users/${user}`).then((resp) => resp.json())
  )
).then((resp) =>
  resp.forEach((user) =>
    console.log(`User ${user.login} has ${user.followers} followers.`)
  )
);

// Use `Promise.race` to see which API resolves faster from the given list of URLs. Log the object you get from the promise that is resolved faster.

Promise.race([
  fetch('https://random.dog/woof.json').then((resp) => resp.json()),
  fetch('https://aws.random.cat/meow').then((resp) => resp.json()),
]).then((resp) => console.log(resp));

// Use `Promise.allSettled` to log the value of each promise from the given list of promises. And also check if `Promise.all` works with `one`, `two` and `three` or not

const one = new Promise((resolve, reject) =>
  setTimeout(() => resolve('Arya'), 1000)
);
const two = new Promise((resolve, reject) =>
  setTimeout(() => reject(new Error('Whoops!')), 2000)
);
const three = new Promise((resolve, reject) =>
  setTimeout(() => resolve('John'), 3000)
);

Promise.allSettled([one, two, three]).then((resp) => console.log(resp));

// What will be the output of the following code snippet? How much time will it take for the promise to resolve?

Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('Arya'), 1000);
  }),
  'Sam',
  { name: 'John' },
]).then(console.log);

// O/p : ['Arya', 'Sam', { name: 'John' }]
// Time: 1s
