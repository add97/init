import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './task.html';

Router.route('/', {
  name: 'home',
  template: 'home'
});
Router.route('/register', {
  name: 'register',
  template: 'register'
});
Router.route('/login', {
  name: 'login',
  template: 'login'
});

Lists = new Meteor.Collection('lists');

Template.addList.events({
    'submit form': function(event){
      event.preventDefault();
      var listName = $('[name=listName]').val();
      Lists.insert({
          name: listName
      });
      $('[name=listName]').val('');
    }
});

Template.lists.helpers({
    'list': function(){
        return Lists.find({}, {sort: {name: 1}});
    }
});

Template.task.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});

Template.task.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setChecked', this._id, !this.checked, (err) => {
      if(err) { alert(err.message); }
    });
  },
  'click .delete'() {
    Meteor.call('tasks.remove', this._id)
  },
});
