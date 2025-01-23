// services/mikrotikService.js
import { RouterOSAPI } from 'routeros-client'; // Ensure this is the correct library
import { apiConfig } from '../config/apiConfig.js';

// Initialize the connection
const conn = new RouterOSAPI(apiConfig);

const mikrotikService = {
	// Get all interfaces
	getInterfaces: async () => {
		try {
			await conn.connect();
			const response = await conn.write('/interface/print');
			return response;
		} catch (error) {
			throw new Error(`Error fetching interfaces: ${error.message}`);
		} finally {
			conn.close(); // Ensure the connection is always closed
		}
	},

	// Get system identity
	getSystemIdentity: async () => {
		try {
			await conn.connect();
			const response = await conn.write('/system/identity/print');
			return response;
		} catch (error) {
			throw new Error(`Error fetching system identity: ${error.message}`);
		} finally {
			conn.close(); // Ensure the connection is always closed
		}
	},

	// Get all PPPoE clients (secrets)
	getPppoeClients: async () => {
		try {
			await conn.connect();
			const response = await conn.write('/ppp/secret/print');
			return response;
		} catch (error) {
			throw new Error(`Error fetching PPPoE clients: ${error.message}`);
		} finally {
			conn.close(); // Ensure the connection is always closed
		}
	},

	// Disable a PPPoE secret by ID
	disablePppoeSecret: async (id) => {
		try {
			await conn.connect();
			// Ensure the ID includes the asterisk (*)
			const formattedId =  `*${id}`;
			// Disable the PPPoE secret
			await conn.write('/ppp/secret/disable', [`=numbers=${formattedId}`]);
			return `PPPoE secret with ID ${formattedId} disabled successfully.`;
		} catch (error) {
			throw new Error(`Error disabling PPPoE secret: ${error.message}`);
		} finally {
			conn.close(); // Ensure the connection is always closed
		}
	},
};

export default mikrotikService;