Template.navigation.helpers({
  routeName(){
    return !Router.current() ? false : Router.current().options.route.getName();
  },
  checkRoute(routeName){
<<<<<<< HEAD

=======
    if(!Router.current()){
      return false;
    } else {
      return Router.current().options.route.getName() === routeName;
    }
  },
  isActive(routeName){
    if(!Router.current()){
      return false;
    } else {
      return Router.current().options.route.getName() === routeName ? 'active' : false;
    }
>>>>>>> 02f0c9fb9377ce5808679d34d5d46d0694ad37c0
  }
});
