exports.createChatRoom = {
  name: 'createChatRoom',
  description: 'I will create a chatroom with the given name',

  outputExample: {},

  inputs: {
    name: { required: true }
  },
  authenticated: false,
  version: 1.0,
  run: function(api, data, next){
    api.chatRoom.add(data.params.name, next);
  }

};
