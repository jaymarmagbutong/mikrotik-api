// controllers/systemController.js
import mikrotikService from '../services/mikrotikService.js';

export const getSystemIdentity = async (req, res) => {
  try {
    const data = await mikrotikService.getSystemIdentity();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
