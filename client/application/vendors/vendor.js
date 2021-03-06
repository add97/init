//1. Route has just loaded...subscribe to vendor and register this.state as a ReactiveDict
//   Each time we 'set' a new value, our helpers know to rerun and update the view
Template.vendorInfo.onCreated(function(){
  Meteor.subscribe('vendor', this.data._id);
  this.state = new ReactiveDict();
});

//2. Register an event that updates the template's state on each keyup event
Template.vendorInfo.events({
  'keyup input'(e, t) {
    $target = $(e.target); //the jquery event
    field = $target.context.id; // the HTML element's ID (must match corresponding field on businessProfile)
    value = $target.val(); // the new contents of the input
    //set the field specified with the element's ID with our changed value in our 'state'
    t.state.set(field, value);
    console.log(`Change recorded! ${field} now equals ${value} on vendorInfo.state`);
  },
  'submit .vendor-info'(e, t){
    e.preventDefault();
    Meteor.call('updateProfile', this._id, t.state.all(), (err) => {
      if(err){
        Bert.alert({
          title: 'Uh-oh!',
          message: err.reason,
          type: 'danger',
          style: 'growl-top-right',
          icon: 'fa-warning'
        });
      } else {
        Bert.alert({
          title: 'Success',
          message: `${this.company_name} has been updated`,
          type: 'success',
          style: 'growl-top-right',
          icon: 'fa-success'
        });
      }
    });
  }
});

//3. Register a helper that will rerun any time we change the template's state
//   Just by nature of declaring Template.instance().state inside the helper,
//   the helper knows to rerun when the state is updated.
Template.vendorInfo.helpers({
  isEdited(value){
    const state = Template.instance().state; //helper argument needs to match the targeted input's HTML id!
    debugger;
    let inputVal = state.get(value); //what our input says the new value is

    if(value && value === 'orderPhone' && state.get(value)){
      inputVal = parseFloat(state.get(value));
    }
    //what the database has stored as the value.
    //Note: this[value] is same as this.value, but called 'bracket notation'
    //bracket notation is used when accessing a dynamic property passed in as a function's argument
    //see http://stackoverflow.com/a/4968460
    debugger;
    const dbVal = this[value]; //e.g value will be company_name, etc.
    //if state isn't there yet, just return false and do nothing
    if(!inputVal){
      return false;
    } else {
      //compare the database value to input...
      //if template's state doesn't match DB, add warning class to input element
      return dbVal !== inputVal ? 'has-warning' : false;
    }
  },
  contactMethod(){
    preferences = businessProfiles.schema._schema.notificationPreference.allowedValues;
    return preferences;
  },
  companyType(){
    types = businessProfiles.schema._schema.company_type.allowedValues;
    return types;
  }
});

function phoneFormat(input){
 input = input.replace(/\D/g,'');
 input = input.substring(0,10);
 var size = input.length;
 if (size == 0) {
         input = input;
 } else if(size < 4){
         input = '('+input;
 } else if(size < 7){
         input = '('+input.substring(0,3)+') '+input.substring(3,6);
 } else {
         input = '('+input.substring(0,3)+') '+input.substring(3,6)+' - '+input.substring(6,10);
 }
 return input;
}
