declare global {
  namespace NodeJS {
    interface ProcessEnv {
      COINMARKETCAP_API_KEY: string
    }
  }
}

export {}
