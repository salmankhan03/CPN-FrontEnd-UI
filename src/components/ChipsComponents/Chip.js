// src/components/Chip.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const Chip = ({ label, onRemove }) => {
  return (
    <div style={styles.chip}>
      <span className='secondaryColor'>{label}</span>
      <span><FontAwesomeIcon icon={faTimesCircle} size="lg" className="secondaryColor ml-3" onClick={onRemove}  />      </span>
    </div>
  );
};

const styles = {
  chip: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '12px 20px',
    margin: '4px',
    backgroundColor: '#e0e0e0',
    borderRadius: '16px',
    fontSize: '14px',
  },
};

export default Chip;
