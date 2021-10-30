const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
  {
    // set custom id to avoid confusion with parent reaction _id
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true, 
      maxLength: 280
    },
    Username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  }
)
  
const ThouhgtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true, 
      maxLength: 280,
      minLength: 1
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    Username: {
      type: String,
      required: true
    },
    reactions: [
      reactionSchema
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

ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reaction.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
