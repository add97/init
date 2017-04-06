import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './task.html';

Template.task.helpers({
  isOwner() {
    debugger;
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
  'click .toggle-private'() {
    Meteor.call('tasks.setPrivate', this._id, !this.private, (err) => {
      if(err) { alert(err.message); }
    });
  },
});
