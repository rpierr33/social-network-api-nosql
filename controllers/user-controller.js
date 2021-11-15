const { User, Thought } = require('../models');

const UserController = {
  // get all thoughts
  getAllUser(req, res) {
    User.find({})
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one thought by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // add  user
  AddUser({ body }, res) {
    User.create(body)
      .then(dbUserData => {
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // update Thought by id
addFriend({params}, res) {
    User.findByIdAndUpdate(
      { _id: params.id },
      { $push: { friends: params.friendId } },
      { runValidators: true, new: true }
    )
      .then((dbFriendData) => {
        if (!dbFriendData) {
          res.status(404).json({ message: "User with this id not found" });
        }
        res.json(dbFriendData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500);
      });
  },

  // update User
  updateUser({ params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      body,
      { new: true, runValidators: true }
    )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },
  // remove User
  removeUser({ params }, res) {
    User.findByIdAndDelete( { _id: params.id } )
        .then(async (dbUserData) => {
        const { username } = dbUserData;
        await Thought.deleteMany({ writtenBy: username });
        res.json(dbUserData);
        })
        .catch(err => res.json(err));
  },


  // update reply
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: { friendId: params.friendId } } },
      { new: true }
    )
      .then(dbUserData => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(dbUserData)
      })
      .catch(err => res.json(err));
  }
};



module.exports = UserController;
