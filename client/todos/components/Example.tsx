import * as React from 'react';

interface ExampleProps {
  readonly title: string;
};

class Example extends React.Component<ExampleProps, void> {
  render() {
    return (
      <h1>{ this.props.title }</h1>
    );
  }
}

export default Example;
