//libs
import React from 'react';

class LetterContainer extends React.Component{

  isSpaceOrDash = () => this.props.content===' '||this.props.content==='-';
  isUnlocked = () =>this.props.data.attempts.successful.includes(this.props.content);

  render(){
    return(
    <div
    className={this.isSpaceOrDash()?'space-dash-container' : `letter-container-unlocked-${this.isUnlocked()}`}>
    {this.isUnlocked() || this.isSpaceOrDash() ? this.props.content : null}
    </div>
    );
  }
}

export default LetterContainer;
