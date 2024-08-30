import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import User from '../../../models/User';
import { ModalUser } from './Modal';
import userData from '../../../../public/data/users.json';
import { renderWithProviders } from '../../../utils/test-utils';

describe('ModalUser', () => {
    const user: User = userData[0];

    it('should render and show user details in view mode', () => {
        renderWithProviders(
            <ModalUser openModal={true} onClose={() => { }} selectedUser={user} viewOnly={true} />
        );

        expect(screen.getByLabelText('Name')).toHaveValue(user.name);
    });

    it('should allow editing user details in edit mode', async () => {
        renderWithProviders(
            <ModalUser openModal={true} onClose={() => { }} selectedUser={user} viewOnly={false} />
        );

        expect(screen.getByLabelText('Name')).toHaveValue(user.name);

        fireEvent.change(screen.getByLabelText('Name'), { target: { value: user.name } });

        fireEvent.click(screen.getByText(/Save Changes/i));
    });

});
