Template.navigation.helpers({
  routeName(){
    route = !Router.current() ? false : Router.current().options.route.getName();
    debugger;
    return route;
  },
  checkRoute(routeName){
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
  },
  activeRoute(){
    if (Router.current().options.route.getName() === 'tasks'){
      return 'tasks';
    } else if(Router.current().options.route.getName() === 'vendors') {
      return 'businessprofiles';
    } else {
      return false;
    }
  }
});
