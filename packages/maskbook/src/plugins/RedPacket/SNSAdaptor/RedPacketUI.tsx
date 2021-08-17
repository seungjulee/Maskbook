import { getAssetAsBlobURL, useI18N } from '../../../utils'
import { useAccount, useChainIdValid } from '@masknet/web3-shared'
import { Box, Card, CardContent, CardHeader, CardMedia, Link, makeStyles, Typography } from '@material-ui/core'
import ActionButton from '../../../extension/options-page/DashboardComponents/ActionButton'
import { EthereumWalletConnectedBoundary } from '../../../web3/UI/EthereumWalletConnectedBoundary'
import { useRemoteControlledDialog } from '@masknet/shared'
import { WalletMessages } from '@masknet/plugin-wallet'
import LaunchIcon from '@material-ui/icons/Launch'

const useStyles = makeStyles((theme) => ({
    card: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: theme.spacing(1),
        padding: theme.spacing(1),
        background: '#DB0632',
        position: 'relative',
        color: theme.palette.common.white,
        boxSizing: 'border-box',
    },
    title: {
        textAlign: 'left',
    },
    image: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: 160,
        backgroundSize: 'contain',
        textAlign: 'center',
        justifyContent: 'center',
    },
    remain: {
        marginLeft: 28,
        paddingTop: 40,
        color: '#FAD85A',
        width: '100%',
    },
    claim: {
        textAlign: 'center',
        marginTop: theme.spacing(1),
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between !important',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(1),
    },
    actions: {
        paddingTop: theme.spacing(2),
        display: 'flex',
        justifyContent: 'center',
    },
    link: {
        display: 'flex',
        marginLeft: theme.spacing(0.5),
        '&>:first-child': {
            marginRight: theme.spacing(1),
        },
    },
}))

export interface RedPacketUIProps {
    disabled: boolean
    label: string
    onClaimOrRefund: () => void
    claim: boolean
}

export function RedPacketUI(props: RedPacketUIProps) {
    const classes = useStyles()
    const account = useAccount()
    const { t } = useI18N()
    const chainIdValid = useChainIdValid()
    const { disabled = true, label, onClaimOrRefund, claim = false } = props

    //#region remote controlled select provider dialog
    const { openDialog: openSelectProviderDialog } = useRemoteControlledDialog(
        WalletMessages.events.selectProviderDialogUpdated,
    )
    //#endregion

    return (
        <>
            <Card className={classes.card} component="article" elevation={0}>
                <CardHeader
                    className={classes.title}
                    title="100th anniversary of the Mona Lisa"
                    subheader={
                        <div className={classes.link}>
                            <Typography variant="body2" color="textPrimary">
                                100th LISA
                            </Typography>
                            <Link color="textPrimary" target="_blank" rel="noopener noreferrer">
                                <LaunchIcon fontSize="small" />
                            </Link>
                        </div>
                    }
                />

                <CardMedia
                    className={classes.image}
                    component="div"
                    image={
                        !claim
                            ? new URL('./assets/redpacket.nft.png', import.meta.url).toString()
                            : getAssetAsBlobURL(new URL('./assets/nft.gift.jpg', import.meta.url))
                    }
                    title="nft icon">
                    {!claim ? <Typography className={classes.remain}>5 Collectibles</Typography> : null}
                </CardMedia>
                {claim ? (
                    <Typography variant="body1" className={classes.claim}>
                        You got 1 Mona Lisa
                    </Typography>
                ) : null}
                <CardContent>
                    <Typography variant="body1" color="textSecondary">
                        This image contains a Red Packet Use Maskbook to open it.
                    </Typography>
                </CardContent>
                <div className={classes.footer}>
                    <Link href="https://mask.io/" target="_blank" rel="noopener noreferrer" color="textPrimary">
                        Mask.io
                    </Link>
                    <Typography variant="body1">From: @Pineapple</Typography>
                </div>
            </Card>
            <EthereumWalletConnectedBoundary>
                <Box className={classes.actions}>
                    {!account ? (
                        <ActionButton variant="contained" size="large" onClick={openSelectProviderDialog}>
                            {t('plugin_wallet_connect_a_wallet')}
                        </ActionButton>
                    ) : !chainIdValid ? (
                        <ActionButton disabled variant="contained" size="large">
                            {t('plugin_wallet_invalid_network')}
                        </ActionButton>
                    ) : (
                        <ActionButton disabled={disabled} variant="contained" size="large" onClick={onClaimOrRefund}>
                            {label}
                        </ActionButton>
                    )}
                </Box>
            </EthereumWalletConnectedBoundary>
        </>
    )
}
