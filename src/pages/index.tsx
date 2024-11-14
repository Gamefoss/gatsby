import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"

import "@styles/pages/index.css"

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main>
      <h1 className={"test"}>Testing Gatsby!</h1>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
