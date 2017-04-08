state = new ReactiveDict();

Template.tasks.onCreated(() => {
  Meteor.subscribe('tasks');
});

Template.task.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
  created(){
    return moment(this.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a");
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
    Meteor.call('tasks.remove', this._id);
  },
});

Template.tasks.helpers({
  tasks() {
    if (state.get('hideCompleted')) {
      const filteredTasks = Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
      return filteredTasks;
    }
    const allTasks = Tasks.find({}, { sort: { createdAt: -1 } });
    return allTasks;
  },
});

Template.tasks.events({
  'click .new_task_submit'(event) {
    task = $('.input-group .form-control');
    Tasks.methods.insert.call({ text: task.val() }, (err) => {
      if(err) { alert(err.message); } else {
        task.val('');
      }
    });
  },
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
});
