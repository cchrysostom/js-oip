import {Insight} from 'insight-explorer';
import {varIntBuffer} from '../../../util/btc'
import sign from './flosigner'

const floFeePerKb = 10000

module.exports = {
	name: 'flo_testnet',
	displayName: 'Flo Testnet',
	ticker: 'tFLO',
	satPerCoin: 1e8,
	feePerKb: floFeePerKb,
	feePerByte: floFeePerKb / 1024,
	maxFeePerByte: 100,
	minFee: floFeePerKb,
	dust: 100000,
	txVersion: 2,
	explorer: new Insight('https://testnet.flocha.in/api'),
	getExtraBytes: function (options) {
		let fData = options.floData || ""

		let string_buffer = Buffer.from(fData, 'utf8')
		let length_buffer = varIntBuffer(string_buffer.length)

		let built_string = length_buffer.toString("hex") + string_buffer.toString("hex")

		return built_string
	},
	sign,
	network: {
		bip32: {
			public: 0x013440e2,
			private: 0x01343c23
		},
		slip44: 1,
		messagePrefix: '\u001bFlorincoin Signed Message:\n',
		pubKeyHash: 115,
		scriptHash: 58,
		wif: 239
	}
}
