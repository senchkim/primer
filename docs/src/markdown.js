import React from 'react'
import styled from 'styled-components'
import {get, styles as system, themeGet} from 'styled-system'
import {Heading, Link, theme} from '@primer/components'
import CodeExample from './CodeExample'
import Outline from './Outline'

const {colors, fontWeights, space} = theme

export const headerProps = {
  mt: 4,
  mb: 3,
  fontWeight: 'bold',
  lineHeight: 'condensed'
}

export const H1 = props => <Heading is="h1" fontSize={6} {...headerProps} fontWeight="light" {...props} />

export const defaultComponents = {
  a: Link,
  code: CodeExample,
  h1: H1,
  h2: props => <Heading is="h2" fontSize={5} {...headerProps} {...props} />,
  h3: props => <Heading is="h3" fontSize={4} {...headerProps} {...props} />,
  h4: props => <Heading is="h4" fontSize={3} {...headerProps} {...props} />,
  h5: props => <Heading is="h5" fontSize={2} {...headerProps} {...props} />,
  h6: props => <Heading is="h6" fontSize={1} {...headerProps} {...props} />,
  pre: props => props.children
}

export default function getComponents(page = {}) {
  const {outline: getOutline = () => []} = page
  return {
    ...defaultComponents,
    // render the outline for <p> tags with exactly the text "{:toc}"
    p: ({children, ...rest}) => {
      if (children === '{:toc}') {
        return <Outline outline={getOutline()} {...rest} />
      } else {
        return <p {...rest}>{children}</p>
      }
    }
  }
}

const T = key => themeGet(key, get(theme, key))

export const MarkdownBody = styled.div`
  ${system.color};
  ${system.fontSize};
  ${system.space};

  // Clearfix on the markdown body
  &::before {
    display: table;
    content: "";
  }

  &::after {
    display: table;
    clear: both;
    content: "";
  }

  > *:first-child {
    margin-top: 0 !important;
  }

  > *:last-child {
    margin-bottom: 0 !important;
  }

  // headings
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    tt, code {
      font-size: inherit;
    }
  }

  p,
  blockquote,
  ul,
  ol,
  dl,
  table,
  pre {
    margin-top: 0;
    margin-bottom: ${T('space.3')}px;
  }

  blockquote {
    padding: 0 1em;
    color: ${T('colors.gray.5')};
    border-left: 0.25em solid ${T('colors.gray.3')};

    > :first-child {
      margin-top: 0;
    }

    > :last-child {
      margin-bottom: 0;
    }
  }

  kbd {
    display: inline-block;
    padding: 3px 5px;
    font-size: 11px;
    line-height: 10px;
    color: ${T('colors.gray.7')};
    vertical-align: middle;
    background-color: ${T('colors.gray.0')};
    border: solid 1px ${T('colors.gray.3')};
    border-bottom-color: ${T('colors.gray.4')};
    border-radius: 3px;
    box-shadow: inset 0 -1px 0 ${T('colors.gray.4')};
  }

  // lists
  ul,
  ol {
    padding-left: ${T('space.3')}px;

    &.no-list {
      padding: 0;
      list-style-type: none;
    }
  }

  ul ul,
  ul ol,
  ol ol,
  ol ul {
    margin-top: 0;
    margin-bottom: 0;
  }

  li {
    margin: 0;
    word-break: break-all;
  }

  li > p:not(:first-child) {
    margin-top: ${T('space.3')}px;
  }

  dl {
    padding: 0;

    dt {
      padding: 0;
      margin-top: ${T('space.3')}px;
      font-size: 1em;
      font-style: italic;
      font-weight: ${T('fontWeights.bold')};
    }

    dd {
      padding: 0 ${T('space.3')}px;
      margin-bottom: ${T('space.3')}px;
    }
  }

  // tables
  table {
    display: block;
    width: 100%;
    overflow: auto;

    th {
      font-weight: ${T('fontWeights.bold')};
    }

    th,
    td {
      padding: 6px 13px;
      border: 1px solid ${T('colors.gray.2')};
    }

    tr {
      background-color: ${T('colors.white')};
      border-top: 1px solid ${T('colors.gray.2')};

      &:nth-child(2n) {
        background-color: ${T('colors.gray.1')};
      }
    }

    img {
      background-color: transparent;
    }
  }
`

MarkdownBody.defaultProps = {
  fontSize: 2
}

export const UnorderedList = styled
