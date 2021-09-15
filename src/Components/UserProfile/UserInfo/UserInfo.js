import React from 'react'
import style from "../UserProfile.module.css";
import userPhoto from '../../../Images/noUserPhoto.png'
import Preloader from "../../Common/Preloader/Preloader";
import {Button, Col, message, Row, Tooltip, Typography, Upload} from "antd";
import ProfileStatus from "../ProfileStatus/ProfileStatus";
import {
    CameraOutlined,
    FacebookOutlined,
    GithubOutlined,
    InstagramOutlined,
    TwitterOutlined,
    YoutubeOutlined
} from '@ant-design/icons';
import {toUpperCaseBegin} from "../../../Helpers/string-helpers";
import {toValidUrl} from "../../../Helpers/url-heplers";
import AliyunOutlined from "@ant-design/icons/lib/icons/AliyunOutlined";


export default function UserInfo(props) {
    const {UserInfo} = props

    const onMainPhotoSelected = async info => {

        if (info.file.status === 'done') {
            await props.savePhoto(info.file.originFileObj)
            message.success(`Фотография была успешно обновлена`);
        } else if (info.file.status === 'error') {
            message.error(`Упс, возникла ошибка, попробуйте еще раз`);
        }
    }

    const defineIcon = contact => {
        switch (contact) {
            case 'facebook':
                return <FacebookOutlined/>
            case 'twitter':
                return <TwitterOutlined/>
            case 'instagram':
                return <InstagramOutlined/>
            case 'youtube':
                return <YoutubeOutlined/>
            case 'github':
                return <GithubOutlined/>
            case 'mainLink':
                return <AliyunOutlined/>
            case 'website':
                return <AliyunOutlined/>
            default:
                return <></>
        }
    }


    if (props.isFetching) return <Preloader/>

    return (
        <>
            <Row align={'center'} justify={'center'} style={{width: '80vw'}}>
                <Col span={5} offset={5}>
                    <div className={style.Photo}>
                        <img src={UserInfo?.photos?.large || userPhoto} alt="person"/>
                    </div>
                </Col>
                <Col span={5}>
                    {
                        props.isOwner &&
                        <Upload
                            accept={"image/png, image/jpeg"}
                            onChange={info => onMainPhotoSelected(info)}
                        >
                            <Tooltip title={"Upload new photo"}>
                                <Button icon={<CameraOutlined/>}/>
                            </Tooltip>
                        </Upload>
                    }
                </Col>
            </Row>
            <h2 className={style.Name} style={props}>{UserInfo.fullName}</h2>
            <ProfileStatus status={props.status}
                           isOwner={props.isOwner}
                           updateStatus={props.updateStatus}
                           isStatusFetching={props.isStatusFetching}
                           isCommonDataFetching={props.isFetching}
            />
            {
                UserInfo.lookingForAJob
                    ? <>
                        <Typography.Title style={{textAlign: 'center'}}
                                          level={3} type="success">Looking for a job</Typography.Title>
                        <Typography.Paragraph
                            style={{textAlign: 'center'}}>{UserInfo.lookingForAJobDescription}</Typography.Paragraph>
                    </>
                    :
                    <Typography.Title style={{textAlign: 'center'}}
                                      level={3} type="warning">Already work</Typography.Title>
            }
            {
                Object.values(UserInfo.contacts).some(el => !!el) &&
                <Typography.Title level={4} type={'secondary'}>Contacts :</Typography.Title>
            }
            {
                /*Contacts*/
                Object.entries(UserInfo.contacts).map((contact, i) => {
                    if (contact[1]) {
                        return (

                            <Typography.Link className={style.contactLink}
                                             href={toValidUrl(contact[1])}
                                             target={'_blank'}
                                             key={i}>
                                {toUpperCaseBegin(contact[0])}&nbsp;&nbsp;&nbsp;{defineIcon(contact[0])}</Typography.Link>

                        )
                    } else return <div key={i}/>
                })
            }
        </>
    )
}

