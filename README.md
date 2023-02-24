<p align="center">
  <img src="https://i.imgur.com/a7N16lp.png" width="200" height="200">
  <h1 align="center" style="display:block;">seesol 🌟</h1>
  <p align="center">Track ownership of SOL tokens and NFTs in real-time 📈</p>
</p>

### Introduction 🎉

seesol is a super-efficient system that tracks token ownership changes and records a history of ownership.

### Demo 🎮

Check a video demo of the system being used in a real app: <https://www.youtube.com/watch?v=gtu0DqgIH9w>

### Use cases 🤝

Use seesol to:

- Assign real-time Discord roles 🎮
- Broadcast trade activity 📣
- Offer per-second holder benefits 💸
- Check if an NFT has been listed for sale 🔍
- Create transparency reports on the ownership of NFT communities 📊
- Enable upgrade mechanics with Meta Blocks 🧰

### Cost-effectiveness 💰

Unlike other NFT owner tracking systems that refresh on an interval, seesol watches for associated token account changes in real-time, saving you a fortune 💸. With seesol, for 10,000 NFTs, you'll only pay:

Initial run = 20,000 credits
Assuming 10,000 NFTs change ownership twice = 20,000 changes x 2 = 40,000 credits
Total = **60,000 credits**

In contrast, if you use other systems, you could pay up to 28,800,000 credits per month!

Per run (every 30 minutes) = 10000x2 = 20000 credits
Per hour (two 30 min intervals) = 20000x2 = 40000
Per day (24 1 hour intervals) = 40000x24 = 960000
Per month (30 1 day intervals) = 960000x30 = **28,800,000**

seesol eliminates the need for wasteful refetching of NFT owners every x minutes. It costs only 1 Quick Node credit to track 1 change in ownership, making it the most efficient system out there 💪.

### Prior art 🖼️

There are many api providers that give the list of NFTs held by a wallet. If you have a list of holders, you can track changes, but this is extremely wasteful.

The magic of this system is its watching capability that eliminates the need for refetching owners every `x` minutes. It costs only 1 Quick Node credit to track 1 change in ownership.

### Known problems 🔍

Currently, the system only reacts to "finalized" transactions, which can lead to issues when there is network congestion and Solana decides to finalize two blocks at once. If the token changed ownership in both blocks, then the current owner of the NFT may not be determined correctly. We are looking at ways to fix this, such as making the system run on "confirmed" transactions 💡.

### Authorship 🎓

seesol was built by Kartik Soneji, a final-year student at TSEC. He has contributed to Solana and Metaplex libraries and worked on various projects, including building the swap system for Pengu Love and the terraforming system for PlanetZ.

The records of the contributions can be found at:

- <https://github.com/metaplex-foundation/sugar/pulls?q=author%3AKartikSoneji>
- <https://github.com/metaplex-foundation/js/pulls?q=author%3AKartikSoneji>
- <https://github.com/solana-labs/solana/pulls?q=author%3AKartikSoneji>

### Seeking grants 💰

We're seeking grants to make seesol open-source and build a service that projects can use to self-host or pay us to host for them.

A grant will help us:

1. Make seesol open-source and write documentation 📝
2. Create a platform for easy integration, including Discord hooks and UI 🚀

Timeline:

1. Make the system scalable with a database, currently it runs only on JSON files 📊 (15 days)
2. Develop Discord integrations (Bot to add/remove roles in real-time, webhooks, and UI) 🤖 (20 days)
3. Deploy the service, website, and Discord bot server 🚀 (7 days)
4. Write documentation so other people can use it themselves 📝 (7 days)
5. Start open-source sales outreach to onboard projects to use seesol 📣 (approx. 180 days to get 40 projects)

Total: approx. 50 days of development, and 6 months of slow sales outreach, inbound, and marketing
Total ask: $18k USD

### License

TBD - Some form of Apache or GPL maybe

### Appendix

[1] Possible mascots https://imgur.com/a/1qpMfGu
