import React from 'react';
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AlertDiv = (props) =>
     props.alerts !== null &&
     props.alerts.length > 0 &&
     props.alerts.map((alert) => (
          <div key={alert.key}>
               <Alert color={alert.alertType} className='alert'>
                    {alert.msg}
               </Alert>
          </div>
     ));

AlertDiv.propTypes = {
     alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
     alerts: state.alert,
});

export default connect(mapStateToProps)(AlertDiv);
