import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { renderWithProviders } from '../../utils/test-utils';
import { UserComponent } from '.';
import userData from '../../../public/data/users.json';
import { useDispatch } from 'react-redux';
import { selectUser } from '../../store/UserSlice';

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
}));

jest.mock('../../store/UserSlice', () => ({
    selectUser: jest.fn(),
}));

describe('UserComponent', () => {
    beforeAll(() => {
        global.alert = jest.fn();
    });

    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('renders UserComponent with fetched user data', async () => {
        const mockUsers = userData;

        fetchMock.mockResponseOnce(JSON.stringify(mockUsers));

        const { container } = renderWithProviders(<UserComponent />);

        expect(container).toBeInTheDocument();
    });

    it('opens modal to add a user when Add User button is clicked', async () => {
        renderWithProviders(<UserComponent />);

        const addUserButton = screen.getByText(/Add User/i);
        fireEvent.click(addUserButton);

        expect(screen.getByText(/Save Changes/i)).toBeInTheDocument();
    });
});
