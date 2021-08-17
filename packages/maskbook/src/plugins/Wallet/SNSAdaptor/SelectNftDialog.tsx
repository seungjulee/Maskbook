import { useCallback, useState } from 'react'
import { makeStyles, Theme, DialogContent } from '@material-ui/core'
import type { ERC721TokenDetailed } from '@masknet/web3-shared'
import { InjectedDialog } from '../../../components/shared/InjectedDialog'
import { WalletMessages } from '../../Wallet/messages'
import { delay, useI18N } from '../../../utils'
import { useRemoteControlledDialog, useStylesExtends } from '@masknet/shared'
import { EthereumAddress } from 'wallet.ts'
import { SearchInput } from '../../../extension/options-page/DashboardComponents/SearchInput'

const useStyles = makeStyles((theme: Theme) => ({
    search: {
        width: '100%',
        margin: theme.spacing(1, 0, 2),
    },
    list: {
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
    placeholder: {
        textAlign: 'center',
        height: 288,
        paddingTop: theme.spacing(14),
        boxSizing: 'border-box',
    },
}))

export interface SelectNftDialogProps extends withClasses<never> {}

export function SelectNftDialog(props: SelectNftDialogProps) {
    const { t } = useI18N()
    const classes = useStylesExtends(useStyles(), props)

    const [id, setId] = useState('')
    const [keyword, setKeyword] = useState('')

    //#region remote controlled dialog
    const { open, setDialog } = useRemoteControlledDialog(WalletMessages.events.selectNftDialogUpdated, (ev) => {
        if (!ev.open) return
        setId(ev.uuid)
    })
    const onSubmit = useCallback(
        async (token: ERC721TokenDetailed) => {
            setDialog({
                open: false,
                uuid: id,
                token,
            })
            await delay(300)
            setKeyword('')
        },
        [id, setDialog, setKeyword],
    )
    const onClose = useCallback(async () => {
        setDialog({
            open: false,
            uuid: id,
        })
        await delay(300)
        setKeyword('')
    }, [id, setDialog])
    //#endregion

    return (
        <InjectedDialog open={open} onClose={onClose} title={t('plugin_wallet_select_a_token')} maxWidth="xs">
            <DialogContent>
                <SearchInput
                    label={t('add_token_search_hint')}
                    onChange={(keyword) => {
                        setKeyword(keyword)
                    }}
                />
                <SearchResultBox keyword={keyword} />
            </DialogContent>
        </InjectedDialog>
    )
}

export interface SearchResultBoxProps extends withClasses<never> {
    keyword: string
}

function SearchResultBox(props: SearchResultBoxProps) {
    const { keyword } = props
    const isValid = EthereumAddress.isValid(keyword)
    return <div>{isValid}</div>
}
