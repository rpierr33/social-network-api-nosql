const router = require('express').Router();
const {
  getAllUser,
  getUserById,
  AddUser,
  addFriend,
  updateUser,
  removeUser,
  removeFriend
} = require('../../controllers/user-controller');

// /api/users
router
  .route('/')
  .get(getAllUser)
  .post(AddUser);

// /api/thoughts/:id
router
  .route('/:thoughtId')
  .get(getUserById)
  .put(updateUser)
  .delete(removeUser);

// /api/thoughts/:thoughtId/reactions/ :reactionId
router
.route('/:thoughtId/reactions/:reactionId')
.post(addFriend)
.delete(removeFriend);




module.exports = router;
