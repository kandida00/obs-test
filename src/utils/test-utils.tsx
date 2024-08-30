import React from 'react';
import { Provider } from 'react-redux';
import { render, RenderOptions } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../store/UserSlice';
const createTestStore = () => {
    return configureStore({
        reducer: {
            user: userReducer,
        },
    });
};

const renderWithProviders = (
    ui: React.ReactElement,
    { store = createTestStore(), ...renderOptions }: { store?: ReturnType<typeof createTestStore> } & RenderOptions = {}
) => {
    return render(<Provider store={store}>{ui}</Provider>, renderOptions);
};

export * from '@testing-library/react';
export { renderWithProviders };
