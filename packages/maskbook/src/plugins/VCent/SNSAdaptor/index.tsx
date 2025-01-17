import type { Plugin } from '@masknet/plugin-infra'
import { usePostInfoDetails } from '../../../components/DataSource/usePostInfo'
import VCentDialog from './TweetDialog'
import { base } from '../base'

const sns: Plugin.SNSAdaptor.Definition = {
    ...base,
    init(signal) {},
    DecryptedInspector: Component,
    PostInspector: Component,
}

export default sns

function Component() {
    const tweetAddress = usePostInfoDetails.postID()
    if (!tweetAddress) return null
    // only for detailed page
    if (!/\/status\/\d+$/.test(location.pathname)) return null
    return <VCentDialog tweetAddress={tweetAddress} />
}
