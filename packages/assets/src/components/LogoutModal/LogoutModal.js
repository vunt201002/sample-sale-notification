import React from 'react';
import {Modal, TextContainer} from '@shopify/polaris';
import * as PropTypes from 'prop-types';

/**
 * Render logout modal
 *
 * @param {boolean} open
 * @param {Function} onClose
 * @param {Function} onAction
 * @return {React.ReactElement}
 * @constructor
 */
export default function LogoutModal({open, onClose, onAction}) {
  return (
    <Modal
      title="Are you sure?"
      open={open}
      onClose={onClose}
      primaryAction={{
        content: 'Log out',
        destructive: true,
        onAction
      }}
      secondaryActions={[{content: 'Cancel'}]}
    >
      <Modal.Section>
        <TextContainer>
          <p>You log out from the application</p>
        </TextContainer>
      </Modal.Section>
    </Modal>
  );
}

LogoutModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAction: PropTypes.func.isRequired
};
