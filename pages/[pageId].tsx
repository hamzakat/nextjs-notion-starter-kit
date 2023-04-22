import * as React from 'react'
import { GetServerSideProps } from 'next'

import { IDynamicConfig, useDynamicConfig } from 'contexts/DynamicConfig'

import { NotionPage } from '@/components/NotionPage'
import { dynamicConfigFromHeaders } from '@/lib/dynamic-config'
import { resolveNotionPage } from '@/lib/resolve-notion-page'
import { PageProps } from '@/lib/types'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const rawPageId = context.params.pageId as string

  try {
    const dynamicConfig = dynamicConfigFromHeaders(context.req.headers)

    const pageProps: PageProps = await resolveNotionPage(
      dynamicConfig.domain,
      rawPageId,
      false
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
    console.error('page error', rawPageId, err)

    // we don't want to publish the error version of this page, so
    // let next.js know explicitly that incremental SSG failed
    throw err
  }
}

// export async function getStaticPaths() {
//   if (isDev) {
//     return {
//       paths: [],
//       fallback: true
//     }
//   }

//   const siteMap = await getSiteMap()

//   const staticPaths = {
//     paths: Object.keys(siteMap.canonicalPageMap).map((pageId) => ({
//       params: {
//         pageId
//       }
//     })),
//     // paths: [],
//     fallback: true
//   }

//   console.log(staticPaths.paths)
//   return staticPaths
// }

export default function NotionDomainDynamicPage(props: {
  pageProps: PageProps
  dynamicConfig: IDynamicConfig
}) {
  const { setDynamicConfig } = useDynamicConfig()
  setDynamicConfig(props.dynamicConfig)

  return <NotionPage {...props.pageProps} />
}
