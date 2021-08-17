import { Box, makeStyles, Typography, TextField } from '@material-ui/core'
import { useERC721TokenDetailed } from '@masknet/web3-shared'
import { useState } from 'react'
import { useI18N } from '../../../utils'
import classNames from 'classnames'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import CloseIcon from '@material-ui/icons/Close'
import { ERC721TokenSelectPanel } from '../../../web3/UI/ERC721TokenSelectPanel'
import ActionButton from '../../../extension/options-page/DashboardComponents/ActionButton'
import { EthereumWalletConnectedBoundary } from '../../../web3/UI/EthereumWalletConnectedBoundary'

const useStyles = makeStyles((theme) => {
    return {
        root: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
        },
        tokenSelector: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            width: 528,
            height: 188,
            overflowY: 'auto',
            background: theme.palette.mode === 'light' ? '#F7F9FA' : '#17191D',
            borderRadius: 12,
            marginTop: theme.spacing(1.5),
            marginBottom: theme.spacing(1.5),
            padding: theme.spacing(1, 1.5, 1, 1),
        },
        wrapper: {
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            marginBottom: theme.spacing(2.5),
            background: '#fff',
            width: 120,
            height: 180,
            borderRadius: 8,
        },
        addWrapper: {
            cursor: 'pointer',
            alignItems: 'center',
            justifyContent: 'center',
            background: theme.palette.mode === 'light' ? 'none' : '#2F3336',
        },
        nftWrapper: {
            justifyContent: 'center',
        },
        lastRowWrapper: {
            marginBottom: theme.spacing(0.5),
        },
        addIcon: {
            color: '#AFC3E1',
        },
        nftImg: {
            margin: '0 auto',
            width: '100%',
        },
        closeIcon: {
            position: 'absolute',
            cursor: 'pointer',
            top: 5,
            right: 5,
            width: 10,
            height: 10,
            padding: theme.spacing(0.5),
            color: 'rgba(255, 95, 95, 1)',
            background: 'rgba(255, 95, 95, 0.2)',
            borderRadius: 500,
        },
        line: {
            display: 'flex',
            width: '100%',
            margin: theme.spacing(1),
        },
        nftNameWrapper: {
            width: '100%',
            background: theme.palette.mode === 'light' ? 'none' : '#2F3336',
            borderBottomRightRadius: 8,
            borderBottomLeftRadius: 8,
            paddingTop: 2,
            paddingBottom: 1,
        },
        nftName: {
            marginLeft: 8,
        },
        inputShrinkLabel: {
            transform: 'translate(17px, -3px) scale(0.75) !important',
        },
        input: {
            flex: 1,
            padding: theme.spacing(0.5),
        },
        tip: {
            fontSize: 17,
            marginBottom: theme.spacing(2),
        },
    }
})

export function RedPacketERC721Form() {
    const { t } = useI18N()
    const classes = useStyles()
    const nfts: { img: string; name: string }[] = Array.from({ length: 10 })
    const tokenss = {
        address: '0x495f947276749ce646f68ac8c248420045cb7b5e',
        tokenId: '82075277284336434794327789267110714174478562303688962626597736166413941342209',
    }
    const { value } = useERC721TokenDetailed('0x495f947276749ce646f68ac8c248420045cb7b5e', tokenss)

    console.log({ value })
    nfts.fill({
        img: new URL('./assets/nft.png', import.meta.url).toString(),
        name: 'Token',
    })
    const [message, setMessage] = useState('')

    return (
        <Box className={classes.root}>
            <ERC721TokenSelectPanel onTokenChange={(token) => {}} />
            <Box className={classes.tokenSelector}>
                {nfts.map((nft, i) => (
                    <Box
                        className={classNames(
                            classes.wrapper,
                            classes.nftWrapper,
                            nfts.length - i < 3 ? classes.lastRowWrapper : '',
                        )}
                        key={i.toString()}>
                        <img className={classes.nftImg} src={nft.img} />
                        <div className={classes.nftNameWrapper}>
                            <Typography className={classes.nftName} color="textSecondary">
                                {nft.name}
                            </Typography>
                        </div>
                        <CloseIcon className={classes.closeIcon} />
                    </Box>
                ))}
                <Box className={classNames(classes.wrapper, classes.addWrapper, classes.lastRowWrapper)}>
                    <AddCircleOutlineIcon className={classes.addIcon} />
                </Box>
            </Box>
            <div className={classes.line}>
                <TextField
                    className={classes.input}
                    onChange={(e) => setMessage(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                        classes: {
                            shrink: classes.inputShrinkLabel,
                        },
                    }}
                    inputProps={{ placeholder: t('plugin_red_packet_best_wishes') }}
                    label={t('plugin_red_packet_message_label')}
                    value={message}
                />
            </div>
            <Typography className={classes.tip} color="textSecondary">
                {t('plugin_red_packet_nft_send_tip')}
            </Typography>
            <EthereumWalletConnectedBoundary>
                <ActionButton variant="contained" size="large" fullWidth>
                    {t('plugin_red_packet_next')}
                </ActionButton>
            </EthereumWalletConnectedBoundary>
        </Box>
    )
}
