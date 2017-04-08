Template.vendors.onCreated(function(){
  Meteor.subscribe('vendors');
});

Template.vendors.helpers({
  vendors(){
    return businessProfiles.find({}, {sort: {transactionCount: -1}});
  },
});
