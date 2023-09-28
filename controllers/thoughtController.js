const { Thought, User } = require('../models');

const thoughtController = {

    getAllThoughts(req, res) {
        Thought.find()
    
          .then((dbThoughtData) => {
            res.json(dbThoughtData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
        },
        updateThought(req, res) {
            Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true })
              .then((dbThoughtData) => {
                if (!dbThoughtData) {
                  return res.status(404).json({ message: 'No thought with this id!' });
                }
                res.json(dbThoughtData);
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json(err);
              });
          },
          // delete thought with req.params.thoughtId
          deleteThought(req, res) {
            Thought.findOneAndRemove({ _id: req.params.thoughtId })
              .then((dbThoughtData) => {
             
        
                // pull thought id from user's thoughts array
                return User.findOneAndUpdate(
                  { thoughts: req.params.thoughtId },
                  { $pull: { thoughts: req.params.thoughtId } },
                  { new: true }
                );
              })
              .then((dbUserData) => {
             
                res.json({ message: 'Thought deleted.' });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json(err);
              });
          },
        
          // push reaction to thought array
          addReaction(req, res) {
            Thought.findOneAndUpdate(
              { _id: req.params.thoughtId },
              { $addToSet: { reactions: req.body } },
              { runValidators: true, new: true }
            )
              .then((dbThoughtData) => {
                if (!dbThoughtData) {
                  return res.status(404).json({ message: "Doesn't exist." });
                }
                res.json(dbThoughtData);
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json(err);
              });
          },
          // pull reaction out of thought array
          removeReaction(req, res) {
            Thought.findOneAndUpdate(
              { _id: req.params.thoughtId },
              { $pull: { reactions: { reactionId: req.params.reactionId } } },
              { runValidators: true, new: true }
            )
              .then((dbThoughtData) => {
                if (!dbThoughtData) {
                  return res.status(404).json({ message: "Doesn't exist." });
                }
                res.json(dbThoughtData);
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json(err);
              });
          },
        };
        
        module.exports = thoughtController;