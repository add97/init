Template.vendorInfo.onCreated(function(){
  this.subscribe('vendor', this.data._id);
  this.state = new ReactiveDict({
    'company_name': this.data.company_name
  });
});


Template.vendorInfo.events({
  'keyup input'(e, t) {
    $target = $(e.target);
    field = $target.context.id;
    value = $target.val();
    console.log(`input changed! settings ${field} to ${value} in the template's state`);
    t.state.set(field, value);
  }
});

Template.vendorInfo.helpers({
  isEdited(value){
    //helper argument needs to match input#id
    const state = Template.instance().state;

    const selector = `#${value}`;
    const inputVal = state.get('company_name');
    if(!inputVal){
      return false;
    } else {
      console.log(`setting ${selector} to ${inputVal}`);
      const dbVal = this.company_name;
      isEdited = dbVal !== inputVal ? 'has-warning' : false;
      return isEdited;
    }
  }
});
