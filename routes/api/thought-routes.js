const router = require('express').Router();
const {
  getAllThought,
  getAllThoughtById,
  AddThought,
  addReaction,
  updateThought,
  removeThought,
  removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts
router
  .route('/')
  .get(getAllThought)
  .post(AddThought);

// /api/thoughts/:id
router
  .route('/:thoughtId')
  .get(getAllThoughtById)
  .put(updateThought)
  .delete(removeThought);

// /api/thoughts/:thoughtId/reactions
router
.route('/:thoughtId/reactions')
.post(addReaction);

// /api/thoughts/:thoughtId/reactions/ :reactionId
router
.route('/:thoughtId/reactions/:reactionId')
.delete(removeReaction);


module.exports = router;
