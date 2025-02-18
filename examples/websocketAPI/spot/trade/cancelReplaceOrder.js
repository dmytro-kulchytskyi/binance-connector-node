'use strict'

const { Console } = require('console')
const WebsocketAPI = require('../../../../src/websocketAPI')
const TimeUnit = require('../../../../src/helpers/timeUnit')

const logger = new Console({ stdout: process.stdout, stderr: process.stderr })

const apiKey = process.env.BINANCE_API_KEY || ''
const apiSecret = process.env.BINANCE_API_SECRET || ''
const wsURL = 'wss://ws-api.testnet.binance.vision/ws-api/v3' // we setup wsURL to testnet. The default value set to production site: wss://ws-api.binance.com/ws-api/v3

const callbacks = {
  open: (client) => {
    logger.debug('Connected with Websocket server')
    client.cancelReplaceOrder('BNBUSDT', 'ALLOW_FAILURE', 'BUY', 'LIMIT', {
      cancelOrderId: 3285225,
      timeInForce: 'GTC',
      price: 300,
      quantity: 0.1
    })
  },
  close: () => logger.debug('Disconnected with Websocket server'),
  message: data => logger.info(data)
}

const websocketAPIClient = new WebsocketAPI(apiKey, apiSecret, { logger, callbacks, wsURL, timeUnit: TimeUnit.MICROSECOND })

// disconnect after 20 seconds
setTimeout(() => websocketAPIClient.disconnect(), 20000)
