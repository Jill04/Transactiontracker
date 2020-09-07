const Web3 = require('web3');

web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/138d2f36cef2452eaaf06661bfd22344' ));

function getTransactionsByAccount( startBlockNumber, endBlockNumber) {
   
    console.log("Searching for failed transactions  within blocks "  + startBlockNumber + " and " + endBlockNumber);

    for (var i = startBlockNumber; i <= endBlockNumber; i++) {
        
        web3.eth.getBlock(i)
        .then(async function(data)
        {
           //console.log("Number",data.number,"Transactions",data.transactions);
          
               for( var j=0;j<=data.transactions.length;j++)
               {
                   if (typeof data.transactions[j] != 'undefined' ) 
                   {
                        let tx = await web3.eth.getTransactionReceipt(data.transactions[j]);
                         if (tx != null) {
                            if(!tx.status)
                                {
                                    console.log({address: tx.transactionHash,block:tx.blockNumber,timestamp: new Date()});
                                }
                            }
                        
                     }
             }
        }).catch((err) => {console.log(err)});
        
    }

} 


getTransactionsByAccount(8603562,8603565);

