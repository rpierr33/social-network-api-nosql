const { Schema, model, Types } = require('mongoose');


const UserSchema = new Schema(
  {

    Username: {
      type: String,
      unique: true, 
      required: true,
      trim: true
    },

    email: {
      type: String,
      unique: true, 
      required: true,
      match: [/^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/, 'please fill to validate email']
    },
    thoughts: [
      {
      type: Schema.Types.ObjectId,
      ref: 'Thought'
      }
     ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }  
    ]
  },

    {
      toJson: {
        virtuals: true, 
        getters: true
      },
      // prevents virtuals from creating duplicates of Id
    id: false

  }
);


  
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;