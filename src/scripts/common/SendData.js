import axios from 'axios';

const SendData = (url, data) => {
  axios.post(url, data).then(() => {
    console.log('"Data submitted successfully"');
  }).catch((error) => {
    console.log('"got errr while posting data"', error);
  });
};

export default SendData;
