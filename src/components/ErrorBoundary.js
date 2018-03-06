import React from 'react';

export default class ErrorBoundary extends React.Component {
  state = { hasError: false };

  componentDidCatch() {
    this.setState({
      hasError: true
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error">
          <p>Ooops! Something went wrong!</p>
          <p>Reload page and try again.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
