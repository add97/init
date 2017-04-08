Template.navigation.helpers({
  routeName(){
    return !Router.current() ? false : Router.current().options.route.getName();
  }
});
