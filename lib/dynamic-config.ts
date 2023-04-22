import * as iconv from 'iconv-lite'
import { IDynamicConfig } from 'contexts/DynamicConfig'
import { IncomingHttpHeaders } from 'http'

const decodeText = (text: string) => {
  return iconv.decode(Buffer.from(text, 'binary'), 'utf-8')
}

export const dynamicConfigFromHeaders = (
  headers: IncomingHttpHeaders
): IDynamicConfig => {
  // extract the dynamic config out of the headers
  const domain: string = headers['domain'] ? headers['domain']?.toString() : ''
  const rootNotionPageId: string = headers['root-notion-page-id']
    ? headers['root-notion-page-id']?.toString()
    : ''

  // non ASCII text is expected for these
  const author: string = headers['author']
    ? decodeText(headers['author'].toString())
    : ''
  const siteName: string = headers['site-name']
    ? decodeText(headers['site-name'].toString())
    : ''
  const description: string = headers['description']
    ? decodeText(headers['description'].toString())
    : ''

  const twitterUsername: string = headers['twitter-username']
    ? headers['twitter-username']?.toString()
    : ''
  const githubUsername: string = headers['github-username']
    ? headers['github-username']?.toString()
    : ''
  const linkedinUsername: string = headers['linkedin-username']
    ? headers['linkedin-username']?.toString()
    : ''
  const newsletterUrl: string = headers['newsletter-url']
    ? headers['newsletter-url']?.toString()
    : ''
  const youtubeUsername: string = headers['youtube-username']
    ? headers['youtube-username']?.toString()
    : ''

  const dynamicConfig: IDynamicConfig = {
    domain,
    rootNotionPageId,
    author,
    name: siteName,
    description,
    twitter: twitterUsername,
    github: githubUsername,
    linkedin: linkedinUsername,
    newsletter: newsletterUrl,
    youtube: youtubeUsername
  }

  return dynamicConfig
}
