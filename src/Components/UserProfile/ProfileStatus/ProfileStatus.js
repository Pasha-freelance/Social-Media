import React, {useEffect, useState} from 'react'
import style from './ProfileStatus.module.css'
import {Button, Col, Input, Row, Spin, Tooltip} from "antd";
import {EditFilled, LoadingOutlined, SaveFilled} from '@ant-design/icons';

const layoutStyle = {
    row: {
        align: 'center',
        justify: 'center'
    },
    col1: {
        offset: 1
    },
    col2: {
        marginLeft: '20px'
    }
}

export default function ProfileStatus(props) {
    const [editMode, setEditMode] = useState(false)
    const [statusText, setStatusText] = useState('')

    useEffect(() => {
        setStatusText(props.status)
    }, [props.status])

    function enableEditMode() {
        if (props.isOwner)
            setEditMode(true)
    }

    function disableEditModeAndUpdateStatus() {
        setEditMode(false)
        props.updateStatus(statusText)
    }

    function updateStatusText(text) {
        setStatusText(text)
    }

    const InputForStatusEditing = () => (
        <Row {...layoutStyle.row}>
            <Col {...layoutStyle.col1}>
                <Input autoSize
                       onChange={(event) => {
                           updateStatusText(event.target.value)
                       }}
                       defaultValue={statusText}
                       autoFocus={true}
                       maxLength={80}
                       showCount={true}
                       onPressEnter={disableEditModeAndUpdateStatus}
                />

            </Col>
            <Col style={{...layoutStyle.col2}}>
                <Tooltip title={'Сохранить статус'}>
                    <Button icon={<SaveFilled/>}
                            size='small'
                            style={{background: 'transparent', border: 'none'}}
                            onClick={disableEditModeAndUpdateStatus}
                    />
                </Tooltip>
            </Col>
        </Row>
    )

    const StatusText = ({isEditable}) => (
        <Row {...layoutStyle.row}>
            <Col offset={isEditable ? 1 : 0}>
                <div className={style.statusText}>{props.status ?? ''}</div>
            </Col>
            {
                isEditable &&
                <Col style={{...layoutStyle.col2}}>
                    <Tooltip title={'Редактировать статус'}>
                        <Button icon={<EditFilled/>}
                                size='small'
                                style={{background: 'transparent', border: 'none'}}
                                onClick={enableEditMode}
                        />
                    </Tooltip>
                </Col>
            }
        </Row>
    )

    return (
        <div className={style.statusWrapper}>
            {
                !props.isStatusFetching
                    ? editMode ? <InputForStatusEditing/> : <StatusText isEditable={props.isOwner}/>
                    : !props.isCommonDataFetching && <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin/>}/>
            }

        </div>
    )
}