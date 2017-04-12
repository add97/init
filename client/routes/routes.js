Router.route('/', {
  name: 'home',
  template: 'home'
});

Router.route('/tasks', {
  name: 'tasks',
  template: 'tasks'
});
Router.route('/vendors', {
  name: 'vendors',
  template: 'vendors'
});

Router.route('/vendorInfo/:_id', {
    name: 'vendorInfo',
    template: 'vendorInfo',
    waitOn(){
      return Meteor.subscribe('vendor', this.params._id);
    },
    data () {
      return businessProfiles.findOne(this.params._id);
    },
});
