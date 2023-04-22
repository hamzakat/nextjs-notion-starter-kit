import * as React from 'react'
import { GetServerSideProps } from 'next'

import { useDynamicConfig } from 'contexts/DynamicConfig'

import { NotionPage } from '@/components/NotionPage'
import { dynamicConfigFromHeaders } from '@/lib/dynamic-config'
import { resolveNotionPage } from '@/lib/resolve-notion-page'
import { PageProps } from '@/lib/types'

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const dynamicConfig = dynamicConfigFromHeaders(context.req.headers)

    const pageProps: PageProps = await resolveNotionPage(
      dynamicConfig.domain,
      dynamicConfig.rootNotionPageId,
      true
    )

    // override the site object that's made by resolveNotionPage()
    pageProps.site = {
      domain: dynamicConfig.domain,
      name: dynamicConfig.name,
      rootNotionPageId: dynamicConfig.rootNotionPageId,
      description: dynamicConfig.description,
      rootNotionSpaceId: ''
    }

    const props = { pageProps, dynamicConfig }

    return { props }
  } catch (err) {
    console.error(err)

    // we don't want to publish the error version of this page, so
    // let next.js know explicitly that incremental SSG failed
    throw err
  }
}

export default function NotionDomainPage(props) {
  const { setDynamicConfig } = useDynamicConfig()
  setDynamicConfig(props.dynamicConfig)

  return <NotionPage {...props.pageProps} indexPage={true} />
}
