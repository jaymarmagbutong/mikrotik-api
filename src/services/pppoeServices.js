// services/mikrotikService.js
import { RouterOSAPI } from 'routeros-client'; // Ensure this is the correct library
import { apiConfig } from '../config/apiConfig.js';

// Initialize the connection
const conn = new RouterOSAPI(apiConfig);

const pppoeServices = {

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


    getPppoeActive: async () => {
        try {
            await conn.connect();
            const response = await conn.write('/ppp/active/print');
            return response;
        } catch (error) {
            throw new Error(`Error fetching PPPoE Active clients: ${error.message}`);
        } finally {
            conn.close(); // Ensure the connection is always closed
        }
    },




    // Disable a PPPoE secret by ID
    disablePppoeSecret: async (id) => {
        try {
            await conn.connect();
            // Ensure the ID includes the asterisk (*)
            const formattedId = `*${id}`;
    
            // Step 1: Fetch the PPPoE secret to get the caller-id
            const secrets = await conn.write('/ppp/secret/print');
            const secret = secrets.find(secret => secret['.id'] === formattedId);
          
            if (!secret) {
                throw new Error(`PPPoE secret with ID ${formattedId} not found`);
            }
    
            const callerId = secret['last-caller-id'];
            const clientName = secret.name;
    
            if (!callerId) {
                throw new Error(`No caller-id found for PPPoE secret with ID ${formattedId}`);
            }
    
            // Step 2: Fetch active PPPoE sessions
            const activeSessions = await conn.write('/ppp/active/print');
    
            // Step 3: Find and terminate the active session using caller-id
            const activeSession = activeSessions.find(session => session['caller-id'] === callerId);
    
            if (activeSession) {
                await conn.write('/ppp/secret/disable', [`=numbers=${formattedId}`]);
                await conn.write('/ppp/active/remove', [`=.id=${activeSession['.id']}`]);
                return `Active session for client "${clientName}" (caller-id: ${callerId}) terminated successfully.`;
            }
    
            return `No active session found for client "${clientName}" (caller-id: ${callerId}).`;
        } catch (error) {
            throw new Error(`Error terminating active session: ${error.message}`);
        } finally {
            conn.close(); // Ensure the connection is always closed
        }
    },

};

export default pppoeServices;