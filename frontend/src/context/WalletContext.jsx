import React, { createContext, useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';

const WalletContext = createContext();

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [chainId, setChainId] = useState(null);
    const [error, setError] = useState(null);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const _provider = new ethers.BrowserProvider(window.ethereum);
                const _signer = await _provider.getSigner();
                const _account = await _signer.getAddress();
                const _network = await _provider.getNetwork();

                setProvider(_provider);
                setSigner(_signer);
                setAccount(_account);
                setChainId(_network.chainId);
                setError(null);
            } catch (err) {
                console.error("Error connecting wallet:", err);
                setError("Failed to connect wallet. Please try again.");
            }
        } else {
            setError("MetaMask is not installed. Please install it to use this app.");
        }
    };

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length > 0) {
                    connectWallet();
                } else {
                    setAccount(null);
                    setSigner(null);
                }
            });

            window.ethereum.on('chainChanged', () => {
                window.location.reload();
            });
        }
    }, []);

    return (
        <WalletContext.Provider value={{ account, provider, signer, chainId, connectWallet, error }}>
            {children}
        </WalletContext.Provider>
    );
};
