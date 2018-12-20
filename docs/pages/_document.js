import React from 'react'
import Document, {Main, NextScript} from 'next/document'
import {ServerStyleSheet} from 'styled-components'
import {extractCritical} from 'emotion-server'
import {getAssetPath} from '../src/utils'
import sass from '../lib/sass.macro'

const GlobalCSS = ({id}) => (
  <style id={id} dangerouslySetInnerHTML={{__html: sass`
    @import "primer/index.scss";
    @import "prism-github/prism-github.scss";
    // this is a hack for busted HTML syntax highlighting (in Prism???)
    .language-html .token { color: $gray-800 !important; }
  `}} />
)

export default class MyDocument extends Document {
  static getInitialProps({renderPage}) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    return {
      ...page,
      styleTags: (
        <>
          <style id="emotion-static">{extractCritical(page.html).css}</style>
          {sheet.getStyleElement()}
        </>
      )
    }
  }

  render() {
    const {styleTags} = this.props

    return (
      <html lang="en">
        <head>
          <title>Primer CSS</title>
          {/* TODO: update this with a new id
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-126681523-1" />
          <script async href={getAssetPath('analytics.js')} />
          */}
          <meta charSet="utf8" />
          <link rel="icon" href={getAssetPath('favicon.png')} />
          <link rel="apple-touch-icon" href={getAssetPath('apple-touch-icon.png')} />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <meta property="og:title" content="Primer CSS" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://primer.style/css/" />
          <meta property="og:description" content="CSS for GitHub's Primer design system" />
          <meta
            property="og:image"
            content="https://user-images.githubusercontent.com/586552/47590375-121cad80-d93a-11e8-89f2-a1cf108e0548.png"
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:site" content="@githubprimer" />
          <link rel="stylesheet" href={getAssetPath('github/styleguide.css')} />
          <GlobalCSS id="global-css" />
          {styleTags}
        </head>
        <body>
          <Main />
          <NextScript />
          {<script src={getAssetPath('github/styleguide.js')} />}
        </body>
      </html>
    )
  }
}
