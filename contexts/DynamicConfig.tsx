import React, { createContext, useContext } from 'react'

export interface IDynamicConfig {
  rootNotionPageId: string

  // basic site info (required)
  name: string
  domain: string
  author: string

  // open graph metadata (optional)
  description?: string

  twitter?: string
  github?: string
  linkedin?: string
  // mastodon?: string
  newsletter?: string
  youtube?: string
}

interface IDynamicConfigContext {
  dynamicConfig: IDynamicConfig
  setDynamicConfig: (config: IDynamicConfig) => void
}

export const defaultDynamicConfig: IDynamicConfig = {
  rootNotionPageId: 'cc0a6c88228347c9a2a8e251d956641a',

  // basic site info (required)
  name: 'Fekra',
  domain: '',
  author: 'Author',

  // open graph metadata (optional)
  description: 'Fekra.bio',

  // social usernames (optional)
  twitter: '', // optional username
  github: '', // optional username
  linkedin: '', // optional username
  // mastodon: '', // optional mastodon profile URL, provides link verification
  newsletter: '', // optional newsletter URL
  youtube: '' // optional youtube channel name or `channel/UCGbXXXXXXXXXXXXXXXXXXXXXX`
}

const DynamicConfigContext = createContext<IDynamicConfigContext>(null)

export const useDynamicConfig = () => useContext(DynamicConfigContext)

const DynamicConfigProvider = ({ children }) => {
  const [dynamicConfig, setDynamicConfig] =
    React.useState<IDynamicConfig>(defaultDynamicConfig)
  return (
    <DynamicConfigContext.Provider value={{ dynamicConfig, setDynamicConfig }}>
      {children}
    </DynamicConfigContext.Provider>
  )
}

export default DynamicConfigProvider
