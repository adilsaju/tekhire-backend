const chat = async (req, res, next) => {
    try {
      const {
        message
      } = req.body;
      // console.log(message);
  
      // Send the message to all connected clients
      socketServer.getIO().emit('connection', message);
  
      res.json({
        success: true
      });
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }