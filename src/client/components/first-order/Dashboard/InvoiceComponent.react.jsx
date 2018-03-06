import React from "react";
import PropTypes from 'prop-types';

import ErrorBoundary from "../Error/ErrorBoundry.react";

const InvoiceComponent = (props) => {
  return(
    <ErrorBoundary>
      <div>Invoices</div>
    </ErrorBoundary>
  )
}

InvoiceComponent.propTypes = {}

export default InvoiceComponent;