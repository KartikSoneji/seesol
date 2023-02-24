import {
    type AccountChangeCallback,
    type AccountInfo,
    type Context,
    Connection,
    PublicKey
} from "@solana/web3.js";
import { type Account, unpackAccount } from "@solana/spl-token";

// @ts-ignore
import fetch from "node-fetch";

const connection = new Connection("https://api.devnet.solana.com");

interface TokenData {
    owner: PublicKey;
    lastUpdateSlot: number;
}

const DB: Map<string, TokenData> = new Map();

async function saveToDb(mint: PublicKey, data: TokenData): Promise<void> {
    DB.set(mint.toBase58(), data);
}

async function getFromDb(mint: PublicKey): Promise<TokenData> {
    return (
        DB.get(mint.toBase58()) ?? {
            owner: new PublicKey(0),
            lastUpdateSlot: 0
        }
    );
}

async function main() {
    const mints = [
        new PublicKey("2oLvkQqNemhVZ27yxgbsSe1d8NgLwKhKL3agU71X6Fsr")
    ];
    registerATAListenersForMints(mints);
}

if (require.main)
    main()
        .catch(console.error)
        .finally(
            clearInterval.bind(
                null,
                setInterval(() => {}, 1e9)
            )
        );

async function registerATAListenersForMints(mints: PublicKey[]): Promise<void> {
    let tokenAccounts = await fetchTokenAccountsForMints(mints);
    for (let i = 0; i < tokenAccounts.length; i++) {
        // seed database with current owners accounts
        // if script crashes, this should ensure the current state is valid
        await saveToDb(mints[i], {
            owner: tokenAccounts[i].owner,
            lastUpdateSlot: 0
        });
        await registerOnATAChangeHandler(mints[i], tokenAccounts[i].address);
    }
}

interface JsonRpcOperation {
    jsonrpc: string;
    id: number;
    method: string;
    params: any[];
}

async function fetchTokenAccountsForMints(
    mints: PublicKey[]
): Promise<Account[]> {
    let largestAccountsBatchRequest = mints.map((mint, id) => ({
        jsonrpc: "2.0",
        id,
        method: "getTokenLargestAccounts",
        params: [mint]
    }));
    let largestAccountsBatchResponse = await batchRpcRequest(
        largestAccountsBatchRequest
    );

    let tokenAccountAddresses = largestAccountsBatchResponse
        .map(({ result: { value } }) =>
            value.filter(({ amount }: { amount: string }) => amount == "1")
        )
        .filter((accounts, index) => {
            if (accounts.length == 1) return true;
            else {
                console.warn(
                    `Unusual number of token accounts for nft ${mints[index]}: ${accounts.length}`
                );
                return false;
            }
        })
        .map(([{ address }]) => address);

    let accountInfoBatchRequest = [];
    let accountAddresses = tokenAccountAddresses.slice();
    while (accountAddresses.length > 0)
        accountInfoBatchRequest.push({
            jsonrpc: "2.0",
            id: accountInfoBatchRequest.length,
            method: "getMultipleAccounts",
            params: [accountAddresses.splice(0, 100), { encoding: "base64" }]
        });
    let accountInfoBatchResponse = await batchRpcRequest(
        accountInfoBatchRequest
    );

    let tokenAccounts = accountInfoBatchResponse
        .flatMap(({ result: { value } }) => value)
        .map(({ data, executable, lamports, owner, rentEpoch }, index) =>
            unpackAccount(new PublicKey(tokenAccountAddresses[index]), {
                data: Buffer.from(data[0], "base64"),
                executable,
                lamports,
                owner: new PublicKey(owner),
                rentEpoch
            })
        );

    return tokenAccounts;
}

async function batchRpcRequest(operations: JsonRpcOperation[]): Promise<any[]> {
    let request = await fetch(connection.rpcEndpoint, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(operations)
    });
    return request.json();
}

const MINT_CHANGE_HANDLER_MAP = new Map<string, number>();
async function registerOnATAChangeHandler(
    mint: PublicKey,
    tokenAccountAddress: PublicKey
): Promise<void> {
    let currentListenerId = MINT_CHANGE_HANDLER_MAP.get(mint.toBase58());
    if (typeof currentListenerId == "number")
        await connection.removeAccountChangeListener(currentListenerId);

    let listenerId = await connection.onAccountChange(
        tokenAccountAddress,
        createOnATAChangeHandler(mint, tokenAccountAddress)
    );
    MINT_CHANGE_HANDLER_MAP.set(mint.toBase58(), listenerId);
}

function createOnATAChangeHandler(
    mint: PublicKey,
    tokenAccountAddress: PublicKey
): AccountChangeCallback {
    return async (accountInfo, { slot }) => {
        let { owner: oldOwner, lastUpdateSlot } = await getFromDb(mint);
        if (lastUpdateSlot >= slot) {
            console.warn(
                `skipping update for ${mint} since` +
                    ` current slot ${slot} < last updates slot ${lastUpdateSlot}`
            );
            return;
        }

        let tokenAccount: Account | null = null;
        try {
            tokenAccount = unpackAccount(tokenAccountAddress, accountInfo);
        } catch (e) {
            console.warn(e);
        }
        if (!tokenAccount || tokenAccount.amount !== 1n)
            [tokenAccount] = await fetchTokenAccountsForMints([mint]);

        let currentOwner = tokenAccount.owner;

        // maybe also check for delegate/frozen accounts
        if (!currentOwner.equals(oldOwner)) {
            console.log(
                `owner changed for ${mint}: ${oldOwner} -> ${currentOwner}`
            );
            await saveToDb(mint, { owner: currentOwner, lastUpdateSlot: slot });
            // change roles, if needed
        }
        if (!tokenAccountAddress.equals(tokenAccount.address)) {
            console.log(
                `ata changed for ${mint}, registering new listener: ` +
                    `${tokenAccountAddress} -> ${tokenAccount.address}`
            );
            registerOnATAChangeHandler(mint, tokenAccount.address);
        }
        console.log();
    };
}
