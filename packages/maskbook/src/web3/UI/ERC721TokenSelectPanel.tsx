import { useState, useCallback } from 'react'
import { v4 as uuid } from 'uuid'
import type { ERC721TokenDetailed } from '@masknet/web3-shared'
import { FormattedBalance } from '@masknet/shared'
import classNames from 'classnames'
import { Box, makeStyles, Typography } from '@material-ui/core'
import { useRemoteControlledDialog } from '@masknet/shared'
import { SelectNftDialogEvent, WalletMessages } from '../../plugins/Wallet/messages'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useI18N } from '../../utils'

const useStyles = makeStyles((theme) => {
    return {
        root: {
            height: 52,
            width: 524,
            border: `1px solid ${theme.palette.mode === 'light' ? '#EBEEF0' : '#2F3336'}`,
            borderRadius: 12,
            padding: theme.spacing(0.8, 1.2, 1),
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
        },
        balance: {},
        title: {},
        wrapper: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
        },
        icon: {
            height: 24,
            width: 24,
        },
        tokenWrapper: {
            display: 'flex',
            alignItems: 'center',
        },
        nftName: {
            marginLeft: theme.spacing(1),
            fontWeight: 300,
            pointerEvents: 'none',
            fontSize: 16,
        },
        expandIcon: {
            color: theme.palette.text.primary,
        },
        pointer: {
            cursor: 'pointer',
        },
    }
})

export interface ERC721TokenSelectPanelProps {
    onTokenChange: (token: ERC721TokenDetailed) => void
}
export function ERC721TokenSelectPanel(props: ERC721TokenSelectPanelProps) {
    const { onTokenChange } = props
    const classes = useStyles()
    const { t } = useI18N()
    // todo: fake data for UI
    const balance = 10000000000
    const tokenDecimals = 18
    const iconURL = new URL('../assets/cryptokitties.png', import.meta.url).toString()
    const nftName = 'CryptoKitties (CK)'
    //#region select token
    const [id] = useState(uuid())

    const { setDialog: setNftTokenDialog } = useRemoteControlledDialog(
        WalletMessages.events.selectNftDialogUpdated,
        useCallback(
            (ev: SelectNftDialogEvent) => {
                if (ev.open || !ev.token || ev.uuid !== id) return
                onTokenChange(ev.token)
            },
            [id, onTokenChange],
        ),
    )

    const openDialog = useCallback(() => {
        console.log(231231)
        setNftTokenDialog({
            open: true,
            uuid: id,
        })
    }, [setNftTokenDialog, uuid])

    return (
        <Box className={classes.root}>
            <div className={classes.wrapper}>
                <Typography className={classes.title} color="textSecondary" variant="body2" component="span">
                    {t('dashboard_tab_collectibles')}
                </Typography>
                <Typography className={classes.balance} color="textSecondary" variant="body2" component="span">
                    {t('plugin_ito_list_table_got')}:
                    <FormattedBalance value={balance} decimals={tokenDecimals} significant={6} />
                </Typography>
            </div>
            <div className={classNames(classes.wrapper, classes.pointer)} onClick={openDialog}>
                <div className={classes.tokenWrapper}>
                    <img className={classes.icon} src={iconURL} />
                    <Typography className={classes.nftName} color="textPrimary">
                        {nftName}
                    </Typography>
                </div>
                <ExpandMoreIcon className={classes.expandIcon} />
            </div>
        </Box>
    )
}
