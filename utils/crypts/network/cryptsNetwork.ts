enum Network {
  Eth = 'eth',
  Goerli = 'goerli',
  Bsc = 'bsc',
  Polygon = 'polygon',
  Avalanche = 'avalanche',
  Mumbai = 'mumbai',
  Fantom = 'fantom',
  Sepolia = 'sepolia',
}

export const NETWORK: { [key: number]: Network } = {
  1: Network.Eth,
  5: Network.Goerli,
  56: Network.Bsc,
  137: Network.Polygon,
  43114: Network.Avalanche,
  80001: Network.Mumbai,
  250: Network.Fantom,
  11155111: Network.Sepolia,
};
