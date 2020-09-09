const Web3 = require('web3');
var projectkey ' YOUR PROJECT ID';
var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/'+projectkey ));
var web3ws = new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws/v3/'+projectkey));
var account = '0x03326793A092136609Df7Ae47CB160aa85c39BBa'.toLowerCase();
var subscription = web3ws.eth.subscribe('pendingTransactions', (err, res) => {
        if (err) console.error(err);
    });

    
    
 console.log('Watching all transactions...');
        subscription.on('data', (txHash) => {
            setTimeout(async () => {
                try {
                    let tx = await web3.eth.getTransactionReceipt(txHash);
                    if (tx != null) {
                        if (account == tx.from.toLowerCase()) {
                               if(!tx.status)
                               {
                                   console.log({address: tx.from,block:tx.blockNumber,timestamp: new Date()});
                                }

                        }
                       
                    }
                } catch (err) {
                    console.error(err);
                }
            }, 60000)
        });
    
