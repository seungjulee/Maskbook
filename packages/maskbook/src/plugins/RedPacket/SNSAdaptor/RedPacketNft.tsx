import { ChainId } from '@masknet/web3-shared'
import { EthereumChainBoundary } from '../../../web3/UI/EthereumChainBoundary'
import type { RedPacketNftJSONPayload } from '../types'
import { RedPacketUI } from './RedPacketUI'

export interface RedPacketNftProps {
    payload: RedPacketNftJSONPayload
}

export function RedPacketNft({ payload }: RedPacketNftProps) {
    return (
        <EthereumChainBoundary chainId={ChainId.Mainnet}>
            <RedPacketUI claim={true} label="aaaa" disabled={false} onClaimOrRefund={() => {}} />
        </EthereumChainBoundary>
    )
}
