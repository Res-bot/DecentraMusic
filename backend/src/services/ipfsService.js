const axios = require('axios');
const FormData = require('form-data');

/**
 * IPFS Service for interacting with Pinata/IPFS
 * Handles file uploads and retrieval from IPFS
 */

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_KEY = process.env.PINATA_SECRET_KEY;
const PINATA_GATEWAY = process.env.PINATA_GATEWAY || 'https://gateway.pinata.cloud';

/**
 * Upload file to IPFS via Pinata
 * @param {Buffer} fileBuffer - File buffer to upload
 * @param {string} fileName - Name of the file
 * @param {object} metadata - Additional metadata
 * @returns {Promise<object>} - Returns IPFS hash and details
 */
const uploadToIPFS = async (fileBuffer, fileName, metadata = {}) => {
  try {
    if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
      console.warn('Pinata credentials not configured. Using mock CID.');
      // Return mock CID for development
      return {
        success: true,
        ipfsHash: `Qm${Math.random().toString(36).substring(2, 15)}`,
        pinSize: fileBuffer.length,
        timestamp: new Date().toISOString(),
        isDuplicate: false
      };
    }

    const formData = new FormData();
    formData.append('file', fileBuffer, fileName);

    // Add metadata
    const pinataMetadata = JSON.stringify({
      name: fileName,
      keyvalues: metadata
    });
    formData.append('pinataMetadata', pinataMetadata);

    // Add pinata options
    const pinataOptions = JSON.stringify({
      cidVersion: 1
    });
    formData.append('pinataOptions', pinataOptions);

    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      formData,
      {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'pinata_api_key': PINATA_API_KEY,
          'pinata_secret_api_key': PINATA_SECRET_KEY
        },
        maxBodyLength: Infinity
      }
    );

    return {
      success: true,
      ipfsHash: response.data.IpfsHash,
      pinSize: response.data.PinSize,
      timestamp: response.data.Timestamp,
      isDuplicate: response.data.isDuplicate || false
    };

  } catch (error) {
    console.error('IPFS upload error:', error.response?.data || error.message);
    throw new Error('Failed to upload to IPFS');
  }
};

/**
 * Upload JSON metadata to IPFS
 * @param {object} metadata - JSON metadata object
 * @returns {Promise<object>} - Returns IPFS hash
 */
const uploadJSONToIPFS = async (metadata) => {
  try {
    if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
      console.warn('Pinata credentials not configured. Using mock CID.');
      return {
        success: true,
        ipfsHash: `Qm${Math.random().toString(36).substring(2, 15)}metadata`,
        pinSize: JSON.stringify(metadata).length,
        timestamp: new Date().toISOString()
      };
    }

    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      metadata,
      {
        headers: {
          'Content-Type': 'application/json',
          'pinata_api_key': PINATA_API_KEY,
          'pinata_secret_api_key': PINATA_SECRET_KEY
        }
      }
    );

    return {
      success: true,
      ipfsHash: response.data.IpfsHash,
      pinSize: response.data.PinSize,
      timestamp: response.data.Timestamp
    };

  } catch (error) {
    console.error('IPFS JSON upload error:', error.response?.data || error.message);
    throw new Error('Failed to upload JSON to IPFS');
  }
};

/**
 * Get file from IPFS
 * @param {string} cid - IPFS CID/hash
 * @returns {Promise<Buffer>} - File buffer
 */
const getFromIPFS = async (cid) => {
  try {
    const url = `${PINATA_GATEWAY}/ipfs/${cid}`;
    
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      timeout: 30000 // 30 second timeout
    });

    return Buffer.from(response.data);

  } catch (error) {
    console.error('IPFS fetch error:', error.message);
    throw new Error('Failed to fetch from IPFS');
  }
};

/**
 * Get JSON metadata from IPFS
 * @param {string} cid - IPFS CID/hash
 * @returns {Promise<object>} - JSON object
 */
const getJSONFromIPFS = async (cid) => {
  try {
    const url = `${PINATA_GATEWAY}/ipfs/${cid}`;
    
    const response = await axios.get(url, {
      timeout: 10000
    });

    return response.data;

  } catch (error) {
    console.error('IPFS JSON fetch error:', error.message);
    throw new Error('Failed to fetch JSON from IPFS');
  }
};

