var Web3 = require('web3');
var Contract= require("./Contract.json");
var web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/138d2f36cef2452eaaf06661bfd22344"));
var web3ws = new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws/v3/138d2f36cef2452eaaf06661bfd22344'));
web3.eth.defaultAccount = web3.eth.accounts[0];
var dapp= new web3.eth.Contract(Contract,'0x3c87eC4dff2B1AB4eEC5627Cea87BE2F0f829A19');
var account = '0x03326793A092136609Df7Ae47CB160aa85c39BBa'.toLowerCase();


const START_BLOCK =8603394;
const END_BLOCK = 8604139;
var txHash;

dapp.getPastEvents("allEvents",
    {  

        fromBlock: START_BLOCK,     
        toBlock: END_BLOCK
         
    })                              
    .then(async function(data){
        txHash = data.map((event) => event.transactionHash);
        
        
        for( let j=0;j<txHash.length;j++)
        {
            //console.log("Hash",j,txHash[j]);
            try {
                web3.eth.getTransactionReceipt(txHash[j])
                .then( function(result){
                    //console.log(result.from);
                    if (result != null) {
                        if (account == result.from.toLowerCase()) {
                              //console.log(result.status);
                               if(!result.status)
                               {
                                   console.log({address: result.from,block:result.blockNumber,timestamp: new Date()});
                                }
    
                        }
                    }  
                })
                .catch((err) => console.error(err));
               
            } catch (err) {
                console.error(err);
            }
        }
    }) 
        
    .catch((err) => console.error(err));