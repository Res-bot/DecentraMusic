import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWallet } from '../context/WalletContext';
import StreamFiABI from '../abi/StreamFi.json';

// Replace with your deployed contract address
const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000";

export const useStreamFi = () => {
    const { signer, provider } = useWallet();
    const [contract, setContract] = useState(null);

    useEffect(() => {
        if (signer && !contract && CONTRACT_ADDRESS !== "0x0000000000000000000000000000000000000000") {
            const _contract = new ethers.Contract(CONTRACT_ADDRESS, StreamFiABI, signer);
            setContract(_contract);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [signer]);

    const registerSession = async (sessionKeyBytes, valueInEth) => {
        if (!contract) throw new Error("Contract not initialized");
        try {
            const tx = await contract.register_session(sessionKeyBytes, {
                value: ethers.parseEther(valueInEth)
            });
            await tx.wait();
            return tx;
        } catch (error) {
            console.error("Error in registerSession:", error);
            throw error;
        }
    };

    const settleBatch = async (user, artists, prices, signatures, messages) => {
        if (!contract) throw new Error("Contract not initialized");
        try {
            const tx = await contract.settle_batch(user, artists, prices, signatures, messages);
            await tx.wait();
            return tx;
        } catch (error) {
            console.error("Error in settleBatch:", error);
            throw error;
        }
    };

    const getBalance = async (userAddress) => {
        if (!contract) throw new Error("Contract not initialized");
        try {
            const balance = await contract.get_balance(userAddress);
            return ethers.formatEther(balance);
        } catch (error) {
            console.error("Error in getBalance:", error);
            throw error;
        }
    };

    const getSessionKey = async (userAddress) => {
        if (!contract) throw new Error("Contract not initialized");
        try {
            const key = await contract.get_session_key(userAddress);
            return key;
        } catch (error) {
            console.error("Error in getSessionKey:", error);
            throw error;
        }
    };

    return {
        contract,
        registerSession,
        settleBatch,
        getBalance,
        getSessionKey
    };
};
