# seesol
Track ownership of SOL tokens and NFTs in real time

![See Sol Mascot](https://i.imgur.com/a7N16lp.png)

## Introduction
`seesol` is a token ownership watching system. It tracks the ownership changes of tokens and records a history of ownership. All this is done in a super-efficient way. 

## Use cases
This app builds the foundation of tracking owners. The ownership tracking can be used to make:
- Real time discord role assignement
- Trade activity broadcasting
- Per second holder benefits
- Sniper tools to check if an nft got listed for sale
- Transparency reports on the holder ship of NFT communities
- Meta Blocks enabled upgrade mechanics

## Cost effectiveness
Currently, nft owner tracking systems like Matrica, refresh ownership on an interval. This leads to exponential bills. If you are tracking 10000 NFTs, at a 30 minute interval, paying 2 credits per call, then you pay:

Per run (every 30 minutes) = 10000x2 = 20000 credits
Per hour (two 30 min intervals) = 20000x2 = 40000
Per day (24 1 hour intervals) = 40000x24 = 960000
Per month (30 1 day intervals) = 960000x30 = **28,800,000**

`seesol` doesn't run on an interval, instead it watches for the associated token account for changes. So it can stay updated in realtime at a fraction of the cost. With `seesol`, for 10000 nfts you pay:

Initial run = 10000x2 = 20000
Assuming 10000 nfts changed owners at 2 times per nft = 20000 changes = 20000x2 = 40000 credits
Total = **60000**

## Prior art
There are many api providers that give the list of NFTs held by a wallet. If you have a list of holders, you can track changes, but this is extremely wasteful.

The magic of this system is its watching capability that eliminates the need for refetching owners every `x` minutes. It costs only 1 Quick Node credit to track 1 change in ownership. 

## Known problems
The system currently reacts only to `finalized` transactions. This can lead to issues when there is network congestion and Solana decides to finalize two blocks at once. If the token changed ownership in both blocks, then the current owner of the nft might not be determined correctly. This is an edge case. We are looking at ways to fix this.

One solution is to make the system run on `confirmed` transactions.

## Authorship
This project was built by Kartik Soneji. He helped with the implementation of the core into Meta Blocks system. 
Meta Blocks is an upgradable NFT protocol backed by Big Brain VC, Collab Currency and Gmoney.

Kartik is a final year student at TSEC <https://tsec.edu>. In the past he has contributed to Solana and Metaplex libraries.
The records of the contributions can be found at:
- <https://github.com/metaplex-foundation/sugar/pulls?q=author%3AKartikSoneji>
- <https://github.com/metaplex-foundation/js/pulls?q=author%3AKartikSoneji>
- <https://github.com/solana-labs/solana/pulls?q=author%3AKartikSoneji>

Apart from the open source contributions, he has also worked to:
- Build the swap system for the pengu love project
- Build the terraforming system for the PlanetZ project by PsyNetwork (dynamic nft updates + rewards emission)
- Helped debug hundreds of issues in the Metaplex discord
- Built an alternate minting system for 3moji in 2 days

## Seeking grants
Currently, this solution runs for Meta Blocks in a closed source way. We want to open source the core and build a service that can projects can use to self-host, or pay us for hosting it for them. 

### A grant will help us:
1. Make this open source, write docs around it
2. Make a platform for easy integration - You have owner index already, now you need to build discord hooks stuff and ui, that's why you need money

### Tentative Timeline:
1. Making the system scalable with a database, currently it runs only on JSON files -> 15 days
2. Discord integrations (Bot to add/remove roles in realtime, other webhooks and UI) - 20 days
3. Deployments (of service, website and discord bot server) - 7 days
4. Documentation so other people can use it themselves - 7 days
5. Open source sales efforts (to onboard projects to use this) - approx 180 days to get 40 projects

*Total: approx. 50 days of development, and 6 months of slow sales outreach + inbound + marketing*
**Total ask: 18k USD**

Ask breakdown (approximates):
1- Chain interaction hardening (removal of edge cases): 4k
2- Discord API/ webhooks/ bot dev/ easy to use platform: 6k
3- Infra for 1 year: 2k (maybe more if needed)
4- Aggregate statistics system (maintain stats for all nft collections): 3k
4- First 20 integrations (changes people might ask for, additional tooling like updates re: staked nfts): 2k 
5- Blog posts, events, graphics, marketing material: 1k 

## License
TBD - Some form of Apache or GPL maybe

## Appendix
[1] Possible mascots https://imgur.com/a/1qpMfGu