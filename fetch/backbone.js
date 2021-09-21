var User = Backbone.Model.extend({
    defaults:{
        id:0,
        name : '',
        email :''

    }
})
var Users = Backbone.Collection.extend({

});

var userlist = new Users();
var user1 = new User({id:1,name:"vedat",email:"vedat@vedat.com"});
userlist.add(user1);

var UserView = Backbone.View.extend({
model = new User(),
tagName:'tr',
initialize:function(){
    this.template = _.template($('.users-list-template')
    .html())
},
render:function(){
this.$el.html(this.template(this.model.toJSON()));
return this;
}

});
var UsersView = Backbone.View.extend({
model = userlist,
el = $(".user-list"),
initialize:function(){
    this.model.on("add",this.render(),this);

},
render:function(){
    var self=this;
    this.$el.html('');
    _.each(this.model.toArray(),function(user){
      self.$el.append(new UserView({model: user}).render().$el);
    })
}

});