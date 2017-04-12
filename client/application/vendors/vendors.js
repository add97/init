Template.vendors.onCreated(function(){
  Meteor.subscribe('vendors');
});

Template.vendors.helpers({
  vendors(){ return businessProfiles.find({}, {sort: {transactionCount: -1}}); },
});

Template.vendor.events({
  'click .list-group-item'(e, t){
    Router.go(`/vendorInfo/${this._id}`);
  },
});
