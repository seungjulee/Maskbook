import { useState } from 'react'
import { useAsync } from 'react-use'
import { Box, Button, Card, makeStyles } from '@material-ui/core'
import { useDashboardI18N } from '../../locales'
import { MaskColorVar, useSnackbar } from '@masknet/theme'
import { Services } from '../../API'
import BackupPreviewCard from '../../pages/Settings/components/BackupPreviewCard'
import { MaskAlert } from '../MaskAlert'
import FileUpload from '../FileUpload'
import { ButtonGroup } from '../RegisterFrame/ButtonGroup'
import { useNavigate } from 'react-router'
import { RoutePaths } from '../../type'

const useStyles = makeStyles((theme) => ({
    root: {
        border: `solid 1px ${theme.palette.divider}`,
        width: '100%',
        height: 176,
        borderRadius: 4,
        background: MaskColorVar.secondaryContrastText.alpha(0.15),
    },
    file: {
        display: 'none',
    },
}))

enum RestoreStatus {
    WaitingInput = 0,
    Verifying = 1,
    Verified = 2,
}

export interface RestoreFromJsonProps {}

export function RestoreFromJson(props: RestoreFromJsonProps) {
    const t = useDashboardI18N()
    const classes = useStyles()
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()

    const [json, setJSON] = useState<any | null>(null)
    const [backupValue, setBackupValue] = useState('')
    const [backupId, setBackupId] = useState('')
    const [restoreStatus, setRestoreStatus] = useState(RestoreStatus.WaitingInput)

    useAsync(async () => {
        if (!backupValue) return

        setRestoreStatus(RestoreStatus.Verifying)
        const backupInfo = await Services.Welcome.parseBackupStr(backupValue)

        if (backupInfo) {
            setJSON(backupInfo.info)
            setBackupId(backupInfo.id)
            setRestoreStatus(RestoreStatus.Verified)
        } else {
            setRestoreStatus(RestoreStatus.WaitingInput)
            setBackupValue('')
        }
    }, [backupValue])

    const restoreDB = async () => {
        try {
            await Services.Welcome.checkPermissionsAndRestore(backupId)
            navigate(RoutePaths.Personas, { replace: true })
        } catch {
            enqueueSnackbar('Restore backup failed, Please try again', { variant: 'error' })
        }
    }

    const handleCancel = () => {
        if (restoreStatus !== RestoreStatus.WaitingInput) {
            setRestoreStatus(RestoreStatus.WaitingInput)
            setBackupValue('')
        } else {
            navigate(-1)
        }
    }

    return (
        <>
            <Box sx={{ width: '100%' }}>
                {restoreStatus === RestoreStatus.Verifying && <div className={classes.root}>Verifying</div>}
                {restoreStatus === RestoreStatus.WaitingInput && (
                    <Card variant="background" sx={{ height: '144px' }}>
                        <FileUpload onChange={(_, content) => content && setBackupValue(content)} readAsText />
                    </Card>
                )}
                {restoreStatus === RestoreStatus.Verified && <BackupPreviewCard json={json} />}
            </Box>
            <ButtonGroup>
                <Button variant="rounded" color="secondary" onClick={handleCancel}>
                    {t.wallets_import_wallet_cancel()}
                </Button>
                <Button
                    variant="rounded"
                    color="primary"
                    onClick={restoreDB}
                    disabled={restoreStatus !== RestoreStatus.Verified}>
                    {t.wallets_import_wallet_import()}
                </Button>
            </ButtonGroup>
            <Box sx={{ marginTop: '35px', width: '100%' }}>
                <MaskAlert description={t.sign_in_account_local_backup_warning()} />
            </Box>
        </>
    )
}
