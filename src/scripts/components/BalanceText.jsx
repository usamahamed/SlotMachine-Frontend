import React, { Component, PropTypes } from 'react';
import { SPIN_DELAY, SPIN_EACH_STOP_DELAY, SLOT_SYMBOL_TYPES } from 'constants/SlotConstants';
import { MAXIMUM, MINIMUM, DEFAULT, SPIN_BET } from 'constants/BalanceConstants';

import ReelSelector from 'components/ReelSelector';
import Log from 'common/Log';
import SendData from 'common/SendData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class BalanceText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: DEFAULT,
      spinbet: SPIN_BET,
      isSpinning: false,
      free: 'Normal Round',
      isDebug: false,
      debugPosition: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.isSpinning && nextProps.winnerLines && nextProps.winnerLines.length > 0) {
      let balance = 0;
      nextProps.winnerLines.map((line) => {
        balance += line.AMOUNT;
        return line;
      });
      this.onWin(balance);
      // send current balance
      SendData('/api/balance', { balancevalue: this.state.balance + balance });
    }
  }

  onWin = (balance) => {
    Log(`You won: ${balance}`);
    this.playSound('http://localhost:8080/sound/win.mp3');
    toast.success(`You Won ${balance} Points`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
    SendData('/api/winpoints', { countValue: balance, roundStatus: this.state.free });
    this.setState((prevState) => ({ balance: prevState.balance + balance }));
  }

  setDebugPosition = (debugPosition, reelName) => {
    this.setState((prevState) =>
      ({ debugPosition: Object.assign(prevState.debugPosition, { [reelName]: debugPosition }) })
    );
  }

  freeRoundOrNot = () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    // get random value from  0 -> 10 to have probability 10
    if (arr[Math.floor(Math.random() * 11)] === 3) { return true; }
    return false;
  }
  startSpin1 = () => {
    this.startSpin();
    this.playSound('http://localhost:8080/sound/2.mp3');
    if (this.freeRoundOrNot() === true) {
      toast.info('You Won Free Round', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000
      });
      this.setState({ free: 'Free Round', spinbet: 0 });
    } else {
      this.setState({ free: 'Normal Round!', spinbet: SPIN_BET });
    }
  }

  startSpin = () => {
    if (this.state.balance >= this.state.spinbet) {
      this.setState((prevState) => ({ balance: prevState.balance - this.state.spinbet, isSpinning: true }));
      this.props.onSpinStart(this.state);

      setTimeout(() => {
        this.setState({ isSpinning: false });
      }, SPIN_DELAY + (SPIN_EACH_STOP_DELAY * 2));
    } else {
      toast.info(`You don't have enough balance`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000
      });
    }
  }

  selectSymbolOptions = () => {
    return SLOT_SYMBOL_TYPES.map((symbol) => (
      <option>{symbol.name}</option>
    ));
  }

  debugToggle = () => {
    this.setState((prevState) => ({ isDebug: !prevState.isDebug }));
  }

  playSound = (url) => {
    const audio = new Audio(url);
    return audio.play();
  }

  handleChange = (event) => {
    if (event.target.value <= MAXIMUM && event.target.value >= MINIMUM) {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  renderDebug = () => {
    return (
      <div className="debug-area">
        <h5>Set up the symbols and press SPIN button</h5>
        {<ReelSelector onChange={(event) => { this.setDebugPosition(event, 'reel1'); }} />}
        {<ReelSelector onChange={(event) => { this.setDebugPosition(event, 'reel2'); }} />}
        {<ReelSelector onChange={(event) => { this.setDebugPosition(event, 'reel3'); }} />}
      </div>
    );
  }

  render() {
    return (
      <div className="balance-text">
        <div>Debug: <input disabled={this.state.isSpinning} type="checkbox" checked={this.state.isDebug} onChange={this.debugToggle} /></div>
        <div className="label">Your current balance is:</div>
        <input disabled={this.state.isSpinning} name="balance" type="number" value={this.state.balance} max={MAXIMUM} min={MINIMUM} onChange={this.handleChange} />
        <div><button className="btn-spin" disabled={this.state.isSpinning} onClick={this.startSpin1}>{this.state.free}</button></div>
        { this.state.isDebug ? this.renderDebug() : null }
        <ToastContainer />
      </div>
    );
  }
}

BalanceText.propTypes = {
  onSpinStart: PropTypes.func.isRequired,
  winnerLines: PropTypes.array.isRequired
};

export default BalanceText;
