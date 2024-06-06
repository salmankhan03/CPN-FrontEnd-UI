import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

const MetaTitle = ({pageTitle}) => {

  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
    </div>
  );
};

export default MetaTitle;
