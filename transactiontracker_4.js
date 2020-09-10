const Web3 = require('web3');
var projectkey='';
web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/'+projectkey ));

function getTransactionsByAccount(account,startBlockNumber, endBlockNumber) {
   
    console.log("Searching for transactions of account "+account+ " within blocks "  + startBlockNumber + " and " + endBlockNumber);

    for (var i = startBlockNumber; i <= endBlockNumber; i++) {
        
        web3.eth.getBlock(i)
        .then(async function(data)
        {
          
          
               for( var j=0;j<=data.transactions.length;j++)
               {
                   if (typeof data.transactions[j] != 'undefined' ) 
                   {
                        let tx = await web3.eth.getTransactionReceipt(data.transactions[j]);
                         //console.log("Tx:",tx);
                         if (tx != null) {
                            if(account == tx.from.toLowerCase())
                                {
                                    console.log({blockHash:tx.blockHash,blockNumber:tx.blockNumber,gasUsed:tx.gasUsed,status:tx.status,transactionHash: tx.transactionHash,timestamp: new Date(),to:tx.to});
                                }
                            }
                        
                     }
             }
        }).catch((err) => {console.log(err)});
        
    }

} 


getTransactionsByAccount('0x03326793A092136609Df7Ae47CB160aa85c39BBa'.toLowerCase(),8605802,8605898);