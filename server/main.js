import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

getKey = (text) => {
  return `${text}${Random.id()}`
};
