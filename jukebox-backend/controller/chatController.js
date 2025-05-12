const Message = require('../model/chat');

// Save message to MongoDB
const storeMessage = async (sender, receiver, content) => {
  if (!sender || !receiver || !content?.trim()) {
    throw new Error('Missing sender, receiver, or content');
  }

  const message = new Message({ sender, receiver, content: content.trim() });
  await message.save();
  return message;
};

// Get messages between two users
const getMessages = async (req, res) => {
  const { userId } = req;
  const { otherUserId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: otherUserId },
        { sender: otherUserId, receiver: userId }
      ]
    }).sort('timestamp');

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get messages', error: err.message });
  }
};

module.exports = { storeMessage, getMessages };
