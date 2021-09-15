import React, {useState} from 'react'
import {Button, Col, Modal, Row, Switch, Typography} from 'antd';
import {ChangeContactsModal, TextModal} from "./Modals";


const ConfigMyProfile = props => {

    const cancelHandler = () => props.setConfigurableMode(false)
    const okHandler = () => {
        props.addItemToInfo('fullName', nickname || props.nickname)
        props.addItemToInfo('lookingForAJobDescription', aboutMeInfo === '' ? props.lookingForAJobDescription : aboutMeInfo)
        props.addItemToInfo('lookingForAJob', lookingForAJob)
        props.addItemToInfo('contacts', contacts)
        props.addItemToInfo('aboutMe', aboutMeInfo === '' ? props.lookingForAJobDescription : aboutMeInfo)
    }

    const [aboutMeModalVisibility, setAboutMeModalVisibility] = useState(false)
    const [nicknameModalVisibility, setNickNameModalVisibility] = useState(false)
    const [contactsModalVisibility, setContactsModalVisibility] = useState(false)
    const [nickname, setNickName] = useState(props.nickname)
    const [contacts, setContacts] = useState(props.contacts)
    const [aboutMeInfo, setAboutMeInfo] = useState(props.lookingForAJobDescription)
    const [lookingForAJob, setLookingForAJob] = useState(props.lookingForAJob)

    return (
        <>
            <Modal
                title="Change profile"
                visible={true}
                centered={true}
                maskClosable={true}
                onCancel={cancelHandler}
                cancelText={'Cancel'}
                okText={'Ok'}
                onOk={okHandler}
                destroyOnClose={true}
            >
                <ConfigInner setAboutMeModalVisibility={setAboutMeModalVisibility}
                             setNickNameModalVisibility={setNickNameModalVisibility}
                             setContactsModalVisibility={setContactsModalVisibility}
                             nickname={nickname}
                             lookingForAJob={lookingForAJob}
                             setLookingForAJob={setLookingForAJob}
                />
                {aboutMeModalVisibility &&
                <TextModal setVisibility={setAboutMeModalVisibility}
                           setModalText={setAboutMeInfo}
                           defaultValue={aboutMeInfo}
                />}
                {nicknameModalVisibility &&
                <TextModal setVisibility={setNickNameModalVisibility}
                           setModalText={setNickName}
                           defaultValue={nickname}
                />}
                {contactsModalVisibility &&
                <ChangeContactsModal setVisibility={setContactsModalVisibility}
                                     contacts={contacts}
                                     setContacts={setContacts}/>}
            </Modal>
        </>
    )
}
const ConfigInner = (props) => {
    const {
        setAboutMeModalVisibility,
        setNickNameModalVisibility,
        setContactsModalVisibility,
        nickname,
        lookingForAJob,
        setLookingForAJob,
    } = props
    const {Title, Text} = Typography
    const antRowAttr = {
        justify: 'space-between',
        align: 'center',
    }
    const rowStyle = {
        marginBottom: '10px'
    }

    //Formik Form Antd
    return (
        <>
            <Row {...antRowAttr} style={{...rowStyle}}>
                <Col>
                    <Title level={5}>About me </Title>
                </Col>
                <Col>
                    <Button onClick={() => setAboutMeModalVisibility(true)}>Change</Button>
                </Col>
            </Row>

            <Row {...antRowAttr} style={{...rowStyle}}>
                <Col>
                    <Row>
                        <Title level={5}>Name </Title>
                        <Text type={"success"} style={{margin: '2px 25px'}}>{nickname}</Text>
                    </Row>
                </Col>
                <Col>
                    <Button onClick={() => setNickNameModalVisibility(true)}>Change</Button>
                </Col>
            </Row>

            <Row {...antRowAttr} style={{...rowStyle}}>
                <Title level={5}>Looking for a job</Title>
                <Switch checked={lookingForAJob}
                        onChange={(isChecked) => setLookingForAJob(isChecked)}
                />
            </Row>

            <Row {...antRowAttr} style={{...rowStyle}}>
                <Col>
                    <Row>
                        <Title level={5}>My contacts </Title>
                    </Row>
                </Col>
                <Col>
                    <Button onClick={() => setContactsModalVisibility(true)}>Change</Button>
                </Col>
            </Row>

        </>

    )

}
export default ConfigMyProfile;