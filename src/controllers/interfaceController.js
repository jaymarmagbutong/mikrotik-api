// controllers/interfaceController.js
import mikrotikService from '../services/mikrotikService.js';

export const getInterfaces = async (req, res) => {
  try {
    const data = await mikrotikService.getInterfaces();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
