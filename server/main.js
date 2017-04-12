
getKey = (text) => { return `${text}${Random.id()}`; };

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
//either works
// return businessProfiles.find({_id: bizId}
// return businessProfiles.find(bizId

Meteor.publish('vendor', function(bizId){
  return businessProfiles.find({_id: bizId});
});
