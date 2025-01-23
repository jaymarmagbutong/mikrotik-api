// controllers/interfaceController.js
import pppoeServices from '../services/pppoeServices.js';

// function for PPPoE clients
export const getPppoeClients = async (req, res) => {
    try {
      const data = await pppoeServices.getPppoeClients();
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
};

export const disablePppoeSecrets = async (req, res) => {
    const { id } = req.body; // For POST requests
    // const { id } = req.query; // For GET requests

   
    if (!id) {
        return res.status(400).json({ success: false, error: 'ID is required' });
    }

    try {
  
        await pppoeServices.disablePppoeSecret(id);
        res.json({ success: true, message: `PPPoE secret with ID ${id} disabled successfully.` });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const getPppoeActive = async (req, res) => {
    try {
      const data = await pppoeServices.getPppoeActive();
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
};