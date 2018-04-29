import {PureComponent} from 'react'

import Head from 'next/head'

export default class ImportMaterialUI extends PureComponent {
  render () {
    return (
      <Head>
        <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500' />
        <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons' />
      </Head>
    )
  }
}
