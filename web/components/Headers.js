import {PureComponent} from 'react'

import Head from 'next/head'

export default class Headers extends PureComponent {
  render () {
    return (
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1, user-scalable=no, minimal-ui' />
        <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet' />
        <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' />
        <link rel='stylesheet' href='/static/css/base.css' />
      </Head>
    )
  }
}
