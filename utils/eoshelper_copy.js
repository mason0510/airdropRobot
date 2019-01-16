const { Api, JsonRpc } = require('eosjs');
const fetch = require('node-fetch');
const { TextDecoder, TextEncoder } = require('text-encoding');
const rpc = new JsonRpc('http://eu.eosdac.io', { fetch });
module.exports={
        api: {
            myFunc : function (pravitekey) {
                        const JsSignatureProvider = require('eosjs/dist/eosjs-jssig').default;
                        const signatureProvider = new JsSignatureProvider([pravitekey]);
                return new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
            }
        },
}


