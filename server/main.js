import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

getKey = (text) => {
  return `${text}${Random.id()}`
};

Meteor.publish('vendors', function(){
  return businessProfiles.find({}, {
    fields: {
      company_name: 1,
      transactionCount: 1,
      company_address: 1,
      company_email: 1,
    }
  });
});
