/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
    const [modals, setModals] = useState({
        login: false,
        signup: false
    });

    const openModal = (modalName) => {
        setModals(prev => ({ ...prev, [modalName]: true }));
    };

    const closeModal = (modalName) => {
        setModals(prev => ({ ...prev, [modalName]: false }));
    };

    const closeAllModals = () => {
        setModals({ login: false, signup: false });
    };

    const toggleModals = (from, to) => {
        setModals({ login: false, signup: false, [to]: true });
    };

    return (
        <ModalContext.Provider value={{ modals, openModal, closeModal, closeAllModals, toggleModals }}>
            {children}
        </ModalContext.Provider>
    );
};