/**
 * Pin existing IPFS hash (useful for preserving content)
 * @param {string} cid - IPFS CID to pin
 * @param {string} name - Name for the pin
 * @returns {Promise<object>}
 */
const pinByHash = async (cid, name = 'Pinned content') => {
  try {
    if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
      console.warn('Pinata credentials not configured.');
      return { success: true, message: 'Mock pin successful' };
    }

    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinByHash',
      {
        hashToPin: cid,
        pinataMetadata: { name }
      },
      {
        headers: {
          'pinata_api_key': PINATA_API_KEY,
          'pinata_secret_api_key': PINATA_SECRET_KEY
        }
      }
    );

    return {
      success: true,
      ipfsHash: response.data.IpfsHash,
      pinSize: response.data.PinSize,
      timestamp: response.data.Timestamp
    };

  } catch (error) {
    console.error('Pin by hash error:', error.response?.data || error.message);
    throw new Error('Failed to pin IPFS hash');
  }
};

/**
 * Unpin content from IPFS
 * @param {string} cid - IPFS CID to unpin
 * @returns {Promise<boolean>}
 */
const unpinFromIPFS = async (cid) => {
  try {
    if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
      console.warn('Pinata credentials not configured.');
      return true;
    }

    await axios.delete(
      `https://api.pinata.cloud/pinning/unpin/${cid}`,
      {
        headers: {
          'pinata_api_key': PINATA_API_KEY,
          'pinata_secret_api_key': PINATA_SECRET_KEY
        }
      }
    );

    return true;

  } catch (error) {
    console.error('Unpin error:', error.response?.data || error.message);
    return false;
  }
};

/**
 * List all pinned files
 * @param {object} filters - Optional filters (status, metadata, etc.)
 * @returns {Promise<array>} - List of pinned files
 */
const listPinnedFiles = async (filters = {}) => {
  try {
    if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
      console.warn('Pinata credentials not configured.');
      return [];
    }

    const response = await axios.get(
      'https://api.pinata.cloud/data/pinList',
      {
        headers: {
          'pinata_api_key': PINATA_API_KEY,
          'pinata_secret_api_key': PINATA_SECRET_KEY
        },
        params: filters
      }
    );

    return response.data.rows;

  } catch (error) {
    console.error('List pinned files error:', error.response?.data || error.message);
    return [];
  }
};

/**
 * Generate IPFS gateway URL
 * @param {string} cid - IPFS CID
 * @param {string} gateway - Optional custom gateway
 * @returns {string} - Gateway URL
 */
const getIPFSUrl = (cid, gateway = PINATA_GATEWAY) => {
  return `${gateway}/ipfs/${cid}`;
};

/**
 * Upload track with metadata to IPFS
 * This is a convenience function that uploads both audio and metadata
 * @param {Buffer} audioBuffer - Audio file buffer
 * @param {object} trackMetadata - Track metadata
 * @returns {Promise<object>} - Both CIDs
 */
const uploadTrackToIPFS = async (audioBuffer, trackMetadata) => {
  try {
    // Upload audio file
    const audioUpload = await uploadToIPFS(
      audioBuffer,
      `${trackMetadata.title}.mp3`,
      { type: 'audio', artist: trackMetadata.artist }
    );

    // Create full metadata with audio CID
    const fullMetadata = {
      ...trackMetadata,
      audioCID: audioUpload.ipfsHash,
      audioSize: audioUpload.pinSize,
      uploadedAt: audioUpload.timestamp
    };

    // Upload metadata
    const metadataUpload = await uploadJSONToIPFS(fullMetadata);

    return {
      success: true,
      audioCID: audioUpload.ipfsHash,
      metadataCID: metadataUpload.ipfsHash,
      audioUrl: getIPFSUrl(audioUpload.ipfsHash),
      metadataUrl: getIPFSUrl(metadataUpload.ipfsHash)
    };

  } catch (error) {
    console.error('Track upload error:', error.message);
    throw new Error('Failed to upload track to IPFS');
  }
};

module.exports = {
  uploadToIPFS,
  uploadJSONToIPFS,
  getFromIPFS,
  getJSONFromIPFS,
  pinByHash,
  unpinFromIPFS,
  listPinnedFiles,
  getIPFSUrl,
  uploadTrackToIPFS
};